// =============================================================
// Avatar Maker — sprite data (16x16 layered grids)
// =============================================================
window.SIZE = 16;
window.OUTLINE = '#0a1a24';

// Color slots & fixed colors
// h = outline, l = eye lens dark, t = skin, o = hair, p = shirt, e = pants
// w = headwear, f = facial hair, m = mouth-tone (always dark)
window.SLOT  = { t:'skin', o:'hair', p:'shirt', e:'pants', w:'hat', f:'facial' };
window.FIXED = {
  h: window.OUTLINE,
  l: '#0a1a24',
  m: '#7a2a1a',
  W: '#ffffff',
  s: '#ffffff',
  y: '#e8c040',  // cryptid yellow glow (werewolf slit eyes)
  r: '#d83020',  // cryptid red glow (mothman, demon eyes)
};

// Color palettes — each layer has its own. The drawing palette is universal.
window.PALETTES = {
  skin: [
    // First two slots are the free-tier picks — lightest + darkest so
    // a free user sees the actual range. Pro tier unlocks the gradient
    // in between.
    { id:'porcelain',  label:'Porcelain',  color:'#ffe0c2' },
    { id:'espresso',   label:'Espresso',   color:'#3e2014' },
    { id:'ivory',      label:'Ivory',      color:'#fdd6b4' },
    { id:'peach',      label:'Peach',      color:'#f9b878' },
    { id:'apricot',    label:'Apricot',    color:'#ec9d6a' },
    { id:'olive',      label:'Olive',      color:'#d49560' },
    { id:'sand',       label:'Sand',       color:'#caa478' },
    { id:'tan',        label:'Tan',        color:'#b97a4d' },
    { id:'caramel',    label:'Caramel',    color:'#a26a3c' },
    { id:'umber',      label:'Umber',      color:'#8b5530' },
    { id:'mahogany',   label:'Mahogany',   color:'#7a4326' },
    { id:'cocoa',      label:'Cocoa',      color:'#5e3520' },
  ],
  hair: [
    { id:'platinum', label:'Platinum', color:'#f0e9d8' },
    { id:'blonde',   label:'Blonde',   color:'#efce08' },
    { id:'honey',    label:'Honey',    color:'#e6a73a' },
    { id:'orange',   label:'Orange',   color:'#ee7a2a' },
    { id:'ginger',   label:'Ginger',   color:'#d65a26' },
    { id:'red',      label:'Red',      color:'#c8362a' },
    { id:'wine',     label:'Wine',     color:'#7a1e2b' },
    { id:'auburn',   label:'Auburn',   color:'#8a4520' },
    { id:'brown',    label:'Brown',    color:'#6b3a1f' },
    { id:'chestnut', label:'Chestnut', color:'#4a2a18' },
    { id:'black',    label:'Black',    color:'#1a1a24' },
    { id:'silver',   label:'Silver',   color:'#c8c8d4' },
    { id:'mint',     label:'Mint',     color:'#5acaa8' },
    { id:'teal',     label:'Teal',     color:'#1f9aa8' },
    { id:'aqua',     label:'Aqua',     color:'#5dd5e8' },
    { id:'lilac',    label:'Lilac',    color:'#b48cd8' },
    { id:'lavender', label:'Lavender', color:'#d4b8ee' },
    { id:'magenta',  label:'Magenta',  color:'#d23a92' },
    { id:'pink',     label:'Pink',     color:'#ff7aa8' },
    { id:'rose',     label:'Rose',     color:'#ff9bbb' },
    { id:'blue',     label:'Blue',     color:'#3a8ad8' },
    { id:'cobalt',   label:'Cobalt',   color:'#1f3aa0' },
    { id:'lime',     label:'Lime',     color:'#aede2a' },
  ],
  shirt: [
    { id:'red',      label:'Red',      color:'#ff3908' },
    { id:'crimson',  label:'Crimson',  color:'#c12326' },
    { id:'orange',   label:'Orange',   color:'#ff8c2a' },
    { id:'amber',    label:'Amber',    color:'#e8a02a' },
    { id:'yellow',   label:'Yellow',   color:'#f4cc28' },
    { id:'lime',     label:'Lime',     color:'#aede2a' },
    { id:'green',    label:'Green',    color:'#3aaa55' },
    { id:'forest',   label:'Forest',   color:'#1f6b3a' },
    { id:'teal',     label:'Teal',     color:'#2aaab2' },
    { id:'aqua',     label:'Aqua',     color:'#5dd5e8' },
    { id:'sky',      label:'Sky',      color:'#7ab8f4' },
    { id:'blue',     label:'Blue',     color:'#3a78d8' },
    { id:'navy',     label:'Navy',     color:'#1f2d55' },
    { id:'indigo',   label:'Indigo',   color:'#3a3aaa' },
    { id:'purple',   label:'Purple',   color:'#8a4ad8' },
    { id:'violet',   label:'Violet',   color:'#6a2dbe' },
    { id:'magenta',  label:'Magenta',  color:'#d23a92' },
    { id:'pink',     label:'Pink',     color:'#ff6aa8' },
    { id:'rose',     label:'Rose',     color:'#ff9bbb' },
    { id:'peach',    label:'Peach',    color:'#ffb87a' },
    { id:'cream',    label:'Cream',    color:'#fbe7c2' },
    { id:'gray',     label:'Gray',     color:'#888c95' },
    { id:'charcoal', label:'Charcoal', color:'#3a3a45' },
    { id:'black',    label:'Black',    color:'#2a2a35' },
    { id:'mint',     label:'Mint',     color:'#5acaa8' },
    { id:'olive',    label:'Olive',    color:'#7a8a3a' },
    { id:'mustard',  label:'Mustard',  color:'#caa12a' },
    { id:'rust',     label:'Rust',     color:'#a04a26' },
    { id:'maroon',   label:'Maroon',   color:'#5a1a26' },
  ],
  pants: [
    { id:'gray',     label:'Gray',     color:'#aaaaaa' },
    { id:'slate',    label:'Slate',    color:'#5a6470' },
    { id:'charcoal', label:'Charcoal', color:'#3a3a45' },
    { id:'black',    label:'Black',    color:'#1a1a24' },
    { id:'denim',    label:'Denim',    color:'#3a5a8a' },
    { id:'navy',     label:'Navy',     color:'#1f2d55' },
    { id:'sky',      label:'Sky',      color:'#7ab8f4' },
    { id:'teal',     label:'Teal',     color:'#2aaab2' },
    { id:'forest',   label:'Forest',   color:'#1f6b3a' },
    { id:'green',    label:'Green',    color:'#4a7038' },
    { id:'olive',    label:'Olive',    color:'#7a8a3a' },
    { id:'khaki',    label:'Khaki',    color:'#b29560' },
    { id:'tan',      label:'Tan',      color:'#c8a878' },
    { id:'cream',    label:'Cream',    color:'#fbe7c2' },
    { id:'brown',    label:'Brown',    color:'#6a4028' },
    { id:'mahogany', label:'Mahogany', color:'#4a2818' },
    { id:'rust',     label:'Rust',     color:'#a04a26' },
    { id:'red',      label:'Red',      color:'#a02a2a' },
    { id:'maroon',   label:'Maroon',   color:'#5a1a26' },
    { id:'pink',     label:'Pink',     color:'#ff6aa8' },
    { id:'purple',   label:'Purple',   color:'#5a2da0' },
    { id:'mustard',  label:'Mustard',  color:'#caa12a' },
  ],
  hat: [
    { id:'red',      label:'Red',      color:'#c8362a' },
    { id:'crimson',  label:'Crimson',  color:'#7a1e2b' },
    { id:'orange',   label:'Orange',   color:'#ee7a2a' },
    { id:'yellow',   label:'Yellow',   color:'#f4cc28' },
    { id:'green',    label:'Green',    color:'#3aaa55' },
    { id:'forest',   label:'Forest',   color:'#1f6b3a' },
    { id:'teal',     label:'Teal',     color:'#2aaab2' },
    { id:'aqua',     label:'Aqua',     color:'#5dd5e8' },
    { id:'blue',     label:'Blue',     color:'#3a78d8' },
    { id:'navy',     label:'Navy',     color:'#1f2d55' },
    { id:'purple',   label:'Purple',   color:'#8a4ad8' },
    { id:'magenta',  label:'Magenta',  color:'#d23a92' },
    { id:'pink',     label:'Pink',     color:'#ff6aa8' },
    { id:'cream',    label:'Cream',    color:'#fbe7c2' },
    { id:'tan',      label:'Tan',      color:'#c8a878' },
    { id:'brown',    label:'Brown',    color:'#6a4028' },
    { id:'gray',     label:'Gray',     color:'#888c95' },
    { id:'charcoal', label:'Charcoal', color:'#3a3a45' },
    { id:'black',    label:'Black',    color:'#2a2a35' },
    { id:'mustard',  label:'Mustard',  color:'#caa12a' },
    { id:'mint',     label:'Mint',     color:'#5acaa8' },
  ],
  facial: [
    { id:'match-hair', label:'Match Hair', color:'#6b3a1f' }, // resolved at render to current hair color
    { id:'black',      label:'Black',      color:'#1a1a24' },
    { id:'charcoal',   label:'Charcoal',   color:'#3a3a45' },
    { id:'brown',      label:'Brown',      color:'#6b3a1f' },
    { id:'auburn',     label:'Auburn',     color:'#8a4520' },
    { id:'chestnut',   label:'Chestnut',   color:'#4a2a18' },
    { id:'red',        label:'Red',        color:'#c8362a' },
    { id:'ginger',     label:'Ginger',     color:'#d65a26' },
    { id:'blonde',     label:'Blonde',     color:'#efce08' },
    { id:'silver',     label:'Silver',     color:'#c8c8d4' },
  ],
};

// =============================================================
// HEAD — base
// =============================================================
// Default round head — used as fallback
window.HEAD = [
  "................", // 0
  "....hhhhhhhh....", // 1
  "...htttttttth...", // 2
  "..htttttttttth..", // 3
  "..htttttttttth..", // 4
  "..htttttttttth..", // 5
  "..htttttttttth..", // 6
  "..htttttttttth..", // 7  EYE row
  "..htttttttttth..", // 8  cheek/mouth
  "...hhhhhhhhhh...", // 9  chin
  "................",
  "................","................","................","................","................",
];

