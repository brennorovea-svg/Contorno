/*
  Maquete do apartamento: a figura da primeira tela.

  Desenhada com o kit da skill Anatomy (kit/iso-kit.mjs, licença MIT).
  Este script roda no Node e escreve um SVG estático em
  src/components/maquete/maquete.svg. O site só importa o SVG pronto;
  o movimento é um script pequeno em HeroFilme.astro.

  Rodar de novo depois de mudar algo aqui:
    node figures/maquete/build.mjs

  A história, em três fases (as mesmas do site):
    Conceitual  a planta se desenha sobre a base da maquete
    Executivo   os móveis entram no desenho e o carimbo aprova cada
                linha do orçamento na prancheta
    Gestão      só com tudo aprovado as paredes e os móveis sobem

  Medidas: 20 unidades = 1 metro. O apartamento é o mesmo do filme
  anterior (12 x 8 m com varanda), ilustrativo.
*/
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "..", "src", "components", "maquete", "maquete.svg");

const WIDTH = 640;
const HEIGHT = 470;
const WALL_H = 18; // paredes cortadas a 0,90 m, como numa maquete aberta
const LOW_H = 6;   // as duas paredes da frente, cortadas mais baixo para se ver dentro

// ---------- base da maquete ----------
const BOARD = { x: -26, y: -26, w: 356, d: 256, r: 6 };
const BOARD_H = 9;
const FOOT_H = 4;

// ---------- paredes (planta em unidades) ----------
const W = (x, y, w, d, h = WALL_H) => ({ x, y, w, d, r: 0.4, h });
const walls = [
  // fachada dos fundos, com duas janelas
  W(0, 0, 52, 5), W(92, 0, 32, 5), W(156, 0, 84, 5),
  // laterais
  W(0, 5, 5, 150), W(235, 5, 5, 150, LOW_H),
  // frente, aberta para a varanda
  W(0, 155, 88, 5, LOW_H), W(172, 155, 68, 5, LOW_H),
  // quartos
  W(88.5, 5, 3, 73.5), W(168.5, 5, 3, 73.5),
  W(5, 78.5, 59, 3), W(84, 78.5, 26, 3), W(130, 78.5, 41.5, 3),
  // banheiro e meia parede da cozinha
  W(171.5, 58.5, 26.5, 3), W(216, 58.5, 19, 3),
  W(168.5, 81.5, 3, 26.5),
];
const windows = [
  { x: 52, w: 40 },
  { x: 124, w: 32 },
];
const balcony = [W(88, 189, 84, 3, LOW_H), W(88, 160, 3, 29, LOW_H), W(169, 160, 3, 29, LOW_H)];

// ---------- móveis ----------
const box = (x, y, w, d, h, z = 0, r = 1.2) => ({ kind: "box", plan: { x, y, w, d, r }, z, h });
const round = (cx, cy, radius, h, z = 0) => ({ kind: "round", cx, cy, radius, z, h, plan: { x: cx - radius, y: cy - radius, w: radius * 2, d: radius * 2 } });
const furniture = [
  // quarto
  { parts: [box(14, 5, 44, 4, 12, 0, 0.8), box(14, 9, 44, 42, 7), box(17, 12, 18, 9, 2.4, 7, 2), box(37, 12, 18, 9, 2.4, 7, 2)], plan: { x: 14, y: 5, w: 44, d: 46 } },
  { parts: [box(71, 10, 16, 50, 16, 0, 0.8)], plan: { x: 71, y: 10, w: 16, d: 50 } },
  // suíte
  { parts: [box(108, 5, 44, 4, 12, 0, 0.8), box(108, 9, 44, 42, 7), box(111, 12, 18, 9, 2.4, 7, 2), box(131, 12, 18, 9, 2.4, 7, 2)], plan: { x: 108, y: 5, w: 44, d: 46 } },
  { parts: [box(95, 7, 10, 10, 7)], plan: { x: 95, y: 7, w: 10, d: 10 } },
  { parts: [box(155, 7, 10, 10, 7)], plan: { x: 155, y: 7, w: 10, d: 10 } },
  // banheiro
  { parts: [box(175, 7, 56, 19, 9, 0, 2)], tub: true, plan: { x: 175, y: 7, w: 56, d: 19 } },
  { parts: [round(188, 48, 5, 7)], plan: { x: 183, y: 43, w: 10, d: 10 } },
  { parts: [box(219, 31, 16, 24, 14, 0, 1)], sink: [227, 43], plan: { x: 219, y: 31, w: 16, d: 24 } },
  // sala
  { parts: [box(5, 90, 18, 58, 7, 0, 2), box(5, 90, 6, 58, 13, 0, 1.5)], plan: { x: 5, y: 90, w: 18, d: 58 } },
  { parts: [box(23, 130, 44, 18, 7, 0, 2), box(23, 142, 44, 6, 13, 0, 1.5)], plan: { x: 23, y: 130, w: 44, d: 18 } },
  { parts: [round(48, 112, 9, 4.5)], plan: { x: 39, y: 103, w: 18, d: 18 } },
  { parts: [box(22, 81.5, 36, 7, 8, 0, 0.8)], plan: { x: 22, y: 81.5, w: 36, d: 7 } },
  // jantar
  { parts: [round(128, 118, 15, 10)], plan: { x: 113, y: 103, w: 30, d: 30 } },
  { parts: [round(128, 97, 4, 6)], plan: { x: 124, y: 93, w: 8, d: 8 } },
  { parts: [round(149, 118, 4, 6)], plan: { x: 145, y: 114, w: 8, d: 8 } },
  { parts: [round(107, 118, 4, 6)], plan: { x: 103, y: 114, w: 8, d: 8 } },
  { parts: [round(128, 139, 4, 6)], plan: { x: 124, y: 135, w: 8, d: 8 } },
  // cozinha
  { parts: [box(219, 66, 16, 84, 13, 0, 1)], counter: true, plan: { x: 219, y: 66, w: 16, d: 84 } },
  { parts: [box(176, 135, 20, 18, 16, 0, 1.4)], plan: { x: 176, y: 135, w: 20, d: 18 } },
];

