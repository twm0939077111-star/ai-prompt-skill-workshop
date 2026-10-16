(() => {
  const ANCHOR_ID = 'local_github_skill_anatomy';
  const THEME_IDS = [
    'local_skill_theme02',
    'local_skill_theme08',
    'local_skill_theme09',
  ];

  const deck = document.getElementById('deck');
  const modelElement = document.getElementById('deck-view-model');
  const anchor = deck?.querySelector(`[data-vm-slide-id="${ANCHOR_ID}"]`);
  if (!deck || !modelElement || !anchor) return;

  let cursor = anchor;
  for (const slideId of THEME_IDS) {
    const slide = deck.querySelector(`[data-vm-slide-id="${slideId}"]`);
    if (!slide) return;
    cursor.insertAdjacentElement('afterend', slide);
    cursor = slide;
  }

  [...deck.querySelectorAll(':scope > .slide')].forEach((slide, index) => {
    slide.dataset.vmIndex = String(index);
  });

  const model = JSON.parse(modelElement.textContent);
  const themeIdSet = new Set(THEME_IDS);
  const themeSlides = THEME_IDS.map((slideId) =>
    model.slides.find((slide) => slide.id === slideId),
  );
  if (themeSlides.some((slide) => !slide)) return;

  model.slides = model.slides.filter((slide) => !themeIdSet.has(slide.id));
  const anchorIndex = model.slides.findIndex((slide) => slide.id === ANCHOR_ID);
  model.slides.splice(anchorIndex + 1, 0, ...themeSlides);

  const order = (model.state?.slideOrder || model.slides.map((slide) => slide.id))
    .filter((slideId) => !themeIdSet.has(slideId));
  const orderAnchorIndex = order.indexOf(ANCHOR_ID);
  order.splice(orderAnchorIndex + 1, 0, ...THEME_IDS);
  model.state = { ...(model.state || {}), slideOrder: order };
  model.exportId = 'theme-showcase-reorder-20260907-v3';
  modelElement.textContent = JSON.stringify(model);
})();
