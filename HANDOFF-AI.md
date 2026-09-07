# HANDOFF · ai.html, JAde Wii, AI Solutions Engineer portfolio

Serve: `python3 /tmp/nocache_server.py` (no-cache, port 8765) or `cd ~/Downloads/jadewii-combined && python3 -m http.server 8765`, then open http://localhost:8765/ai.html
QA: headless Chrome or the CDP scripts in the scratchpad (`cdp2.mjs <url> <secs> [shot]`, `cdp-eval.mjs <url> <secs> <expr>`). virtual-time screenshots freeze the rAF loop; use the CDP scripts to test the cycle/animation/live iframes in real time.
index.html is the OTHER window's live designer site, NEVER touch or commit it (nor assets/site.js, artwork.html).

## What the page is
A hero, then the PROCESS RACK: 14 real projects, each a row of modules (a real source line with its file:line) wired with Eurorack Grid cables, over a STAGE (a terminal window: real commands + output on the left, the project itself on the right). It auto-plays: types the problem, walks the signal, moves to the next, loops. A numbered BANK jumps between projects. 23 themes (button top-right, Shift+T). Below the rack: AI Work, AI & Human Oversight, Technology Background, Plugins/Web Apps/Websites/iOS Apps, and a button that reveals the Educational-videos/music (YouTube) sections.

## Laws (keep these)
1. **AI SOLUTIONS ENGINEER is the point.** Every choice sharpens that title. YouTube and tangential creative work sit behind the bottom button, not on the main flow. Don't re-add breadth (the 6 web-instrument racks were removed as scope creep).
2. **No made-up content.** Every module quotes a real line with its file:line. Every terminal line is a command actually run with its real output. Moving repos (~/hybrid-jammin, ~/modular-lab) get pinned to a commit (`git show <sha>:path`).
3. **Every visualization must MEAN something.** The module viz is chosen from its content: numbers→bars (heights = the real numbers), lists→one LED per item, audio→its waveform, timing→an envelope, sequence→step cells, mapping→a connector, real parameters (CC/knob/filter/rate)→knobs. Plain code with no natural diagram shows NO viz, just the clean code line. Never decorative/random controls.
4. **Knobs are the STERN set, ported 1:1 from ~/modular-lab/case/toi.js** (metal, fluted, dark fluted, pointer, numeral dial, ticks). Each project uses a different style. Slots 2/8/14 use the uncolored STERN knob in a lighter theme shade (`k_sternLight`, `STERN_LIGHT` set in patch.js).
5. **Use what we built, verbatim**, real assets, not lookalikes (STERN knobs, Eurorack Grid cables, real deck data, the pixel avatar engine).
6. **Show the real product.** Where a site can be framed, the stage loads it live next to the code. Framable: eurorackgrid, modularmusician, plugincorp, jadewii.com, the wiistruments web apps. Blocked (x-frame-options SAMEORIGIN): jamnutz.com, unskoolerz.pages.dev, for those, either serve a local build (unskoolerz/ is a trimmed 9.9MB local build) or add a `frame-ancestors` header to their own Cloudflare deploy (Jade's call).
7. Fixed slots, no layout shift, crossfade off (hard cut), inner scroll, adapts to all 23 themes. Only the hero role line is bold. NO em dashes anywhere (copy law). No tacked-on 'why this is the job' self-explaining lines, let the work speak.

## Current state (2026-09-06)
- 16 projects (added HOW I RUN AGENTS at slot 2, EURORACK HARDWARE before EURORACK GRID): UNSKOOLERZ (leads; real app + code), PATCH ASSISTANT, SAFETENSORS-CHECK, AI USE-CASE SCREENER, STUDIO PLANTS, JAMNUTZ HARDWARE, TOI SEMIS, JAMNUTZ DESKTOP, JELLYBOI, NOISEFACE, WAVEFACE, TODOMAI, JAMNUTZ · KEYBOARD, EURORACK GRID.
- Semantic per-content viz + STERN knob library + per-project knob styles + uncolored STERN on slots 2/8/14.
- Live sites in the stage: UNSKOOLERZ (local build) and EURORACK GRID; both show the terminal (code) beside the live site.
- Interactive demos built: demo-keyboard.html (the ported circle keyboard + in-key lock), demo-unskoolerz.html (superseded by the real-app embed, kept).
- SEO/share: meta, canonical, OG + Twitter cards (images/og-ai.png), favicon/apple-touch icon, preconnect, skip link. Reader-aware pause (hidden tab / off-screen / pointer in rack or stage). prefers-reduced-motion respected. Hero title slider (Product Builder + role list; cut the list to taste in ai.html TITLES).
- EURORACK HARDWARE rack: stage = demo-hardware.html, an ANIMATED board (canvas: red/blue traces, gold pulses flowing like the cables, corner fiducials, IC) in the Studio-Plants stage style, with real board stats / check.py gate / copper law / live-checked BOM. HOW I RUN AGENTS rack: stage = demo-agents.html (real agent-ops evidence).
- STAGE STYLE (Jade's target = the Studio Plants demo): curated elements (title + real visual + explanation) on the right, NOT a live page load. demo-hardware/agents follow it. OPEN QUESTION: convert the two live-iframe stages (UNSKOOLERZ real app, EURORACK GRID) to this curated style too, or keep them live? Jade was split on this.
- PROJECTS-INVENTORY.md = every project on disk, the 14 proven skills, the agent-ops process, and the ranked plan for more racks.

## NEXT CLEAR TASK (do without Jade)
Both new racks are built (HOW I RUN AGENTS, EURORACK HARDWARE). Next, no input needed:
1. MOBILE QA at 390 and 820 across all 16 projects: the rack scrolls sideways, the stage stacks (terminal over the demo), the 16-slot bank fits, nothing clips. Use a 390px iframe wrapper (headless Chrome refuses windows under 500px). Fix any clipping, keep the fixed-slot law.
2. Sweep every module's viz against Law 3 in a couple of themes (LIGHT + one dark): confirm each diagram still means something and no stray knobs. Tune vizFor keywords if any module picked wrong.
3. Then decide the app-breadth trim (JELLYBOI/NOISEFACE/WAVEFACE/TODOMAI/keyboard) to tighten the AI focus, and the stage-style question below.

## Holds (need Jade)
- ANTHROPIC_API_KEY so the patch assistant / screener terminals can show a live run.
- frame-ancestors header on unskoolerz.pages.dev + jamnutz.com (to embed the live sites instead of local builds).
- Cut the hero title list; confirm the 14-project roster; swap ai.html into index.html when ready.

## Copy-paste for the next window
> Read ~/Downloads/jadewii-combined/HANDOFF-AI.md and PROJECTS-INVENTORY.md first. Serve on :8765 (python3 /tmp/nocache_server.py) and open ai.html. Do the NEXT CLEAR TASK: a full mobile QA pass at 390 and 820 across all 16 projects (use a 390px iframe wrapper; the rack scrolls sideways, the stage stacks, the 16-slot bank fits, nothing clips), then sweep every module viz against Law 3 in LIGHT and one dark theme. Follow all 7 Laws, especially: no made-up content (real file:line, real command output), viz must mean something (no random knobs), NO em dashes, no self-explaining "why this is the job" lines. QA with the CDP scripts in the scratchpad. Do not touch index.html/site.js/artwork.html. When done, say "done" with what to look at and move to the next item without asking. Work nonstop.
