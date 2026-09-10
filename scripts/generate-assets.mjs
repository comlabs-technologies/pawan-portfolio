import fs from "node:fs";
import path from "node:path";
import {
  Surface, circle, ring, roundRect, grain, vignette,
  hex, mixRgb, lerp, clamp, smoothstep, makeNoise, fbm, mulberry,
} from "./lib-png.mjs";

const OUT = path.join(process.cwd(), "public", "images");
fs.mkdirSync(path.join(OUT, "projects"), { recursive: true });
fs.mkdirSync(path.join(OUT, "travel"), { recursive: true });
fs.mkdirSync(path.join(OUT, "people"), { recursive: true });

/* ------------------------------------------------------------------ *
 * Travel scenes — procedural landscapes, one palette per destination.
 * ------------------------------------------------------------------ */
function travelScene(file, seed, palette) {
  const W = 600;
  const H = 750;
  const s = new Surface(W, H);
  const noise = makeNoise(seed);
  const rnd = mulberry(seed * 7 + 13);

  const skyTop = hex(palette.skyTop);
  const skyBottom = hex(palette.skyBottom);
  const horizon = H * palette.horizon;

  // Sky
  for (let y = 0; y < H; y++) {
    const t = smoothstep(clamp(y / horizon, 0, 1));
    const c = mixRgb(skyTop, skyBottom, t);
    for (let x = 0; x < W; x++) s.set(x, y, c[0], c[1], c[2]);
  }

  // Sun / light source with atmospheric glow
  const sunX = W * palette.sunX;
  const sunY = horizon * palette.sunY;
  const sunColor = hex(palette.sun);
  for (let y = 0; y < Math.ceil(horizon) + 40; y++) {
    for (let x = 0; x < W; x++) {
      const d = Math.hypot(x - sunX, (y - sunY) * 1.15) / (W * 0.75);
      const glow = Math.pow(clamp(1 - d, 0, 1), 3.2) * 0.85;
      if (glow > 0.002) s.blend(x, y, sunColor[0], sunColor[1], sunColor[2], glow);
    }
  }
  circle(s, sunX, sunY, W * 0.055, sunColor, 0.9, 2.4);

  // Cloud bands
  for (let y = 0; y < horizon; y++) {
    for (let x = 0; x < W; x++) {
      const n = fbm(noise, x / 150 + seed, y / 46, 4);
      const band = Math.pow(clamp((n - 0.5) * 2.6, 0, 1), 1.6);
      const fade = smoothstep(clamp(1 - y / horizon, 0, 1)) * 0.55 + 0.15;
      const c = hex(palette.cloud);
      if (band > 0.01) s.blend(x, y, c[0], c[1], c[2], band * fade * 0.5);
    }
  }

  // Layered terrain
  palette.layers.forEach((layer, index) => {
    const base = horizon + H * layer.offset;
    const color = hex(layer.color);
    const amp = H * layer.amp;
    const phase = rnd() * 100;
    for (let x = 0; x < W; x++) {
      const t = x / W;
      const ridge =
        Math.sin(t * Math.PI * layer.freq + phase) * amp +
        Math.sin(t * Math.PI * layer.freq * 2.7 + phase * 1.7) * amp * 0.42 +
        (fbm(noise, x / 110 + index * 30, index * 12, 3) - 0.5) * amp * 1.5;
      const top = base - ridge;
      for (let y = Math.max(0, Math.floor(top)); y < H; y++) {
        const cov = y === Math.floor(top) ? clamp(1 - (top - Math.floor(top)), 0, 1) : 1;
        const depth = clamp((y - top) / (H * 0.5), 0, 1);
        const shade = mixRgb(color, hex(layer.shade ?? layer.color), depth);
        s.blend(x, y, shade[0], shade[1], shade[2], cov * (layer.alpha ?? 1));
      }
    }
  });

  // Water reflection / foreground haze
  if (palette.water) {
    const wTop = H * palette.water.top;
    const wc = hex(palette.water.color);
    for (let y = Math.floor(wTop); y < H; y++) {
      for (let x = 0; x < W; x++) {
        const ripple = fbm(noise, x / 90, y / 8 + seed, 3);
        const a = clamp((y - wTop) / (H - wTop), 0, 1) * 0.55 + ripple * 0.14;
        s.blend(x, y, wc[0], wc[1], wc[2], clamp(a, 0, 0.9) * 0.85);
      }
    }
  }

  // Air haze near the horizon
  const haze = hex(palette.skyBottom);
  for (let y = 0; y < H; y++) {
    const a = Math.pow(clamp(1 - Math.abs(y - horizon) / (H * 0.22), 0, 1), 2) * 0.3;
    if (a <= 0) continue;
    for (let x = 0; x < W; x++) s.blend(x, y, haze[0], haze[1], haze[2], a);
  }

  vignette(s, 0.22);
  grain(s, seed + 991, 4);
  s.saveIndexed(path.join(OUT, "travel", file), 128);
}

