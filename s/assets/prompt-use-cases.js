(() => {
  const COMIC_PROMPT = "創作一張 1:1 正方形的日系 kawaii Q 版四格漫畫，使用清楚的 2×2 排列，共精確 4 格。\r\n\r\n【隨機創作】\r\n每次隨機創造一位全新的原創 Q 版動漫角色，人物的性別呈現、外貌、髮型、服裝、個性、身份與配件皆自由發揮；同時隨機創作一段全新的四格小故事，題材可以搞笑、可愛、療癒、日常、奇幻、荒謬或意外反轉，不要固定人物、場景、動作或劇情。\r\n\r\n【四格故事】\r\n四格必須前後連貫，具有「開場 → 發展 → 轉折 → 結局」的完整故事感。角色的動作、表情、場景與道具依劇情自然變化。\r\n\r\n每一格都加入簡短、自然且清楚的「繁體中文」漫畫文字，可以是角色對話、內心話、旁白或吐槽。文字必須與當格畫面和劇情直接相關，四格文字串起來能形成完整故事，最後一格最好帶有笑點、反轉或可愛收尾。\r\n\r\n【角色一致性】\r\n第一格產生角色後立即鎖定設計，後三格保持完全相同的臉型、髮型、髮色、服裝、配色與配件，只改變姿勢、表情與劇情狀態。\r\n\r\n【視覺風格】\r\n高品質日系 Q 版動漫插畫，大頭小身、可愛生動表情、乾淨深咖啡色線條、柔和賽璐珞上色、溫暖配色。背景依故事自由生成，可加入愛心、汗滴、速度線、驚嘆號等漫畫效果。\r\n\r\n【限制】\r\n必須只有 4 格、2×2 排列，同一位主角貫穿四格。每格文字保持簡短易讀，使用正確繁體中文。不要加入無關文字、Logo 或浮水印。\r\n\r\n核心效果：每次生成都是「隨機角色 × 隨機場景 × 隨機四格故事 × 繁體中文對話」，像真正有劇情、有台詞、有起承轉合的可愛四格漫畫。";
  const ANCHOR_ID = 'local_prompt_difference_compare';
  const definitions = [
    {
      id: 'local_prompt_use_cases_overview',
      label: '三個圖片練習',
      layout: 'LOCAL-PROMPT-USE-CASES-OVERVIEW',
      html: `
        <section class="puc-slide puc-overview" aria-label="三個圖片練習">
          <div class="puc-bg"></div>
          <header class="puc-overview-intro">
            <p class="puc-kicker">PROMPT / THREE WAYS TO CREATE</p>
            <h2>用 Prompt 完成<br>三個圖片練習</h2>
            <p class="puc-overview-lead">從描述生圖、用照片再創作，再應用到社群圖文。</p>
            <div class="puc-overview-note">
              <b>先記得一件事</b>
              <span>指令、素材、模型與每次生成，都會影響結果。</span>
            </div>
          </header>
          <main class="puc-use-list">
            <article>
              <div class="puc-use-copy">
                <span class="puc-overview-no">01</span>
                <div><h3>從零生成圖片</h3><p>文字 → 全新圖片</p></div>
              </div>
              <blockquote class="puc-use-prompt"><small>PROMPT</small>創作一張 1:1 正方形的日系 Q 版四格漫畫。</blockquote>
            </article>
            <article>
              <div class="puc-use-copy">
                <span class="puc-overview-no">02</span>
                <div><h3>上傳照片再創作</h3><p>照片＋文字 → 新風格</p></div>
              </div>
              <blockquote class="puc-use-prompt"><small>PROMPT</small>保留照片主體，將畫面重構為極簡紙感手繪封面插畫。</blockquote>
            </article>
            <article>
              <div class="puc-use-copy">
                <span class="puc-overview-no">03</span>
                <div><h3>製作社群圖文</h3><p>內容＋設計 → 社群貼文</p></div>
              </div>
              <blockquote class="puc-use-prompt"><small>PROMPT</small>請製作一張吸睛、適合 IG／Facebook 年輕客群的醫美廣告。</blockquote>
            </article>
          </main>
        </section>`,
    },
    {
      id: 'local_prompt_text_to_image',
      label: '第一種｜用 Prompt 從零生成四格漫畫',
      layout: 'LOCAL-PROMPT-TEXT-TO-IMAGE',
      html: `
        <section class="puc-slide puc-text-to-image puc-text-to-image--comic" aria-label="第一種，用 Prompt 從零生成四格漫畫">
          <div class="puc-bg"></div>
          <header>
            <p class="puc-kicker">01 / TEXT TO IMAGE</p>
            <h2>第一種｜用 Prompt <em>從零生成圖片</em></h2>
          </header>
          <main class="puc-visual-prompt-layout">
            <div class="puc-generated-stage" aria-label="兩張四格漫畫成果，點圖可放大">
              <figure class="puc-generated-card puc-generated-card--one">
                <button type="button" data-puc-image aria-label="放大四格漫畫成果一：明天再努力">
                  <img src="assets/kawaii-comic/comic-01.png" alt="四格漫畫成果一：立志努力、滑手機、驚覺時間流逝，最後決定明天再努力">
                </button>
                <figcaption>01｜明天再努力</figcaption>
              </figure>
              <figure class="puc-generated-card puc-generated-card--two">
                <button type="button" data-puc-image aria-label="放大四格漫畫成果二：先獎勵自己">
                  <img src="assets/kawaii-comic/comic-02.png" alt="四格漫畫成果二：下定決心減重、運動、體重不變，最後決定先獎勵自己">
                </button>
                <figcaption>02｜先獎勵自己</figcaption>
              </figure>
            </div>
            <aside class="puc-prompt-panel">
              <div class="puc-prompt-label"><span></span>Prompt 重點摘錄</div>
              <blockquote class="puc-prompt-main">創作一張<br><em>日系 kawaii Q 版</em><br>四格漫畫</blockquote>
              <div class="puc-prompt-breakdown" aria-label="Prompt 關鍵字拆解">
                <span>1:1 正方形</span><span>2×2 四格</span><span>繁體中文</span>
              </div>
              <p>每次隨機創作新角色與故事；同一張四格裡，角色設計保持一致。</p>
              <p class="puc-comic-hint">點圖放大看台詞 · 完整提示詞見下一頁</p>
            </aside>
          </main>
        </section>`,
    },
    {
      id: 'local_prompt_text_to_image_full_prompt',
      label: '日系 Q 版四格漫畫完整提示詞',
      layout: 'LOCAL-PROMPT-TEXT-TO-IMAGE-FULL',
      html: `
        <section class="puc-slide puc-full-prompt puc-full-prompt--comic" aria-label="日系 Q 版四格漫畫完整提示詞">
          <div class="puc-bg"></div>
          <header>
            <p class="puc-kicker">01 / TEXT TO IMAGE / FULL PROMPT</p>
            <h2>日系 Q 版四格漫畫 <em>完整提示詞</em></h2>
            <p>直接複製完整原文，讓 AI 隨機創作角色、場景與四格故事。</p>
          </header>
          <aside class="puc-full-prompt-index" aria-hidden="true"><strong>01</strong><span>FULL PROMPT</span></aside>
          <div class="puc-copy-actions"><span class="puc-copy-status" role="status" aria-live="polite"></span><a href="assets/kawaii-comic/full-prompt.txt" download="四格漫畫完整提示詞.txt">下載 TXT</a><button type="button" data-puc-copy>複製提示詞</button></div>
          <article class="puc-full-prompt-copy">
            <p>創作一張 1:1 正方形的日系 kawaii Q 版四格漫畫，使用清楚的 2×2 排列，共精確 4 格。</p>
            <p>【隨機創作】<br>每次隨機創造一位全新的原創 Q 版動漫角色，人物的性別呈現、外貌、髮型、服裝、個性、身份與配件皆自由發揮；同時隨機創作一段全新的四格小故事，題材可以搞笑、可愛、療癒、日常、奇幻、荒謬或意外反轉，不要固定人物、場景、動作或劇情。</p>
            <p>【四格故事】<br>四格必須前後連貫，具有「開場 → 發展 → 轉折 → 結局」的完整故事感。角色的動作、表情、場景與道具依劇情自然變化。</p>
            <p>每一格都加入簡短、自然且清楚的「繁體中文」漫畫文字，可以是角色對話、內心話、旁白或吐槽。文字必須與當格畫面和劇情直接相關，四格文字串起來能形成完整故事，最後一格最好帶有笑點、反轉或可愛收尾。</p>
            <p>【角色一致性】<br>第一格產生角色後立即鎖定設計，後三格保持完全相同的臉型、髮型、髮色、服裝、配色與配件，只改變姿勢、表情與劇情狀態。</p>
            <p>【視覺風格】<br>高品質日系 Q 版動漫插畫，大頭小身、可愛生動表情、乾淨深咖啡色線條、柔和賽璐珞上色、溫暖配色。背景依故事自由生成，可加入愛心、汗滴、速度線、驚嘆號等漫畫效果。</p>
            <p>【限制】<br>必須只有 4 格、2×2 排列，同一位主角貫穿四格。每格文字保持簡短易讀，使用正確繁體中文。不要加入無關文字、Logo 或浮水印。</p>
            <p>核心效果：每次生成都是「隨機角色 × 隨機場景 × 隨機四格故事 × 繁體中文對話」，像真正有劇情、有台詞、有起承轉合的可愛四格漫畫。</p>
          </article>
          <footer>來源：新提供的四格漫畫提示詞原文 · 生成後核對格數、角色一致性與繁體中文。</footer>
        </section>`,
    },
    {
      id: 'local_prompt_image_to_image',
      label: '第二種｜用照片生成有趣的新版本',
      layout: 'LOCAL-PROMPT-IMAGE-TO-IMAGE',
      html: `
        <section class="puc-slide puc-image-to-image" aria-label="第二種，用照片生成有趣的新版本">
          <div class="puc-bg"></div>
          <header>
            <p class="puc-kicker">02 / IMAGE TO IMAGE</p>
            <h2>第二種｜上傳一張照片，<em>變成有趣的新版本</em></h2>
          </header>
          <main class="puc-transform-layout">
            <div class="puc-transform-stage" aria-label="照片重新創作前後對照">
              <figure class="puc-transform-hero">
                <img src="assets/user-media/prompt-use-cases/image-to-image-taipei-before.png" alt="台北城市原始照片">
                <span>原始照片</span>
              </figure>
              <i class="puc-stage-arrow">→</i>
              <figure class="puc-transform-hero">
                <img src="assets/user-media/prompt-use-cases/image-to-image-taipei-after.png" alt="台北城市紙感手繪版本">
                <span>AI 再創作</span>
              </figure>
              <div class="puc-transform-more">
                <figure><img src="assets/user-media/prompt-use-cases/image-to-image-family-before.png" alt="全家福原始照片"><img src="assets/user-media/prompt-use-cases/image-to-image-family-after.png" alt="全家福紙感手繪版本"><figcaption>全家福</figcaption></figure>
                <figure><img src="assets/user-media/prompt-use-cases/image-to-image-gleaners-before.png" alt="拾穗名畫原始圖片"><img src="assets/user-media/prompt-use-cases/image-to-image-gleaners-after.png" alt="拾穗名畫紙感手繪版本"><figcaption>名畫</figcaption></figure>
              </div>
            </div>
            <aside class="puc-prompt-panel puc-prompt-panel--long">
              <div class="puc-prompt-label"><span></span>Prompt 重點</div>
              <h3>原始照片提供內容，<br>Prompt 決定怎麼重畫。</h3>
              <ol class="puc-prompt-lines">
                <li><b>01</b><span>每張照片單獨輸出，採 3:4 直式構圖</span></li>
                <li><b>02</b><span>上半保留原始照片與自然光影</span></li>
                <li><b>03</b><span>下半重構為極簡紙感手繪封面插畫</span></li>
                <li><b>04</b><span>插畫主體約占下半區 10%–20%，四周留白</span></li>
                <li><b>05</b><span>下半插畫以不超過 4 種主要顏色呈現</span></li>
              </ol>
              <p>這裡呈現的是完整指令的重點摘錄。</p>
            </aside>
          </main>
        </section>`,
    },
    {
      id: 'local_prompt_image_to_image_full_prompt',
      label: '照片轉紙感插畫完整提示詞',
      layout: 'LOCAL-PROMPT-IMAGE-TO-IMAGE-FULL',
      html: `
        <section class="puc-slide puc-full-prompt puc-full-prompt--illustration" aria-label="照片轉紙感插畫完整提示詞">
          <div class="puc-bg"></div>
          <header>
            <p class="puc-kicker">02 / IMAGE TO IMAGE / FULL PROMPT</p>
            <h2>照片轉紙感插畫 <em>完整提示詞</em></h2>
            <p>先替換方括號內容；原圖保留與精確比例仍須檢查。</p>
          </header>
          <aside class="puc-full-prompt-index" aria-hidden="true"><strong>02</strong><span>FULL PROMPT</span></aside>
          <div class="puc-copy-actions"><span class="puc-copy-status" role="status" aria-live="polite"></span><button type="button" data-puc-copy>複製提示詞</button></div>
          <article class="puc-full-prompt-copy">
            <p>請將我上傳的每一張照片分別製作成一張獨立的高級設計海報，不多圖拼接，每張照片單獨輸出。整體採用<code>[3:4]</code>直式構圖，上下兩個區域高度嚴格1:1，各占畫面50%。</p>
            <p>上半部分保留原始照片，保持主體結構、真實質感、自然光影和原有色彩氛圍，僅進行輕微高級攝影調色，使其具有雜誌攝影和藝術出版物質感。為適配畫幅，可自然擴展天空、地面或環境背景，但不得拉伸、扭曲或改變主體。</p>
            <p>下半部分提取照片中最具識別性的主體、輪廓、姿態與敘事關係，重構為極簡紙感手繪封面插畫。高度提煉並刪減複雜細節，只保留最關鍵的視覺特徵，以纖細、略帶不穩定感的手繪線條和少量明確的壓克力顏料平塗色塊重新表達，讓人一眼識別原始主題。主體保持小而集中，約占下半部分<code>[10%–20%]</code>，四周大面積留白，背景以粗糙白紙或淺色紙張為主，僅用極少量線條或色面暗示環境。</p>
            <p>配色從上方照片提取並壓縮為不超過4種主要顏色，色塊鮮明、完整、克制，保留紙張顆粒、手工塗抹和輕微不規則邊緣。線條負責提示結構，色塊負責建立主體。避免彩鉛、蠟筆、水彩暈染、純線稿、複雜寫實、厚重油畫、光滑數位插畫和3D質感。</p>
            <p>可加入少量簡潔文字，根據照片內容靈活使用標題、主題詞、對象名稱、地點、年份、編號或短句，不局限於城市題材。文字排版疏朗克制，與留白和插畫自然融合，具有藝術書封、獨立出版物和兒童繪本式設計感。整體呈現小主體、大留白、強提煉、高識別度、安靜、童趣、輕鬆、詩意而高級的視覺氣質，避免商業卡通感、電商感和模板感。</p>
          </article>
          <footer>課程修訂版 · 精確 1:1 拼版請用編輯器完成；生成後檢查人物與文字。</footer>
        </section>`,
    },
  ];

  function makeSlide(definition) {
    const slide = document.createElement('section');
    slide.className = 'slide local-prompt-use-case-slide';
    slide.dataset.layout = definition.layout;
    slide.dataset.vmSlideId = definition.id;
    slide.dataset.vmSlideKey = definition.id;
    slide.dataset.vmLayout = definition.layout;
    slide.dataset.themePack = 'theme01';
    slide.dataset.label = definition.label;
    slide.innerHTML = definition.html;
    return slide;
  }

  function install() {
    const deck = document.getElementById('deck');
    const anchor = deck?.querySelector(`[data-vm-slide-id="${ANCHOR_ID}"]`);
    const modelElement = document.getElementById('deck-view-model');
    if (!deck || !anchor || !modelElement) return false;

    let cursor = anchor;
    definitions.forEach((definition) => {
      const existing = deck.querySelector(`[data-vm-slide-id="${definition.id}"]`);
      const slide = existing || makeSlide(definition);
      if (existing) {
        existing.dataset.label = definition.label;
        existing.dataset.layout = definition.layout;
        existing.dataset.vmLayout = definition.layout;
        existing.innerHTML = definition.html;
      }
      cursor.insertAdjacentElement('afterend', slide);
      cursor = slide;
    });

    const resultFirstPairs = [
      ['theme01_page076-8', 'theme01_page030-7'],
      ['theme01_page020-10', 'local_eyewear_prompts'],
    ];
    resultFirstPairs.forEach(([resultId, promptId]) => {
      const resultSlide = deck.querySelector(`[data-vm-slide-id="${resultId}"]`);
      const promptSlide = deck.querySelector(`[data-vm-slide-id="${promptId}"]`);
      if (resultSlide && promptSlide) promptSlide.insertAdjacentElement('beforebegin', resultSlide);
    });

    [...deck.querySelectorAll(':scope > .slide')].forEach((slide, index) => {
      slide.dataset.vmIndex = String(index);
    });

    const model = JSON.parse(modelElement.textContent);
    const insertedIds = new Set(definitions.map((definition) => definition.id));
    const modelSlides = (model.slides || []).filter((slide) => !insertedIds.has(slide.id));
    const anchorIndex = modelSlides.findIndex((slide) => slide.id === ANCHOR_ID);
    const modelDefinitions = definitions.map((definition) => ({
      id: definition.id,
      key: definition.id,
      layout: definition.layout,
      dataLayout: definition.layout,
      themePack: 'theme01',
      label: definition.label,
      props: {},
      media: {},
    }));
    modelSlides.splice(anchorIndex >= 0 ? anchorIndex + 1 : modelSlides.length, 0, ...modelDefinitions);

    function moveBefore(order, movingId, beforeId, getId = (item) => item.id) {
      const movingIndex = order.findIndex((item) => getId(item) === movingId);
      if (movingIndex < 0) return;
      const [moving] = order.splice(movingIndex, 1);
      const beforeIndex = order.findIndex((item) => getId(item) === beforeId);
      order.splice(beforeIndex >= 0 ? beforeIndex : order.length, 0, moving);
    }
    resultFirstPairs.forEach(([resultId, promptId]) => moveBefore(modelSlides, resultId, promptId));
    model.slides = modelSlides;

    const currentOrder = (model.state?.slideOrder || modelSlides.map((slide) => slide.id))
      .filter((slideId) => !insertedIds.has(slideId));
    const orderAnchorIndex = currentOrder.indexOf(ANCHOR_ID);
    currentOrder.splice(
      orderAnchorIndex >= 0 ? orderAnchorIndex + 1 : currentOrder.length,
      0,
      ...definitions.map((definition) => definition.id),
    );
    resultFirstPairs.forEach(([resultId, promptId]) => moveBefore(currentOrder, resultId, promptId, (item) => item));
    model.state = { ...(model.state || {}), slideOrder: currentOrder };
    model.exportId = 'prompt-use-cases-20260908-v3';
    modelElement.textContent = JSON.stringify(model);
    return true;
  }

  let comicDialog;
  document.addEventListener('click', (event) => {
    const button = event.target.closest('#deck [data-puc-image]');
    if (!button) return;
    event.preventDefault(); event.stopPropagation();
    if (!comicDialog) {
      comicDialog = document.createElement('dialog');
      comicDialog.className = 'puc-comic-dialog';
      comicDialog.setAttribute('aria-label', '四格漫畫放大預覽');
      comicDialog.innerHTML = '<header><strong>四格漫畫成果</strong><button type="button" autofocus aria-label="關閉放大預覽">關閉 ×</button></header><img alt="">';
      comicDialog.querySelector('button').addEventListener('click', () => comicDialog.close());
      comicDialog.addEventListener('click', e => { if (e.target === comicDialog) comicDialog.close(); });
      document.body.append(comicDialog);
    }
    const original = button.querySelector('img');
    const image = comicDialog.querySelector('img');
    image.src = original.currentSrc || original.src;
    image.alt = original.alt;
    comicDialog.showModal();
  });

  document.addEventListener('click', async (event) => {
    const button=event.target.closest('#deck [data-puc-copy]');
    if(!button)return;
    event.preventDefault();event.stopPropagation();
    const section=button.closest('.puc-full-prompt');
    const content=section.querySelector('.puc-full-prompt-copy');
    const text=section.classList.contains('puc-full-prompt--comic') ? COMIC_PROMPT : [...content.querySelectorAll('p')].map(p=>p.textContent.trim()).join('\n\n');
    const status=section.querySelector('.puc-copy-status');
    let copied=false;
    try{await navigator.clipboard.writeText(text);copied=true;}catch{
      const input=document.createElement('textarea');input.value=text;
      input.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(input);
      try{input.select();copied=document.execCommand('copy');}catch{}finally{input.remove();button.focus({preventScroll:true});}
    }
    status.textContent=copied?'已複製完整提示詞':'請選取提示詞後按 Ctrl+C 複製';
    if(!copied){const range=document.createRange();range.selectNodeContents(content);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);}
  });
  install();
})();
