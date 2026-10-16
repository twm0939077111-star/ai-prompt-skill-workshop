(() => {
  const slideId = 'theme01_page004-1';
  const coverProps = {
    kicker: 'AI 公開教學工作坊',
    issue: 'WORKSHOP · 01',
    overline: 'AI LEARNING WORKSHOP',
    titleTop: '第一次學 AI 就上手',
    titleBottom: '從 Prompt 開始掌握 AI 工具',
    subtitle: '圖片生成・動畫製作・Skill・簡報設計',
    sticker: '真實案例教學'
  };

  const modelElement = document.getElementById('deck-view-model');
  if (!modelElement) return;

  try {
    const model = JSON.parse(modelElement.textContent);
    const slide = model.slides?.find((item) => item.id === slideId);
    if (!slide) return;

    slide.label = '第一次學 AI 就上手';
    slide.props = { ...slide.props, ...coverProps };
    model.exportId = 'cover-ai-course-20260904-v1';
    modelElement.textContent = JSON.stringify(model);

    const slideElement = document.querySelector(`[data-vm-slide-id="${slideId}"]`);
    if (!slideElement) return;

    slideElement.dataset.label = slide.label;
    const root = slideElement.querySelector('.imported-theme-root');
    if (!root?.dataset.propDefaults) return;

    const defaults = JSON.parse(root.dataset.propDefaults);
    root.dataset.propDefaults = JSON.stringify({ ...defaults, ...coverProps });
  } catch (error) {
    console.error('[cover-ai-course] failed to update cover content', error);
  }
})();
