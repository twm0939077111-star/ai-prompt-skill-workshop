(() => {
  const SLIDE_ID = 'theme01_page047-4';
  function mount() {
    const slide = document.querySelector(`[data-vm-slide-id="${SLIDE_ID}"]`);
    if (!slide || slide.querySelector('.pi-v3')) return Boolean(slide);
    slide.dataset.label = 'Prompt 是 AI 的導演指示';
    slide.innerHTML = `
      <section class="pi-v3" aria-label="Prompt 是 AI 的導演指示">
        <div class="pi-v3-glow pi-v3-glow-a"></div><div class="pi-v3-glow pi-v3-glow-b"></div>
        <header class="pi-v3-head"><span>CHAPTER 01</span><i></i><b>DIRECT THE AI</b></header>
        <div class="pi-v3-title"><p>先把腦中的畫面說清楚</p><h1>Prompt <em>不是願望</em></h1><strong>而是給 AI 的導演指示。</strong></div>
        <div class="pi-v3-stage" aria-label="Prompt 的四個分鏡元素">
          <div class="pi-v3-board"><span class="pi-v3-board-label">AI DIRECTOR'S NOTE</span><b>PROMPT</b><small>讓 AI 知道要為誰、做什麼、做成什麼樣子。</small><div class="pi-v3-board-lines"><i></i><i></i><i></i></div></div>
          <article class="pi-v3-frame pi-v3-frame-a"><b>01</b><span>主題</span><strong>要說什麼？</strong></article>
          <article class="pi-v3-frame pi-v3-frame-b"><b>02</b><span>受眾</span><strong>要給誰看？</strong></article>
          <article class="pi-v3-frame pi-v3-frame-c"><b>03</b><span>風格</span><strong>想要什麼感覺？</strong></article>
          <article class="pi-v3-frame pi-v3-frame-d"><b>04</b><span>用途</span><strong>希望帶來什麼行動？</strong></article>
        </div>
        <footer class="pi-v3-footer"><b>好 Prompt 的本質：</b><span>把你的判斷，轉成 AI 可以執行的畫面指令。</span></footer>
      </section>`;
    return true;
  }
  if (!mount()) new MutationObserver((_, observer) => { if (mount()) observer.disconnect(); }).observe(document.documentElement, { childList:true, subtree:true });
})();
