# PROJECTS INVENTORY · what exists on disk, what it proves, how to use it · 2026-09-06

Built from three read-only sweeps of the disk plus spot checks. Every line here points at a file. Sizes are `wc -l`, commit counts are `git rev-list --count HEAD`, dates are last commit or newest mtime. Nothing here is a claim without a path.

## A. Every project

### Live on the web (deployed, real users or real URLs)
| # | Project | Path | What it is (source line) | Stack | Size | Status | AI in the code |
|---|---|---|---|---|---|---|---|
| 1 | JAMNUTZ web studio | ~/Documents/jamworld | HANDOFF.md:5 "everything deployed to jamnutz.com" | React 19, Vite, Clerk, Stripe, Cloudflare Pages + Workers + KV | 93,362 lines, 1,424 commits, 2026-09-06 | LIVE, paying users, live-mode Stripe checkout verified (HANDOFF.md:9-12) | WebMIDI (src/lib/midi/midiAccess.js:22). No LLM |
| 2 | Eurorack Grid | ~/modular-lab | HANDOFF.md:3 "Browser-based Eurorack modular playground... 100+ original brands" | vanilla JS + Web Audio, generator scripts, Cloudflare Pages | app.js 7,510 + engine.js 5,165 + 67 generated files 50,122 lines, 184 commits | LIVE eurorackgrid.pages.dev; code-level audit of 416 modules (case/AUDIT.md:3) | none |
| 3 | UNSKOOLERZ (homeschool) | ~/homeschool | PLAN.md:6-7 positions against Khan / Miacademy | Vite app, Cloudflare Pages, 2 Workers, nightly content factory | ~30,364 lines app/src, 13 commits, 2026-08-23 | LIVE unskoolerz.pages.dev; tests app/test/plan.test.js | **YES**: tutor-worker/src/index.js:13 `import Anthropic`, :74 `model: "claude-opus-5"`; functions/api/tts.js:57 OpenAI speech; factory/run-nightly.sh:14 runs `claude -p` under launchd |
| 4 | plugincorp.org | ~/dev/plugincorp.org | package.json:6 "TOI keyboards store (Stripe + R2 + download codes)" | Cloudflare Pages Functions, Stripe v22, Clerk backend, R2 presigning | 604 lines across 19 API functions, 125 commits, 2026-08-23 | LIVE project "plugincorp"; checkout (functions/api/create-checkout.js:11), webhook, billing portal, entitlements, license refresh | none |
| 5 | modularmusician | ~/modularmusician | HANDOFF.md:3 "LIVE: https://modularmusician.pages.dev" | Vite + React, Pages Functions, KV + R2, scraped catalog of 3,652 module images, embedded radio | 10,135 lines, 183 commits, 2026-09-01 | LIVE; membership tiers defined, Stripe not wired | none |
| 6 | jadewii.com (music store) | ~/jadewii.com | package.json name "music-store" | Next.js, Netlify, Backblaze B2 | 1,306 lines ts/tsx, 83 commits, 2025-12-07 | live domain, NS move to Cloudflare in progress | none |
| 7 | jamnutz.com marketing | ~/dev/jamnutz.com | README.md:3 "Creative Audio Apps for iOS, watchOS & macOS" | Next.js 15, Tailwind 4, Netlify | 932 lines, 10 commits | live | none |
| 8 | Wiistruments catalog | ~/wiistruments | 20 app tiles, tip jar | static HTML | 1 commit 2026-09-06 | built, not deployed | none |
| 9 | THIS PAGE, ai.html | ~/Downloads/jadewii-combined | ai.html title "JAde Wii · AI Solutions Engineer" | static HTML + 3 JS files | ai.html 2,061 lines | local, not committed | the racks quote anthropic tool use |