// HEAD STYLES — different skull shapes. All color via skin slot.
// 'h' = head outline, 't' = skin fill (face)
window.HEAD_STYLES = {
  round: window.HEAD,
  // Bald-shine: same skull but with a small reflective highlight on top-right of forehead
  shine: [
    "................",
    "....hhhhhhhh....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttsttttsth..",  // shine spots (s = highlight)
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...hhhhhhhhhh...",
    "................",
    "................","................","................","................","................",
  ],
  // Egg: taller, narrower at top
  egg: [
    "................",
    ".....hhhhhh.....",
    "....htttttth....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...hhhhhhhhhh...",
    "................",
    "................","................","................","................","................",
  ],
  // Wide: wider, blockier head
  wide: [
    "................",
    "..hhhhhhhhhhhh..",
    "..htttttttttth..",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    "..hhhhhhhhhhhh..",
    "................",
    "................","................","................","................","................",
  ],
  // Pointy / cone — like a tall pixel-egg with chin point
  pointy: [
    "................",
    ".....hhhhhh.....",
    "....htttttth....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...htttttttth...",
    "....hhhhhhhh....",
    ".....hhhhhh.....",
    "................","................","................","................","................",
  ],
  // ---- ALIEN heads ----
  // Roswell grey: wide bulging forehead, dramatically tapered to a tiny pointed chin (teardrop silhouette)
  'alien-grey': [
    "................",
    "...hhhhhhhhhh...",
    "..htttttttttth..",
    ".htttttttttttth.",
    ".htttttttttttth.",
    "..htttttttttth..",
    "...htttttttth...",
    "....htttttth....",
    ".....htttth.....",
    "......hhhh......",
    "................",
    "................","................","................","................","................",
  ],
  // Xeno-skull: elongated cranium that extends UP and BACK, tapering chin
  // Asymmetric silhouette evokes a back-swept ridged dome
  'alien-skull': [
    ".....hhhh.......",
    "....htttth......",
    "...htttttth.....",
    "..hththththth...",
    ".htttttttttth...",
    ".htttttttttth...",
    ".htttttttttth...",
    "..htttttttth....",
    "...htttttth.....",
    "....hhhhhh......",
    "................",
    "................","................","................","................","................",
  ],
  // Mantis bug: bifurcated dome — TWO bulges on top with a notch between, narrows to chin
  'alien-bug': [
    "...hhh....hhh...",
    "..hhthh..hhthh..",
    ".hhthhhhhhhthh..",
    ".htttttttttth...",
    "htttttttttttth..",
    "htttttttttttth..",
    ".htttttttttth...",
    "..htttttttth....",
    "...htttttth.....",
    "....hhhhhh......",
    "................",
    "................","................","................","................","................",
  ],
  // Classic: literal bake of egg head + dreads hair as one alien silhouette.
  // Strand pixels (h) hang down across the face — eyes/mouth still paint on top.
  // Classic grey: huge cranium tapering to a narrow pointed chin.
  // Redrawn 2026-06-12 - the old grid was almost solid 'h' (outline
  // color), so the head rendered as a near-black blob with checkered
  // speckles instead of a skin-colored alien.
  'alien-classic': [
    "....hhhhhhhh....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...htttttttth...",
    "....htttttth....",
    ".....htttth.....",
    "......hhhh......",
    "................",
    "................","................","................","................","................",
  ],
  // ---- MYTHICS heads (Premier tier) ----
  // Design canon (from 2026-05-04 pixel-art research dispatch):
  //   - The blob IS the character; squint test passes if the silhouette
  //     reads in <1s with overlays off.
  //   - Texture = sawtooth outline with deliberate 2-3px clusters.
  //     Random single-pixel noise looks like JPEG artifacts.
  //   - Each chin/jawline must differ creature-to-creature so the
  //     bottom half of the head carries the species read.
  //   - Pick ONE focal feature per creature; let the overlays do the
  //     rest (mothman = eyes overlay, vampire = fang overlay, etc.).

  // Sasquatch — jagged tufted crown, low slumped brow ridge (double
  // outline thickness across the top), NO neck — the head sits on
  // the shoulders. Cheek fur tufts droop past the jawline at row 10.
  'sasquatch': [
    "................",
    ".hh.hhhhhh.hh...",
    ".hhhhhhhhhhhhhh.",
    ".hhhhhhhhhhhhhh.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".hhttttttttttth.",
    "..hhhhhhhhhhhh..",
    ".hh.hhhhhh.hh...",
    "................","................","................","................","................",
  ],
  // Yeti — rounder/taller dome with TWO ear-tuft peaks at 10 and 2
  // o'clock. Shorter, more uniform fur tufts (snow-packed).
  // Distinguishes from sasquatch's matted-top via the two peaks +
  // a clean dome between them.
  'yeti': [
    "................",
    ".hh..........hh.",
    ".hh.hhhhhhhh.hh.",
    ".hhhhhhhhhhhhhh.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    "..hhhhhhhhhhhh..",
    ".hh..hhhhhh..hh.",
    "................","................","................","................","................",
  ],
  // Werewolf — pointed triangular ears at the 11 / 1 o'clock positions
  // and a forward-thrusting snout that BREAKS the right edge of the
  // head circle. The snout is the unmistakable cue. Sawtooth fur ruff
  // under the jaw.
  'werewolf': [
    "................",
    ".hh.......hh....",
    ".hh.......hh....",
    ".hhhhhhhhhhh....",
    ".htttttttttth...",
    ".htttttttttth...",
    ".httttttttttthh.",
    ".htttttttttttthh",
    ".htttttttttttth.",
    "..hhhhhhhhhhhh..",
    ".hh.hh.hh.hh.hh.",
    "................","................","................","................","................",
  ],
  // Vampire — SMOOTH-edged head (no fur — distinguishes from werewolf
  // and other Mythics). Sharp aristocratic taper to a sharply
  // pointed chin extending 2 rows past where the human chin lands.
  'vampire': [
    "................",
    "....hhhhhhhh....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...htttttttth...",
    "....htttttth....",
    ".....htttth.....",
    "......hhhh......",
    "................","................","................","................",
  ],
  // Ghost — rounded dome top + scalloped wavy bottom edge (3 humps
  // where the chin would be) with two trailing wisp pixels below.
  // No defined chin — the "head" dissolves into a sheet/tail.
  'ghost': [
    "................",
    "....hhhhhhhh....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..hh.hhh.hhh.h..",
    "...h..h.h..h....",
    "................","................","................","................","................",
  ],
  // Dragon — reptilian head with two horns sweeping up + a snout
  // breaking the right edge. Heavy lower jaw. The horns + snout are
  // the unmistakable read.
  'dragon': [
    "................",
    "..hh........hh..",
    "..hh........hh..",
    "..hhhhhhhhhhhh..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttthh.",
    "..htttttttttttth",
    "..hhhhhhhhhhhhhh",
    "...hhhhhhhhhhhh.",
    "................","................","................","................","................","................",
  ],
  // Ogre — asymmetric lumpy crown (lump rolls in from upper-left)
  // and a heavy lantern jaw thrust to the right. Tiny crown vs huge
  // jaw is the silhouette gag — no proportional face, just brute.
  'ogre': [
    "................",
    "....hh..........",
    "...hhhh.........",
    "..hhhhhhhhhh....",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..hhhhhhhhhhhhh.",
    "..htttttttttthhh",
    "..hhhhhhhhhhhh..",
    "................","................","................","................","................","................",
  ],
  // Goblin — small head with pointy ear-tips at the 1 and 11 o'clock
  // positions and a hooked nose protruding to the right (single 'h'
  // bump at row 4-5). Smaller overall footprint reads as "small
  // trickster."
  'goblin': [
    "................",
    ".hh........hh...",
    "...hhhhhhhhh....",
    "..htttttttth....",
    "..httttttttthh..",
    "..htttttttttth..",
    "..htttttttth....",
    "..htttttttth....",
    "...hhhhhhhhh....",
    "....hhhhhh......",
    "................","................","................","................","................","................",
  ],
  // Demon — vampire silhouette with sharp horns. Smooth aristocratic
  // dome (no fur), pointed chin, plus the horn-tips at row 1 lock
  // the read. Fangs + glowing eye overlay carry the rest.
  'demon': [
    "................",
    "..hh........hh..",
    "..hh........hh..",
    "...hhhhhhhhhh...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...htttttttth...",
    "....htttttth....",
    ".....hhhhhh.....",
    "................","................","................","................","................",
  ],
  // Harpy — bird-woman. Sharp downward-curving beak protrudes the
  // right edge at rows 7-8 (the unmistakable read). 3-spike feather
  // crest at top, jagged feather-edge texture on cheeks (rows 4, 6).
  'harpy': [
    "....h.h.h.......",
    "...hhhhhhh......",
    "..htttttttth....",
    ".htttttttttth...",
    ".hthttttttttth..",
    ".htttttttttth...",
    ".hthttttttttth..",
    ".htttttttttthh..",
    ".htttttttttthhh.",
    "..hhhhhhhhhhh...",
    "...hhhhhhhh.....",
    "................","................","................","................","................",
  ],
  // Troll — massive underbite. Two lower tusks (W = white) poke
  // UP from the lip line into the face area at row 7 — research
  // canon's distinguishing landmark vs ogre's asymmetric crown.
  // Asymmetric lumpy cranium (3 unequal lumps row 1).
  'troll': [
    "................",
    "...hh.hhh.hh....",
    "..hhhhhhhhhh....",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htWtttttttWtth.",
    "hhhhhhhhhhhhhhhh",
    "................","................","................","................","................","................","................",
  ],
  // Wendigo — emaciated cannibal spirit. Branching antlers (cols 2,
  // 5, 10, 13 — 2-prong each side) at rows 0-1, gaunt narrow face
  // (cols 4-11 instead of 2-13) with sunken cheek details (h pixels
  // inside the face area), pointed wail-like chin.
  'wendigo': [
    "..h..h....h..h..",
    "..h.h......h.h..",
    "..hh........hh..",
    "...hhhhhhhhhh...",
    "...htttttttth...",
    "...htthtttttth..",
    "...htttttttth...",
    "...htthtttttth..",
    "...htttttttth...",
    "....htttttth....",
    ".....hhhhhh.....",
    "................","................","................","................","................",
  ],
  // Minotaur — bull-horned bipedal. Horn tips curve outward at row
  // 1 (cols 0, 14-15) — distinguishes from dragon/demon (whose horns
  // sweep UP straight) and ogre/troll (no horns). Snout protrudes
  // right edge at rows 6-7 — the bull/bovine read.
  'minotaur': [
    "................",
    "hh..........hh..",
    ".hh........hh...",
    "..hhhhhhhhhhhh..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttthh.",
    "..htttttttttttth",
    "..hhhhhhhhhhhhh.",
    "...hhhhhhhhhh...",
    "................","................","................","................","................","................",
  ],
  // Imp — tiny demon. Small horns at outside corners + compact
  // head (cols 3-12 vs human's 2-13) reads as small-mischievous.
  // Distinguishes from Demon (which is full-size with vampire chin).
  'imp': [
    "................",
    "................",
    "..h........h....",
    "..hh.hhhhhh.hh..",
    "...htttttttth...",
    "...htttttttth...",
    "...htttttttth...",
    "...htttttttth...",
    "...htttttttth...",
    "....hhhhhhhh....",
    ".....hhhhhh.....",
    "................","................","................","................","................",
  ],
  // Lich — undead wizard. Cone hat (rows 0-5) like gnome BUT also
  // a clean skull-shaped face below (rows 6-9). Combines wizard hat
  // + skeleton silhouette. Distinguishes from gnome (no face) and
  // skeleton (no hat) by combining both.
  'lich': [
    ".......h........",
    "......hhh.......",
    ".....hhhhh......",
    "....hhhhhhh.....",
    "...hhhhhhhhh....",
    "..hhhhhhhhhhh...",
    "...htttttttth...",
    "...htttttttth...",
    "...htttttttth...",
    "....hhhhhhhh....",
    "................","................","................","................","................","................",
  ],
  // Cyclops — clean humanoid head canvas. The single-eye overlay
  // ('cyclops' eye) carries the load-bearing read. Slightly larger
  // than human (cols 2-13 wide instead of 3-12) to suggest a giant.
  'cyclops': [
    "................",
    "..hhhhhhhhhhhh..",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    "..hhhhhhhhhhhh..",
    "................","................","................","................","................",
  ],
  // Golem — boxy stone construction. Double-thick top + bottom
  // slabs (rows 1-2 and 9-10) suggest stone weight; vertical sides
  // are perfectly square reading as "constructed, not grown."
  'golem': [
    "................",
    "..hhhhhhhhhhhh..",
    "..hhhhhhhhhhhh..",
    "..hthtttttththh.",
    "..htttttttttth..",
    "..htttttttttth..",
    "..hththtttththh.",
    "..htttttttttth..",
    "..htttttttttth..",
    "..hhhhhhhhhhhh..",
    "..hhhhhhhhhhhh..",
    "................","................","................","................","................",
  ],
  // Zombie — undead humanoid with a missing chunk on the cheek
  // (the dot at row 4 inside the skin area = head wound) + ragged
  // asymmetric jawline at row 9. Smooth top distinguishes from
  // banshee (whose top is jagged hair).
  'zombie': [
    "................",
    "....hhhhhhhh....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htth.tttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...hh.hhhhhh.h..",
    "................","................","................","................","................","................",
  ],
  // Skeleton — clean skull silhouette. Smooth crown, narrow tapered
  // chin, faint cheekbone detail at row 7 (the alternating 'h-t-h'
  // pattern inside the face area). Eye/mouth overlays carry the
  // socket + teeth read; the silhouette just needs to read "skull
  // shape" not "alien."
  'skeleton': [
    "................",
    "....hhhhhhhh....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..hththtttthth..",
    "..htttttttttth..",
    "...htttttttth...",
    "....hhhhhhhh....",
    "................","................","................","................","................",
  ],
  // Witch — TALL floppy/bent pointed hat (tip leans LEFT to col 4
  // instead of centered) + visible hooked nose protruding the right
  // edge at row 7 + stringy hair breaking the lower silhouette at
  // rows 10-12. The bent tip + nose-hook is the "witch tell" that
  // distinguishes from gnome (straight hat) and goblin (no hat).
  'witch': [
    "....h...........",
    "....hh..........",
    "....hhh.........",
    "....hhhh........",
    "..hhhhhhhhhhhh..",
    "..hhhhhhhhhhhh..",
    "...htttttttth...",
    "...httttttttthh.",
    "...htttttttth...",
    "...hhhhhhhhhh...",
    "..h.hh.hh.hh.h..",
    "................","................","................","................","................",
  ],
  // Faerie / Pixie — TINY head only fills rows 3-9 cols 4-10 +
  // delicate wing tips fanning outward at rows 1-8 cols 0-2 and
  // 13-15. The empty negative space around the small head is part
  // of the read — fae are mischievous, leans 1px asymmetric.
  // Wings repainted 'h' → 'W' (2026-06-12): outline-dark wings were
  // invisible on the dark UI, leaving two floating skin bars where a
  // faerie should be. White membrane wings carry the read now; the
  // stray dark bar under the chin (old row 9) is gone.
  'faerie': [
    "................",
    "WW............WW",
    ".WW..........WW.",
    "..WW.hhhhhh.WW..",
    "..W.htttttth.W..",
    "..WW.tttttt.WW..",
    "..W.htttttth.W..",
    "..WW.hhhhhh.WW..",
    "...WW......WW...",
    "................",
    "................","................","................","................","................","................",
  ],
  // Banshee — wild upward-streaming hair (asymmetric jagged spikes
  // at rows 0-1) + narrow elongated face that drops to a pointed
  // wail-chin at row 9. Asymmetry mandatory: banshees are chaotic.
  'banshee': [
    "..h..h....h..h..",
    ".hh.hh.hhh.hh...",
    "..hhhhhhhhhh....",
    "...htttttttth...",
    "...htttttttth...",
    "...htttttttth...",
    "...htttttttth...",
    "....htttttth....",
    ".....htttth.....",
    "......hhhh......",
    ".......hh.......",
    "................","................","................","................","................",
  ],
  // Gnome — TALL pointed cone hat occupying rows 0-6 (more than
  // half the canvas), then a narrow face sliver at rows 7-8. Hat
  // tip leans 1px right at row 0 for character (asymmetric per the
  // canon). The triangular beard lives in BODY_FRAMES_BY_HEAD.gnome
  // so the head silhouette is just the hat + face.
  // Redrawn 2026-06-12: the cone was solid 'h' (outline near-black) -
  // invisible on the dark UI - and the face sat at rows 7-8, BELOW
  // where the eye overlays paint (rows 5-7), so gnomes rendered as a
  // faceless void wedge over a skin sliver. Now: canonical RED cone
  // ('r' fixed color) ending at row 4, face on rows 5-8 so the eyes
  // land on skin.
  'gnome': [
    ".......hh.......",
    "......hrrh......",
    ".....hrrrrh.....",
    "....hrrrrrrh....",
    "..hhrrrrrrrrhh..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...htttttttth...",
    "...hhhhhhhhhh...",
    "................",
    "................","................","................","................","................","................",
  ],
  // Kraken — bulbous mantle dome (wider than tall, 2:1) with 3
  // thick tentacles dropping below. The mantle is the read; the
  // tentacles in the body silhouette confirm species.
  'kraken': [
    "................",
    "....hhhhhhhh....",
    "...htttttttth...",
    "..htttttttttth..",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    "..htttttttttth..",
    "...htttttttth...",
    "....hhhhhhhh....",
    "................","................","................","................","................","................",
  ],
  // Mermaid — smooth oval head with FLOWING HAIR extending past
  // the head boundary on both sides in wavy curls. The hair (not
  // the face) is the read at 16×16. Body uses a fish tail (see
  // BODY_FRAMES_BY_HEAD.mermaid).
  'mermaid': [
    "................",
    "..hh......hh....",
    ".hhh......hhh...",
    "..hhhhhhhhhh....",
    ".htttttttttth...",
    "htttttttttttth..",
    "htttttttttttth..",
    ".htttttttttth...",
    "..htttttttth....",
    "...hhhhhhhh.....",
    "..h.h.h..h.h....",
    "................","................","................","................","................",
  ],
  // Mothman — humanoid head silhouette with a subtly cowled / wide
  // upper edge. The huge round eyes are carried by an eye overlay
  // (the load-bearing visual cue) — the head silhouette here is a
  // clean canvas for them. Wide stance suggests folded wings behind.
  'mothman': [
    "................",
    "...hhhhhhhhhh...",
    "..htttttttttth..",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    ".htttttttttttth.",
    "..htttttttttth..",
    "...hhhhhhhhhh...",
    "................","................","................","................","................",
  ],
  // ---- ANDROID heads ----
  // Dome: rounded with a flat top crown (antenna stub spot)
  'android-dome': [
    "................",
    ".......h........",
    ".....hhhhh......",
    "....hhhhhhh.....",
    "...htttttttth...",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "...hhhhhhhhhh...",
    "................","................","................","................","................",
  ],
  // Block: boxy robot head — classic 8-bit android
  'android-block': [
    "................",
    "..hhhhhhhhhhhh..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..htttttttttth..",
    "..hhhhhhhhhhhh..",
    "................",
    "................","................","................","................","................",
  ],
};

