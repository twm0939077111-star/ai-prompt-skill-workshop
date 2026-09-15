// Export from the source document, never from already-initialized slide markup.
(() => {
 let chosenFiles=null;
 function clean(p){return decodeURIComponent(p.split(/[?#]/)[0]).replace(/^\.\//,'').replace(/^\//,'');}
 async function chooseFolder(){
  return new Promise((resolve,reject)=>{
   const dialog=document.createElement('dialog');dialog.style.cssText='padding:28px;max-width:540px;border:0;border-radius:16px;font:16px/1.7 Microsoft JhengHei,sans-serif';
   dialog.innerHTML='<h2 style="margin-top:0">打包離線簡報</h2><p>請選取這份簡報的 <b>current-site</b> 資料夾，讓瀏覽器讀取 index.html 與 assets。檔案只在本機打包，不會上傳。</p><input type="file" webkitdirectory multiple aria-label="選擇簡報資料夾"><p role="status"></p><button type="button">取消</button>';
   const input=dialog.querySelector('input'),status=dialog.querySelector('[role=status]');document.body.append(dialog);dialog.showModal();
   const cancel=()=>{dialog.close();dialog.remove();reject(new Error('已取消HTML匯出'));};dialog.querySelector('button').onclick=cancel;dialog.addEventListener('cancel',e=>{e.preventDefault();cancel()});
   input.onchange=()=>{const files=[...input.files],map=new Map();for(const f of files){const parts=f.webkitRelativePath.split('/');parts.shift();map.set(parts.join('/'),f);}if(!map.has('index.html')||!map.has(['assets','deck-classroom-motion.js'].join('/'))){status.textContent='請選取包含 index.html 與 assets 的 current-site 資料夾。';return;}chosenFiles=map;dialog.close();dialog.remove();resolve();};
  });
 }
 async function read(p){const key=clean(p);if(chosenFiles){const f=chosenFiles.get(key);if(!f)throw Error('匯出缺少檔案：'+key);return f;}const response=await fetch(p,{cache:'no-store'});if(!response.ok)throw Error('無法讀取匯出資源：'+p);return response.blob();}
 const data=blob=>new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(blob)});
 function resolveRelative(ref,base){return clean(new URL(ref,new URL(base,location.href)).pathname.replace(new URL('.',location.href).pathname,''));}
 async function css(text,base){
  const matches=[...text.matchAll(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g)];for(const m of matches){if(/^(data:|https?:|#|blob:)/i.test(m[2]))continue;const url=await data(await read(resolveRelative(m[2],base)));text=text.split(m[0]).join('url("'+url+'")');}return text;
 }
 window.__readDeckExportAsset=read;
 window.__packDeckExportResource=async(path)=>{
  if(!/\.html?(?:[?#]|$)/i.test(path)){const blob=await read(path);return /\.md(?:[?#]|$)/i.test(path)?new Blob([blob],{type:'text/plain;charset=utf-8'}):blob;}
  const doc=new DOMParser().parseFromString(await(await read(path)).text(),'text/html');
  for(const link of [...doc.querySelectorAll('link[rel="stylesheet"]')]){const href=link.getAttribute('href');if(/^(https?:|data:)/.test(href))continue;const file=resolveRelative(href,path),style=doc.createElement('style');style.textContent=await css(await(await read(file)).text(),file);link.replaceWith(style);}
  for(const script of [...doc.querySelectorAll('script[src]')]){const src=script.getAttribute('src');if(/^(https?:|data:)/.test(src))continue;script.textContent=(await(await read(resolveRelative(src,path))).text()).replace(/<\/script/gi,'<\\/script');script.removeAttribute('src');}
  for(const image of doc.querySelectorAll('img[src]')){const src=image.getAttribute('src');if(!/^(https?:|data:)/.test(src))image.src=await data(await read(resolveRelative(src,path)));}
  return new Blob(['<!DOCTYPE html>'+doc.documentElement.outerHTML],{type:'text/html;charset=utf-8'});
 };
 window.__prepareCleanDeckExport=async(visibleSlides)=>{
  if(location.protocol==='file:'&&!chosenFiles)await chooseFolder();
  const source=await (await read('index.html')).text();const doc=new DOMParser().parseFromString(source,'text/html');
  const offlineLinks=doc.createElement('script');offlineLinks.textContent=`document.addEventListener('click',e=>{const a=e.target.closest('a[href^="data:"]');if(!a||a.hasAttribute('download'))return;e.preventDefault();const href=a.getAttribute('href'),raw=href.split('#')[0],parts=raw.split(','),type=parts[0].slice(5).split(';')[0],bytes=Uint8Array.from(atob(parts[1]),c=>c.charCodeAt(0));const url=URL.createObjectURL(new Blob([bytes],{type}));window.open(url+(href.includes('#')?'#'+href.split('#')[1]:''),'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(url),60000);});`;doc.head.append(offlineLinks);
  // Use canonical construction order, then apply the current order and edited state.
  const live=window.__deckViewModel.model,ids=visibleSlides.map(s=>s.dataset.vmSlideId),snapshot={...live,exportId:'offline-'+Date.now(),slides:live.slides.filter(s=>ids.includes(s.id)),state:{...live.state,slideOrder:ids,skippedSlides:[],deletedSlides:[]}};
  const marker=doc.querySelector('#embedded-text-state');if(!marker)throw Error('原稿缺少匯出還原位置');
  marker.textContent=JSON.stringify(live.state.text||{}).replace(/</g,'\\u003c');
  const restore=doc.createElement('script');restore.textContent=`(()=>{const model=${JSON.stringify(snapshot).replace(/</g,'\\u003c')};const deck=document.getElementById('deck');const order=model.state.slideOrder;deck.querySelectorAll(':scope > .slide').forEach(s=>{if(!order.includes(s.dataset.vmSlideId))s.remove()});for(const id of order){const s=[...deck.children].find(s=>s.dataset.vmSlideId===id);if(s)deck.append(s)}document.getElementById('deck-view-model').textContent=JSON.stringify(model)})();`;marker.after(restore);
  for(const link of [...doc.querySelectorAll('link[rel="stylesheet"]')]){const href=link.getAttribute('href');if(!href||/^(https?:|data:)/.test(href))continue;const style=doc.createElement('style');style.textContent=await css(await(await read(href)).text(),href);link.replaceWith(style);}
  for(const script of [...doc.querySelectorAll('script[src]')]){const src=script.getAttribute('src');if(!src||/^(https?:|data:)/.test(src))continue;script.textContent=(await(await read(src)).text()).replace(/<\/script/gi,'<\\/script');script.removeAttribute('src');}
  for(const style of doc.querySelectorAll('style'))style.textContent=await css(style.textContent,'index.html');
  const opts=doc.querySelector('#preview-options');if(opts){const v=JSON.parse(opts.textContent);v.current={...v.current,...window.__getPreviewState?.()};opts.textContent=JSON.stringify(v).replace(/</g,'\\u003c');}
  return doc.documentElement;
 };
})();
