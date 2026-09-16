(() => {
  const deck=document.getElementById('deck'),el=document.getElementById('deck-view-model');
  if(!deck||!el||deck.querySelector('[data-vm-slide-id="local_prompt_review"]'))return;
  const id='local_prompt_review',title='課後總複習';
  const s=document.createElement('section');s.className='slide review-cover';
  Object.assign(s.dataset,{vmSlideId:id,vmSlideKey:id,vmLayout:'LOCAL-SKILL-OPENING',layout:'LOCAL-SKILL-OPENING',chapter:'複習篇',label:title,themePack:'theme01'});
  s.innerHTML=`<div class="rc-glow" aria-hidden="true"></div><header class="rc-top"><span class="rc-brand"><i></i>AI 公開教學工作坊</span><span class="rc-issue"><i></i>WORKSHOP · REVIEW</span></header><main class="rc-card"><span class="rc-tab" aria-hidden="true"></span><span class="rc-sticker">● 換你實作</span><p class="rc-overline">AI LEARNING WORKSHOP / REVIEW</p><h1><span>課後總複習</span></h1><p class="rc-question">這次學的，你會用了嗎？</p><p class="rc-topics">Prompt 複習 · Skill 複習</p><div class="rc-steps"><div><b>01</b><strong>回顧重點</strong><span>把學過的方法串起來</span></div><div><b>02</b><strong>看懂範例</strong><span>對照指令與實際成果</span></div><div><b>03</b><strong>自己試做</strong><span>換成你的情境與需求</span></div></div></main><footer class="rc-foot">從看懂，到自己做出來。</footer><span class="rc-orb" aria-hidden="true"></span>`;
  deck.append(s);
  const model=JSON.parse(el.textContent);model.slides.push({id,key:id,layout:'LOCAL-SKILL-OPENING',dataLayout:'LOCAL-SKILL-OPENING',themePack:'theme01',label:title,props:{},media:{}});
  const byId=new Map(model.slides.map(x=>[x.id,x]));model.slides=[...deck.querySelectorAll(':scope > .slide')].map((x,i)=>{x.dataset.vmIndex=String(i);return byId.get(x.dataset.vmSlideId)});model.state={...model.state,slideOrder:model.slides.map(x=>x.id)};el.textContent=JSON.stringify(model);
})();
