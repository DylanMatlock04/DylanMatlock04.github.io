const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
const revealItems = document.querySelectorAll('.section, .case-section, .feature-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.05 });
  revealItems.forEach(item => { item.classList.add('reveal'); observer.observe(item); });
}

// Technical image inspector; Escape closes the native dialog.
(() => {
 const targets = [...document.querySelectorAll('.case-content figure img, .case-hero > img, .hero-display img, .feature-visual img')];
 if (!targets.length || !('HTMLDialogElement' in window)) return;
 const dialog = document.createElement('dialog'); dialog.className='image-lightbox';
 dialog.innerHTML='<div class="lightbox-top"><span id="lightbox-title">Engineering image</span><button class="lightbox-close" type="button" aria-label="Close enlarged image">CLOSE ×</button></div><img alt="">';
 document.body.append(dialog);
 const preview=dialog.querySelector('img');
 const title=dialog.querySelector('#lightbox-title');
 const close=dialog.querySelector('button');
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close()});
 for(const img of targets){
  img.setAttribute('tabindex','0');img.setAttribute('role','button');img.setAttribute('aria-label',`${img.alt || 'Project image'} — click to enlarge`);
  const open=()=>{preview.src=img.currentSrc || img.src;preview.alt=img.alt;title.textContent=img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || 'Engineering image';dialog.showModal()};
  img.addEventListener('click',open);
  img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
 }
})();
