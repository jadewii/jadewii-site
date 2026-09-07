# HANDOFF · ai.html — JAde Wii, AI Solutions Engineer portfolio

Serve: `python3 /tmp/nocache_server.py` (no-cache, port 8765) or `cd ~/Downloads/jadewii-combined && python3 -m http.server 8765`, then open http://localhost:8765/ai.html
QA: headless Chrome or the CDP scripts in the scratchpad (`cdp2.mjs <url> <secs> [shot]`, `cdp-eval.mjs <url> <secs> <expr>`). virtual-time screenshots freeze the rAF loop; use the CDP scripts to test the cycle/animation/live iframes in real time.
index.html is the OTHER window's live designer site — NEVER touch or commit it (nor assets/site.js, artwork.html).

## What the page is
A hero, then the PROCESS RACK: 14 real projects, each a row of modules (a real source line with its file:line) wired with Eurorack Grid cables, over a STAGE (a terminal window: real commands + output on the left, the project itself on the right). It auto-plays: types the problem, walks the signal, moves to the next, loops. A numbered BANK jumps between projects. 23 themes (button top-right, Shift+T). Below the rack: AI Work, AI & Human Oversight, Technology Background, Plugins/Web Apps/Websites/iOS Apps, and a button that reveals the Educational-videos/music (YouTube) sections.

## Laws (keep these)
1. **AI SOLUTIONS ENGINEER is the point.** Every choice sharpens that title. YouTube and tangential creative work sit behind the bottom button, not on the main flow. Don't re-add breadth (the 6 web-instrument racks were removed as scope creep).
2. **No made-up content.** Every module quotes a real line with its file:line. Every terminal line is a command actually run with its real output. Moving repos (~/hybrid-jammin, ~/modular-lab) get pinned to a commit (`git show <sha>:path`).
3. **Every visualization must MEAN something.** The module viz is chosen from its content: numbers→bars (heights = the real numbers), lists→one LED per item, audio→its waveform, timing→an envelope, sequence→step cells, mapping→a connector, real parameters (CC/knob/filter/rate)→knobs. Plain code with no natural diagram shows NO viz — just the clean code line. Never decorative/random controls.
4. **Knobs are the STERN set, ported 1:1 from ~/modular-lab/case/toi.js** (metal, fluted, dark fluted, pointer, numeral dial, ticks). Each project uses a different style. Slots 2/8/14 use the uncolored STERN knob in a lighter theme shade (`k_sternLight`, `STERN_LIGHT` set in patch.js).
5. **Use what we built, verbatim** — real assets, not lookalikes (STERN knobs, Eurorack Grid cables, real deck data, the pixel avatar engine).
6. **Show the real product.** Where a site can be framed, the stage loads it live next to the code. Framable: eurorackgrid, modularmusician, plugincorp, jadewii.com, the wiistruments web apps. Blocked (x-frame-options SAMEORIGIN): jamnutz.com, unskoolerz.pages.dev — for those, either serve a local build (unskoolerz/ is a trimmed 9.9MB local build) or add a `frame-ancestors` header to their own Cloudflare deploy (Jade's call).
7. Fixed slots, no layout shift, crossfade off (hard cut), inner scroll, adapts to all 23 themes. Only the hero role line is bold. No em dashes in copy.

## Current state (2026-09-06)
- 14 projects: UNSKOOLERZ (leads; real app + code), PATCH ASSISTANT, SAFETENSORS-CHECK, AI USE-CASE SCREENER, STUDIO PLANTS, JAMNUTZ HARDWARE, TOI SEMIS, JAMNUTZ DESKTOP, JELLYBOI, NOISEFACE, WAVEFACE, TODOMAI, JAMNUTZ · KEYBOARD, EURORACK GRID.
- Semantic per-content viz + STERN knob library + per-project knob styles + uncolored STERN on slots 2/8/14.
- Live sites in the stage: UNSKOOLERZ (local build) and EURORACK GRID; both show the terminal (code) beside the live site.
- Interactive demos built: demo-keyboard.html (the ported circle keyboard + in-key lock), demo-unskoolerz.html (superseded by the real-app embed, kept).
- SEO/share: meta, canonical, OG + Twitter cards (images/og-ai.png), favicon/apple-touch icon, preconnect, skip link. Reader-aware pause (hidden tab / off-screen / pointer in rack or stage). prefers-reduced-motion respected. Hero title slider (Product Builder + role list; cut the list to taste in ai.html TITLES).
- PROJECTS-INVENTORY.md = every project on disk, the 14 proven skills, the agent-ops process, and the ranked plan for more racks.

## NEXT CLEAR TASK (do without Jade)
Add a **"HOW I RUN AGENTS"** rack — the differentiator no other candidate has — using real artifacts already on disk (see PROJECTS-INVENTORY.md §C): the nightly `claude -p` factory under launchd (~/homeschool/factory/run-nightly.sh:14, NIGHTLY-PROMPT.md:9, the plist Hours 3/11/19), the 65 handoff docs and 111 memory notes, the two custom agent skills (~/.claude/skills/module-design, module-ship), and the one-command gates (hardware/check.py, homeschool/deploy.sh). Modules: real lines with file:line; terminal: commands actually run (`grep -c`, `ls | wc -l`, `git`); stage: an honest artifact (a factory/pending listing, or a check.py run). Follow Law 3 for the viz (this is mostly `flow`/`steps`/`leds`, not knobs).
Then: mobile QA at 390/820, and decide whether to trim JELLYBOI/NOISEFACE/WAVEFACE/TODOMAI/keyboard (app breadth) to tighten the AI focus.

## Holds (need Jade)
- ANTHROPIC_API_KEY so the patch assistant / screener terminals can show a live run.
- frame-ancestors header on unskoolerz.pages.dev + jamnutz.com (to embed the live sites instead of local builds).
- Cut the hero title list; confirm the 14-project roster; swap ai.html into index.html when ready.

## Copy-paste for the next window
> Read ~/Downloads/jadewii-combined/HANDOFF-AI.md and PROJECTS-INVENTORY.md first. Serve on :8765 (python3 /tmp/nocache_server.py) and open ai.html. Then do the NEXT CLEAR TASK: build the "HOW I RUN AGENTS" rack from real on-disk artifacts (nightly claude -p factory under launchd, 65 handoffs, 111 memory notes, 2 agent skills, one-command gates), following all 7 Laws — especially Law 3 (viz must mean something; no random knobs) and Law 2 (no made-up content; real file:line, real command output). QA every change with the CDP scripts in the scratchpad at 1400/820/390. Do not touch index.html/site.js/artwork.html. When done, say "done" with what to look at and move to the next item without asking. Work nonstop.