const travelPalettes = [
  { file: "kyoto.png", seed: 21, p: { skyTop: "#2b2350", skyBottom: "#f0a189", horizon: 0.52, sun: "#ffd9a8", sunX: 0.7, sunY: 0.82, cloud: "#f6c9c0",
    layers: [
      { offset: -0.02, amp: 0.055, freq: 2.1, color: "#5c4a72", shade: "#3a2f4c", alpha: 0.95 },
      { offset: 0.04, amp: 0.04, freq: 3.4, color: "#3d3455", shade: "#241f36" },
      { offset: 0.13, amp: 0.03, freq: 5.2, color: "#221d33", shade: "#14111f" },
    ], water: { top: 0.72, color: "#2a2440" } } },
  { file: "lofoten.png", seed: 34, p: { skyTop: "#0f2a3d", skyBottom: "#7fb8c9", horizon: 0.46, sun: "#e8f4f2", sunX: 0.28, sunY: 0.6, cloud: "#cfe4ea",
    layers: [
      { offset: -0.03, amp: 0.08, freq: 1.6, color: "#5f7d8c", shade: "#33495a" },
      { offset: 0.05, amp: 0.05, freq: 2.9, color: "#3b5566", shade: "#1e2f3d" },
      { offset: 0.16, amp: 0.02, freq: 6.1, color: "#1b2733", shade: "#0f161d" },
    ], water: { top: 0.7, color: "#20384a" } } },
  { file: "lisbon.png", seed: 47, p: { skyTop: "#1d4f78", skyBottom: "#f6c48b", horizon: 0.55, sun: "#ffe0ae", sunX: 0.5, sunY: 0.88, cloud: "#ffd2b0",
    layers: [
      { offset: 0.0, amp: 0.03, freq: 4.2, color: "#c98f6a", shade: "#8a5b45" },
      { offset: 0.09, amp: 0.025, freq: 6.8, color: "#8d5f4c", shade: "#4f342c" },
      { offset: 0.19, amp: 0.018, freq: 9.4, color: "#4c332c", shade: "#28191a" },
    ], water: { top: 0.76, color: "#3a4f63" } } },
  { file: "reykjavik.png", seed: 58, p: { skyTop: "#101a2e", skyBottom: "#4c6d7e", horizon: 0.44, sun: "#9fe6c8", sunX: 0.62, sunY: 0.45, cloud: "#79c3a6",
    layers: [
      { offset: 0.0, amp: 0.06, freq: 1.9, color: "#41525d", shade: "#212c36" },
      { offset: 0.1, amp: 0.03, freq: 3.6, color: "#2a343d", shade: "#151b21" },
      { offset: 0.22, amp: 0.02, freq: 7.2, color: "#171d24", shade: "#0c0f14" },
    ], water: { top: 0.78, color: "#1a242f" } } },
  { file: "jaipur.png", seed: 69, p: { skyTop: "#3d2a55", skyBottom: "#f2b06a", horizon: 0.5, sun: "#ffd07a", sunX: 0.35, sunY: 0.78, cloud: "#f0b9a0",
    layers: [
      { offset: -0.01, amp: 0.045, freq: 2.6, color: "#a75f4d", shade: "#6d3a33" },
      { offset: 0.08, amp: 0.03, freq: 4.8, color: "#7a4238", shade: "#43231f" },
      { offset: 0.2, amp: 0.02, freq: 8.1, color: "#3d211e", shade: "#1f1010" },
    ] } },
  { file: "hakone.png", seed: 73, p: { skyTop: "#243a4d", skyBottom: "#cfd9d4", horizon: 0.48, sun: "#f2ece0", sunX: 0.44, sunY: 0.7, cloud: "#e8eeea",
    layers: [
      { offset: -0.02, amp: 0.07, freq: 1.4, color: "#8ca09c", shade: "#4f6360" },
      { offset: 0.06, amp: 0.045, freq: 2.6, color: "#5b6f6d", shade: "#2f3d3d" },
      { offset: 0.17, amp: 0.025, freq: 5.5, color: "#33403f", shade: "#1a2222" },
    ], water: { top: 0.74, color: "#2c3a3c" } } },
  { file: "dolomites.png", seed: 88, p: { skyTop: "#1a2b4a", skyBottom: "#e6a徐8".replace("徐", "9"), horizon: 0.5, sun: "#ffdcae", sunX: 0.74, sunY: 0.74, cloud: "#f0c9b4",
    layers: [
      { offset: -0.04, amp: 0.09, freq: 1.8, color: "#9b8a92", shade: "#5c4f5c" },
      { offset: 0.05, amp: 0.05, freq: 3.1, color: "#5f5462", shade: "#332d3a" },
      { offset: 0.18, amp: 0.028, freq: 6.4, color: "#2e2833", shade: "#17141c" },
    ] } },
];