### Shipped to stores
| # | Project | Path | Source line | Stack | Size | Status | AI |
|---|---|---|---|---|---|---|---|
| 10 | NoiseFace | ~/Documents/NoiseFace | PROJECT_OVERVIEW.md:4 "12-color noise generator with modulation, presets, and real-time control" | SwiftUI + AVAudioEngine, iOS + tvOS | 8,497 lines, 56 commits | APP STORE id6754266069; .xcarchive + .ipa on disk | none |
| 11 | WaveFace | ~/Documents/WaveFace | APP_STORE_METADATA.md:5 | SwiftUI + StoreKit 2 | 3,638 lines, 14 commits | APP STORE id6754204480, v1.1; 4 archives | none |
| 12 | WaveFaceARP | ~/Documents/WaveFaceARP | README.md:3 "expressive iOS arpeggiator app" | SwiftUI + StoreKit | 3,512 lines, 4 commits | post-ship fork, not shipped | none |
| 13 | TOI / Plugin Corp plugin line | ~/plugincorp/plugins | BUILD.md:3 "written in Cmajor (DSP) + HTML/JS (faceplate) and built into VST3 / AU / Standalone" | Cmajor, JUCE C++, Python + bash | 123 plugin dirs, 40,501 lines of .cmajor, 5,295 lines chassis, 194 commits, 2026-09-06 | shipping pipeline real: scripts/notarize-mac.sh:28 notarytool; auval-sweep.sh; daw-load-pass.sh; Windows Inno Setup installer | none |

### Desktop apps and tools (built, run, not yet sold)
| # | Project | Path | Source line | Stack | Size | Status | AI |
|---|---|---|---|---|---|---|---|
| 14 | JAMNUTZ desktop (Hybrid Jammin) | ~/hybrid-jammin | README.md:3 "Plug a hardware sequencer into your Mac. Every track plays a real instrument plugin." | JUCE C++ | 11,786 lines native/Source, 123 commits, 2026-09-06 | RUNS; full notarize recipe ship-mac.sh:2-3, not run | PLAN.md:35 Claude SMART CHAIN planned, not built |
| 15 | Plugin Center / Hub | ~/plugincorp/hub | HANDOFF-HUB.md:3 "Arturia-Software-Center-shaped LIBRARIAN" | C++ + embedded httplib + webview | 748 lines own source | ship-mac.sh exists | none |
| 16 | GRID DAW | ~/plugincorp/grid-daw | HANDOFF-GRIDDAW.md:3 "native macOS DAW that hosts VST3 + AU plugins and sequences them from the grid" | JUCE + React | scaffold | phase 1 | none |
| 17 | Showcase DAW | ~/plugincorp/showcase-daw | SHOWCASE.md:3 "A stage, not a studio" | JUCE | 172 files | prototype | none |
| 18 | MANGLER iOS AUv3 | ~/plugincorp/mangler-ios | PLAN.md:3 "loads as an AUv3 audio effect in AUM / GarageBand" | C++ / Obj-C++ | 840 files, has qa/ | in progress | none |
| 19 | TOI iOS | ~/plugincorp/toi-ios | IPAD-KICKOFF.md:3 "PARKED" | iOS | 148 files | parked | none |
| 20 | KISMET / KUDOMI app | ~/plugincorp/kismet-app | sequencer app | JUCE CMake | 172 files | prototype | none |
| 21 | AI ART STUDIO | ~/ai-art | HANDOFF.md:3-5 "type a sentence, get art, put it on a real Eurorack panel" | Python server over InvokeAI graph API, SDXL/Flux + LoRAs | server.py 1,099 + index.html 1,191, 18 commits | local, proven end to end; inkcheck.py:2 scores ink "the way a fab does" | **YES**: generative pipeline, LoRA stacking (server.py:54) |
| 22 | STERN hardware factory | ~/hardware | START-HERE.md:3 "One entry point. Read this, then python3 check.py, then work." | Python + KiCad 9 via kicad-cli (check.py:474) | 3,766 lines Python, 30 module dirs, 35 .kicad_pcb, 227 commits | NOT ordered (START-HERE.md:33); DRC-aware gate laws (check.py:512); BOM-PRICED.md, FAB-SPEC.md, PCBWay question files | none in code |
| 23 | gridpad (iPad) | ~/ios/gridpad | README.md:7 | Swift WKWebView shell + Vite synth studio | 3,795 lines, 2 commits | builds locally | none |
| 24 | ModularRadio (SwiftUI) | ~/dev/modular-radio | MODULAR_UI_SYSTEM.md:2 multi-device layout system | Swift/SwiftUI + AVFoundation DSP | 3,803 lines, 41 commits | Xcode only | none |
| 25 | ModularRadio JUCE port | ~/dev/modular-radio---JUCE | PROJECT_OVERVIEW.md:8 port to JUCE | JUCE + SoundTouch | 10,146 lines, 20 commits | builds | none |
| 26 | rosita-ios | ~/Developer/Projects/rosita-ios | README.md:3 "iOS synthesizer app with piano keyboard, 8-track sequencer" | SwiftUI + AVAudioEngine | 12,608 lines, 70 commits | not shipped | none |
| 27 | Librito | ~/Documents/xCode/Librito | README.md:3 "music streaming from Archive.org with a powerful journaling system" | SwiftUI iOS/macOS | 14,983 lines, 4 commits | not shipped | none |
| 28 | TODOMAI | ~/Documents/xCode/Todomai-iOS | README.md:3 "minimal watchOS app for managing tasks with voice input" | SwiftUI | 9,679 lines, 3 commits | not shipped | AVSpeechSynthesizer TodomaiApp.swift:198 |
| 29 | Calemai | ~/Documents/xCode/Calemai | calendar fork of TODOMAI | watchOS/iOS | 10,327 lines, 11 commits | not shipped | AVSpeech |
| 30 | knobs | ~/Documents/xCode/knobs | no README | SwiftUI | 39,461 lines, 1 commit | control library | none |
| 31 | Klinmai / DesktopCleaner | ~/Developer/Projects/DesktopCleaner | README.md:3 "native macOS menu bar app that organizes your desktop" | Swift | 2,612 lines | site at klinmai-site | none |
| 32 | SmartDrop, KlinmaiPro, WebsiteBuilder, HabitTracker, Oscilloscope Watch | ~/Developer/Projects, ~/Documents/xCode | small Swift apps and stubs | Swift | 168 to 3,332 lines each | scratch | none |

