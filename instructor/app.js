'use strict';
const root = document.documentElement;
root.classList.add('js');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches;
try { paused = reduced.matches || localStorage.getItem('qiu-tech-motion') === 'off'; } catch {}
const motionButton = document.querySelector('.motion-toggle');
function setMotion(value) {
  paused = value;
  root.dataset.motion = value ? 'off' : 'on';
  motionButton.setAttribute('aria-pressed', String(value));
  motionButton.setAttribute('aria-label', value ? '開啟動態效果' : '暫停動態效果');
  motionButton.title = value ? '開啟動態效果' : '暫停動態效果';
  motionButton.querySelector('.motion-icon').textContent = value ? '▷' : 'Ⅱ';
  motionButton.querySelector('.motion-label').textContent = value ? '動態暫停' : '動態開啟';
}
setMotion(paused);
motionButton.addEventListener('click', () => {
  setMotion(!paused);
  try { localStorage.setItem('qiu-tech-motion', paused ? 'off' : 'on'); } catch {}
});
reduced.addEventListener('change', event => { if (event.matches) setMotion(true); });

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu(returnFocus = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '開啟選單');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? '關閉選單' : '開啟選單');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

// A procedural wireframe is a conceptual visual, not a portfolio image or a live metric.
const sphere = document.getElementById('sphere-lines');
const svgNS = 'http://www.w3.org/2000/svg';
function project(x,y,z) {
  const tilt=.28, turn=.4;
  const a=x*Math.cos(turn)+z*Math.sin(turn), b=-x*Math.sin(turn)+z*Math.cos(turn);
  return [300+a,300+y*Math.cos(tilt)-b*Math.sin(tilt),y*Math.sin(tilt)+b*Math.cos(tilt)];
}
function addCurve(points, opacity) {
  const path=document.createElementNS(svgNS,'path');
  path.setAttribute('d',points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' '));
  path.setAttribute('fill','none'); path.setAttribute('stroke','#9ac8ff'); path.setAttribute('stroke-width','.7'); path.setAttribute('opacity',opacity);
  sphere.append(path);
}
for(let lat=-75;lat<=75;lat+=15){
  const a=lat*Math.PI/180, pts=[];
  for(let t=0;t<=120;t++){const b=t/120*Math.PI*2;pts.push(project(190*Math.cos(a)*Math.cos(b),190*Math.sin(a),190*Math.cos(a)*Math.sin(b)));}
  addCurve(pts,.15);
}
for(let lon=0;lon<180;lon+=15){
  const b=lon*Math.PI/180,pts=[];
  for(let t=0;t<=120;t++){const a=t/120*Math.PI*2;pts.push(project(190*Math.cos(a)*Math.cos(b),190*Math.sin(a),190*Math.cos(a)*Math.sin(b)));}
  addCurve(pts,.19);
}
const points=[[30,35],[-30,100],[60,190],[-15,260],[0,320],[45,120],[-45,40],[15,220]];
points.forEach(([a,b])=>{a*=Math.PI/180;b*=Math.PI/180;const p=project(190*Math.cos(a)*Math.cos(b),190*Math.sin(a),190*Math.cos(a)*Math.sin(b));const c=document.createElementNS(svgNS,'circle');c.setAttribute('cx',p[0]);c.setAttribute('cy',p[1]);c.setAttribute('r','2');c.setAttribute('fill','#d4eaff');c.setAttribute('opacity',p[2]>0?'.9':'.3');sphere.append(c);});

