(() => {
  // Classroom analysis of the preceding prompts; not additional model instructions.
  const groups = [
  {
    "id": "local_prompt_core_portrait",
    "anchor": "local_prompt_text_to_image_full_prompt",
    "label": "核心分析｜電影感人像",
    "cases": [
      {
        "name": "電影感人像",
        "core": "用「清楚的主角」\n對比「模糊的人群」",
        "intro": "用動靜對比，讓主角被看見。",
        "rows": [
          [
            "主角",
            "靜止站在繁忙街道中央",
            "先指定人物與狀態，建立故事焦點。"
          ],
          [
            "對比",
            "人群模糊，臉部清晰",
            "用清楚與模糊，分出主角和背景。"
          ],
          [
            "光線",
            "黃金時刻、淺景深、底片顆粒",
            "用具體光影描述電影感。"
          ],
          [
            "構圖",
            "4:5 直式、85mm 鏡頭視覺",
            "交代取景方式；不是實際拍攝參數。"
          ]
        ],
        "change": "換人物、場景、服裝；保留動靜對比。",
        "check": "臉部清楚、路人不搶戲；9 人須人工數。"
      }
    ]
  },
  {
    "id": "local_prompt_core_illustration",
    "anchor": "local_prompt_image_to_image_full_prompt",
    "label": "核心分析｜照片轉紙感插畫",
    "cases": [
      {
        "name": "照片轉紙感插畫",
        "core": "從同一張照片\n提取辨識特徵",
        "intro": "保留辨識特徵，再簡化成插畫。",
        "rows": [
          [
            "輸出",
            "每張照片單獨輸出",
            "先說清楚：一張照片做一張海報。"
          ],
          [
            "版面",
            "上半照片，下半插畫",
            "上下對照；精確各半可用編輯器拼版。"
          ],
          [
            "主體",
            "保留輪廓、姿態與關係",
            "留下辨識重點，刪去多餘細節。"
          ],
          [
            "風格",
            "少量色彩、紙感、細線、留白",
            "用一致的畫法，避免混入其他風格。"
          ]
        ],
        "change": "換家庭、建築或物件；保留辨識特徵。",
        "check": "原圖不失真、上下同主題、留白足夠。"
      }
    ]
  },
  {
    "id": "local_prompt_core_medical",
    "anchor": "theme01_page030-7",
    "label": "核心分析｜四種醫美提示詞",
    "cases": [
      {
        "name": "01 粉紅 Y2K",
        "core": "讓年輕風格\n服務促銷閱讀順序",
        "intro": "先定客群，再安排促銷資訊。",
        "rows": [
          [
            "客群",
            "20–35 歲、韓系 Y2K",
            "決定畫面要吸引哪一群人。"
          ],
          [
            "閱讀順序",
            "人物與主標 → 價格 → 賣點 → 預約",
            "讓重要資訊依序被看見。"
          ],
          [
            "視覺風格",
            "淡粉、鍍鉻金屬、透明壓克力",
            "用配色與材質建立年輕感。"
          ],
          [
            "內容限制",
            "只用指定價格與文案",
            "避免 AI 自行增加促銷資訊。"
          ]
        ],
        "change": "換客群、商品與優惠；保留閱讀順序。",
        "check": "價格正確、按鈕清楚、裝飾不搶資訊。"
      },
      {
        "name": "02 未來實驗室",
        "core": "用掃描與資料卡\n表達科技感",
        "intro": "用掃描符號表達科技感。",
        "rows": [
          [
            "定位",
            "專業科技、精品醫美",
            "先界定科技感的使用情境。"
          ],
          [
            "主視覺",
            "臉部掃描網格、定位點",
            "用視覺符號呈現分析概念。"
          ],
          [
            "分區",
            "左側資料卡，右側人物",
            "讓資料與人像各有位置。"
          ],
          [
            "限制",
            "不做電競風、不遮住五官",
            "避免科技裝飾蓋過人物。"
          ]
        ],
        "change": "換服務與資料；只填經確認的內容。",
        "check": "掃描與百分比是示意，不是診斷結果。"
      },
      {
        "name": "03 超現實水光肌",
        "core": "把抽象的「水潤」\n變成看得見的材質",
        "intro": "用液體與光線表現水潤感。",
        "rows": [
          [
            "概念",
            "把「水潤」變成液體視覺",
            "先選感受，再選對應元素。"
          ],
          [
            "動勢",
            "水流沿臉部、肩頸環繞",
            "交代元素位置與視線方向。"
          ],
          [
            "質感",
            "冰藍、銀白、柔光、透明反射",
            "讓肌膚與液體互相呼應。"
          ],
          [
            "限制",
            "液體不遮眼、鼻、嘴",
            "保持人物焦點，避免畫面過滿。"
          ]
        ],
        "change": "換成輕盈、溫暖等感受，再重選材質。",
        "check": "五官自然、材質不搶戲；畫面不是功效證據。"
      },
      {
        "name": "04 時尚雜誌封面",
        "core": "讓巨型文字\n參與畫面構圖",
        "intro": "讓主標與人像一起構成封面。",
        "rows": [
          [
            "人物",
            "右側約 60–70% 的近距離人像",
            "用大人像建立封面焦點。"
          ],
          [
            "字體",
            "BE／YOUR／OWN／TYPE.",
            "主標拆行，與人像前後穿插。"
          ],
          [
            "配色",
            "白、黑、高飽和桃紅",
            "少量高對比色統整視覺。"
          ],
          [
            "限制",
            "不做置中制式促銷傳單",
            "維持非對稱的雜誌封面感。"
          ]
        ],
        "change": "換主標、人物與重點色；保留前後層次。",
        "check": "字仍讀得懂、臉未遮住、裝飾不過量。"
      }
    ]
  },
  {
    "id": "local_prompt_core_eyewear",
    "anchor": "local_eyewear_prompts",
    "label": "核心分析｜四種眼鏡提示詞",
    "cases": [
      {
        "name": "01 眼鏡漂浮",
        "core": "用大小與角度\n安排商品主次",
        "intro": "用大小差異，讓商品有主次。",
        "rows": [
          [
            "商品",
            "三副不同款式的鏡框",
            "先交代數量與款式。"
          ],
          [
            "焦點",
            "中央黑框最大，對角線漂浮",
            "用大小、角度和位置分出主次。"
          ],
          [
            "材質",
            "玻璃折射、透光亮紋、高光",
            "描述透明材質如何呈現光線。"
          ],
          [
            "排版",
            "左側約 40% 放文字",
            "先替文案留下空間。"
          ]
        ],
        "change": "換手錶、香水等商品；重新安排主次。",
        "check": "數量對、結構完整、文字有空間。"
      },
      {
        "name": "02 選框實驗室",
        "core": "用人物與選項\n說明個人化服務",
        "intro": "用選框情境，說明個人化服務。",
        "rows": [
          [
            "情境",
            "手托下巴，正在挑選眼鏡",
            "用人物姿態交代服務情境。"
          ],
          [
            "選項",
            "5–6 副鏡框環繞人物",
            "讓觀眾看見多種選擇。"
          ],
          [
            "服務",
            "臉型分析、風格推薦等標籤",
            "說明提供哪些服務。"
          ],
          [
            "風格",
            "柔和資訊卡，不做科幻霓虹",
            "保留輕科技感，避免喧賓奪主。"
          ]
        ],
        "change": "換成實際提供的服務與選項。",
        "check": "卡片可讀；示意圖不等於完成臉型分析。"
      },
      {
        "name": "03 兩種世界",
        "core": "用同場景的對比\n表達產品用途",
        "intro": "用同一場景，呈現清晰差異。",
        "rows": [
          [
            "主角",
            "大型眼鏡橫跨畫面",
            "用鏡框建立對比的分界。"
          ],
          [
            "效果",
            "鏡片外模糊，鏡片內清晰",
            "明確指定差異發生在哪裡。"
          ],
          [
            "連續性",
            "內外是同一座城市",
            "讓建築與道路自然接續。"
          ],
          [
            "文案",
            "看得更清楚",
            "讓主標呼應畫面的對比。"
          ]
        ],
        "change": "借用「同一主體、兩種狀態」的表現法。",
        "check": "場景接得上；廣告示意不是配鏡效果測試。"
      },
      {
        "name": "04 眼神精品特寫",
        "core": "縮小取景範圍\n放大產品細節",
        "intro": "裁切臉部，把焦點留給眼神與鏡框。",
        "rows": [
          [
            "取景",
            "只突出右眼與鏡框",
            "縮小範圍，集中觀看焦點。"
          ],
          [
            "細節",
            "虹膜、睫毛、毛孔、鏡片反射",
            "用具體細節描述真實質感。"
          ],
          [
            "光線",
            "暖棕色、柔光、眼中反光點",
            "用光線凸顯眼神與金屬質感。"
          ],
          [
            "資訊",
            "左下主標，右下促銷章",
            "讓文案避開眼睛與鏡框。"
          ]
        ],
        "change": "換成手部與手錶等局部特寫。",
        "check": "鏡框貼合、眼神清楚、價格文字正確。"
      }
    ]
  }
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
    slide.innerHTML=`<div class="pca-page"><header><span>提示詞重點整理</span><h2>${escape(group.label)}</h2></header>${group.cases.length>1?`<nav aria-label="選擇提示詞案例">${group.cases.map((item,i)=>`<button type="button" aria-pressed="${i===0}" data-case="${i}">${escape(item.name)}</button>`).join('')}</nav>`:'<div class="pca-spacer"></div>'}<div class="pca-content">${panel(group.cases[0])}</div></div>`;
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