### Embedded and retro (the bridge toward hardware and robotics)
| # | Project | Path | Source line | Stack | Size | Status |
|---|---|---|---|---|---|---|
| 33 | JamBoi (GBA ROM) | ~/gameboy | HANDOFF.md:7-10 "music-making tool... shipped as a Game Boy Advance ROM, to run on the Analogue Pocket" | C++ on Butano | 9,800 lines own code | builds gameboy.elf |
| 34 | PLINKBOI (GBA ROM) | ~/gaames/plinkboi | HANDOFF.md:7 "physics marble-machine that plays music" | C++ on Butano | in progress | |
| 35 | JW-CZ for SNES | ~/gaames/snes | HANDOFF.md:3-5 "65816 main program... SPC700 sound driver" | 65816 + SPC700 assembly, Python generators | main.s 2,455 + driver.s 394 | builds |
| 36 | FOLIO e-paper frame | ~/hardware (HANDOFF-FOLIO.md, APP-PLAN.md) | Raspberry Pi HAT+ dev kit, WiFi + app | Python + KiCad | plan + boards | first sellable module planned |

### Watch fleet (17 apps, ~/Documents/watch-apps, SwiftUI watchOS, every one has PROJECT.md)
jellyboi 1,252 lines (flagship), picnic 2,855 (engine pattern source), wristgrid 1,991 (BLE MIDI out, Midi.swift:12), bubbleboi 837, maestro 741 (staff notation), scaleboi 689, todoboi 661 (voice), boiband 637, beetleboi 592, fishboi 550, talkboi 545 (theremin + BLE MIDI to Ableton), bigeye 489, gridboi 461, humboi 456, dragonscales 429, ghostboi 251, skyboi 220. Sixteen built to the simulator and captured 2026-09-06 (images/apps/watch/).