// =============================================================
// EYES — small, well-placed
// =============================================================
window.EYE_OVERLAYS = {
  // 'normal' upgraded 2026-06-12: was two 1px-wide dark columns that
  // merged into any dark fringe above them (bangs/bowl/pony all read
  // as "no face"). Now 2x2 per eye with a white catchlight top-left -
  // the classic pixel-art "alive" eye. Pops on bare skin AND under
  // low hairlines.
  normal: [
    "................","................","................","................","................","................",
    "....Wh....Wh....", // 6
    "....hh....hh....", // 7
    "................","................","................","................","................","................","................","................",
  ],
  happy: [
    "................","................","................","................","................","................",
    ".....h....h.....",
    "................",
    "................","................","................","................","................","................","................","................",
  ],
  closed: [
    "................","................","................","................","................","................",
    "................",
    ".....h....h.....",
    "................","................","................","................","................","................","................","................",
  ],
  wink: [
    "................","................","................","................","................","................",
    ".....h..........",
    "....hh...hh.....",
    "................","................","................","................","................","................","................","................",
  ],
  stars: [
    "................","................","................","................","................",
    ".....h....h.....",
    "....hhh..hhh....",
    ".....h....h.....",
    "................","................","................","................","................","................","................","................",
  ],
  shades: [
    "................","................","................","................","................",
    "................",
    "...hhhhhhhhhh...",
    "...hllllllllh...",
    "...hhhhhhhhhh...",
    "................","................","................","................","................","................","................",
  ],
  sleepy: [
    "................","................","................","................","................","................",
    "....hh....hh....",
    ".....h.....h....",
    "................","................","................","................","................","................","................","................",
  ],
  // ---- Cryptid / Mythics eyes ----
  // 'sunken' — deep-set black eye blocks for sasquatch / yeti.
  // Bigger and slightly higher than 'normal' so they read as
  // recessed under the brow shadow of those silhouettes.
  sunken: [
    "................","................","................","................","................",
    "....hh....hh....",
    "....hh....hh....",
    "................",
    "................","................","................","................","................","................","................","................",
  ],
  // 'glow' — oversized red rectangular eyes for mothman. The
  // canonical mothman read at 16x16 — eyes occupy ~50% of the face.
  glow: [
    "................","................","................","................",
    "...rrrr..rrrr...",
    "...rrrr..rrrr...",
    "...rrrr..rrrr...",
    "................","................","................","................","................","................","................","................","................",
  ],
  // 'ember' — compact glowing eyes: 2x2 red with a white hot-spot.
  // Added 2026-06-12: 'glow' (below) is mothman's CANON oversized
  // read, but it was the default for 8 other species where the big
  // red rectangles read as goggles / error pixels. Ember keeps the
  // "lit from within" story at a size that leaves the face readable.
  ember: [
    "................","................","................","................","................",
    "....Wr....Wr....",
    "....rr....rr....",
    "................",
    "................","................","................","................","................","................","................","................",
  ],
  // 'hollow' — open black-O eyes for ghost. Negative-space rings
  // (top + bottom + side pixels with gap in the middle).
  hollow: [
    "................","................","................","................","................",
    "....hh....hh....",
    "....h.h..h.h....",
    "....hh....hh....",
    "................","................","................","................","................","................","................","................",
  ],
  // 'thinline' — narrow droopy aristocratic eyes for vampire.
  // Slight asymmetry between top and bottom pixel suggests a
  // half-lidded predator gaze.
  thinline: [
    "................","................","................","................","................",
    ".....h....h.....",
    "....h......h....",
    "................","................","................","................","................","................","................","................","................",
  ],
  // 'slit' — vertical yellow slits for werewolf. The 'y' fixed
  // color renders as #e8c040 — reads as "glowing eyes in the dark."
  slit: [
    "................","................","................","................","................",
    ".....y....y.....",
    ".....y....y.....",
    "................","................","................","................","................","................","................","................","................",
  ],
  // 'cyclops' — single LARGE eye centered. Black outline + white
  // sclera + red 'r' pupil. The cyclops's load-bearing read.
  cyclops: [
    "................","................","................","................",
    "......hhhh......",
    ".....hWrrWh.....",
    ".....hWWWWh.....",
    "......hhhh......",
    "................","................","................","................","................","................","................","................",
  ],
};

