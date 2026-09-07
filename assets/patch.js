/* PROCESS RACK v4: one fixed-width rack (24 columns, always full), modules of different widths, every module a REAL artifact of that
   project with its file:line. The project itself loads below. Cables = Eurorack Grid cables, ported verbatim from ~/modular-lab/case/app.js. */
(function(){
  const rack=document.getElementById('workflowPatch'), note=document.getElementById('patchNote'), titleEl=document.getElementById('patchTitle'), feature=document.getElementById('patchFeature'); if(!rack||!note||!titleEl||!feature) return;

  /* ---------- projects. mods: [title, span(of 24), kind, content, source, note]. kinds: cmd, code, list, num, text ---------- */
  const P=[
   {name:'UNSKOOLERZ', title:'AI Product Engineer', r:'LIVE · 1,011 CARDS · 20 TESTS PASS', term:[['c','sed -n 1,2p PLAN.md'],['o','# SCHOOLHOUSE (working name), K-8 homeschool platform, arts-first'],['o','### Web/HTML project. Plan drafted 2026-07-25 with Jade.'],['c','ls -d app/src/decks/*/ | wc -l'],['o','      29'],['c','node -e \'...count names across every deck...\''],['hi','29 decks, 1011 cards'],['c','find app/src -name "*.js" -o -name "*.jsx" | xargs wc -l | tail -1'],['o','   91056 total'],['c','cd app && npx vitest run --reporter=dot'],['o',' Test Files  1 passed (1)'],['ok','      Tests  20 passed (20)'],['c','grep -n \'model:\\|effort\' tutor-worker/src/index.js'],['o','74:        model: "claude-opus-5",'],['o','77:        output_config: { effort: "low" },'],['c','ls factory/pending | wc -l'],['hi','     237'],['c','grep -n Hour ~/Library/LaunchAgents/com.schoolhouse.factory.plist'],['o','13:   Hour 3   Minute 0'],['o','14:   Hour 11  Minute 0'],['o','15:   Hour 19  Minute 0'],['c','git rev-list --count HEAD'],['o','13']], q:'A homeschool platform that writes its own lessons.', load:{kind:'page',src:'demo-unskoolerz.html',label:'the real trading card, the tutor rule, the nightly factory',href:'https://unskoolerz.pages.dev/'},
    mods:[
     ['PLATFORM',5,'num',[['29','decks'],['1,011','cards'],['91K','lines'],['20','tests pass']],'PLAN.md:1 · wc -l','K-8, arts-first, live at unskoolerz.pages.dev. A whole curriculum a family actually uses, built and shipped solo.'],
     ['TUTOR',5,'code','import Anthropic from "@anthropic-ai/sdk";\n...\nmodel: "claude-opus-5",\nmax_tokens: 700,\noutput_config: { effort: "low" }, // fast and cheap','tutor-worker/src/index.js:13, 74-77','A real Claude call on a Cloudflare Worker, so the key never touches the browser. The effort setting is a deliberate cost choice, written in the comment.','none'],
     ['CARDS',5,'code','"$CLAUDE_BIN" -p "$(cat factory/NIGHTLY-PROMPT.md)" \\\n  --permission-mode acceptEdits \\\n  --add-dir /Users/jade/homeschool','factory/run-nightly.sh:14-17','This is how the lessons get written. A headless agent runs three times a day under launchd (3am, 11am, 7pm) and authors curriculum from a versioned prompt.'],
     ['GATE',4,'text','Author the item IN FULL into factory/pending/, NEVER write into app/src/ or curriculum/ directly, pending only.','factory/NIGHTLY-PROMPT.md:9','The one rule that makes unattended authoring safe. The agent may write, but only into a staging area a human promotes from. 237 items waiting in pending.'],
     ['BROKER',5,'text','we broker credentialed humans and keep the records; the therapy is delivered by the licensed clinician. Never imply the platform provides therapy.','LAUNCH-FOUNDERS.md:58-60','The plan to connect speech therapists and tutors, written as a legal boundary first. The platform brokers and holds records; the licensed human delivers the care.']],
    x:{2:['out','pending/'],3:['in','PROMOTE']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x2','x3']], home:''},
   {name:'HOW I RUN AGENTS', title:'Forward Deployed Engineer', r:'53 HANDOFFS · 111 MEMORY · 3 SKILLS', term:[['c','find ~ -maxdepth 4 \\( -iname "HANDOFF*.md" -o -iname "CLAUDE.md" -o -iname "PROJECT.md" \\) | wc -l'],['hi','      53'],['c','ls ~/.claude/projects/-Users-jade/memory/*.md | wc -l'],['hi','     111'],['c','ls ~/.claude/skills/'],['o','module-design  module-ship  watch'],['c','sed -n 14p ~/homeschool/factory/run-nightly.sh'],['o','"$CLAUDE_BIN" -p "$(cat factory/NIGHTLY-PROMPT.md)" \\'],['c','grep -c Hour ~/Library/LaunchAgents/com.schoolhouse.factory.plist'],['o','3'],['c','ls ~/homeschool/factory/pending | wc -l'],['hi','     237']], q:'The agents that build with me, and the rules that keep them honest.', load:{kind:'page',src:'demo-agents.html',label:'the agent system, in real numbers'},
    mods:[
     ['FACTORY',6,'code','"$CLAUDE_BIN" -p "$(cat factory/NIGHTLY-PROMPT.md)" \\\n  --permission-mode acceptEdits \\\n  --add-dir /Users/jade/homeschool','~/homeschool/factory/run-nightly.sh:14','A headless agent runs three times a day under launchd and authors curriculum from a versioned prompt. This is agent operations, in production.'],
     ['GATE',5,'text','Author the item IN FULL into factory/pending/, NEVER write into app/src/ or curriculum/ directly, pending only.','~/homeschool/factory/NIGHTLY-PROMPT.md:9','The rule that makes unattended authoring safe: the agent may write, but only into a staging area a human promotes from. 237 items waiting.'],
     ['SCHEDULE',4,'num',[['3','runs / day'],['237','in pending'],['3am','11am · 7pm'],['0','to live']],'com.schoolhouse.factory.plist','Runs at 3am, 11am and 7pm on the machine, unattended. Nothing it writes reaches the live app without a human.'],
     ['MEMORY',5,'num',[['53','handoff docs'],['111','memory notes'],['3','agent skills'],['1','cmd to gate']],'find · ls · ~/.claude','Every project is written down so a fresh agent window picks it up cold. A curated file-memory of laws and decisions, maintained daily.'],
     ['GATES',4,'code','# the served HTML must reference the exact\n# JS bundle this build produced\nASSET="$(basename "$(ls app/dist/assets/index-*.js|head -1)")"','~/homeschool/deploy.sh:20-21','One-command gates let the agent move fast because the gate says no. This one refuses a deploy that would serve a stale bundle.']],
    x:{0:['out','pending/'],1:['in','PROMOTE']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x0','x1']], home:''},
   {name:'PATCH ASSISTANT', title:'Applied AI Engineer', r:'10 / 10 TESTS PASS', term:[['c','python3 test_validate.py'],['ok','ok  simple voice to out is valid'],['ok','ok  unknown archetype'],['ok','ok  no OUT'],['ok','ok  nothing into out'],['ok','ok  input to input'],['ok','ok  bad jack name'],['ok','ok  two cables one input'],['ok','ok  audio into pitch is useless'],['ok','ok  over HP'],['ok','ok  unknown brand'],['hi','10/10 passed'],['c','wc -l assistant.py validate.py test_validate.py'],['o','  118 assistant.py'],['o','   81 validate.py'],['o','   34 test_validate.py'],['o','  233 total'],['c','python3 -c "import json;c=json.load(open(\'catalog.json\'));print(len(c[\'archetypes\']),len(c[\'brands\']))"'],['o','72 87'],['c','grep -n LAST_VALID assistant.py'],['o','21:LAST_VALID = {}   # the validator stores the last patch it accepted; the CLI saves that, not model prose']], q:'Describe a sound, get a working patch.', load:{kind:'page',src:'demo-patch-assistant.html',label:'demo-patch-assistant.html'},
    mods:[
     ['PROMPT',5,'cmd','assistant.py -v "slow drone with a filter that breathes" --save patches/drone.json','README.md:30','The whole input is a sentence. The CLI hands it to a tool-use loop.','none'],
     ['TOOLS',5,'list',['list_modules(role)','describe_module(archetype)','validate_patch(patch_json)','@beta_tool, all three'],'assistant.py:25-52','Three tools. The model asks the catalog what exists and must call validate_patch before it answers.'],
     ['CATALOG',4,'num',[['71','archetypes'],['87','brands'],['19','jacks inferred']],'catalog.json','Generated from Eurorack Grid. Nineteen archetypes share jack arrays defined elsewhere, and the README says so.'],
     ['COMPAT',5,'code','COMPAT = {("audio","audio"), ("audio","cv"),\n  ("cv","cv"), ("cv","pitch"), ("cv","audio"),\n  ("pitch","pitch"), ("pitch","cv"),\n  ("gate","gate"), ("gate","cv")}','validate.py:7-9','What kind of output may feed what kind of input. Pure Python, no API. This is the tool that says no.','flow'],
     ['VALIDATOR',5,'list',['no OUT','input to input','bad jack name','two cables one input','over HP','unknown brand','10 / 10 passed'],'test_validate.py:12-25','Ten cases in a table. Errors are written for the model to read, and only a patch that passed is saved. Model prose never reaches disk.']],
    x:{1:['in','ERRORS'],4:['out','FAIL']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x4','x1']], home:''},
   {name:'SAFETENSORS-CHECK', title:'Solutions Engineer', r:'4 CHECKED · 3 BAD', term:[['c','python3 check.py fixtures/'],['bad','  ERROR      garbage.safetensors  header length 8029109312199880558 does not fit in file'],['bad','  TRAILING   trailing.safetensors  delta 7B'],['bad','  TRUNCATED  truncated.safetensors  delta -10B'],['ok','  ok         valid.safetensors  (1 tensors, F16)'],['hi','4 checked, 3 bad'],['c','echo $?'],['o','1'],['c','python3 check.py --json fixtures/valid.safetensors'],['o','{"file": "fixtures/valid.safetensors", "size": 139, "status": "ok", "expected": 139, "delta": 0, "tensors": 1, "dtypes": ["F16"]}'],['c','wc -l check.py'],['o','104 check.py'],['c','grep -n MAX_HEADER check.py | head -1'],['o','19:MAX_HEADER = 256 * 1024 * 1024  # anything bigger than 256MB is not a real header']], q:'Which model file is actually broken?', load:{kind:'page',src:'demo-safetensors-check.html',label:'demo-safetensors-check.html'},
    mods:[
     ['THE ERROR',6,'text','Error while deserializing header: incomplete metadata, file not fully covered','README.md:11','The loader reports the error against whichever file it was busy with, not the one that is broken. So: never trust the filename in that error. Check every file.'],
     ['HEADER',5,'code','raw = fh.read(8)\nn = struct.unpack("<Q", raw)[0]\nhdr = json.loads(fh.read(n))','check.py:25-33','Eight bytes of length, then a JSON table of tensors. Anything over 256MB is not a real header.'],
     ['DELTA',5,'code','expected = 8 + n + end\ndelta = size - expected\n"ok" if delta == 0 else\n  "truncated" if delta < 0 else "trailing"','check.py:43-49','Claimed bytes versus real bytes. The delta must be zero. Exit code is 0 only if every file passed, so it drops into a cron job as a gate.'],
     ['FIXTURES',4,'list',['ERROR  garbage','TRAILING  +7B','TRUNCATED  -10B','ok  valid  F16','4 checked, 3 bad'],'fixtures/','Four hand-built files. Real output of python3 check.py fixtures/.'],
     ['SWEEP',4,'list',['102 files','2 bad','scifi-90s-anime-zit','  truncated 25.9MB','90s_anime_aesthetic','  43MB trailing'],'README.md:46-55','My library. Two bad files, neither the one the loader blamed. 104 lines, stdlib only.']],
    x:{2:['out','EXIT 1']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x2','in0']], home:''},
   {name:'AI USE-CASE SCREENER', title:'AI Product Specialist', r:'6 CASES · 4 TIERS', term:[['c','ls cases/'],['o','generative-art-store.md  meeting-notes.md  preset-namer.md'],['o','refund-chatbot.md  resume-ranker.md  symptom-triage-sms.md'],['c','grep -h expected_ cases/*.md'],['o','expected_tier: medium   expected_decision: go_with_controls'],['o','expected_tier: low      expected_decision: go'],['o','expected_tier: low      expected_decision: go'],['o','expected_tier: high     expected_decision: go_with_controls'],['o','expected_tier: high     expected_decision: needs_review'],['bad','expected_tier: high     expected_decision: no_go'],['c','grep -n "Literal\\[" screen.py'],['o','24:RiskTier = Literal["low", "medium", "high", "unacceptable"]'],['o','25:Decision = Literal["go", "go_with_controls", "needs_review", "no_go"]'],['c','python3 eval.py --saved'],['hi','runs/ is empty. Set ANTHROPIC_API_KEY and run python3 eval.py to score live.']], q:'Should AI touch this? Who stays in charge?', load:{kind:'page',src:'demo-ai-use-case-screener.html',label:'demo-ai-use-case-screener.html'},
    mods:[
     ['INTAKE',4,'cmd','screen.py cases/refund-chatbot.md','README.md:20','A use case in plain words. The model must return the memo shape, or refuse.'],
     ['SCHEMA',6,'list',['use_case_summary','affected_parties','decision_rights','harms[]  risk_tier','required_controls[]','human_oversight','disclosure_required','decision  open_questions'],'screen.py:43-55','Twelve fields, Pydantic. owner_role is a job role accountable for it, not a person.'],
     ['TIERS',5,'code','RiskTier = Literal["low","medium",\n  "high","unacceptable"]\nDecision = Literal["go",\n  "go_with_controls",\n  "needs_review","no_go"]','screen.py:24-26','High means money, health, employment, housing, legal status or safety. Unacceptable means no controls fix it.'],
     ['CASES',5,'list',['refund chatbot  high','symptom triage  no_go','resume ranker  review','meeting notes  go','preset namer  go','my art store  medium'],'cases/*.md','Six cases with my expected answers. They are my judgment, not ground truth. Enough to catch gross errors.'],
     ['EVAL',4,'code','adjacent = abs(TIERS.index(got)\n  - TIERS.index(exp)) <= 1\n"tier off by one"','eval.py:51-54','Medium versus high is a conversation. Low versus high is a bug. Not run live yet: runs/ is empty until a key is set.']],
    x:{1:['in','PROMPT']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out4','x1']], home:''},
   {name:'STUDIO PLANTS', title:'Creative Technologist', r:'135 PLANTS', term:[['c','ls public/plants | wc -l'],['hi','135'],['c','grep -n captureStream src/lib/audioPulse.js'],['o','30:// the music dies with it (2026-09-01). captureStream() is a tap: the'],['c','grep -n "fftSize\\|smoothingTimeConstant" src/lib/audioPulse.js'],['o','39:  an.fftSize = 256'],['o','40:  an.smoothingTimeConstant = 0.7'],['c','grep -n "% 135" functions/api/artists.js'],['o','78: plant: existing?.plant ?? (1 + [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 135),'],['c','grep -n dreamshaper8 ~/Documents/plants_r2/batch_generate.py'],['o','32:  "ckpt_name": "dreamshaper8.safetensors"'],['c','sips -s format webp plant_041.png --out plant_041.webp'],['ok','plant_041.webp']], q:'A plant per member, dancing to the site.', load:{kind:'page',src:'demo-studio-plants.html',label:'demo-studio-plants.html'},
    mods:[
     ['PROMPT',7,'text','{plant_name} plant, full view, stem clearly visible and ending flat at the bottom, anime cel-shaded, bold dark green-black outline, flat 2-3 tone shading only, no pot, no dirt, white background','plants_r2/batch_generate.py:49','One prompt, a plant name slotted in. Negative prompt bans glow, gradients, pots and soil.'],
     ['MODEL',4,'list',['dreamshaper8','ip-adapter_sd15','plants_lora_v1','  500 steps · 106 imgs'],'plants_r2/*.json','A base checkpoint locked with an IP adapter, then a LoRA trained on my own output to hold the style.'],
     ['SWAY',6,'code','.dp{--s:calc(sin((var(--t)*(0.9+var(--i)*0.05)\n  + var(--i)*1.7)*1rad) * var(--amp) * 1.25\n  * (0.55 + 0.45*var(--beat)) * var(--on))}\ntransform-origin:50% 97%','DancingPlant.css:10-11','A sine on the site clock, per-plant phase, scaled by beat energy. The whole image tilts from the pot.','wave'],
     ['BEAT',4,'code','// NEVER reroute playback through\n// WebAudio. captureStream() is a tap.\nan.fftSize = 256','audioPulse.js:27-41','iOS kills a rerouted context on screen lock. The analyser only listens to a copy. No music, no motion.'],
     ['GROW',3,'code','stageOf = min(3,\n floor((now - at) / DAY))\nplant = hash(slug) % 135','plantStage.js:7-13','Seed, sprout, sapling over three days. Day four plays the grow-out once. 135 plants, assigned by a hash of the slug.']],
    x:{2:['in','AUDIO']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out3','x2']], home:''},
   {name:'JAMNUTZ HARDWARE', title:'Product Engineer', r:'10 CHANNELS · 1,442 LINES', term:[['c','grep -n "requestMIDIAccess(" src/lib/midi/midiAccess.js'],['o','22:    const access = await navigator.requestMIDIAccess({ sysex: false })'],['c','grep -n "CHANNEL_TO_SLOT =" src/pages/Hardware.jsx'],['o','95:const CHANNEL_TO_SLOT = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 0 }'],['c','grep -n "CC_NAMED =" src/pages/Hardware.jsx'],['o','133:const CC_NAMED = { 74: \'flt\', 71: \'q\', 73: \'atk\', 75: \'dcy\', 72: \'rel\' }'],['c','grep -n "AUTO_VOICES =" src/pages/Hardware.jsx'],['o','123:const AUTO_VOICES = [null, \'pluck\', \'bell\', \'pad\', \'fm\', \'chip\', \'gboy\', \'organ\', \'pluck\', \'bell\']'],['c','wc -l src/pages/Hardware.jsx'],['o','1442 src/pages/Hardware.jsx'],['c','grep -n "MIDI IN  waiting" src/pages/Hardware.jsx'],['hi','681: MIDI IN  waiting for a note from ...']], q:'Hardware sequencer, browser sound module.', load:{kind:'page',src:'demo-jamnutz-hardware.html',label:'the real MIDI map: channels, CCs, drum lanes, tap them',href:'https://jamnutz.com/hardware'},
    mods:[
     ['MIDI IN',4,'code','navigator.requestMIDIAccess(\n  { sysex: false })','midiAccess.js:22','Web MIDI, no sysex. Chrome, Edge, Firefox 108+, Safari 18+.'],
     ['CHANNELS',4,'code','CHANNEL_TO_SLOT = {\n 0:1, 1:2, 2:3, 3:4, 4:5,\n 5:6, 6:7, 7:8, 8:9, 9:0 }','Hardware.jsx:95','Channels 1 to 9 are melodic slots. Channel 10 is the drum kit, GM convention.'],
     ['DRUM LANES',5,'list',['36 kick','38 snare  39 clap','41 43 45 low toms','42 44 hat  46 open','56 cowbell','else (note-36) % 8'],'Hardware.jsx:97-116','GM drum notes to the eight lanes. Before 2026-09-06 every note went through one pitched tom.'],
     ['CC MAP',6,'code','CC_NAMED = { 74:\'flt\', 71:\'q\',\n  73:\'atk\', 75:\'dcy\', 72:\'rel\' }\nCC 70-77 → macros in order\nCC 16-23 → macros in order\nCC 1 → macro 1   CC 7 → volume','Hardware.jsx:125-142','Named CCs win when the voice has that key. Two ranges hit the macro strip in order so most boxes work untouched.'],
     ['AUTO',5,'code','AUTO_VOICES = [null,\'pluck\',\'bell\',\n \'pad\',\'fm\',\'chip\',\'gboy\',\n \'organ\',\'pluck\',\'bell\']\n// empty slot, first note: populate','Hardware.jsx:119-123','Plug in a sequencer, press play, every track is sounding before you touch anything. The on-page monitor shows what the box actually sent.']],
    x:{3:['in','CC']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out0','x3']], home:''},
   {name:'MANGLER', title:'Audio Software Engineer', r:'25 PARAMS · 0 AUDIO LIBS', term:[['c','wc -l src/lib/audio/manglerChain.js src/components/audio/FxUnit.jsx src/contexts/MangleBus.jsx'],['o','     318 src/lib/audio/manglerChain.js'],['o','    1307 src/components/audio/FxUnit.jsx'],['o','     248 src/contexts/MangleBus.jsx'],['o','    1873 total'],['c','grep -c "case \'" src/lib/audio/manglerChain.js'],['hi','25'],['c','git log --format="%h %ad %s" --date=short -- src/lib/audio/manglerChain.js | tail -1'],['o','399b2b4 2026-05-09 audio: extract MANGLER chain into a reusable factory'],['c','sed -n 30p src/lib/audio/manglerChain.js'],['hi','//   input → master → drive → low → mid → high → filter'],['c','sed -n 3,4p ~/plugincorp/mangler-ios/PLAN.md'],['o','Port of the jamworld MANGLER (FxUnit.jsx + manglerChain.js) to a native iPhone app'],['o','that also loads as an AUv3 audio effect in AUM / GarageBand / any iOS host.']],
    q:'One effects chain, every page, every platform.',
    load:{kind:'page',src:'demo-mangler.html',label:'the MANGLER, ported, three of my tracks to play and mangle'},
    mods:[
     ['ROUTING',6,'code','input → master → drive → low → mid → high → filter\n  ├→ output (dry)\n  ├ reverbSend → reverb → wet\n  ├ delaySend → delay ↻ delayFb → delayTone → wet\n  └ driveBus / filterBus → wet','manglerChain.js:30-37','The whole chain in one factory. Any AudioContext can build it, so the popup player, the studio and the hardware page all get the same sound.','flow'],
     ['FILTER',4,'code','const cutoff =\n  800 * Math.pow(25, value / 100)\ntypes = [\'lowpass\',\'highpass\',\n  \'bandpass\',\'notch\']','manglerChain.js:167, 228','One knob sweeps the cutoff on a log curve. Another picks the filter type in four quadrants of its travel.','knobs'],
     ['HISS',5,'code','const f = (value / 100)\nhissGain.gain.setTargetAtTime(\n  f * f * f * f * 0.02, t, ramp)','manglerChain.js:182-183','A fourth-power curve so the bottom half of the knob stays silent, and a low ceiling. The comment above it quotes me: hiss at 100 is too much.','none'],
     ['STOP',5,'code','output.gain.linearRampToValueAtTime(\n  0, t + 0.3)','manglerChain.js:272-276','Stop is a 300 ms fade, not a cut, so release tails ring out the way they do in the studio.','env'],
     ['PORT',4,'text','Port of the jamworld MANGLER (FxUnit.jsx + manglerChain.js) to a native iPhone app that also loads as an AUv3 audio effect in AUM / GarageBand / any iOS host.','mangler-ios/PLAN.md:3-4','The same unit, headed for the iPhone: JUCE 8, the web UI in a WebView, the DSP in Cmajor.','none']],
    x:{0:['out','WET']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x0','in3']], home:''},
   {name:'TOI SEMIS', title:'Design Engineer', r:'65 SYNTHS · 2,775 PARAMS', term:[['c','ls case/toi-*.gen.js | grep -v defs | wc -l'],['hi','      66'],['c','du -ch case/toi-*.gen.js | tail -1'],['o',' 15M\ttotal'],['c','wc -l case/toi.js scripts/gen-toi.mjs case/toi-defs.gen.js'],['o','     726 case/toi.js'],['o','     318 scripts/gen-toi.mjs'],['o','   26230 case/toi-defs.gen.js'],['o','   27274 total'],['c','node -e \'const s=require("fs").readFileSync("case/toi-defs.gen.js","utf8");global.window={};eval(s);console.log(window.TOI_SYNTHS.length+" synths, "+window.TOI_SYNTHS.reduce((t,x)=>t+x.params.length,0)+" params total")\''],['hi','65 synths, 2775 params total'],['c','node -e \'global.window={};eval(require("fs").readFileSync("case/toi-defs.gen.js","utf8"));window.TOI_SYNTHS.map(s=>[s.title,s.params.length]).sort((a,b)=>b[1]-a[1]).slice(0,5).forEach(r=>console.log(r[0],r[1]))\''],['o','JW-MOD 188'],['o','JW-VCS 188'],['o','JW-EMU 83'],['o','JW-CMI 78'],['o','JW-QUAD 73'],['c','node -e \'global.window={};eval(require("fs").readFileSync("case/toi-defs.gen.js","utf8"));console.log(window.TOI_SYNTHS.filter(s=>s.params.length>32).length+" of "+window.TOI_SYNTHS.length+" exceed MAX_CONTROLS=32")\''],['o','41 of 65 exceed MAX_CONTROLS=32'],['c','node -e \'global.window={};eval(require("fs").readFileSync("case/toi-defs.gen.js","utf8"));const v=window.TOI_SYNTHS.find(s=>s.dir==="vcs");console.log(v.title, v.params.filter(p=>/^mx/.test(p.id)).length+" mx crosspoints of "+v.params.length+" params")\''],['hi','JW-VCS 160 mx crosspoints of 188 params'],['c','ls ~/plugincorp/plugins | wc -l'],['o','     123']], q:'Sixty-five hardware synths, compiled into one browser rack.', load:{kind:'page',src:'demo-toi.html',label:'the JW-CZ panel: 26 real params on STERN knobs, 15 jacks',href:'https://eurorackgrid.pages.dev/?brandsys=toi&auto'},
    mods:[
     ['GATE',5,'code','const hasMidi = eps.some(e => e.purpose === \'midi in\');\nif (!hasMidi) return { dir, skip: \'no midi in\' };\nif (eps.some(e => e.purpose === \'audio in\'))\n  return { dir, skip: \'needs audio in\' };','scripts/gen-toi.mjs:243-245','Two lines decide the whole fleet. A plugin becomes a rack module only if it takes MIDI and needs no audio in. Everything else is an effect, not a voice.','flow'],
     ['SKIP LIST',5,'code','// dirs that are not tribute synths (FX brands, libs, products, pulled/dupes)\nconst SKIP_DIRS = new Set([\'cz\', \'daytrip\', \'psx\', \'pro1\', \'sm01\', \'sm02\', \'sm03\', \'syn-analog\']);\n// classic-tier minis are JW-<2 digits>; these numeric names ARE tributes though\nconst NUMERIC_TRIBUTES = new Set([\'JW-2600\', \'JW-8000\', \'JW-101\']);','scripts/gen-toi.mjs:31-34','The hand-kept edge of the collection. Eight folders that are not synths, and three numeric names the naming rule would have thrown out by mistake.','none'],
     ['PARSE',5,'code','function parseEndpoints(jsFile) {\n  const src = fs.readFileSync(jsFile, \'utf8\');\n  const at = src.indexOf(\'getInputEndpoints()\\n  {\\n    return [\');\n  if (at < 0) throw new Error(\'no getInputEndpoints block\');','scripts/gen-toi.mjs:212-215','No parameter table is typed by hand. The facts are read back out of the Cmajor compiler\'s own JavaScript by matching one method signature, so every vintage of patch parses the same way.'],
     ['FLEET',4,'num',[['65','synths'],['2,775','params'],['66','bundles'],['15M','on disk']],'toi-defs.gen.js · du -ch','Sixty-five synths from 123 plugin folders. Each engine is its own bundle, 141KB to 655KB, and nothing loads until a module is placed.'],
     ['LAZY',5,'text','sized to fill an 84HP row exactly. The ~170KB engine bundle lazy-loads on first mount; until the worklet is live the OUT jack passes silence through a normal gain node, so patching never has to wait.','case/toi.js:4-6','The rule that makes 15MB of engines usable in a browser. The jack exists before the DSP does, so you can cable a module while it is still downloading.']],
    x:{0:['out','SKIP'],1:['in','DIRS']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['x0','x1']], home:''},
   {name:'JAMNUTZ DESKTOP', title:'Product Builder', r:'100 COMMITS · 51M APP', term:[['c','git log --oneline | head -1'],['o','3a40ae0 Sequencer pages: the three device knobs reshape the pattern on release, on the page and on the strip, without a new roll'],['c','git rev-list --count HEAD'],['hi','100'],['c','git log --format=%ad --date=short | sort -u'],['hi','2026-09-06'],['c','git ls-tree -r 3a40ae0 --name-only native/Source | wc -l'],['o','      14'],['c','git show 3a40ae0:native/Source/Engine.h | wc -l'],['o','    1763'],['c','git grep -n "catch (\\.\\.\\.)" 3a40ae0 -- native/Source/Engine.h'],['bad','3a40ae0:native/Source/Engine.h:943:        catch (...) { more = true; name = "(a plugin threw during load, skipped)"; }'],['c','grep -c \'^            { "\' native/Source/Fonts.h'],['o','23'],['c','grep -o \'^        { "[A-Z ]*"\' native/Source/DrumSynth.h | wc -l'],['o','      16'],['c','du -sh build/HybridJammin_artefacts/Release/Jamnutz.app'],['o',' 51M\tbuild/HybridJammin_artefacts/Release/Jamnutz.app']], q:'A desktop DAW for jammers that hosts every plugin on the Mac.', load:{kind:'page',src:'demo-jamnutz-desktop.html',label:'the real plugin scan, 223 entries, and the CC to knob rule'},
    mods:[
     ['SCAN',6,'code','// Every plugin on a Mac ships an AU, and scanning the VST3 copies only adds\n// duplicates plus the odd plugin that throws inside dlopen (crashed 2026-09-06).\n// VST3 stays registered so saved racks that reference one still load.\nif (f->getName() != "AudioUnit") { ++scan.formatIndex; continue; }','Engine.h:1728-1731 @3a40ae0','A comment that records a real crash and the policy that came out of it. Scan AUs only. Keep VST3 registered so old racks still open.'],
     ['CATCH',4,'code','try { more = scan.scanner->scanNextFile (true, name); }\ncatch (...) { more = true;\n  name = "(a plugin threw during load, skipped)"; }','Engine.h:942-943 @3a40ae0','The scan keeps walking after a plugin throws, and the user sees the skip in plain words instead of a dead app.'],
     ['LOADGEN',5,'code','int loadGen = 0;  // bumps per load request so a slow, superseded load is dropped\n...\nif (gen != t.loadGen) { if (done) done ("superseded by a newer load"); return; }','Engine.h:97, 675 @3a40ae0','One integer stops a slow async plugin load from landing in a slot the user already refilled. That was the bug that swapped a plugin out from under a live editor.'],
     ['SLOTS',4,'code','static constexpr int numSlots = 10;  // channels 1-8 synths, 9 = drum machine, 10 = sampler\nstatic constexpr int drumSlot = 8, samplerSlot = 9;','Engine.h:112-113 @3a40ae0','Slot i is MIDI channel i+1. Ten slots, two of them reserved by name.','leds:10'],
     ['KNOBS',5,'code','// CC -> knob index. 70-77 (GM sound controllers, Elektron knob page) and\n// 16-23 (general purpose) both hit the first eight mappable parameters.\nstatic int ccToKnob (int cc)\n{\n    if (cc >= 70 && cc <= 77) return cc - 70;','Engine.h:115-119 @3a40ae0','Two standard CC banks land on the same eight parameters, so a hardware knob page works with no mapping step at all.']],
    x:{0:['in','VST3']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4']], home:''},
  /* APPS fold, PROPOSAL 2026-09-07 (not live, Jade decides): one rack in place of JELLYBOI / NOISEFACE / WAVEFACE / TODOMAI.
     To flip: uncomment this entry, delete the four entries below it. Modules are the first module of each of those racks, verbatim. Terminal lines are from the same racks.
   {name:'APPS', title:'Prototyping Engineer', r:'16 WATCH APPS · 2 ON THE STORE', term:[['c','wc -l Watch/Sources/*.swift | tail -1'],['hi','    1252 total'],['c','find . -name \'*.swift\' -not -path \'./build/*\' | wc -l'],['o','      14'],['c','find WaveFace -name \'*.swift\' -print0 | xargs -0 wc -l | tail -1'],['o','    4069 total'],['c','ls images/apps/watch/*.mp4 | wc -l'],['hi','      16']], q:'Four apps, one lesson about the audio session.', load:{kind:'page',src:'demo-apps.html',label:'demo-apps.html'},
    mods:[
     ['INTERRUPT',6,'code','guard let self,\n      let raw = note.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,\n      let type = AVAudioSession.InterruptionType(rawValue: raw) else { return }\nif type == .ended { self.ensureRunning() }','Watch/Sources/Kalimba.swift:93-96','The whole wrist-down "crash" in one line. The app never crashed. The session was interrupted, and the fix is to listen for .ended and restart, not to rebuild anything.'],
     ['SESSION',6,'code','let audioSession = AVAudioSession.sharedInstance()\ntry audioSession.setCategory(.playback, mode: .default,\n                             options: [.mixWithOthers])','NoiseFace/AudioEngine.swift:88-89','This line is why a sleep-noise app keeps playing over your music and under a locked screen.'],
     ['SEAM',6,'code','// Calculate how many complete cycles fit in the buffer for seamless looping\nlet cyclesInBuffer = floor(Double(frequency) * duration)\nlet adjustedFrequency = Float(cyclesInBuffer / duration)','WaveFace/AudioEngine.swift:358-360','Every note is detuned to the nearest frequency that fits a whole number of cycles. Exact pitch traded for a loop with no click.','wave'],
     ['MODES',5,'code','// 4-Mode System\nenum ViewMode: String, CaseIterable, Codable {\n    case life = "life"\n    case work = "work"\n    case school = "school"','TodomaiApp.swift:91-95','The comment says four modes and the enum has three. A design that shrank and left its own label behind. I am showing it because the rack is the source, not the pitch.']],
    x:{0:['in','WRIST DOWN']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3']], home:''},
  */
   {name:'JELLYBOI', title:'Prototyping Engineer', r:'16 WATCH APPS BUILT', term:[['c','wc -l Watch/Sources/*.swift | sort -n'],['o','      13 Watch/Sources/JellyBoiApp.swift'],['o','      33 Watch/Sources/Runtime.swift'],['o','      48 Watch/Sources/Theme.swift'],['o','      72 Watch/Sources/Arp.swift'],['o','     121 Watch/Sources/Kalimba.swift'],['o','     203 Watch/Sources/Looper.swift'],['o','     762 Watch/Sources/InstrumentView.swift'],['hi','    1252 total'],['c','ls Watch/Resources/kalimba_*.wav | wc -l'],['o','      51'],['c','ls Watch/Resources/*.wav | wc -l'],['o','     816'],['c','du -sh Watch/Resources'],['o',' 77M\tWatch/Resources'],['c','grep -rn "AVAudioSession\\|ensureRunning()\\|WKExtendedRuntimeSession()\\|scenePhase" Watch/Sources/ | sed \'s|Watch/Sources/||\''],['o','Runtime.swift:13:        let s = WKExtendedRuntimeSession()'],['o','Kalimba.swift:76:        let session = AVAudioSession.sharedInstance()'],['o','Kalimba.swift:82:    func ensureRunning() -> Bool {'],['o','Kalimba.swift:91:        nc.addObserver(forName: AVAudioSession.interruptionNotification,'],['o','Kalimba.swift:94:                  let raw = note.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,'],['o','Kalimba.swift:95:                  let type = AVAudioSession.InterruptionType(rawValue: raw) else { return }'],['ok','Kalimba.swift:96:            if type == .ended { self.ensureRunning() }'],['o','Kalimba.swift:100:            self?.ensureRunning()'],['o','Kalimba.swift:111:        guard ensureRunning() else { return }'],['o','InstrumentView.swift:239:    @Environment(\\.scenePhase) private var scenePhase'],['o','InstrumentView.swift:369:        .onChange(of: scenePhase) { _, phase in'],['c','grep -n "milliseconds" Watch/Sources/Arp.swift Watch/Sources/Looper.swift'],['o','Watch/Sources/Arp.swift:53:        t.schedule(deadline: .now(), repeating: .milliseconds(250), leeway: .milliseconds(10))'],['o','Watch/Sources/Looper.swift:170:        t.schedule(deadline: .now(), repeating: .milliseconds(8), leeway: .milliseconds(2))'],['c','grep -oE \'\\("[A-Z0-9]+"\' Watch/Sources/Arp.swift | tr -d \'("\' | tr \'\\n\' \' \''],['hi','FWD BWD UPDN DNUP RAND CONV DIVG P1 P2 P3 P4 P5 P6 P7 P8 P9'],['c','git log --oneline | head -1'],['bad','fatal: not a git repository (or any of the parent directories): .git']], q:'A kalimba on the wrist that survives the wrist going down.', load:{kind:'page',src:'demo-jellyboi.html',label:'the flagship watch app, its real capture, the runtime rule'},
    mods:[
     ['INTERRUPT',6,'code','guard let self,\n      let raw = note.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,\n      let type = AVAudioSession.InterruptionType(rawValue: raw) else { return }\nif type == .ended { self.ensureRunning() }','Watch/Sources/Kalimba.swift:93-96','The whole wrist-down "crash" in one line. The app never crashed. The session was interrupted, and the fix is to listen for .ended and restart, not to rebuild anything.'],
     ['ENSURE',5,'code','func ensureRunning() -> Bool {\n    if engine.isRunning { return true }\n    activateSession()\n    do { try engine.start() } catch { return false }\n    return true\n}','Watch/Sources/Kalimba.swift:82-87','One idempotent guard. Called from the interruption handler, the config-change handler, and every single play(), so no note can hit a dead engine.'],
     ['RUNTIME',5,'text','Keeps the app, and its audio, alive while the screen sleeps or the wrist drops. A mindfulness extended-runtime session grants up to ~1 hour of background running per start; we restart it on every foreground activation, so the window resets each time Jade raises her wrist. Sessions can only be started while the app is active.','Watch/Sources/Runtime.swift:3-7','Written as a constraint, not a description. The session can only start while active, which is exactly why the restart has to hang off scenePhase.','env'],
     ['FOREGROUND',4,'code','.onChange(of: scenePhase) { _, phase in\n    if phase == .active { runtime.start() }\n}','Watch/Sources/InstrumentView.swift:369-371','Three lines that turn "it dies after an hour" into "the hour resets every time you raise your wrist".'],
     ['STEP REC',4,'code','// Step record: notes land in order, one per step; the 16th starts playback.\nprivate var stepNotes: [(hill: Int, oct: Int)] = []\nprivate let stepDur = 0.25   // 8th notes at 120','Watch/Sources/Looper.swift:36-38','A stated rule and the constants that enforce it. Sixteen notes, quarter-second steps, no stop button needed.']],
    x:{0:['in','WRIST DOWN']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4']], home:''},
   {name:'NOISEFACE', title:'Product Builder', r:'APP STORE · 56 COMMITS', term:[['c','find . -name \'*.swift\' -not -path \'./build/*\' | wc -l'],['o','      14'],['c','find . -name \'*.swift\' -not -path \'./build/*\' -print0 | xargs -0 wc -l | tail -1'],['o','    8497 total'],['c','git rev-list --count HEAD'],['o','56'],['c','grep -n \'^    case .* = "\' NoiseFace/AudioEngine.swift | head -4'],['o','6:    case whiteNoise = "WHITE"'],['o','7:    case pinkNoise = "PINK"'],['o','8:    case brownNoise = "BROWN"'],['o','9:    case blueNoise = "BLUE"'],['c','grep -c \'^    case .* = "\' NoiseFace/AudioEngine.swift'],['hi','12'],['c','md5 -q NoiseFace/WaveformView.swift NoiseFace-tvOS/WaveformView.swift'],['o','1366fd006e68758b92535fd8f70be525'],['o','1366fd006e68758b92535fd8f70be525'],['c','grep -n \'PRODUCT_BUNDLE_IDENTIFIER\' NoiseFace-tvOS/NoiseFace-tvOS.xcodeproj/project.pbxproj | head -1'],['o','279:\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = "com.jadewii.noiseface-tv";'],['c','git log --oneline -3'],['o','d4ae6be v2.0: Performance optimization - instant launch and smooth transitions'],['o','f2c8ede v1.0: Complete NoiseFace with modulation, presets, and face tap on all pages'],['o','cdab3d0 Fix brown noise loop artifact by extending buffer duration']], q:'A sleep-noise app that keeps playing under the lock screen.', load:{kind:'page',src:'demo-noiseface.html',label:'the 12 noise colors, the real formulas, audible',href:'https://apps.apple.com/us/app/noiseface/id6754266069'},
    mods:[
     ['SESSION',6,'code','let audioSession = AVAudioSession.sharedInstance()\ntry audioSession.setCategory(.playback, mode: .default,\n                             options: [.mixWithOthers])','NoiseFace/AudioEngine.swift:88-89','This line is why a sleep-noise app keeps playing over your music and under a locked screen.'],
     ['BUFFER',5,'code','let sampleRate = 44100.0\nlet duration = 5.0  // 5 second buffer - noise loops seamlessly, shorter buffers load faster\nlet frameCount = AVAudioFrameCount(sampleRate * duration)','NoiseFace/AudioEngine.swift:519-521','The whole tradeoff in one comment. Five seconds is the negotiated price between a seamless loop and a fast launch. The commit "Fix brown noise loop artifact by extending buffer duration" is where it was paid.'],
     ['BROWN',6,'code','let whiteNoise = Float.random(in: -1.0...1.0)\nbrownNoiseState += whiteNoise * 0.02  // Integration step\nbrownNoiseState *= 0.998  // Prevent DC drift\nbrownNoiseState = max(-1.0, min(1.0, brownNoiseState))  // Clamp','NoiseFace/AudioEngine.swift:576-579','Integrate, leak, clamp. Four lines are the entire brown noise generator, and the 0.998 exists only to stop the walk drifting off centre.'],
     ['PINK',4,'text','// REAL Pink noise - Voss-McCartney algorithm for accurate 1/f spectrum\n// This is the professional standard for pink noise generation','NoiseFace/AudioEngine.swift:548-549','The rare comment that names a published algorithm, which means it stakes a claim you can go and check.'],
     ['FACE',3,'text','// ALWAYS-VISIBLE FACE LAYER - renders on ALL pages with CONSISTENT position','NoiseFace/ContentView.swift:237','A layout invariant in caps. The face is not a page, it is the frame every page renders inside. Same file, byte for byte, in the tvOS target.']],
    x:{4:['out','tvOS']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4']], home:''},
   {name:'WAVEFACE', title:'Innovation Engineer', r:'APP STORE · v1.1', term:[['c','find WaveFace -name \'*.swift\' | wc -l'],['o','       6'],['c','find WaveFace -name \'*.swift\' -print0 | xargs -0 wc -l | tail -1'],['o','    4069 total'],['c','git rev-list --count HEAD'],['o','14'],['c','grep -c \'^    case .* = "\' WaveFace/AudioEngine.swift'],['hi','24'],['c','grep -n "productID" WaveFace/StoreManager.swift'],['o','9:    private let productID = "com.waveface.app.premium"'],['o','20:            products = try await Product.products(for: [productID])'],['o','64:                if transaction.productID == productID {'],['o','79:                if transaction.productID == productID {'],['c','grep -rn "setCategory" WaveFace/*.swift; echo "exit=$?"'],['bad','exit=1'],['c','ls WaveFace/'],['o','Assets.xcassets'],['o','AudioEngine.swift'],['o','CharacterView.swi ft.swift'],['o','ContentView.swift'],['o','ContentView.swift.backup'],['o','Info.plist'],['o','StoreManager.swift'],['o','WaveFaceApp.swift'],['o','WaveformView.swift'],['c','git log --oneline -3'],['o','64899ff Major WaveFace improvements: App Store ready release'],['o','55928be Set app display name to WaveFace'],['o','fae2ec9 Fix crash on device launch - revert lazy AudioEngine initialization']], q:'A synth with a face that reads its own oscillator.', load:{kind:'page',src:'demo-waveface.html',label:'the seamless loop buffer, drawn and playable',href:'https://apps.apple.com/us/app/waveface/id6754204480'},
    mods:[
     ['BUFFER',5,'code','let sampleRate = 44100.0\nlet duration = 0.2  // Shorter buffer for faster generation and lower latency\nlet frameCount = AVAudioFrameCount(sampleRate * duration)','WaveFace/AudioEngine.swift:346-348','The counterpart to NoiseFace\'s 5.0. A playable instrument buys 25x lower latency and pays for it by regenerating buffers constantly.','wave'],
     ['SEAM',6,'code','// Calculate how many complete cycles fit in the buffer for seamless looping\nlet cyclesInBuffer = floor(Double(frequency) * duration)\nlet adjustedFrequency = Float(cyclesInBuffer / duration)','WaveFace/AudioEngine.swift:358-360','Every note is detuned to the nearest frequency that fits a whole number of cycles. Exact pitch traded for a loop with no click.','wave'],
     ['LOOP',5,'code','playerNode.scheduleBuffer(buffer, at: nil,\n    options: .loops, completionHandler: nil)','WaveFace/AudioEngine.swift:260','The line that made SEAM necessary. The buffer is scheduled once and repeats until the finger lifts. No AVAudioSourceNode anywhere in either app.','none'],
     ['SCOPE',5,'code','// Scale animation speed based on current frequency (like an oscilloscope)\nlet frequencyRatio = CGFloat(audioEngine.currentFrequency / baseFrequency)\nlet cyclesPerSecond = cycles(for: waveform) * frequencyRatio','WaveFace/CharacterView.swi ft.swift:88-90','The mouth is driven by the live oscillator frequency, not the output level, so pitch squeezes the waveform exactly as a scope would. Yes, the file name has a space in it. That is what is on disk.'],
     ['PRICE',3,'code','private let productID =\n  "com.waveface.app.premium"','WaveFace/StoreManager.swift:9','One non-consumable string is the entire commercial surface of the app.']],
    x:{2:['in','NOTE ON']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4']], home:''},
   {name:'TODOMAI', title:'Technical Product Manager', r:'9,643 LINES · 3 COMMITS', term:[['c','git log --oneline'],['o','4e8b3ba Add RADIO feature with music station downloads and player'],['o','5583cd1 Enhanced Todomai with wellness routines and UI improvements'],['o','c51215b Major UI overhaul for Todomai iOS app'],['c','find . -name \'*.swift\' -not -path \'./build/*\' | wc -l'],['o','      60'],['c','find . -name \'*.swift\' -not -path \'./build/*\' -print0 | xargs -0 cat | wc -l'],['o','    9643'],['c','find . -name \'*.swift\' -not -path \'./build/*\' -exec wc -l {} + | awk \'$2!="total"{if($1<=10)s++}END{print s}\''],['bad','31'],['c','grep -rn "UNUserNotificationCenter\\|UNMutableNotificationContent" --include=\'*.swift\' . | wc -l'],['hi','       0'],['c','grep -rn "should never appear" --include=\'*.swift\' .'],['o','ThisWeekView.swift:117:            // EXCLUDE LATER TASKS - they should never appear on weekly calendar'],['o','CalendarView.swift:194:            // SKIP LATER TASKS - they should never appear on calendar'],['o','DayView.swift:102:            // EXCLUDE LATER TASKS - they should never appear on any calendar day'],['o','ContentView.swift:673:            // SKIP LATER TASKS - they should never appear on calendar'],['c','grep -rn \'currentMode.rawValue\' --include=\'*.swift\' . | wc -l'],['o','      20'],['c','grep -rn "archive.org" --include=\'*.swift\' .'],['o','StationDownloadManager.swift:77:                url: "https://archive.org/download/file-100/File%20\\(number).m4a"']], q:'A todo app that talks instead of buzzing.', load:{kind:'page',src:'demo-todomai.html',label:'the mode system and the voice router, ported'},
    mods:[
     ['TASK',5,'code','var text: String\nvar isCompleted: Bool\nvar createdAt: Date\nvar listId: String\nvar mode: String','TodomaiApp.swift:34-38','Every task carries its mode as a plain string. That is what makes the app a set of parallel lists rather than one.'],
     ['MODES',5,'code','// 4-Mode System\nenum ViewMode: String, CaseIterable, Codable {\n    case life = "life"\n    case work = "work"\n    case school = "school"','TodomaiApp.swift:91-95','The comment says four modes and the enum has three. A design that shrank and left its own label behind. I am showing it because the rack is the source, not the pitch.'],
     ['LATER',5,'code','// EXCLUDE LATER TASKS - they should never appear on weekly calendar\nif task.listId == "later" {\n    return false\n}','ThisWeekView.swift:117-120','"Later" is a deliberate exile. The same rule is written by hand in four files. The terminal below lists them.'],
     ['RADIO',5,'code','StationSong(\n    filename: "File \\(number).m4a",\n    url: "https://archive.org/download/file-100/File%20\\(number).m4a"\n)','StationDownloadManager.swift:76-79','A todo app that downloads fifty lofi tracks from the Internet Archive so you can focus. The last commit in the repo is this feature.'],
     ['SPEAK',4,'code','func speakNotification(_ message: String) {\n    let utterance = AVSpeechUtterance(string: message)\n    utterance.rate = 0.5\n    utterance.voice = AVSpeechSynthesisVoice(language: "en-US")','TodomaiApp.swift:200-203','There is no UNUserNotificationCenter anywhere in the codebase. The app talks to you out loud instead of buzzing.']],
    x:{3:['in','ARCHIVE.ORG']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4']], home:''},
   {name:'JAMNUTZ · KEYBOARD', title:'Developer Advocate', r:'PLAYABLE · IN ANY KEY', term:[['c','grep -n "oscillator.type" jamnutz_homepage_v2_one_interactive.html'],['o','485:  oscillator.type = \'triangle\'; // Okinori\'s signature sound'],['c','grep -n "return 440" jamnutz_homepage_v2_one_interactive.html'],['o','471:  return 440 * Math.pow(2, ((octave - 4) * 12 + semitone - 9) / 12);'],['c','grep -n "key.style.left" jamnutz_homepage_v2_one_interactive.html'],['o','606:  key.style.left = `${((slot + 0.5) / totalWhiteKeys) * 100}%`;'],['c','grep -n blackMap jamnutz_homepage_v2_one_interactive.html'],['o','590:  const blackMap = { C#: 0.5, D#: 1.5, F#: 3.5, G#: 4.5, A#: 5.5 };'],['c','# ported verbatim into demo-keyboard.html, plus a scale lock'],['hi','play me →']], q:'Touch the keyboard. It stays in key.', load:{kind:'page',src:'demo-keyboard.html',label:'the circle keyboard, ported and playable, locked to a key'},
    mods:[
     ['VOICE',5,'code',"oscillator.type = 'triangle';\n// Okinori's signature sound","jamnutz_homepage…:485",'The synth voice, ported byte for byte from an early JAMNUTZ homepage. A triangle wave, the sound that shipped.'],
     ['PITCH',5,'code','return 440 * Math.pow(2,\n  ((octave - 4) * 12 + semitone - 9) / 12);','jamnutz_homepage…:471','Equal temperament in one line. Every circle knows its own frequency from the note name.'],
     ['LAYOUT',5,'code','key.style.left =\n  `${((slot + 0.5) / totalWhiteKeys) * 100}%`;','jamnutz_homepage…:606','Why the keys sit where they do. White keys on a lower ring, black keys nudged to half-steps between them, all placed by percentage so it scales to any width.'],
     ['IN KEY',5,'text','Pick a key and a scale; every touch snaps to the nearest note in it. The white circles show their scale degree, out-of-key circles dim. There is no wrong note.','demo-keyboard.html (new)','The part I added. A rule over free input, so anyone who touches it sounds musical. The same shape as a validator over a model.'],
     ['PLAY',4,'text','Click the circles, or use the home row A S D F G H J K L. Four voices, four scales, twelve keys, two octaves, real-time Web Audio.','demo-keyboard.html','It runs in the pane to the right. Play it.']],
    x:{3:['in','SCALE']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out2','x3']], home:''},
   {name:'EURORACK HARDWARE', title:'Technical Creative', r:'35 BOARDS · 0 ORDERED', term:[['c','find modules -name "*.kicad_pcb" | wc -l'],['hi','      35'],['c','ls -d modules/*/ | wc -l'],['o','      30'],['c','grep -c "(footprint" modules/seq8/seq8-guts.kicad_pcb'],['hi','     506'],['c','git rev-list --count HEAD'],['o','227'],['c','grep -cE "^\\|" modules/seq8/BOM-ELECTRONICS.md'],['o','166'],['c','python3 check.py | grep -E "FAIL|ordered"'],['bad','Nothing has been ordered.']], q:'Real Eurorack hardware, schematic to fab ready.', load:{kind:'page',src:'demo-hardware.html',label:'a board we designed, and the gate that says no'},
    mods:[
     ['BOARDS',4,'num',[['35','boards'],['506','parts on C10'],['30','modules'],['227','commits']],'find · git','Thirty modules in KiCad 9, the densest board 506 parts. Designed end to end, panels and guts.'],
     ['GATE',5,'code','#!/usr/bin/env python3\n"""check.py, THE FACTORY ROOT\'S ONE COMMAND."""','~/hardware/check.py:1-2','One command runs every fab rule. The board is not ready until it passes. The same shape as the software validators.'],
     ['COPPER',5,'text','THE COPPER FIELDS: DRC cannot see a pour that is not there','~/hardware/check.py:512','A rule DRC cannot catch, written into the gate by hand. Knowing what the automated check misses is the job.'],
     ['BOM',5,'text','Every line had its stock re-checked live at Digi-Key AND Mouser. Not one figure was carried on trust, and eleven of them turned out to be wrong.','modules/seq8/BOM-ELECTRONICS.md:3-5','A bill of materials is only real if the parts are in stock. So every line was checked live, and the wrong ones caught.'],
     ['ORDER',5,'text','Nothing has been ordered.','~/hardware/START-HERE.md','The gate is not fully cleared, so nothing is bought. Discipline before money, the same law as the trading bot.']],
    x:{1:['out','FAIL']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out2','x1']], home:''},
   {name:'EURORACK GRID', title:'Creative Technology', r:'457 MODULES · DEPLOYED', term:[['c','wc -l case/app.js case/style.css shared/engine.js'],['o','    7510 case/app.js'],['o','    3360 case/style.css'],['o','    5165 shared/engine.js'],['c','grep -c createGain shared/engine.js'],['o','283'],['c','grep -c createOscillator shared/engine.js'],['o','45'],['c','grep -c \'"arch"\' case/layoutlock.js'],['hi','457'],['c','git log --oneline | wc -l'],['o','184'],['c','ls case/toi-*.gen.js | wc -l'],['o','65'],['c','wrangler pages deploy dist --project-name=eurorackgrid --branch=main'],['ok','✨ Deployment complete! https://eurorackgrid.pages.dev']], q:'A modular synth in a browser tab.', load:{kind:'page',src:'demo-eurorackgrid.html',label:'the real roster: 101 module codes, 14 brands',href:'https://eurorackgrid.pages.dev/'},
    mods:[
     ['SCALE',4,'num',[['7,510','lines app.js'],['5,165','lines engine.js'],['457','modules'],['184','commits']],'wc -l · git log','The case, the engine, and every module pinned in layoutlock.js.'],
     ['CONTRACT',6,'code','create(ctx, emit) -> api {\n  ins, outs, setParam,\n  setChoice?, dispose }\nins: { node: AudioNode }\n  or { event: fn(value) }','engine.js:136-142','Every module is a closure returning the same shape. Instantiated in exactly one place in the case.','flow'],
     ['NODES',4,'list',['createGain  283','createOscillator  45','createBiquadFilter  26','createDelay  17','createAnalyser  11'],'engine.js','The DSP is quarantined in the engine. The case file itself makes three gains and two analysers.'],
     ['CABLE',5,'code','function drawCable(x1, y1, x2, y2,\n  sag, color, level, flash,\n  t, seat, seatB)','app.js:4349','The cables on this page. Four stroke passes, a moulded boot, a spring on the sag. Never shadowBlur.','flow'],
     ['NEVER SILENT',5,'text','after a template builds, sample the master output for ~1.8s. If it stays effectively silent, quietly re-roll a different template.','app.js:5898-5904','Validation by listening to its own output. A headless-Chrome hook (?audiocheck) measures real audio in QA.']],
    x:{1:['in','RE-ROLL']},
    cables:[['out0','in1'],['out1','in2'],['out2','in3'],['out3','in4'],['out4','x1']], home:''}];
  let pi=0, PR=P[0];


  /* ---------- glyphs: monoline, one stroke weight, 20x20, currentColor. OP-1 / Elektron register: geometry, not pictures ---------- */
  const GLYPH={
    prompt:'<path d="M3 4h14v9H9l-4 3v-3H3z"/><path d="M6.5 8.5h7"/>',
    wrench:'<path d="M13.5 3.5a4 4 0 0 0-5 5L3 14l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2-2z"/>',
    grid:'<rect x="3" y="3" width="5.5" height="5.5"/><rect x="11.5" y="3" width="5.5" height="5.5"/><rect x="3" y="11.5" width="5.5" height="5.5"/><rect x="11.5" y="11.5" width="5.5" height="5.5"/>',
    arrows:'<path d="M3 7h11m-3-3 3 3-3 3M17 13H6m3-3-3 3 3 3"/>',
    check:'<rect x="3" y="3" width="14" height="14" rx="2"/><path d="M6.5 10l2.5 2.5 4.5-5"/>',
    shield:'<path d="M10 2.5 16.5 5v5c0 4-3 6.5-6.5 7.5C6.5 16.5 3.5 14 3.5 10V5z"/>',
    alert:'<path d="M10 3l7.5 13H2.5z"/><path d="M10 8v4M10 14v.5"/>',
    file:'<path d="M5 2.5h7l3.5 3.5V17.5H5z"/><path d="M12 2.5V6h3.5M7.5 10h5M7.5 13h5"/>',
    delta:'<path d="M10 3.5 17 16.5H3z"/>',
    stack:'<path d="M10 3l7 3.5-7 3.5-7-3.5z"/><path d="M3 10l7 3.5 7-3.5M3 13.5 10 17l7-3.5"/>',
    radar:'<path d="M10 17a7 7 0 1 1 7-7"/><path d="M10 10l5-5"/><circle cx="10" cy="10" r="1.2" fill="currentColor"/>',
    list:'<path d="M7 5h10M7 10h10M7 15h10"/><circle cx="3.5" cy="5" r=".9" fill="currentColor"/><circle cx="3.5" cy="10" r=".9" fill="currentColor"/><circle cx="3.5" cy="15" r=".9" fill="currentColor"/>',
    bars:'<path d="M3 17v-6M8 17V7M13 17V4M18 17V8"/>',
    spark:'<path d="M10 2.5v15M2.5 10h15M4.7 4.7l10.6 10.6M15.3 4.7 4.7 15.3"/>',
    wave:'<path d="M2.5 10c1.5-5 3.5-5 5 0s3.5 5 5 0 3.5-5 5 0"/>',
    steps:'<rect x="2.5" y="7" width="3" height="6"/><rect x="7" y="7" width="3" height="6" fill="currentColor"/><rect x="11.5" y="7" width="3" height="6"/><rect x="16" y="7" width="1.5" height="6"/>',
    plant:'<path d="M10 17v-7"/><path d="M10 10c0-4 2.5-6 6-6 0 3.5-2.5 6-6 6zM10 13c0-3-2-5-5-5 0 3 2 5 5 5z"/>',
    midi:'<circle cx="10" cy="10" r="7"/><circle cx="10" cy="6.5" r=".9" fill="currentColor"/><circle cx="6.5" cy="8" r=".9" fill="currentColor"/><circle cx="13.5" cy="8" r=".9" fill="currentColor"/><circle cx="5.8" cy="11.5" r=".9" fill="currentColor"/><circle cx="14.2" cy="11.5" r=".9" fill="currentColor"/>',
    sliders:'<path d="M5 3v14M10 3v14M15 3v14"/><rect x="3" y="7" width="4" height="3" fill="currentColor"/><rect x="8" y="11" width="4" height="3" fill="currentColor"/><rect x="13" y="5" width="4" height="3" fill="currentColor"/>',
    drum:'<circle cx="10" cy="10" r="7"/><path d="M6.5 6.5l7 7M13.5 6.5l-7 7"/>',
    knob:'<circle cx="10" cy="10" r="7"/><path d="M10 10 6.5 5.5"/><circle cx="10" cy="10" r="1" fill="currentColor"/>',
    bolt:'<path d="M11.5 2.5 5 11h4.5L8.5 17.5 15 9h-4.5z"/>',
    gate:'<path d="M2.5 15h4V5h6v10h5"/>',
    ban:'<circle cx="10" cy="10" r="7"/><path d="M5 5l10 10"/>',
    braces:'<path d="M7.5 3C5.5 3 5.5 4.5 5.5 6v2c0 1.5-1 2-2.5 2 1.5 0 2.5.5 2.5 2v2c0 1.5 0 3 2 3M12.5 3c2 0 2 1.5 2 3v2c0 1.5 1 2 2.5 2-1.5 0-2.5.5-2.5 2v2c0 1.5 0 3-2 3"/>',
    download:'<path d="M10 3v10m-4-4 4 4 4-4M4 17h12"/>',
    hash:'<path d="M7 3 5.5 17M14.5 3 13 17M3.5 7.5h14M2.5 12.5h14"/>',
    pause:'<path d="M7 4v12M13 4v12"/>',
    watch:'<rect x="5" y="5.5" width="10" height="9" rx="2"/><path d="M7.5 5.5V3h5v2.5M7.5 14.5V17h5v-2.5M10 8v2.5h2"/>',
    eye:'<path d="M2.5 10c2.5-4 5-5.5 7.5-5.5s5 1.5 7.5 5.5c-2.5 4-5 5.5-7.5 5.5S5 14 2.5 10z"/><circle cx="10" cy="10" r="2.2"/>',
    speaker:'<path d="M3.5 7.5h3l4-3.5v12l-4-3.5h-3z"/><path d="M13 7.5a3.5 3.5 0 0 1 0 5M15.5 5.5a6.5 6.5 0 0 1 0 9"/>',
    loop:'<path d="M4 10a6 6 0 0 1 10.5-4M16 10a6 6 0 0 1-10.5 4"/><path d="M14.5 2.5v3.5H11M5.5 17.5V14H9"/>',
    noise:'<path d="M2.5 11h2V7h2v7h2V5h2v9h2V8h2v5h2v-3h1.5"/>',
    face:'<circle cx="7" cy="8" r="1.3" fill="currentColor"/><circle cx="13" cy="8" r="1.3" fill="currentColor"/><path d="M6.5 13h7"/>',
    scope:'<rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M4.5 10c1.5-4 2.5-4 4 0s2.5 4 4 0 2-3 3 0"/>',
    tag:'<path d="M3 3h6.5l7.5 7.5-6.5 6.5L3 9.5z"/><circle cx="6.5" cy="6.5" r="1.2" fill="currentColor"/>',
    toggle:'<rect x="2.5" y="6" width="15" height="8" rx="4"/><circle cx="13.5" cy="10" r="2.5" fill="currentColor"/>',
    moon:'<path d="M12 3a7 7 0 1 0 5 12A6 6 0 0 1 12 3z"/>',
    radio:'<rect x="2.5" y="8" width="15" height="9" rx="1.5"/><path d="M6 8l8-5"/><circle cx="7" cy="12.5" r="2"/><path d="M11.5 11h4M11.5 14h4"/>',
    cable:'<circle cx="4.5" cy="6" r="2"/><circle cx="15.5" cy="14" r="2"/><path d="M6.5 6c4 0 3 8 7 8"/>',
    bell:'<path d="M5 14V9a5 5 0 0 1 10 0v5l1.5 2H3.5z"/><path d="M8.5 17.5a1.5 1.5 0 0 0 3 0"/>',
    quote:'<path d="M5 12c-1.5 0-2.5-1-2.5-2.5S3.5 6.5 5 6.5 7.5 7.5 7.5 9c0 2.5-1.5 4-3.5 5M13 12c-1.5 0-2.5-1-2.5-2.5s1-3 2.5-3 2.5 1 2.5 2.5c0 2.5-1.5 4-3.5 5"/>'};
  /* module title -> glyph. anything unlisted falls back to its content kind */
  const ICON={PROMPT:'prompt',INTAKE:'prompt',BOARDS:'grid',COPPER:'shield',BOM:'list',ORDER:'ban',FACTORY:'bolt',SCHEDULE:'watch',MEMORY:'stack',GATES:'shield',PULSE:'wave',MEMBER:'tag',CATALOG:'grid',EDGE:'cable',STORE:'grid',CHECKOUT:'tag',AUTH:'shield',DELIVERY:'download',CLOCK:'steps',SCALES:'sliders','ONE FILE':'file',FILTER:'knob',SCALE:'sliders',OFFLINE:'braces',SIZE:'bars',INSTRUMENT:'knob',ANALYSER:'scope',PATCH:'cable',VOICE:'wave',PITCH:'knob',LAYOUT:'sliders','IN KEY':'gate',PLAY:'bolt',TOOLS:'wrench',CATALOG:'grid',FLEET:'grid',NODES:'grid',SCALE:'bars',TIERS:'bars',COMPAT:'arrows',VALIDATOR:'check',EVAL:'check',ENSURE:'shield',CATCH:'shield','THE ERROR':'alert',HEADER:'file',DELTA:'delta',SEAM:'delta',FIXTURES:'stack',CASES:'stack',SWEEP:'radar',SCAN:'radar',SCHEMA:'list',TASK:'list',MODEL:'spark',SWAY:'wave',BEAT:'steps','STEP REC':'steps',GROW:'plant','MIDI IN':'midi',CHANNELS:'sliders',SLOTS:'sliders','DRUM LANES':'drum','CC MAP':'knob',KNOBS:'knob',AUTO:'bolt',GATE:'gate','SKIP LIST':'ban',PARSE:'braces',CONTRACT:'braces',LAZY:'download',LOADGEN:'hash',INTERRUPT:'pause',RUNTIME:'watch',FOREGROUND:'eye',SESSION:'speaker',SPEAK:'speaker',BUFFER:'loop',LOOP:'loop',BROWN:'noise',PINK:'noise',FACE:'face',SCOPE:'scope',PRICE:'tag',MODES:'toggle',LATER:'moon',RADIO:'radio',CABLE:'cable','NEVER SILENT':'bell'};
  const KIND_ICON={cmd:'prompt',code:'braces',list:'list',num:'grid',text:'quote'};
  const glyph=(title,kind)=>'<svg class="mod-ico" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+(GLYPH[ICON[title]||KIND_ICON[kind]||'quote'])+'</svg>';
  /* ===== knob library, ported 1:1 from ~/modular-lab/case/toi.js, a different knob per project ===== */
  const D2R=Math.PI/180, kcirc=(g,x,y,R)=>{g.beginPath();g.arc(x,y,R,0,Math.PI*2);}, kptr=v=>{const a=(-135+270*v)*D2R;return [Math.sin(a),-Math.cos(a)];};
  function kscallop(g,cx,cy,R,N,fd){ g.beginPath(); for(let i=0;i<=200;i++){ const th=i/200*Math.PI*2, rr=R*(1-fd*0.5*(1+Math.cos(N*th))), x=cx+Math.sin(th)*rr, y=cy-Math.cos(th)*rr; i?g.lineTo(x,y):g.moveTo(x,y);} g.closePath(); }
  function k_metal(g,S,v,acc,ink,live){ const cx=S/2,cy=S/2,r=S/2-6; const [dx,dy]=kptr(v);
    g.fillStyle='rgba(0,0,0,.45)'; kcirc(g,cx,cy+2,r); g.fill();
    let body=g.createLinearGradient(cx-r*.35,cy-r*.45,cx+r*.4,cy+r*.9); body.addColorStop(0,'#cfd2d7'); body.addColorStop(.5,'#8e939d'); body.addColorStop(1,'#43454c');
    g.fillStyle=body; kcirc(g,cx,cy,r); g.fill(); g.strokeStyle='#20232c'; g.lineWidth=1.6; kcirc(g,cx,cy,r); g.stroke();
    g.strokeStyle='rgba(216,164,54,.32)'; g.lineWidth=1; for(let i=0;i<24;i++){ const a=(-135+270*i/23)*D2R,sx=Math.sin(a),sy=-Math.cos(a); g.beginPath(); g.moveTo(cx+sx*(r+2),cy+sy*(r+2)); g.lineTo(cx+sx*(r+4),cy+sy*(r+4)); g.stroke(); }
    const ir=r*.6; let cap=g.createLinearGradient(cx,cy-ir,cx,cy+ir); cap.addColorStop(0,'#a5adbd'); cap.addColorStop(1,'#5f6470'); g.fillStyle=cap; kcirc(g,cx,cy,ir); g.fill(); g.strokeStyle='rgba(32,35,44,.7)'; g.lineWidth=1; kcirc(g,cx,cy,ir); g.stroke();
    if(v>0.004){ g.lineCap='round'; g.strokeStyle=acc; g.lineWidth=2.2; g.beginPath(); g.arc(cx,cy,r+3.5,(-225)*D2R,(-225+270*v)*D2R); g.stroke(); }
    g.strokeStyle=live?'#fff':'#e2e6ee'; g.lineWidth=2.2; g.lineCap='round'; g.beginPath(); g.moveTo(cx+dx*ir*.25,cy+dy*ir*.25); g.lineTo(cx+dx*r*.9,cy+dy*r*.9); g.stroke();
    g.fillStyle='rgba(255,255,255,.16)'; g.beginPath(); g.ellipse(cx-r*.2,cy-r*.38,r*.25,r*.17,-0.5,0,Math.PI*2); g.fill(); }
  function k_fluted(g,S,v,acc){ const cx=S/2,cy=S/2,R=S/2-2,[dx,dy]=kptr(v);
    g.fillStyle='rgba(0,0,0,.5)'; kcirc(g,cx,cy+3,R); g.fill();
    let sg=g.createLinearGradient(cx-R*.45,cy-R*.55,cx+R*.5,cy+R*.65); sg.addColorStop(0,'#5c5c60'); sg.addColorStop(.5,'#242427'); sg.addColorStop(1,'#070708');
    kscallop(g,cx,cy,R,10,.135); g.fillStyle=sg; g.fill(); g.strokeStyle='rgba(0,0,0,.85)'; g.lineWidth=1; g.stroke();
    g.strokeStyle='rgba(255,255,255,.2)'; g.lineWidth=2; g.beginPath(); g.arc(cx,cy,R-1.5,(-210)*D2R,(-105)*D2R); g.stroke();
    const capR=R*.6; g.fillStyle='#0b0b0c'; kcirc(g,cx,cy,capR+2.5); g.fill();
    let cg=g.createRadialGradient(cx-capR*.2,cy-capR*.28,capR*.1,cx,cy,capR*1.1); cg.addColorStop(0,'#f6f6f8'); cg.addColorStop(1,'#8a8b8f'); g.fillStyle=cg; kcirc(g,cx,cy,capR); g.fill();
    g.strokeStyle='rgba(255,255,255,.07)'; g.lineWidth=.7; for(let k=2;k<11;k+=2){ kcirc(g,cx,cy,capR*k/11); g.stroke(); }
    g.fillStyle='rgba(255,255,255,.22)'; g.beginPath(); g.ellipse(cx-capR*.2,cy-capR*.4,capR*.35,capR*.22,-0.4,0,Math.PI*2); g.fill();
    g.strokeStyle='#5e5e62'; g.lineWidth=1; kcirc(g,cx,cy,capR); g.stroke();
    const pr=(R+capR)/2,pd2=Math.max(2,R*.075); g.fillStyle='rgba(0,0,0,.5)'; kcirc(g,cx+dx*pr,cy+dy*pr+.6,pd2); g.fill(); g.fillStyle='#f2f2f4'; kcirc(g,cx+dx*pr,cy+dy*pr,pd2); g.fill(); }
  function k_flutedD(g,S,v,acc){ const cx=S/2,cy=S/2,R=S/2-5,[dx,dy]=kptr(v); g.lineCap='round';
    g.strokeStyle='rgba(233,234,239,.18)'; g.lineWidth=2; g.beginPath(); g.arc(cx,cy,R+3.5,-225*D2R,45*D2R); g.stroke();
    if(v>0.001){ g.strokeStyle=acc; g.lineWidth=2.5; g.beginPath(); g.arc(cx,cy,R+3.5,-225*D2R,(-225+270*v)*D2R); g.stroke(); }
    g.fillStyle='rgba(0,0,0,.4)'; kcirc(g,cx,cy+3,R); g.fill();
    let sg=g.createLinearGradient(cx-R*.4,cy-R*.5,cx+R*.45,cy+R*.6); sg.addColorStop(0,'#3c3c40'); sg.addColorStop(1,'#080809'); kscallop(g,cx,cy,R,12,.10); g.fillStyle=sg; g.fill(); g.strokeStyle='#000'; g.lineWidth=1; g.stroke();
    const fr=R*.66; let fg2=g.createLinearGradient(cx,cy-fr,cx,cy+fr); fg2.addColorStop(0,'#262629'); fg2.addColorStop(1,'#09090a'); g.fillStyle=fg2; kcirc(g,cx,cy,fr); g.fill(); g.strokeStyle='rgba(255,255,255,.1)'; g.lineWidth=1; kcirc(g,cx,cy,fr-1.5); g.stroke();
    g.strokeStyle='#f2f2f4'; g.lineWidth=2.4; g.beginPath(); g.moveTo(cx+dx*fr*.15,cy+dy*fr*.15); g.lineTo(cx+dx*(R-2),cy+dy*(R-2)); g.stroke(); }
  function k_pointer(g,S,v,acc,ink){ const cx=S/2,cy=S/2,R=S/2-4,[dx,dy]=kptr(v); g.lineCap='round';
    g.strokeStyle=ink; g.lineWidth=2.4; kcirc(g,cx,cy,R); g.stroke();
    g.strokeStyle=acc; g.lineWidth=2.6; g.beginPath(); g.moveTo(cx+dx*R*.12,cy+dy*R*.12); g.lineTo(cx+dx*R*.84,cy+dy*R*.84); g.stroke(); }
  function k_line(g,S,v,acc,ink){ const cx=S/2,cy=S/2,disR=S/2-1,R=disR*.58,a0=-150,a1=150; const pa=(a0+(a1-a0)*v)*D2R,pdx=Math.sin(pa),pdy=-Math.cos(pa);
    g.font='700 '+Math.max(5,disR*.22)+'px "Space Mono", monospace'; g.textAlign='center'; g.textBaseline='middle';
    for(let i=0;i<=10;i++){ const aa=(a0+(a1-a0)*i/10)*D2R,sx=Math.sin(aa),sy=-Math.cos(aa); g.strokeStyle=ink; g.lineWidth=1.1; g.beginPath(); g.moveTo(cx+sx*(R+2),cy+sy*(R+2)); g.lineTo(cx+sx*(R+4.5),cy+sy*(R+4.5)); g.stroke(); g.fillStyle=ink; g.fillText(''+i,cx+sx*(disR-2.5),cy+sy*(disR-2.5)); }
    g.fillStyle='rgba(0,0,0,.45)'; kcirc(g,cx,cy,R); g.fill(); let cg=g.createRadialGradient(cx-R*.3,cy-R*.35,R*.1,cx,cy,R*1.05); cg.addColorStop(0,'#3a3b40'); cg.addColorStop(.6,'#151518'); cg.addColorStop(1,'#050506'); g.fillStyle=cg; kcirc(g,cx,cy,R); g.fill(); g.strokeStyle='#000'; g.lineWidth=1; kcirc(g,cx,cy,R); g.stroke();
    g.strokeStyle='#f2f2f4'; g.lineWidth=2.2; g.lineCap='round'; g.beginPath(); g.moveTo(cx,cy); g.lineTo(cx+pdx*R*.9,cy+pdy*R*.9); g.stroke(); }
  function k_ticks(g,S,v,acc,ink){ const cx=S/2,cy=S/2,R=S/2-4,[dx,dy]=kptr(v),tr=R*.92,dotR=Math.max(1,R*.07);
    for(let i=0;i<20;i++){ const t=i/19,a=(-135+270*t)*D2R; g.fillStyle=t<=v+0.001?acc:ink; kcirc(g,cx+Math.sin(a)*tr,cy-Math.cos(a)*tr,dotR); g.fill(); }
    g.strokeStyle=ink; g.lineWidth=2; kcirc(g,cx,cy,R*.6); g.stroke(); g.strokeStyle=acc; g.lineWidth=2.6; g.lineCap='round'; g.beginPath(); g.moveTo(cx,cy); g.lineTo(cx+dx*R*.55,cy+dy*R*.55); g.stroke(); }
  function k_sternLight(g,S,v,col){ const cx=S/2,cy=S/2,r=S/2-6,[dx,dy]=kptr(v);
    g.strokeStyle=col; g.lineWidth=1.6; kcirc(g,cx,cy,r); g.stroke();
    g.globalAlpha=.55; g.lineWidth=1; for(let i=0;i<24;i++){ const a=(-135+270*i/23)*D2R,sx=Math.sin(a),sy=-Math.cos(a); g.beginPath(); g.moveTo(cx+sx*(r+2),cy+sy*(r+2)); g.lineTo(cx+sx*(r+4),cy+sy*(r+4)); g.stroke(); } g.globalAlpha=1;
    const ir=r*.6; g.lineWidth=1.3; kcirc(g,cx,cy,ir); g.stroke();
    g.lineWidth=2.2; g.lineCap='round'; g.beginPath(); g.moveTo(cx+dx*ir*.25,cy+dy*ir*.25); g.lineTo(cx+dx*r*.9,cy+dy*r*.9); g.stroke(); }
  const KNOBS=[k_metal,k_fluted,k_flutedD,k_pointer,k_line,k_ticks];
  const STERN_LIGHT=new Set([1,7,13]); /* slots 2,8,14: uncolored STERN knob in a lighter theme shade */
  const drawKnob=(g,S,v,acc,live)=>k_metal(g,S,v,acc,'#8a8f9a',live);
  let curKnob=k_metal;
  let knobState=[];
  /* ===== semantic module viz, the right diagram for the content, 2step-reference style ===== */
  const VALc='#3ecf8e', STEPc='#ffb437';
  function vizFor(title,kind,content){ const t=(title+' '+JSON.stringify(content||'')).toLowerCase();
    if(kind==='num') return 'bars';                                  // real numbers -> a bar per number
    if(kind==='list') return 'leds';                                 // one lamp per real item
    if(/oscillator|triangle|\bsine\b|square|saw|waveform|\bwave\b|noise|\baudio\b|synth|kalimba|analyser|silent|scope/.test(t)) return 'wave';
    if(/envelope|attack|decay|\brelease|slew|adsr|ramp|\bgain\b|effort|latency|\bms\b|second|duration|buffer/.test(t)) return 'env';
    if(/\bstep|sequenc|pattern|\blane|\bclock|\bbeat|\barp|nightly|schedule|cron|three times a day/.test(t)) return 'steps';
    if(/\bknob|\bcc\b|macro|cutoff|filter|\bdepth|\brate\b|\bmix\b|\blevel|volume|\btempo|\bbpm|param/.test(t)) return 'knobs';
    if(/\bmap\b|maps|route|routing|channel|\bslot|tool|schema|tier|broker|scan|\bhost|dlopen|closure|contract|pending|promote|gate\b/.test(t)) return 'flow';
    return 'none'; }                                                 // plain code/text: no fake diagram
  function mkViz(type,W,content,ov){ const rnd=Math.random; const k=n=>Array.from({length:n},()=>({base:.3+.5*rnd(),amp:.06+.08*rnd(),rate:.35+.5*rnd(),phase:rnd()*6.28}));
    const numval=x=>{ let m=String(x).replace(/,/g,'').match(/([\d.]+)\s*([kKmM]?)/); if(!m) return 0; let n=parseFloat(m[1])||0; if(/k/i.test(m[2])) n*=1e3; if(/m/i.test(m[2])) n*=1e6; return n; };
    if(type==='knobs') return {type,n:W>=210?3:2,k:k(3)};
    if(type==='wave') return {type,wf:/triangle|\btri\b/.test(JSON.stringify(content).toLowerCase())?'tri':/square/.test(JSON.stringify(content).toLowerCase())?'square':/noise|brown|pink/.test(JSON.stringify(content).toLowerCase())?'noise':'sine'};
    if(type==='env') return {type,a:.18+.18*rnd(),d:.2+.18*rnd(),sst:.4+.25*rnd()};
    if(type==='steps'){ const n=16; return {type,n,on:Array.from({length:n},(_,i)=>i%4===0||rnd()>.5)}; }
    if(type==='leds'){ const items=Array.isArray(content)?content:[]; const n=(ov&&/^leds:\d+/.test(ov))?+ov.split(':')[1]:Math.min(12,Math.max(4,items.length||6)); return {type,n,k:k(n)}; }
    if(type==='bars'){ const items=Array.isArray(content)?content:[]; const vals=items.map(it=>numval(Array.isArray(it)?it[0]:it)); const mx=Math.max(1,...vals); const n=Math.max(1,vals.length); return {type,n,vals:vals.map(v=>Math.max(0.06,v/mx)), labels:items.map(it=>Array.isArray(it)?it[1]:'')}; }
    if(type==='flow') return {type,n:4,k:k(4)};
    return {type:'none'}; }
  function drawViz(g,W,H,st,t,acc,live){ g.clearRect(0,0,W,H); const mut='rgba(140,146,160,.4)'; const cy=H/2; const sp=live?1.7:1;
    if(st.type==='knobs'){ const dark=document.documentElement.classList.contains('t-dark'); const ink=dark?'rgba(233,234,239,.55)':'rgba(28,30,38,.5)'; const lightCol=(getComputedStyle(document.documentElement).getPropertyValue('--t-muted').trim()||ink); const useLight=STERN_LIGHT.has(pi); const gap=W/st.n; for(let i=0;i<st.n;i++){ const k=st.k[i]; let v=k.base+k.amp*Math.sin(t*k.rate*sp+k.phase); v=Math.max(0,Math.min(1,v)); g.save(); g.translate(gap*i+gap/2-23,cy-23); if(useLight) k_sternLight(g,46,v,lightCol); else curKnob(g,46,v,acc,ink,live); g.restore(); } return; }
    if(st.type==='wave'){ g.strokeStyle=live?acc:mut; g.lineWidth=2; g.lineCap='round'; g.beginPath(); const A=H*0.3, ph=t*(live?3:1.2); const N=Math.max(2,Math.round(W/4));
      for(let i=0;i<=N;i++){ const x=i/N, px=6+x*(W-12); let y; const u=x*6.283*2+ph;
        if(st.wf==='sine') y=Math.sin(u);
        else if(st.wf==='tri') y=Math.asin(Math.sin(u))*(2/Math.PI);
        else if(st.wf==='square') y=Math.sin(u)>0?1:-1;
        else y=(Math.sin(u*3.1)+Math.sin(u*7.3)+Math.sin(u*1.7))/2 + (Math.random()-.5)*0.3;
        const py=cy - y*A; i?g.lineTo(px,py):g.moveTo(px,py); } g.stroke(); return; }
    if(st.type==='env'){ const x0=8,x1=W-8, base=H-10, top=12; const aX=x0+(x1-x0)*st.a, dX=aX+(x1-x0)*st.d, sY=top+(base-top)*(1-st.sst), rX=x0+(x1-x0)*0.8;
      g.strokeStyle=live?acc:mut; g.lineWidth=2; g.lineCap='round'; g.lineJoin='round'; g.beginPath(); g.moveTo(x0,base); g.lineTo(aX,top); g.lineTo(dX,sY); g.lineTo(rX,sY); g.lineTo(x1,base); g.stroke();
      const prog=(t*sp*0.25)%1, dotx=x0+(x1-x0)*prog; let doty=base; if(dotx<aX) doty=base+(top-base)*((dotx-x0)/(aX-x0)); else if(dotx<dX) doty=top+(sY-top)*((dotx-aX)/(dX-aX)); else if(dotx<rX) doty=sY; else doty=sY+(base-sY)*((dotx-rX)/(x1-rX));
      g.beginPath(); g.arc(dotx,doty,3,0,7); g.fillStyle=live?acc:'#8e939d'; g.fill(); return; }
    if(st.type==='steps'){ const n=st.n, cw=(W-10)/n, ch=Math.min(15,H-20), step=Math.floor(t*(live?6:3))%n; for(let i=0;i<n;i++){ const on=st.on[i], hit=i===step&&on, x=5+i*cw; g.fillStyle=hit?acc:(on?STEPc:mut); if(hit){g.globalAlpha=.3;g.fillRect(x,cy-ch/2-2,cw-1.5,ch+4);g.globalAlpha=1;} g.fillStyle=hit?acc:(on?STEPc:mut); g.fillRect(x+1,cy-ch/2,cw-3,ch); } return; }
    if(st.type==='leds'){ const gap=W/st.n; const swp=Math.floor(t*(live?4:2))%st.n; for(let i=0;i<st.n;i++){ const col=(i===st.n-1)?acc:VALc; const on=live?(i<=swp):true; g.beginPath(); g.arc(gap*i+gap/2,cy,4.5,0,7); g.fillStyle=on?col:mut; g.fill(); if(on&&live&&i===swp){g.globalAlpha=.35;g.beginPath();g.arc(gap*i+gap/2,cy,8,0,7);g.fillStyle=col;g.fill();g.globalAlpha=1;} } return; }
    if(st.type==='bars'){ const gap=W/st.n, bw=Math.min(26,gap*0.5); for(let i=0;i<st.n;i++){ let v=st.vals[i]||0.06; if(live) v*= (0.92+0.08*Math.sin(t*2+i)); const h=(H-14)*v, x=gap*i+gap/2-bw/2, y=H-8-h; g.fillStyle=live?acc:'#8e939d'; g.fillRect(x,y,bw,h); g.fillStyle=mut; g.fillRect(x,H-7,bw,2); } return; }
    if(st.type==='flow'){ const n=st.n, ly=14, ry=H-14, lx=W*0.22, rx=W*0.78; for(let i=0;i<n;i++){ const y=14+(H-28)*(i/(n-1||1)); g.beginPath(); g.arc(lx,y,3.5,0,7); g.fillStyle=mut; g.fill(); } for(let i=0;i<n;i++){ const y=14+(H-28)*(i/(n-1||1)); g.beginPath(); g.arc(rx,y,3.5,0,7); g.fillStyle=mut; g.fill(); }
      const act=Math.floor(t*(live?1.5:0.7))%n, ay=14+(H-28)*(act/(n-1||1)), by=14+(H-28)*(((act+ (st.k[0]?2:1))%n)/(n-1||1)); g.strokeStyle=live?acc:'rgba(140,146,160,.6)'; g.lineWidth=2; g.beginPath(); g.moveTo(lx,ay); g.bezierCurveTo(W/2,ay,W/2,by,rx,by); g.stroke(); g.beginPath(); g.arc(lx,ay,4,0,7); g.fillStyle=live?acc:'#8e939d'; g.fill(); g.beginPath(); g.arc(rx,by,4,0,7); g.fill(); return; } }

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
      h+='<div class="mod" data-i="'+i+'" style="grid-column:span '+m[1]+'" role="button" tabindex="0" aria-label="'+esc(m[0])+'"><div class="mod-head"><span class="mod-led"></span>'+glyph(m[0],m[2])+'<span class="mod-title">'+esc(m[0])+'</span><span class="mod-src">'+esc(m[4])+'</span></div><div class="mod-body"><canvas class="mod-ctl"></canvas><div class="mod-art">'+card[m[2]](m[3])+'</div></div><div class="jacks">'+jacks+'</div></div>'; });
    rack.querySelectorAll('.mod').forEach(m=>m.remove()); rack.insertAdjacentHTML('beforeend',h);
    mods=Array.from(rack.querySelectorAll('.mod')); posCache={}; W_=null;
    knobState=mods.map((mEl,i)=>{ const M=pr.mods[i]; const ov=M[6]; const type=ov?ov.split(':')[0]:vizFor(M[0],M[2],M[3]); /* m[6] = explicit viz when the keyword pick is wrong (Law 3) */ const cv=mEl.querySelector('canvas.mod-ctl'); if(type==='none'){ if(cv) cv.remove(); return {type:'none'}; } const r=cv.getBoundingClientRect(); const DPRk=Math.min(2,window.devicePixelRatio||1); cv.width=Math.max(40,Math.round(r.width))*DPRk; cv.height=58*DPRk; const g=cv.getContext('2d'); g.setTransform(DPRk,0,0,DPRk,0,0); return mkViz(type, r.width, M[3], ov); });
  }
  const termEl=document.getElementById('termLines'); let termRun=0;
  const ftHead=feature.querySelector('.ft-head'), ftMount=feature.querySelector('.ft-mount'), ftStyle=document.getElementById('ftStyle');
  const ftTerm=feature.querySelector('.ft-term'); if(ftTerm) ftMount.appendChild(ftTerm); /* the terminal lives in the mount grid, under the element */
  /* ===== THE WORK, inline. Each project's page (demo-*.html) is fetched once and mounted INTO this page: no iframe, no window.
     Its <style> is nested under .ft-mount, its inline scripts run in a function scope, and whatever it schedules or plays
     (requestAnimationFrame, timers, AudioContexts, Audio elements) is tagged to the mount so the next project tears it down. ===== */
  const demoCache={}; let tok=null, curTok=null; window.__demoErrors=[];
  const _raf=window.requestAnimationFrame.bind(window), _st=window.setTimeout.bind(window), _si=window.setInterval.bind(window), _AC=window.AudioContext||window.webkitAudioContext, _Audio=window.Audio;
  const gated=cb=>{ const t=curTok; return function(...a){ if(t&&!t.alive) return; const prev=curTok; curTok=t; try{ return cb.apply(this,a); } finally{ curTok=prev; } }; };
  window.requestAnimationFrame=cb=>_raf(gated(cb));
  window.setTimeout=(cb,ms,...a)=>_st(typeof cb==='function'?gated(cb):cb,ms,...a);
  window.setInterval=(cb,ms,...a)=>_si(typeof cb==='function'?gated(cb):cb,ms,...a);
  if(_AC){ const AC=function(...a){ const ac=new _AC(...a); if(tok) tok.acs.push(ac); return ac; }; AC.prototype=_AC.prototype; window.AudioContext=AC; if(window.webkitAudioContext) window.webkitAudioContext=AC; }
  if(_Audio){ const AU=function(...a){ const el=new _Audio(...a); if(tok) tok.media.push(el); return el; }; AU.prototype=_Audio.prototype; window.Audio=AU; }
  function teardown(){ if(!tok) return; tok.alive=false; tok.acs.forEach(ac=>{ try{ ac.close(); }catch(e){} }); tok.media.forEach(m=>{ try{ m.pause(); }catch(e){} }); ftMount.querySelectorAll('audio,video').forEach(m=>{ try{ m.pause(); }catch(e){} }); [...ftMount.children].forEach(n=>{ if(n!==ftTerm) n.remove(); }); ftStyle.textContent=''; tok=null; }
  const WORDS=n=>/^(H1|H2|H3|H4|P|PRE|BLOCKQUOTE)$/.test(n.tagName)||n.classList.contains('facts')||n.classList.contains('sub')||n.classList.contains('lede')||n.classList.contains('role')||n.classList.contains('proj');
  async function mountDemo(pr){ teardown(); const L=pr.load; const t={alive:true,acs:[],media:[],src:L.src}; tok=t; ftMount.dataset.loading='LOADING '+(L.label||L.src).toUpperCase().slice(0,60);
    let html=demoCache[L.src]; if(html==null){ try{ html=await (await fetch(L.src)).text(); }catch(e){ html=''; } demoCache[L.src]=html; }
    if(tok!==t) return; delete ftMount.dataset.loading;
    const doc=new DOMParser().parseFromString(html,'text/html'); const wrap=doc.querySelector('.wrap'); const sec=doc.querySelector('main .section')||doc.querySelector('main')||doc.body;
    let css=[...doc.querySelectorAll('style')].map(x=>x.textContent).join('\n').replace(/(^|\n)\s*(body|html|:root)\s*\{/g,'$1&{');
    if(wrap){ const el=document.createElement('div'); el.className='ft-el'; const words=document.createElement('div'); words.className='ft-words';
      const fit=document.createElement('div'); fit.className='ft-fit'; el.appendChild(fit);
      [...wrap.children].forEach(n=>{ if(n.classList.contains('back')) return; (WORDS(n)?words:fit).appendChild(document.adoptNode(n)); });
      cutWords(words);
      ftMount.querySelectorAll('.back').forEach(n=>n.remove());
      if(el.children.length) ftMount.appendChild(el); else words.classList.add('ft-doc'); ftMount.appendChild(words); }
    else { const d=document.createElement('div'); d.className='ft-doc'; [...sec.children].forEach(n=>{ if(n.tagName==='SCRIPT'||n.classList.contains('back')) return; d.appendChild(document.adoptNode(n)); }); ftMount.appendChild(d); d.querySelectorAll('.back').forEach(n=>n.remove()); }
    ftStyle.textContent='.ft-mount{\n'+css+'\n}';
    const scripts=[...doc.querySelectorAll('script:not([src])')].map(x=>x.textContent);
    curTok=t; scripts.forEach(code=>{ try{ new Function(code)(); }catch(e){ window.__demoErrors.push(L.src+': '+(e&&e.message)); } }); curTok=null;
    fitElement(); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{ if(tok===t) fitElement(); }); _st(()=>{ if(tok===t) fitElement(); },400); }
  /* the words column shows the title, sub, lede, facts and ONE paragraph; the rest is cut in the mount only */
  function cutWords(words){ let seen=false; [...words.children].forEach(n=>{ if(/^(H1|H2|H3|H4)$/.test(n.tagName)||n.classList.contains('sub')||n.classList.contains('lede')||n.classList.contains('facts')) return;
    if(n.classList.contains('proj')||n.classList.contains('role')){ if(seen){ n.classList.add('ft-cut'); return; }
      [...n.childNodes].forEach(c=>{ const text=c.nodeType===3&&c.textContent.trim().length>0; if(c.nodeType!==1&&!text) return;
        if(!seen&&(text||c.tagName==='P')){ seen=true; return; } if(text){ const sp=document.createElement('span'); sp.className='ft-cut'; c.parentNode.insertBefore(sp,c); sp.appendChild(c); } else c.classList.add('ft-cut'); }); return; }
    if(seen) n.classList.add('ft-cut'); else seen=true; }); }
  /* an element taller than its 460px box is zoomed down so the whole thing shows; nothing scrolls, nothing clips */
  function fitElement(){ const el=ftMount.querySelector('.ft-el'), fit=el&&el.querySelector('.ft-fit'); if(!fit) return; if(window.innerWidth<=1100){ fit.style.zoom=''; fit.style.width=''; return; }
    fit.style.zoom='1'; fit.style.width='100%'; const have=el.clientHeight-24, need=fit.scrollHeight; if(need>have){ const k=Math.max(0.5,have/need); fit.style.zoom=k.toFixed(3); fit.style.width=(100/k).toFixed(2)+'%'; } }
  window.addEventListener('resize',()=>fitElement());
  function loadStage(pr){ const L=pr.load;
    ftHead.innerHTML='<span class="ft-cap">OUT · THE WORK</span><span class="ft-name">'+esc(pr.name)+'</span>'+(pr.r?'<span class="st-result">'+esc(pr.r)+'</span>':'')+(L.href?'<a class="ft-open" href="'+esc(L.href)+'" target="_blank" rel="noreferrer">OPEN ↗</a>':'');
    mountDemo(pr);
    /* the terminal: real commands typed, real output printed, scrolling up, looping */
    const run=++termRun; const T=pr.term||[]; termEl.innerHTML=''; let i=0;
    function line(){ if(run!==termRun) return; if(i>=T.length){ setTimeout(()=>{ if(run!==termRun) return; termEl.innerHTML=''; i=0; line(); },5200); return; }
      const [k,txt]=T[i++]; const el=document.createElement('div'); el.className=k;
      if(k==='c'){ let c=0; el.innerHTML='<span class="cur"></span>'; termEl.appendChild(el); const tick=()=>{ if(run!==termRun) return; c++; el.innerHTML=esc(txt.slice(0,c))+'<span class="cur"></span>'; if(c<txt.length) setTimeout(tick,22); else { el.innerHTML=esc(txt); setTimeout(line,260); } }; tick(); }
      else { el.textContent=txt; termEl.appendChild(el); while(termEl.children.length>9) termEl.removeChild(termEl.firstChild); setTimeout(line,k==='hi'?900:110); } }
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

  const HOP=0.8, REST=0.9; let lapStart=performance.now(), pulse=null;
  function walk(now){ const t=Math.max(0,(now-lapStart)/1000); const hops=plan.hops; const total=hops.length*HOP+REST; if(t>total){ lapStart=now; return walk(now); }
    const k=Math.floor(t/HOP);
    if(k<hops.length){ const h=hops[k], f=(t-k*HOP)/HOP; const p1=jackPos(h.c.from), p2=jackPos(h.c.to); if(p1&&p2){ const G=geom(p1.x,p1.y,p2.x,p2.y,h.c.sag); pulse=pointOn(G,f); pulse.color=h.c.color; }
      if(Date.now()>hold){ const target=f<0.5?h.from:h.to; if(cur!==target) show(target,f<0.5?null:h); } }
    else { pulse=null; if(Date.now()>hold){ if(plan.stopped){ if(cur!==-1) showStop(); } else if(hops.length&&cur!==hops[hops.length-1].to){ const h=hops[hops.length-1]; show(h.to,h); } } } }


  /* ---------- the bank: one fixed slot per project (Elektron pattern row). the lit slot is the project on the rack ---------- */
  const bank=document.getElementById('patchBank'); let bankTip=null;
  if(bank){ bank.style.setProperty('--n',P.length); bank.innerHTML=P.map((p,i)=>'<button class="bk" data-i="'+i+'" aria-label="'+esc(p.name)+'"><span>'+String(i+1).padStart(2,'0')+'</span></button>').join('');
    bankTip=document.createElement('div'); bankTip.className='bk-tip'; bankTip.hidden=true; bank.appendChild(bankTip);
    bank.addEventListener('click',e=>{ const b=e.target.closest('.bk'); if(!b) return; clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; loadProject(+b.dataset.i,false); });
    bank.addEventListener('pointerover',e=>{ const b=e.target.closest('.bk'); if(!b) return; const p=P[+b.dataset.i]; bankTip.innerHTML='<b>'+esc(p.name)+'</b>'+esc(p.q); bankTip.hidden=false; const r=b.getBoundingClientRect(), R=bank.getBoundingClientRect(); bankTip.style.left=Math.min(Math.max(0,r.left-R.left+r.width/2-110),R.width-220)+'px'; });
    bank.addEventListener('pointerleave',()=>{ bankTip.hidden=true; }); }
  function bankLight(){ if(!bank) return; bank.querySelectorAll('.bk').forEach((b,k)=>b.classList.toggle('on',k===pi)); }
  /* ===== the cycle: type the problem, re-rack, plug the patch in, run, pull, next ===== */
  const cyc={on:true,phase:'',t0:0,k:0,idleT:null,typing:null};
  const PLUG=0.12, RUN_LAPS=1;
  function typeTitle(q){ let c=0; titleEl.textContent=''; const step=function(){ if(cyc.typing!==step) return; c++; titleEl.textContent=q.slice(0,c); if(c<q.length) setTimeout(step,26); }; cyc.typing=step; step(); }
  function mount(i){ pi=(i+P.length)%P.length; PR=P[pi]; conns=[]; dying=[]; colorIdx=0; curKnob=KNOBS[pi%KNOBS.length]; build(PR); bankLight(); PR.cables.forEach(c=>connect(c[0],c[1],null,true)); replan(); typeTitle(PR.q); loadStage(PR); document.dispatchEvent(new CustomEvent('patch:project',{detail:{i:pi,name:PR.name,title:PR.title||''}})); /* the hero title slider listens */ lapStart=performance.now(); hold=0; cyc.phase='run'; cyc.t0=performance.now(); cur=-1; }
  function loadProject(i,instant){ mount(i); }  /* no fade: a hard patch change, like re-cabling a rack */
  function userTouch(){ if(!cyc.on&&!cyc.idleT) return; cyc.on=false; hold=0; lapStart=performance.now(); clearTimeout(cyc.idleT); cyc.idleT=setTimeout(()=>{ cyc.idleT=null; cyc.on=true; loadProject(pi+1,false); },45000); }
  document.getElementById('patchReset').addEventListener('click',()=>{ clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; conns=[]; colorIdx=0; PR.cables.forEach(c=>connect(c[0],c[1],null,false)); lapStart=performance.now(); hold=0; cyc.phase='run'; cyc.t0=performance.now(); });
  const prevB=document.getElementById('patchPrev'), nextB=document.getElementById('patchNext');
  if(prevB) prevB.addEventListener('click',()=>{ clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; loadProject(pi-1,false); });
  if(nextB) nextB.addEventListener('click',()=>{ clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; loadProject(pi+1,false); });
  /* the TOOLS cards under AI Work point at a bank slot, not a page: load it and scroll up to the rack */
  document.querySelectorAll('[data-jump]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); clearTimeout(cyc.idleT); cyc.idleT=null; cyc.on=true; loadProject(+a.dataset.jump,false); rack.scrollIntoView({behavior:'smooth',block:'start'}); }));
  /* attention: the cycle only advances while someone can see it and is not reading it */
  const REDUCED=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches; if(REDUCED) cyc.on=false;
  let seen=true, hovering=false, lastNow=0;
  if('IntersectionObserver' in window){ new IntersectionObserver(es=>{ es.forEach(e=>{ seen=e.isIntersecting||e.boundingClientRect.top>0; }); },{threshold:0.05}).observe(rack); } /* below the fold still counts as coming: only scrolled-past pauses */
  /* a pointer that MOVES over the rack means someone is reading: hold. a pointer that rests there is not: resume after 5 s */
  let hoverT=null; rack.addEventListener('pointermove',()=>{ hovering=true; clearTimeout(hoverT); hoverT=setTimeout(()=>{hovering=false;},5000); });
  rack.addEventListener('pointerleave',()=>{ hovering=false; clearTimeout(hoverT); });
  /* the work holds an interactive demo (knobs, a keyboard, a card); while the pointer is inside it, never cycle away */
  feature.addEventListener('pointerenter',()=>{ hovering=true; clearTimeout(hoverT); });
  feature.addEventListener('pointerleave',()=>{ hovering=false; });
  /* phones have no hover: while THE WORK is on screen and the reader scrolled or touched in the last 8 s, they are reading it; hold */
  let ftSeen=false, lastTouch=-1e9;
  if('IntersectionObserver' in window) new IntersectionObserver(es=>{ es.forEach(e=>{ ftSeen=e.isIntersecting; }); },{threshold:0.05}).observe(feature);
  const touched=()=>{ lastTouch=performance.now(); };
  window.addEventListener('scroll',touched,{passive:true}); window.addEventListener('touchstart',touched,{passive:true}); window.addEventListener('touchmove',touched,{passive:true});
  const reading=()=>ftSeen&&(performance.now()-lastTouch)<8000;
  const paused=()=>document.hidden||!seen||hovering||reading();
  const lit=()=>bank&&bank.querySelector('.bk.on');
  function cycle(now){ const dt=lastNow?now-lastNow:0; lastNow=now; if(!cyc.on) return; if(paused()){ cyc.t0+=dt; return; } const t=(now-cyc.t0)/1000;
    if(cyc.phase==='run'){ const lap=plan.hops.length*HOP+REST; const dwell=lap*RUN_LAPS; const b=lit(); if(b) b.style.setProperty('--p',Math.min(1,t/dwell).toFixed(3));
      if(t>dwell){ cyc.phase='swap'; loadProject(pi+1,false); } return; } }

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
    /* animate the varied controls (knobs / grid / leds / faders / matrix) on the visible modules */
    { const acc=getComputedStyle(document.documentElement).getPropertyValue('--t-acc').trim()||'#5e78b6'; const tt=now/1000;
      mods.forEach((mEl,i)=>{ const st=knobState[i]; if(!st||st.type==='none') return; const cv=mEl.querySelector('canvas.mod-ctl'); if(!cv) return; const DPRk=Math.min(2,window.devicePixelRatio||1); const live=mEl.classList.contains('live')||mEl.classList.contains('on'); drawViz(cv.getContext('2d'),cv.width/DPRk,cv.height/DPRk,st,tt,acc,live); }); }
    requestAnimationFrame(frame); }
  window.addEventListener('resize',()=>{W_=null;});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{W_=null;});

  const qp=new URLSearchParams(location.search).get('p'); /* QA: ?p=N opens project N, ?p=NAME too */
  let p0=0; if(qp!==null){ const n=P.findIndex(x=>x.name.toLowerCase()===qp.toLowerCase()); p0=n>=0?n:(+qp||0); }
  loadProject(p0,true); requestAnimationFrame(frame);
})();
