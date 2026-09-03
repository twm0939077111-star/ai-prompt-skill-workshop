(() => {
  const SLIDE_ID = 'theme01_page047-4';

  function mount() {
    const slide = document.querySelector(`[data-vm-slide-id="${SLIDE_ID}"]`);
    if (!slide || slide.querySelector('.pi-v5')) return Boolean(slide);

    slide.dataset.label = '首先我們介紹甚麼是 Prompt';
    slide.innerHTML = `
      <section class="pi-v5" aria-label="首先我們介紹甚麼是 Prompt">
        <p class="pi-v5-intro">首先，我們介紹</p>
        <div class="pi-v5-command">
          <div class="pi-v5-command-meta">
            <span>PROMPT / 01</span><b><i></i> READY</b>
          </div>
          <div class="pi-v5-command-line">
            <span class="pi-v5-chevron">&gt;</span>
            <strong>甚麼是</strong>
            <em>Prompt</em>
            <b>？</b>
            <i class="pi-v5-cursor"></i>
          </div>
        </div>
        <p class="pi-v5-caption">把想法說清楚，AI 才知道怎麼做</p>
        <div class="pi-v5-flow" aria-hidden="true">
          <span>INPUT</span><i></i><span>INTENT</span><i></i><span>OUTPUT</span>
        </div>
      </section>`;
    return true;
  }

  if (!mount()) {
    new MutationObserver((_, observer) => {
      if (mount()) observer.disconnect();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();