// =============================================================
// MOUTHS
// =============================================================
window.MOUTH_OVERLAYS = {
  smile: [
    "................","................","................","................","................","................","................","................",
    "........mm......", // row 8
    "................","................","................","................","................","................","................",
  ],
  grin: [
    "................","................","................","................","................","................","................","................",
    ".......mmmm.....",
    "................","................","................","................","................","................","................",
  ],
  open: [
    "................","................","................","................","................","................","................","................",
    "........mm......",
    "........mm......",
    "................","................","................","................","................","................",
  ],
  flat: [
    "................","................","................","................","................","................","................","................",
    ".......mmmm.....",
    "................","................","................","................","................","................","................",
  ].map(r => r.replaceAll('m','h')),
  frown: [
    "................","................","................","................","................","................","................","................",
    "........hh......",
    ".......h..h.....",
    "................","................","................","................","................","................",
  ],
  none: [
    "................","................","................","................","................","................","................","................",
    "................",
    "................","................","................","................","................","................","................",
  ],
  // ---- Cryptid / Mythics mouths ----
  // 'fangs' — closed mouth line + 2 white fang points hanging below.
  // The vampire signature read.
  fangs: [
    "................","................","................","................","................","................","................","................",
    ".......mmmm.....",
    "......W....W....",
    "................","................","................","................","................","................",
  ],
  // 'snarl' — open mouth with a row of white fangs across the top.
  // Werewolf bared teeth.
  snarl: [
    "................","................","................","................","................","................","................","................",
    ".....mmmmmm.....",
    ".....WWmmWW.....",
    "................","................","................","................","................","................",
  ],
  // 'gape' — large hollow O mouth. Ghost wail / spectral howl.
  gape: [
    "................","................","................","................","................","................","................",
    ".......hh.......",
    "......h..h......",
    "......h..h......",
    ".......hh.......",
    "................","................","................","................","................",
  ],
};