for (const t of travelPalettes) travelScene(t.file, t.seed, t.p);

/* ------------------------------------------------------------------ *
 * Project artwork — abstract, structural compositions.
 * ------------------------------------------------------------------ */
function meshBackground(s, seed, stops) {
  const noise = makeNoise(seed);
  const base = hex(stops[0].color);
  s.each((x, y, sf) => sf.set(x, y, base[0], base[1], base[2]));
  for (const stop of stops.slice(1)) {
    const c = hex(stop.color);
    const cx = s.w * stop.x;
    const cy = s.h * stop.y;
    const r = Math.max(s.w, s.h) * stop.r;
    s.each((x, y, sf) => {
      const d = Math.hypot(x - cx, y - cy) / r;
      const a = Math.pow(clamp(1 - d, 0, 1), 2) * (stop.a ?? 0.9);
      if (a > 0.002) sf.blend(x, y, c[0], c[1], c[2], a);
    });
  }
  s.each((x, y, sf) => {
    const n = fbm(noise, x / 220, y / 220, 3) - 0.5;
    const [r, g, b] = sf.get(x, y);
    sf.set(x, y, r + n * 16, g + n * 16, b + n * 16);
  });
}

function projectArt(file, seed, spec) {
  const W = 1040;
  const H = 650;
  const s = new Surface(W, H);
  meshBackground(s, seed, spec.mesh);
  const ink = hex(spec.ink);
  const accent = hex(spec.accent);
  const rnd = mulberry(seed * 31 + 5);

  if (spec.motif === "panels") {
    // Overlapping interface panels
    roundRect(s, W * 0.08, H * 0.16, W * 0.5, H * 0.66, 22, ink, 0.1);
    roundRect(s, W * 0.1, H * 0.14, W * 0.5, H * 0.66, 22, hex(spec.panel), 0.96);
    for (let i = 0; i < 7; i++) {
      const y = H * 0.24 + i * H * 0.075;
      roundRect(s, W * 0.14, y, W * (0.16 + rnd() * 0.24), 12, 6, ink, 0.2);
    }
    roundRect(s, W * 0.14, H * 0.18, W * 0.12, 16, 8, accent, 0.85);
    roundRect(s, W * 0.5, H * 0.3, W * 0.42, H * 0.52, 20, hex(spec.panel), 0.99);
    for (let i = 0; i < 5; i++) {
      const h = H * (0.08 + rnd() * 0.3);
      roundRect(s, W * (0.55 + i * 0.07), H * 0.74 - h, W * 0.045, h, 8, accent, 0.35 + i * 0.12);
    }
  } else if (spec.motif === "orbit") {
    const cx = W * 0.62;
    const cy = H * 0.5;
    for (let i = 0; i < 4; i++) ring(s, cx, cy, H * (0.16 + i * 0.11), 2, ink, 0.16 + i * 0.02);
    circle(s, cx, cy, H * 0.12, accent, 0.92, 2);
    circle(s, cx, cy, H * 0.12, hex(spec.panel), 0.25, 2);
    const angles = [0.4, 1.5, 2.6, 3.9, 5.2];
    angles.forEach((a, i) => {
      const r = H * (0.16 + (i % 4) * 0.11);
      circle(s, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 1.0, 10 + i * 2, hex(spec.panel), 0.95, 1.6);
    });
    roundRect(s, W * 0.07, H * 0.34, W * 0.26, 14, 7, ink, 0.22);
    roundRect(s, W * 0.07, H * 0.44, W * 0.18, 14, 7, ink, 0.16);
    roundRect(s, W * 0.07, H * 0.56, W * 0.11, 34, 17, accent, 0.85);
  } else if (spec.motif === "grid") {
    for (let gx = 0; gx <= 12; gx++) {
      const x = Math.round((W / 12) * gx);
      for (let y = 0; y < H; y++) s.blend(x, y, ink[0], ink[1], ink[2], 0.07);
    }
    for (let gy = 0; gy <= 8; gy++) {
      const y = Math.round((H / 8) * gy);
      for (let x = 0; x < W; x++) s.blend(x, y, ink[0], ink[1], ink[2], 0.07);
    }
    const cells = [[1, 1, 3, 2], [4, 1, 2, 4], [7, 2, 4, 3], [1, 4, 2, 3], [3, 4, 1, 2]];
    cells.forEach((c, i) => {
      roundRect(s, (W / 12) * c[0], (H / 8) * c[1], (W / 12) * c[2], (H / 8) * c[3], 16,
        i % 2 === 0 ? hex(spec.panel) : accent, i % 2 === 0 ? 0.92 : 0.7);
    });
  } else if (spec.motif === "wave") {
    const noise = makeNoise(seed + 3);
    for (let i = 0; i < 46; i++) {
      const yBase = H * 0.16 + i * (H * 0.68 / 46);
      const amp = H * 0.05 * (0.4 + Math.sin(i / 6) * 0.6);
      for (let x = 0; x < W; x++) {
        const y = yBase + Math.sin(x / 140 + i / 5) * amp + (fbm(noise, x / 200, i / 9, 2) - 0.5) * 26;
        const t = i / 46;
        const c = mixRgb(accent, ink, t);
        const a = 0.34 + 0.3 * Math.sin(i / 4);
        s.blend(x, Math.floor(y), c[0], c[1], c[2], a);
        s.blend(x, Math.floor(y) + 1, c[0], c[1], c[2], a * 0.5);
      }
    }
    roundRect(s, W * 0.06, H * 0.08, W * 0.2, 12, 6, hex(spec.panel), 0.7);
  } else if (spec.motif === "stack") {
    for (let i = 5; i >= 0; i--) {
      const inset = i * 26;
      roundRect(s, W * 0.2 + inset, H * 0.14 + i * 44, W * 0.6 - inset * 2, H * 0.42, 20,
        i === 0 ? hex(spec.panel) : mixRgb(hex(spec.panel), ink, 0.12 + i * 0.06), 0.9 - i * 0.08);
    }
    roundRect(s, W * 0.26, H * 0.2, W * 0.22, 14, 7, ink, 0.22);
    roundRect(s, W * 0.26, H * 0.28, W * 0.34, 14, 7, ink, 0.15);
    roundRect(s, W * 0.26, H * 0.4, W * 0.14, 40, 20, accent, 0.85);
    circle(s, W * 0.72, H * 0.34, 30, accent, 0.5, 2);
  } else if (spec.motif === "terminal") {
    roundRect(s, W * 0.12, H * 0.16, W * 0.76, H * 0.68, 24, hex(spec.panel), 0.97);
    for (let i = 0; i < 3; i++) circle(s, W * 0.15 + i * 26, H * 0.22, 8, ink, 0.18 + i * 0.04, 1.4);
    const lines = [0.34, 0.2, 0.46, 0.28, 0.52, 0.18, 0.4];
    lines.forEach((wq, i) => {
      const y = H * 0.31 + i * H * 0.07;
      roundRect(s, W * 0.15, y, W * 0.03, 10, 5, accent, 0.85);
      roundRect(s, W * 0.2, y, W * wq, 10, 5, hex("#8b98a8"), 0.55);
    });
  }

  vignette(s, 0.16);
  grain(s, seed + 404, 3);
  s.saveIndexed(path.join(OUT, "projects", file), 256);
}

