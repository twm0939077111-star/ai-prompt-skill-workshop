(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const root = document.documentElement;
  const hero = $('.hero');
  const method = $('.method-section');
  const course = $('.course-section');
  const closing = $('.closing');
  const scenes = $$('.method-scene');
  const steps = $$('[data-step]');
  const motionButton = $('.motion-toggle');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const shortScreen = matchMedia('(max-height: 600px)');
  let paused = reduceMotion.matches;
  let motion = false;
  let activeScene = -1;
  let scheduled = false;
  let layout = {};
  const clamp = (x, min = 0, max = 1) => Math.min(max, Math.max(min, x));
  const ease = (x) => x * x * (3 - 2 * x);
  const span = (x, start, end) => ease(clamp((x - start) / (end - start)));
  const set = (element, key, value) => element.style.setProperty(key, value);
  function measure() {
    const y = window.scrollY;
    const height = window.innerHeight;
    layout = { height, heroTop: hero.getBoundingClientRect().top + y, heroRange: Math.max(1, hero.offsetHeight - height), methodTop: method.getBoundingClientRect().top + y, methodRange: Math.max(1, method.offsetHeight - height), courseTop: course.getBoundingClientRect().top + y, closingTop: closing.getBoundingClientRect().top + y };
    schedule();
  }
  function showScene(index) {
    if (activeScene === index) return;
    activeScene = index;
    scenes.forEach((scene, i) => {
      scene.classList.toggle('active', i === index);
      scene.inert = motion && i !== index;
      if (motion && i !== index) scene.setAttribute('aria-hidden', 'true');
      else scene.removeAttribute('aria-hidden');
    });
    steps.forEach((button, i) => i === index ? button.setAttribute('aria-current', 'step') : button.removeAttribute('aria-current'));
    set(method, '--method-light-x', `${index * -12}%`);
  }
  function render() {
    scheduled = false;
    if (!motion || !layout.height) return;
    const y = window.scrollY;
    const p = clamp((y - layout.heroTop) / layout.heroRange);
    const out = span(p, .05, .38);
    const enter = span(p, .35, .67);
    set(hero, '--hero-progress', p);
    set(hero, '--hero-scale', 1 + ease(p) * .57);
    set(hero, '--hero-x', `${-13 * ease(p)}%`);
    set(hero, '--hero-light', 1 - .46 * enter);
    set(hero, '--hero-copy-opacity', 1 - out);
    set(hero, '--hero-copy-y', `${-90 * out}px`);
    set(hero, '--hero-next-opacity', enter);
    set(hero, '--hero-next-y', `${55 * (1 - enter)}px`);
    set(hero, '--hero-next-scale', .91 + enter * .09);
    set(hero, '--hero-hint', 1 - out);
    $('.hero-opening').inert = out > .95;
    $('.hero-bottom').inert = out > .95;
    const mp = clamp((y - layout.methodTop) / layout.methodRange);
    showScene(Math.min(2, Math.floor(mp * 3)));
    const cp = clamp((y + layout.height - layout.courseTop) / (layout.height * .72));
    set(course, '--course-y', `${(1 - ease(cp)) * 100}px`);
    set(course, '--course-opacity', .45 + .55 * ease(cp));
    const ep = clamp((y + layout.height - layout.closingTop) / layout.height);
    set(closing, '--closing-scale', .82 + .18 * ease(ep));
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(render); } }
  function configureMotion() {
    motion = !paused && !shortScreen.matches;
    root.classList.toggle('motion', motion);
    root.classList.toggle('static-motion', !motion);
    motionButton.setAttribute('aria-pressed', String(!motion));
    motionButton.setAttribute('aria-label', motion ? '暫停動畫' : '啟用動畫');
    motionButton.title = motion ? '暫停動畫' : (shortScreen.matches ? '短螢幕使用一般閱讀模式' : '啟用動畫');
    motionButton.firstElementChild.textContent = motion ? 'Ⅱ' : '▷';
    motionButton.disabled = shortScreen.matches;
    $('.hero-opening').inert = false;
    $('.hero-bottom').inert = false;
    activeScene = -1;
    showScene(0);
    measure();
  }
  motionButton.addEventListener('click', () => {
    const sections = $$('main > section');
    const current = sections.find((section) => { const r = section.getBoundingClientRect(); return r.top <= 120 && r.bottom > 120; }) || hero;
    paused = !paused;
    configureMotion();
    window.scrollTo({ top: Math.max(0, current.getBoundingClientRect().top + window.scrollY - (current === hero ? 0 : 80)), behavior: 'instant' });
  });
  reduceMotion.addEventListener('change', () => { paused = reduceMotion.matches; configureMotion(); });
  shortScreen.addEventListener('change', configureMotion);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  if (document.fonts) document.fonts.ready.then(measure);
  new ResizeObserver(measure).observe(document.body);
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } });
  }, { threshold: .12 });
  $$('.reveal').forEach((element) => revealObserver.observe(element));
  steps.forEach((button, i) => button.addEventListener('click', () => {
    if (!motion) return;
    window.scrollTo({ top: layout.methodTop + layout.methodRange * ((i + .2) / 3), behavior: 'instant' });
    showScene(i);
  }));
  const menu = $('.menu-toggle');
  const nav = $('.main-nav');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menu.lastElementChild.textContent = '＋'; }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); menu.lastElementChild.textContent = open ? '−' : '＋';
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
  $$('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
    const target = $(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault(); closeMenu();
    history.replaceState(null, '', link.getAttribute('href'));
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, targetTop - (target === hero || target === method ? 0 : 80)), behavior: 'instant' });
    target.querySelectorAll('.reveal').forEach((element) => element.classList.add('in-view'));
    target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
    schedule();
  }));
  const topics = [
    { label: 'PROMPT / VISUAL CREATION', title: '把模糊的想法，\n變成清楚的描述。', description: '練習交代主體、用途、風格、版型與限制，再透過觀察與修改，接近自己想要的結果。', prompt: '請幫我規劃一張新品飲料的社群廣告。先詢問目標客群、產品特色與品牌風格，再提出主標、視覺構圖和版面建議。', outcome: '練習成果：一段能持續修改的 Prompt' },
    { label: 'INFORMATION / PRESENTATION', title: '讓資料有順序，\n讓重點被理解。', description: '從提供的內容整理摘要、簡報與資訊圖表，練習核對來源、選擇重點及安排敘事。', prompt: '請將我提供的資料整理成 5 頁簡報大綱。每頁包含一句主旨、3 個重點與建議圖表。只使用原始資料，缺少的數據標註「待確認」。', outcome: '練習成果：有邏輯、可核對的簡報大綱' },
    { label: 'SKILL / REUSABLE WORKFLOW', title: '做好一次，\n把方法留下來。', description: '以工作週報等重複任務為例，把需求、步驟與輸出格式整理成可再次使用的工作方法。', prompt: '請根據我的工作筆記整理週報，分為「已完成」「進行中」「下週計畫」「待確認」。保留實際進度，不新增未提供的成果或完成日期。', outcome: '練習成果：能重複使用的週報整理流程' },
    { label: 'INTERACTION / GAME REMIX', title: '從可玩的基底，\n做出自己的風格。', description: '以推箱子與第一人稱射擊的完整玩法為基底，練習改主題、角色、場景與介面。', prompt: '請保留現有推箱子的移動、推箱與過關規則，將主題改為太空補給站。重新設計角色、箱子、場景和介面，並檢查手機操作是否正常。', outcome: '練習成果：保留玩法、重新設計的遊戲版本' },
    { label: 'PERSONAL BRAND / WEB EXPERIENCE', title: '把自己的經歷，\n變成清楚的形象。', description: '整理背景、能力與經歷，使用 Lovable 製作個人網站，練習描述版型並檢查手機閱讀。', prompt: '請依照我提供的真實經歷，建立個人介紹網站。包含專業定位、實務經歷與可合作項目。使用清楚的文字層級，支援手機，不新增未提供的資歷或個資。', outcome: '練習成果：可閱讀、可修改的個人介紹網站' }
  ];
  const tabs = $$('[data-course]');
  const panel = $('#course-panel');
  const copyButton = $('#copy-prompt');
  let copyTimer;
  function selectCourse(index, focus = false) {
    const topic = topics[index];
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tabs[index].id);
    $('#course-label').textContent = topic.label;
    $('#course-topic').replaceChildren(...topic.title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    $('#course-description').textContent = topic.description;
    $('#course-prompt').textContent = topic.prompt;
    $('#course-outcome').textContent = topic.outcome;
    $('#course-count').textContent = `0${index + 1} / 05`;
    clearTimeout(copyTimer);
    copyButton.innerHTML = '複製提示詞 <span aria-hidden="true">⧉</span>';
    $('#copy-status').textContent = '';
    if (motion) { panel.classList.remove('panel-changing'); void panel.offsetWidth; panel.classList.add('panel-changing'); }
    const strip = $('.course-tabs');
    strip.scrollTo({ left: tabs[index].offsetLeft - strip.offsetLeft - (strip.clientWidth - tabs[index].clientWidth) / 2, behavior: motion ? 'smooth' : 'instant' });
    if (focus) tabs[index].focus({ preventScroll: true });
    measure();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCourse(index));
    tab.addEventListener('keydown', (event) => {
      const keys = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (event.key in keys) { event.preventDefault(); selectCourse(keys[event.key], true); }
    });
  });
  copyButton.addEventListener('click', async () => {
    const text = $('#course-prompt').textContent;
    let copied = false;
    try { await navigator.clipboard.writeText(text); copied = true; } catch (_) {
      const field = document.createElement('textarea'); field.value = text; field.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.append(field); field.select();
      try { copied = document.execCommand('copy'); } catch (_) { /* Manual selection below. */ }
      field.remove(); copyButton.focus({ preventScroll: true });
    }
    if (copied) { copyButton.textContent = '已複製 ✓'; $('#copy-status').textContent = '提示詞已複製'; }
    else { const range = document.createRange(); range.selectNodeContents($('#course-prompt')); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); copyButton.textContent = '請手動複製'; $('#copy-status').textContent = '已選取提示詞，請使用系統複製功能'; }
    clearTimeout(copyTimer); copyTimer = setTimeout(() => { copyButton.innerHTML = '複製提示詞 <span aria-hidden="true">⧉</span>'; }, 2500);
  });
  configureMotion();
})();
