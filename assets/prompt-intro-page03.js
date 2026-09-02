(() => {
  const SLIDE_ID = 'theme01_page047-4';

  function mount() {
    const slide = document.querySelector(`[data-vm-slide-id="${SLIDE_ID}"]`);
    if (!slide || slide.querySelector('.pi-page')) return Boolean(slide);

    slide.dataset.label = '什麼是 Prompt';
    slide.innerHTML = `
      <section class="pi-page" aria-label="什麼是 Prompt">
        <div class="pi-orb pi-orb-a"></div><div class="pi-orb pi-orb-b"></div>
        <div class="pi-topline"><span>CHAPTER 01</span><i></i><b>PROMPT BASICS</b></div>
        <div class="pi-hero">
          <p class="pi-kicker">先從一句話開始理解</p>
          <h1>Prompt，就是你告訴 AI：<em>這次要做什麼。</em></h1>
          <p class="pi-lead">它不只是一句話，而是一份讓 AI 理解目標、風格與重點的任務說明。</p>
        </div>
        <div class="pi-cards">
          <article class="pi-card"><span class="pi-num">01</span><h2>要做什麼</h2><p>例如：做一張醫美 Facebook 廣告</p></article>
          <article class="pi-card"><span class="pi-num">02</span><h2>想要什麼樣子</h2><p>例如：粉色 Y2K、年輕、吸睛</p></article>
          <article class="pi-card"><span class="pi-num">03</span><h2>哪些地方不能錯</h2><p>例如：價格要大、人物不要被文字遮住</p></article>
        </div>
        <div class="pi-formula"><b>Prompt</b><span>=</span><strong>任務</strong><i>＋</i><strong>視覺方向</strong><i>＋</i><strong>重點與限制</strong></div>
        <p class="pi-bridge">接下來你會看到：只差一點說法，成果可以差很多。</p>
      </section>`;
    return true;
  }

  if (!mount()) {
    new MutationObserver((_, observer) => {
      if (mount()) observer.disconnect();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
