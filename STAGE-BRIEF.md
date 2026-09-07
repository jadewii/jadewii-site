# STAGE PAGE BRIEF (portfolio stage pages for ai.html)

You are building ONE or TWO standalone HTML pages in /Users/jade/Downloads/jadewii-combined/ named demo-<slug>.html. They load inside a ~900x526px iframe (and ~350px wide on phones) on Jade's portfolio. Jade's exact words for the style: "not a website but words explaining and ONE element from that site... bring over the most relevant and cool thing from that site and then talk about some of the project".

## Copy demo-hardware.html and demo-agents.html for structure (read both first, fully)
- No <!doctype>/<html>/<head>/<body> tags. Start with <meta charset="utf-8"/>, <title>, the two stylesheet links (assets/site.css, assets/theme.css), a <style>, then <div class="wrap"> ... </div>, then <script src="assets/theme.js"></script> and your element's <script>.
- Order inside .wrap: <a class="back" href="ai.html">← Back</a>, <h1>, <p class="sub"> (one short meta line), THE ELEMENT, <p class="lede"> (2 to 4 sentences, plain first person, Jade's voice), a .facts row (3 or 4 real numbers, each with a tiny source line under the label), then one or two short paragraphs about the project (real facts only).
- Colors only via theme vars: var(--t-fg), var(--t-bg), var(--t-muted), var(--t-acc), var(--t-stage), var(--t-line). It must look right in light and dark themes (the page follows the parent theme through theme.js, just include it).

## LAWS (absolute)
1. NO made-up content. Every sentence must be traceable to a real file:line, a real command output, or a real number you produced with a command you ran. Put an HTML comment at the top of the page listing every source as file:line. Paraphrase is fine, invention is not. If you are not sure, leave it out.
2. THE ELEMENT is ported VERBATIM from the real source (real data objects, real formulas, real draw code), with a comment naming the source file:line above it. Adapt only what is needed to run in plain HTML/JS (no React). Do not draw a lookalike.
3. NO em dashes anywhere (no "—" and no "–"). Use commas or periods. Run: grep -n "—\|–" <file> and make sure it prints nothing.
4. NO "why this matters for the job" / "this proves I can..." lines. No triads ("X, Y, and Z" lists for rhythm). Sound plain, not written by AI.
5. Fixed layout: nothing shifts when the element animates or plays. Fixed heights for canvases/elements. No horizontal scroll at 350px width. Audio only starts on a click/tap (a clear PLAY or a labelled button), never on load.
6. Only the hero role line on ai.html is bold; here, bold only inside .facts numbers and labels like the templates do.
7. No title="" tooltips.

## VERIFY before you report
- The server is already running: http://localhost:8765/ (serves the folder).
- Run: node /private/tmp/claude-501/-Users-jade/d0675182-cf96-49ec-b0da-e22f98a70e55/scratchpad/cdp-m.mjs http://localhost:8765/demo-<slug>.html 350 700 4 /private/tmp/claude-501/-Users-jade/d0675182-cf96-49ec-b0da-e22f98a70e55/scratchpad/<slug>-350.png 'document.documentElement.scrollWidth'  (must print 350) and the same at 900 1000 for a desktop shot. Look at both screenshots with the Read tool and fix what is wrong.
- For each quoted fact, paste the sed -n / grep line that proves it in your final report.
- Do NOT edit ai.html, assets/patch.js, assets/patch.css, index.html, assets/site.js, artwork.html or any other existing file. Only create your demo-<slug>.html file(s).

## Final report (short)
File name(s), the element and its source lines, the list of facts with file:line proofs, the screenshot paths, and anything you could not verify (left out).
