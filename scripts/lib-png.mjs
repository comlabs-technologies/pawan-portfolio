import zlib from "node:zlib";
import fs from "node:fs";

const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

/** Simple RGB raster surface with float accumulation and alpha compositing. */
export class Surface {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.data = new Float64Array(width * height * 3);
  }

  set(x, y, r, g, b) {
    const i = (y * this.w + x) * 3;
    this.data[i] = r;
    this.data[i + 1] = g;
    this.data[i + 2] = b;
  }

  blend(x, y, r, g, b, a) {
    if (!(a > 0) || x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = (y * this.w + x) * 3;
    const ia = 1 - a;
    this.data[i] = this.data[i] * ia + r * a;
    this.data[i + 1] = this.data[i + 1] * ia + g * a;
    this.data[i + 2] = this.data[i + 2] * ia + b * a;
  }

  get(x, y) {
    const i = (y * this.w + x) * 3;
    return [this.data[i], this.data[i + 1], this.data[i + 2]];
  }

  each(fn) {
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) fn(x, y, this);
    }
  }

  toPNG() {
    const raw = Buffer.alloc((this.w * 3 + 1) * this.h);
    let p = 0;
    for (let y = 0; y < this.h; y++) {
      raw[p++] = 0;
      for (let x = 0; x < this.w; x++) {
        const i = (y * this.w + x) * 3;
        raw[p++] = clamp255(this.data[i]);
        raw[p++] = clamp255(this.data[i + 1]);
        raw[p++] = clamp255(this.data[i + 2]);
      }
    }
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(this.w, 0);
    ihdr.writeUInt32BE(this.h, 4);
    ihdr[8] = 8;
    ihdr[9] = 2;
    return Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk("IHDR", ihdr),
      chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
      chunk("IEND", Buffer.alloc(0)),
    ]);
  }

  save(path) {
    fs.writeFileSync(path, this.toPNG());
  }
}

const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v));

export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const mixRgb = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
export const smoothstep = (t) => t * t * (3 - 2 * t);

export function hex(h) {
  const s = h.replace("#", "");
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}

export function mulberry(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Value noise with smooth interpolation, tileable-ish. */
export function makeNoise(seed) {
  const rnd = mulberry(seed);
  const size = 256;
  const grid = new Float64Array(size * size);
  for (let i = 0; i < grid.length; i++) grid[i] = rnd();
  const at = (x, y) => grid[(((y % size) + size) % size) * size + (((x % size) + size) % size)];
  return function noise(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const tx = smoothstep(x - xi);
    const ty = smoothstep(y - yi);
    const a = lerp(at(xi, yi), at(xi + 1, yi), tx);
    const b = lerp(at(xi, yi + 1), at(xi + 1, yi + 1), tx);
    return lerp(a, b, ty);
  };
}

export function fbm(noise, x, y, octaves = 4) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += noise(x * freq, y * freq) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

/** Anti-aliased filled circle. */
export function circle(surface, cx, cy, radius, color, alpha = 1, softness = 1.2) {
  const x0 = Math.max(0, Math.floor(cx - radius - 2));
  const x1 = Math.min(surface.w - 1, Math.ceil(cx + radius + 2));
  const y0 = Math.max(0, Math.floor(cy - radius - 2));
  const y1 = Math.min(surface.h - 1, Math.ceil(cy + radius + 2));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const cov = clamp((radius - d) / softness + 0.5, 0, 1);
      if (cov > 0) surface.blend(x, y, color[0], color[1], color[2], cov * alpha);
    }
  }
}

export function ring(surface, cx, cy, radius, width, color, alpha = 1) {
  const x0 = Math.max(0, Math.floor(cx - radius - width));
  const x1 = Math.min(surface.w - 1, Math.ceil(cx + radius + width));
  const y0 = Math.max(0, Math.floor(cy - radius - width));
  const y1 = Math.min(surface.h - 1, Math.ceil(cy + radius + width));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const d = Math.abs(Math.hypot(x + 0.5 - cx, y + 0.5 - cy) - radius);
      const cov = clamp((width / 2 - d) / 1.1 + 0.5, 0, 1);
      if (cov > 0) surface.blend(x, y, color[0], color[1], color[2], cov * alpha);
    }
  }
}

export function roundRect(surface, x, y, w, h, r, color, alpha = 1) {
  const x0 = Math.max(0, Math.floor(x - 2));
  const x1 = Math.min(surface.w - 1, Math.ceil(x + w + 2));
  const y0 = Math.max(0, Math.floor(y - 2));
  const y1 = Math.min(surface.h - 1, Math.ceil(y + h + 2));
  const rr = Math.min(r, w / 2, h / 2);
  for (let py = y0; py <= y1; py++) {
    for (let px = x0; px <= x1; px++) {
      const dx = Math.max(x + rr - (px + 0.5), 0, px + 0.5 - (x + w - rr));
      const dy = Math.max(y + rr - (py + 0.5), 0, py + 0.5 - (y + h - rr));
      const d = Math.hypot(dx, dy) - rr;
      const cov = clamp(-d / 1.1 + 0.5, 0, 1);
      if (cov > 0) surface.blend(px, py, color[0], color[1], color[2], cov * alpha);
    }
  }
}

