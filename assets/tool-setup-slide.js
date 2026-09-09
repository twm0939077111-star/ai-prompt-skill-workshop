(() => {
  const ANCHOR_ID = 'theme01_page009-3';
  const definition = {
    id: 'local_tool_setup',
    label: '上課前先準備 ChatGPT 與 Grok',
    layout: 'LOCAL-TOOL-SETUP',
    html: `
      <section class="ts-slide" aria-label="上課前先準備 ChatGPT 與 Grok">
        <div class="ts-bg" aria-hidden="true"><i></i><i></i><i></i></div>
        <header class="ts-head">
          <p class="ts-kicker">BEFORE WE START / APP SETUP</p>
          <h2>上課前，先把<br><em>今天會用的工具</em>準備好</h2>
          <p>先開啟官方網頁並登入；功能與額度依帳號而異，操作前先確認。</p>
        </header>
        <main class="ts-tools" aria-label="今天使用的兩個工具">
          <article class="ts-tool ts-tool--chatgpt">
            <span class="ts-no">01</span>
            <span class="ts-watermark" aria-hidden="true">GPT</span>
            <div class="ts-tool-title">
              <small>PROMPT &amp; CREATION</small>
              <h3><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT</a></h3>
            </div>
            <p>練習 Prompt、生成圖片，整理想法與簡報內容。</p>
            <div class="ts-tags"><span>Prompt</span><span>圖片生成</span><span>內容整理</span></div>
          </article>
          <div class="ts-join" aria-hidden="true"><span>OPEN</span><b>＋</b><span>LOGIN</span></div>
          <article class="ts-tool ts-tool--grok">
            <span class="ts-no">02</span>
            <span class="ts-watermark" aria-hidden="true">GROK</span>
            <div class="ts-tool-title">
              <small>IMAGE TO VIDEO</small>
              <h3><a href="https://grok.com/" target="_blank" rel="noopener noreferrer">Grok</a></h3>
            </div>
            <p>把完成的圖片延伸成動畫，練習動作、鏡頭與限制。</p>
            <div class="ts-tags"><span>圖片轉動畫</span><span>鏡頭控制</span><span>動態成果</span></div>
          </article>
        </main>
        <footer class="ts-footer">
          <span>上課前完成</span><b>開啟網頁／App</b><i>→</i><b>登入帳號</b><i>→</i><strong>確認功能與額度</strong>
        </footer>
      </section>`,
  };

  function makeSlide() {
    const slide = document.createElement('section');
    slide.className = 'slide local-tool-setup-slide';
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
    model.exportId = 'tool-setup-slide-20260907-v1';
    modelElement.textContent = JSON.stringify(model);
    return true;
  }

  install();
})();
