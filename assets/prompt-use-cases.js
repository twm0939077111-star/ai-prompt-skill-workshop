(() => {
  const ANCHOR_ID = 'local_prompt_difference_compare';
  const definitions = [
    {
      id: 'local_prompt_use_cases_overview',
      label: '三種 Prompt 用法',
      layout: 'LOCAL-PROMPT-USE-CASES-OVERVIEW',
      html: `
        <section class="puc-slide puc-overview" aria-label="三種 Prompt 用法">
          <div class="puc-bg"></div>
          <header class="puc-overview-intro">
            <p class="puc-kicker">PROMPT / THREE WAYS TO CREATE</p>
            <h2>現在來介紹幾種<br>Prompt 的用法</h2>
            <p class="puc-overview-lead">用法很多，今天先看最容易上手、也最常用的三種。</p>
            <div class="puc-overview-note">
              <b>先記得一件事</b>
              <span>成果不同，差別往往就在你交代了什麼。</span>
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
              <div class="puc-prompt-label"><span></span>實際輸入的 Prompt</div>
              <blockquote class="puc-prompt-main">創作一張<br><em>電影級編輯風格</em>的<br>人像攝影作品</blockquote>
              <div class="puc-prompt-breakdown" aria-label="Prompt 關鍵字拆解">
                <span>電影級</span><span>編輯風格</span><span>人像攝影</span>
              </div>
              <p>一句話先決定「題材＋質感」，AI 就會嘗試不同的構圖與瞬間。</p>
            </aside>
          </main>
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
            <h2>第二種｜餵給 AI 一張照片，<em>變成有趣的新版本</em></h2>
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
    model.exportId = 'prompt-use-cases-20260904-v2';
    modelElement.textContent = JSON.stringify(model);
    return true;
  }

  install();
})();
