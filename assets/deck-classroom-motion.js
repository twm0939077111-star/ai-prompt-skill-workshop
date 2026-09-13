(function () {
  'use strict';
  const plans = new Map((window.__classroomMotionPlan || []).map(p => [p.id, p]));
  const openingIds = new Set(['theme01_page004-1','local_practice_opening','theme01_page047-4','local_practice_method_opening','local_grok_opening','local_skill_opening','local_weekly_chapter_opening','local_ppt_chapter_opening']);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ambientNames = /^(cover-orb-[abcd]|fso-orbit-drift|dso-gentle-float)$/;
  const owned = new Set();
  const ambient = new Set();
  const decorations = new Set();
  let active = null, ticket = 0, printing = false, last = null, panelFrame = 0, runs = 0, nativeEnabled = false;
  const realSlide = s => s && s.parentElement === document.getElementById('deck');
  const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
  const select = (s, selector) => selector ? Array.from(s.querySelectorAll(selector)).filter(visible) : [];

  function finish() {
    nativeEnabled = false;
    for (const a of owned) { try { a.finish(); } catch (_) { a.cancel(); } }
    owned.clear();
    for (const el of decorations) el.remove();
    decorations.clear();
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
  // Individual transform properties preserve authored transform matrices and rotations.
  // All effects release their styles when finished; reading and export use the original layout.
  function compose(el, effect, index, count, delay, duration) {
    const cs = getComputedStyle(el), sign = index % 2 ? 1 : -1;
    let from = {opacity: 0}, mid = null, to = {opacity: cs.opacity};
    const move = (x,y) => { from.translate = `${x}px ${y}px`; to.translate = cs.translate; };
    const scale = value => { from.scale = value; to.scale = cs.scale; };
    const clip = value => { from.clipPath = value; to.clipPath = cs.clipPath; };
    switch (effect) {
      case 'zoom': scale('.82'); break;
      case 'stamp': scale('1.18'); mid={opacity:cs.opacity,scale:'.98',offset:.72}; break;
      case 'wipe': clip('inset(0 100% 0 0)'); break;
      case 'reveal': clip('inset(100% 0 0 0)'); move(0,10); break;
      case 'center': clip('inset(0 49.5% 0 49.5%)'); break;
      case 'drop': move(0,-32); break;
      case 'slide': move(-40,0); break;
      case 'spread': move((index-(count-1)/2)*-34,18); scale('.94'); break;
      case 'steps': move(-24,26); break;
      case 'opposed': move(sign*52,0); break;
      case 'chat': move(sign*32,12); scale('.92'); break;
      case 'bounce': move(0,36); mid={opacity:cs.opacity,translate:'0 -5px',offset:.7}; break;
      case 'unfold': clip('inset(0 0 100% 0)'); break;
      case 'doors': clip(index%2?'inset(0 100% 0 0)':'inset(0 0 0 100%)'); break;
      case 'typebars': clip('inset(0 100% 0 0)'); break;
      case 'assemble': move(sign*34,index%3===0?-22:22); break;
      case 'tiles': scale('.86'); move(0,12); break;
      case 'replace': move(0,index%2?28:-20); break;
      case 'fan': from.rotate=`${sign*7}deg`;to.rotate=cs.rotate;move(sign*22,20);break;
      case 'transform': move(index?42:-24,0);clip('inset(0 25% 0 0)');break;
      case 'gallery': move(0,30); scale('.93'); break;
      case 'spotlight': from.opacity=.32;mid={opacity:cs.opacity,offset:.45};break;
      case 'aperture': clip('circle(0% at 50% 50%)');to.clipPath='circle(75% at 50% 50%)';break;
      case 'flip': from.rotate=`y ${sign*65}deg`;to.rotate=cs.rotate;break;
      case 'depth': scale('.78');move(0,18);break;
      case 'pulse': from.opacity=.55;scale('.96');mid={opacity:cs.opacity,scale:'1.025',offset:.6};break;
      case 'fade': break;
      default: throw new Error('Unknown classroom effect: '+effect);
    }
    // Do not override existing individual transforms or authored clipping.
    for (const key of ['translate','rotate','scale','clipPath']) {
      if (cs[key] !== 'none') {delete from[key];delete to[key];if(mid)delete mid[key];}
    }
    const a=el.animate(mid?[from,mid,to]:[from,to],{duration,delay,fill:'backwards',easing:effect==='typebars'?'steps(9,end)':'cubic-bezier(.2,.75,.25,1)'});
    a.id='classroom-'+effect;
    owned.add(a);a.finished.then(()=>owned.delete(a),()=>owned.delete(a));
  }
  function accent(s, plan, title, blocks) {
    if (!plan.motif || plan.motif==='none') return;
    const targets=(plan.accent?select(s,plan.accent):blocks.length?blocks:[title]).filter(Boolean).slice(0,4);
    if(!targets.length)return;
    const ns='http://www.w3.org/2000/svg', svg=document.createElementNS(ns,'svg');
    svg.classList.add('classroom-accent');svg.setAttribute('aria-hidden','true');
    svg.setAttribute('viewBox',`0 0 ${s.clientWidth} ${s.clientHeight}`);
    const bounds=s.getBoundingClientRect(), sx=s.clientWidth/bounds.width, sy=s.clientHeight/bounds.height;
    const rects=targets.map(el=>{const r=el.getBoundingClientRect();return{x:(r.left-bounds.left)*sx,y:(r.top-bounds.top)*sy,w:r.width*sx,h:r.height*sy};});
    rects.forEach((r,i)=>{
      const x=Math.max(6,r.x-5), y=Math.max(6,r.y-5), w=Math.min(r.w+10,s.clientWidth-x-6), h=Math.min(r.h+10,s.clientHeight-y-6), k=Math.min(18,w/5,h/5);
      let d;
      switch(plan.motif){
        case 'underline':d=`M${x} ${y+h}h${Math.min(w,180)}`;break;
        case 'doubleline':d=`M${x} ${y+h}h${Math.min(w,150)}m0 6h-${Math.min(w,70)}`;break;
        case 'rail':d=`M${x} ${y}v${h}`;break;
        case 'connect':d=`M${x} ${y}h${w}`;break;
        case 'brackets':d=`M${x+k} ${y}h-${k}v${h}h${k}M${x+w-k} ${y}h${k}v${h}h-${k}`;break;
        case 'corners':d=`M${x+k} ${y}h-${k}v${k}M${x+w-k} ${y+h}h${k}v-${k}`;break;
        case 'frame':d=`M${x} ${y}h${w}v${h}h-${w}Z`;break;
        case 'halo':d=`M${x+w/2-22} ${y+h/2}a22 22 0 1 0 44 0a22 22 0 1 0 -44 0`;break;
        case 'cursor':d=`M${x+w} ${y}v${Math.min(h,35)}`;break;
        case 'dots':d=`M${x} ${y+h}h2m10 0h2m10 0h2`;break;
        case 'check':d=`M${x} ${y+h-9}l6 6l12 -16`;break;
        default:throw new Error('Unknown classroom motif: '+plan.motif);
      }
      // Halo lives above the item, keeping its content unobscured.
      if(plan.motif==='halo')d=`M${x+w-44} ${Math.max(24,y)}a18 18 0 1 0 36 0a18 18 0 1 0 -36 0`;
      const path=document.createElementNS(ns,'path');path.setAttribute('d',d);path.setAttribute('pathLength','1');svg.appendChild(path);
      const a=path.animate([{strokeDashoffset:1,opacity:0},{strokeDashoffset:0,opacity:.65,offset:.65},{strokeDashoffset:0,opacity:0}],{duration:1000,delay:220+i*100,fill:'both',easing:'ease-out'});
      a.id='classroom-accent-'+plan.motif;owned.add(a);a.finished.then(()=>owned.delete(a),()=>owned.delete(a));
    });
    s.appendChild(svg);decorations.add(svg);
    Promise.all(svg.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{}))).then(()=>{svg.remove();decorations.delete(svg);});
  }
  function play(s) {
    if (!realSlide(s) || !s.classList.contains('active')) return;
    finish();
    if (active && active !== s) settleNative(active, false);
    active = s;
    const plan = plans.get(s.dataset.vmSlideId);
    s.toggleAttribute('data-classroom-static', !openingIds.has(s.dataset.vmSlideId));
    nativeEnabled = !!plan && openingIds.has(plan.id) && !reduced.matches && !printing && !document.hidden;
    settleNative(s, nativeEnabled && plan.ambient);
    if (!plan) { last = {id: s.dataset.vmSlideId, missing: true}; return; }
    const title = select(s, 'h1, h2, .pi-v5-command-line')[0];
    const candidates = select(s, plan.blocks).filter(el => !title || (el !== title && !el.contains(title) && !title.contains(el)));
    const blocks = candidates.filter(el=>!candidates.some(parent=>parent!==el&&parent.contains(el)));
    last = {run: ++runs, id: plan.id, page: plan.page, enabled:openingIds.has(plan.id), size: plan.size, composition:plan.composition, titleEffect:plan.titleEffect, blockEffect:plan.blockEffect, motif:plan.motif, title: !!title, blocks: blocks.length, suppressed: !openingIds.has(plan.id) || reduced.matches || printing || document.hidden};
    if (last.suppressed) return;
    // Distances are authored-stage pixels, independent of the displayed deck scale.
    const big = plan.size === 'large', small = plan.size === 'small';
    // Read geometry before animating any ancestor/target.
    accent(s,plan,title,blocks);
    if (title) compose(title,plan.titleEffect,0,1,0,big?750:small?420:580);
    blocks.slice(0, 8).forEach((el, i) => {
      const delay = 90 + (plan.mode === 'together' ? 0 : i * 75);
      compose(el,plan.blockEffect,i,blocks.length,delay,small?450:650);
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
      if (s !== active || !openingIds.has(s.dataset.vmSlideId) || !s.classList.contains('active') || reduced.matches || printing || document.hidden) return;
      const panel = s.querySelector('.pca-content');
      if (panel) { finish(); enter(panel, 0, 250, 0, true); }
    });
  }, true);
  window.__deckMotion = Object.freeze({
    finish,
    replay: () => schedule(),
    status: () => ({...last, plannedPages: plans.size, running: [...owned].filter(a => a.playState === 'running').length, ambient: [...ambient].filter(a => a.playState === 'running').length, reduced: reduced.matches, printing})
  });
  document.querySelectorAll('#deck > .slide').forEach(s => {s.toggleAttribute('data-classroom-static',!openingIds.has(s.dataset.vmSlideId));settleNative(s, false);});
  schedule();
})();