### Research, content, business
| # | Project | Path | Source line | Size | Status |
|---|---|---|---|---|---|
| 37 | Trading research | ~/trading | PLAN.md:4-5 "No real money until gates pass. Backtest → out-of-sample → paper trade" | 2,028 lines Python | pre-live, gates written first |
| 38 | YouTube pixel pipeline | ~/youtube | PIPELINE.md:3 "single source of truth for making channel videos in the retro pixel style" | 20,584 lines Python (PIL + ffmpeg) | shipped MP4s (HANDOFF.md:9) |
| 39 | Printify store | ~/eurogrid | README.md:1 custom HTML store with Printify fulfillment | deploy.sh + wrangler | built |
| 40 | Modulito design brief | ~/dev/modulito-design | README.md:6 | 209 lines md | brief |
| 41 | 8-bit Avatar Maker | ~/dev/avatar-maker | single 974-line HTML toy | | done |
| 42 | patch-assistant, safetensors-check, ai-use-case-screener | ~/demos/* | already racks 1 to 3 | | |

## B. What we know that we did not know we know (skills the files prove, mapped to the AI Solutions Engineer job)

An AI Solutions Engineer prototypes with LLM APIs, integrates them into real systems, proves them with evals, ships them safely, and explains them to customers. The disk shows all five, most of it never labelled that way:

1. **Production LLM integration, not a notebook.** tutor-worker/src/index.js: Anthropic SDK on a Cloudflare Worker, secret via `wrangler secret put` (index.js:9), inputs clamped to 40/4000 chars, `output_config: { effort: "low" }` chosen for cost and speed (index.js:74-78). Answer order rule: the card's authored content first, the model second (homeschool/HANDOFF.md:2243).
2. **Unattended agents on a schedule.** homeschool/factory/run-nightly.sh:14 runs `claude -p` with a checked-in prompt under launchd, output staged into factory/pending/ for review. That is an agent pipeline with a human gate, in production.
3. **The model proposes, code disposes.** demos/patch-assistant/validate.py:1 "This is the tool that says no"; three tools (assistant.py:84); only validated output reaches disk (LAST_VALID).
4. **Structured outputs with typed schemas and an eval harness.** screener/screen.py:29-43 pydantic Harm/Control/Screen; eval.py:11 `--saved` re-scores without API calls.
5. **Multimodal generative pipelines with quality gates.** ai-art/studio/server.py:54 LoRA stacking; inkcheck.py:2 manufacturability scoring; safetensors-check/check.py:2 byte-level model-file validation.
6. **Speech in and out.** functions/api/tts.js:57 OpenAI speech; TodomaiApp.swift:198 AVSpeechSynthesizer; todoboi Audio.swift voice capture.
7. **Edge deployment with real money.** plugincorp.org create-checkout.js:11, stripe-webhook.js, billing-portal.js, entitlements; jamworld live-mode checkout verified; Clerk verifyToken at the edge (_lib.js:139); signed R2 downloads (_lib.js:43).
8. **Hardware integration.** WebMIDI (midiAccess.js:22), BLE MIDI from a watch (wristgrid Midi.swift:12), CC banks to plugin params (hybrid-jammin Engine.h:115-119), MIDI clock in.
9. **Shipping discipline on three platforms.** Notarize, staple, .pkg (ship-mac.sh:2-3); App Store (two ids, archives on disk); Windows Inno Setup (installer/windows/toi-synth.iss); auval sweeps and DAW load passes across 118 built plugins.
10. **Hardware manufacturing readiness.** KiCad 9 gates (check.py:474, :512 "DRC cannot see a pour that is not there"), BOM-PRICED.md, FAB-SPEC.md, PCBWay vendor question files. The hardware lane runs from schematic to fab quote. Robotics is the same toolchain plus motors: KiCad, BOM, firmware, a gate script.
11. **Embedded and bare metal.** 9,800 lines of C++ for a GBA ROM; 2,849 lines of 65816 and SPC700 assembly for a SNES synth. Frame clocks, fixed budgets, no OS.
12. **DSP at scale.** 40,501 lines of Cmajor, a chassis that locks size and brand across 100+ products (plugincorp/CLAUDE.md:7), Web Audio engine of 5,165 lines with 283 gain nodes quarantined from the UI.
13. **Headless and code-level QA.** modular-lab case/AUDIT.md:5 (416 modules against a mock AudioContext); youtube qa_mocks.py; the CDP harness built tonight for ai.html.
14. **Risk gates written before the risk.** trading/PLAN.md:4-8 kill criteria before live capital; hardware "NOTHING ordered" until gates pass; jamworld free-tier gating checks before deploy.

## C. What we do that we did not know we do (process, and it is the job)

- **65 handoff documents** (HANDOFF*.md, CLAUDE.md, PROJECT.md, START-HERE.md, PLAN.md, PIPELINE.md, WORKFLOW*.md) across the disk. Every project can be picked up cold by a fresh agent window. That is agent operations.
- **111 memory notes** in ~/.claude/projects/-Users-jade/memory: laws, feedback, project state, references. A curated context system, maintained daily.
- **Custom agent skills**: ~/.claude/skills/module-design and module-ship, a two-stage gated workflow for hardware.
- **One-command gates**: hardware/check.py, homeschool/deploy.sh + vitest, modular-lab/scripts/deploy.sh, hybrid-jammin/build.sh --run, plugincorp auval-sweep.sh. Agents are allowed to move fast because the gate says no.
- **Concurrency rules for multiple agent windows** sharing one repo (claim boards, never commit another window's files).
- **Real-artifact law**: nothing shown that cannot be pointed at with file:line. This page is the proof of the method.

## D. How to use the good ones on ai.html (in order)

1. **UNSKOOLERZ AI TUTOR rack** (real Anthropic SDK in production code). Modules: the import + model line, the input clamps, the effort setting, the secret rule (index.js:9), the answer-order rule (HANDOFF.md:2243). Terminal: `wc -l`, `grep -n Anthropic`, `git log`. Stage: unskoolerz.pages.dev live. Result chip: "CLAUDE ON A WORKER".
2. **NIGHTLY FACTORY rack** (unattended agent under launchd with a review gate). Modules from factory/run-nightly.sh and factory/NIGHTLY-PROMPT.md. Stage: the factory/pending/ listing. This is the single strongest "agent operations" proof on the disk.
3. **PLUGINCORP.ORG rack** (money at the edge): create-checkout.js:11, stripe-webhook.js signature check, _lib.js:139 Clerk verify, _lib.js:43 signed R2. Stage: plugincorp.org live.
4. **STERN HARDWARE rack** (gates as code): check.py:2, :474, :512; BOM-PRICED.md line; FAB-SPEC.md line. Stage: FACTORY.html or gerber-studio.html served locally, or a board render. Closing line for the robotics lane: same toolchain, add motors.
5. **EMBEDDED rack** (GBA + SNES): the frame clock, the SPC700 driver entry, the BRR generator. Stage: a real emulator capture if one exists on disk, else the ROM build log.
6. **"HOW I RUN AGENTS" section** under the rack: the 65 handoffs, 111 memory notes, two skills, the gates. Show it as its own rack with real lines from CLAUDE.md files and check.py. It is the differentiator no other candidate has.
7. **Hero copy**: one added sentence that names the lane. Suggested, Jade's words to finalise: "I also run the agents that build with me: written handoffs, one-command gates, nothing ships that a check did not pass."
8. **Hardware to robotics**: one line in the STERN rack note, not a claim of robotics work. "The same files that order a synth module order a motor driver."
9. **Contact row** (still the top hold): email, GitHub, LinkedIn, résumé.
10. **Retire or fold**: STUDIO PLANTS and JAMNUTZ HARDWARE keep their racks but get the live studio once jamnutz.com allows framing.

## E. Jade's calls
- Which of the five new racks first. My order is above; the tutor and the nightly factory are the two that say "AI Solutions Engineer" loudest.
- Whether the hero mentions robotics at all. My take: the hardware lane earns a line, robotics is a direction, not a claim.
- The contact links.
