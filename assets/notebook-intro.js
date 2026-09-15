(() => {
  const id = 'local_notebook_intro', anchorId = 'local_skill_opening';
  const deck = document.getElementById('deck'), modelElement = document.getElementById('deck-view-model');
  const anchor = deck?.querySelector(`[data-vm-slide-id="${anchorId}"]`);
  if (!anchor || !modelElement) return;
  const label = '認識 NotebookLM｜Gemini Notebook';
  const slide = deck.querySelector(`[data-vm-slide-id="${id}"]`) || document.createElement('section');
  slide.className = 'slide notebook-intro-slide';
  Object.assign(slide.dataset, {layout:'LOCAL-TOOL-SETUP',vmLayout:'LOCAL-TOOL-SETUP',vmSlideId:id,vmSlideKey:id,themePack:'theme01',label});
  slide.innerHTML = `<section class="nb-page" aria-label="${label}">
    <header class="nb-heading"><p class="nb-kicker">GOOGLE AI / RESEARCH & NOTES</p>
      <h2>認識 <em>NotebookLM</em></h2>
      <div class="nb-name"><b>現名 Gemini Notebook</b><span>2026 年 7 月 16 日正式更名</span></div>
      <p class="nb-definition">Google 開發的 <strong>AI 筆記助理與研究工具</strong>，幫你讀懂自己的資料。</p>
    </header>
    <main class="nb-flow" aria-label="從提供資料到整理答案">
      <section class="nb-sources"><span class="nb-step">01 / 提供資料</span><h3>先放進你的來源</h3>
        <ul><li><b>文件</b><span>PDF、Google 文件等</span></li><li><b>網頁</b><span>匯入網址中的文字內容</span></li><li><b>影片</b><span>公開 YouTube 影片的字幕</span></li></ul>
      </section>
      <span class="nb-arrow" aria-hidden="true">→</span>
      <section class="nb-results"><span class="nb-step">02 / 根據來源回答</span><h3>把資料整理成你需要的答案</h3>
        <div class="nb-actions"><div><b>摘要</b><span>整理重點</span></div><div><b>問答</b><span>解答疑問</span></div><div><b>分析</b><span>比較與歸納</span></div></div>
        <p class="nb-example">例如：「根據這份資料，整理三個重點，<br>並標示引用來源。」</p>
      </section>
    </main>
    <aside class="nb-grounding"><div><b>核心特色：來源導向</b><span>Source-grounding</span></div><p>以你選定的資料為依據，透過引用回查原文。<br><strong>減少無根據的回答；AI 仍可能出錯，重要內容請核對來源。</strong></p></aside>
    <footer class="nb-footer"><span>資料核對：2026.09.15</span><nav aria-label="官方資料"><a href="https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/" target="_blank" rel="noopener noreferrer">Google 更名公告 ↗</a><a href="https://support.google.com/gemininotebook/answer/16215270?hl=zh-Hant" target="_blank" rel="noopener noreferrer">來源使用說明 ↗</a></nav></footer>
  </section>`;
  anchor.before(slide);
  const model = JSON.parse(modelElement.textContent);
  const entry = {id,key:id,layout:'LOCAL-TOOL-SETUP',dataLayout:'LOCAL-TOOL-SETUP',themePack:'theme01',label,props:{},media:{}};
  const slides = model.slides.filter(s => s.id !== id);
  slides.splice(slides.findIndex(s => s.id === anchorId),0,entry);
  const order = (model.state?.slideOrder || slides.map(s => s.id)).filter(s => s !== id);
  order.splice(order.indexOf(anchorId),0,id);
  model.slides = slides; model.state = {...model.state,slideOrder:order};
  modelElement.textContent = JSON.stringify(model);
  deck.querySelectorAll(':scope > .slide').forEach((s,i) => {s.dataset.vmIndex=String(i);const badge=s.querySelector('.pl-opening-rule b');if(badge)badge.textContent=String(i+1).padStart(2,'0');});
})();