// =============================================================
// HAIR — 24 styles total. ONLY paint hair pixels (`o`); never repaint head outline.
// Hair fill region for round-top styles is rows 2-4 cols 3-12 (10 wide).
// =============================================================
const _empty = "................";
const _row = (s) => s.padEnd(16, '.').slice(0,16);
window.HAIR_OVERLAYS = {
  // --- core 9 ---
  short: [
    _empty, _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  long: [
    _empty, _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty,
    "..o..........o..",
    "..o..........o..",
    "..oo........oo..",
    _empty, _empty, _empty, _empty, _empty,
  ],
  spiky: [
    "....o.o.oo.o....",
    "....oooooooo....",
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  curly: [
    "....oooooooo....",
    "...o.oooooo.o...",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  bangs: [
    _empty, _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...", // bangs row 5 (forehead)
    "....o......o....",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  pony: [
    _empty, _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...ooooooooooo..",
    "...oooooooooooo.",
    "..............oo",
    "..............oo",
    "..............o.",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  mohawk: [
    "......oooo......",
    "......oooo......",
    "......oooo......",
    "......oooo......",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  buzz: [
    _empty, _empty,
    "....oooooooo....",
    "....oooooooo....",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  bowl: [
    _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    "...o........o...", // straight cut along forehead/cheeks
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // --- 15 NEW ---
  afro: [
    "...oo.oooo.oo...",
    "..oooooooooooo..",
    "..oooooooooooo..",
    "..oooooooooooo..",
    "..oooooooooooo..",
    "..oo........oo..", // sides puff out
    "..oo........oo..",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  fauxhawk: [
    ".....oooooo.....",
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  fringe: [
    _empty, _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oo......oo...",
    "...oo......oo...",
    "....o......o....",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  sidepart: [
    _empty, _empty,
    "....oooooooo....",
    "....oooo.ooooo..", // part on right side
    "....ooo..oooooo.",
    "....oo..........",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  slicked: [
    _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  wavy: [
    "....o.oo.oo.o...",
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  bun: [
    "......oooo......",
    "......oooo......",
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  manbun: [
    "..............oo",
    ".............ooo",
    "....oooooooo.oo.",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  pigtails: [
    _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "..oooooooooooo..",
    "..oo........oo..",
    "..oo........oo..",
    "..oo........oo..",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  braids: [
    _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty,
    "..o..........o..",
    "..oo........oo..",
    "..o..........o..",
    "..oo........oo..",
    "..o..........o..",
    _empty, _empty, _empty, _empty, _empty,
  ],
  dreads: [
    "...o.o.oo.o.o...",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    "..o.o.o..o.o.o..",
    "..o.o.o..o.o.o..",
    "..o.o.o..o.o.o..",
    "..o.o.o..o.o.o..",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  undercut: [
    _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "....oooooooo....", // sides shaved (no fill at extremes)
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  mullet: [
    _empty, _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty,
    "..oo........oo..",
    ".oooo......oooo.",
    ".oooo......oooo.",
    "..oo........oo..",
    _empty, _empty, _empty, _empty,
  ],
  flattop: [
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  emo: [
    _empty,
    "....oooooooo....",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oooooooooo...",
    "...oo.ooooooo...", // long fringe over eyes
    "....oooooooo....",
    "......oooo......",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
};

// =============================================================
// HEADWEAR — overlays on top of head/hair using 'w' = hat color
// =============================================================
window.HAT_OVERLAYS = {
  none: Array(16).fill(_empty),
  cap: [
    _empty,
    "....wwwwwwww....",
    "...wwwwwwwwww...",
    "...hhhhhhhhhh...", // brim
    "................",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  beanie: [
    _empty,
    "....wwwwwwww....",
    "...wwwwwwwwww...",
    "...wwwwwwwwww...",
    "...hhhhhhhhhh...", // band
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  pom: [ // beanie with pompom
    "......ww........",
    "....wwwwwwww....",
    "...wwwwwwwwww...",
    "...wwwwwwwwww...",
    "...hhhhhhhhhh...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  crown: [
    "...w.w.ww.w.w...",
    "...wwwwwwwwww...",
    "...wwwwwwwwww...",
    _empty,
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  top: [
    "....wwwwwwww....",
    "....wwwwwwww....",
    "....wwwwwwww....",
    "...wwwwwwwwww...", // brim
    "...hhhhhhhhhh...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Shifted up 1 row (2026-06-12): at rows 3-5 the band's lower dark
  // edge sat one row above the eyes and the stack read as a blindfold.
  band: [
    _empty, _empty,
    "...hhhhhhhhhh...",
    "...wwwwwwwwww...",
    "...hhhhhhhhhh...",
    _empty,
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  visor: [
    _empty, _empty, _empty,
    "...hhhhhhhhhh...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  hood: [
    _empty,
    "...wwwwwwwwww...",
    "..wwwwwwwwwwww..",
    "..ww........ww..", // sides
    "..ww........ww..",
    "..ww........ww..",
    "..ww........ww..",
    "..ww........ww..",
    "..ww........ww..",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
};

// =============================================================
// FACIAL HAIR — overlays at chin/cheek using 'f' = facial color
// =============================================================
window.FACIAL_OVERLAYS = {
  none: Array(16).fill(_empty),
  stache: [
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty,
    ".......ffff.....",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  goatee: [
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty,
    "........ff......",
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  beard: [
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    "................",
    "..ff......ff....", // sideburns
    "...ffffffffff...",
    "....ffffffff....",
    _empty, _empty, _empty, _empty, _empty,
  ],
  fullbeard: [
    _empty, _empty, _empty, _empty, _empty, _empty,
    _empty,
    "..ff........ff..",
    "..fffffffffff...",
    "..ffffffffffff..",
    "...ffffffffff...",
    "....ffffffff....",
    _empty, _empty, _empty, _empty,
  ],
};

// =============================================================
// ANTENNAE — for Alien & Android character types. These replace the
// "hair" slot. They paint above and at the very top of the head and
// project upward into row 0 (i.e. above the scalp). They use 'o'
// (the hair color slot) so the panel's "Hair" color picker still
// drives them — it doubles as antenna color for these types.
//   o = stalk/rod + bulb fill
//   m = bulb dark accent (always #7a2a1a baked-in mouth tone — fine, gives 2-tone look)
// All sprites are 16x16; the head occupies rows 1-9 typically, so we
// use rows 0-2 for antenna roots and rows above for projections.
// =============================================================
window.ANTENNA_OVERLAYS = {
  none: Array(16).fill(_empty),
  // Two side feelers — small bulbs on thin stalks
  feelers: [
    "...o........o...",
    "...o........o...",
    "....o......o....",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Stalks: tall straight antennas with round tops, classic alien
  stalks: [
    "....o......o....",
    "....o......o....",
    "....o......o....",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Horns: thick curved horns coming off the sides of the skull
  horns: [
    "..o..........o..",
    "..oo........oo..",
    "...o........o...",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Tendrils: many thin droopy feelers across the crown
  tendrils: [
    "..o.o.o..o.o.o..",
    "..o.o.o..o.o.o..",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Crown: a halo of small bulbs around the scalp
  crown: [
    "..oo.oo..oo.oo..",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Dish: satellite-style antenna mounted on top center
  dish: [
    "....oooooooo....",
    "....o......o....",
    ".......oo.......",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Blink: single tall antenna with a glowing red light tip
  blink: [
    ".......mm.......",
    ".......oo.......",
    ".......oo.......",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Spike: a short stubby spike on top
  spike: [
    "................",
    ".......oo.......",
    ".......oo.......",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Rabbit: vintage TV "rabbit-ears" antennas
  rabbit: [
    "..o..........o..",
    "...o........o...",
    "....o......o....",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
  // Dual: two short antennas with bulb tips
  dual: [
    ".....oo..oo.....",
    ".....oo..oo.....",
    "......o..o......",
    _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    _empty, _empty, _empty, _empty, _empty, _empty,
  ],
};

// =============================================================
// BODY frames — rows 10-15 only.
// =============================================================
window.BODY_FRAMES = [
  // 0: arms tucked in close (default)
  [
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    "sshhpppppppphhss",
    "shtthpppppphtths",
    "shtthpppppphtths",
    "sshhhhhhhhhhhhss",
    "sssheehhhheehsss",
    "sssshhhsshhhssss",
  ],
  // 1: arms swung out wide (jumping-jack)
  [
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    "sshhpppppppphhss",
    "hthtpppppppphtht",
    "hthtpppppppphtht",
    "sshhhhhhhhhhhhss",
    "sssheehhhheehsss",
    "sssshhhsshhhssss",
  ],
  // 2: arms tucked, body tilted/leaning LEFT (cute side-sway)
  [
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    "shhpppppppphhsss",
    "hthtpppppphtthss",
    "hthtpppppphtthss",
    "shhhhhhhhhhhhsss",
    "sshheehhhheehsss",
    "ssshhhsshhhsssss",
  ],
  // 3: arms tucked, body tilted/leaning RIGHT (mirror of 2)
  [
    _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
    "ssshhpppppppphhs",
    "sshtthppppppthth",
    "sshtthppppppthth",
    "ssshhhhhhhhhhhhs",
    "sssheehhhheehhss",
    "sssssshhhsshhhss",
  ],
  // 4: head bob — same as 0 but used with yShift -1
  // (alias of 0; we just toggle yShift)
];
// =============================================================
// PER-HEAD BODY OVERRIDES — map keyed by headStyle ID. When a head
// has an entry here, the renderer uses these body frames instead of
// the default human BODY_FRAMES. Each entry is the same shape as
// BODY_FRAMES (array of 4 row-arrays for idle / wide / lean-left /
// lean-right). For cryptids we use a single distinctive frame and
// let dance keyframes vary via xShift / yShift only — proper dance
// variants can be added later.
//
// Char convention (same as default body):
//   h = outline (black)
//   t = skin / fur fill (cryptid body color = the character's "skin")
//   p = shirt color (only used where a cryptid wears something)
//   e = pants color
//   s = shoulder-padding (renders transparent)
// Cryptid bodies generally don't have shirt/pants — the whole body
// is the species' fur/cloth/shroud, painted with 't'. Color picker
// for "Skin" then drives the whole creature's body color.
// =============================================================
// Per-head metadata — used to apply head-specific defaults when the
// user picks a head (e.g. sasquatch should auto-snap to sunken eyes
// + frown mouth, mothman to glow eyes + no mouth, etc.). Also a
// natural place to attach future per-head config (preferred dance,
// idle bob speed, etc.).
window.HEAD_STYLES_META = {
  sasquatch: { defaultEye: 'sunken',   defaultMouth: 'frown', defaultSkin: 'm-sasquatch' },
  yeti:      { defaultEye: 'sunken',   defaultMouth: 'flat',  defaultSkin: 'm-yeti' },
  werewolf:  { defaultEye: 'slit',     defaultMouth: 'snarl', defaultSkin: 'm-werewolf' },
  vampire:   { defaultEye: 'thinline', defaultMouth: 'fangs', defaultSkin: 'm-crimson' },
  ghost:     { defaultEye: 'hollow',   defaultMouth: 'gape',  defaultSkin: 'm-wraith' },
  mothman:   { defaultEye: 'glow',     defaultMouth: 'none',  defaultSkin: 'm-shadow' },
  dragon:    { defaultEye: 'ember',     defaultMouth: 'snarl', defaultSkin: 'm-rust' },
  demon:     { defaultEye: 'ember',     defaultMouth: 'fangs', defaultSkin: 'm-shadow' },
  ogre:      { defaultEye: 'sunken',   defaultMouth: 'snarl', defaultSkin: 'm-moss' },
  goblin:    { defaultEye: 'ember',     defaultMouth: 'snarl', defaultSkin: 'm-moss' },
  mermaid:   { defaultEye: 'thinline', defaultMouth: 'flat',  defaultSkin: 'm-wraith' },
  kraken:    { defaultEye: 'ember',     defaultMouth: 'none',  defaultSkin: 'm-shadow' },
  banshee:   { defaultEye: 'ember',     defaultMouth: 'gape',  defaultSkin: 'm-wraith' },
  gnome:     { defaultEye: 'sunken',   defaultMouth: 'none',  defaultSkin: 'm-moss' },
  harpy:     { defaultEye: 'slit',     defaultMouth: 'none',  defaultSkin: 'm-rust' },
  troll:     { defaultEye: 'sunken',   defaultMouth: 'snarl', defaultSkin: 'm-rust' },
  witch:     { defaultEye: 'ember',     defaultMouth: 'frown', defaultSkin: 'm-moss' },
  faerie:    { defaultEye: 'thinline', defaultMouth: 'flat',  defaultSkin: 'm-rust' },
  zombie:    { defaultEye: 'hollow',   defaultMouth: 'snarl', defaultSkin: 'm-moss' },
  skeleton:  { defaultEye: 'hollow',   defaultMouth: 'snarl', defaultSkin: 'm-yeti' },
  cyclops:   { defaultEye: 'cyclops',  defaultMouth: 'frown', defaultSkin: 'm-rust' },
  golem:     { defaultEye: 'sunken',   defaultMouth: 'flat',  defaultSkin: 'm-werewolf' },
  imp:       { defaultEye: 'ember',     defaultMouth: 'snarl', defaultSkin: 'm-crimson' },
  lich:      { defaultEye: 'hollow',   defaultMouth: 'snarl', defaultSkin: 'm-shadow' },
  wendigo:   { defaultEye: 'ember',     defaultMouth: 'snarl', defaultSkin: 'm-shadow' },
  minotaur:  { defaultEye: 'sunken',   defaultMouth: 'snarl', defaultSkin: 'm-werewolf' },
};

window.BODY_FRAMES_BY_HEAD = {
  // SASQUATCH — wide brutish body, no waist taper, broad short legs.
  // No shoulder padding (full-width fur from edge to edge).
  sasquatch: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "htttttttttttttth",
      "htttttttttttttth",
      "hhhhhhhhhhhhhhhh",
      "shhhhhhsshhhhhhs",
      "ssshhhsssshhhsss",
    ],
  ],
  // YETI — same broad build as sasquatch but with one extra fur tuft
  // on the chest (a single 'h' detail on the upper-left torso). Snow-
  // packed shorter fur reads as cleaner outline.
  yeti: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "htttttttttttttth",
      "htttthhttthtttth",
      "hhhhhhhhhhhhhhhh",
      "shhhhhhsshhhhhhs",
      "ssshhhsssshhhsss",
    ],
  ],
  // WEREWOLF — leaner, taller stance with a tail-stub on the right.
  // Asymmetric outline at the hip + an extra row at row 15 simulates
  // a tail behind the legs.
  werewolf: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "shhttttttttttths",
      "htttttttttttthhh",
      "htttttttttttth.h",
      "shhhhhhhhhhhhhhh",
      "sshttshhhsshhhss",
      "sshhhssshhhsshss",
    ],
  ],
  // VAMPIRE — narrow caped silhouette. Body is narrow, but the
  // shoulders flare into a high collar via 'h' outline curving up
  // and out (rows 10-11). Tight legs.
  vampire: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hh.hhtttttthh.hh",
      "shhhtttttttthhhs",
      "shtthtttttthtths",
      "sshhhhhhhhhhhhss",
      "ssshtthhhhtthsss",
      "sssshhhsshhhssss",
    ],
  ],
  // GHOST — no legs. Body dissolves into wavy/scalloped tail at
  // rows 14-15. Single skin-tone fill (no shirt, no pants — the
  // ghost is just one ethereal sheet).
  ghost: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "sshhtttttttthhss",
      "shtttttttttttths",
      "htttttttttttttth",
      "htttttttttttttth",
      "hhh.hhhh.hhhh.hh",
      "..h...h...h...h.",
    ],
  ],
  // DRAGON — massive shoulders with a tail-stub on the right (a
  // single 'h' jutting past the body line at row 11-12). Wide
  // crocodilian stance, all skin/scale color (no clothing).
  dragon: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "hthttttttttttthh",
      "hthtttttttttth.h",
      "hhhhhhhhhhhhhhhh",
      "shhhhhhsshhhhhhs",
      "ssshhhsssshhhsss",
    ],
  ],
  // OGRE — massive bruiser body, beefy proportions, wide stance.
  // Reads as "I could uproot a tree." Same wide-shouldered template
  // as sasquatch but with extra inner detail in the torso.
  ogre: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "htttttttttttttth",
      "hthhhttttttthhth",
      "hhhhhhhhhhhhhhhh",
      "shhhhhhsshhhhhhs",
      "ssshhhsssshhhsss",
    ],
  ],
  // GOBLIN — small skinny body. Narrower shoulders + tiny legs read
  // as "trickster." Sized inside the 16-col canvas with extra
  // padding so it reads diminutive next to the other cryptids.
  goblin: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "...hhtttttthh...",
      "..hhtttttttthh..",
      "..htttttttttth..",
      "...hhhhhhhhhh...",
      "....hhh.hhhh....",
      "....hh..hhh.....",
    ],
  ],
  // DEMON — narrow caped silhouette like vampire but with a pointed
  // tail-tip on the right hip (a single 'h' protruding past the leg
  // outline at row 14). Pointed shoulders.
  demon: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "shhttttttttttths",
      "shtttttttttttths",
      "shtttttttttttths",
      "sshhhhhhhhhhhhss",
      "sssthhthhthhthhh",
      "sssshhhsshhhssss",
    ],
  ],
  // HARPY — bird-woman body with talon legs. Slim torso narrows to
  // claw-like legs at rows 14-15 (jagged talon pattern instead of
  // smooth feet).
  harpy: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "...hhttttttthh..",
      "..htttttttttth..",
      "..htttttttttth..",
      "...hhhhhhhhhh...",
      "...hh.hh.hh.hh..",
      "..h..h..h..h....",
    ],
  ],
  // TROLL — massive bruiser body, even wider than ogre. Beefy
  // arm detail in the torso row (3-pixel hh clusters at the inner
  // arms suggesting bulky musculature).
  troll: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "htttttttttttttth",
      "htthhttttttthhth",
      "hhhhhhhhhhhhhhhh",
      "shhhhhhsshhhhhhs",
      "ssshhhsssshhhsss",
    ],
  ],
  // WENDIGO — gaunt emaciated body. Narrow shoulders + skinny legs
  // with gaps between them suggest starvation / hunger spirit.
  wendigo: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "...hhttttttthh..",
      "..htttttttttth..",
      "..htttttttttth..",
      "...hhhhhhhhhh...",
      "....hhh.hhh.....",
      "....hh...hh.....",
    ],
  ],
  // MINOTAUR — beefy bipedal bull body. Same template as sasquatch
  // (wide shoulders, all-fur fill) — minotaurs are massive.
  minotaur: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "htttttttttttttth",
      "htttttttttttttth",
      "hhhhhhhhhhhhhhhh",
      "shhhhhhsshhhhhhs",
      "ssshhhsssshhhsss",
    ],
  ],
  // IMP — small slim body, narrower than human. Spread legs at row 15
  // give it a "perched/squatting" stance reading mischievous.
  imp: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      ".....hhhhhh.....",
      "....hhttttthh...",
      "....htttttttth..",
      ".....hhhhhh.....",
      ".....hh..hh.....",
      "....hh....hh....",
    ],
  ],
  // LICH — robed wizard body. Stringy robe trailing past the waist
  // (similar template to witch + banshee but slightly more
  // structured — tall thin lich shape).
  lich: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "...hhttttttthh..",
      "..htttttttttth..",
      "..htttttttttth..",
      "...hhhhhhhhhh...",
      "..hh.hhh..hhh.h.",
      "..h....h..h..h..",
    ],
  ],
  // CYCLOPS — beefy giant body, full-width fur-stance like sasquatch
  // since cyclops are giants. Same template, no costume detail.
  cyclops: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "htttttttttttttth",
      "htttttttttttttth",
      "hhhhhhhhhhhhhhhh",
      "shhhhhhsshhhhhhs",
      "ssshhhsssshhhsss",
    ],
  ],
  // GOLEM — boxy stone block body. All 'h' outline pattern with
  // 't' interior reads as carved stone. Wide rectangular legs at
  // bottom (no leg-gap on row 14) — golems are walking masonry.
  golem: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhhhhhhhhhhhhh",
      "hthttttttttttthh",
      "hthttttttttttthh",
      "hhhhhhhhhhhhhhhh",
      "hhhh.hhhhhh.hhhh",
      "hhhh.hhh..hh.hhh",
    ],
  ],
  // ZOMBIE — basic humanoid body with no notable changes — the
  // distinguishing zombie features live in the head (head wound +
  // ragged jaw) and overlays (hollow eyes + snarl).
  zombie: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "sshhttttttttthss",
      "shtttttttttttths",
      "shtttttttttttths",
      "sshhhhhhhhhhhhss",
      "ssshhhhhhhhhhsss",
      "sssshhhsshhhssss",
    ],
  ],
  // SKELETON — humanoid bone body. Subtle rib detail in row 12
  // (alternating h-t pattern inside the torso) hints at exposed ribs
  // without being too detailed for 16×16. Otherwise standard human.
  skeleton: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "sshhttttttttthss",
      "shtthtttttthtths",
      "shtththtttthtths",
      "sshhhhhhhhhhhhss",
      "sssthhhhhhhhthss",
      "sssshhhsshhhssss",
    ],
  ],
  // WITCH — robe with stringy hair trailing past the waist. Same
  // narrow-torso template as banshee but with deliberate stringy
  // hair pattern instead of dissolving wisps.
  witch: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "...hhttttttthh..",
      "..htttttttttth..",
      "..htttttttttth..",
      "...hhhhhhhhhh...",
      "..hhh.hhh.hhh.h.",
      "..h.h..h..h..h..",
    ],
  ],
  // FAERIE — tiny slim body, narrower than human, dainty pose. The
  // head silhouette is so small that the body can stay slim too —
  // matches the "small fae" feel.
  faerie: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      ".....hhhhhh.....",
      "....hhttttthh...",
      "....httttttth...",
      ".....hhhhhh.....",
      ".....hh..hh.....",
      ".....hh..hh.....",
    ],
  ],
  // BANSHEE — wispy spectral robe trailing into mist. Solid torso
  // narrows then dissolves into 5-prong scalloped wisps at row 15.
  banshee: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "...hhttttttthh..",
      "..htttttttttth..",
      "..htttttttttth..",
      "...hhhhhhhhhh...",
      "....hhhhhhhh....",
      ".h.h.hh.hh.h.h..",
    ],
  ],
  // GNOME — triangular beard body. The head ends at row 9 where
  // the beard begins (rows 10-15) and tapers to a single 2px tip
  // at row 15. No visible legs — the gnome is just hat + beard.
  gnome: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "..hhhhhhhhhhhh..",
      "...hhhhhhhhhh...",
      "....hhhhhhhh....",
      ".....hhhhhh.....",
      "......hhhh......",
      ".......hh.......",
    ],
  ],
  // KRAKEN — 3 thick tentacles dropping straight down from the
  // mantle attach line at row 9. Each tentacle is 2-3 chars wide so
  // the silhouette stays readable; 1px sucker notches at row 13
  // confirm "tentacle" rather than "fingers."
  kraken: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "..hh...hhh...hh.",
      "..hh...hhh...hh.",
      "..hh...hhh...hh.",
      "..hth..hth..hth.",
      "..hh...hhh...hh.",
      "..hh...hhh...hh.",
    ],
  ],
  // MERMAID — fish tail body. Narrow torso (rows 10-12) tapers to a
  // tail (row 13) which then flares into a wider fluke (rows 14-15).
  // No legs at all — the silhouette dissolves from skin into tail.
  mermaid: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "...hhttttttthh..",
      "...htttttttttth.",
      "....hhhhhhhhhh..",
      ".....htttttth...",
      "....httttttttth.",
      "...hhhhhhhhhhhh.",
    ],
  ],
  // MOTHMAN — wider shoulders with hint of folded wings (extra 'h'
  // pixels jutting outward at row 10). Humanoid below.
  mothman: [
    [
      _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty, _empty,
      "hhhhtttttttthhhh",
      "shhhtttttttthhhs",
      "shtthtttttthtths",
      "sshhhhhhhhhhhhss",
      "ssshtthhhhtthsss",
      "sssshhhsshhhssss",
    ],
  ],
};

