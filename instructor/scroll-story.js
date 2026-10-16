'use strict';
(() => {
  const html = document.documentElement;
  const hero = document.querySelector('.hero');
  const heroStage = document.querySelector('.hero-stage');
  const heroCopy = document.querySelector('.hero-copy');
  const heroMessage = document.querySelector('.hero-message');
  const cap = document.querySelector('.capability-section');
  const capStage = document.querySelector('.capability-stage');
  const capViewport = document.querySelector('.capability-viewport');
  const cards = [...document.querySelectorAll('.capability')];
  const sceneButtons = [...document.querySelectorAll('[data-scene]')];
  const ai = document.querySelector('.ai-section');
  const workspace = document.querySelector('.learning-workspace');
  const rows = [...document.querySelectorAll('.experience-list details')];
  const conviction = document.querySelector('.conviction-text');
  const words = [...conviction.querySelectorAll('span')];
  const closing = document.querySelector('.closing');
  const mobile = matchMedia('(max-width: 800px)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const shortViewport = matchMedia('(max-height: 599px)');
  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const ease = n => n * n * (3 - 2 * n);
  const range = (n, from, to) => ease(clamp((n - from) / (to - from)));
  const put = (element, key, value) => element.style.setProperty(key, String(value));
  let queued = false;
  let enabled = false;
  let activeScene = -1;

  // Read geometry first, then write styles. Only scroll/resize schedules a frame.
  // No wheel interception, perpetual render loop, or third-party animation runtime.
  function render() {
    queued = false;
    const vh = window.innerHeight;
    const header = mobile.matches ? 68 : 80;
    const scrollable = html.scrollHeight - vh;
    const pageProgress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
    if (!enabled) {
      put(html, '--page-progress', pageProgress);
      return;
    }
    const heroRect = hero.getBoundingClientRect();
    const capRect = cap.getBoundingClientRect();
    const aiRect = ai.getBoundingClientRect();
    const workspaceRect = workspace.getBoundingClientRect();
    const rowRects = rows.map(row => row.getBoundingClientRect());
    const convictionRect = conviction.getBoundingClientRect();
    const closingRect = closing.getBoundingClientRect();
    const heroHeight = heroStage.offsetHeight;
    const capHeight = capStage.offsetHeight;
    const cardWidth = capViewport.clientWidth;
    const heroWidth = hero.querySelector('.hero-layout').clientWidth;
    put(html, '--page-progress', pageProgress);

    if (heroRect.bottom > 0 && heroRect.top < vh) {
      const p = clamp((header - heroRect.top) / Math.max(1, heroRect.height - heroHeight));
      const zoom = range(p, .08, .76);
      const message = range(p, .43, .67);
      put(hero, '--hero-copy-opacity', 1 - range(p, .08, .36));
      put(hero, '--hero-copy-lift', range(p, .06, .4) * 65);
      put(hero, '--hero-copy-scale', 1 - range(p, .06, .4) * .08);
      put(hero, '--hero-zoom', 1 + zoom * (mobile.matches ? 1.4 : 1.55));
      put(hero, '--hero-shift', zoom * (mobile.matches ? heroHeight * .26 : heroWidth * .255));
      put(hero, '--hero-art-opacity', 1 - zoom * .3);
      put(hero, '--hero-message-opacity', message);
      put(hero, '--hero-message-lift', (1 - message) * 40);
      put(hero, '--hero-rail-opacity', 1 - range(p, .02, .23));
      put(hero, '--hero-cue-opacity', 1 - range(p, .82, 1));
      hero.dataset.heroPhase = p > .43 ? 'message' : 'intro';
      heroCopy.inert = p > .36;
      heroMessage.inert = p <= .43;
    }

    if (capRect.bottom > 0 && capRect.top < vh) {
      const p = clamp((header - capRect.top) / Math.max(1, capRect.height - capHeight));
      // Hold each composition long enough to read, with deliberate short transitions.
      const travel = p < .5 ? range(p, .14, .39) : 1 + range(p, .61, .86);
      put(cap, '--cap-shift', travel * (cardWidth + (mobile.matches ? 20 : 30)));
      cards.forEach((card, i) => {
        const distance = clamp(Math.abs(travel - i));
        put(card, '--card-scale', 1 - distance * .06);
        put(card, '--card-opacity', 1 - distance * .55);
        put(card, '--card-turn', (travel - i) * 23);
      });
      const nextScene = Math.round(travel);
      if (nextScene !== activeScene) {
        activeScene = nextScene;
        cap.dataset.scene = String(nextScene + 1);
        sceneButtons.forEach((button, i) => {
          if (i === nextScene) button.setAttribute('aria-current', 'step');
          else button.removeAttribute('aria-current');
        });
      }
      sceneButtons.forEach((button, i) => put(button, '--scene-fill', i < nextScene ? 1 : i === nextScene ? .6 : 0));
    }

    if (aiRect.bottom > 0 && aiRect.top < vh) {
      const entry = range(vh - aiRect.top, 0, vh * .9);
      const panel = range(vh - workspaceRect.top, 0, vh * .7);
      put(ai, '--ai-inset', (1 - entry) * (mobile.matches ? 4 : 8));
      put(ai, '--ai-radius', (1 - entry) * 65);
      put(ai, '--ai-lift', (1 - entry) * 55);
      put(ai, '--workspace-opacity', .55 + panel * .45);
      put(ai, '--workspace-lift', (1 - panel) * 35);
      put(ai, '--workspace-tilt', (1 - panel) * (mobile.matches ? 3 : 7));
    }
    rows.forEach((row, i) => {
      if (rowRects[i].bottom <= 0 || rowRects[i].top >= vh) return;
      const entry = range(vh - rowRects[i].top, 0, vh * .3);
      put(row, '--row-opacity', .35 + entry * .65);
      put(row, '--row-shift', (1 - entry) * (mobile.matches ? 16 : 50));
    });
    if (convictionRect.bottom > 0 && convictionRect.top < vh) {
      const progress = clamp((vh * .87 - convictionRect.top) / (vh * .64));
      words.forEach((word, i) => put(word, '--read', `${clamp(progress * 3.5 - i) * 100}%`));
    }
    if (closingRect.bottom > 0 && closingRect.top < vh) {
      const entry = range(vh - closingRect.top, 0, vh * .95);
      put(closing, '--closing-shift', (1 - entry) * 70);
      put(closing, '--closing-scale', .8 + entry * .2);
      put(closing, '--closing-opacity', .2 + entry * .8);
    }
  }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(render);
  }
  function updateMode() {
    // Landscape phones need normal document flow so controls stay reachable.
    enabled = html.dataset.motion !== 'off' && !reduceMotion.matches && !shortViewport.matches;
    html.classList.toggle('scroll-ready', enabled);
    if (!enabled) {
      heroCopy.inert = false;
      heroMessage.inert = true;
    }
    schedule();
  }
  sceneButtons.forEach((button, index) => button.addEventListener('click', () => {
    if (!enabled) return;
    const header = mobile.matches ? 68 : 80;
    const start = cap.getBoundingClientRect().top + window.scrollY - header;
    const travel = cap.offsetHeight - capStage.offsetHeight;
    window.scrollTo({ top: start + travel * [0.07, .5, .93][index], behavior: 'smooth' });
  }));
  // Keyboard focus must not land on a visually faded hero CTA.
  new MutationObserver(updateMode).observe(html, { attributes: true, attributeFilter: ['data-motion'] });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  mobile.addEventListener('change', schedule);
  reduceMotion.addEventListener('change', updateMode);
  shortViewport.addEventListener('change', updateMode);
  // Expanded experience details and loaded fonts can change scene positions.
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', schedule));
  if (document.fonts) document.fonts.ready.then(schedule);
  updateMode();
})();
