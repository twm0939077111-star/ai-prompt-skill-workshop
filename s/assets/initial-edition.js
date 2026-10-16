(() => {
  if (window.__initialEditionMarked) return;
  window.__initialEditionMarked = true;
  document.documentElement.dataset.editionStatus = 'initial';
  const css = document.createElement('style');
  css.textContent = '#deck > .slide .initial-edition-note{position:absolute!important;left:50%!important;bottom:12px!important;transform:translateX(-50%)!important;font:400 12px/1.3 "Microsoft JhengHei",sans-serif!important;letter-spacing:.16em!important;color:#6d6381!important;z-index:40!important;pointer-events:none!important;margin:0!important;padding:0!important;}';
  document.head.append(css);
  function mark(){
    const cover=document.querySelector('#deck > .slide[data-vm-slide-id="theme01_page004-1"]')||document.querySelector('#deck > .slide');
    if(!cover||cover.querySelector('.initial-edition-note'))return;
    const note=document.createElement('span');note.className='initial-edition-note';note.textContent='初版';cover.append(note);
  }
  mark();
  const deck=document.getElementById('deck');
  if(deck)new MutationObserver(mark).observe(deck,{childList:true,subtree:true});
  else document.addEventListener('DOMContentLoaded',mark,{once:true});
})();
