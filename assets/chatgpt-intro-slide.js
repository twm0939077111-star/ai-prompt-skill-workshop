(() => {
  const ANCHOR_ID = 'local_tool_setup';
  const definition = {
    id: 'local_chatgpt_intro',
    label: '什麼是 ChatGPT？',
    layout: 'LOCAL-TOOL-SETUP',
    html: `
      <section class="ts-slide cg-intro" aria-label="什麼是 ChatGPT？">
        <div class="ts-bg" aria-hidden="true"><i></i><i></i><i></i></div>
        <header class="ts-head">
          <p class="ts-kicker">MEET CHATGPT / 認識今天的 AI 助手</p>
          <h2>什麼是 <em>ChatGPT</em>？</h2>
          <p>一個能用日常語言對話，協助你理解資訊、整理內容與發想的 AI 助手。</p>
        </header>
        <main class="cg-body">
          <div class="cg-uses">
            <h3>你可以請它幫忙……</h3>
            <article><b>01</b><div><h4>解釋不懂的事</h4><p>「請用初學者聽得懂的方式說明。」</p></div></article>
            <article><b>02</b><div><h4>整理與改寫內容</h4><p>把一段筆記變成重點、文案或大綱。</p></div></article>
            <article><b>03</b><div><h4>一起想點子</h4><p>提出不同方向，再挑選、補充與修改。</p></div></article>
          </div>
          <div class="cg-conversation" aria-label="教學用對話示意">
            <h3>不用一次問完，接著說就好。<small>對話示意</small></h3>
            <div class="cg-turn cg-me"><span>我</span><p>幫我想三個水餃店的貼文主題。</p></div>
            <div class="cg-turn cg-ai"><span>AI</span><p>① 下班後的快速晚餐<br>② 家人一起包水餃<br>③ 三種水餃沾醬搭配</p></div>
            <div class="cg-turn cg-me"><span>我</span><p>選第一個，寫成 50 字，語氣親切一點。</p></div>
            <p class="cg-takeaway">先說需求 → 看回覆 → 再補充條件</p>
          </div>
        </main>
        <footer class="cg-bottom">
          <div class="cg-prep"><b>上課前準備</b><span><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT ↗</a> 對話與圖片練習</span><span><a href="https://grok.com/" target="_blank" rel="noopener noreferrer">Grok ↗</a> 後面練習動畫</span><strong>登入並確認功能與額度</strong></div>
          <div class="cg-note"><span>AI 回覆可能出錯；使用前要核對內容。可用功能依帳號而異。</span><a href="https://learn.chatgpt.com/docs/use-chatgpt" target="_blank" rel="noopener noreferrer">官方入門說明 ↗</a></div>
        </footer>
      </section>`,
  };

  function makeSlide() {
    const slide = document.createElement('section');
    slide.className = 'slide local-chatgpt-intro-slide';
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
    const anchor = deck?.querySelector(`[data-vm-slide-id="${ANCHOR_ID}"]`);
    if (!deck || !anchor || !modelElement) return false;

    const existing = deck.querySelector(`[data-vm-slide-id="${definition.id}"]`);
    const slide = existing || makeSlide();
    if (existing) {
      existing.dataset.label = definition.label;
      existing.dataset.layout = definition.layout;
      existing.dataset.vmLayout = definition.layout;
      existing.innerHTML = definition.html;
    }
    anchor.insertAdjacentElement('afterend', slide);

    [...deck.querySelectorAll(':scope > .slide')].forEach((item, index) => {
      item.dataset.vmIndex = String(index);
    });

    const model = JSON.parse(modelElement.textContent);
    const modelSlides = (model.slides || []).filter((item) => item.id !== definition.id);
    const anchorIndex = modelSlides.findIndex((item) => item.id === ANCHOR_ID);
    modelSlides.splice(anchorIndex >= 0 ? anchorIndex + 1 : modelSlides.length, 0, {
      id: definition.id,
      key: definition.id,
      layout: definition.layout,
      dataLayout: definition.layout,
      themePack: 'theme01',
      label: definition.label,
      props: {},
      media: {},
    });
    model.slides = modelSlides;

    const currentOrder = (model.state?.slideOrder || modelSlides.map((item) => item.id))
      .filter((slideId) => slideId !== definition.id);
    const orderAnchorIndex = currentOrder.indexOf(ANCHOR_ID);
    currentOrder.splice(orderAnchorIndex >= 0 ? orderAnchorIndex + 1 : currentOrder.length, 0, definition.id);
    model.state = { ...(model.state || {}), slideOrder: currentOrder };
    model.exportId = 'chatgpt-intro-20260912-v1';
    modelElement.textContent = JSON.stringify(model);
    return true;
  }

  install();
  document.querySelectorAll('#deck > .slide').forEach((slide, index) => {
    const badge = slide.querySelector('.pl-opening-rule b');
    if (badge) badge.textContent = String(index + 1).padStart(2, '0');
  });
})();
