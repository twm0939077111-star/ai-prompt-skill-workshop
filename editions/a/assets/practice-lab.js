(() => {
  const PRACTICE_ANCHOR_ID = 'local_eyewear_prompts';
  const FINAL_ANCHOR_ID = 'local_skill_theme09';
  const definitions = [
    {
      id: 'local_practice_method_opening',
      label: '用學到的方法製作圖片',
      layout: 'LOCAL-PRACTICE-METHOD-OPENING',
      html: `
        <section class="pl-slide pl-opening pl-method-opening" aria-label="用學到的方法製作圖片">
          <p class="pl-opening-ghost" aria-hidden="true">APPLY</p>
          <main class="pl-opening-main">
            <p class="pl-kicker">ROUND TWO / APPLY THE METHOD</p>
            <h1><span>現在換用我們學到的方式</span><strong>製作圖片</strong></h1>
            <div class="pl-opening-rule" aria-hidden="true"><i></i><b>22</b><i></i></div>
            <p class="pl-opening-lead">把方法真正用進作品裡</p>
            <p class="pl-opening-copy">這一次，把需求寫得更清楚，再比較新作品與第一版的差別。</p>
          </main>
          <div class="pl-opening-sequence" aria-label="第二次實作流程">
            <span><b>01</b>說清楚目標</span>
            <span><b>02</b>補上必要資訊</span>
            <span><b>03</b>完成第二版</span>
          </div>
        </section>`,
    },
    {
      id: 'local_practice_marketing_deck',
      label: '品牌行銷簡報',
      layout: 'LOCAL-PRACTICE-MARKETING-DECK',
      html: `
        <section class="pl-slide pl-deck" aria-label="品牌行銷簡報實作">
          <header class="pl-page-head">
            <span class="pl-page-no">03</span>
            <div><p class="pl-kicker">PRESENTATION CHALLENGE</p><h2>完成一份<span class="pl-accent">品牌行銷簡報</span></h2><p>內容要看得出品牌，類型與敘事方式可以自由發揮。</p></div>
          </header>
          <main class="pl-deck-main">
            <section class="pl-deck-brand"><span>CHOOSE ONE BRAND</span><h3>任選一個<br>帶操品牌</h3><p>從課堂上已經練習過的品牌開始，保留你對受眾與品牌個性的理解。</p></section>
            <section class="pl-deck-choice"><span>CHOOSE ONE FORMAT</span><h3>你想做哪一種簡報？</h3><div class="pl-format-list"><span>新品提案</span><span>社群企劃</span><span>品牌故事</span><span>活動簡報</span></div><p class="pl-deck-free">也可以自訂完全不同的簡報類型。</p></section>
          </main>
          <footer><strong>同一個品牌可以有很多說法。</strong> 請用版型與內容說清楚你想完成的任務。</footer>
        </section>`,
    },
  ];

  function makeSlide(definition) {
    const slide = document.createElement('section');
    slide.className = 'slide local-practice-slide';
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
    const modelElement = document.getElementById('deck-view-model');
    const practiceAnchor = deck?.querySelector(`[data-vm-slide-id="${PRACTICE_ANCHOR_ID}"]`);
    const finalAnchor = deck?.querySelector(`[data-vm-slide-id="${FINAL_ANCHOR_ID}"]`);
    if (!deck || !practiceAnchor || !finalAnchor || !modelElement) return false;

    const placeDefinitions = (anchor, items) => {
      let cursor = anchor;
      items.forEach((definition) => {
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
    };

    placeDefinitions(practiceAnchor, definitions.slice(0, 1));
    placeDefinitions(finalAnchor, definitions.slice(1));

    [...deck.querySelectorAll(':scope > .slide')].forEach((slide, index) => {
      slide.dataset.vmIndex = String(index);
    });

    const model = JSON.parse(modelElement.textContent);
    const insertedIds = new Set(definitions.map((definition) => definition.id));
    const modelSlides = (model.slides || []).filter((slide) => !insertedIds.has(slide.id));
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
    const practiceAnchorIndex = modelSlides.findIndex((slide) => slide.id === PRACTICE_ANCHOR_ID);
    modelSlides.splice(
      practiceAnchorIndex >= 0 ? practiceAnchorIndex + 1 : modelSlides.length,
      0,
      ...modelDefinitions.slice(0, 1),
    );
    const finalAnchorIndex = modelSlides.findIndex((slide) => slide.id === FINAL_ANCHOR_ID);
    modelSlides.splice(
      finalAnchorIndex >= 0 ? finalAnchorIndex + 1 : modelSlides.length,
      0,
      ...modelDefinitions.slice(1),
    );
    model.slides = modelSlides;

    const currentOrder = (model.state?.slideOrder || modelSlides.map((slide) => slide.id))
      .filter((slideId) => !insertedIds.has(slideId));
    const orderPracticeAnchorIndex = currentOrder.indexOf(PRACTICE_ANCHOR_ID);
    currentOrder.splice(
      orderPracticeAnchorIndex >= 0 ? orderPracticeAnchorIndex + 1 : currentOrder.length,
      0,
      ...definitions.slice(0, 1).map((definition) => definition.id),
    );
    const orderFinalAnchorIndex = currentOrder.indexOf(FINAL_ANCHOR_ID);
    currentOrder.splice(
      orderFinalAnchorIndex >= 0 ? orderFinalAnchorIndex + 1 : currentOrder.length,
      0,
      definitions[1].id,
    );
    model.state = { ...(model.state || {}), slideOrder: currentOrder };
    model.exportId = 'practice-lab-20261013-remove-7-to-9';
    modelElement.textContent = JSON.stringify(model);
    return true;
  }

  install();
})();
