/**
 * Planta: the studio's symbol as a real room, a floor slab with walls laid in
 * blocks, a door on the left wall and a window (a low sill) on the right, in
 * the same places as the mark. At rest the far corner is already built and
 * the walls fall away to the plan towards the near corner. The pointer, on the
 * ground plane, raises the walls around it to full height, each block on its
 * own spring. Blocks above half height take the bright stroke. The slider is
 * the radius, in world units.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  mk, pointer, put, register, disposer, solid,
} = HL;

const EXT = 120, T = 7, HMAX = 40, SILL = 0.38, PB = 5, MOD = 12, GAP = 1.4;
const DOOR = [0.39, 0.65], WIN = [0.57, 0.82];

const falloff = (u) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0.06;

/** Splits [a, b] into blocks about MOD long, with a joint between them. */
function blocks(a, b) {
  const n = Math.max(1, Math.round((b - a) / MOD)), w = (b - a) / n, out = [];
  for (let k = 0; k < n; k++) out.push([a + k * w + (k ? GAP / 2 : 0), a + (k + 1) * w - (k < n - 1 ? GAP / 2 : 0)]);
  return out;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.62);
  fit(C, [[-8, -8, -PB], [EXT + 8, EXT + 8, -PB], [EXT + 8, -8, -PB], [-8, EXT + 8, -PB], [0, 0, HMAX], [EXT, 0, HMAX], [0, EXT, HMAX]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value, over = null;

  // Every wall block as a footprint [x0, y0, x1, y1] and what it belongs to.
  const parts = [];
  const add = (x0, y0, x1, y1, kind, max) => parts.push({ x0, y0, x1, y1, kind, max, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 });
  for (const [a, b] of blocks(0, EXT)) add(a, 0, b, T, "parede", 1);                       // back wall
  for (const [a, b] of blocks(0, EXT)) add(a, EXT - T, b, EXT, "parede", 1);               // front wall
  const span = (f) => T + f * (EXT - 2 * T);
  for (const [a, b] of [[T + GAP, span(DOOR[0])], [span(DOOR[1]), EXT - T - GAP]])         // left wall, door gap
    for (const [c, d] of blocks(a, b)) add(0, c, T, d, "parede", 1);
  for (const [a, b] of [[T + GAP, span(WIN[0])], [span(WIN[1]), EXT - T - GAP]])           // right wall
    for (const [c, d] of blocks(a, b)) add(EXT - T, c, EXT, d, "parede", 1);
  for (const [c, d] of blocks(span(WIN[0]) + GAP, span(WIN[1]) - GAP)) add(EXT - T, c, EXT, d, "janela", SILL);

  const g = mk("g", {}, svg);
  const [fr, fi] = rings(-8, -8, EXT + 8, EXT + 8, 10, 2.2);
  put(solid(g), prism(P, front, fr, fi, -PB, 0));

  // Back to front, by the footprint's centre.
  parts.sort((p, q) => p.cx + p.cy - (q.cx + q.cy));
  for (const p of parts) {
    const u = p.cx / EXT, v = p.cy / EXT;
    p.h0 = p.max * HMAX * (0.06 + 0.66 * Math.exp(-((u - 0.08) ** 2 + (v - 0.4) ** 2) / 0.16));
    [p.ring, p.inner] = rings(p.x0, p.y0, p.x1, p.y1, 2.2, 0.8);
    p.sp = spring(p.h0, { eps: 0.04 });
    p.el = solid(g);
    p.drawn = NaN;
  }

  function draw(p) {
    const h = Math.max(0.6, p.sp.x);
    if (h === p.drawn) return;
    p.drawn = h;
    put(p.el, prism(P, front, p.ring, p.inner, 0, h));
    p.el.sil.classList.toggle("hi", h > p.max * HMAX * 0.5);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const p of parts) { if (stepS(p.sp, dt)) m = true; draw(p); }
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    let near = null, best = Infinity;
    for (const p of parts) {
      if (!over) { p.sp.t = p.h0; continue; }
      const d = Math.hypot(p.cx - over[0], p.cy - over[1]);
      p.sp.t = p.max * HMAX * falloff(d / R);
      if (d < best) { best = d; near = p; }
    }
    if (!over) read.textContent = "rest";
    else {
      const inDoor = over[0] < EXT * 0.3 && over[1] > span(DOOR[0]) && over[1] < span(DOOR[1]);
      read.textContent = inDoor ? "porta" : best > R ? "planta" : near.kind;
    }
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => {
      const w = unproj(C, p[0], p[1], 0);
      over = [clamp(w[0], -20, EXT + 20), clamp(w[1], -20, EXT + 20)];
      retarget();
    },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "planta",
  means: "A floor plan with a door and a window; the walls rise into a room wherever the pointer goes.",
  rules: [1, 3, 5, 9],
  range: [36, 56, 90],
  tour: [[150, 190], [250, 200], [205, 120], null],
  mount,
});
