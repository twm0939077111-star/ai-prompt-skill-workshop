(() => {
  const COMPARE_ID = "local_prompt_difference_compare";
  const FACTORS_ID = "local_prompt_difference_factors";

  const factors = [
    ["05", "設計補完力", "AI 是否像設計師一樣，主動補上品牌、療程賣點、優惠標籤、CTA 與信任資訊？B 圖不只執行素材，更完成一套廣告系統。", "#d84b88"],
    ["06", "版型規範清楚度", "Prompt 若沒有指定人物比例、標題位置、價格層級、資訊區塊與留白，構圖就會完全交由 AI 猜測。規範越清楚，完成度越穩定。", "#7657cf"],
    ["08", "生成隨機性與篩選", "相同條件仍會產生不同構圖。用明確限制、參考圖與多次生成進行篩選，才能把偶然的好結果變成可重複的方法。", "#4b9bb0"]
  ];

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function header(eyebrow, titleHtml, lead) {
    const root = el("header", "pd-header");
    root.appendChild(el("span", "pd-eyebrow", eyebrow));
    const title = el("h2");
    title.innerHTML = titleHtml;
    root.append(title, el("p", "pd-lead", lead));
    return root;
  }

  function comparePage() {
    const page = el("div", "pd-page pd-compare-page pd-focus-compare");
    page.appendChild(header(
      "A VS B · WHAT MAKES THE DESIGN BETTER",
      "同一份 Prompt，為什麼<strong>B 圖更好看？</strong>",
      "重點不只是裝飾元素多寡，而是版型、資訊層級與商業廣告系統是否完整。"
    ));

    const grid = el("main", "pd-compare-grid");
    const cards = [
      {
        image: "assets/user-media/pink-kv-minimal.png",
        tag: "A｜較不完整",
        badge: "只做到風格元素",
        title: "有粉紅與 Chrome，卻沒有完整廣告設計",
        text: "人物與價格雖然醒目，但畫面只完成視覺主題，缺少品牌、賣點、CTA 與完整閱讀路徑。",
        bullets: [["版型", "人物＋主標＋大價格，結構單薄"], ["層級", "價格過度放大，其他資訊沒有被建立"], ["結果", "像 AI 人像海報，商業完成度較低"]],
        tone: "#7657cf"
      },
      {
        image: "assets/user-media/y2k-1.png",
        tag: "B｜完成度較高",
        badge: "完成社群廣告系統",
        title: "風格之外，也把資訊架構與版面做好",
        text: "不只放入 Y2K 元素，還建立品牌、主標、療程、價格、CTA 與信任資訊，視線移動更有順序。",
        bullets: [["版型", "人物、文字、價格與按鈕各有位置"], ["層級", "品牌 → 主標 → 賣點 → 價格 → CTA"], ["結果", "更像可直接使用的專業社群廣告"]],
        tone: "#d84b88"
      }
    ];

    cards.forEach((item) => {
      const card = el("article", "pd-compare-card");
      card.style.setProperty("--pd-tone", item.tone);
      const figure = el("figure");
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.tag;
      figure.append(image, el("span", "pd-image-tag", item.tag));
      const copy = el("div", "pd-card-copy");
      copy.append(el("span", "", item.badge), el("h3", "", item.title), el("p", "", item.text));
      const list = el("ul");
      item.bullets.forEach(([label, body]) => {
        const li = el("li");
        li.append(el("b", "", `${label}｜`), body);
        list.appendChild(li);
      });
      copy.appendChild(list);
      card.append(figure, copy);
      grid.appendChild(card);
    });
    page.appendChild(grid);

    const takeaway = el("footer", "pd-takeaway");
    takeaway.append("B 圖更好看，關鍵不在元素比較多，而在它完成了 ");
    takeaway.append(el("b", "", "設計補完＋版型規範＋層級控制"), "。");
    page.appendChild(takeaway);
    return page;
  }

  function factorPage() {
    const page = el("div", "pd-page pd-factors-page pd-focus-factors");
    page.appendChild(header(
      "THE THREE FACTORS THAT CHANGE THE RESULT",
      "真正拉開品質差距的<strong>3 個因素</strong>",
      "05、06、08 才是核心：補完設計、規範版型，再用多次生成控制不確定性。"
    ));
    const grid = el("main", "pd-factor-grid");
    factors.forEach(([number, title, body, color]) => {
      const card = el("article", "pd-factor");
      card.style.setProperty("--pd-factor", color);
      card.append(el("b", "", number), el("h3", "", title), el("p", "", body));
      grid.appendChild(card);
    });
    page.appendChild(grid);
    const summary = el("footer", "pd-factor-summary");
    summary.append("好看的結果不是只靠 Style；真正可控的方法是 ");
    summary.appendChild(el("b", "", "設計補完 × 版型規範 × 多輪生成與篩選"));
    page.appendChild(summary);
    return page;
  }

  function replace(id, label, content) {
    const slide = document.querySelector(`[data-vm-slide-id="${id}"]`);
    if (!slide) return false;
    slide.dataset.label = label;
    slide.querySelectorAll(".pd-page").forEach(node => node.remove());
    slide.appendChild(content());
    return true;
  }

  function render() {
    let rendered = false;
    if (document.querySelector(`[data-vm-slide-id="${COMPARE_ID}"]`)) {
      rendered = replace(COMPARE_ID, "為什麼 B 圖更好看", comparePage) || rendered;
    }
    if (document.querySelector(`[data-vm-slide-id="${FACTORS_ID}"]`)) {
      rendered = replace(FACTORS_ID, "讓圖片更好看的 3 個關鍵", factorPage) || rendered;
    }
    return rendered;
  }

  if (!render()) {
    const observer = new MutationObserver(() => {
      if (render()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
