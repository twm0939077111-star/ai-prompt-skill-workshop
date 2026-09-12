(() => {
  'use strict';
  const card=(title,body)=>`<article><h3>${title}</h3><p>${body}</p></article>`;
  const grid=(...items)=>`<div class="sw-grid">${items.join('')}</div>`;
  const sources={build:['官方：建立 Skills','https://learn.chatgpt.com/docs/build-skills'],use:['官方：Skills 與 Plugins','https://learn.chatgpt.com/docs/skills-and-plugins']};
  const pages=[
    {id:'local_skill_definition',anchor:'local_skill_opening',title:'Skill：讓 AI 照著工作手冊做事',tag:'先理解概念',lead:'把做事步驟、範本與檢查標準，整理成 AI 能使用的資料包。',body:grid(card('指令｜怎麼做','先讀什麼、依序做什麼、哪些事不能自行猜測。'),card('資源｜照什麼做','放入範本、參考文件與好範例；需要時才加腳本。'),card('啟用｜何時使用','系統先看名稱與描述；選用後，再讀取完整指引。'),card('價值｜下次能重用','每次換新資料，沿用同一套流程；成果仍要檢查。')),note:'Skill 不等於重新訓練模型，也不保證每次輸出完全相同。',source:'build'},
    {id:'local_skill_roles',anchor:'local_skill_storyboard',title:'用 Skill 做事，需要準備什麼？',tag:'不要混在一起',lead:'以「整理本週工作報告」為例，四個部分一起配合。',body:grid(card('Prompt＝這次要做什麼','「整理本週進度，給主管看，控制在一頁。」'),card('Skill＝固定怎麼做','依專案分類 → 找出風險 → 列出下週行動 → 檢查。'),card('資料＝這次根據什麼','本週紀錄提供事實；記憶／自訂指示提供長期偏好。'),card('工具＝能執行什麼','讀檔、查資料、建立文件；須有可用工具與相應權限。')),note:'Plugin（外掛）是安裝用的組合包，可以包含 Skill 與工具連接。',source:'use'},
    {id:'local_skill_jobs',anchor:'local_ppt_skill_intro',title:'哪些工作適合用 Skill？',tag:'從日常工作找題目',lead:'常常重做、標準清楚、成果能檢查，就是好的起點。',body:grid(card('會議追蹤','輸入會議紀錄 → 區分決議與提案 → 產出待辦表。'),card('每週工作報告','輸入進度紀錄 → 整理成果與風險 → 產出週報。'),card('行銷企劃','輸入產品與受眾 → 核對賣點與限制 → 產出企劃初稿。'),card('客服回覆草稿','輸入客訴與政策 → 核對可承諾事項 → 產出回覆草稿。')),note:'先選一項小工作。偶爾問一次的問題，通常直接寫 Prompt 就夠了。',source:'use'},
    {id:'local_skill_use',anchor:'local_skill_jobs',title:'使用 Skill 的四個步驟',tag:'從選用到交付',lead:'先確認你的產品介面支援 Skills，而且已安裝需要的 Skill。',body:grid(card('01 選用方法','ChatGPT 用 @ 選取；Codex 用 $ 指定。也可能自動選用。'),card('02 提供本次資料','附上文件，說明目標、讀者、期限與希望的成果格式。'),card('03 讓 AI 依流程執行','缺少資料就補充；需要工具時，確認連接與權限可用。'),card('04 檢查後再交付','核對人名、數字、來源與承諾；不合適就要求修正。')),note:'只貼上 SKILL.md 文字，不等於已在任何 AI 產品中完成安裝。',source:'use'},
    {id:'local_skill_meeting_input',anchor:'local_github_skill_anatomy',title:'工作案例｜把會議紀錄變成待辦',tag:'完整案例 ①｜輸入與規則',lead:'同一個「會議追蹤 Skill」，每次只換新的會議資料。',body:`<div class="sw-two"><article><h3>這次提供的紀錄</h3><p>9/10 會議決定先做活動頁。</p><p>小林 9/12 交文案。</p><p>海報負責人與期限未定。</p><p>有人提議加開直播，尚未決定。</p><small>課堂虛構資料</small></article><article><h3>Skill 固定遵守的規則</h3><p>決議、待辦、提案分開整理。</p><p>待辦列出負責人與期限。</p><p>缺漏標記「待確認」。</p><p>保留原文依據，不自行補答案。</p></article></div>`,note:'本次 Prompt：「請用會議追蹤 Skill 整理這份紀錄，輸出待辦表與待確認事項。」'},
    {id:'local_skill_meeting_output',anchor:'local_skill_meeting_input',title:'整理得漂亮，也要整理得正確',tag:'完整案例 ②｜成果與檢查',lead:'先抽取事實 → 分類 → 填表 → 回到原文逐項核對。',body:`<div class="sw-result"><div class="sw-decision"><b>已決議</b>先做活動頁　　<b>未決議提案</b>加開直播</div><table><thead><tr><th>待辦</th><th>負責人</th><th>期限</th><th>原文依據</th></tr></thead><tbody><tr><td>交文案</td><td>小林</td><td>9/12</td><td>「小林 9/12 交文案」</td></tr><tr><td>確認海報分工</td><td>待確認</td><td>待確認</td><td>「海報負責人與期限未定」</td></tr></tbody></table><div class="sw-decision"><b>待確認</b>海報由誰負責？何時完成？直播是否採用？</div></div>`,note:'檢查重點：直播不能變成已決議；海報不能套用小林與 9/12。確認後才寄出。'},
    {id:'local_skill_build',anchor:'local_skill_meeting_output',title:'把自己的好方法，做成第一個 Skill',tag:'從使用走向建立',lead:'先把一件小事做對，再把方法保存下來。',body:grid(card('01 定義一件事','寫清楚適用情境、需要的資料，以及合格成果長什麼樣。'),card('02 整理工作方法','交代步驟、輸出範本、不可省略的檢查，附一份好範例。'),card('03 請建立工具協助','ChatGPT：@skill-creator<br>Codex：$skill-creator<br>先確認介面中可選用。'),card('04 測試，再修訂','用正常、缺資料、內容矛盾的案例試跑；修正後保存版本。')),note:'描述要寫清楚「何時使用」。範例成功一次，還不代表適合所有情況。',source:'use'},
    {id:'local_skill_exercise',anchor:'local_skill_build',title:'現在練習｜做一份你的工作方法',tag:'學員實作｜建議 20 分鐘',lead:'選一個每週重複的工作，先填完這四格，再試跑兩份資料。',body:grid(card('輸入｜需要哪些資料？','例：本週工作紀錄、專案名稱、報告對象。'),card('流程｜固定怎麼處理？','例：先分類進度，再找風險，最後列下週行動。'),card('輸出｜最後交什麼？','例：一頁週報，包含成果、風險與下週待辦。'),card('檢查｜怎樣才算合格？','資料有依據、缺漏有標記、格式一致、主管看得懂。')),note:'交付：一份工作方法＋兩次試跑結果＋一項修正。尚未支援 Skills 的介面，可先用 Prompt 驗證流程。'}
  ];
  const deck=document.getElementById('deck'),el=document.getElementById('deck-view-model');
  if(!deck||!el)return;
  const model=JSON.parse(el.textContent);
  for(const item of pages){
    const anchor=deck.querySelector(`[data-vm-slide-id="${item.anchor}"]`);
    if(!anchor)throw new Error(`Skill slide anchor missing: ${item.anchor}`);
    const slide=document.createElement('section');slide.className='slide skill-workplace';
    Object.assign(slide.dataset,{vmSlideId:item.id,vmSlideKey:item.id,vmLayout:'LOCAL-SKILL-WORKPLACE',layout:'LOCAL-SKILL-WORKPLACE',themePack:'theme01',label:item.title});
    const source=item.source?sources[item.source]:null;
    slide.innerHTML=`<div class="sw-page"><header><span>${item.tag}</span><h2>${item.title}</h2><p>${item.lead}</p></header><div class="sw-body">${item.body}</div><footer><p>${item.note}</p>${source?`<a href="${source[1]}" target="_blank" rel="noopener noreferrer">${source[0]} ↗</a>`:''}</footer></div>`;
    anchor.insertAdjacentElement('afterend',slide);
    model.slides.splice(model.slides.findIndex(s=>s.id===item.anchor)+1,0,{id:item.id,key:item.id,layout:'LOCAL-SKILL-WORKPLACE',dataLayout:'LOCAL-SKILL-WORKPLACE',themePack:'theme01',label:item.title,props:{},media:{}});
    model.state.slideOrder.splice(model.state.slideOrder.indexOf(item.anchor)+1,0,item.id);
  }
  [...deck.querySelectorAll(':scope > .slide')].forEach((s,i)=>s.dataset.vmIndex=String(i));
  model.exportId='skill-workplace-20260910';el.textContent=JSON.stringify(model);
})();
