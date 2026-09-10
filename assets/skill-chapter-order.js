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
    const weekly=item.id==='local_weekly_chapter_opening';
    const node=document.createElement('section');node.className='slide designed-skill-opening '+(weekly?'dso-weekly':'dso-ppt');
    Object.assign(node.dataset,{vmSlideId:item.id,vmSlideKey:item.id,vmLayout:'LOCAL-SKILL-OPENING',themePack:'theme01',label:'現在介紹'+item.title});
    const art=weekly?`<div class="dso-report-art" aria-label="工作紀錄整理成週報的示意"><div class="dso-paper-back"></div><div class="dso-report"><div class="dso-report-heading"><span>本週工作報告</span><b>WEEKLY</b></div><div class="dso-report-row"><i>✓</i><div><b>本週成果</b><span class="dso-lines"></span></div></div><div class="dso-report-row"><i>→</i><div><b>下週計畫</b><span class="dso-lines"></span></div></div><div class="dso-report-row"><i>?</i><div><b>待確認事項</b><span class="dso-lines"></span></div></div></div><div class="dso-stamp">整理・核對・交付</div></div>`:`<div class="dso-deck-art" aria-label="內容轉化為簡報版型的示意"><div class="dso-deck-back"></div><div class="dso-deck-middle"></div><div class="dso-deck-front"><div class="dso-mini-top">從內容，到畫面。<span>01</span></div><div class="dso-mini-body"><div><b>讓想法<br>被看見</b><i></i><i></i></div><div class="dso-shapes"><span></span><span></span><span></span></div></div></div><span class="dso-art-caption">內容 × 結構 × 風格</span></div>`;
    node.innerHTML=`<div class="dso-accent-field" aria-hidden="true"></div><header class="dso-top"><span>SKILL APPLICATION</span><b>${weekly?'01':'02'}</b></header><main class="dso-copy"><p class="dso-intro">現在介紹</p><h1>${weekly?'工作週報':'簡報'}<br><strong>Skill<span class="dso-title-dot">.</span></strong></h1><p class="dso-description">${weekly?'把零散工作紀錄，<br>整理成清楚的一頁週報。':'把內容與素材，<br>變成有邏輯的視覺表達。'}</p></main>${art}<footer class="dso-bottom"><span>${weekly?'WORK → REPORT':'IDEAS → SLIDES'}</span><span>${weekly?'工作應用｜週報':'工作應用｜簡報'}</span></footer>`;
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
  model.exportId='skill-designed-20260911';el.textContent=JSON.stringify(model);
})();