const projects = [
  { file: "atlas-analytics.png", seed: 101, spec: { motif: "panels", ink: "#0b1220", accent: "#3b82f6", panel: "#f8fafc",
    mesh: [{ color: "#dbe4f0" }, { color: "#b9cbe8", x: 0.2, y: 0.2, r: 0.8, a: 0.9 }, { color: "#e9eef6", x: 0.85, y: 0.8, r: 0.7 }] } },
  { file: "meridian-design-system.png", seed: 202, spec: { motif: "grid", ink: "#141414", accent: "#f0a24a", panel: "#ffffff",
    mesh: [{ color: "#f0ece6" }, { color: "#e2d8c8", x: 0.8, y: 0.25, r: 0.85 }, { color: "#faf7f3", x: 0.15, y: 0.85, r: 0.7 }] } },
  { file: "harbor-payments.png", seed: 303, spec: { motif: "stack", ink: "#0a1a1a", accent: "#14b8a6", panel: "#f6fffd",
    mesh: [{ color: "#cfe7e3" }, { color: "#a7d4cd", x: 0.25, y: 0.75, r: 0.9 }, { color: "#e8f6f3", x: 0.8, y: 0.2, r: 0.75 }] } },
  { file: "signal-observability.png", seed: 404, spec: { motif: "wave", ink: "#111827", accent: "#8b5cf6", panel: "#ffffff",
    mesh: [{ color: "#1b1830" }, { color: "#3a2f63", x: 0.7, y: 0.3, r: 0.9 }, { color: "#141225", x: 0.2, y: 0.85, r: 0.8 }] } },
  { file: "cadence-scheduling.png", seed: 505, spec: { motif: "orbit", ink: "#1a1208", accent: "#ef7d57", panel: "#fffaf5",
    mesh: [{ color: "#f3e4d8" }, { color: "#e6c8b3", x: 0.65, y: 0.5, r: 0.85 }, { color: "#fdf6f0", x: 0.1, y: 0.15, r: 0.7 }] } },
  { file: "quill-editor.png", seed: 606, spec: { motif: "terminal", ink: "#0f172a", accent: "#22c55e", panel: "#0d1117",
    mesh: [{ color: "#101821" }, { color: "#1d2b3a", x: 0.3, y: 0.25, r: 0.9 }, { color: "#0a0f16", x: 0.85, y: 0.85, r: 0.8 }] } },
];
for (const p of projects) projectArt(p.file, p.seed, p.spec);

