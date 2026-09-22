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
    "label": "核心分析｜四種食品提示詞",
    "cases": [
      {
        "name": "01 品質改良",
        "core": "把研發操作與成品\n放在同一個畫面",
        "intro": "用具體情境說明原料服務。",
        "rows": [
          [
            "情境",
            "食品研發實驗室",
            "讓企業客戶看懂應用場合。"
          ],
          [
            "動作",
            "取樣匙把粉末倒入燒杯",
            "用合理動作建立專業感。"
          ],
          [
            "材質",
            "麵包氣孔、粉末顆粒、玻璃折射",
            "用細節區分真實食品與塑膠感。"
          ],
          [
            "資訊",
            "左側文案，右側操作與食品",
            "文字不遮操作，主次清楚。"
          ]
        ],
        "change": "換成公司的原料與成品，保留研發情境。",
        "check": "手指與器皿合理；不新增檢測數據或認證。"
      },
      {
        "name": "02 彩虹飲品",
        "core": "把色彩變成主角\n用飛濺建立動勢",
        "intro": "靜態廣告也能表現瞬間的動感。",
        "rows": [
          [
            "主角",
            "右側分層彩虹飲品",
            "以色彩集中視覺焦點。"
          ],
          [
            "動勢",
            "紅色液體飛濺、對角線物件",
            "讓動態有方向，不平均撒滿畫面。"
          ],
          [
            "材質",
            "水珠、冰塊、粉末與水果",
            "不同材質分別描述。"
          ],
          [
            "限制",
            "彩虹層次是廣告概念示意",
            "不等於配方或實際效果保證。"
          ]
        ],
        "change": "換飲品、配色與應用食品；保留主次與動勢。",
        "check": "液體不像玻璃雕塑；標題清楚，不自行寫天然色素。"
      },
      {
        "name": "03 紅蔥風味油",
        "core": "一張圖聚焦一種應用\n把風味連到新品開發",
        "intro": "寫給食品業者，讓應用情境成為主角。",
        "rows": [
          [
            "對象",
            "正在規劃中式食品的業者",
            "需求是產品開發，不是家庭食譜。"
          ],
          [
            "主題",
            "紅蔥風味油 × 乾拌麵醬",
            "以一碗拌麵聚焦單一應用。"
          ],
          [
            "文案",
            "把台式香氣，寫進下一款新品",
            "把風味特色連到開發需求。"
          ],
          [
            "延伸",
            "水餃、油飯另做不同社群題目",
            "同一原料可拆成多張應用案例。"
          ]
        ],
        "change": "換成水餃或油飯，每張仍只聚焦一種應用。",
        "check": "原料、成品與文案對應；服務資訊需另行核對。"
      },
      {
        "name": "04 水蜜桃風味",
        "core": "用真實食材與暖光\n讓風味有畫面",
        "intro": "將抽象風味連到飲品與原料樣品。",
        "rows": [
          [
            "主角",
            "蜜桃氣泡飲、果肉與樣品瓶",
            "交代風味、成品與原料的關係。"
          ],
          [
            "氛圍",
            "奶油白、蜜桃色、自然暖側光",
            "用一致色調建立溫暖感。"
          ],
          [
            "材質",
            "桃皮絨毛、亞麻、石材孔洞",
            "用具體紋理呈現真實感。"
          ],
          [
            "輸出",
            "雜誌風格的平面廣告",
            "不生成攤開的雜誌或樣機。"
          ]
        ],
        "change": "換成其他風味及相應食材，重選配色。",
        "check": "樣品瓶為教學示意；文字正確，資訊帶不遮產品。"
      }
    ]
  }
];
  const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function panel(item) {
    return `<div class="pca-body"><aside class="pca-idea"><span>這次最重要的事</span><h3>${escape(item.core).replace('\n','，')}</h3><p>${escape(item.intro)}</p></aside><div class="pca-rows">${item.rows.map(([title,quote,why],i)=>`<article><b class="pca-no">0${i+1}</b><div><h4>${escape(title)}</h4><blockquote>${escape(quote)}</blockquote><p>${escape(why)}</p></div></article>`).join('')}</div></div><footer><p><b>換成自己的題目</b>${escape(item.change)}</p><p><b>生成後看這裡</b>${escape(item.check)}</p></footer>`;
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
