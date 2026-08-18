const slides=[...document.querySelectorAll('.slide')];
const current=document.querySelector('#current');
const total=document.querySelector('#total');
const progress=document.querySelector('#progress');
let index=Math.max(0,Math.min(slides.length-1,(Number(new URLSearchParams(location.search).get('page'))||1)-1));
total.textContent=String(slides.length).padStart(2,'0');

function typeActive(){
  const el=slides[index].querySelector('.typed');
  if(!el||el.dataset.done)return;
  el.dataset.done='1'; const text=el.dataset.text; let n=0;
  const timer=setInterval(()=>{el.textContent=text.slice(0,++n);if(n>=text.length)clearInterval(timer)},70);
}
function show(next){
  index=(next+slides.length)%slides.length;
  slides.forEach((s,i)=>s.classList.toggle('active',i===index));
  current.textContent=String(index+1).padStart(2,'0');
  progress.style.width=`${((index+1)/slides.length)*100}%`;
  history.replaceState(null,'',`?page=${index+1}`);
  typeActive();
}
document.querySelector('#prev').onclick=()=>show(index-1);
document.querySelector('#next').onclick=()=>show(index+1);
addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key))show(index+1);if(['ArrowLeft','PageUp'].includes(e.key))show(index-1)});
let wheelLock=false;addEventListener('wheel',e=>{if(wheelLock)return;wheelLock=true;show(index+(e.deltaY>0?1:-1));setTimeout(()=>wheelLock=false,700)},{passive:true});
document.querySelector('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();

const range=document.querySelector('#compareRange');
range?.addEventListener('input',()=>{document.querySelector('#compareFront').style.width=`${range.value}%`;document.querySelector('#compareLine').style.left=`${range.value}%`});

const promptLines=[...document.querySelectorAll('.prompt-line')];let buildStep=1;
document.querySelector('#buildNext')?.addEventListener('click',e=>{
  if(buildStep<promptLines.length){promptLines[buildStep].classList.add('visible');buildStep++;document.querySelector('#builderCount').textContent=`${buildStep} / 4`;e.currentTarget.textContent=buildStep===4?'完整 Prompt 已組裝 ✓':'加入下一個條件 →'}else{promptLines.forEach((l,i)=>i&&l.classList.remove('visible'));buildStep=1;document.querySelector('#builderCount').textContent='1 / 4';e.currentTarget.textContent='加入下一個條件 →'}
});
show(index);
