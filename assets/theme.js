/* THEMES: the 23 hybrid-jammin colour ways (native/Source/Fonts.h), applied as CSS variables. Top-right button, remembered per browser. */
(function(){
  const T=[ /* name, glyph, bg, stage, hover, line, muted, fg, accent, light */
    ['LIGHT','☀','#ffffff','#f4f4f4','#eeeeee','#d0d0d0','#8a8a8a','#000000','#ff7a00',1],
    ['DARK','☾','#141414','#1e1e1e','#262626','#3a3a3a','#8a8a8a','#eeeeee','#ff7a00',0],
    ['ROYAL','✦','#14143a','#1c1c4c','#262660','#34347a','#8f8fc4','#f0f0ff','#ffd23f',0],
    ['PINK','♥','#ff2d88','#ffc1dc','#ff5fa3','#ffffff','#ffe6f0','#ffffff','#ff7a00',0],
    ['BLACK','●','#000000','#0e0e0e','#1a1a1a','#333333','#9a9a9a','#ffffff','#8a46ff',0],
    ['GRAY','◐','#4a4a4a','#5c5c5c','#6a6a6a','#7a7a7a','#cfcfcf','#ffffff','#ff7a00',0],
    ['BABY BLUE','❄','#89cff0','#a8dcff','#9ad4ff','#ffffff','#3b5f7a','#0b2239','#ff7a00',1],
    ['YELLOW','✹','#c9a400','#e0b800','#d9b400','#5a4a00','#3a3000','#000000','#ff7a00',1],
    ['CREAM','◇','#fbf6ea','#f2ecdc','#ebe3cf','#d9d0bb','#8f8878','#1a1a1a','#ff6a00',1],
    ['FOREST','☘','#0f1f17','#16291f','#1f3629','#2b4536','#7c9a89','#e8f3ec','#5ee8a0',0],
    ['TERMINAL','▮','#000000','#0a0f0a','#142014','#1f3320','#5a8a5c','#9dff9d','#33ff66',0],
    ['NIGHT BLUE','◆','#0b1220','#111b2e','#19273f','#233553','#6f83a8','#e6eefc','#3cc9ff',0],
    ['PLUM','✿','#1e1023','#2a1731','#3a2143','#4a2c56','#9b7da8','#f5e9f8','#ff5fa2',0],
    ['SAND','▲','#e9dcc6','#e0d1b6','#d6c5a8','#c6b596','#8a7a5e','#2b2116','#0f8b8d',1],
    ['CHERRY','♦','#2a0b10','#3a1118','#4b1821','#5c1f2a','#b07a86','#ffe9ee','#ff4d6d',0],
    ['OLIVE','✱','#2b2e1d','#363a25','#464a30','#565b3c','#a0a67f','#f2f3e6','#ff7a1a',0],
    ['MIDNIGHT GOLD','★','#050505','#0f0e0a','#1c1a11','#2a2718','#8d8360','#f3ecd2','#d4af37',0],
    ['LAVENDER','❀','#f1eefb','#e8e3f7','#dcd5f0','#cbc2e8','#8a80ad','#241c45','#7a4dff',1],
    ['COAL LIME','◉','#121212','#191919','#242424','#303030','#8a8a8a','#f0f0f0','#c8ff00',0],
    ['OCEAN','≈','#06323a','#0a3f48','#134d57','#1c5c66','#79a9b0','#e9f7f8','#f2c14e',0],
    ['CANDY','✚','#dff7ec','#d2f0e3','#c2e6d6','#a9dcc6','#5f8f7a','#1f3a30','#ff2e88',1],
    ['RUST','▼','#2b1b12','#382419','#493022','#5b3d2b','#b28b74','#f7ece4','#ff8a3d',0],
    ['MOSS PINK','♫','#1f2a22','#28352c','#35453a','#43554a','#93a597','#eef4ef','#ff9bc4',0]];
  const root=document.documentElement;
  function apply(i,save){
    const t=T[i]; const st=root.style;
    st.setProperty('--t-bg',t[2]); st.setProperty('--t-stage',t[3]); st.setProperty('--t-hover',t[4]); st.setProperty('--t-line',t[5]);
    st.setProperty('--t-muted',t[6]); st.setProperty('--t-fg',t[7]); st.setProperty('--t-acc',t[8]);
    root.setAttribute('data-theme',t[0].toLowerCase().replace(/ /g,'-')); root.classList.toggle('t-dark',!t[9]); root.classList.add('themed');
    document.querySelectorAll('.theme-item').forEach((b,k)=>b.classList.toggle('on',k===i));
    curI=i; document.querySelectorAll('.theme-btn .g,.theme-tip .g').forEach(g=>g.textContent=t[1]);
    if(save){ try{ localStorage.setItem('jw-theme',String(i)); }catch(e){} }
  }
  const btn=document.createElement('button'); btn.className='theme-btn'; btn.setAttribute('aria-label','Theme'); btn.setAttribute('aria-expanded','false');
  btn.innerHTML='<span class="g">☀</span>';
  const panel=document.createElement('div'); panel.className='theme-panel'; panel.hidden=true; panel.setAttribute('role','menu');
  panel.innerHTML='<div class="theme-head">THEME</div><div class="theme-grid">'+T.map((t,i)=>'<button class="theme-item" role="menuitem" data-i="'+i+'" style="--sb:'+t[2]+';--sf:'+t[7]+';--sa:'+t[8]+'"><span class="sw"><i></i></span><span class="nm">'+t[0]+'</span></button>').join('')+'</div>';
  const tip=document.createElement('div'); tip.className='theme-tip'; tip.setAttribute('role','note');
  tip.innerHTML='hold <kbd>SHIFT</kbd> and press <span class="ti"><span class="g">☀</span></span> to cycle themes';
  document.body.appendChild(btn); document.body.appendChild(panel); document.body.appendChild(tip);
  let tipT=null; function tipShow(){ if(!panel.hidden) return; clearTimeout(tipT); tipT=setTimeout(()=>tip.classList.add('show'),380); }
  function tipHide(){ clearTimeout(tipT); tip.classList.remove('show'); }
  btn.addEventListener('pointerenter',tipShow); btn.addEventListener('pointerleave',tipHide); btn.addEventListener('focus',tipShow); btn.addEventListener('blur',tipHide);
  let curI=0; function cycle(d){ apply((curI+d+T.length)%T.length,true); }
  function open(o){ panel.hidden=!o; btn.setAttribute('aria-expanded',o?'true':'false'); btn.classList.toggle('open',o); }
  btn.addEventListener('click',e=>{ if(e.shiftKey){ cycle(1); return; } tipHide(); open(panel.hidden); });
  document.addEventListener('keydown',e=>{ if(e.shiftKey&&(e.key==='T'||e.key==='t')&&!/^(input|textarea|select)$/i.test(document.activeElement.tagName)){ e.preventDefault(); cycle(1); } });
  panel.addEventListener('click',e=>{ const b=e.target.closest('.theme-item'); if(!b) return; apply(+b.dataset.i,true); open(false); });
  document.addEventListener('click',e=>{ if(!panel.hidden && !panel.contains(e.target) && e.target!==btn && !btn.contains(e.target)) open(false); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape' && !panel.hidden) open(false); });
  let saved=0; try{ saved=parseInt(localStorage.getItem('jw-theme')||'0',10)||0; }catch(e){}
  const q=new URLSearchParams(location.search).get('theme'); if(q!==null){ const qi=T.findIndex(t=>t[0].toLowerCase().replace(/ /g,'-')===q.toLowerCase()); if(qi>=0) saved=qi; else if(!isNaN(+q)) saved=+q; }
  apply(Math.min(T.length-1,Math.max(0,saved)),false);
  if(new URLSearchParams(location.search).get('tip')==='1') tip.classList.add('show');
})();