// Dance definitions. Each is a sequence of frames; xShift/yShift in pixel units.
window.DANCES = {
  sway:    {
    label: 'Sway',
    speed: 320,
    frames: [
      { body: 0, yShift: 0, xShift:  0 },
      { body: 0, yShift: 0, xShift: -1 },
      { body: 0, yShift: 0, xShift:  0 },
      { body: 0, yShift: 0, xShift:  1 },
    ],
  },
  bop:     {
    label: 'Bop',
    speed: 280,
    frames: [
      { body: 0, yShift: 0, xShift: 0 },
      { body: 0, yShift: -1, xShift: 0 },
    ],
  },
  jacks:   {
    label: 'Jacks',
    speed: 220,
    frames: [
      { body: 0, yShift:  0, xShift: 0 },
      { body: 1, yShift:  1, xShift: 0 },
      { body: 0, yShift: -1, xShift: 0 },
    ],
  },
  wiggle:  {
    label: 'Wiggle',
    speed: 200,
    frames: [
      { body: 0, yShift: 0, xShift: -1 },
      { body: 0, yShift: 0, xShift:  1 },
    ],
  },
  spin:    {
    label: 'Spin',
    speed: 240,
    frames: [
      // simulate spin via wide stance + narrow stance + wide on opposite + narrow
      { body: 1, yShift:  0, xShift:  0 },
      { body: 2, yShift:  0, xShift: -1 },
      { body: 1, yShift: -1, xShift:  0 },
      { body: 3, yShift:  0, xShift:  1 },
    ],
  },
  bounce:  {
    label: 'Bounce',
    speed: 180,
    frames: [
      { body: 0, yShift:  0, xShift: 0 },
      { body: 0, yShift: -2, xShift: 0 },
      { body: 0, yShift: -1, xShift: 0 },
      { body: 0, yShift:  1, xShift: 0 },
    ],
  },
  shimmy:  {
    label: 'Shimmy',
    speed: 130,
    frames: [
      { body: 0, yShift: 0, xShift: -1 },
      { body: 1, yShift: 0, xShift:  0 },
      { body: 0, yShift: 0, xShift:  1 },
      { body: 1, yShift: 0, xShift:  0 },
    ],
  },
  headbang:{
    label: 'Headbang',
    speed: 160,
    frames: [
      { body: 0, yShift:  0, xShift: 0 },
      { body: 0, yShift:  1, xShift: 0 },
      { body: 0, yShift: -2, xShift: 0 },
      { body: 0, yShift:  0, xShift: 0 },
    ],
  },
  float:   {
    label: 'Float',
    speed: 360,
    frames: [
      { body: 0, yShift:  0, xShift:  0 },
      { body: 0, yShift: -1, xShift:  1 },
      { body: 0, yShift: -2, xShift:  0 },
      { body: 0, yShift: -1, xShift: -1 },
    ],
  },
  jump:    {
    label: 'Jump',
    speed: 220,
    frames: [
      { body: 0, yShift:  1, xShift: 0 },  // crouch
      { body: 1, yShift: -3, xShift: 0 },  // peak with arms out
      { body: 0, yShift: -1, xShift: 0 },
      { body: 0, yShift:  0, xShift: 0 },
    ],
  },
  // ---- new dances ----
  // Twist: pivots torso left/right with arms swinging open
  twist:   {
    label: 'Twist',
    speed: 200,
    frames: [
      { body: 2, yShift: 0, xShift: -1 },
      { body: 1, yShift: 0, xShift:  0 },
      { body: 3, yShift: 0, xShift:  1 },
      { body: 1, yShift: 0, xShift:  0 },
    ],
  },
  // Disco: classic point-up alternating arms with a hip pop
  disco:   {
    label: 'Disco',
    speed: 240,
    frames: [
      { body: 2, yShift: -1, xShift: -1 },
      { body: 0, yShift:  0, xShift:  0 },
      { body: 3, yShift: -1, xShift:  1 },
      { body: 0, yShift:  0, xShift:  0 },
    ],
  },
  // Robot: stiff staccato — sharp poses, no in-between
  robot:   {
    label: 'Robot',
    speed: 280,
    frames: [
      { body: 1, yShift:  0, xShift: 0 },
      { body: 1, yShift:  0, xShift: 0 },
      { body: 0, yShift:  0, xShift: 0 },
      { body: 2, yShift:  0, xShift: 0 },
      { body: 2, yShift:  0, xShift: 0 },
      { body: 0, yShift:  0, xShift: 0 },
      { body: 3, yShift:  0, xShift: 0 },
      { body: 3, yShift:  0, xShift: 0 },
    ],
  },
  // Moonwalk: slides side to side with subtle bob
  moonwalk:{
    label: 'Moonwalk',
    speed: 200,
    frames: [
      { body: 0, yShift:  0, xShift:  2 },
      { body: 0, yShift: -1, xShift:  1 },
      { body: 0, yShift:  0, xShift:  0 },
      { body: 0, yShift: -1, xShift: -1 },
      { body: 0, yShift:  0, xShift: -2 },
      { body: 0, yShift: -1, xShift: -1 },
      { body: 0, yShift:  0, xShift:  0 },
      { body: 0, yShift: -1, xShift:  1 },
    ],
  },
  // Vibe: laid-back gentle sway with a slight bob
  vibe:    {
    label: 'Vibe',
    speed: 360,
    frames: [
      { body: 2, yShift:  0, xShift: 0 },
      { body: 0, yShift: -1, xShift: 0 },
      { body: 3, yShift:  0, xShift: 0 },
      { body: 0, yShift: -1, xShift: 0 },
    ],
  },
  // Boogie: fast hip-shake combo
  boogie:  {
    label: 'Boogie',
    speed: 140,
    frames: [
      { body: 2, yShift: 0, xShift: -1 },
      { body: 1, yShift: -1, xShift: 0 },
      { body: 3, yShift: 0, xShift:  1 },
      { body: 1, yShift: -1, xShift: 0 },
    ],
  },
  // Hop: little side hops left and right
  hop:     {
    label: 'Hop',
    speed: 200,
    frames: [
      { body: 0, yShift:  1, xShift: -1 },
      { body: 1, yShift: -2, xShift: -1 },
      { body: 0, yShift:  0, xShift:  0 },
      { body: 0, yShift:  1, xShift:  1 },
      { body: 1, yShift: -2, xShift:  1 },
      { body: 0, yShift:  0, xShift:  0 },
    ],
  },
  // Wave: gentle wave with arms-up frame
  wave:    {
    label: 'Wave',
    speed: 280,
    frames: [
      { body: 1, yShift:  0, xShift: 0 },
      { body: 1, yShift: -1, xShift: 0 },
      { body: 0, yShift:  0, xShift: 0 },
      { body: 1, yShift: -1, xShift: 0 },
    ],
  },
  // Dizzy: rapid tilts side-to-side, eventually falls into bob
  dizzy:   {
    label: 'Dizzy',
    speed: 110,
    frames: [
      { body: 2, yShift:  0, xShift: -1 },
      { body: 3, yShift:  0, xShift:  1 },
      { body: 2, yShift:  0, xShift: -1 },
      { body: 3, yShift:  0, xShift:  1 },
      { body: 0, yShift: -1, xShift:  0 },
      { body: 0, yShift:  0, xShift:  0 },
    ],
  },
};
// Default dance (matches user's reference gif most closely)
window.DEFAULT_DANCE = 'sway';

