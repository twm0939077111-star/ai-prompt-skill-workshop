(() => {
  const ANCHOR_ID = 'theme01_page047-4';
  const SOURCE = 'Data-DI｜OpenAI reasoning best practices';
  const definitions = [
    {
      id: 'local_prompt_modern_brief',
      label: 'Prompt 其實是一份任務說明書',
      layout: 'LOCAL-PROMPT-MODERN-BRIEF',
      html: `
        <section class="mp-modern mp-brief" aria-label="Prompt 其實是一份任務說明書">
          <p class="mp-kicker">PROMPT / THE DEFINITION</p>
          <h2 class="mp-title">Prompt 不是一句咒語，<em>是一份任務說明書</em></h2>
          <div class="mp-brief-stage">
            <div class="mp-brief-word">Prompt</div>
            <div class="mp-brief-equals">=</div>
            <div class="mp-brief-definition">
              <strong>把腦中的期待<br>變成 AI 能執行的條件</strong>
              <span>讓它知道要做什麼、為誰而做，以及什麼才算完成。</span>
            </div>
          </div>
          <div class="mp-brief-elements" aria-label="好 Prompt 的四個必要元素">
            <span class="mp-brief-element"><i>01</i>目標</span>
            <span class="mp-brief-element"><i>02</i>背景</span>
            <span class="mp-brief-element"><i>03</i>限制</span>
            <span class="mp-brief-element"><i>04</i>完成標準</span>
          </div>
          <p class="mp-source">${SOURCE}</p>
        </section>`,
    },
    {
      id: 'local_prompt_modern_length',
      label: 'Prompt 可以很長，但不能讓重點消失',
      layout: 'LOCAL-PROMPT-MODERN-LENGTH',
      html: `
        <section class="mp-modern mp-length" aria-label="Prompt 可以很長，但不能讓重點消失">
          <p class="mp-kicker">PROMPT / LENGTH VS. CLARITY</p>
          <h2 class="mp-title">Prompt 可以很長，<em>但不能讓重點消失</em></h2>
          <div class="mp-length-hero" aria-hidden="true">
            <strong>長</strong><b>≠</b><em>冗長</em>
          </div>
          <div class="mp-length-columns">
            <div class="mp-length-col">
              <h3>值得保留的內容</h3>
              <p>真實背景、受眾與使用情境</p>
              <p>必要限制、輸出格式與成功標準</p>
              <p>能幫助對齊風格的參考案例</p>
            </div>
            <div class="mp-length-divider" aria-hidden="true"></div>
            <div class="mp-length-col mp-length-col--avoid">
              <h3>應該刪掉的內容</h3>
              <p>同一件事換句話反覆交代</p>
              <p>彼此矛盾或無法同時完成的要求</p>
              <p>只堆形容詞，卻沒有判斷標準</p>
            </div>
          </div>
          <p class="mp-length-note">不是追求最短，而是讓每一段指令都有作用。</p>
          <p class="mp-source">${SOURCE}</p>
        </section>`,
    },
    {
      id: 'local_prompt_modern_principles',
      label: '四個原則，讓長指令依然清楚',
      layout: 'LOCAL-PROMPT-MODERN-PRINCIPLES',
      html: `
        <section class="mp-modern mp-principles" aria-label="四個原則，讓長指令依然清楚">
          <p class="mp-kicker">PROMPT / FOUR PRINCIPLES</p>
          <h2 class="mp-title">四個原則，讓<em>長指令依然清楚</em></h2>
          <p class="mp-principles-tagline">LESS NOISE · MORE SIGNAL</p>
          <div class="mp-principle-list">
            <article class="mp-principle">
              <span class="mp-principle-no">01</span>
              <div><h3>先給目標</h3><p>交代要完成的結果，不必規定每一步內部推理。</p></div>
            </article>
            <article class="mp-principle">
              <span class="mp-principle-no">02</span>
              <div><h3>補充資訊</h3><p>提供受眾、情境、素材與限制，讓判斷有依據。</p></div>
            </article>
            <article class="mp-principle">
              <span class="mp-principle-no">03</span>
              <div><h3>先直接試</h3><p>格式或風格需要高度一致時，再加入精準範例。</p></div>
            </article>
            <article class="mp-principle">
              <span class="mp-principle-no">04</span>
              <div><h3>先列假設</h3><p>資訊不足時先標示不確定處，避免 AI 自己亂補。</p></div>
            </article>
          </div>
          <p class="mp-source">${SOURCE}</p>
        </section>`,
    },
    {
      id: 'local_prompt_modern_example',
      label: '長 Prompt 的關鍵，是有結構而不是堆字',
      layout: 'LOCAL-PROMPT-MODERN-EXAMPLE',
      html: `
        <section class="mp-modern mp-example" aria-label="長 Prompt 的關鍵，是有結構而不是堆字">
          <p class="mp-kicker">PROMPT / MEDICAL BEAUTY EXAMPLE</p>
          <h2 class="mp-title">長 Prompt 的關鍵，<em>是有結構而不是堆字</em></h2>
          <div class="mp-example-grid">
            <article class="mp-example-card mp-example-card--old">
              <div class="mp-example-label"><i></i>模糊的長指令</div>
              <blockquote>「幫我做一張專業、高級、有質感、吸引人的醫美廣告，請仔細一步一步思考。」</blockquote>
              <div class="mp-example-result">AI 只能猜</div>
              <small>字不少，但沒有受眾、畫面方向、限制與完成標準。</small>
            </article>
            <div class="mp-example-arrow" aria-hidden="true">→</div>
            <article class="mp-example-card mp-example-card--new">
              <div class="mp-example-label"><i></i>有結構的完整指令</div>
              <div class="mp-structured-prompt">
                <p><b>任務</b><span>製作一張皮膚管理療程的社群廣告圖。</span></p>
                <p><b>受眾</b><span>25–40歲、重視自然感與專業安全的女性。</span></p>
                <p><b>畫面</b><span>柔和奶油色調、乾淨留白、自然膚質近景。</span></p>
                <p><b>文字</b><span>主標不超過12字，資訊層級清楚。</span></p>
                <p><b>限制</b><span>避免療效保證、價格煽動與製造外貌焦慮。</span></p>
                <p><b>確認</b><span>資訊不足時，先列出假設與待確認事項。</span></p>
              </div>
              <div class="mp-example-structure">任務 → 受眾 → 畫面 → 文字 → 限制 → 確認</div>
              <div class="mp-example-result">AI 可以執行</div>
            </article>
          </div>
          <p class="mp-example-conclusion">你的完整長指令可以保留，重點是<em>分層、對齊、沒有衝突</em>。</p>
          <p class="mp-source">${SOURCE}</p>
        </section>`,
    },
  ];

  function makeSlide(definition) {
    const slide = document.createElement('section');
    slide.className = 'slide local-modern-prompt-slide';
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
    model.slides = modelSlides;

    const currentOrder = (model.state?.slideOrder || modelSlides.map((slide) => slide.id))
      .filter((slideId) => !insertedIds.has(slideId));
    const orderAnchorIndex = currentOrder.indexOf(ANCHOR_ID);
    currentOrder.splice(orderAnchorIndex >= 0 ? orderAnchorIndex + 1 : currentOrder.length, 0, ...definitions.map((definition) => definition.id));
    model.state = { ...(model.state || {}), slideOrder: currentOrder };
    model.exportId = 'prompt-modern-principles-20260903-v1';
    modelElement.textContent = JSON.stringify(model);
    return true;
  }

  install();
})();