/* ------------------------------------------------------------------ *
 * Portraits — abstract geometric avatars, no likeness of a real person.
 * ------------------------------------------------------------------ */
function avatar(file, seed, colors, size = 320) {
  const s = new Surface(size, size);
  const noise = makeNoise(seed);
  const a = hex(colors[0]);
  const b = hex(colors[1]);
  s.each((x, y, sf) => {
    const t = clamp((x / size) * 0.5 + (y / size) * 0.5, 0, 1);
    const c = mixRgb(a, b, smoothstep(t));
    sf.set(x, y, c[0], c[1], c[2]);
  });
  const hi = hex(colors[2]);
  circle(s, size * 0.5, size * 0.38, size * 0.17, hi, 0.92, 1.6);
  // shoulders
  for (let y = Math.floor(size * 0.62); y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - size / 2) / (size * 0.42);
      const dy = (y - size * 1.02) / (size * 0.42);
      const d = dx * dx + dy * dy;
      const cov = clamp((1 - d) * 6, 0, 1);
      if (cov > 0) s.blend(x, y, hi[0], hi[1], hi[2], cov * 0.92);
    }
  }
  s.each((x, y, sf) => {
    const n = fbm(noise, x / 40, y / 40, 3) - 0.5;
    const [r, g, bb] = sf.get(x, y);
    sf.set(x, y, r + n * 12, g + n * 12, bb + n * 12);
  });
  grain(s, seed + 17, 3);
  s.saveIndexed(path.join(OUT, "people", file), 64);
}

avatar("pawan.png", 900, ["#2f3a4d", "#151a24", "#c9d4e4"], 400);
[
  ["nadia-oyelaran.png", 911, ["#3b3050", "#1c1728", "#d7cae8"]],
  ["ivan-brekke.png", 922, ["#25404a", "#101d24", "#c3ddd9"]],
  ["mira-halloran.png", 933, ["#4a3a2c", "#241a13", "#e6d4bf"]],
  ["tomas-lindqvist.png", 944, ["#2b3f2e", "#141f16", "#cbdcc6"]],
  ["ayesha-rahman.png", 955, ["#4a2f38", "#22151a", "#e8ccd3"]],
].forEach(([f, sd, cs]) => avatar(f, sd, cs, 200));

/* ------------------------------------------------------------------ *
 * Open Graph card
 * ------------------------------------------------------------------ */
{
  const W = 1200;
  const H = 630;
  const s = new Surface(W, H);
  meshBackground(s, 777, [
    { color: "#0d0d0d" },
    { color: "#242131", x: 0.25, y: 0.3, r: 0.9 },
    { color: "#141414", x: 0.85, y: 0.85, r: 0.8 },
  ]);
  const ink = hex("#f5f5f5");
  roundRect(s, 84, 150, 470, 22, 6, ink, 0.94);
  roundRect(s, 84, 194, 330, 22, 6, ink, 0.94);
  roundRect(s, 84, 262, 520, 12, 6, ink, 0.34);
  roundRect(s, 84, 292, 430, 12, 6, ink, 0.22);
  roundRect(s, 84, 372, 150, 44, 22, hex("#3b82f6"), 0.85);
  for (let i = 0; i < 3; i++) ring(s, 980, 315, 90 + i * 46, 2, ink, 0.14);
  circle(s, 980, 315, 62, hex("#3b82f6"), 0.75, 2);
  vignette(s, 0.3);
  grain(s, 512, 3);
  s.saveIndexed(path.join(OUT, "og.png"), 128);
}

console.log("assets generated");
