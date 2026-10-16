(() => {
  const RESULT_FIRST_PAIRS = [
    ['theme01_page076-8', 'theme01_page030-7'],
    ['theme01_page020-10', 'local_eyewear_prompts'],
  ];

  function moveBefore(order, movingId, beforeId, getId = (item) => item.id) {
    const movingIndex = order.findIndex((item) => getId(item) === movingId);
    if (movingIndex < 0) return;
    const [moving] = order.splice(movingIndex, 1);
    const beforeIndex = order.findIndex((item) => getId(item) === beforeId);
    order.splice(beforeIndex >= 0 ? beforeIndex : order.length, 0, moving);
  }

  function updateModel() {
    const modelElement = document.getElementById('deck-view-model');
    if (!modelElement) return;
    try {
      const model = JSON.parse(modelElement.textContent);
      RESULT_FIRST_PAIRS.forEach(([resultId, promptId]) => {
        moveBefore(model.slides || [], resultId, promptId);
        moveBefore(model.state?.slideOrder || [], resultId, promptId, (item) => item);
      });

      const medicalResult = model.slides?.find((slide) => slide.id === 'theme01_page076-8');
      if (medicalResult) {
        medicalResult.label = '醫美品牌視覺成果';
        medicalResult.props = {
          ...(medicalResult.props || {}),
          kicker: '03 / SOCIAL CONTENT｜醫美品牌',
          title: '醫美品牌視覺成果',
          cn: '編號與下一頁四個完整 Prompt 完全對應',
        };
      }
      model.exportId = 'case-order-copy-final-20260904';
      modelElement.textContent = JSON.stringify(model);
    } catch (_error) {
      // Leave the rendered deck usable if the optional view model cannot be parsed.
    }
  }

  function updateDom() {
    const deck = document.getElementById('deck');
    if (!deck) return;
    RESULT_FIRST_PAIRS.forEach(([resultId, promptId]) => {
      const resultSlide = deck.querySelector(`[data-vm-slide-id="${resultId}"]`);
      const promptSlide = deck.querySelector(`[data-vm-slide-id="${promptId}"]`);
      if (resultSlide && promptSlide) promptSlide.insertAdjacentElement('beforebegin', resultSlide);
    });
    [...deck.querySelectorAll(':scope > .slide')].forEach((slide, index) => {
      slide.dataset.vmIndex = String(index);
    });

    const medicalResult = deck.querySelector('[data-vm-slide-id="theme01_page076-8"]');
    if (!medicalResult) return;
    medicalResult.dataset.label = '醫美品牌視覺成果';
    const title = medicalResult.querySelector('h2');
    if (title) title.textContent = '醫美品牌視覺成果';
    const kicker = medicalResult.querySelector('.aip-kicker');
    if (kicker) kicker.textContent = '03 / SOCIAL CONTENT｜醫美品牌';
    const subtitle = [...medicalResult.querySelectorAll('*')].find((element) =>
      element.children.length === 0
      && /編號與(?:上|下)一頁四個完整 Prompt 完全對應/.test(element.textContent.trim()));
    if (subtitle) subtitle.textContent = '編號與下一頁四個完整 Prompt 完全對應';
  }

  function install() {
    updateModel();
    updateDom();
  }

  install();
  document.addEventListener('DOMContentLoaded', install, { once: true });
  window.addEventListener('load', install, { once: true });
})();
