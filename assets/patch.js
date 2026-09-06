/* PROCESS RACK v4: one fixed-width rack (24 columns, always full), modules of different widths, every module a REAL artifact of that
   project with its file:line. The project itself loads below. Cables = Eurorack Grid cables, ported verbatim from ~/modular-lab/case/app.js. */
(function(){
  const rack=document.getElementById('workflowPatch'), note=document.getElementById('patchNote'), titleEl=document.getElementById('patchTitle'), stage=document.getElementById('patchStage'); if(!rack||!note||!titleEl||!stage) return;

  /* ---------- projects. mods: [title, span(of 24), kind, content, source, note]. kinds: cmd, code, list, num, text ---------- */
  const P=[
   {name:'PATCH ASSISTANT', term:[['c','python3 test_validate.py'],['ok','ok  simple voice to out is valid'],['ok','ok  unknown archetype'],['ok','ok  no OUT'],['ok','ok  nothing into out'],['ok','ok  input to input'],['ok','ok  bad jack name'],['ok','ok  two cables one input'],['ok','ok  audio into pitch is useless'],['ok','ok  over HP'],['ok','ok  unknown brand'],['hi','10/10 passed'],['c','wc -l assistant.py validate.py test_validate.py'],['o','  118 assistant.py'],['o','   81 validate.py'],['o','   34 test_validate.py'],['o','  233 total'],['c','python3 -c "import json;c=json.load(open(\'catalog.json\'));print(len(c[\'archetypes\']),len(c[\'brands\']))"'],['o','72 87'],['c','grep -n LAST_VALID assistant.py'],['o','21:LAST_VALID = {}   # the validator stores the last patch it accepted; the CLI saves that, not model prose']], q:'Describe a sound, get a working patch.', load:{kind:'page',src:'demo-patch-assistant.html',label:'demo-patch-assistant.html'},
    mods:[
     ['PROMPT',5,'cmd','assistant.py -v "slow drone with a filter that breathes" --save patches/drone.json','README.md:30','The whole input is a sentence. The CLI hands it to a tool-use loop.'],
     ['TOOLS',5,'list',['list_modules(role)','describe_module(archetype)','validate_patch(patch_json)','@beta_tool, all three'],'assistant.py:25-52','Three tools. The model asks the catalog what exists and must call validate_patch before it answers.'],
     ['CATALOG',4,'num',[['71','archetypes'],['87','brands'],['19','jacks inferred']],'catalog.json','Generated from Eurorack Grid. Nineteen archetypes share jack arrays defined elsewhere, and the README says so.'],
     ['COMPAT',5,'code','COMPAT = {("audio","audio"), ("audio","cv"),\n  ("cv","cv"), ("cv","pitch"), ("cv","audio"),\n  ("pitch","pitch"), ("pitch","cv"),\n  ("gate","gate"), ("gate","cv")}','validate.py:7-9','What kind of output may feed what kind of input. Pure Python, no API. This is the tool that says no.'],
     ['VALIDATOR',5,'list',['no OUT','input to input','bad jack name','two cables one input','over HP','unknown brand','10 / 10 passed'],'test_validate.py:12-25','Ten cases in a table. Errors are written for the model to read, and only a patch that passed is saved. Model prose never reaches disk.']],
    x:{1:['in','ERRORS'],4:['out','FAIL']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x4','x1']], home:''},
   {name:'SAFETENSORS-CHECK', term:[['c','python3 check.py fixtures/'],['bad','  ERROR      garbage.safetensors  header length 8029109312199880558 does not fit in file'],['bad','  TRAILING   trailing.safetensors  delta 7B'],['bad','  TRUNCATED  truncated.safetensors  delta -10B'],['ok','  ok         valid.safetensors  (1 tensors, F16)'],['hi','4 checked, 3 bad'],['c','echo $?'],['o','1'],['c','python3 check.py --json fixtures/valid.safetensors'],['o','{"file": "fixtures/valid.safetensors", "size": 139, "status": "ok", "expected": 139, "delta": 0, "tensors": 1, "dtypes": ["F16"]}'],['c','wc -l check.py'],['o','104 check.py'],['c','grep -n MAX_HEADER check.py | head -1'],['o','19:MAX_HEADER = 256 * 1024 * 1024  # anything bigger than 256MB is not a real header']], q:'Which model file is actually broken?', load:{kind:'page',src:'demo-safetensors-check.html',label:'demo-safetensors-check.html'},
    mods:[
     ['THE ERROR',6,'text','Error while deserializing header: incomplete metadata, file not fully covered','README.md:11','The loader reports the error against whichever file it was busy with, not the one that is broken. So: never trust the filename in that error. Check every file.'],
     ['HEADER',5,'code','raw = fh.read(8)\nn = struct.unpack("<Q", raw)[0]\nhdr = json.loads(fh.read(n))','check.py:25-33','Eight bytes of length, then a JSON table of tensors. Anything over 256MB is not a real header.'],
     ['DELTA',5,'code','expected = 8 + n + end\ndelta = size - expected\n"ok" if delta == 0 else\n  "truncated" if delta < 0 else "trailing"','check.py:43-49','Claimed bytes versus real bytes. The delta must be zero. Exit code is 0 only if every file passed, so it drops into a cron job as a gate.'],
     ['FIXTURES',4,'list',['ERROR  garbage','TRAILING  +7B','TRUNCATED  -10B','ok  valid  F16','4 checked, 3 bad'],'fixtures/','Four hand-built files. Real output of python3 check.py fixtures/.'],
     ['SWEEP',4,'list',['102 files','2 bad','scifi-90s-anime-zit','  truncated 25.9MB','90s_anime_aesthetic','  43MB trailing'],'README.md:46-55','My library. Two bad files, neither the one the loader blamed. 104 lines, stdlib only.']],
    x:{2:['out','EXIT 1']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x2','in0']], home:''},
   {name:'AI USE-CASE SCREENER', term:[['c','ls cases/'],['o','generative-art-store.md  meeting-notes.md  preset-namer.md'],['o','refund-chatbot.md  resume-ranker.md  symptom-triage-sms.md'],['c','grep -h expected_ cases/*.md'],['o','expected_tier: medium   expected_decision: go_with_controls'],['o','expected_tier: low      expected_decision: go'],['o','expected_tier: low      expected_decision: go'],['o','expected_tier: high     expected_decision: go_with_controls'],['o','expected_tier: high     expected_decision: needs_review'],['bad','expected_tier: high     expected_decision: no_go'],['c','grep -n "Literal\\[" screen.py'],['o','24:RiskTier = Literal["low", "medium", "high", "unacceptable"]'],['o','25:Decision = Literal["go", "go_with_controls", "needs_review", "no_go"]'],['c','python3 eval.py --saved'],['hi','runs/ is empty. Set ANTHROPIC_API_KEY and run python3 eval.py to score live.']], q:'Should AI touch this? Who stays in charge?', load:{kind:'page',src:'demo-ai-use-case-screener.html',label:'demo-ai-use-case-screener.html'},
    mods:[
     ['INTAKE',4,'cmd','screen.py cases/refund-chatbot.md','README.md:20','A use case in plain words. The model must return the memo shape, or refuse.'],
     ['SCHEMA',6,'list',['use_case_summary','affected_parties','decision_rights','harms[]  risk_tier','required_controls[]','human_oversight','disclosure_required','decision  open_questions'],'screen.py:43-55','Twelve fields, Pydantic. owner_role is a job role accountable for it, not a person.'],
     ['TIERS',5,'code','RiskTier = Literal["low","medium",\n  "high","unacceptable"]\nDecision = Literal["go",\n  "go_with_controls",\n  "needs_review","no_go"]','screen.py:24-26','High means money, health, employment, housing, legal status or safety. Unacceptable means no controls fix it.'],
     ['CASES',5,'list',['refund chatbot  high','symptom triage  no_go','resume ranker  review','meeting notes  go','preset namer  go','my art store  medium'],'cases/*.md','Six cases with my expected answers. They are my judgment, not ground truth. Enough to catch gross errors.'],
     ['EVAL',4,'code','adjacent = abs(TIERS.index(got)\n  - TIERS.index(exp)) <= 1\n"tier off by one"','eval.py:51-54','Medium versus high is a conversation. Low versus high is a bug. Not run live yet: runs/ is empty until a key is set.']],
    x:{1:['in','PROMPT']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out4','x1']], home:''},
   {name:'STUDIO PLANTS', term:[['c','ls public/plants | wc -l'],['hi','135'],['c','grep -n captureStream src/lib/audioPulse.js'],['o','30:// the music dies with it (2026-09-01). captureStream() is a tap: the'],['c','grep -n "fftSize\\|smoothingTimeConstant" src/lib/audioPulse.js'],['o','39:  an.fftSize = 256'],['o','40:  an.smoothingTimeConstant = 0.7'],['c','grep -n "% 135" functions/api/artists.js'],['o','78: plant: existing?.plant ?? (1 + [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 135),'],['c','grep -n dreamshaper8 ~/Documents/plants_r2/batch_generate.py'],['o','32:  "ckpt_name": "dreamshaper8.safetensors"'],['c','sips -s format webp plant_041.png --out plant_041.webp'],['ok','plant_041.webp']], q:'A plant per member, dancing to the site.', load:{kind:'page',src:'demo-studio-plants.html',label:'demo-studio-plants.html'},
    mods:[
     ['PROMPT',7,'text','{plant_name} plant, full view, stem clearly visible and ending flat at the bottom, anime cel-shaded, bold dark green-black outline, flat 2-3 tone shading only, no pot, no dirt, white background','plants_r2/batch_generate.py:49','One prompt, a plant name slotted in. Negative prompt bans glow, gradients, pots and soil.'],
     ['MODEL',4,'list',['dreamshaper8','ip-adapter_sd15','plants_lora_v1','  500 steps · 106 imgs'],'plants_r2/*.json','A base checkpoint locked with an IP adapter, then a LoRA trained on my own output to hold the style.'],
     ['SWAY',6,'code','.dp{--s:calc(sin((var(--t)*(0.9+var(--i)*0.05)\n  + var(--i)*1.7)*1rad) * var(--amp) * 1.25\n  * (0.55 + 0.45*var(--beat)) * var(--on))}\ntransform-origin:50% 97%','DancingPlant.css:10-11','A sine on the site clock, per-plant phase, scaled by beat energy. The whole image tilts from the pot.'],
     ['BEAT',4,'code','// NEVER reroute playback through\n// WebAudio. captureStream() is a tap.\nan.fftSize = 256','audioPulse.js:27-41','iOS kills a rerouted context on screen lock. The analyser only listens to a copy. No music, no motion.'],
     ['GROW',3,'code','stageOf = min(3,\n floor((now - at) / DAY))\nplant = hash(slug) % 135','plantStage.js:7-13','Seed, sprout, sapling over three days. Day four plays the grow-out once. 135 plants, assigned by a hash of the slug.']],
    x:{2:['in','AUDIO']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out3','x2']], home:''},
   {name:'JAMNUTZ HARDWARE', term:[['c','grep -n "requestMIDIAccess(" src/lib/midi/midiAccess.js'],['o','22:    const access = await navigator.requestMIDIAccess({ sysex: false })'],['c','grep -n "CHANNEL_TO_SLOT =" src/pages/Hardware.jsx'],['o','95:const CHANNEL_TO_SLOT = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 0 }'],['c','grep -n "CC_NAMED =" src/pages/Hardware.jsx'],['o','133:const CC_NAMED = { 74: \'flt\', 71: \'q\', 73: \'atk\', 75: \'dcy\', 72: \'rel\' }'],['c','grep -n "AUTO_VOICES =" src/pages/Hardware.jsx'],['o','123:const AUTO_VOICES = [null, \'pluck\', \'bell\', \'pad\', \'fm\', \'chip\', \'gboy\', \'organ\', \'pluck\', \'bell\']'],['c','wc -l src/pages/Hardware.jsx'],['o','1442 src/pages/Hardware.jsx'],['c','grep -n "MIDI IN  waiting" src/pages/Hardware.jsx'],['hi','681: MIDI IN  waiting for a note from ...']], q:'Hardware sequencer, browser sound module.', load:{kind:'img',src:'images/results/jamnutz-hardware.png',label:'jamnutz.com/hardware (screenshot, the site refuses framing)',href:'https://jamnutz.com/hardware'},
    mods:[
     ['MIDI IN',4,'code','navigator.requestMIDIAccess(\n  { sysex: false })','midiAccess.js:22','Web MIDI, no sysex. Chrome, Edge, Firefox 108+, Safari 18+.'],
     ['CHANNELS',4,'code','CHANNEL_TO_SLOT = {\n 0:1, 1:2, 2:3, 3:4, 4:5,\n 5:6, 6:7, 7:8, 8:9, 9:0 }','Hardware.jsx:95','Channels 1 to 9 are melodic slots. Channel 10 is the drum kit, GM convention.'],
     ['DRUM LANES',5,'list',['36 kick','38 snare  39 clap','41 43 45 low toms','42 44 hat  46 open','56 cowbell','else (note-36) % 8'],'Hardware.jsx:97-116','GM drum notes to the eight lanes. Before 2026-09-06 every note went through one pitched tom.'],
     ['CC MAP',6,'code','CC_NAMED = { 74:\'flt\', 71:\'q\',\n  73:\'atk\', 75:\'dcy\', 72:\'rel\' }\nCC 70-77 → macros in order\nCC 16-23 → macros in order\nCC 1 → macro 1   CC 7 → volume','Hardware.jsx:125-142','Named CCs win when the voice has that key. Two ranges hit the macro strip in order so most boxes work untouched.'],
     ['AUTO',5,'code','AUTO_VOICES = [null,\'pluck\',\'bell\',\n \'pad\',\'fm\',\'chip\',\'gboy\',\n \'organ\',\'pluck\',\'bell\']\n// empty slot, first note: populate','Hardware.jsx:119-123','Plug in a sequencer, press play, every track is sounding before you touch anything. The on-page monitor shows what the box actually sent.']],
    x:{3:['in','CC']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out0','x3']], home:''},
   {name:'EURORACK GRID', term:[['c','wc -l case/app.js case/style.css shared/engine.js'],['o','    7510 case/app.js'],['o','    3360 case/style.css'],['o','    5165 shared/engine.js'],['c','grep -c createGain shared/engine.js'],['o','283'],['c','grep -c createOscillator shared/engine.js'],['o','45'],['c','grep -c \'"arch"\' case/layoutlock.js'],['hi','457'],['c','git log --oneline | wc -l'],['o','184'],['c','ls case/toi-*.gen.js | wc -l'],['o','65'],['c','wrangler pages deploy dist --project-name=eurorackgrid --branch=main'],['ok','✨ Deployment complete! https://eurorackgrid.pages.dev']], q:'A modular synth in a browser tab.', load:{kind:'page',src:'https://eurorackgrid.pages.dev/',label:'eurorackgrid.pages.dev, live',href:'https://eurorackgrid.pages.dev/'},
    mods:[
     ['SCALE',4,'num',[['7,510','lines app.js'],['5,165','lines engine.js'],['457','modules'],['184','commits']],'wc -l · git log','The case, the engine, and every module pinned in layoutlock.js.'],
     ['CONTRACT',6,'code','create(ctx, emit) -> api {\n  ins, outs, setParam,\n  setChoice?, dispose }\nins: { node: AudioNode }\n  or { event: fn(value) }','engine.js:136-142','Every module is a closure returning the same shape. Instantiated in exactly one place in the case.'],
     ['NODES',4,'list',['createGain  283','createOscillator  45','createBiquadFilter  26','createDelay  17','createAnalyser  11'],'engine.js','The DSP is quarantined in the engine. The case file itself makes three gains and two analysers.'],
     ['CABLE',5,'code','function drawCable(x1, y1, x2, y2,\n  sag, color, level, flash,\n  t, seat, seatB)','app.js:4349','The cables on this page. Four stroke passes, a moulded boot, a spring on the sag. Never shadowBlur.'],
     ['NEVER SILENT',5,'text','after a template builds, sample the master output for ~1.8s. If it stays effectively silent, quietly re-roll a different template.','app.js:5898-5904','Validation by listening to its own output. A headless-Chrome hook (?audiocheck) measures real audio in QA.']],
    x:{1:['in','RE-ROLL']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out4','x1']], home:''}];
  let pi=0, PR=P[0];

  /* ---------- build ---------- */
  const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const jack=(id,dir,label)=>'<span class="jackbox"><span class="jack-label'+(label?'':' empty')+'">'+(label||'&nbsp;')+'</span><span class="jack" data-j="'+id+'" data-dir="'+dir+'" data-m="'+id.replace(/\D/g,'')+'" role="button" tabindex="0" aria-label="'+(dir==='in'?'Input':'Output')+' jack '+id+'"></span></span>';
  const card={
    cmd:v=>'<pre class="cmd"><span class="ps">$ </span>'+esc(v)+'</pre>',
    code:v=>'<pre class="code">'+esc(v)+'</pre>',
    list:v=>'<ul class="lst">'+v.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>',
    num:v=>'<div class="nums">'+v.map(x=>'<div class="n"><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span></div>').join('')+'</div>',
    text:v=>'<p class="txt">'+esc(v)+'</p>'};
  function build(pr){
    let h='';
    pr.mods.forEach((m,i)=>{ const x=pr.x&&pr.x[i];
      let jacks=jack('in'+i,'in',i===0?'IN':'IN'); if(x&&x[0]==='in') jacks+=jack('x'+i,'in',x[1]); jacks+=jack('out'+i,'out','OUT'); if(x&&x[0]==='out') jacks+=jack('x'+i,'out',x[1]);
      h+='<div class="mod" data-i="'+i+'" style="grid-column:span '+m[1]+'" role="button" tabindex="0" aria-label="'+esc(m[0])+'"><div class="mod-head"><span class="mod-led"></span><span class="mod-title">'+esc(m[0])+'</span><span class="mod-src">'+esc(m[4])+'</span></div><div class="mod-body">'+card[m[2]](m[3])+'</div><div class="jacks">'+jacks+'</div></div>'; });
    rack.querySelectorAll('.mod').forEach(m=>m.remove()); rack.insertAdjacentHTML('beforeend',h);
    mods=Array.from(rack.querySelectorAll('.mod')); posCache={}; W_=null;
  }
  const termEl=document.getElementById('termLines'), viewEl=document.getElementById('stageView'); let termRun=0;
  function loadStage(pr){ const L=pr.load; const open='<a class="st-open" href="'+(L.href||L.src)+'" target="_blank" rel="noreferrer">OPEN ↗</a>';
    stage.querySelector('.st-title').outerHTML='<span class="st-title"></span>';
    stage.querySelector('.st-head').innerHTML='<span class="dots"><i></i><i></i><i></i></span><span class="st-name">'+esc(pr.name)+'</span><span class="st-label">'+esc(L.label)+'</span>'+open;
    if(L.kind==='page') viewEl.innerHTML='<iframe src="'+L.src+'" title="'+esc(pr.name)+'" loading="lazy" referrerpolicy="no-referrer"></iframe>';
    else viewEl.innerHTML='<img src="'+L.src+'" alt="'+esc(pr.name)+'"/>';
    /* the terminal: real commands typed, real output printed, scrolling up, looping */
    const run=++termRun; const T=pr.term||[]; termEl.innerHTML=''; let i=0;
    function line(){ if(run!==termRun) return; if(i>=T.length){ setTimeout(()=>{ if(run!==termRun) return; termEl.innerHTML=''; i=0; line(); },5200); return; }
      const [k,txt]=T[i++]; const el=document.createElement('div'); el.className=k;
      if(k==='c'){ let c=0; el.innerHTML='<span class="cur"></span>'; termEl.appendChild(el); const tick=()=>{ if(run!==termRun) return; c++; el.innerHTML=esc(txt.slice(0,c))+'<span class="cur"></span>'; if(c<txt.length) setTimeout(tick,22); else { el.innerHTML=esc(txt); setTimeout(line,260); } }; tick(); }
      else { el.textContent=txt; termEl.appendChild(el); while(termEl.children.length>22) termEl.removeChild(termEl.firstChild); setTimeout(line,k==='hi'?900:110); } }
    line(); }
  let mods=[]; const J=id=>rack.querySelector('.jack[data-j="'+id+'"]');
  rack.innerHTML='<canvas class="cables" id="pCables" aria-hidden="true"></canvas>';

  /* ===== Eurorack Grid cable renderer (verbatim math) ===== */
  const CABLE_COLORS=['#ff5d8f','#ffb437','#3ecf8e','#4ea3ff','#b07aff','#ff7847'];
  const SPRING={sagBase:24,sagAmt:0.11,k:0.05,d:0.10,wobble:0.55};
  let colorIdx=0; const nextColor=()=>CABLE_COLORS[(colorIdx++)%CABLE_COLORS.length], peekColor=()=>CABLE_COLORS[colorIdx%CABLE_COLORS.length];
  const canvas=document.getElementById('pCables'), g=canvas.getContext('2d'); let DPR=1, W=0, H=0;
  function size(){ W_=1; DPR=Math.min(2,window.devicePixelRatio||1); const R=rack.getBoundingClientRect(); W=Math.round(R.width); H=Math.round(R.height)+170; canvas.width=W*DPR; canvas.height=H*DPR; canvas.style.width=W+'px'; canvas.style.height=H+'px'; canvas.style.left=(-rack.clientLeft)+'px'; canvas.style.top=(-rack.clientTop)+'px'; g.setTransform(DPR,0,0,DPR,0,0); posCache={}; }
  let posCache={};
  function jackPos(id){ if(posCache[id]) return posCache[id]; const el=J(id); if(!el) return null; const r=el.getBoundingClientRect(), R=rack.getBoundingClientRect(); return posCache[id]={x:r.left-R.left+r.width/2,y:r.top-R.top+r.height/2}; }
  function updateSpring(c,p1,p2){ const dist=Math.hypot(p2.x-p1.x,p2.y-p1.y); const target=SPRING.sagBase+dist*SPRING.sagAmt; const mid={x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2};
    if(c._mid) c.sagV+=(Math.abs(mid.x-c._mid.x)+Math.abs(mid.y-c._mid.y))*SPRING.wobble; c._mid=mid; c.sagV+=(target-c.sag)*SPRING.k; c.sagV*=1-SPRING.d; c.sag+=c.sagV; }
  function geom(x1,y1,x2,y2,sag){ const cx=(x1+x2)/2, cy=Math.max(y1,y2)+sag;
    const lean=(tx,ty,px,py)=>{ let vx=tx-px,vy=ty-py; const L=Math.hypot(vx,vy)||1; vx/=L; vy/=L; return Math.atan2(vy*0.42+0.58,vx*0.42); };
    const a1=lean(cx,cy,x1,y1), a2=lean(cx,cy,x2,y2); const bootLen=30;
    const bx1=x1+Math.cos(a1)*bootLen*0.9, by1=y1+Math.sin(a1)*bootLen*0.9, bx2=x2+Math.cos(a2)*bootLen*0.9, by2=y2+Math.sin(a2)*bootLen*0.9;
    const span=Math.hypot(bx2-bx1,by2-by1); const stiff=Math.min(90,24+span*0.28);
    return {a1,a2,bx1,by1,bx2,by2,c1x:bx1+Math.cos(a1)*stiff,c1y:by1+Math.sin(a1)*stiff+sag*0.35,c2x:bx2+Math.cos(a2)*stiff,c2y:by2+Math.sin(a2)*stiff+sag*0.35}; }
  function pointOn(G,t){ const u=1-t; return {x:u*u*u*G.bx1+3*u*u*t*G.c1x+3*u*t*t*G.c2x+t*t*t*G.bx2, y:u*u*u*G.by1+3*u*u*t*G.c1y+3*u*t*t*G.c2y+t*t*t*G.by2}; }
  function drawCable(x1,y1,x2,y2,sag,color,level,flash,seat,seatB){
    if(seat===undefined) seat=1; if(seatB===undefined) seatB=seat; const G=geom(x1,y1,x2,y2,sag);
    const path=dy=>{ g.beginPath(); g.moveTo(G.bx1,G.by1+dy); g.bezierCurveTo(G.c1x,G.c1y+dy,G.c2x,G.c2y+dy,G.bx2,G.by2+dy); };
    g.lineCap='round'; g.lineJoin='round';
    path(3); g.strokeStyle='rgba(0,0,0,.30)'; g.lineWidth=8; g.stroke();
    path(0); g.strokeStyle=color; g.globalAlpha=Math.min(0.55,0.08+level*0.4+flash*0.25)*g.globalAlpha; g.lineWidth=12; g.stroke();
    g.globalAlpha=baseAlpha; g.lineWidth=6; g.stroke();
    path(-1.5); g.strokeStyle='rgba(255,255,255,'+(0.30+level*0.25)+')'; g.lineWidth=1.6; g.stroke();
    drawPlug(x1,y1,G.a1,color,seat); drawPlug(x2,y2,G.a2,color,seatB); return G; }
  let baseAlpha=1;
  function drawPlug(px,py,ang,color,seat){
    g.save(); g.translate(px,py); g.rotate(ang+Math.PI/2); const SHAFT=24, out=(1-seat)*SHAFT;
    if(out>0.5){ g.save(); g.beginPath(); g.rect(-10,-110,20,110); g.clip(); const baseY=-out;
      const nick=g.createLinearGradient(-3,0,3,0); nick.addColorStop(0,'#878c94'); nick.addColorStop(0.3,'#eef1f5'); nick.addColorStop(0.5,'#c7ccd3'); nick.addColorStop(0.75,'#9aa0a8'); nick.addColorStop(1,'#6e737b');
      g.fillStyle=nick; g.fillRect(-3,baseY,6,16); g.fillStyle='#15151a'; g.fillRect(-3,baseY+16,6,2); g.fillStyle='#b9bec5'; g.fillRect(-2.2,baseY+18,4.4,1);
      g.beginPath(); g.moveTo(-3,baseY+18); g.lineTo(3,baseY+18); g.quadraticCurveTo(3,baseY+21.5,0.9,baseY+23.2); g.quadraticCurveTo(0,baseY+24,-0.9,baseY+23.2); g.quadraticCurveTo(-3,baseY+21.5,-3,baseY+18);
      g.fillStyle=nick; g.fill(); g.strokeStyle='rgba(0,0,0,.30)'; g.lineWidth=0.8; g.stroke(); g.restore(); }
    else { const ao=g.createRadialGradient(0,0,2,0,0,8.5); ao.addColorStop(0,'rgba(0,0,0,.55)'); ao.addColorStop(0.7,'rgba(0,0,0,.35)'); ao.addColorStop(1,'rgba(0,0,0,0)');
      g.fillStyle=ao; g.beginPath(); g.arc(0,0,8.5,0,7); g.fill(); g.beginPath(); g.ellipse(0,0,8.5,3,0,0,7); g.strokeStyle='rgba(0,0,0,.45)'; g.lineWidth=2; g.stroke();
      g.beginPath(); g.arc(0,0,8,0,7); g.fillStyle=color; g.fill(); const cap=g.createRadialGradient(-2.5,-2.5,1,0,0,8); cap.addColorStop(0,'rgba(255,255,255,.30)'); cap.addColorStop(0.6,'rgba(0,0,0,.05)'); cap.addColorStop(1,'rgba(0,0,0,.38)');
      g.fillStyle=cap; g.beginPath(); g.arc(0,0,8,0,7); g.fill(); g.strokeStyle='rgba(0,0,0,.35)'; g.lineWidth=1; g.stroke(); }
    const barrel=()=>{ const yb=-out+1, yt=-out-27, ym=-out-13; g.beginPath(); g.moveTo(-8,yb); g.lineTo(8,yb); g.lineTo(8,ym); g.lineTo(6,yt+3); g.quadraticCurveTo(6,yt,3,yt); g.lineTo(-3,yt); g.quadraticCurveTo(-6,yt,-6,yt+3); g.lineTo(-8,ym); g.closePath(); };
    barrel(); g.fillStyle=color; g.fill(); const sh=g.createLinearGradient(-8,0,8,0); sh.addColorStop(0,'rgba(0,0,0,.30)'); sh.addColorStop(0.15,'rgba(0,0,0,.06)'); sh.addColorStop(0.38,'rgba(255,255,255,.34)'); sh.addColorStop(0.52,'rgba(255,255,255,.10)'); sh.addColorStop(1,'rgba(0,0,0,.34)');
    barrel(); g.fillStyle=sh; g.fill(); g.strokeStyle='rgba(0,0,0,.35)'; g.lineWidth=1; g.stroke();
    if(out<=0.5){ g.beginPath(); g.ellipse(-3,-3.5,3.2,1.6,-0.4,0,7); g.fillStyle='rgba(255,255,255,.28)'; g.fill(); }
    g.restore(); }

  /* ===== connections ===== */
  let conns=[], dying=[], dragCable=null, W_=null;
  function connect(from,to,color,seated){ if(!J(from)||!J(to)) return; if(conns.some(c=>c.from===from&&c.to===to)) return; conns=conns.filter(c=>c.to!==to);
    conns.push({from,to,color:color||nextColor(),sag:10,sagV:0,plug:seated?1:0,flash:seated?0:0.5}); replan(); }
  function removeConn(c,anim){ conns=conns.filter(x=>x!==c); if(anim){ const p1=jackPos(c.from),p2=jackPos(c.to); if(p1&&p2) dying.push({x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y,sag:c.sag,color:c.color,life:1}); } replan(); }
  const dirOf=id=>J(id).dataset.dir, modOf=id=>+J(id).dataset.m;
  function jackDown(e){ const el=e.target.closest('.jack'); if(!el) return; e.preventDefault(); e.stopPropagation(); userTouch(); const id=el.dataset.j;
    if(dirOf(id)==='in'){ const ex=conns.find(c=>c.to===id); if(ex){ removeConn(ex,false); dragCable={fixed:ex.from,dir:'out',color:ex.color,pickup:true}; } else dragCable={fixed:id,dir:'in',color:peekColor()}; }
    else dragCable={fixed:id,dir:'out',color:peekColor()};
    const p=toRack(e); dragCable.x=p.x; dragCable.y=p.y; markTargets(); }
  const toRack=e=>{ const R=rack.getBoundingClientRect(); return {x:e.clientX-R.left,y:e.clientY-R.top}; };
  function markTargets(){ rack.querySelectorAll('.jack').forEach(j=>{ j.classList.toggle('can-take',j.dataset.dir!==dragCable.dir&&j.dataset.j!==dragCable.fixed); j.classList.toggle('patch-src',j.dataset.j===dragCable.fixed); }); }
  function clearMarks(){ rack.querySelectorAll('.jack.hot,.jack.can-take,.jack.patch-src').forEach(x=>x.classList.remove('hot','can-take','patch-src')); }
  rack.addEventListener('pointerdown',jackDown);
  window.addEventListener('pointermove',e=>{ if(!dragCable) return; const p=toRack(e); dragCable.x=p.x; dragCable.y=p.y;
    rack.querySelectorAll('.jack.hot').forEach(x=>x.classList.remove('hot')); const t=document.elementFromPoint(e.clientX,e.clientY); const jk=t&&t.closest&&t.closest('.jack');
    if(jk&&jk.dataset.dir!==dragCable.dir&&jk.dataset.j!==dragCable.fixed) jk.classList.add('hot'); });
  window.addEventListener('pointerup',e=>{ if(!dragCable) return; const t=document.elementFromPoint(e.clientX,e.clientY); const jk=t&&t.closest&&t.closest('.jack'); const f=dragCable;
    if(jk&&jk.dataset.dir!==f.dir&&jk.dataset.j!==f.fixed){ if(f.dir==='out') connect(f.fixed,jk.dataset.j,f.color); else connect(jk.dataset.j,f.fixed,f.color); if(!f.pickup) colorIdx++; }
    clearMarks(); dragCable=null; hold=Date.now()+6000; });
  window.addEventListener('pointercancel',()=>{ clearMarks(); dragCable=null; });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&dragCable){ clearMarks(); dragCable=null; } });
  rack.addEventListener('dblclick',e=>{ const el=e.target.closest('.jack'); if(!el) return; e.preventDefault(); userTouch(); const id=el.dataset.j; conns.filter(c=>c.from===id||c.to===id).forEach(c=>removeConn(c,true)); });
  rack.addEventListener('keydown',e=>{ const el=e.target.closest&&e.target.closest('.jack'); if(el&&(e.key==='Delete'||e.key==='Backspace')){ e.preventDefault(); userTouch(); const id=el.dataset.j; conns.filter(c=>c.from===id||c.to===id).forEach(c=>removeConn(c,true)); return; }
    const m=e.target.closest&&e.target.closest('.mod'); if(m&&e.target===m&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); userTouch(); show(+m.dataset.i); hold=Date.now()+15000; } });
  rack.addEventListener('click',e=>{ const m=e.target.closest('.mod'); if(!m||e.target.closest('.jack')) return; userTouch(); show(+m.dataset.i); hold=Date.now()+15000; });

  /* ===== the signal follows the patch (primary OUT jacks; side cables light their targets too) ===== */
  const live=new Set([0]); let cur=-1, hold=0, plan={hops:[],stopped:null};
  function replan(){ const hops=[]; const seen=new Set([0]); let m=0, stopped=null;
    for(let k=0;k<8;k++){ const c=conns.find(c=>c.from==='out'+m); if(!c){ stopped={at:m}; break; } const to=modOf(c.to);
      if(seen.has(to)){ hops.push({c,from:m,to,home:true}); break; } seen.add(to); hops.push({c,from:m,to}); m=to; }
    plan={hops,stopped}; live.clear(); live.add(0); hops.forEach(h=>live.add(h.to));
    for(let i=0;i<8;i++){ let grew=false; conns.forEach(c=>{ if(live.has(modOf(c.from))&&!live.has(modOf(c.to))){ live.add(modOf(c.to)); grew=true; } }); if(!grew) break; }
    mods.forEach((x,k)=>x.classList.toggle('live',live.has(k))); }
  const cap=i=>PR.mods[i][0];
  function show(i,hop){ cur=i; mods.forEach((m,k)=>m.classList.toggle('on',k===i)); rack.querySelectorAll('.jack.lit').forEach(j=>j.classList.remove('lit'));
    if(hop){ const a=J(hop.c.from),b=J(hop.c.to); if(a) a.classList.add('lit'); if(b) b.classList.add('lit'); }
    let extra='';
    if(hop&&!hop.home&&hop.to!==hop.from+1){ if(hop.to<hop.from) extra=' Patched backwards from '+cap(hop.from)+' to '+cap(hop.to)+'. Round and round, nothing ships.';
      else { const sk=[]; for(let k=hop.from+1;k<hop.to;k++) sk.push(cap(k)); extra=' Patched straight from '+cap(hop.from)+' to '+cap(hop.to)+'. Skipped '+sk.join(' and ')+': that step never ran.'; } }
    note.innerHTML='<b>'+esc(PR.name)+' · '+esc(cap(i))+'</b>'+esc(PR.mods[i][5])+(extra?'<span class="warn">'+esc(extra)+'</span>':'')+'<span class="src">'+esc(PR.mods[i][4])+'</span>'; }
  function showStop(){ const s=plan.stopped; if(!s) return; cur=-1; mods.forEach((m,k)=>m.classList.toggle('on',k===s.at));
    note.innerHTML='<b>'+esc(PR.name)+' · '+esc(cap(s.at))+'</b>The signal stops at '+esc(cap(s.at))+'. Its OUT jack goes nowhere. Drag a cable from it to any IN.'; }

  const HOP=1.6, REST=2.2; let lapStart=performance.now(), pulse=null;
  function walk(now){ const t=Math.max(0,(now-lapStart)/1000); const hops=plan.hops; const total=hops.length*HOP+REST; if(t>total){ lapStart=now; return walk(now); }
    const k=Math.floor(t/HOP);
    if(k<hops.length){ const h=hops[k], f=(t-k*HOP)/HOP; const p1=jackPos(h.c.from), p2=jackPos(h.c.to); if(p1&&p2){ const G=geom(p1.x,p1.y,p2.x,p2.y,h.c.sag); pulse=pointOn(G,f); pulse.color=h.c.color; }
      if(Date.now()>hold){ const target=f<0.5?h.from:h.to; if(cur!==target) show(target,f<0.5?null:h); } }
    else { pulse=null; if(Date.now()>hold){ if(plan.stopped){ if(cur!==-1) showStop(); } else if(hops.length&&cur!==hops[hops.length-1].to){ const h=hops[hops.length-1]; show(h.to,h); } } } }

  /* ===== the cycle: type the problem, re-rack, plug the patch in, run, pull, next ===== */
  const cyc={on:true,phase:'',t0:0,k:0,idleT:null,typing:null};
  const PLUG=0.12, RUN_LAPS=2;
  function typeTitle(q){ let c=0; titleEl.textContent=''; const step=function(){ if(cyc.typing!==step) return; c++; titleEl.textContent=q.slice(0,c); if(c<q.length) setTimeout(step,26); }; cyc.typing=step; step(); }
  function mount(i){ pi=(i+P.length)%P.length; PR=P[pi]; conns=[]; dying=[]; colorIdx=0; build(PR); PR.cables.forEach(c=>connect(c[0],c[1],null,true)); replan(); typeTitle(PR.q); loadStage(PR); lapStart=performance.now(); hold=0; cyc.phase='run'; cyc.t0=performance.now(); cur=-1; }
  function loadProject(i,instant){ if(instant){ mount(i); return; }
    rack.classList.add('swap'); hold=Infinity; setTimeout(()=>{ mount(i); requestAnimationFrame(()=>requestAnimationFrame(()=>rack.classList.remove('swap'))); },300); }
  function userTouch(){ if(!cyc.on&&!cyc.idleT) return; cyc.on=false; hold=0; lapStart=performance.now(); clearTimeout(cyc.idleT); cyc.idleT=setTimeout(()=>{ cyc.idleT=null; cyc.on=true; loadProject(pi+1,false); },45000); }
  document.getElementById('patchReset').addEventListener('click',()=>{ clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; conns=[]; colorIdx=0; PR.cables.forEach(c=>connect(c[0],c[1],null,false)); lapStart=performance.now(); hold=0; cyc.phase='run'; cyc.t0=performance.now(); });
  const prevB=document.getElementById('patchPrev'), nextB=document.getElementById('patchNext');
  if(prevB) prevB.addEventListener('click',()=>{ clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; loadProject(pi-1,false); });
  if(nextB) nextB.addEventListener('click',()=>{ clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; loadProject(pi+1,false); });
  function cycle(now){ if(!cyc.on) return; const t=(now-cyc.t0)/1000;
    if(cyc.phase==='run'){ const lap=plan.hops.length*HOP+REST; if(t>lap*RUN_LAPS){ cyc.phase='swap'; loadProject(pi+1,false); } return; } }

  /* ===== render ===== */
  function frame(now){
    cycle(now); walk(now);
    if(W_===null) size();
    g.clearRect(0,0,W,H);
    for(let i=dying.length-1;i>=0;i--){ const d=dying[i]; d.life-=0.09; if(d.life<=0){ dying.splice(i,1); continue; } g.globalAlpha=baseAlpha=d.life*0.8; drawCable(d.x1,d.y1,d.x2,d.y2,d.sag+(1-d.life)*26,d.color,0,0,d.life); g.globalAlpha=baseAlpha=1; }
    const liveC=new Set(plan.hops.map(h=>h.c));
    conns.forEach(c=>{ const p1=jackPos(c.from),p2=jackPos(c.to); if(!p1||!p2) return; updateSpring(c,p1,p2); c.plug+=(1-c.plug)*0.22; c.flash*=0.86;
      const on=liveC.has(c)||live.has(modOf(c.from)); g.globalAlpha=baseAlpha=on?1:0.32; drawCable(p1.x,p1.y,p2.x,p2.y,c.sag,c.color,liveC.has(c)?0.35:0,c.flash,c.plug); g.globalAlpha=baseAlpha=1; });
    if(dragCable){ const p=jackPos(dragCable.fixed); if(p){ const d=Math.hypot(dragCable.x-p.x,dragCable.y-p.y); drawCable(p.x,p.y,dragCable.x,dragCable.y,14+d*0.07,dragCable.color,0,0,1,0); } }
    if(pulse){ g.beginPath(); g.arc(pulse.x,pulse.y,5,0,7); g.fillStyle='#fff'; g.fill(); g.beginPath(); g.arc(pulse.x,pulse.y,3.2,0,7); g.fillStyle=pulse.color; g.fill(); }
    requestAnimationFrame(frame); }
  window.addEventListener('resize',()=>{W_=null;});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{W_=null;});

  loadProject(0,true); requestAnimationFrame(frame);
})();
