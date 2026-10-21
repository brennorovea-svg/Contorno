/**
 * Prédio: a five-storey apartment building, each floor a slab with its outer
 * walls, tall windows cut between them, and one inner wall with a doorway, so
 * every floor is an apartment plan. The pointer's height picks a floor; the
 * floors above it lift away together, staggered outwards from it, and open
 * the apartment to view, its slab edge taking the bright stroke. At rest the
 * third floor stands a little open: the renovation in progress. The slider is
 * how far the floors above lift.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, tdone, tset, tval, tween,
  mk, pointer, put, register, disposer, solid,
} = HL;

const N = 5, L = 64, FH = 18, SLAB = 2.4, T = 3.2, OH = 2.5, REST = 2, REST_GAP = 0.32;
// Outer wall pieces along one side, with two tall windows between them
const SIDE = [[0, 15], [24, 40], [49, 64]];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.72);
  const top = N * FH + SLAB + 44;
  fit(C, [[-OH - 6, -OH - 6, -4], [L + OH + 6, L + OH + 6, -4], [L + OH, -OH, 0], [-OH, L + OH, 0], [0, 0, top]], 200, 166);
  const P = proj(C), front = facing(C);
  let GAP = value, chosen = null;

  const g = mk("g", {}, svg);
  const [br, bi] = rings(-OH - 6, -OH - 6, L + OH + 6, L + OH + 6, 8, 2);
  put(solid(g), prism(P, front, br, bi, -4, 0));

  // A floor: its slab, then its walls back to front. The roof is a last slab.
  const floors = [];
  for (let k = 0; k <= N; k++) {
    const z0 = k * FH, parts = [];
    const [sr, si] = rings(-OH, -OH, L + OH, L + OH, 4, 1.4);
    parts.push({ ring: sr, inner: si, z0, z1: z0 + SLAB, slab: true });
    if (k < N) {
      const walls = [];
      for (const [a, b] of SIDE) {
        walls.push([a, 0, b, T], [a, L - T, b, L], [0, a, T, b], [L - T, a, L, b]);
      }
      walls.push([T, 30, 26, 30 + T], [36, 30, L - T, 30 + T]); // the inner wall, a doorway in it
      walls.sort((p, q) => p[0] + p[1] + p[2] + p[3] - (q[0] + q[1] + q[2] + q[3]));
      for (const [x0, y0, x1, y1] of walls) {
        const [r, ri] = rings(x0, y0, x1, y1, 1.2, 0.6);
        parts.push({ ring: r, inner: ri, z0: z0 + SLAB, z1: z0 + FH });
      }
    }
    for (const p of parts) p.el = solid(g);
    floors.push({ k, parts, tw: tween(k > REST ? REST_GAP : 0), drawn: NaN });
  }

  function draw(f, now) {
    const off = tval(f.tw, now) * GAP;
    if (off === f.drawn) return;
    f.drawn = off;
    for (const p of f.parts) put(p.el, prism(P, front, p.ring, p.inner, p.z0 + off, p.z1 + off));
  }
  function highlight() {
    const at = chosen === null ? REST : chosen;
    floors.forEach((f) => f.parts[0].el.sil.classList.toggle("hi", f.k === at));
  }

  const B = register(stage, (dt, now) => {
    let m = false;
    for (const f of floors) { draw(f, now); if (!tdone(f.tw, now)) m = true; }
    return m;
  });
  bag.add(B.unregister);

  function choose(c, now) {
    chosen = c;
    const at = c === null ? REST : c, amount = c === null ? REST_GAP : 1;
    for (const f of floors) tset(f.tw, f.k > at ? amount : 0, now, Math.abs(f.k - at) * 45);
    read.textContent = c === null ? "rest" : `andar ${String(c + 1).padStart(2, "0")}`;
    highlight();
    B.wake();
  }

  // The hit test reads the rest pose: the building's front corner, floor by floor, never the lifted one.
  const xl = P(-OH, L + OH, 0)[0], xr = P(L + OH, -OH, 0)[0];
  bag.add(pointer(stage, {
    move: (p) => {
      if (p[0] < xl - 8 || p[0] > xr + 8) return choose(null, performance.now());
      const base = P(L, L, 0)[1], unit = base - P(L, L, 1)[1];
      const z = (base - p[1]) / unit;
      choose(z < 0 || z > N * FH + 30 ? null : clamp(Math.floor(z / FH), 0, N - 1), performance.now());
    },
    leave: () => choose(null, performance.now()),
  }));
  highlight();
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { GAP = v; for (const f of floors) f.drawn = NaN; B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "predio",
  means: "An apartment building; the floor under the pointer opens as the floors above lift away.",
  rules: [1, 2, 5, 8, 9],
  range: [18, 30, 46],
  tour: [[200, 230], [200, 160], [200, 110], null],
  mount,
});
