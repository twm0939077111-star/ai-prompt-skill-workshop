(function () {
  'use strict';
  const plans = new Map((window.__classroomMotionPlan || []).map(p => [p.id, p]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ambientNames = /^(cover-orb-[abcd]|fso-orbit-drift|dso-gentle-float)$/;
  const owned = new Set();
  const ambient = new Set();
  let active = null, ticket = 0, printing = false, last = null, panelFrame = 0, runs = 0, nativeEnabled = false;
  const realSlide = s => s && s.parentElement === document.getElementById('deck');
  const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
  const select = (s, selector) => selector ? Array.from(s.querySelectorAll(selector)).filter(visible) : [];

  function finish() {
    nativeEnabled = false;
    for (const a of owned) { try { a.finish(); } catch (_) { a.cancel(); } }
    owned.clear();
    for (const a of ambient) { try { a.finish(); a.pause(); } catch (_) {} }
    ambient.clear();
    settleNative(active, false);
  }
  function settleNative(s, allowAmbient) {
    if (!s) return;
    for (const a of s.getAnimations({subtree: true})) {
      if (typeof CSSAnimation === 'undefined' || !(a instanceof CSSAnimation)) continue;
      try {
        const infinite = a.effect.getTiming().iterations === Infinity;
        if (allowAmbient && ambientNames.test(a.animationName)) {
          // Decorations get two slow cycles, never a permanent attention demand.
          a.effect.updateTiming({duration: 6000, iterations: 2, delay: 0});
          a.currentTime = 0;
          a.play();
          ambient.add(a);
        } else if (infinite) {
          a.pause();
          a.currentTime = 0;
        } else {
          a.finish();
        }
      } catch (_) { /* Removed lazy-rendered nodes need no animation cleanup. */ }
    }
  }
  function enter(el, delay, duration, distance, fadeOnly) {
    const style = getComputedStyle(el);
    // Use individual translate: never replace the deck's scaling or image rotations.
    // Elements already using translate only fade, preserving their authored position.
    const canMove = !fadeOnly && (style.translate === 'none' || /^0(px)?(?: 0(px)?)?$/.test(style.translate));
    const opacity = style.opacity;
    const from = {opacity: 0}, to = {opacity};
    if (canMove) { from.translate = '0 ' + distance + 'px'; to.translate = style.translate; }
    const a = el.animate([from, to], {duration, delay, easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'backwards'});
    owned.add(a);
    a.finished.then(() => owned.delete(a), () => owned.delete(a));
    return a;
  }
  function play(s) {
    if (!realSlide(s) || !s.classList.contains('active')) return;
    finish();
    if (active && active !== s) settleNative(active, false);
    active = s;
    const plan = plans.get(s.dataset.vmSlideId);
    nativeEnabled = !!plan && !reduced.matches && !printing && !document.hidden;
    settleNative(s, nativeEnabled && plan.ambient);
    if (!plan) { last = {id: s.dataset.vmSlideId, missing: true}; return; }
    const title = select(s, 'h1, h2, .pi-v5-command-line')[0];
    const blocks = select(s, plan.blocks).filter(el => !title || (el !== title && !el.contains(title) && !title.contains(el)));
    last = {run: ++runs, id: plan.id, page: plan.page, size: plan.size, title: !!title, blocks: blocks.length, suppressed: reduced.matches || printing || document.hidden};
    if (last.suppressed) return;
    // Distances are authored-stage pixels, independent of the displayed deck scale.
    const big = plan.size === 'large', small = plan.size === 'small';
    if (title) enter(title, 0, big ? 650 : small ? 300 : 450, big ? 28 : small ? 6 : 12, false);
    blocks.slice(0, 8).forEach((el, i) => {
      const delay = 90 + (plan.mode === 'together' ? 0 : i * 75);
      enter(el, delay, small ? 300 : 450, big ? 16 : 10, plan.mode === 'gallery' || plan.mode === 'fade');
    });
  }
  function schedule(s) {
    const version = ++ticket;
    // The theme lazily creates slide contents and dispatches its own layout work.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (version === ticket) play(s || document.querySelector('#deck > .slide.active'));
    }));
  }
  window.addEventListener('swiss-slide-change', e => {
    finish();
    if (active) settleNative(active, false);
    schedule(e.detail && e.detail.slide);
  });
  // Imported result galleries can start their CSS after media/layout settles.
  // Catch these late starts too, without observing every class or DOM mutation.
  document.addEventListener('animationstart', e => {
    if (!(e.target instanceof Element)) return;
    const s = e.target.closest('.slide');
    if (!realSlide(s)) return;
    if (s !== active) { settleNative(s, false); return; }
    for (const a of s.getAnimations({subtree: true})) {
      if (!(a instanceof CSSAnimation) || a.animationName !== e.animationName || ambient.has(a)) continue;
      try {
        const permitted = nativeEnabled && plans.get(s.dataset.vmSlideId)?.ambient && ambientNames.test(a.animationName) && !reduced.matches && !printing && !document.hidden;
        if (permitted) {
          a.effect.updateTiming({duration: 6000, iterations: 2, delay: 0});
          a.currentTime = 0; a.play(); ambient.add(a);
        } else if (a.effect.getTiming().iterations === Infinity) { a.pause(); a.currentTime = 0; }
        else a.finish();
      } catch (_) {}
    }
  }, true);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { ++ticket; finish(); settleNative(active, false); }
    else schedule();
  });
  reduced.addEventListener('change', () => schedule());
  window.addEventListener('beforeprint', () => {
    printing = true; ++ticket; finish();
    document.querySelectorAll('#deck > .slide').forEach(s => settleNative(s, false));
  });
  window.addEventListener('afterprint', () => { printing = false; schedule(); });
  // Existing case selection changes .pca-content synchronously. Fade only its new panel.
  document.addEventListener('click', e => {
    if (!(e.target instanceof Element) || !e.target.closest('.pca-page nav button')) return;
    cancelAnimationFrame(panelFrame);
    const s = e.target.closest('.slide');
    panelFrame = requestAnimationFrame(() => {
      if (s !== active || !s.classList.contains('active') || reduced.matches || printing || document.hidden) return;
      const panel = s.querySelector('.pca-content');
      if (panel) { finish(); enter(panel, 0, 250, 0, true); }
    });
  }, true);
  window.__deckMotion = Object.freeze({
    finish,
    replay: () => schedule(),
    status: () => ({...last, plannedPages: plans.size, running: [...owned].filter(a => a.playState === 'running').length, ambient: [...ambient].filter(a => a.playState === 'running').length, reduced: reduced.matches, printing})
  });
  document.querySelectorAll('#deck > .slide').forEach(s => settleNative(s, false));
  schedule();
})();