// ---------- prancheta do orçamento, almofada e carimbo ----------
const CLIP = { x: 262, y: 96, w: 54, d: 78, r: 3 };
const CLIP_H = 2;
const SHEET = { x: 267, y: 108, w: 44, d: 60, r: 0.6 };
const SHEET_TOP = CLIP_H + 0.4;
const ROWS = [124, 140, 156];
const CHECK = (y) => ({ x: 271, y: y - 5, w: 10, d: 10, r: 1 });
const PAD = { x: 266, y: 186, w: 40, d: 30, r: 3 };
const PAD_H = 4;
const STAMP_FOOT = { x: -7, y: -5, w: 14, d: 10, r: 1.5 };

const P = k.fitProjection(
  [...k.boxCorners(BOARD, -BOARD_H - FOOT_H, 0), [0, 0, WALL_H], [240, 0, WALL_H], [0, 160, WALL_H], [286, 201, 34], [276, 124, 34]],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: 50 },
);
const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const drawn = (svg) => svg.replace(/<path class="iso-line"/g, '<path pathLength="1" class="iso-line"');

// Ordem de pintura para caixas que não se cruzam na planta: A vai antes de B
// quando um eixo separa as duas e A fica do lado de trás (câmera em +x +y).
function paintOrder(items) {
  const screenBox = (plan, h) => {
    const pts = k.boxCorners(plan, 0, h).map(at);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  };
  const boxes = items.map((it) => screenBox(it.plan, it.h ?? WALL_H));
  const before = items.map(() => new Set());
  const e = 0.01;
  for (let a = 0; a < items.length; a++) {
    for (let b = 0; b < items.length; b++) {
      if (a === b) continue;
      const A = items[a].plan, B = items[b].plan;
      const [ax0, ay0, ax1, ay1] = boxes[a], [bx0, by0, bx1, by1] = boxes[b];
      if (ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0) continue;
      const xSep = A.x + A.w <= B.x + e;
      const ySep = A.y + A.d <= B.y + e;
      const yOverlap = A.y < B.y + B.d - e && B.y < A.y + A.d - e;
      const xOverlap = A.x < B.x + B.w - e && B.x < A.x + A.w - e;
      if ((xSep && yOverlap) || (ySep && xOverlap) || (xSep && ySep)) before[b].add(a);
      else if (xSep !== ySep && !(B.x + B.w <= A.x + e) && !(B.y + B.d <= A.y + e)) before[b].add(a);
    }
  }
  const done = new Set(), out = [];
  const visit = (i, stack = new Set()) => {
    if (done.has(i)) return;
    if (stack.has(i)) return;
    stack.add(i);
    for (const j of before[i]) visit(j, stack);
    stack.delete(i);
    done.add(i);
    out.push(items[i]);
  };
  const byDepth = items.map((_, i) => i).sort((a, b) => k.depthOf([items[a].plan.x + items[a].plan.w / 2, items[a].plan.y + items[a].plan.d / 2, 0], P) - k.depthOf([items[b].plan.x + items[b].plan.w / 2, items[b].plan.y + items[b].plan.d / 2, 0], P));
  byDepth.forEach((i) => visit(i));
  return out;
}

