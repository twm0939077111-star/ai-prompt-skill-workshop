(() => {
  const apply = () => {
    const root = document.querySelector('[data-vm-slide-id="local_prompt_difference_factors"] .pd-logic-factors');
    if (!root) return false;

    const cards = [...root.querySelectorAll('.pfl-card')];
    const content = [
      {
        title: '設計補完',
        question: 'AI 有沒有像設計師一樣，主動把需求補成完整廣告？',
        points: ['品牌・賣點・CTA', '信任資訊・視線動線']
      },
      {
        title: '版型規範',
        question: 'Prompt 有沒有把畫面中的位置與層級說清楚？',
        points: ['人物比例・文字位置', '價格層級・資訊留白']
      },
      {
        title: '多輪生成與篩選',
        question: '相同條件也可能變動，需要用流程把最佳結果挑出來。',
        points: ['重複生成', '比較差異', '挑選最佳']
      }
    ];

    cards.forEach((card, index) => {
      const current = content[index];
      if (!current) return;
      card.querySelector('.pfl-number')?.remove();
      const title = card.querySelector('h3');
      const question = card.querySelector('.pfl-question');
      const points = [...card.querySelectorAll('.pfl-points li')];
      if (title) title.textContent = current.title;
      if (question) question.textContent = current.question;
      points.forEach((item, pointIndex) => { if (current.points[pointIndex]) item.textContent = current.points[pointIndex]; });
    });

    const head = root.querySelector('.pfl-head p');
    if (head) head.textContent = '前兩項決定成品好不好看；最後一項決定同樣條件能不能穩定重現。';
    const result = root.querySelector('.pfl-result');
    if (result) result.innerHTML = '<span>互相配合</span><b>完成度 × 可控度</b>';
    const formula = root.querySelector('.pfl-formula');
    if (formula) formula.innerHTML = '<b>好看</b><span>設計補完 ＋ 版型規範</span><i></i><b>穩定</b><span>多輪生成與篩選</span>';
    return true;
  };

  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
