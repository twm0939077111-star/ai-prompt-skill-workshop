(() => {
  const definitions = [
    {id:'local_chatgpt_intro',label:'認識 ChatGPT',body:`
      <header class="ts-head cg-ui-heading"><h2>認識 <em>ChatGPT</em></h2><span>介面示意</span></header>
      <main class="cg-interface" aria-label="ChatGPT 空白對話介面教學示意">
        <div class="cg-window-bar"><span class="cg-window-dots" aria-hidden="true">● ● ●</span><span>chatgpt.com</span><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">開啟 ChatGPT ↗</a></div>
        <div class="cg-window-content"><div class="cg-app-label">ChatGPT <span aria-hidden="true">⌄</span></div>
          <p class="cg-empty-title">有什麼我可以幫忙的嗎？</p>
          <div class="cg-composer" aria-label="訊息輸入框示意，非實際輸入欄位"><span class="cg-placeholder">傳送訊息給 ChatGPT</span><div class="cg-composer-tools" aria-hidden="true"><span>＋</span><span class="cg-send">↑</span></div></div>
        </div>
      </main>
      <div class="cg-input-guide"><span aria-hidden="true">↑</span>在這裡，把你的需求告訴它。</div>`},
    {id:'local_chatgpt_uses',label:'ChatGPT 可以幫你做什麼？',body:`
      <header class="ts-head"><p class="ts-kicker">認識 CHATGPT · 02</p><h2><em>ChatGPT</em> 可以幫你做什麼？</h2></header>
      <main class="cg-cards">
        <article><span class="cg-number">01</span><h3>解釋事情</h3><p>把不懂的內容<br>說清楚</p><div class="cg-example">「用白話解釋什麼是 AI。」</div></article>
        <article><span class="cg-number">02</span><h3>整理資料</h3><p>把零散的內容<br>整理成重點</p><div class="cg-example">「把這份筆記整理成三點。」</div></article>
        <article><span class="cg-number">03</span><h3>發想內容</h3><p>一起想文案、點子<br>和做法</p><div class="cg-example">「幫水餃店想三個貼文主題。」</div></article>
      </main>
      <footer class="cg-foot">先說你需要什麼；看過回答後，還可以繼續補充或請它修改。</footer>`}
  ];
  const deck=document.getElementById('deck'), modelElement=document.getElementById('deck-view-model');
  let anchor=deck?.querySelector('[data-vm-slide-id="local_tool_setup"]');
  if(!anchor||!modelElement)return;
  const ids=definitions.map(d=>d.id);
  for(const d of definitions){
    const slide=deck.querySelector(`[data-vm-slide-id="${d.id}"]`)||document.createElement('section');
    slide.className='slide local-chatgpt-intro-slide';
    Object.assign(slide.dataset,{layout:'LOCAL-TOOL-SETUP',vmLayout:'LOCAL-TOOL-SETUP',vmSlideId:d.id,vmSlideKey:d.id,themePack:'theme01',label:d.label});
    slide.innerHTML=`<section class="ts-slide cg-intro" aria-label="${d.label}"><div class="ts-bg" aria-hidden="true"><i></i><i></i><i></i></div>${d.body}</section>`;
    anchor.insertAdjacentElement('afterend',slide);anchor=slide;
  }
  const model=JSON.parse(modelElement.textContent);
  const slides=(model.slides||[]).filter(s=>!ids.includes(s.id));
  slides.splice(slides.findIndex(s=>s.id==='local_tool_setup')+1,0,...definitions.map(d=>({id:d.id,key:d.id,layout:'LOCAL-TOOL-SETUP',dataLayout:'LOCAL-TOOL-SETUP',themePack:'theme01',label:d.label,props:{},media:{}})));
  model.slides=slides;
  const order=(model.state?.slideOrder||slides.map(s=>s.id)).filter(id=>!ids.includes(id));
  order.splice(order.indexOf('local_tool_setup')+1,0,...ids);
  model.state={...(model.state||{}),slideOrder:order};model.exportId='chatgpt-two-pages-20260913';modelElement.textContent=JSON.stringify(model);
  deck.querySelectorAll(':scope > .slide').forEach((s,i)=>{s.dataset.vmIndex=String(i);const badge=s.querySelector('.pl-opening-rule b');if(badge)badge.textContent=String(i+1).padStart(2,'0');});
})();