// ---------- base ----------
function board() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BOARD, -BOARD_H - FOOT_H, BOARD_H, P)}"/>`];
  const feet = k.corners(BOARD, 20).sort((a, b) => k.depthOf([...a, 0], P) - k.depthOf([...b, 0], P));
  for (const [x, y] of feet) {
    out.push(S(k.cylinder(x, y, 7, -BOARD_H - FOOT_H, 1.4, P, 28), { tone: "mid" }));
    out.push(S(k.cylinder(x, y, 5.4, -BOARD_H - FOOT_H + 1.4, FOOT_H - 1.4, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(BOARD, -BOARD_H, BOARD_H, P, 8, 1.4), { tone: "hi", inner: L(k.sideSeam(BOARD, -BOARD_H + 3, P), { tone: "lo" }) }));
  out.push(L(k.planOutline(k.insetPlan(BOARD, 6), 0, P), { tone: "lo" }));
  const screws = k.corners(BOARD, 11);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.7, tone: "hi" }));

  // régua da frente: um traço a cada 20 cm, o maior a cada metro
  const front = { x: 0, y: 210, w: 240, d: 8, r: 1 };
  out.push(S(k.slabOf(front, 0, 0.8, P, 3), { tone: "mid", crease: "none" }));
  const ft = k.topTicks(front.x + 0, front.x + front.w, 4, 5, front.y + 0.8, 0.8, [2.2, 4.4], P);
  out.push(L(ft.minor, { tone: "lo" }), L(ft.major, { tone: "mid" }));
  // régua da lateral, entre o apartamento e a prancheta
  const side = { x: 246, y: 0, w: 8, d: 160, r: 1 };
  out.push(S(k.slabOf(side, 0, 0.8, P, 3), { tone: "mid", crease: "none" }));
  const st = k.topTicks(side.y, side.y + side.d, 4, 5, side.x + 0.8, 0.8, [2.2, 4.4], P, "y");
  out.push(L(st.minor, { tone: "lo" }), L(st.major, { tone: "mid" }));

  // plaqueta de identificação, com três linhas gravadas
  const plate = { x: 262, y: -16, w: 54, d: 22, r: 2 };
  out.push(S(k.slabOf(plate, 0, 1, P, 4, 0.3), { tone: "mid" }));
  for (const [i, y] of [-9, -4.5, 0].entries()) {
    out.push(L(k.lineOnTop([plate.x + 6, y], [plate.x + (i === 0 ? 40 : 30), y], 1, P), { tone: i === 0 ? "mid" : "lo", free: true }));
  }
  out.push(D([at([plate.x + 3, plate.y + 3, 1]), at([plate.x + plate.w - 3, plate.y + plate.d - 3, 1])], { size: 0.55, tone: "mid" }));

  // piso do apartamento e da varanda: placas finas
  out.push(S(k.slabOf({ x: 0, y: 0, w: 240, d: 160, r: 0 }, 0, 0.6, P, 1), { tone: "lo", crease: "none", flat: true }));
  out.push(S(k.slabOf({ x: 88, y: 160, w: 84, d: 32, r: 0 }, 0, 0.6, P, 1), { tone: "lo", crease: "none", flat: true }));
  return out.join("");
}

// ---------- fase Conceitual: a planta desenhada no piso ----------
function planLines() {
  const lines = [];
  walls.forEach((w, i) => lines.push(`<g data-step="plan" data-i="${i}">${drawn(L(k.planOutline(w, 0.7, P, 1), { tone: "hi" }))}</g>`));
  balcony.forEach((w, i) => lines.push(`<g data-step="plan" data-i="${walls.length + i}">${drawn(L(k.planOutline(w, 0.7, P, 1), { tone: "hi" }))}</g>`));
  windows.forEach((w, i) => lines.push(`<g data-step="plan" data-i="${walls.length + balcony.length + i}">${drawn(L(k.lineOnTop([w.x, 2.5], [w.x + w.w, 2.5], 0.7, P), { tone: "mid" }))}</g>`));
  return `<g data-layer="planta">${lines.join("")}</g>`;
}

