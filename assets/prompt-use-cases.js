(() => {
  const ANCHOR_ID = 'local_prompt_difference_compare';
  const definitions = [
    {
      id: 'local_prompt_use_cases_overview',
      label: '三種圖片應用',
      layout: 'LOCAL-PROMPT-USE-CASES-OVERVIEW',
      html: `
        <section class="puc-slide puc-overview" aria-label="三種圖片應用">
          <div class="puc-bg"></div>
          <header class="puc-overview-intro">
            <p class="puc-kicker">PROMPT / THREE WAYS TO CREATE</p>
            <h2>用 Prompt 完成<br>三種圖片應用</h2>
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
              <blockquote class="puc-use-prompt"><small>PROMPT</small>創作一張電影級編輯風格的人像攝影作品。</blockquote>
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
      label: '第一種｜用 Prompt 從零生成圖片',
      layout: 'LOCAL-PROMPT-TEXT-TO-IMAGE',
      html: `
        <section class="puc-slide puc-text-to-image" aria-label="第一種，用 Prompt 從零生成圖片">
          <div class="puc-bg"></div>
          <header>
            <p class="puc-kicker">01 / TEXT TO IMAGE</p>
            <h2>第一種｜用 Prompt <em>從零生成圖片</em></h2>
          </header>
          <main class="puc-visual-prompt-layout">
            <div class="puc-generated-stage" aria-label="三張圖片生成成果">
              <figure class="puc-generated-card puc-generated-card--one">
                <img src="assets/user-media/prompt-use-cases/text-to-image-01.png" alt="電影感人像生成結果一">
                <figcaption>01</figcaption>
              </figure>
              <figure class="puc-generated-card puc-generated-card--two">
                <img src="assets/user-media/prompt-use-cases/text-to-image-02.png" alt="電影感人像生成結果二">
                <figcaption>02</figcaption>
              </figure>
              <figure class="puc-generated-card puc-generated-card--three">
                <img src="assets/user-media/prompt-use-cases/text-to-image-03.png" alt="電影感人像生成結果三">
                <figcaption>03</figcaption>
              </figure>
            </div>
            <aside class="puc-prompt-panel">
              <div class="puc-prompt-label"><span></span>Prompt 重點摘錄</div>
              <blockquote class="puc-prompt-main">創作一張<br><em>電影級編輯風格</em>的<br>人像攝影作品</blockquote>
              <div class="puc-prompt-breakdown" aria-label="Prompt 關鍵字拆解">
                <span>電影級</span><span>編輯風格</span><span>人像攝影</span>
              </div>
              <p>這是課程示例；完整指令見下一頁，原生成模型與設定未完整記錄。</p>
            </aside>
          </main>
        </section>`,
    },
    {
      id: 'local_prompt_text_to_image_full_prompt',
      label: '電影級人像完整提示詞',
      layout: 'LOCAL-PROMPT-TEXT-TO-IMAGE-FULL',
      html: `
        <section class="puc-slide puc-full-prompt puc-full-prompt--portrait" aria-label="電影級人像完整提示詞">
          <div class="puc-bg"></div>
          <header>
            <p class="puc-kicker">01 / TEXT TO IMAGE / FULL PROMPT</p>
            <h2>電影級人像攝影 <em>完整提示詞</em></h2>
            <p>先替換方括號內的內容，再貼入工具；這些不是自動參數欄位。</p>
          </header>
          <aside class="puc-full-prompt-index" aria-hidden="true"><strong>01</strong><span>FULL PROMPT</span></aside>
          <article class="puc-full-prompt-copy">
            <p>創作一張電影級編輯風格的人像攝影作品，主角為 <code>[一位年輕女性]</code>，她正靜止站在黃金時刻溫暖光影下的繁忙城市街道中央。她留著 <code>[柔和棕色]</code> 的頭髮，隨意紮起，細碎的髮絲捕捉著邊緣光，擁有淺榛綠色的雙眸、自然妝容、小珍珠耳釘，神情冷靜且帶著一絲惆悵，直視鏡頭。她穿著 <code>[黑色]</code> 外套或西裝外套，以垂直 4:5 的構圖呈現半身像。</p>
            <p>在她周圍精確配置 9 位呈現動態模糊的行人：1 位左前方側影、1 位左下方身著柔和紅色的局部人物、1 位左上方局部臉部、1 位上方中央的金髮人物、1 位上方中央的深髮色人物、1 位右上方男性、1 位右側中間盤髮女性、1 位右側遠處的深色身影，以及 1 位右前方深色肩膀剪影。對人群使用強烈的動態模糊效果，同時保持女性臉部的清晰對焦，營造出時間在她身邊慢下來的感覺。</p>
            <p>光線應為黃金時刻的背光與氛圍光，具備柔和的散景、髮絲邊緣的溫暖高光、淺景深、真實的皮膚紋理、自然的臉部比例，以及高端時尚雜誌的編輯風格。採用 <code>[85mm 人像鏡頭]</code> 的視覺效果，結合電影級調色、細膩的底片顆粒感，且不包含任何文字或浮水印。</p>
          </article>
          <footer>課程修訂版 · 人數與位置是設計要求，需檢查結果。<a href="https://developers.openai.com/api/docs/guides/image-generation#limitations" target="_blank" rel="noopener noreferrer">官方能力限制</a></footer>
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
                <li><b>04</b><span>主體約占 10%–20%，四周保留大量留白</span></li>
                <li><b>05</b><span>配色不超過 4 種，避免 3D 與厚重油畫感</span></li>
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

  install();
})();
