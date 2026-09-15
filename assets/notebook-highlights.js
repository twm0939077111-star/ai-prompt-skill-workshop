(() => {
  const id = 'local_notebook_highlights', anchorId = 'local_notebook_intro';
  const deck = document.getElementById('deck'), modelElement = document.getElementById('deck-view-model');
  const anchor = deck?.querySelector(`[data-vm-slide-id="${anchorId}"]`);
  if (!anchor || !modelElement) return;
  const label = 'Gemini Notebook｜三個重點';
  const slide = deck.querySelector(`[data-vm-slide-id="${id}"]`) || document.createElement('section');
  slide.className = 'slide notebook-intro-slide';
  Object.assign(slide.dataset, {layout:'LOCAL-TOOL-SETUP',vmLayout:'LOCAL-TOOL-SETUP',vmSlideId:id,vmSlideKey:id,themePack:'theme01',label});
  slide.innerHTML = `<section class="nb-page nb-highlights" aria-label="${label}">
<header class="nb-heading"><p class="nb-kicker">GEMINI NOTEBOOK</p><h2>學習資料，<em>更有方法</em></h2></header>
<main class="nb-highlight-list">
<article><span class="nb-highlight-no">01</span><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 9h25l11 11v34H14zM39 9v13h11M23 43v-9m9 9V28m9 15V32"/></svg><h3>即時分析資料</h3></article>
<article><span class="nb-highlight-no">02</span><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M26 39l-4 4a10 10 0 0 1-14-14l12-12a10 10 0 0 1 14 0M38 25l4-4a10 10 0 0 1 14 14L44 47a10 10 0 0 1-14 0M24 40l16-16"/></svg><h3>除了答案，更附上來源</h3></article>
<article><span class="nb-highlight-no">03</span><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 37V29a22 22 0 0 1 44 0v8M10 33H7v18h12V33zm44 0h3v18H45V33zM25 32v12l12-6z"/></svg><h3>隨時隨地邊聽邊學</h3></article>
</main></section>`;
  anchor.after(slide);
  const model = JSON.parse(modelElement.textContent);
  const entry = {id,key:id,layout:'LOCAL-TOOL-SETUP',dataLayout:'LOCAL-TOOL-SETUP',themePack:'theme01',label,props:{},media:{}};
  const slides = model.slides.filter(s => s.id !== id);
  slides.splice(slides.findIndex(s => s.id === anchorId)+1,0,entry);
  const order = (model.state?.slideOrder || slides.map(s => s.id)).filter(s => s !== id);
  order.splice(order.indexOf(anchorId)+1,0,id);
  model.slides = slides; model.state = {...model.state,slideOrder:order};
  modelElement.textContent = JSON.stringify(model);
  deck.querySelectorAll(':scope > .slide').forEach((s,i) => {s.dataset.vmIndex=String(i);const badge=s.querySelector('.pl-opening-rule b');if(badge)badge.textContent=String(i+1).padStart(2,'0');});
})();
