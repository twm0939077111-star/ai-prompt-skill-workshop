// One coherent lesson design. Screenshots remain original files;
// each viewport shows a complete conversational turn, with blank UI removed.
window.applyHtmlPptTeaching = function(deck, model) {
  const example='examples/apple-company/index.html';
  const source='assets/html-ppt-tutorial/';
  const dialogue={
    'apple-step1.jpg':{
      question:'<p>我現在要製作一份公司簡報<br>先用apple這間公司當範例<br>介紹這間公司做甚麼的<br>營業內容等等</p><p>"E:\\AI教學完整備份\\skill all\\html-ppt-skill-main.zip"<br>需要用我提供的skill製作</p>',
      answer:'<p>我已載入你提供的 html-ppt skill。建議先以「正式公司介紹」方向製作：</p><ul><li>8 頁，對象：一般客戶／內部同仁</li><li>風格：<code>corporate-clean</code></li><li>模板：<code>product-launch</code></li><li>內容：公司概覽、發展沿革、主要產品與服務、營業模式、全球市場、生態系、財務與未來方向</li></ul><p>如果這個方向可以，我就直接開始製作；若你有指定的觀眾、頁數或風格，也可以告訴我。</p>'
    },
    'apple-step2.jpg':{
      question:'<p>主要介紹四頁就行<br>然後要有質感的簡報<br>要套用我skill裡面的模板</p>',
      answer:'<p>已完成四頁 Apple 公司介紹簡報，套用你提供的 skill 的 <code>product-launch</code> 模板風格，並完成 1600×900 預覽渲染與四頁數量檢查。</p><p>開啟：<a href="examples/apple-company/index.html" target="_blank" rel="noopener">index.html</a></p><p>內容包含：公司定位、產品與服務、生意／營運模式、全球生態系與未來方向。數據採 Apple FY2025 公開財務資料與官方公司資訊：財報、公司領導與規模。</p><p>可使用鍵盤方向鍵翻頁，<code>F</code> 全螢幕，<code>O</code> 總覽。</p>'
    }
  };
  const segment=(file,x,y,w,h,label,kind='')=>{const role=kind.startsWith('question')?'question':'answer';return `<section class="pl-turn ${role}"><div class="pl-speaker"><b>${role==='question'?'我':'AI'}</b><span>${label}</span></div><div class="pl-message">${dialogue[file][role]}</div></section>`;};
  const points=(items)=>items.map(([n,title,text])=>`<div class="pl-point"><span>${n}</span><div><h3>${title}</h3><p>${text}</p></div></div>`).join('');
  const pages=[
    {id:'local_ppt_chapter_opening',title:'現在介紹 PPT Skill',kind:'opening',kicker:'APPLICATION 02 / PPT SKILL',lead:'把想說的內容，整理成一份簡報。',body:`<div class="pl-opening-copy"><p class="pl-overline">現在介紹</p><h1>PPT<br><strong>Skill<span>.</span></strong></h1><p class="pl-intro">把想說的內容，<br>整理成一份簡報。</p><div class="pl-mini-path">認識用途 <i>／</i> 理解方法 <i>／</i> 實際操作</div></div><figure class="pl-opening-art"><img src="examples/apple-company/preview.png" alt="實際完成的 Apple 公司介紹簡報"><figcaption>本次實作案例：四頁 Apple 公司介紹</figcaption></figure>`,foot:'不用先學排版，先學會把需求說清楚。'},
    {id:'local_skill_theme02',title:'用 Skill，可以做哪些簡報？',kind:'applications',kicker:'01 / APPLICATIONS',lead:'把你已經有的內容，整理成別人容易理解的簡報。',body:`<div class="pl-application-grid">${[['01','工作報告','把進度、成果與問題，說明給同事聽。'],['02','公司與產品介紹','把公司做什麼、服務特色，介紹給客戶。'],['03','課程與經驗分享','把自己會的事，整理成別人跟得上的內容。'],['04','旅遊與興趣分享','把行程、照片與心得，分享給朋友。']].map(([n,t,p])=>`<article><span class="pl-big-no">${n}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div>`,foot:'這次一起做：Apple 公司介紹。',link:example,linkText:'看四頁實作成果'},
    {id:'local_skill_theme08',title:'Skill 如何幫你完成簡報？',kind:'method',kicker:'02 / INSIDE THE SKILL',lead:'它把做簡報的方法寫下來，讓 AI 有一套做法可依循。',body:`<div class="pl-method-grid">${[['01','先了解需求','主題是什麼？給誰看？<br>需要幾頁、什麼風格？'],['02','選擇合適版型','封面、重點、比較、流程，<br>有對應的版型可以使用。'],['03','製作簡報內容','換上你的資料，安排文字與圖片，<br>維持整份簡報風格一致。'],['04','檢查完成成果','逐頁確認內容與版面，<br>檢查圖片、翻頁是否正常。']].map(([n,t,p])=>`<article><span>${n}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div>`,foot:'除了做法，也附有主題、版型與播放功能。',link:'assets/html-ppt-kit/SKILL.md',linkText:'查看 Skill 原始說明'},
    {id:'local_skill_theme09',title:'實際操作一：先說你要做什麼',kind:'practice',kicker:'03 / REAL CONVERSATION',lead:'用自己的話說明主題，並指定使用這套 Skill。',body:`<div class="pl-evidence"><h3 class="pl-column-title">圖片實作範例 <small>原始對話分段呈現</small></h3><div class="pl-turns">${segment('apple-step1.jpg',1035,128,440,225,'01　我的首次提問','question')}${segment('apple-step1.jpg',570,449,920,202,'02　AI 提出的製作方向','answer')}</div></div><aside class="pl-explain"><h3 class="pl-column-title">對話重點 <small>對照左側閱讀</small></h3>${points([['01','先交代主題','製作公司介紹簡報，<br>以 Apple 為例。'],['01','再交代範圍與工具','介紹公司做什麼、營業內容，<br>指定使用提供的 Skill。'],['02','看 AI 提出的建議','先看頁數、風格與內容方向，<br>不符合需求就繼續補充。']])}</aside>`,foot:'不用一次寫完美；先說清楚，再透過對話確認。',link:source+'apple-step1.jpg',linkText:'開啟完整對話原圖'},
    {id:'local_practice_marketing_deck',title:'實際操作二：補充條件，看成果',kind:'practice',kicker:'04 / REQUIREMENTS TO RESULT',lead:'AI 的建議不是定案，把你在意的條件直接說出來。',body:`<div class="pl-evidence"><h3 class="pl-column-title">圖片實作範例 <small>原始對話分段呈現</small></h3><div class="pl-turns">${segment('apple-step2.jpg',1240,115,238,119,'03　我補充的條件','question short')}${segment('apple-step2.jpg',570,331,920,314,'04　AI 完成回覆與成果入口','answer')}</div></div><aside class="pl-explain"><h3 class="pl-column-title">對話重點 <small>對照左側閱讀</small></h3>${points([['03','把條件說清楚','四頁、有質感，<br>套用 Skill 裡的模板。'],['04','開啟完成的簡報','點回覆中的 index.html，<br>逐頁看內容與版面。'],['04','再決定要不要修改','內容正確嗎？風格喜歡嗎？<br>想改哪裡，再告訴 AI。']])}</aside>`,foot:'本次成果：四頁 Apple 公司介紹。',link:example,linkText:'開啟 Apple 實作簡報'}
  ];
  pages.push({id:'local_apple_result_demo',title:'實作成果：Apple 公司介紹',kind:'result',kicker:'05 / LIVE DEMO',lead:'從剛才的對話，看看實際完成的四頁簡報。',body:`<iframe class="pl-result-frame" src="examples/apple-company/index.html#/1" title="Apple 公司介紹四頁實作簡報" allowfullscreen></iframe>`,foot:'先點一下簡報，再用方向鍵翻頁；需要大畫面時，開啟完整簡報。',link:example+'#/1',linkText:'開啟完整簡報'});
  const resultPage=pages.find(p=>p.kind==='result');
  resultPage.lead='同一份需求，完成四頁內容與一致的視覺風格。';
  resultPage.body='<div class="pl-result-grid">'+['Apple 概覽','產品與服務','營運模式','全球影響力'].map((title,i)=>`<figure><a href="${source}apple-result-${i+1}.png" target="_blank" rel="noopener"><img src="${source}apple-result-${i+1}.png" alt="第 ${i+1} 頁：${title}"></a><figcaption><b>0${i+1}</b> ${title}</figcaption></figure>`).join('')+'</div>';
  resultPage.foot='四頁實際成果｜點選任一畫面可放大查看。';
  const style=document.createElement('style');
  style.textContent=`
  .ppt-lesson{container-type:inline-size;--pl-ink:#2b263b;--pl-purple:#7554b1;--pl-muted:#696477;--pl-line:#ded6ea;--pl-paper:#fffffff0;font-family:'Microsoft JhengHei','Noto Sans TC',sans-serif;color:var(--pl-ink)}
  .ppt-lesson .pl-page{box-sizing:border-box;height:100%;width:100%;container-type:inline-size;padding:2.3cqw 3.5cqw;display:flex;flex-direction:column;gap:1.1cqw;background:linear-gradient(135deg,#fbf9fc,#f4f1fc 65%,#edf7f5);position:relative;overflow:hidden}
  .ppt-lesson .pl-page *{box-sizing:border-box}.ppt-lesson .pl-page:before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.28;background-image:linear-gradient(#c9bdd51f 1px,transparent 1px),linear-gradient(90deg,#c9bdd51f 1px,transparent 1px);background-size:3cqw 3cqw}
  .ppt-lesson .pl-page>*{position:relative}.ppt-lesson .pl-kicker{margin:0 0 .55cqw;font-size:1.05cqw;letter-spacing:.16em;color:var(--pl-purple);font-weight:800}.ppt-lesson h2{margin:0;font-size:3.8cqw;line-height:1.2;font-weight:900;letter-spacing:-.04em}.ppt-lesson .pl-lead{font-size:1.65cqw;line-height:1.4;margin:.65cqw 0 0;color:var(--pl-muted)}
  .ppt-lesson .pl-body{flex:1;min-height:0}.ppt-lesson .pl-footer{display:flex;justify-content:space-between;gap:1cqw;border-top:1px solid var(--pl-line);padding-top:.75cqw;font-size:1.2cqw;line-height:1.4;color:var(--pl-muted)}.ppt-lesson .pl-footer a{color:var(--pl-purple);font-weight:700;text-decoration:underline;white-space:nowrap}
  .ppt-lesson .pl-application-grid{height:100%;display:grid;grid-template-columns:1fr 1fr;gap:1.2cqw 4cqw;align-content:center}.ppt-lesson .pl-application-grid article{position:relative;padding:1.6cqw 0 1.6cqw 6cqw;border-bottom:1px solid var(--pl-line)}.ppt-lesson .pl-big-no{position:absolute;left:0;top:1.7cqw;font:800 3.8cqw/1 Arial;color:#a38ac7}.ppt-lesson article h3{font-size:2.7cqw;margin:0 0 .75cqw;line-height:1.25;color:var(--pl-ink)}.ppt-lesson article p{font-size:1.9cqw;line-height:1.5;margin:0;color:var(--pl-muted)}
  .ppt-lesson .pl-method-grid{height:100%;display:grid;grid-template-columns:1fr 1fr;gap:1.4cqw;align-content:center}.ppt-lesson .pl-method-grid article{background:var(--pl-paper);border:1px solid var(--pl-line);border-radius:1.1cqw;padding:1.8cqw 2cqw;box-shadow:0 .5cqw 1cqw #44345606}.ppt-lesson .pl-method-grid article>span{font-size:1.5cqw;font-weight:800;color:var(--pl-purple);display:block;margin-bottom:.6cqw}
  .ppt-lesson.pl-practice .pl-page{padding:1.5cqw 2.6cqw;gap:.7cqw}.ppt-lesson.pl-practice .pl-kicker{font-size:.9cqw;margin-bottom:.3cqw}.ppt-lesson.pl-practice h2{font-size:3.4cqw}.ppt-lesson.pl-practice .pl-lead{font-size:1.4cqw;margin:.35cqw 0 0}.ppt-lesson.pl-practice .pl-body{display:grid;grid-template-columns:1.65fr 1fr;gap:2.8cqw}
  .ppt-lesson .pl-column-title{font-size:2.2cqw;line-height:1.2;color:var(--pl-ink);margin:0 0 .75cqw;padding-bottom:.6cqw;border-bottom:1px solid #bba8d3}.ppt-lesson .pl-column-title small{font-size:1.1cqw;color:var(--pl-muted);font-weight:400;margin-left:.65cqw}.ppt-lesson .pl-evidence{min-height:0;display:flex;flex-direction:column}.ppt-lesson .pl-turns{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1cqw}
  .ppt-lesson .pl-turn{margin:0;min-width:0}.ppt-lesson .pl-turn figcaption{font-size:1.2cqw;color:var(--pl-purple);font-weight:800;margin:0 0 .35cqw}.ppt-lesson .pl-turn.question{width:59%;align-self:flex-end}.ppt-lesson .pl-turn.question.short{width:32%;align-self:flex-end}.ppt-lesson .pl-turn.answer{width:100%}.ppt-lesson .pl-crop{display:block;position:relative;overflow:hidden;border-radius:.55cqw;border:1px solid #e1d9ec;background:white;box-shadow:0 .4cqw 1.4cqw #503a7310}.ppt-lesson .pl-crop img{display:block;position:absolute;max-width:none!important;max-height:none!important;height:auto!important;border:0;border-radius:0;object-fit:initial}.ppt-lesson .pl-crop:focus-visible{outline:3px solid var(--pl-purple)}
  .ppt-lesson .pl-explain{min-width:0}.ppt-lesson .pl-point{display:grid;grid-template-columns:2.6cqw 1fr;gap:.8cqw;padding:1.2cqw 0;border-bottom:1px solid var(--pl-line)}.ppt-lesson .pl-point>span{font:800 1.65cqw/1.4 Arial;color:var(--pl-purple)}.ppt-lesson .pl-point h3{font-size:2.2cqw;line-height:1.3;color:var(--pl-purple);margin:0 0 .6cqw}.ppt-lesson .pl-point p{font-size:1.9cqw;line-height:1.5;margin:0;color:var(--pl-ink)}
  .ppt-lesson.pl-opening .pl-body{display:grid;grid-template-columns:1fr 1.15fr;align-items:center;gap:4cqw}.ppt-lesson .pl-overline{color:var(--pl-purple);font-size:2cqw;font-weight:700;letter-spacing:.12em;margin:0 0 1.2cqw}.ppt-lesson h1{font:900 8.5cqw/.96 Arial,sans-serif;letter-spacing:-.065em;margin:0}.ppt-lesson h1 strong{color:var(--pl-purple)}.ppt-lesson h1 span{color:#bcabd9}.ppt-lesson .pl-intro{font-size:2.4cqw;line-height:1.5;margin:2cqw 0;color:var(--pl-ink)}.ppt-lesson .pl-mini-path{font-size:1.3cqw;color:var(--pl-muted)}.ppt-lesson .pl-mini-path i{font-style:normal;color:#b4a4c9;margin:0 .5cqw}.ppt-lesson .pl-opening-art{margin:0;padding:1cqw;background:var(--pl-paper);border:1px solid var(--pl-line);border-radius:1.5cqw;box-shadow:0 1.4cqw 3cqw #63438d18;transform:rotate(-2deg)}.ppt-lesson .pl-opening-art img{width:100%;height:auto;display:block;border-radius:.8cqw}.ppt-lesson .pl-opening-art figcaption{font-size:1.4cqw;line-height:1.4;color:var(--pl-purple);padding:1cqw .4cqw .4cqw}
  `;
  style.textContent+=`
  .ppt-lesson.pl-practice .pl-body{grid-template-columns:2.15fr 1fr;gap:2cqw}
  .ppt-lesson .pl-turns{justify-content:center;gap:.85cqw}
  .ppt-lesson .pl-turn.question,.ppt-lesson .pl-turn.question.short,.ppt-lesson .pl-turn.answer{width:100%;align-self:stretch}
  .ppt-lesson .pl-speaker{display:flex;align-items:center;gap:.65cqw;margin-bottom:.4cqw;font-size:1.2cqw;font-weight:700;color:var(--pl-purple)}
  .ppt-lesson .pl-speaker b{background:var(--pl-purple);color:white;border-radius:.5cqw;padding:.22cqw .65cqw;font-size:1.25cqw;min-width:3.2cqw;text-align:center}
  .ppt-lesson .answer .pl-speaker b{background:#344f49}
  .ppt-lesson .pl-message{padding:.3cqw 1.1cqw;border:1px solid #ded6ea;border-radius:.8cqw;background:#fff;font-size:1.65cqw;line-height:1.36;color:var(--pl-ink);overflow-wrap:anywhere}
  .ppt-lesson .question .pl-message{background:#eee7f7;border-color:#dacced}
  .ppt-lesson .pl-message p{font:inherit;margin:0 0 .48cqw}.ppt-lesson .pl-message p:last-child{margin-bottom:0}
  .ppt-lesson .pl-message ul{margin:.3cqw 0 .48cqw;padding-left:1.8cqw}.ppt-lesson .pl-message li{margin:0}
  .ppt-lesson .pl-message code{font:inherit;background:#efedf1;border-radius:.2cqw;padding:0 .2cqw}
  .ppt-lesson .pl-message a{color:#6942a7;font-weight:800;text-decoration:underline}
  .ppt-lesson .pl-explain .pl-column-title small{display:block;margin:.45cqw 0 0}
  .ppt-lesson .pl-point{padding:1.15cqw 0}.ppt-lesson .pl-point h3{font-size:2cqw}.ppt-lesson .pl-point p{font-size:1.7cqw}
  `;
  for(const page of pages){
    if(page.kind!=='practice')continue;
    const first=page.id==='local_skill_theme09';
    const file=first?'apple-step1.jpg':'apple-step2.jpg';
    const x=570,y=first?128:115,w=920,h=first?523:436;
    const shot=`<div class="pl-evidence"><h3 class="pl-column-title">實際操作畫面 <small>原始對話截圖</small></h3><div class="pl-shot-space"><a class="pl-crop pl-single-shot" href="${source+file}" target="_blank" rel="noopener" aria-label="放大查看完整原始截圖" style="aspect-ratio:${w}/${h}"><img src="${source+file}" alt="${first?'首次提問與 AI 建議':'補充條件與 AI 完成回覆'}，原始操作截圖" style="width:${2048/w*100}%;left:${-x/w*100}%;top:${-y/h*100}%"></a></div></div>`;
    page.body=shot+page.body.slice(page.body.indexOf('<aside'));
  }
  style.textContent+=`.ppt-lesson .pl-shot-space{flex:1;min-height:0;display:flex;align-items:center;padding:1.3cqw;background:white;border:1px solid #e1d9ec;border-radius:.8cqw;margin:.4cqw 0 .6cqw;box-shadow:0 .4cqw 1.4cqw #503a7310}.ppt-lesson .pl-single-shot{width:100%;flex:none;background:white;border:0;border-radius:0;box-shadow:none}.ppt-lesson .pl-single-shot img{max-width:none!important}`;
  const opening=pages.find(p=>p.kind==='opening');
  opening.body=`<div class="pl43-heading"><p>現在介紹</p><h1>PPT <strong>Skill<span>.</span></strong></h1><div>把想說的內容，整理成一份簡報。</div></div><div class="pl43-showcase"><div class="pl43-copy"><span>讓 AI 有方法可依循</span><h3>你說明需求，<br>AI 按照 Skill<br>製作簡報。</h3><p>從主題、頁數到風格，<br>用對話一步步確認。</p></div><figure><a href="${example}" target="_blank" rel="noopener"><img src="examples/apple-company/preview.png" alt="四頁 Apple 公司介紹簡報的封面預覽"></a><figcaption><b>本次實作案例</b><span>Apple 公司介紹 · 四頁簡報 ↗</span></figcaption></figure></div><div class="pl43-route"><span><b>01</b> 可以用在哪裡</span><span><b>02</b> 裡面寫了什麼</span><span><b>03</b> 一起實際操作</span></div>`;
  style.textContent+=`
  .ppt-lesson.pl-opening .pl-page{padding:2.3cqw 3.5cqw;gap:.65cqw}
  .ppt-lesson.pl-opening .pl-body{display:grid;grid-template-columns:1fr;grid-template-rows:auto 1fr auto;gap:1.5cqw;align-items:stretch}
  .ppt-lesson .pl43-heading{border-bottom:1px solid var(--pl-line);padding-bottom:1.4cqw;position:relative}
  .ppt-lesson .pl43-heading>p{font-size:1.7cqw;color:var(--pl-purple);font-weight:800;margin:0 0 .4cqw}
  .ppt-lesson .pl43-heading h1{font:900 6.6cqw/1.05 Arial,sans-serif;letter-spacing:-.04em;margin:0;white-space:nowrap}
  .ppt-lesson .pl43-heading>div{position:absolute;right:0;bottom:1.8cqw;font-size:1.8cqw;color:var(--pl-muted)}
  .ppt-lesson .pl43-showcase{display:grid;grid-template-columns:.85fr 1.25fr;gap:4cqw;align-items:center;min-height:0}
  .ppt-lesson .pl43-copy>span{font-size:1.3cqw;letter-spacing:.08em;color:var(--pl-purple);font-weight:700}
  .ppt-lesson .pl43-copy h3{font-size:3cqw;line-height:1.4;letter-spacing:-.03em;margin:.9cqw 0;color:var(--pl-ink)}
  .ppt-lesson .pl43-copy p{font-size:1.65cqw;line-height:1.6;margin:0;color:var(--pl-muted)}
  .ppt-lesson .pl43-showcase figure{margin:0;padding:1cqw;background:white;border:1px solid var(--pl-line);border-radius:1cqw;box-shadow:0 .6cqw 2cqw #63438d10}
  .ppt-lesson .pl43-showcase img{display:block;width:100%;height:24cqw;object-fit:contain;background:#09090f;border-radius:.4cqw}
  .ppt-lesson .pl43-showcase figcaption{display:flex;justify-content:space-between;gap:1cqw;padding:1cqw .25cqw .1cqw;font-size:1.2cqw;color:var(--pl-muted)}
  .ppt-lesson .pl43-showcase figcaption b{color:var(--pl-purple)}
  .ppt-lesson .pl43-route{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--pl-line);padding:1.25cqw 0 .5cqw;gap:2cqw;font-size:1.65cqw;font-weight:700}
  .ppt-lesson .pl43-route b{color:var(--pl-purple);font:800 1.5cqw Arial;margin-right:.8cqw}
  `;
  style.textContent+=`.ppt-lesson.pl-result .pl-page{padding:1.4cqw 2.6cqw;gap:.7cqw}.ppt-lesson.pl-result h2{font-size:3cqw}.ppt-lesson.pl-result .pl-lead{font-size:1.4cqw}.ppt-lesson.pl-result .pl-body{display:flex;justify-content:center;min-height:0}.ppt-lesson .pl-result-frame{display:block;width:100%;height:100%;border:1px solid var(--pl-line);border-radius:.6cqw;background:#09090f}`;
  style.textContent+=`.ppt-lesson.pl-result .pl-body{position:relative;overflow:hidden;background:#09090f;border-radius:.6cqw}.ppt-lesson .pl-result-frame{position:absolute;width:1600px;height:900px;max-width:none;max-height:none;left:50%;top:50%;transform-origin:center;border:0;border-radius:0}`;
  style.textContent+=`.ppt-lesson.pl-result .pl-body{background:transparent;overflow:visible}.ppt-lesson .pl-result-grid{height:100%;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:1cqw 2cqw;width:100%;min-height:0}.ppt-lesson .pl-result-grid figure{margin:0;min-height:0;display:flex;flex-direction:column;align-items:center;gap:.35cqw}.ppt-lesson .pl-result-grid a{display:block;min-height:0;flex:1;width:100%;text-align:center}.ppt-lesson .pl-result-grid img{display:block;width:100%;height:100%;object-fit:contain}.ppt-lesson .pl-result-grid figcaption{font-size:1.2cqw;line-height:1.3;color:var(--pl-ink)}.ppt-lesson .pl-result-grid figcaption b{color:var(--pl-purple);margin-right:.5cqw}`;
  style.textContent+=`
  .ppt-lesson.pl-emphasis{--pl-purple:#6330b7}
  .ppt-lesson.pl-emphasis h2{color:#5924a5;font-weight:950;text-shadow:0 1px 0 white;position:relative;width:fit-content;padding-bottom:.5cqw}
  .ppt-lesson.pl-emphasis h2:after{content:'';position:absolute;bottom:0;left:0;width:5.5cqw;height:.32cqw;border-radius:1cqw;background:linear-gradient(90deg,#793fc5,#d16a27);transform-origin:left}
  .ppt-lesson.pl-emphasis .pl-application-grid h3,.ppt-lesson.pl-emphasis .pl-method-grid h3{color:#006c68;font-weight:900}
  .ppt-lesson.pl-emphasis .pl-big-no,.ppt-lesson.pl-emphasis .pl-method-grid article>span{color:#a94713;font-weight:900}
  .ppt-lesson.pl-emphasis .pl-column-title{color:#5924a5;font-weight:900;border-bottom:2px solid #b89adf}
  .ppt-lesson.pl-emphasis .pl-point h3{color:#a44313;font-weight:900}
  .ppt-lesson.pl-emphasis .pl-point>span{color:#a44313;background:#fff1e6;border-radius:.4cqw;align-self:start;text-align:center}
  .ppt-lesson.pl-emphasis .pl-lead{color:#51465e}
  .ppt-lesson.pl-emphasis.active h2{animation:pl-focus-enter .65s ease-out both}
  .ppt-lesson.pl-emphasis.active h2:after{animation:pl-focus-line 2.8s ease-in-out infinite}
  .ppt-lesson.pl-emphasis.active .pl-column-title,.ppt-lesson.pl-emphasis.active .pl-application-grid article,.ppt-lesson.pl-emphasis.active .pl-method-grid article,.ppt-lesson.pl-emphasis.active .pl-point{animation:pl-focus-enter .65s ease-out both;animation-delay:.15s}
  .ppt-lesson.pl-emphasis.active article:nth-child(2),.ppt-lesson.pl-emphasis.active .pl-point:nth-child(3){animation-delay:.3s}
  .ppt-lesson.pl-emphasis.active article:nth-child(3),.ppt-lesson.pl-emphasis.active .pl-point:nth-child(4){animation-delay:.45s}
  .ppt-lesson.pl-emphasis.active article:nth-child(4){animation-delay:.6s}
  @keyframes pl-focus-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pl-focus-line{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.7)}}
  @media(prefers-reduced-motion:reduce){.ppt-lesson.pl-emphasis.active *,.ppt-lesson.pl-emphasis.active h2:after{animation:none!important}}
  @media print{.ppt-lesson.pl-emphasis *,.ppt-lesson.pl-emphasis h2:after{animation:none!important;opacity:1!important;transform:none!important}}
  `;
  document.head.appendChild(style);
  for(const page of pages){
    const node=deck.querySelector('[data-vm-slide-id="'+page.id+'"]');
    if(!node)throw new Error('PPT lesson missing target: '+page.id);
    if(page.kind==='opening'){
      node.dataset.label=page.title;
      node.querySelector('.dso-description').innerHTML='把想說的內容，<br>整理成一份簡報。';
      model.slides.find(s=>s.id===page.id).label=page.title;
      continue;
    }
    node.className='slide ppt-lesson pl-'+page.kind+(['applications','method','practice'].includes(page.kind)?' pl-emphasis':'');
    Object.assign(node.dataset,{vmLayout:'LOCAL-PPT-LESSON',label:page.title});
    node.innerHTML=`<div class="pl-page"><header><p class="pl-kicker">${page.kicker}</p>${page.kind==='opening'?'':`<h2>${page.title}</h2><p class="pl-lead">${page.lead}</p>`}</header><main class="pl-body">${page.body}</main><footer class="pl-footer"><span>${page.foot}</span>${page.link?`<a href="${page.link}" target="_blank" rel="noopener">${page.linkText} ↗</a>`:''}</footer></div>`;
    const data=model.slides.find(s=>s.id===page.id);Object.assign(data,{label:page.title,layout:'LOCAL-PPT-LESSON',dataLayout:'LOCAL-PPT-LESSON',props:{},media:{}});
  }
};
