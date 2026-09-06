(() => {
  const PRACTICE_ANCHOR_ID = 'local_eyewear_prompts';
  const FINAL_ANCHOR_ID = 'local_skill_theme09';
  const definitions = [
    {
      id: 'local_practice_opening',
      label: '學員實作挑戰',
      layout: 'LOCAL-PRACTICE-OPENING',
      html: `
        <section class="pl-slide pl-opening" aria-label="學員實作挑戰">
          <p class="pl-opening-ghost" aria-hidden="true">PRACTICE</p>
          <main class="pl-opening-main">
            <p class="pl-kicker">YOUR TURN / PRACTICE LAB</p>
            <h1><span>學員</span><strong>實作挑戰</strong></h1>
            <div class="pl-opening-rule" aria-hidden="true"><i></i><b>16</b><i></i></div>
            <p class="pl-opening-lead">現在換你來做</p>
            <p class="pl-opening-copy">先完成自己的第一版，再把今天學到的方法真正用進作品裡。</p>
          </main>
          <div class="pl-opening-sequence" aria-label="三項實作內容">
            <span><b>01</b>自由廣告圖</span>
            <span><b>02</b>四品牌競賽</span>
            <span><b>03</b>品牌行銷簡報</span>
          </div>
        </section>`,
    },
    {
      id: 'local_practice_ad',
      label: '自由廣告圖',
      layout: 'LOCAL-PRACTICE-AD',
      html: `
        <section class="pl-slide pl-ad" aria-label="自由廣告圖實作">
          <header class="pl-page-head">
            <span class="pl-page-no">01</span>
            <div><p class="pl-kicker">FIRST TRY / NO METHOD YET</p><h2>先照自己的方式，做一張<span class="pl-accent">廣告圖</span></h2><p>先不要套用今天的方法，直接完成你心中的第一版。</p></div>
          </header>
          <main class="pl-ad-main">
            <div class="pl-ad-canvas"><span>YOUR FIRST VERSION</span><strong>?</strong><p>把完成的廣告圖放在這裡</p></div>
            <aside class="pl-ad-questions">
              <span>一起判斷</span>
              <h3>這張圖好看嗎？<br>為什麼？</h3>
              <ol><li>第一眼看到什麼？</li><li>看得出是哪個品牌嗎？</li><li>哪個地方最想修改？</li></ol>
            </aside>
          </main>
          <footer><strong>請保留第一版。</strong> 後面重新製作時，才能看見方法帶來的差別。</footer>
        </section>`,
    },
    {
      id: 'local_practice_brand_battle',
      label: '四品牌實作競賽',
      layout: 'LOCAL-PRACTICE-BRAND-BATTLE',
      html: `
        <section class="pl-slide pl-brand" aria-label="四品牌實作競賽">
          <header class="pl-brand-intro">
            <p class="pl-kicker">BRAND CHALLENGE / CLASS BATTLE</p>
            <h2>四個指定品牌，<span class="pl-accent">比賽誰做得更好</span></h2>
            <p>套用剛剛學到的方法，讓作品清楚呈現每個品牌的個性。</p>
          </header>
          <main class="pl-brand-track" aria-label="四個品牌席位">
            <article><span class="pl-brand-letter">A</span><h3>品牌 A</h3><p>講師現場公布</p></article>
            <article><span class="pl-brand-letter">B</span><h3>品牌 B</h3><p>講師現場公布</p></article>
            <article><span class="pl-brand-letter">C</span><h3>品牌 C</h3><p>講師現場公布</p></article>
            <article><span class="pl-brand-letter">D</span><h3>品牌 D</h3><p>講師現場公布</p></article>
          </main>
          <p class="pl-brand-note">品牌名稱可以在上課前替換，也可以現場抽題。</p>
          <footer><strong>最後一起票選：</strong>哪一張最符合品牌，也最讓人想停下來看？</footer>
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

    placeDefinitions(practiceAnchor, definitions.slice(0, 3));
    placeDefinitions(finalAnchor, definitions.slice(3));

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
      ...modelDefinitions.slice(0, 3),
    );
    const finalAnchorIndex = modelSlides.findIndex((slide) => slide.id === FINAL_ANCHOR_ID);
    modelSlides.splice(
      finalAnchorIndex >= 0 ? finalAnchorIndex + 1 : modelSlides.length,
      0,
      ...modelDefinitions.slice(3),
    );
    model.slides = modelSlides;

    const currentOrder = (model.state?.slideOrder || modelSlides.map((slide) => slide.id))
      .filter((slideId) => !insertedIds.has(slideId));
    const orderPracticeAnchorIndex = currentOrder.indexOf(PRACTICE_ANCHOR_ID);
    currentOrder.splice(
      orderPracticeAnchorIndex >= 0 ? orderPracticeAnchorIndex + 1 : currentOrder.length,
      0,
      ...definitions.slice(0, 3).map((definition) => definition.id),
    );
    const orderFinalAnchorIndex = currentOrder.indexOf(FINAL_ANCHOR_ID);
    currentOrder.splice(
      orderFinalAnchorIndex >= 0 ? orderFinalAnchorIndex + 1 : currentOrder.length,
      0,
      definitions[3].id,
    );
    model.state = { ...(model.state || {}), slideOrder: currentOrder };
    model.exportId = 'practice-lab-20260907-v7';
    modelElement.textContent = JSON.stringify(model);
    return true;
  }

  install();
})();
