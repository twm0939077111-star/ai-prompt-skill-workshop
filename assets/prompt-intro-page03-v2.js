(() => {
  const SLIDE_ID = 'theme01_page047-4';
  function mount() {
    const slide = document.querySelector(`[data-vm-slide-id="${SLIDE_ID}"]`);
    if (!slide || slide.querySelector('.pi-v2')) return Boolean(slide);
    slide.dataset.label = '什麼是 Prompt';
    slide.innerHTML = `
      <section class="pi-v2" aria-label="Prompt 是什麼">
        <div class="pi-v2-glow pi-v2-glow-a"></div><div class="pi-v2-glow pi-v2-glow-b"></div>
        <div class="pi-v2-meta"><span>CHAPTER 01</span><i></i><b>START WITH PROMPT</b></div>
        <div class="pi-v2-copy">
          <p class="pi-v2-eyebrow">先讓 AI 聽懂你的需求</p>
          <h1>Prompt<br><em>是什麼？</em></h1>
          <p class="pi-v2-sub">今天都會用社群圖文的指令去示範</p>
          <div class="pi-v2-definition"><b>Prompt</b><span>就是你交給 AI 的需求說明。</span></div>
        </div>
        <div class="pi-v2-social" aria-label="社群圖文指令示意">
          <div class="pi-v2-social-top"><span class="pi-v2-avatar"></span><b>你的品牌帳號</b><i>•••</i></div>
          <div class="pi-v2-art"><span class="pi-v2-art-dot"></span><strong>MAKE<br>IT<br>CLEAR.</strong><em>AI</em></div>
          <div class="pi-v2-social-bottom"><b>一段好 Prompt，讓 AI 更知道怎麼做。</b><span>♡　○　↗</span></div>
        </div>
        <div class="pi-v2-tags"><span><b>01</b> 主題</span><i>＋</i><span><b>02</b> 視覺風格</span><i>＋</i><span><b>03</b> 文字重點</span></div>
      </section>`;
    return true;
  }
  if (!mount()) new MutationObserver((_, o) => { if (mount()) o.disconnect(); }).observe(document.documentElement, {childList:true,subtree:true});
})();