// ---------- fase Executivo: os móveis desenhados no piso ----------
function furnitureLines() {
  const out = furniture.map((f, i) => {
    const d = f.parts.map((p) => (p.kind === "box" ? k.planOutline(p.plan, 0.7, P, 3) : k.ring(p.cx, p.cy, p.radius, 0.7, P, 28))).join("");
    return `<g data-step="risco" data-i="${i}">${drawn(L(d, { tone: "mid" }))}</g>`;
  });
  return `<g data-layer="riscos">${out.join("")}</g>`;
}

// ---------- fase Gestão: paredes e móveis sobem ----------
function wallSolid(w) {
  return S(k.slabOf(w, 0, w.h, P, 1), { tone: "hi" });
}
function windowSolid(win) {
  const sill = { x: win.x, y: 0.5, w: win.w, d: 4, r: 0 };
  const glass = { x: win.x + 1, y: 2, w: win.w - 2, d: 1, r: 0 };
  return S(k.slabOf(sill, 0, 7, P, 1), { tone: "hi" }) + S(k.slabOf(glass, 7, WALL_H - 8.2, P, 1), { tone: "mid", crease: "none" }) + S(k.slabOf({ ...sill, d: 4 }, WALL_H - 1.2, 1.2, P, 1), { tone: "hi" });
}
function partSolid(p) {
  if (p.kind === "round") return S(k.cylinder(p.cx, p.cy, p.radius, p.z, p.h, P, 32, 0.4), { tone: "hi" });
  return S(k.slabOf(p.plan, p.z, p.h, P, 4, p.h > 3 ? 0.5 : 0), { tone: "hi" });
}
function furnitureSolid(f) {
  const out = f.parts.map(partSolid);
  if (f.tub) out.push(L(k.planOutline({ x: 179, y: 10, w: 48, d: 13, r: 5 }, 9, P), { tone: "mid" }));
  if (f.sink) out.push(L(k.ring(f.sink[0], f.sink[1], 4.2, 14, P, 24), { tone: "mid" }));
  if (f.counter) {
    out.push(L(k.planOutline({ x: 222, y: 72, w: 10, d: 14, r: 2 }, 13, P), { tone: "mid" }));
    out.push(L([[227, 104], [227, 116], [227, 128]].map(([x, y]) => k.ring(x, y, 3.2, 13, P, 20)).join(""), { tone: "mid" }));
    out.push(L(k.lineOnTop([219.6, 66], [219.6, 150], 13, P), { tone: "faint" }));
  }
  return out.join("");
}

function building() {
  const items = [
    ...walls.map((w, i) => ({ plan: w, h: w.h, svg: wallSolid(w), step: "parede", i })),
    ...balcony.map((w, i) => ({ plan: w, h: w.h, svg: wallSolid(w), step: "parede", i: walls.length + i })),
    ...windows.map((win, i) => ({ plan: { x: win.x, y: 0.5, w: win.w, d: 4 }, h: WALL_H, svg: windowSolid(win), step: "parede", i: walls.length + balcony.length + i })),
    ...furniture.map((f, i) => ({ plan: f.plan, h: Math.max(...f.parts.map((p) => p.z + p.h)), svg: furnitureSolid(f), step: "movel", i })),
  ];
  const ordered = paintOrder(items);
  return `<g data-layer="obra">${ordered.map((it) => `<g data-step="${it.step}" data-i="${it.i}">${it.svg}</g>`).join("")}</g>`;
}

// ---------- prancheta ----------
function clipboard() {
  const out = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(CLIP, 0, 0.1, P)}" style="filter:blur(4px)"/>`);
  out.push(S(k.slabOf(CLIP, 0, CLIP_H, P, 4, 0.4), { tone: "hi" }));
  out.push(S(k.slabOf(SHEET, CLIP_H, 0.4, P, 2), { tone: "mid", crease: "none" }));
  // prendedor
  const clip = { x: 277, y: 99, w: 24, d: 11, r: 2 };
  out.push(S(k.slabOf(clip, CLIP_H, 3.4, P, 4, 0.5), { tone: "hi" }));
  out.push(S(k.cylinder(289, 104.5, 2.6, CLIP_H + 3.4, 1.4, P, 20), { tone: "hi" }));
  out.push(D([at([280, 104.5, CLIP_H + 3.4]), at([298, 104.5, CLIP_H + 3.4])], { size: 0.55, tone: "hi" }));
  // título da folha e linhas do orçamento (as linhas representam texto)
  out.push(L(k.lineOnTop([271, 114], [300, 114], SHEET_TOP, P), { tone: "mid", free: true }));
  for (const y of ROWS) {
    const c = CHECK(y);
    out.push(L(k.planOutline(c, SHEET_TOP, P, 2), { tone: "mid" }));
    out.push(L(k.lineOnTop([285, y - 2], [307, y - 2], SHEET_TOP, P) + k.lineOnTop([285, y + 2], [300, y + 2], SHEET_TOP, P), { tone: "lo", free: true }));
  }
  // marcas do carimbo: acendem uma a uma
  ROWS.forEach((y, i) => {
    const c = k.insetPlan(CHECK(y), 1.6);
    out.push(`<g data-step="aprovado" data-i="${i}">${S(k.slabOf(c, SHEET_TOP, 0.3, P, 2), { tone: "lit", lit: true, crease: "none" })}</g>`);
  });
  return out.join("");
}

