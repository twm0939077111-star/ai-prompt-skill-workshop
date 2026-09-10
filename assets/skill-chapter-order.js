(() => {
  'use strict';
  const groups = [
    {"title":"Skill 基本概念","ids":["local_skill_opening","local_skill_definition","local_skill_storyboard","local_skill_roles","local_ppt_skill_intro","local_skill_jobs","local_skill_use"]},
    {"title":"應用一｜工作週報","ids":["local_weekly_chapter_opening","local_weekly_setup","local_weekly_data","local_weekly_prompt","local_weekly_practice"]},
    {"title":"應用二｜PPT 簡報製作","ids":["local_ppt_chapter_opening","local_skill_theme02","local_skill_theme08","local_skill_theme09","local_practice_marketing_deck"]},
    {"title":"自製 Skill","ids":["local_skill_build"]}
  ];
  const removed = ["local_weekly_analysis","local_weekly_result","local_ai_presentation_chapter","local_skill_meeting_input","local_skill_meeting_output","local_github_skill_anatomy","local_skill_exercise"];
  const deck=document.getElementById('deck'),el=document.getElementById('deck-view-model');
  if(!deck||!el)return;
  const model=JSON.parse(el.textContent);
  const openers = [{"id":"local_weekly_chapter_opening","title":"工作週報 Skill","tag":"應用 01｜工作週報"},{"id":"local_ppt_chapter_opening","title":"簡報 Skill","tag":"應用 02｜簡報製作"}];
  for(const item of openers){
    const node=document.createElement('section');node.className='slide final-skill-opening';
    Object.assign(node.dataset,{vmSlideId:item.id,vmSlideKey:item.id,vmLayout:'LOCAL-SKILL-OPENING',themePack:'theme01',label:'現在介紹'+item.title});
    node.innerHTML=`<div class="fso-grid"></div><div class="fso-orbit fso-o1"></div><div class="fso-orbit fso-o2"></div><main style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="fso-kicker" style="margin-top:0">${item.tag}</div><div class="fso-rule"></div><h1 style="margin-top:3cqw;line-height:1.3">現在介紹<br><strong>${item.title}</strong></h1></main>`;
    deck.appendChild(node);model.slides.push({id:item.id,key:item.id,layout:'LOCAL-SKILL-OPENING',dataLayout:'LOCAL-SKILL-OPENING',themePack:'theme01',label:'現在介紹'+item.title,props:{},media:{}});
  }
  for(const id of removed)deck.querySelector(`[data-vm-slide-id="${id}"]`)?.remove();
  const ids=groups.flatMap(g=>g.ids),nodes=[...deck.querySelectorAll(':scope > .slide')];
  const byId=new Map(nodes.map(n=>[n.dataset.vmSlideId,n]));
  if(new Set(ids).size!==ids.length||ids.some(id=>!byId.has(id)))throw new Error('Skill chapter order: missing or duplicate slides');
  const start=nodes.findIndex(n=>n.dataset.vmSlideId==='local_skill_opening');
  if(start<0||nodes.slice(start).some(n=>!ids.includes(n.dataset.vmSlideId)))throw new Error('Skill chapter order: unexpected chapter content');
  for(const group of groups)for(const id of group.ids){const node=byId.get(id);node.dataset.chapter=group.title;deck.appendChild(node);}
  const ordered=[...deck.querySelectorAll(':scope > .slide')];
  const order=ordered.map((n,i)=>{n.dataset.vmIndex=String(i);if(n.hasAttribute('data-vm-slide-index'))n.dataset.vmSlideIndex=String(i);return n.dataset.vmSlideId;});
  const modelById=new Map(model.slides.map(s=>[s.id,s]));
  model.slides=order.map(id=>modelById.get(id));model.state.slideOrder=order;
  byId.get('local_weekly_setup').querySelector('header > span').textContent='應用 01｜工作週報 · 下載與準備';
  byId.get('local_skill_build').querySelector('header > span').textContent='最後一段｜建立自己的 Skill';
  model.exportId='skill-51pages-20260911';el.textContent=JSON.stringify(model);
})();