// =============================================================
// STYLE OPTIONS — for the chip rows in the panel
// =============================================================
window.STYLE_OPTS = {
  headStyle: [
    { id:'round',         label:'Round'    },
    { id:'shine',         label:'Shine'    },
    { id:'egg',           label:'Egg'      },
    { id:'wide',          label:'Wide'     },
    { id:'pointy',        label:'Pointy'   },
    { id:'alien-grey',    label:'Grey'     },
    { id:'alien-skull',   label:'Skull'    },
    { id:'alien-bug',     label:'Bug'      },
    { id:'alien-classic', label:'Classic'  },
    { id:'android-dome',  label:'Dome'     },
    { id:'android-block', label:'Block'    },
    // ---- Mythics (Pro tier) ----
    // Each entry must appear here so the head chip grid can list them
    // in the picker. The actual silhouette grids live in HEAD_STYLES
    // above. These IDs are referenced by mythics.headStyles in TYPES.
    { id:'sasquatch',     label:'Sasquatch'},
    { id:'yeti',          label:'Yeti'     },
    { id:'werewolf',      label:'Werewolf' },
    { id:'vampire',       label:'Vampire'  },
    { id:'ghost',         label:'Ghost'    },
    { id:'mothman',       label:'Mothman'  },
    { id:'dragon',        label:'Dragon'   },
    { id:'demon',         label:'Demon'    },
    { id:'ogre',          label:'Ogre'     },
    { id:'goblin',        label:'Goblin'   },
    { id:'mermaid',       label:'Mermaid'  },
    { id:'kraken',        label:'Kraken'   },
    { id:'banshee',       label:'Banshee'  },
    { id:'gnome',         label:'Gnome'    },
    { id:'harpy',         label:'Harpy'    },
    { id:'troll',         label:'Troll'    },
    { id:'witch',         label:'Witch'    },
    { id:'faerie',        label:'Faerie'   },
    { id:'zombie',        label:'Zombie'   },
    { id:'skeleton',      label:'Skeleton' },
    { id:'cyclops',       label:'Cyclops'  },
    { id:'golem',         label:'Golem'    },
    { id:'imp',           label:'Imp'      },
    { id:'lich',          label:'Lich'     },
    { id:'wendigo',       label:'Wendigo'  },
    { id:'minotaur',      label:'Minotaur' },
  ],
  hairStyle: [
    { id:'none',     label:'None'    },
    { id:'short',    label:'Short'   },
    { id:'long',     label:'Long'    },
    { id:'buzz',     label:'Buzz'    },
    { id:'bowl',     label:'Bowl'    },
    { id:'spiky',    label:'Spiky'   },
    { id:'curly',    label:'Curly'   },
    { id:'wavy',     label:'Wavy'    },
    { id:'bangs',    label:'Bangs'   },
    { id:'fringe',   label:'Fringe'  },
    { id:'pony',     label:'Pony'    },
    { id:'pigtails', label:'Pigtails'},
    { id:'braids',   label:'Braids'  },
    { id:'dreads',   label:'Dreads'  },
    { id:'afro',     label:'Afro'    },
    { id:'mohawk',   label:'Mohawk'  },
    { id:'fauxhawk', label:'Fauxhawk'},
    { id:'flattop',  label:'Flattop' },
    { id:'sidepart', label:'Sidepart'},
    { id:'slicked',  label:'Slicked' },
    { id:'undercut', label:'Undercut'},
    { id:'mullet',   label:'Mullet'  },
    { id:'bun',      label:'Bun'     },
    { id:'manbun',   label:'Manbun'  },
    { id:'emo',      label:'Emo'     },
  ],
  eyeStyle: [
    { id:'normal',   label:'Normal'  },
    { id:'happy',    label:'Happy'   },
    { id:'closed',   label:'Closed'  },
    { id:'wink',     label:'Wink'    },
    { id:'stars',    label:'Stars'   },
    { id:'shades',   label:'Shades'  },
    { id:'sleepy',   label:'Sleepy'  },
    // Cryptid-only — appear in mythics' eye picker via the layer
    // builtins filter. Ordered by visual punch.
    { id:'sunken',   label:'Sunken'  },
    { id:'glow',     label:'Glow'    },
    { id:'hollow',   label:'Hollow'  },
    { id:'thinline', label:'Thinline'},
    { id:'slit',     label:'Slit'    },
    { id:'cyclops',  label:'Cyclops' },
  ],
  mouthStyle: [
    { id:'smile', label:'Smile' },
    { id:'grin',  label:'Grin'  },
    { id:'open',  label:'Open'  },
    { id:'flat',  label:'Flat'  },
    { id:'frown', label:'Frown' },
    { id:'none',  label:'None'  },
    // Cryptid-only.
    { id:'fangs', label:'Fangs' },
    { id:'snarl', label:'Snarl' },
    { id:'gape',  label:'Gape'  },
  ],
  hatStyle: [
    { id:'none',   label:'None'   },
    { id:'cap',    label:'Cap'    },
    { id:'beanie', label:'Beanie' },
    { id:'pom',    label:'Pompom' },
    { id:'crown',  label:'Crown'  },
    { id:'top',    label:'Top Hat'},
    { id:'band',   label:'Band'   },
    { id:'visor',  label:'Visor'  },
    { id:'hood',   label:'Hood'   },
  ],
  facialStyle: [
    { id:'none',      label:'None'      },
    { id:'stache',    label:'Stache'    },
    { id:'goatee',    label:'Goatee'    },
    { id:'beard',     label:'Beard'     },
    { id:'fullbeard', label:'Full Beard'},
    { id:'chinstrap', label:'Chinstrap' },
  ],
  antennaStyle: [
    { id:'none',     label:'None'     },
    { id:'feelers',  label:'Feelers'  },
    { id:'stalks',   label:'Stalks'   },
    { id:'horns',    label:'Horns'    },
    { id:'tendrils', label:'Tendrils' },
    { id:'crown',    label:'Crown'    },
    { id:'dish',     label:'Dish'     },
    { id:'blink',    label:'Blink'    },
    { id:'spike',    label:'Spike'    },
    { id:'rabbit',   label:'Rabbit'   },
    { id:'dual',     label:'Dual'     },
  ],
};