export function grain(surface, seed, amount) {
  const rnd = mulberry(seed);
  surface.each((x, y, s) => {
    const n = (rnd() - 0.5) * amount;
    const [r, g, b] = s.get(x, y);
    s.set(x, y, r + n, g + n, b + n);
  });
}

export function vignette(surface, strength = 0.28) {
  const cx = surface.w / 2;
  const cy = surface.h / 2;
  const max = Math.hypot(cx, cy);
  surface.each((x, y, s) => {
    const d = Math.hypot(x - cx, y - cy) / max;
    const f = 1 - strength * smoothstep(clamp((d - 0.45) / 0.55, 0, 1));
    const [r, g, b] = s.get(x, y);
    s.set(x, y, r * f, g * f, b * f);
  });
}

/* ---------------- indexed-colour PNG (palette + dithering) ---------------- */

function medianCut(pixels, depth) {
  if (depth === 0 || pixels.length === 0) {
    if (pixels.length === 0) return [[0, 0, 0]];
    let r = 0, g = 0, b = 0;
    for (const p of pixels) { r += p[0]; g += p[1]; b += p[2]; }
    const n = pixels.length;
    return [[Math.round(r / n), Math.round(g / n), Math.round(b / n)]];
  }
  let ranges = [0, 1, 2].map((c) => {
    let lo = 255, hi = 0;
    for (const p of pixels) { if (p[c] < lo) lo = p[c]; if (p[c] > hi) hi = p[c]; }
    return hi - lo;
  });
  const channel = ranges.indexOf(Math.max(...ranges));
  pixels.sort((a, b) => a[channel] - b[channel]);
  const mid = pixels.length >> 1;
  return [
    ...medianCut(pixels.slice(0, mid), depth - 1),
    ...medianCut(pixels.slice(mid), depth - 1),
  ];
}

Surface.prototype.saveIndexed = function saveIndexed(filePath, colors = 128) {
  const { w, h, data } = this;
  const sample = [];
  const step = Math.max(1, Math.floor((w * h) / 24000));
  for (let i = 0; i < w * h; i += step) {
    sample.push([
      Math.max(0, Math.min(255, Math.round(data[i * 3]))),
      Math.max(0, Math.min(255, Math.round(data[i * 3 + 1]))),
      Math.max(0, Math.min(255, Math.round(data[i * 3 + 2]))),
    ]);
  }
  const depth = Math.round(Math.log2(colors));
  const palette = medianCut(sample, depth).slice(0, 256);

  // 3D lookup grid for nearest-palette-colour queries
  const cache = new Map();
  const nearest = (r, g, b) => {
    const key = ((r >> 2) << 12) | ((g >> 2) << 6) | (b >> 2);
    const hit = cache.get(key);
    if (hit !== undefined) return hit;
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < palette.length; i++) {
      const p = palette[i];
      const d = (p[0] - r) ** 2 * 0.299 + (p[1] - g) ** 2 * 0.587 + (p[2] - b) ** 2 * 0.114;
      if (d < bestD) { bestD = d; best = i; }
    }
    cache.set(key, best);
    return best;
  };

  const work = Float64Array.from(data);
  const indices = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      const r = work[i], g = work[i + 1], b = work[i + 2];
      const idx = nearest(
        Math.max(0, Math.min(255, Math.round(r))),
        Math.max(0, Math.min(255, Math.round(g))),
        Math.max(0, Math.min(255, Math.round(b)))
      );
      indices[y * w + x] = idx;
      const p = palette[idx];
      const er = r - p[0], eg = g - p[1], eb = b - p[2];
      const spread = (dx, dy, f) => {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) return;
        const j = (ny * w + nx) * 3;
        work[j] += er * f;
        work[j + 1] += eg * f;
        work[j + 2] += eb * f;
      };
      spread(1, 0, 7 / 16);
      spread(-1, 1, 3 / 16);
      spread(0, 1, 5 / 16);
      spread(1, 1, 1 / 16);
    }
  }

  const raw = Buffer.alloc((w + 1) * h);
  let p = 0;
  for (let y = 0; y < h; y++) {
    raw[p++] = 0;
    for (let x = 0; x < w; x++) raw[p++] = indices[y * w + x];
  }
  const plte = Buffer.alloc(palette.length * 3);
  palette.forEach((c, i) => { plte[i * 3] = c[0]; plte[i * 3 + 1] = c[1]; plte[i * 3 + 2] = c[2]; });

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 3;
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunkPublic("IHDR", ihdr),
    chunkPublic("PLTE", plte),
    chunkPublic("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunkPublic("IEND", Buffer.alloc(0)),
  ]);
  fs.writeFileSync(filePath, png);
};

function chunkPublic(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  let c = -1;
  for (let i = 0; i < body.length; i++) c = crcTable[(c ^ body[i]) & 0xff] ^ (c >>> 8);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE((c ^ -1) >>> 0, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}
