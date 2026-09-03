(() => {
  const copy = {
    a: {
      tag: "A｜不好看的結果",
      badge: "只執行風格元素",
      title: "元素都有，但畫面沒有被設計",
      body: "粉紅、人物、Chrome 與價格都出現了，卻缺少清楚的人物比例、視線動線與資訊主次。",
      bullets: ["構圖｜人物與文字互搶焦點", "層級｜主標、價格與裝飾主次不清", "感受｜像元素拼貼，完成度偏低"]
    },
    b: {
      tag: "B｜好看的結果",
      badge: "完整廣告設計",
      title: "每個元素都被安排成一套系統",
      body: "人物、主標、賣點、價格與 CTA 各有位置，裝飾也服務資訊層級，因此整體更精緻、可信。",
      bullets: ["構圖｜人物與資訊區分工清楚", "層級｜主標 → 賣點 → 價格 → CTA", "感受｜像完成的社群廣告，而非元素堆疊"]
    }
  };

  const setCard = (card, item) => {
    if (!card) return;
    const tag = card.querySelector(".pd-image-tag");
    const badge = card.querySelector(".pd-card-copy > span");
    const title = card.querySelector("h3");
    const body = card.querySelector("p");
    const bullets = [...card.querySelectorAll("li")];
    if (tag) tag.textContent = item.tag;
    if (badge) badge.textContent = item.badge;
    if (title) title.textContent = item.title;
    if (body) body.textContent = item.body;
    bullets.forEach((node, index) => { if (item.bullets[index]) node.textContent = item.bullets[index]; });
  };

  function apply() {
    const compare = document.querySelector('[data-vm-slide-id="local_prompt_difference_compare"] .pd-focus-compare');
    const factors = document.querySelector('[data-vm-slide-id="local_prompt_difference_factors"] .pd-focus-factors');
    if (!compare) return false;

    const compareLead = compare.querySelector(".pd-lead");
    if (compareLead) compareLead.textContent = "差別不在粉紅、Chrome 或人物有沒有出現，而在 GPT 是否把需求補成完整構圖、資訊層級與廣告系統。";
    const compareCards = compare.querySelectorAll(".pd-compare-card");
    setCard(compareCards[0], copy.a);
    setCard(compareCards[1], copy.b);
    const takeaway = compare.querySelector(".pd-takeaway");
    if (takeaway) takeaway.innerHTML = "B 圖更好看，不是因為元素更多，而是每個元素都被放在對的位置，形成清楚的 <b>主次與視線路徑</b>。";

    if (factors) {
      const factorLead = factors.querySelector(".pd-lead");
      if (factorLead) factorLead.textContent = "05＋06 決定成品好不好看；08 決定同樣條件能不能穩定重現。";
      const factorCards = [...factors.querySelectorAll(".pd-factor")];
      const verdicts = ["決定完成度", "決定可控度", "決定穩定度"];
      factorCards.forEach((card, index) => {
        card.querySelectorAll(".pd-factor-verdict").forEach(node => node.remove());
        const verdict = document.createElement("span");
        verdict.className = "pd-factor-verdict";
        verdict.textContent = verdicts[index] || "";
        card.appendChild(verdict);
      });
      const summary = factors.querySelector(".pd-factor-summary");
      if (summary) summary.innerHTML = "讓成品更好看：<b>版型規範（06）＋設計補完（05）</b>；讓結果更穩：<b>多次生成與篩選（08）</b>。";
    }
    return true;
  }

  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
