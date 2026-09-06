# HANDOFF · ai.html (the AI Solutions Engineer portfolio page) · 2026-09-06

Serve: `cd ~/Downloads/jadewii-combined && python3 -m http.server 8765` then open http://localhost:8765/ai.html
QA: headless Chrome screenshots (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=... "http://localhost:8765/ai.html?theme=night-blue"`), then Jade by eye.
index.html is the live designer site and is NOT touched by this work. ai.html replaces it only on Jade's say-so.

## What is built (all in this repo)
- `ai.html` hero: portrait, "AI Solutions Engineer" bold under it, "PRODUCT BUILDER | CREATIVE TECHNOLOGY" in Space Mono under that, body copy Inter 300.
- PROCESS RACK `assets/patch.js` + `assets/patch.css`: one 24-column rack, always full width. Six real projects (P[] in patch.js). Each module = one REAL artifact with its file:line (cmd, code, list, num, text). Modules span different widths per project. Cables = Eurorack Grid renderer ported verbatim from ~/modular-lab/case/app.js. Rack is live (drag OUT to IN, dblclick unpatch, RESET, prev/next). Cycle: the problem types as the title, rack crossfades to the next project ALREADY PATCHED, signal walks two laps with a note per module, next.
- STAGE below the rack: a terminal window. Left pane types real commands and prints their real output (captured 2026-09-06 from the repos). Right pane loads the project (demo-*.html pages, eurorackgrid.pages.dev live; jamnutz.com refuses framing so it shows images/results/jamnutz-hardware.png, a screenshot from today).
- THEMES `assets/theme.js` + `assets/theme.css`: 23 hybrid-jammin themes, button top right, Shift+click or Shift+T cycles, hover bubble, `?theme=name` for QA links, `?tip=1` forces the bubble.
- SEQUENCE lane under the rack (Patch Assistant run as a 16-step row) still exists; decide whether it stays now that the rack itself is per-project.

## Laws that came out of today (Jade's words, keep them)
- NO made-up content. Every module quotes a real line with its file:line. If a project has no real artifact on disk, it does not get a rack.
- Fixed slot widths: the rack is always the same total width; modules vary, the row never does. Same for every site she owns.
- Modules: lighter shade of the theme for the body, darker for the head, jack strip between. Outline in the theme text colour.
- No layout shift from state text. Fixed-width boxes, tabular numerals.
- Transitions: crossfade, no self-patching theatre.
- The hero: only "AI Solutions Engineer" is bold.

## NEXT TASKS, in order. 1 to 3 need nothing from Jade.
1. **Add real racks for more projects.** Candidates with sources on disk: TOI semis (~/modular-lab/case/toi.js), hybrid-jammin JUCE app (~/hybrid-jammin native/Source, 23 themes, sequencer devices), NoiseFace / WaveFace (images/apps/ios, App Store links in index.html), TODOMAI (images/websites/todomai.png; find its source before writing one word), JELLYBOI (find the Xcode project; the audio lifecycle checklist is the story). Method: Explore agent reads the source, returns verbatim artifacts with file:line, you write the P[] entry + a term[] session of real commands and outputs you actually ran. Never write a card you cannot point at.
2. **Mobile pass.** Under 1100px the rack scrolls sideways and the stage stacks. Screenshot at 390px and 820px, fix clipping, keep the fixed-slot law.
3. **Decide the SEQUENCE lane.** Either wire it to the current project (each project's real step list) or remove it. Do not leave two competing stories.
4. (Jade) Look at the cycle timing and cable feel by eye. Then: swap ai.html into index.html or keep it at /ai.html.
5. (Jade) ANTHROPIC_API_KEY so eval.py and the patch assistant can run live; then the terminal panes can show a live run instead of the offline ones.

## Deploy
Repo pushes to github.com/jadewii/jadewii-site (main). Whether Cloudflare Pages builds from the push or from wrangler, check before assuming ai.html is public.
