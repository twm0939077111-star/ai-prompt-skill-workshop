(() => {
  const definitions = [
    {id:'local_chatgpt_intro',label:'什麼是 ChatGPT？',body:`
      <header class="ts-head"><p class="ts-kicker">認識 CHATGPT · 01</p><h2>什麼是 <em>ChatGPT</em>？</h2></header>
      <main class="cg-definition"><span class="cg-pill">能用對話互動的 AI 工具</span>
        <p class="cg-big">用日常說話的方式，<br>請 <strong>AI</strong> 協助你。</p>
        <div class="cg-simple"><span>你說出需求</span><b aria-hidden="true">→</b><span>它產生回覆</span></div>
      </main>
      <footer class="cg-foot">它是 AI，不是真人；回答不一定正確，重要資訊要再確認。</footer>`},
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
