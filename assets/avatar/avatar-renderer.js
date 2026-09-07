// =============================================================
// JAMNUTZ avatar renderer — pure, stateless, type-aware.
// Loaded as a <script> in index.html and studio.html.
// Sets window.JamnutzAvatar.{ compose, drawAvatar, paletteColor, DEFAULT_AVATAR }
// Reads sprite data from globals defined by avatar-data.js.
//
// Faithful port of the original avatar-maker compose/drawAvatar functions:
// - type-aware (human / alien / android — alien & android use ANTENNA_OVERLAYS
//   for the hair slot, hide layers their type lacks)
// - head-shape-aware silhouette fitting for hair / hat / facial overlays
// - dance keyframes drive body frame + xShift/yShift
// - @slot tokens in custom sprites resolve to live colors
// =============================================================
(function (G) {
  'use strict';

  // ────────────────────────────────────────────────────────────────────
  // Auto-migrate the legacy 16×16 sprite data + persisted customs/overrides
  // to 20×20 by centering the existing rows in the bigger grid (2-row bleed
  // on every side). Existing sprites keep working; new edits get the extra
  // squares to draw with. Idempotent — running twice is a no-op.
  // ────────────────────────────────────────────────────────────────────
  var TARGET_SIZE = 20;
  function padTo(target, ov) {
    if (!Array.isArray(ov)) return ov;
    var h = ov.length;
    var w = (ov[0] && ov[0].length) || 0;
    if (h === target && w === target) return ov;
    var yOff = Math.floor((target - h) / 2);
    var xOff = Math.floor((target - w) / 2);
    var out = [];
    for (var y = 0; y < target; y++) {
      var row = '';
      for (var x = 0; x < target; x++) {
        var oy = y - yOff, ox = x - xOff;
        if (oy >= 0 && oy < h && ox >= 0 && ox < w) {
          row += (ov[oy] && ov[oy].charAt(ox)) || '.';
        } else {
          row += '.';
        }
      }
      out.push(row);
    }
    return out;
  }
  function padDictTo(target, dict) {
    if (!dict) return;
    Object.keys(dict).forEach(function (k) { dict[k] = padTo(target, dict[k]); });
  }
  function migrateBuiltinsTo(target) {
    if (G.SIZE === target) return;
    if (Array.isArray(G.HEAD)) G.HEAD = padTo(target, G.HEAD);
    padDictTo(target, G.HEAD_STYLES);
    padDictTo(target, G.HAIR_OVERLAYS);
    padDictTo(target, G.EYE_OVERLAYS);
    padDictTo(target, G.MOUTH_OVERLAYS);
    padDictTo(target, G.HAT_OVERLAYS);
    padDictTo(target, G.FACIAL_OVERLAYS);
    padDictTo(target, G.ANTENNA_OVERLAYS);
    if (Array.isArray(G.BODY_FRAMES)) {
      G.BODY_FRAMES = G.BODY_FRAMES.map(function (f) { return padTo(target, f); });
    }
    // Per-head body overrides (cryptid bodies, etc.) — same padding.
    if (G.BODY_FRAMES_BY_HEAD) {
      Object.keys(G.BODY_FRAMES_BY_HEAD).forEach(function (k) {
        G.BODY_FRAMES_BY_HEAD[k] = G.BODY_FRAMES_BY_HEAD[k].map(function (f) { return padTo(target, f); });
      });
    }
    G.SIZE = target;
  }
  // Custom + override grids are stored as base36-indexed rows. Pad them
  // with '.' (transparent) when their length doesn't match the new SIZE.
  function padPaletteGrid(target, grid) {
    if (!Array.isArray(grid)) return grid;
    var h = grid.length;
    var w = (grid[0] && grid[0].length) || 0;
    if (h === target && w === target) return grid;
    var yOff = Math.floor((target - h) / 2);
    var xOff = Math.floor((target - w) / 2);
    var out = [];
    for (var y = 0; y < target; y++) {
      var row = '';
      for (var x = 0; x < target; x++) {
        var oy = y - yOff, ox = x - xOff;
        if (oy >= 0 && oy < h && ox >= 0 && ox < w) {
          var ch = (grid[oy] && grid[oy].charAt(ox));
          row += (ch && ch !== '') ? ch : '.';
        } else {
          row += '.';
        }
      }
      out.push(row);
    }
    return out;
  }
  G.__jamnutzPadPaletteGrid = padPaletteGrid; // exposed so lib/avatar.js can reuse on load
  G.__jamnutzPadOverlay = padTo;

  migrateBuiltinsTo(TARGET_SIZE);

  // ────────────────────────────────────────────────────────────────────
  // Direction-aware grid resolver. Every sprite-bearing thing — built-in
  // overlay (plain 20-row array), per-head override, global custom,
  // BODY_FRAMES entry — passes through here. Returns the grid (rows of
  // chars or a base36 grid) for the requested direction, falling back
  // to front when side/back aren't authored.
  //
  //   array               → front-only built-in overlay (legacy shape)
  //   { grid, palette }    → legacy single-direction sprite (front-only)
  //   { front, side?, back?, palette } → new direction-aware sprite
  //
  // dir is one of 'front' | 'side' | 'back'. 'right' is handled by the
  // drawAvatar caller (X-flip of side); the renderer never sees 'right'.
  // ────────────────────────────────────────────────────────────────────
  function gridForDirection(spriteOrOverlay, dir) {
    if (!spriteOrOverlay) return null;
    // Plain row-array → built-in overlay, always front
    if (Array.isArray(spriteOrOverlay)) return spriteOrOverlay;
    // Direction-aware sprite — pick named direction with front fallback
    if (spriteOrOverlay[dir]) return spriteOrOverlay[dir];
    if (spriteOrOverlay.front) return spriteOrOverlay.front;
    // Legacy single-grid sprite — same grid for all directions
    if (spriteOrOverlay.grid) return spriteOrOverlay.grid;
    return null;
  }
  G.__jamnutzGridForDirection = gridForDirection;

  var DEFAULT_AVATAR = {
    type: 'human',
    skin: 'peach', hair: 'brown', shirt: 'red', pants: 'gray',
    hat: 'red', facial: 'black',
    headStyle: 'round',
    hairStyle: 'short', eyeStyle: 'normal', mouthStyle: 'smile',
    hatStyle: 'none', facialStyle: 'none',
    customs: { headStyle: [], hairStyle: [], eyeStyle: [], mouthStyle: [], hatStyle: [], facialStyle: [] },
    custom:  { headStyle: null, hairStyle: null, eyeStyle: null, mouthStyle: null, hatStyle: null, facialStyle: null },
    dance: 'sway',     // string id of dance, or null = idle bob only
    dancing: false,    // when true, animate via dance keyframes
    frame: 0,          // current dance keyframe index
    idleBob: 0,        // 0 or 1 — used when not dancing
  };

  // Look up a color from a layer + id. Skin spans across types.
  function paletteColor(slot, id) {
    if (slot === 'skin') {
      var TYPES = G.TYPES || {};
      for (var k in TYPES) {
        var hit = (TYPES[k].skin || []).find(function (p) { return p.id === id; });
        if (hit) return hit.color;
      }
    }
    var P = (G.PALETTES || {})[slot];
    if (!P) return '#000';
    var h = P.find(function (p) { return p.id === id; });
    return (h && h.color) || '#000';
  }

  // ---- compose (returns 16x16 grid of cell descriptors) -------------
  // direction: 'front' (default) | 'side' | 'back'. 'right' is rendered as
  // an X-flipped 'side' at draw time — compose itself never sees 'right'.
  function compose(state, direction) {
    var SIZE = G.SIZE || 16;
    var dir = direction || 'front';
    var grid = [];
    for (var y = 0; y < SIZE; y++) {
      var row = [];
      for (var x = 0; x < SIZE; x++) row.push(null);
      grid.push(row);
    }
    var customs = state.customs || {};
    var custom  = state.custom || {};

    // overlay can be: a plain row-array (built-in front overlay) OR a
    // direction-aware { front, side?, back? } object. Resolve via helper.
    function paintBuiltin(overlay, layerKey) {
      var rows = gridForDirection(overlay, dir);
      if (!rows) return;
      for (var y = 0; y < SIZE; y++) {
        var r = rows[y]; if (!r) continue;
        for (var x = 0; x < SIZE; x++) {
          var ch = r[x];
          if (!ch || ch === '.') continue;
          grid[y][x] = layerKey ? { ch: ch, _layer: layerKey } : { ch: ch };
        }
      }
    }

    // sprite is { palette, grid? } (legacy) or { palette, front, side?, back? }
    // (new). Either way, gridForDirection picks the right rows.
    function paintCustom(sprite, layerKey) {
      var rows = gridForDirection(sprite, dir);
      if (!rows) return;
      for (var y = 0; y < SIZE; y++) {
        var r = rows[y]; if (!r) continue;
        for (var x = 0; x < SIZE; x++) {
          var ch = r[x];
          if (!ch || ch === '.') continue;
          var idx = parseInt(ch, 36);
          var col = sprite.palette && sprite.palette[idx];
          // Resolve @slot tokens to live colors
          if (col && typeof col === 'string' && col.charAt(0) === '@') {
            var meta = (G.EDITOR_SLOTS || {})[col];
            if (meta) col = paletteColor(meta.slot, state[meta.slot]);
          }
          if (col) grid[y][x] = { color: col, _layer: layerKey };
        }
      }
    }

    // Head silhouette mask (booleans) — 't'/'h'/'s' cells are head territory.
    // The mask is computed from the FRONT built-in regardless of direction:
    // the mask code reads char-token grids ('t'/'h'/'s'), and side/back are
    // typically authored as base36 overrides which don't carry those tokens.
    // Side/back overrides will paint correctly via paintLayer below; only
    // the hair/hat fit-clip silhouette stays front-shaped. Acceptable v1 —
    // see HANDOFF if this needs revisiting.
    var headOverlay = ((G.HEAD_STYLES || {})[state.headStyle]) || G.HEAD;
    var headMask = [];
    var skinMask = [];
    for (var y2 = 0; y2 < SIZE; y2++) {
      var rh = headOverlay && headOverlay[y2];
      var hm = [], sm = [];
      for (var x2 = 0; x2 < SIZE; x2++) {
        var ch2 = rh ? rh[x2] : '';
        hm.push(!!ch2 && ch2 !== '.');
        sm.push(ch2 === 't' || ch2 === 's');
      }
      headMask.push(hm); skinMask.push(sm);
    }
    var headTopRow = SIZE, headBottomRow = -1;
    for (var yy = 0; yy < SIZE; yy++) for (var xx = 0; xx < SIZE; xx++) {
      if (headMask[yy][xx]) {
        if (yy < headTopRow) headTopRow = yy;
        if (yy > headBottomRow) headBottomRow = yy;
      }
    }

    // Eye-guard (2026-06-12): the cells the active eye overlay paints,
    // padded 1 column left/right. Hair is forbidden here - a fringe
    // pixel flush against a 2px eye merges into one dark smudge and
    // the face stops reading (bangs / bowl / emo / pigtails all did
    // this). The guard keeps a 1px moat so eyes always pop.
    var eyeGuard = null;
    (function () {
      if (custom.eyeStyle) return; // custom eyes: no builtin grid to read
      var dictE = (G.getOverlayDict && G.getOverlayDict(state, 'eyeStyle')) || G.EYE_OVERLAYS;
      var ovE = dictE && dictE[state.eyeStyle];
      var rowsE = ovE && gridForDirection(ovE, dir);
      if (!rowsE) return;
      eyeGuard = {};
      for (var gy = 0; gy < SIZE; gy++) {
        var gr = rowsE[gy]; if (!gr) continue;
        for (var gx = 0; gx < SIZE; gx++) {
          var gc = gr[gx];
          if (!gc || gc === '.') continue;
          eyeGuard[gy * SIZE + gx] = 1;
          if (gx > 0) eyeGuard[gy * SIZE + gx - 1] = 1;
          if (gx < SIZE - 1) eyeGuard[gy * SIZE + gx + 1] = 1;
        }
      }
    })();

    // Silhouette-aware overlay paint (for hair/hat/facial).
    // ch = char to write; opts.fitHoriz extends across the head row.
    // Accepts plain row-array (built-in) OR direction-aware sprite — the
    // gridForDirection helper resolves to the right rows.
    function fitOverlayToHead(overlay, ch, opts) {
      opts = opts || {};
      var fitHoriz = opts.fitHoriz !== false;
      var rows = gridForDirection(overlay, dir);
      if (!rows) return;
      for (var y = 0; y < SIZE; y++) {
        var r = rows[y]; if (!r) continue;
        var xs = [];
        for (var x = 0; x < SIZE; x++) if (r[x] && r[x] !== '.') xs.push(x);
        if (!xs.length) continue;

        var insideHead = y >= headTopRow && y <= headBottomRow;
        if (!insideHead) {
          // free placement — overlay pixels above/below head stay as-is
          for (var i = 0; i < xs.length; i++) grid[y][xs[i]] = { ch: ch };
          continue;
        }
        // Mask span for this row.
        var maskL = SIZE, maskR = -1;
        for (var xm = 0; xm < SIZE; xm++) if (headMask[y][xm]) {
          if (xm < maskL) maskL = xm;
          if (xm > maskR) maskR = xm;
        }

        // Soft clip: keep pixels inside OR hugging the head (within 2
        // columns of the row's mask span). The old strict in-mask clip
        // DELETED authored side elements - ponytails, mullet flow,
        // pigtails, the manbun's base - because hair legitimately
        // extends past the skull. Far-out pixels (3+ cols away) still
        // drop so wide-authored hair doesn't float beside narrow heads.
        var painted = (maskR === -1)
          ? xs.slice()
          : xs.filter(function (x) { return x >= maskL - 2 && x <= maskR + 2; });
        // Soft fallback: if nothing kept, snap to nearest in-mask cell
        if (!painted.length) {
          var seen = {};
          for (var k = 0; k < xs.length; k++) {
            for (var dx = -1; dx <= 1; dx++) {
              var nx = xs[k] + dx;
              if (nx >= 0 && nx < SIZE && headMask[y][nx] && !seen[nx]) {
                seen[nx] = 1; painted.push(nx);
              }
            }
          }
        }
        if (!painted.length) continue;
        for (var p2 = 0; p2 < painted.length; p2++) {
          if (opts.guard && opts.guard[y * SIZE + painted[p2]]) continue;
          grid[y][painted[p2]] = { ch: ch };
        }

        // Horizontal extension - ROOF ROWS ONLY, OUTWARD ONLY: stretch
        // the row's painted pixels to the mask edges so hair authored
        // for the round head still caps wider skulls edge-to-edge.
        // Two hard-learned rules (2026-06-12 contact-sheet audit):
        //   1. NEVER fill interior gaps - the old left..right fill
        //      BRIDGED separated side groups straight across the face
        //      (bowl's temple pixels became a blindfold, the hood's
        //      side walls became a faceless blob, the mullet's flow
        //      became a jaw band).
        //   2. NEVER fill non-roof rows - those are face rows; authored
        //      art is already face-aware there.
        if (fitHoriz && maskR !== -1) {
          var isRoof = (y - headTopRow) <= 3;
          if (isRoof) {
            var leftHair = Math.min.apply(null, painted);
            var rightHair = Math.max.apply(null, painted);
            for (var xf = maskL; xf <= maskR; xf++) {
              if (opts.guard && opts.guard[y * SIZE + xf]) continue;
              var outward = (xf < leftHair || xf > rightHair);
              if (outward && headMask[y][xf]) grid[y][xf] = { ch: ch };
            }
          }
        }
      }
    }

    var FALLBACK_DICT = {
      headStyle:   G.HEAD_STYLES,
      hairStyle:   G.HAIR_OVERLAYS,
      eyeStyle:    G.EYE_OVERLAYS,
      mouthStyle:  G.MOUTH_OVERLAYS,
      hatStyle:    G.HAT_OVERLAYS,
      facialStyle: G.FACIAL_OVERLAYS,
    };

    function paintLayer(layerKey, fitMode) {
      // Type-aware overlay dict (alien/android pull antennas for hair slot).
      // Falls back to canonical mapping for layers not listed in the type's
      // `layers` map — notably headStyle, which every type renders.
      var dict = (G.getOverlayDict && G.getOverlayDict(state, layerKey)) || FALLBACK_DICT[layerKey];
      var layer = G.getActiveLayers ? G.getActiveLayers(state)[layerKey] : null;

      // Hide entire layer if the active type doesn't include it
      // (e.g. android has no facial hair). headStyle is always shown.
      if (layerKey !== 'headStyle' && G.getActiveLayers && !G.getActiveLayers(state)[layerKey]) return;

      // Antennas don't get silhouette-fit — they project above the head
      if (layer && layer.source === 'antenna') fitMode = 'raw';

      var customId = custom[layerKey];
      if (customId) {
        // Per-head override of this custom — same key shape as built-in
        // overrides, so editing a custom on Egg only changes Egg.
        var ovMapC = G.__jamnutzOverrides;
        var customOv = ovMapC && ovMapC[state.headStyle] && ovMapC[state.headStyle][layerKey] && ovMapC[state.headStyle][layerKey][customId];
        if (customOv) { paintCustom(customOv, layerKey); return; }
        // Look for the global/local custom sprite (default for any head
        // without a per-head override).
        var sprite = (customs[layerKey] || []).find(function (c) { return c.id === customId; });
        if (!sprite) {
          var globalC = (G.__jamnutzGlobalCustoms || {})[layerKey] || [];
          sprite = globalC.find(function (c) { return c.id === customId; });
        }
        if (sprite) { paintCustom(sprite, layerKey); return; }
      }
      var id = state[layerKey];
      if (!id || id === 'none') return;
      // Per-head built-in override (dev tool). Keyed by (headStyle, layer, builtinId).
      var ovMap = G.__jamnutzOverrides;
      var override = ovMap && ovMap[state.headStyle] && ovMap[state.headStyle][layerKey] && ovMap[state.headStyle][layerKey][id];
      if (override) { paintCustom(override, layerKey); return; }
      var overlay = dict ? dict[id] : null;
      if (!overlay) return;
      if (fitMode === 'hair')   { fitOverlayToHead(overlay, 'o', { fitHoriz: true, guard: eyeGuard }); return; }
      if (fitMode === 'hat')    { fitOverlayToHead(overlay, 'w', { fitHoriz: true }); return; }
      if (fitMode === 'facial') { fitOverlayToHead(overlay, 'f', { fitHoriz: false }); return; }
      paintBuiltin(overlay, layerKey);
    }

    // Render order
    paintLayer('headStyle');
    paintLayer('hairStyle',   'hair');
    paintLayer('eyeStyle');
    paintLayer('mouthStyle');
    paintLayer('facialStyle', 'facial');
    paintLayer('hatStyle',    'hat');

    // Magnet-snap floating overlay pieces (2026-06-12). Overlays are
    // authored against the round head; on other skulls a manbun, hair
    // crumb, or antenna crown can end up detached - hovering with a
    // 1-2px gap. Find each connected component of hair ('o') / hat
    // ('w') pixels with NO 8-neighbor contact to the head or any other
    // painted layer and slide it (down first, then diagonals/sideways)
    // until it touches. Pieces that can't make contact in a 2-cell
    // radius stay put (better floating than teleported).
    function snapFloaters(ch) {
      var dirs8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      function isCh(x, y) {
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return false;
        var c = grid[y][x];
        return !!c && c.ch === ch;
      }
      function isAnchor(x, y) {
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return false;
        if (headMask[y][x]) return true;
        var c = grid[y][x];
        return !!c && c.ch !== ch;
      }
      var seenC = {};
      for (var sy = 0; sy < SIZE; sy++) {
        for (var sx = 0; sx < SIZE; sx++) {
          if (!isCh(sx, sy) || seenC[sy * SIZE + sx]) continue;
          var comp = [];
          var stack = [[sx, sy]];
          seenC[sy * SIZE + sx] = 1;
          while (stack.length) {
            var p = stack.pop();
            comp.push(p);
            for (var d = 0; d < 8; d++) {
              var nx = p[0] + dirs8[d][0], ny = p[1] + dirs8[d][1];
              if (isCh(nx, ny) && !seenC[ny * SIZE + nx]) {
                seenC[ny * SIZE + nx] = 1;
                stack.push([nx, ny]);
              }
            }
          }
          var anchored = false;
          for (var a = 0; a < comp.length && !anchored; a++) {
            for (var d2 = 0; d2 < 8 && !anchored; d2++) {
              if (isAnchor(comp[a][0] + dirs8[d2][0], comp[a][1] + dirs8[d2][1])) anchored = true;
            }
          }
          if (anchored) continue;
          var inComp = {};
          for (var ic = 0; ic < comp.length; ic++) inComp[comp[ic][1] * SIZE + comp[ic][0]] = 1;
          var SHIFTS = [[0,1],[0,2],[1,1],[-1,1],[1,0],[-1,0],[1,2],[-1,2],[2,1],[-2,1],[2,0],[-2,0],[2,2],[-2,2]];
          var chosen = null;
          for (var s = 0; s < SHIFTS.length && !chosen; s++) {
            var dx = SHIFTS[s][0], dy = SHIFTS[s][1];
            var ok = true, touches = false;
            for (var i3 = 0; i3 < comp.length; i3++) {
              var tx = comp[i3][0] + dx, ty = comp[i3][1] + dy;
              if (tx < 0 || tx >= SIZE || ty < 0 || ty >= SIZE) { ok = false; break; }
              // May only land on empty cells or cells the component
              // itself vacates - never overwrite another layer.
              var tc = grid[ty][tx];
              if (tc && !inComp[ty * SIZE + tx]) { ok = false; break; }
              for (var d3 = 0; d3 < 8 && !touches; d3++) {
                var ax = tx + dirs8[d3][0], ay = ty + dirs8[d3][1];
                if (!inComp[(ay) * SIZE + (ax)] && isAnchor(ax, ay)) touches = true;
              }
            }
            if (ok && touches) chosen = [dx, dy];
          }
          if (!chosen) continue;
          for (var c1 = 0; c1 < comp.length; c1++) grid[comp[c1][1]][comp[c1][0]] = null;
          for (var c2 = 0; c2 < comp.length; c2++) {
            grid[comp[c2][1] + chosen[1]][comp[c2][0] + chosen[0]] = { ch: ch };
          }
        }
      }
    }
    snapFloaters('o');
    snapFloaters('w');

    // Hat occlusion — any hair pixel above the topmost hat pixel in its
    // column gets hidden, so spiky hair tips don't poke through a beanie etc.
    // BUT: hats that don't cover the crown (visors, sweatbands) shouldn't
    // hide top hair. We detect "covering vs brim-only" by where the hat sits
    // relative to the head silhouette's top row.
    function isHat(c)  { return !!c && (c.ch === 'w' || c._layer === 'hatStyle'); }
    function isHair(c) { return !!c && (c.ch === 'o' || c._layer === 'hairStyle'); }

    // Head silhouette top row — read from the SOURCE head overlay, not the
    // post-paint grid (which gets overwritten by hair on the top rows).
    var headSrc = (G.HEAD_STYLES && G.HEAD_STYLES[state.headStyle]) || G.HEAD;
    var headTopRowY = SIZE;
    for (var hy0 = 0; hy0 < SIZE && headSrc && headTopRowY === SIZE; hy0++) {
      var hr0 = headSrc[hy0];
      if (!hr0) continue;
      for (var hx0 = 0; hx0 < SIZE; hx0++) {
        var ch0 = hr0.charAt(hx0);
        if (ch0 && ch0 !== '.') { headTopRowY = hy0; break; }
      }
    }

    // Hat coverage per column + overall topmost row.
    var hatTopByX = [];
    for (var hx = 0; hx < SIZE; hx++) hatTopByX.push(-1);
    var hatOverallTop = SIZE;
    for (var hy = 0; hy < SIZE; hy++) {
      for (var hxi = 0; hxi < SIZE; hxi++) {
        if (hatTopByX[hxi] === -1 && isHat(grid[hy][hxi])) {
          hatTopByX[hxi] = hy;
          if (hy < hatOverallTop) hatOverallTop = hy;
        }
      }
    }

    // A "covering" hat sits AT the crown or above it (caps, beanies, hoods,
    // top hats, crowns, pompoms). Anything that starts strictly below the
    // head's top row is a brim/band (visor, sweatband) and leaves top hair
    // alone.
    var hatCovers = hatOverallTop < SIZE && hatOverallTop <= headTopRowY;
    if (hatCovers) {
      // BUT — if the hair has a lot of volume above the hat (afro, big bun,
      // dreads), the hat reads as perched on top instead of covering. Skip
      // the clip so the hair envelops the hat. Threshold tuned for 20×20.
      var hairAboveCount = 0;
      for (var hc = 0; hc < SIZE; hc++) {
        if (hatTopByX[hc] === -1) continue;
        for (var hr = 0; hr < hatTopByX[hc]; hr++) {
          if (isHair(grid[hr][hc])) hairAboveCount++;
        }
      }
      var HAIR_VOLUME_THRESHOLD = 10;
      if (hairAboveCount < HAIR_VOLUME_THRESHOLD) {
        // GLOBAL clear: any hair pixel above the hat's overall top row gets
        // hidden, even in columns the hat doesn't directly cover. Stops
        // spiky hair tips from poking up beside narrow hats on narrow heads
        // (egg, pointy, alien shapes).
        for (var cy = 0; cy < hatOverallTop; cy++) {
          for (var cx = 0; cx < SIZE; cx++) {
            if (isHair(grid[cy][cx])) grid[cy][cx] = null;
          }
        }
      }
    }

    // Body. When dancing, the keyframe's `body` field picks the BODY_FRAMES
    // index. When not dancing, fall back to state.frame (legacy 0/1 toggle).
    // Each BODY_FRAMES entry can be a plain row-array (front-only legacy)
    // OR a { front, side?, back? } object — gridForDirection inside
    // paintBuiltin handles both. Side/back fall back to front when missing.
    var DANCES = G.DANCES || {};
    var dance = DANCES[state.dance] || null;
    var df = (state.dancing && dance && dance.frames)
      ? (dance.frames[state.frame || 0] || dance.frames[0])
      : null;
    var bodyIdx = df ? (df.body || 0) : (state.frame || 0);
    // Per-head body override — cryptid heads (sasquatch / yeti / etc.)
    // bring their own body silhouette so the avatar reads as the
    // species, not as a human-with-different-head. Falls back to the
    // default human BODY_FRAMES if no override.
    var byHead = (G.BODY_FRAMES_BY_HEAD || {})[state.headStyle];
    var bodyPool = byHead || G.BODY_FRAMES || [];
    var bf = bodyPool[bodyIdx] || bodyPool[0];
    paintBuiltin(bf);

    return grid;
  }

  // ---- pixelColor ---------------------------------------------------
  function pixelColor(cell, state) {
    if (!cell) return null;
    if (cell.color) return cell.color;
    var ch = cell.ch;
    if (!ch || ch === '.' || ch === ' ') return null;
    // 's' is the source maker's "shoulder padding" — solid white pixels
    // around the body that were invisible on its white-page UI. On our
    // dark-page UI they read as a white block. Treat as transparent...
    // EXCEPT on the head layer, where 's' is an authored shine highlight
    // (the bald-shine head). Untagged transparency punched HOLES in
    // those heads - rendered as dark speckles on android chrome skins.
    if (ch === 's') {
      if (cell._layer === 'headStyle') return (G.FIXED && G.FIXED.s) || '#ffffff';
      return null;
    }
    var FIXED = G.FIXED || {};
    if (FIXED[ch]) return FIXED[ch];
    var SLOT = G.SLOT || {};
    var slot = SLOT[ch];
    if (!slot) return null;
    if (slot === 'facial' && state.facial === 'match-hair') {
      return paletteColor('hair', state.hair);
    }
    return paletteColor(slot, state[slot]);
  }

  // ---- drawAvatar ---------------------------------------------------
  // opts.direction: 'front' (default) | 'side' | 'back' | 'right' | 'left'.
  //   Convention: side art is authored as "facing right." So:
  //     'side'  = facing right (no flip; canonical authored grid)
  //     'right' = alias for 'side'
  //     'left'  = facing left (renders 'side' grid then X-flips at draw time)
  //   This matches the Pokemon Gen 1 / GB Studio convention where one direction
  //   is authored and the other is mirrored.
  // opts.flip: explicit boolean to flip horizontally (also auto-set for 'left').
  function drawAvatar(canvas, state, opts) {
    if (!canvas || !state) return;
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    var W = canvas.width, H = canvas.height;
    var SIZE = G.SIZE || 16;
    var DANCES = G.DANCES || {};
    var dance = DANCES[state.dance] || null;
    var df = (state.dancing && dance && dance.frames) ? (dance.frames[state.frame || 0] || dance.frames[0]) : { yShift: 0, xShift: 0 };
    var idleBobOffset = (!state.dancing && state.idleBob) ? -1 : 0;
    var yShift = (df.yShift || 0) + idleBobOffset;
    var xShift = (df.xShift || 0);

    // Resolve direction. 'left' = X-flipped 'side'; 'right' = same as 'side'
    // (canonical authored grid). Renderer's compose() never sees 'left' or
    // 'right' — both reduce to 'side'. Any unknown value falls back to 'front'.
    var requested = opts.direction || 'front';
    var renderDir = (requested === 'left' || requested === 'right') ? 'side' : requested;
    if (renderDir !== 'front' && renderDir !== 'side' && renderDir !== 'back') renderDir = 'front';
    var flip = !!opts.flip || requested === 'left';

    // Vertical reserve (sprite-rows above and below the 16x16 sprite). Big
    // jump dances need yShift -3 of headroom; tall antennas/hair add more.
    // Caller can pass opts.reserveTop / opts.reserveBot to keep a constant
    // sprite size regardless of whether the avatar is dancing (so the
    // preview doesn't visibly shrink/grow when dance toggles). Default
    // behavior reserves only when dancing.
    var reserveTop = (opts && opts.reserveTop != null) ? opts.reserveTop : (state.dancing ? 6 : 0);
    var reserveBot = (opts && opts.reserveBot != null) ? opts.reserveBot : (state.dancing ? 6 : 0);
    var EFF_H = SIZE + reserveTop + reserveBot;
    var scaleW = Math.floor(W / SIZE);
    var scaleH = Math.floor(H / EFF_H);
    var scale = Math.max(1, Math.min(scaleW, scaleH));
    var effHpx = scale * EFF_H;
    var topInset = Math.floor((H - effHpx) / 2);
    var ox = Math.floor((W - scale * SIZE) / 2) + xShift * scale;
    var oy = topInset + reserveTop * scale + yShift * scale;

    ctx.clearRect(0, 0, W, H);
    if (opts.background) {
      ctx.fillStyle = opts.background;
      ctx.fillRect(0, 0, W, H);
    }
    var grid = compose(state, renderDir);
    if (flip) {
      // X-flip the entire canvas; avatar stays centered (since canvas is
      // centered around it), the only visible effect is mirrored pixels.
      // xShift's sign flips automatically because fillRect is now drawn
      // with the canvas's flipped X axis.
      ctx.save();
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
    }
    for (var y = 0; y < SIZE; y++) {
      for (var x = 0; x < SIZE; x++) {
        var c = pixelColor(grid[y][x], state);
        if (!c) continue;
        ctx.fillStyle = c;
        ctx.fillRect(ox + x * scale, oy + y * scale, scale, scale);
      }
    }
    if (flip) ctx.restore();
  }

  G.JamnutzAvatar = {
    compose: compose,
    pixelColor: pixelColor,
    drawAvatar: drawAvatar,
    paletteColor: paletteColor,
    DEFAULT_AVATAR: DEFAULT_AVATAR,
  };
})(typeof window !== 'undefined' ? window : globalThis);
