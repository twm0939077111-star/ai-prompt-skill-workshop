(() => {
  const SLIDE_ID = "local_prompt_difference_factors";

  function node(tag, className, text) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text !== undefined) item.textContent = text;
    return item;
  }

  function factorCard(number, title, question, points, verdict, tone) {
    const card = node("article", "pfl-card");
    card.style.setProperty("--pfl-tone", tone);
    const top = node("div", "pfl-card-top");
    top.append(node("b", "pfl-number", number), node("span", "pfl-verdict", verdict));
    const heading = node("h3", "", title);
    const lead = node("p", "pfl-question", question);
    const list = node("ul", "pfl-points");
    points.forEach(point => list.appendChild(node("li", "", point)));
    card.append(top, heading, lead, list);
    return card;
  }

  function renderPage() {
    const page = node("div", "pd-page pd-logic-factors");

    const header = node("header", "pfl-head");
    header.append(
      node("span", "pfl-eyebrow", "05 · 06 · 08｜THREE CORE VARIABLES")
    );
    const title = node("h2");
    title.innerHTML = "真正拉開差距的，<strong>不是更多形容詞</strong>。";
    header.append(title, node("p", "", "05＋06 決定成品好不好看；08 決定同樣條件能不能穩定重現。"));
    page.appendChild(header);

    const stage = node("main", "pfl-stage");

    const quality = node("section", "pfl-cluster pfl-quality");
    const qualityHead = node("div", "pfl-cluster-head");
    qualityHead.append(node("span", "", "QUALITY"), node("b", "", "讓成品更好看"));
    const pair = node("div", "pfl-quality-pair");
    pair.append(
      factorCard(
        "05",
        "設計補完",
        "AI 有沒有像設計師一樣補完 Brief？",
        ["品牌・賣點・CTA", "信任資訊・視線動線"],
        "決定完成度",
        "#d84b88"
      ),
      node("div", "pfl-plus", "＋"),
      factorCard(
        "06",
        "版型規範",
        "Prompt 有沒有把構圖與層級說清楚？",
        ["人物比例・文字位置", "價格層級・資訊留白"],
        "決定可控度",
        "#7657cf"
      )
    );
    const qualityResult = node("div", "pfl-result");
    qualityResult.append(node("span", "", "05 ＋ 06"), node("b", "", "完成度 × 可控度"));
    quality.append(qualityHead, pair, qualityResult);

    const connector = node("div", "pfl-connector");
    connector.append(node("span", "", "再控制變動"), node("i", ""));

    const stability = node("section", "pfl-cluster pfl-stability");
    const stabilityHead = node("div", "pfl-cluster-head");
    stabilityHead.append(node("span", "", "CONSISTENCY"), node("b", "", "讓結果穩定重現"));
    const stabilityCard = factorCard(
      "08",
      "生成隨機性",
      "即使條件相同，姿勢、文字與構圖仍可能漂移。",
      ["多次生成", "比較選圖", "迭代修正"],
      "決定穩定度",
      "#3f98ad"
    );
    stabilityCard.classList.add("is-stability");
    const loop = node("div", "pfl-loop");
    ["生成", "比較", "篩選"].forEach((label, index) => {
      const chip = node("span", `step-${index + 1}`, label);
      loop.appendChild(chip);
    });
    stability.append(stabilityHead, stabilityCard, loop);

    stage.append(quality, connector, stability);
    page.appendChild(stage);

    const footer = node("footer", "pfl-formula");
    footer.innerHTML = "<b>好看</b><span>05 設計補完 ＋ 06 版型規範</span><i></i><b>穩定</b><span>08 多次生成與篩選</span>";
    page.appendChild(footer);
    return page;
  }

  function apply() {
    const slide = document.querySelector(`[data-vm-slide-id="${SLIDE_ID}"]`);
    if (!slide) return false;
    slide.dataset.label = "05／06／08 三個核心變數";
    slide.querySelectorAll(".pd-page").forEach(item => item.remove());
    slide.appendChild(renderPage());
    return true;
  }

  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
