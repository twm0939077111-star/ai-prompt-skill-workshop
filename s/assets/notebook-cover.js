// Reuse the existing Skill chapter cover so typography, colors and ornaments stay aligned.
(() => {
  const id='local_notebook_opening', anchorId='local_notebook_intro';
  const deck=document.getElementById('deck'), modelElement=document.getElementById('deck-view-model');
  const anchor=deck?.querySelector(`[data-vm-slide-id="${anchorId}"]`);
  const reference=deck?.querySelector('[data-vm-slide-id="local_skill_opening"]');
  if(!anchor || !reference || !modelElement) return;
  const slide=deck.querySelector(`[data-vm-slide-id="${id}"]`) || reference.cloneNode(true);
  slide.className='slide final-skill-opening notebook-chapter-opening';
  Object.assign(slide.dataset,{vmSlideId:id,vmSlideKey:id,vmLayout:'LOCAL-SKILL-OPENING',layout:'LOCAL-SKILL-OPENING',themePack:'theme01',label:'NotebookLM 章節封面'});
  slide.querySelector('.fso-kicker').textContent='NEXT CHAPTER · NOTEBOOKLM';
  slide.querySelector('h1').innerHTML='接下來介紹<br><strong>NotebookLM</strong>';
  slide.querySelector('main > p').textContent='把你的資料，變成讀得懂、用得上的知識。';
  slide.querySelector('.fso-chip').innerHTML='<span>資料</span><b>→</b><span>重點</span><b>→</b><span>答案</span>';
  slide.querySelector('.fso-foot').textContent='AI 筆記助理與研究工具 · 現名 Gemini Notebook';
  anchor.before(slide);
  const model=JSON.parse(modelElement.textContent);
  const slides=model.slides.filter(s=>s.id!==id);
  slides.splice(slides.findIndex(s=>s.id===anchorId),0,{id,key:id,layout:'LOCAL-SKILL-OPENING',dataLayout:'LOCAL-SKILL-OPENING',themePack:'theme01',label:'NotebookLM 章節封面',props:{},media:{}});
  const order=(model.state?.slideOrder||slides.map(s=>s.id)).filter(s=>s!==id);
  order.splice(order.indexOf(anchorId),0,id);
  model.slides=slides;model.state={...model.state,slideOrder:order};modelElement.textContent=JSON.stringify(model);
  deck.querySelectorAll(':scope > .slide').forEach((s,i)=>{s.dataset.vmIndex=String(i);const badge=s.querySelector('.pl-opening-rule b');if(badge)badge.textContent=String(i+1).padStart(2,'0');});
})();