const topics = [
  {label:'PROMPT / VISUAL CREATION',title:'把模糊的想法，\n變成清楚的描述。',description:'練習交代主體、用途、風格、版型與限制，再透過觀察與修改，接近自己想要的結果。',prompt:'請幫我規劃一張新品飲料的社群廣告。先詢問目標客群、產品特色與品牌風格，再提出主標、視覺構圖和版面建議。',outcome:'練習成果：一段能持續修改的 Prompt'},
  {label:'INFORMATION / PRESENTATION',title:'讓資料有順序，\n讓重點被理解。',description:'從提供的內容整理摘要、簡報與資訊圖表，練習核對來源、選擇重點及安排敘事。',prompt:'請將我提供的資料整理成 5 頁簡報大綱。每頁包含一句主旨、3 個重點與建議圖表。只使用原始資料，缺少的數據標註「待確認」。',outcome:'練習成果：有邏輯、可核對的簡報大綱'},
  {label:'SKILL / REUSABLE WORKFLOW',title:'做好一次，\n把方法留下來。',description:'以工作週報等重複任務為例，把需求、步驟與輸出格式整理成可再次使用的工作方法。',prompt:'請根據我的工作筆記整理週報，分為「已完成」「進行中」「下週計畫」「待確認」。保留實際進度，不新增未提供的成果或完成日期。',outcome:'練習成果：能重複使用的週報整理流程'},
  {label:'INTERACTION / GAME REMIX',title:'從可玩的基底，\n做出自己的風格。',description:'以推箱子與第一人稱射擊的完整玩法為基底，練習改主題、角色、場景與介面。',prompt:'請保留現有推箱子的移動、推箱與過關規則，將主題改為太空補給站。重新設計角色、箱子、場景和介面，並檢查手機操作是否正常。',outcome:'練習成果：保留玩法、重新設計的遊戲版本'},
  {label:'PERSONAL BRAND / WEB EXPERIENCE',title:'把自己的經歷，\n變成清楚的形象。',description:'整理背景、能力與經歷，使用 Lovable 製作個人網站，練習描述版型並檢查手機閱讀。',prompt:'請依照我提供的真實經歷，建立個人介紹網站。包含專業定位、實務經歷與可合作項目。使用清楚的文字層級，支援手機，不新增未提供的資歷或個資。',outcome:'練習成果：可閱讀、可修改的個人介紹網站'}
];
const tabs=[...document.querySelectorAll('[role=tab]')];
let activeTopic=0;
const panel=document.getElementById('topic-panel');
function selectTopic(index, focus=false){
  activeTopic=index;
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  panel.setAttribute('aria-labelledby',tabs[index].id);
  const content=topics[index];
  document.getElementById('panel-label').textContent=content.label;
  document.getElementById('panel-title').textContent=content.title;
  document.getElementById('panel-title').style.whiteSpace='pre-line';
  document.getElementById('panel-description').textContent=content.description;
  document.getElementById('panel-prompt').textContent=content.prompt;
  document.getElementById('panel-outcome').textContent=content.outcome;
  document.getElementById('copy-feedback').textContent='';
  if(focus)tabs[index].focus();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectTopic(index));
  tab.addEventListener('keydown',event=>{
    let target=index;
    if(event.key==='ArrowDown'||event.key==='ArrowRight')target=(index+1)%tabs.length;
    else if(event.key==='ArrowUp'||event.key==='ArrowLeft')target=(index-1+tabs.length)%tabs.length;
    else if(event.key==='Home')target=0;
    else if(event.key==='End')target=tabs.length-1;
    else return;
    event.preventDefault();selectTopic(target,true);
  });
});
document.getElementById('copy-prompt').addEventListener('click',async()=>{
  const text=topics[activeTopic].prompt;
  const status=document.getElementById('copy-feedback');
  try{
    if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);status.textContent='範例已複製，可以貼到你的 AI 工具。';
  }catch{
    const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(document.getElementById('panel-prompt'));selection.removeAllRanges();selection.addRange(range);status.textContent='請長按選取文字，或按 Ctrl / Command + C 複製。';
  }
});

const revealTargets=document.querySelectorAll('.section-top,.section-intro,.capability-heading,.capability-grid,.ai-heading,.learning-workspace,.about-layout,.tech-profile-layout,.closing .shell');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  revealTargets.forEach(el=>{el.classList.add('reveal');observer.observe(el);});
  const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>{const current=a.hash==='#'+entry.target.id;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px',threshold:0});
  document.querySelectorAll('main>section[id]').forEach(el=>sectionObserver.observe(el));
}
window.addEventListener('pagehide',()=>{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));});

// Direct navigation skips the long pinned scenes; wheel/touch scrolling stays native.
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const hash = link.getAttribute('href');
  const target = hash && document.getElementById(hash.slice(1));
  if (!target) return;
  event.preventDefault();
  if (location.hash !== hash) history.pushState(null, '', hash);
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
}));
