(() => {
  'use strict';
  const card=(title,body)=>`<article><h3>${title}</h3><p>${body}</p></article>`;
  const grid=(...items)=>`<div class="sw-grid">${items.join('')}</div>`;
  const pages=[
    {id:'local_weekly_setup',title:'第一個 Skill｜把工作筆記變週報',tag:'週報實作 ①｜下載與準備',lead:'繁體中文教學版：weekly-report-zh-tw。先下載，再確認技能選單。',body:grid(card('01 下載教學包','<a href="assets/downloads/weekly-report-teaching.zip" download>下載 Skill＋練習資料 ↗</a>'),card('02 安裝到 Codex','解壓後，把技能資料夾放進<br>課堂專案的 .agents/skills/。'),card('03 確認可以選用','開啟新對話，輸入 $ 選取<br>weekly-report-zh-tw。'),card('04 這次只需文字','不需外部帳號或 API 金鑰；<br>AI 執行仍使用平台額度。')),note:'ChatGPT 網頁版須有可用的技能／外掛入口；下載資料夾不等於完成網頁安裝。'},
    {id:'local_weekly_data',title:'先給事實，AI 才有資料可整理',tag:'週報實作 ②｜練習輸入',lead:'活動籌備組｜本週 2026/09/07–09/11｜以下全部為虛構資料。',body:`<div class="sw-two"><article><h3>成果與下週計畫</h3><p>[1] 小林完成文案初稿，尚未審核。</p><p>[2] 小陳完成報名表，5 筆測試通過。</p><p>[3] 小林預計 9/15 交修訂文案。</p></article><article><h3>阻礙與未決事項</h3><p>[4] 海報未開始，分工與期限未定。</p><p>[5] 場地卡報價，回覆日期未知。</p><p>[6] 提議加開直播，尚未決議。</p></article></div>`,note:'資料編號是核對依據。5 筆測試不等於 5 人報名；初稿不等於審核通過。'},
    {id:'local_weekly_prompt',title:'完整提示詞｜這次只交代任務',tag:'週報實作 ③｜選取 Skill 並附上六筆紀錄',lead:'本機 Codex 選取技能後，貼上以下任務；練習紀錄可直接附檔。',body:`<article class="weekly-prompt"><p>請用 <strong>$weekly-report-zh-tw</strong> 整理附上的工作紀錄。</p><p>團隊：活動籌備組；讀者：主管。</p><p>本週：2026/09/07–09/11；下週：09/14–09/18。</p><p>輸出：本週成果、下週計畫、問題與阻礙、待確認事項。</p><p>每項保留原始紀錄編號，方便核對。</p></article>`,note:'固定的分類、缺漏處理與檢查方法已寫在 Skill；每週更新資料與報告期間。'},
    {id:'local_weekly_analysis',title:'核心分析｜方法固定，資料每週換',tag:'緊接完整提示詞｜看懂四個主要部分',lead:'Prompt 決定這次的任務；Skill 保存重複使用的方法。',body:grid(card('技能｜用哪套方法？','$weekly-report-zh-tw<br>選取已安裝的週報流程。'),card('背景｜替誰整理？','團隊、主管、本週與下週。<br>避免讀者和時間範圍混淆。'),card('資料｜根據什麼寫？','附上的六筆工作紀錄。<br>不能自行補人名、日期或成果。'),card('驗收｜怎麼判斷正確？','四個區塊＋原始紀錄編號。<br>缺漏待確認，提案不當決議。')),note:'拿掉報告期間，可能混用本週與下週；拿掉原始資料，就沒有可信的事實依據。'},
    {id:'local_weekly_result',title:'參考成果｜短，也要完整且正確',tag:'週報實作 ④｜教師參考答案',lead:'每一項都能對回輸入資料；這是參考答案，不是自動保證的結果。',body:grid(card('本週成果','文案初稿完成，尚未審核 [1]。<br>報名表完成，5 筆測試通過 [2]。'),card('下週計畫','小林預計 9/15 交修訂文案 [3]。<br>保留「預計」，不能寫已完成。'),card('問題與阻礙','海報未開始，分工與期限未定 [4]。<br>場地仍卡在報價 [5]。'),card('待確認事項','海報分工、期限 [4]；報價回覆日 [5]。<br>直播是否採用 [6]，仍未決議。')),note:'核對四件事：初稿狀態、測試數字、海報分工、直播決議。正確後再交付。'},
    {id:'local_weekly_practice',title:'換一份資料，才知道 Skill 好不好用',tag:'週報實作 ⑤｜學員驗收',lead:'先完成正常案例，再故意加入矛盾，觀察 AI 如何處理。',body:grid(card('第一輪｜正常資料','用六筆紀錄產出週報。<br>逐項核對人名、日期與狀態。'),card('第二輪｜加入矛盾','新增：另一筆寫 9/16 交文案。<br>應列出日期衝突，不能擅自選。'),card('第三輪｜換你的工作','換成自己的去識別工作紀錄。<br>沿用方法，檢查缺漏處理。'),card('交付｜三份成果','一份週報、一張核對表，<br>以及一項你調整的技能規則。')),note:'本教材參考 Anthropic internal-comms 改寫，非官方發行版本。來源與授權已附於教學包。'}
  ];
  const deck=document.getElementById('deck'),el=document.getElementById('deck-view-model');
  if(!deck||!el)return;
  const model=JSON.parse(el.textContent);
  let anchorId='local_skill_use';
  for(const item of pages){
    const anchor=deck.querySelector(`[data-vm-slide-id="${anchorId}"]`);
    if(!anchor)throw new Error(`Weekly report anchor missing: ${anchorId}`);
    const slide=document.createElement('section');slide.className='slide skill-workplace weekly-report';
    Object.assign(slide.dataset,{vmSlideId:item.id,vmSlideKey:item.id,vmLayout:'LOCAL-WEEKLY-REPORT',layout:'LOCAL-WEEKLY-REPORT',themePack:'theme01',label:item.title});
    slide.innerHTML=`<div class="sw-page"><header><span>${item.tag}</span><h2>${item.title}</h2><p>${item.lead}</p></header><div class="sw-body">${item.body}</div><footer><p>${item.note}</p></footer></div>`;
    anchor.insertAdjacentElement('afterend',slide);
    model.slides.splice(model.slides.findIndex(s=>s.id===anchorId)+1,0,{id:item.id,key:item.id,layout:'LOCAL-WEEKLY-REPORT',dataLayout:'LOCAL-WEEKLY-REPORT',themePack:'theme01',label:item.title,props:{},media:{}});
    model.state.slideOrder.splice(model.state.slideOrder.indexOf(anchorId)+1,0,item.id);
    anchorId=item.id;
  }
  [...deck.querySelectorAll(':scope > .slide')].forEach((s,i)=>s.dataset.vmIndex=String(i));
  model.exportId='weekly-report-20260911';el.textContent=JSON.stringify(model);
})();