function inkPad() {
  const out = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(PAD, 0, 0.1, P)}" style="filter:blur(4px)"/>`);
  out.push(S(k.slabOf(PAD, 0, PAD_H, P, 4, 0.5), { tone: "hi", inner: L(k.sideSeam(PAD, 1.4, P), { tone: "lo" }) }));
  const ink = k.insetPlan(PAD, 4);
  out.push(S(k.slabOf(ink, PAD_H, 0.4, P, 3), { tone: "lit", lit: true, crease: "none" }));
  return out.join("");
}

// carimbo montado na origem; o script da página o leva até cada linha
function stamp() {
  const out = [];
  out.push(S(k.slabOf(k.insetPlan(STAMP_FOOT, 0.6), 0, 1.2, P, 3), { tone: "lit", lit: true, crease: "none" }));
  out.push(S(k.slabOf(STAMP_FOOT, 1.2, 4, P, 4, 0.5), { tone: "hi" }));
  out.push(L(k.sideSeam(STAMP_FOOT, 3.2, P, 4), { tone: "lo" }));
  out.push(S(k.cylinder(0, 0, 3.4, 5.2, 1.6, P, 24, 0.3), { tone: "hi" }));
  out.push(S(k.cylinder(0, 0, 2.2, 6.8, 11, P, 24), { tone: "hi", crease: "none" }));
  out.push(L(k.sideArc(0, 0, 2.2, 11, P, 12) + k.sideArc(0, 0, 2.2, 14, P, 12), { tone: "faint" }));
  out.push(S(k.cylinder(0, 0, 5, 17.8, 5.4, P, 32, 0.8), { tone: "hi" }));
  out.push(L(k.knurl(0, 0, 5, 17.8, 23.2, 36, P), { tone: "lo" }));
  return out.join("");
}

const STAMP_REST = [286, 201, PAD_H + 0.4];
const stampAt = (point) => k.translateAlong(P, point);
const halo = `<path class="iso-halo" d="${k.haloOf(STAMP_FOOT, 0, 0.1, P)}" style="filter:blur(3px)"/>`;

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  className: "maquete-svg",
  label:
    "Maquete de um apartamento sobre uma base com réguas. Primeiro a planta se desenha no piso, depois os móveis entram no desenho e um carimbo aprova cada linha do orçamento numa prancheta. Só com tudo aprovado as paredes e os móveis sobem.",
  body: [
    board(),
    planLines(),
    furnitureLines(),
    building(),
    clipboard(),
    inkPad(),
    `<g data-part="sombra" transform="${stampAt(STAMP_REST)}">${halo}</g>`,
    `<g data-part="carimbo" transform="${stampAt(STAMP_REST)}">${stamp()}</g>`,
  ],
});

// Dados que o script da página precisa: eixos da câmera e paradas do carimbo
const axis = (v) => k.axisVector(P, v).map((n) => Math.round(n * 1000) / 1000);
const data = {
  ax: axis([1, 0, 0]),
  ay: axis([0, 1, 0]),
  az: axis([0, 0, 1]),
  rest: STAMP_REST,
  pad: [286, 201, PAD_H + 0.4],
  rows: ROWS.map((y) => [276, y, SHEET_TOP]),
  walls: walls.length + balcony.length + windows.length,
  moveis: furniture.length,
};
const out = svg.replace("<svg ", `<svg data-maquete='${JSON.stringify(data)}' `);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out);
console.log("escrito", OUT, (out.length / 1024).toFixed(1) + " KB");