// =============================================================
// CHARACTER TYPES — Human / Alien / Android
// Each type defines:
//   - Its skin palette (literal flesh tones, alien hues, robot finishes)
//   - The head shapes available to it
//   - Which layers (hair/hat/eyes/etc) are visible, and which built-ins of
//     each layer it allows
// Switching type re-snaps state to valid options and rebuilds the panel.
//
// "ALL" is a sentinel meaning "every built-in for this layer is allowed".
// =============================================================
const ALL = '*ALL*';
window.TYPES = {
  human: {
    label: 'Human',
    requiresTier: 'free',
    headLabel: 'Head',
    headStyles: ['round', 'shine', 'egg', 'wide', 'pointy'],
    defaultHead: 'round',
    skin: [
      // Free tier shows only the first 2 — light + darkest. Cocoa
      // (the darkest) sits at index 1 so a free user picks between
      // porcelain and cocoa.
      { id:'porcelain', label:'Porcelain', color:'#ffe0c2' },
      { id:'cocoa',     label:'Cocoa',     color:'#5e3520' },
      { id:'rosy',      label:'Rosy',      color:'#ffcfb6' },
      { id:'peach',     label:'Peach',     color:'#f9b878' },
      { id:'olive',     label:'Olive',     color:'#d49560' },
      { id:'tan',       label:'Tan',       color:'#b97a4d' },
      { id:'umber',     label:'Umber',     color:'#8b5530' },
    ],
    layers: {
      hairStyle:   { label: 'Hair',    builtins: ALL },
      // Eye / mouth restrict to the human-flavored set so cryptid
      // overlays (sunken / glow / hollow / fangs / snarl / etc.)
      // don't leak into the human picker. Mythics defines its own
      // cryptid-only builtins explicitly.
      eyeStyle:    { label: 'Eyes',    builtins: ['normal','happy','closed','wink','stars','shades','sleepy'] },
      mouthStyle:  { label: 'Mouth',   builtins: ['smile','grin','open','flat','frown','none'] },
      hatStyle:    { label: 'Hat',     builtins: ALL },
      facialStyle: { label: 'Facial',  builtins: ALL },
    },
  },
  alien: {
    label: 'Alien',
    requiresTier: 'jammer',
    headLabel: 'Species',
    headStyles: ['alien-grey', 'alien-skull', 'alien-bug', 'alien-classic', 'pointy'],
    defaultHead: 'alien-grey',
    skin: [
      { id:'a-grey',   label:'Roswell',  color:'#a8b2a0' },
      { id:'a-green',  label:'Slime',    color:'#7ec84a' },
      { id:'a-mint',   label:'Mint',     color:'#9bdcc0' },
      { id:'a-cyan',   label:'Cyan',     color:'#5acaca' },
      { id:'a-purple', label:'Cosmic',   color:'#9a6ad8' },
      { id:'a-magenta',label:'Nebula',   color:'#d85aaa' },
      { id:'a-gold',   label:'Stardust', color:'#e8b840' },
      { id:'a-coral',  label:'Coral',    color:'#ff8a6a' },
    ],
    // Aliens don't have hair — the hairStyle slot becomes Antennae for them.
    // No facial hair. Eyes reduced to weirder ones.
    layers: {
      hairStyle:   { label: 'Antennae', source: 'antenna', builtins: ['none','feelers','stalks','horns','tendrils','crown'] },
      eyeStyle:    { label: 'Eyes',     builtins: ['normal','happy','closed','wink','stars','shades','sleepy'] },
      // Same human-only mouth set so cryptid mouths don't leak.
      mouthStyle:  { label: 'Mouth',    builtins: ['smile','grin','open','flat','frown','none'] },
      hatStyle:    { label: 'Hat',      builtins: ['none','crown','top','band','visor','hood'] },
    },
  },
  android: {
    label: 'Android',
    requiresTier: 'jammer',
    headLabel: 'Model',
    headStyles: ['android-dome', 'android-block', 'shine', 'round'],
    defaultHead: 'android-dome',
    skin: [
      { id:'a-chrome',  label:'Chrome',     color:'#d4d8dc' },
      { id:'a-steel',   label:'Steel',      color:'#9aa0a8' },
      { id:'a-titanium',label:'Titanium',   color:'#7a808a' },
      { id:'a-matte',   label:'Matte',      color:'#3a3e46' },
      { id:'a-rose',    label:'Rose Gold',  color:'#d8a89a' },
      { id:'a-amber',   label:'Amber',      color:'#d8a040' },
      { id:'a-copper',  label:'Copper',     color:'#c87a40' },
      { id:'a-platinum',label:'Platinum',   color:'#dadeec' },
    ],
    // Androids have hardware on top of head (antenna/dish/blinker), no facial hair.
    layers: {
      hairStyle:   { label: 'Antennae', source: 'antenna', builtins: ['none','dish','blink','spike','rabbit','dual'] },
      eyeStyle:    { label: 'Optics',   builtins: ['normal','happy','closed','wink','shades'] },
      mouthStyle:  { label: 'Speaker',  builtins: ['smile','grin','open','flat','none'] },
      hatStyle:    { label: 'Helmet',   builtins: ['none','cap','crown','top','band','visor','hood'] },
    },
  },
  mythics: {
    label: 'Mythics',
    requiresTier: 'pro',
    headLabel: 'Species',
    // Cryptid roster — designed per the 2026-05-04 silhouette canon.
    // Each head reads in the squint test (filled solid the species is
    // identifiable). More can be added; these 6 cover the classic
    // cryptid + folkloric beats.
    headStyles: ['sasquatch', 'yeti', 'werewolf', 'vampire', 'ghost', 'mothman', 'dragon', 'demon', 'ogre', 'goblin', 'mermaid', 'kraken', 'banshee', 'gnome', 'harpy', 'troll', 'witch', 'faerie', 'zombie', 'skeleton', 'cyclops', 'golem', 'imp', 'lich', 'wendigo', 'minotaur'],
    defaultHead: 'sasquatch',
    skin: [
      // Cryptid palette — explicitly NOT human skin tones. Each color
      // is named after the creature it fits and shifted away from
      // anything that could read as flesh. Drives the entire body
      // (fur, hide, shroud — for fur creatures the Skin slot is the
      // ONLY color slot since hair = body fur, see hideLayers below).
      { id:'m-sasquatch', label:'Sasquatch', color:'#5a3a1f' },  // dark woodland brown
      // Lifted #3a3a40 → #4c4c56 (2026-06-12) for dark-bg legibility.
      { id:'m-werewolf',  label:'Werewolf',  color:'#4c4c56' },  // black-charcoal canid
      { id:'m-yeti',      label:'Yeti',      color:'#f0eee0' },  // snow white
      { id:'m-wraith',    label:'Wraith',    color:'#b8c0c8' },  // ghostly blue-grey
      // Lifted #2a2630 → #4a4254 (2026-06-12): the old void-black was
      // 1 step above the dark UI bg, so every shadow species (mothman,
      // demon, kraken, lich, wendigo) rendered as an unreadable blob.
      // Still reads as "void" next to the other palette entries.
      { id:'m-shadow',    label:'Shadow',    color:'#4a4254' },  // mothman void
      { id:'m-moss',      label:'Moss',      color:'#6a7a4a' },  // swamp cryptids
      { id:'m-rust',      label:'Rust',      color:'#7a4520' },  // warmer sasquatch alt
      { id:'m-crimson',   label:'Crimson',   color:'#5a2028' },  // vampire blood
    ],
    // Mythics is radically stripped vs human/alien/android — the
    // cryptid silhouette IS the costume. No hats (a sasquatch
    // wearing a baseball cap reads as a costume, not a creature),
    // no separate hair (body fur = head fur, controlled by Skin),
    // no facial hair, no outfit. Just Skin · Species · Eyes · Mouth.
    // Owner-only Draw stays visible (gated by isDev).
    hideTabs: ['hair', 'hat', 'facial', 'outfit'],
    layers: {
      // Eye + mouth pickers ONLY show cryptid-flavored options. The
      // human "Normal / Happy / Wink" set doesn't fit a cryptid head;
      // limiting builtins keeps the picker tight + on-character.
      eyeStyle:   { label: 'Eyes',  builtins: ['sunken','ember','glow','hollow','thinline','slit','cyclops','closed'] },
      mouthStyle: { label: 'Mouth', builtins: ['fangs','snarl','gape','frown','flat','none'] },
    },
  },
};
// Helpers — take a `state` arg explicitly (no implicit globals).
window.getActiveSkinPalette = function(state) {
  return (window.TYPES[state && state.type] || window.TYPES.human).skin;
};
window.getActiveType = function(state) {
  return window.TYPES[state && state.type] || window.TYPES.human;
};
// Returns the visible layer rows for the current type
window.getActiveLayers = function(state) {
  return window.getActiveType(state).layers || {};
};
// Returns the overlay dictionary for a layer for the current type.
// hairStyle on alien/android pulls from window.ANTENNA_OVERLAYS instead.
window.getOverlayDict = function(state, layerKey) {
  const layer = window.getActiveLayers(state)[layerKey];
  if (!layer) return null;
  if (layer.source === 'antenna') return window.ANTENNA_OVERLAYS;
  return ({
    headStyle:   window.HEAD_STYLES,
    hairStyle:   window.HAIR_OVERLAYS,
    eyeStyle:    window.EYE_OVERLAYS,
    mouthStyle:  window.MOUTH_OVERLAYS,
    hatStyle:    window.HAT_OVERLAYS,
    facialStyle: window.FACIAL_OVERLAYS,
  })[layerKey] || null;
};
// Returns the STYLE_OPTS list for a layer, filtered to what the current type allows.
window.getActiveStyleOpts = function(state, layerKey) {
  if (layerKey === 'headStyle') {
    const allowed = window.getActiveType(state).headStyles;
    return (window.STYLE_OPTS.headStyle || []).filter(o => allowed.includes(o.id));
  }
  const layer = window.getActiveLayers(state)[layerKey];
  if (!layer) return [];
  if (layer.source === 'antenna') {
    const opts = window.STYLE_OPTS.antennaStyle || [];
    if (layer.builtins === ALL) return opts;
    return opts.filter(o => layer.builtins.includes(o.id));
  }
  const all = window.STYLE_OPTS[layerKey] || [];
  if (layer.builtins === ALL) return all;
  return all.filter(o => layer.builtins.includes(o.id));
};
window.EDITOR_PALETTE = [
  null, // transparent
  // Slot tokens — follow the avatar's current colors
  '@skin', '@hair', '@shirt', '@pants', '@hat', '@facial',
  // Universal palette
  '#0a1a24', '#15151c', '#3a3a48', '#6a6a78', '#a8a8b4', '#dcdce0', '#ffffff',
  '#ffe0c2', '#f9b878', '#d49560', '#b97a4d', '#8b5530', '#5e3520',
  '#ff3908', '#ff8c2a', '#f4cc28', '#3aaa55', '#2aaab2', '#3a78d8', '#8a4ad8',
  '#ff6aa8', '#5acaa8', '#efce08', '#c8362a',
];
// Map of slot tokens → display label and slot key for getColor()
window.EDITOR_SLOTS = {
  '@skin':   { label: 'Skin',   slot: 'skin'   },
  '@hair':   { label: 'Hair',   slot: 'hair'   },
  '@shirt':  { label: 'Shirt',  slot: 'shirt'  },
  '@pants':  { label: 'Pants',  slot: 'pants'  },
  '@hat':    { label: 'Hat',    slot: 'hat'    },
  '@facial': { label: 'Facial', slot: 'facial' },
};
