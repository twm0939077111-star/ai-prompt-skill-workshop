(() => {
  const COMPARE_ID = "local_prompt_difference_compare";
  const FACTORS_ID = "local_prompt_difference_factors";

  const factors = [
    ["01", "廣告定義", "主視覺 KV，或可直接投放的完整社群廣告？", "#d84b88"],
    ["02", "Y2K 詮釋", "材質與配色，或加入貼紙、UI、標籤等平面語言？", "#7657cf"],
    ["03", "資訊密度", "只保留人物、主標、價格，或建立完整資訊階層？", "#4b9bb0"],
    ["04", "吸睛策略", "靠尺寸與留白聚焦，或靠豐富元素創造刺激？", "#df9355"],
    ["05", "設計補完", "照需求執行，或主動補上品牌、賣點與 CTA？", "#c764aa"],
    ["06", "版型規範", "原指令規定風格，卻未指定人物、文字與資訊的固定位置。", "#5c8ec8"],
    ["07", "對話背景", "自訂 Instructions、歷史對話與既有習慣，都會改變理解方式。", "#4f9a78"],
    ["08", "生成隨機性", "即使條件相同，人物、裝飾與構圖仍可能每次不同。", "#a07ac5"]
  ];

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function buildHeader(eyebrow, titleHtml, lead) {
    const header = el("header", "pd-header");
    header.appendChild(el("span", "pd-eyebrow", eyebrow));
    const title = el("h2");
    title.innerHTML = titleHtml;
    header.appendChild(title);
    header.appendChild(el("p", "pd-lead", lead));
    return header;
  }

  function buildCompare() {
    const page = el("div", "pd-page pd-compare-page");
    page.appendChild(buildHeader(
      "SAME PROMPT · DIFFERENT DESIGN LOGIC",
      "同一份 Prompt，為什麼做出<strong>兩種廣告？</strong>",
      "差異不只來自隨機性，而是 AI 對「醫美廣告」與資訊架構的不同理解。"
    ));

    const grid = el("main", "pd-compare-grid");
    const cards = [
      {
        image: "assets/user-media/pink-kv-minimal.png",
        imageTag: "VERSION A",
        badge: "主視覺 KV",
        title: "用一個焦點，快速抓住視線",
        text: "以人物、主標與放大的 $5,999 為主。留白多、訊息少，像品牌活動的主視覺。",
        bullets: [["焦點", "人物 → 主標 → 價格"], ["吸睛方式", "尺寸放大與留白"], ["特徵", "風格到位，但商業資訊較少"]],
        tone: "#7657cf"
      },
      {
        image: "assets/user-media/y2k-1.png",
        imageTag: "VERSION B",
        badge: "完整社群廣告",
        title: "把廣告系統一次補齊",
        text: "主動加入品牌、療程特色、價格、CTA 與信任元素，更接近可直接投放的社群廣告。",
        bullets: [["焦點", "品牌 → 賣點 → 價格 → CTA"], ["吸睛方式", "層級、貼紙與排版系統"], ["特徵", "資訊完整、平面設計感更強"]],
        tone: "#d84b88"
      }
    ];

    cards.forEach((item) => {
      const card = el("article", "pd-compare-card");
      card.style.setProperty("--pd-tone", item.tone);
      const figure = el("figure");
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.badge;
      figure.appendChild(image);
      figure.appendChild(el("span", "pd-image-tag", item.imageTag));
      card.appendChild(figure);
      const copy = el("div", "pd-card-copy");
      copy.appendChild(el("span", "", item.badge));
      copy.appendChild(el("h3", "", item.title));
      copy.appendChild(el("p", "", item.text));
      const list = el("ul");
      item.bullets.forEach(([label, body]) => {
        const li = el("li");
        const bold = el("b", "", `${label}｜`);
        li.append(bold, body);
        list.appendChild(li);
      });
      copy.appendChild(list);
      card.appendChild(copy);
      grid.appendChild(card);
    });
    page.appendChild(grid);

    const takeaway = el("footer", "pd-takeaway");
    takeaway.append("真正的差異不只在粉紅、Chrome 或 Y2K，而在 AI 是否主動完成 ");
    takeaway.appendChild(el("b", "", "資訊架構＋平面排版＋商業廣告系統"));
    takeaway.append("。 ");
    page.appendChild(takeaway);
    return page;
  }

  function buildFactors() {
    const page = el("div", "pd-page pd-factors-page");
    page.appendChild(buildHeader(
      "WHY THE RESULTS DIVERGE",
      "造成差異的<strong>8 個關鍵因素</strong>",
      "同一份 Brief，並不代表每個 GPT 都會做出同一套設計判斷。"
    ));
    const grid = el("main", "pd-factor-grid");
    factors.forEach(([number, title, body, color]) => {
      const card = el("article", "pd-factor");
      card.style.setProperty("--pd-factor", color);
      card.appendChild(el("b", "", number));
      card.appendChild(el("h3", "", title));
      card.appendChild(el("p", "", body));
      grid.appendChild(card);
    });
    page.appendChild(grid);
    const summary = el("footer", "pd-factor-summary");
    summary.append("同一份設計 Brief，交給兩位不同的 Art Director，最後會有不同答案；");
    summary.appendChild(el("b", "", "Prompt 需要同時規範風格、構圖與資訊系統。"));
    page.appendChild(summary);
    return page;
  }

  function mount(id, build, label) {
    const slide = document.querySelector(`[data-vm-slide-id="${id}"]`);
    if (!slide) return false;
    slide.dataset.label = label;
    if (!slide.querySelector(".pd-page")) slide.appendChild(build());
    return true;
  }

  function render() {
    let mounted = false;
    if (document.querySelector(`[data-vm-slide-id="${COMPARE_ID}"]`)) {
      mounted = mount(COMPARE_ID, buildCompare, "同一 Prompt 的兩種廣告") || mounted;
    }
    if (document.querySelector(`[data-vm-slide-id="${FACTORS_ID}"]`)) {
      mounted = mount(FACTORS_ID, buildFactors, "同 Prompt 差異的 8 個原因") || mounted;
    }
    return mounted;
  }

  if (!render()) {
    const observer = new MutationObserver(() => {
      if (render()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
