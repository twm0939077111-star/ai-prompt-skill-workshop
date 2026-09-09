(() => {
  // Classroom analysis of the preceding prompts; not additional model instructions.
  const groups = [
    { id: 'local_prompt_core_portrait', anchor: 'local_prompt_text_to_image_full_prompt', label: '核心分析｜電影感人像', cases: [
      { name: '電影感人像', core: '用「清楚的主角」\n對比「模糊的人群」', intro: '這份指令的重點是安排觀看焦點，讓靜止的人物從忙碌街景中被看見。', rows: [
        ['主體與狀態', '她正靜止站在…繁忙城市街道中央', '先指定誰是主角、正在做什麼，建立故事的中心。'],
        ['視覺對比', '對人群使用強烈的動態模糊效果', '讓路人模糊、主角臉部清楚，形成動與靜的對比。'],
        ['光線與風格', '黃金時刻…淺景深…底片顆粒感', '用暖光、背景模糊與顆粒描述電影感，比只寫「高級」更具體。'],
        ['構圖與細節', '垂直 4:5…85mm 人像鏡頭', '指定直式半身構圖與鏡頭視覺效果；不代表真的使用該鏡頭拍攝。']
      ], change: '可換人物、場景、服裝；保留「主角清晰、人群模糊」的對比。', check: '臉部是否清楚？路人有沒有搶焦點？指定 9 人仍須人工數。' }
    ]},
    { id: 'local_prompt_core_illustration', anchor: 'local_prompt_image_to_image_full_prompt', label: '核心分析｜照片轉紙感插畫', cases: [
      { name: '照片轉紙感插畫', core: '從同一張照片\n提取辨識特徵', intro: '這份指令同時安排「保留照片」與「簡化重畫」，讓觀眾能一眼對照原圖與插畫。', rows: [
        ['輸入與輸出', '每張照片單獨輸出', '先交代素材如何處理，避免多張照片被合成一張。'],
        ['版面分工', '上下兩個區域…各占畫面50%', '上半顯示照片、下半顯示插畫；比例是設計目標，精確拼版可後製。'],
        ['保留與簡化', '只保留最關鍵的視覺特徵', '抓住主體輪廓、姿態與關係，不必把照片所有細節重畫一次。'],
        ['風格邊界', '不超過4種主要顏色…紙張顆粒', '用少量色彩、紙感、細線和留白建立一致風格，再排除不想要的畫法。']
      ], change: '可換成家庭、建築或物件照片；保留可辨識的輪廓與姿態。', check: '上下是否仍是同一主題？原圖有沒有被改壞？插畫是否留白足夠？' }
    ]},
    { id: 'local_prompt_core_medical', anchor: 'theme01_page030-7', label: '核心分析｜四種醫美提示詞', cases: [
      { name: '01 粉紅 Y2K', core: '讓年輕風格\n服務促銷閱讀順序', intro: '重點不只在粉紅色，而是把客群、人物、價格與預約動作安排成同一張廣告。', rows: [
        ['受眾與任務', '20–35 歲…韓系與 Y2K 風格', '先說這張廣告給誰看，讓配色、人物與語氣有依據。'],
        ['資訊層級', '人物與主標 → 優惠價格 → 賣點 → 預約', '指定觀眾先看什麼、再看什麼，避免全部資訊一起搶注意力。'],
        ['材質與配色', 'Baby Pink、銀色 Chrome、透明壓克力', '淡粉色、鍍鉻金屬和透明材質共同建立 Y2K 視覺，不只堆裝飾。'],
        ['內容與限制', '不要加入沒有指定的價格…或其他促銷文案', '把價格與文案列清楚，再限制新增資訊；生成後仍須校對。']
      ], change: '替換客群、商品、價格與文案；保留閱讀順序，重新調整品牌風格。', check: '價格與文字有沒有錯？按鈕是否清楚？裝飾有沒有壓過資訊？' },
      { name: '02 未來實驗室', core: '用掃描與資料卡\n表達科技感', intro: '這份指令的重點是「專業科技」的視覺定位，同時限制它不要變成電競或科幻海報。', rows: [
        ['定位', '專業科技、精準分析、精品醫美', '先界定科技感要用在哪一種情境，避免只有抽象形容詞。'],
        ['主視覺', '半透明的臉部掃描網格、定位點', '用貼近臉部的視覺符號傳達分析概念，五官仍是觀看重點。'],
        ['資訊分區', '左側…分析數據卡；中間偏右…人物', '分開說明資料與人像的位置，減少文字遮住臉部。'],
        ['限制', '不要做成電競科技…不要讓 UI 遮住眼睛', '說清楚不想要的科技風格；UI 是介面視覺，本例不是實際分析系統。']
      ], change: '可換成其他服務介紹；資料卡要使用經確認的內容。', check: '掃描圖與百分比是教學示意，不是診斷或實測結果；不要當成事實。' },
      { name: '03 超現實水光肌', core: '把抽象的「水潤」\n變成看得見的材質', intro: '這份指令先選一個感受，再用水流、玻璃與肌膚高光把感受表現出來。', rows: [
        ['視覺概念', '以超現實液體材質…變成…主視覺', '先決定要傳達水潤感，讓後面的元素服務同一個概念。'],
        ['材質與動勢', '液體沿著臉部、肩頸…形成環繞動勢', '不只是放幾顆水滴，而是交代液體如何圍繞人物、帶動視線。'],
        ['光線與色彩', '冰藍、銀白…柔和美容棚拍光', '用冷色、柔光與透明反射，讓皮膚和液體質感互相呼應。'],
        ['保留與排除', '液體元素不能遮住人物眼睛、鼻子與嘴巴', '保留人物辨識度，也排除海洋海報、玩具等不同視覺方向。']
      ], change: '可改成「輕盈」「溫暖」等感受，再選對應材質；別只換產品名稱。', check: '材質有沒有搶走主角？五官是否自然？視覺比喻不等於功效證據。' },
      { name: '04 時尚雜誌封面', core: '讓巨型文字\n參與畫面構圖', intro: '這份指令把字體當作視覺主角之一，透過文字與人像前後交錯，做出封面層次。', rows: [
        ['人物比例', '超近距離人像…右側約 60–70%', '先給人像足夠份量，建立封面焦點。比例仍需看生成結果調整。'],
        ['字體與層次', 'BE／YOUR／OWN／TYPE.', '將主標拆行並與人像穿插，字不只傳遞訊息，也形成構圖。'],
        ['配色與點綴', '白、黑與高飽和桃紅', '用少量高對比色統整封面，貼紙與條碼只做點綴。'],
        ['風格限制', '不要…一般醫美促銷傳單', '指定想做的是時尚封面；避免制式排版把風格拉回一般傳單。']
      ], change: '替換主標、人物與重點色；維持文字和人物之間的前後層次。', check: '穿插後主標還讀得懂嗎？臉部是否被遮住？裝飾是否過多？' }
    ]},
    { id: 'local_prompt_core_eyewear', anchor: 'local_eyewear_prompts', label: '核心分析｜四種眼鏡提示詞', cases: [
      { name: '01 眼鏡漂浮', core: '用大小與角度\n安排商品主次', intro: '不靠真人當主角，改用三副鏡框的大小、位置與材質，建立產品展示的焦點。', rows: [
        ['商品設定', '三副不同風格的眼鏡', '先指定數量和款式，避免 AI 隨意增加商品或把不同鏡框混在一起。'],
        ['焦點與構圖', '中間…最大的黑色粗框…主要視覺焦點', '用大小差異建立主次，再以對角線與角度增加畫面變化。'],
        ['材質與光線', '玻璃焦散、細微彩虹光與晶透高光', '焦散指光穿過透明物體後形成的亮紋，用來描述展示台的透光感。'],
        ['文字分區', '左側約 40% 作為文字排版區', '先留下文案的位置，避免生成後才發現商品把畫面占滿。']
      ], change: '可換成手錶、香水或其他商品；重新指定數量、主角與真實結構。', check: '三副鏡框是否區分清楚？鏡腳、鼻墊是否完整？主標有沒有空間？' },
      { name: '02 選框實驗室', core: '用人物與選項\n說明個人化服務', intro: '商品之外，這份指令還要讓觀眾理解「有人幫我挑選」的服務情境。', rows: [
        ['人物情境', '手輕托下巴…正在思考與挑選眼鏡', '用姿態說明正在選框，讓人物和服務產生關聯。'],
        ['選項展示', '5～6 副不同款式的眼鏡…環繞式', '把選擇範圍視覺化；款式、數量和結構仍需逐一核對。'],
        ['服務資訊', 'FACE SHAPE 臉型分析…STYLE 風格推薦', '用標籤說明服務項目，讓觀眾知道不只是販售商品。'],
        ['風格邊界', '不要做成科幻 HUD 或霓虹介面', '使用柔和的分析介面視覺；HUD 指疊加式資訊顯示，不必做成科幻效果。']
      ], change: '換成你實際提供的諮詢服務與選項，別直接沿用所有標籤。', check: '卡片是否可讀？人物是否被遮住？生成畫面不代表真的完成臉型分析。' },
      { name: '03 兩種世界', core: '用同場景的對比\n表達產品用途', intro: '這份指令的主軸是鏡片內外的清晰差異，讓觀看者快速理解想傳達的概念。', rows: [
        ['主角', '大型…圓框眼鏡…橫跨畫面中段', '先建立眼鏡在畫面中的位置，作為清晰與模糊的分界。'],
        ['對比效果', '鏡片外…模糊；右側鏡片內…清晰', '明確交代哪裡模糊、哪裡清楚，比只說「改善視力」更能形成畫面。'],
        ['連續性限制', '鏡片內外必須是同一個場景自然延續', '保持建築與道路相接，避免對比被畫成兩座不同城市。'],
        ['文案呼應', '世界沒有模糊…需要看得更清楚', '用主標解釋畫面對比；服務資訊排在後面，不搶走概念焦點。']
      ], change: '可借用「同一主體、兩種狀態」的表現法；對比要有明確界線。', check: '鏡片內外場景是否對得上？這是廣告示意，不是實際配鏡效果測試。' },
      { name: '04 眼神精品特寫', core: '縮小取景範圍\n放大產品細節', intro: '這份指令捨去完整臉部，把觀看焦點集中在眼神、鏡框與貼合細節。', rows: [
        ['裁切與焦點', '不要完整露出整張臉…以右眼與…鏡框…為焦點', '先說只看哪個區域，讓 AI 不必用完整人像填滿畫面。'],
        ['真實質感', '真實虹膜、細緻睫毛…自然毛孔', '用具體可檢查的細節描述質感，並排除過度磨皮。'],
        ['光線與色調', '暖奶茶棕…眼睛有漂亮 catchlight', 'catchlight 是眼睛中的反光亮點，搭配暖色與柔光表現特寫氛圍。'],
        ['資訊位置', '左下方…主標；右下…促銷章', '把文案放在指定區域，讓眼睛和鏡框繼續保持第一焦點。']
      ], change: '可換成手部與手錶等局部特寫；先決定要讓人看見哪個細節。', check: '鏡框是否貼合？反射是否擋住眼神？小字與價格是否正確？' }
    ]}
  ];
  const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function panel(item) {
    return `<div class="pca-body"><aside class="pca-idea"><span>這次最重要的事</span><h3>${escape(item.core).replace('\n','<br>')}</h3><p>${escape(item.intro)}</p></aside><div class="pca-rows">${item.rows.map(([title,quote,why],i)=>`<article><b class="pca-no">0${i+1}</b><div><h4>${escape(title)}</h4><blockquote>${escape(quote)}</blockquote><p>${escape(why)}</p></div></article>`).join('')}</div></div><footer><p><b>換成自己的題目</b>${escape(item.change)}</p><p><b>生成後看這裡</b>${escape(item.check)}</p></footer>`;
  }
  const deck=document.getElementById('deck'), modelElement=document.getElementById('deck-view-model');
  if(!deck || !modelElement) return;
  const model=JSON.parse(modelElement.textContent);
  for(const group of groups) {
    const anchor=deck.querySelector(`[data-vm-slide-id="${group.anchor}"]`);
    if(!anchor) continue;
    let slide=deck.querySelector(`[data-vm-slide-id="${group.id}"]`);
    if(!slide) { slide=document.createElement('section'); slide.className='slide prompt-core-analysis'; }
    Object.assign(slide.dataset,{vmSlideId:group.id,vmSlideKey:group.id,vmLayout:'LOCAL-PROMPT-CORE-ANALYSIS',layout:'LOCAL-PROMPT-CORE-ANALYSIS',themePack:'theme01',label:group.label});
    slide.innerHTML=`<div class="pca-page"><header><span>看完全文，抓住重點</span><h2>${escape(group.label)}</h2><p>依前頁提示詞拆解｜重點經節錄與整理，說明各段如何影響畫面。</p></header>${group.cases.length>1?`<nav aria-label="選擇提示詞案例">${group.cases.map((item,i)=>`<button type="button" aria-pressed="${i===0}" data-case="${i}">${escape(item.name)}</button>`).join('')}</nav>`:'<div class="pca-spacer"></div>'}<div class="pca-content">${panel(group.cases[0])}</div></div>`;
    slide.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',event=>{
      event.stopPropagation();
      slide.querySelectorAll('[data-case]').forEach(node=>node.setAttribute('aria-pressed',String(node===button)));
      slide.querySelector('.pca-content').innerHTML=panel(group.cases[Number(button.dataset.case)]);
      window.__markOverviewThumbDirty?.(slide);
    }));
    anchor.insertAdjacentElement('afterend',slide);
    model.slides=(model.slides||[]).filter(item=>item.id!==group.id);
    const anchorIndex=model.slides.findIndex(item=>item.id===group.anchor);
    model.slides.splice(anchorIndex+1,0,{id:group.id,key:group.id,layout:'LOCAL-PROMPT-CORE-ANALYSIS',dataLayout:'LOCAL-PROMPT-CORE-ANALYSIS',themePack:'theme01',label:group.label,props:{},media:{}});
    const order=(model.state?.slideOrder||model.slides.map(item=>item.id)).filter(id=>id!==group.id);
    order.splice(order.indexOf(group.anchor)+1,0,group.id);
    model.state={...(model.state||{}),slideOrder:order};
  }
  [...deck.querySelectorAll(':scope > .slide')].forEach((slide,i)=>slide.dataset.vmIndex=String(i));
  model.exportId='prompt-core-analysis-20260910';
  modelElement.textContent=JSON.stringify(model);
})();
