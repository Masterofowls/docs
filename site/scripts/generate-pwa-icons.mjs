/**
 * Generate solid-brand PNG icons for the PWA (no native deps).
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'icons');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcBuf));
  return Buffer.concat([len, typeBuf, data, crc]);
}

/** Simple book-mark icon on slate background. */
function makePng(size) {
  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4);
    row[0] = 0;
    for (let x = 0; x < size; x++) {
      const i = 1 + x * 4;
      const nx = x / size;
      const ny = y / size;
      // background #0f172a
      let r = 15;
      let g = 23;
      let b = 42;
      // rounded-ish card
      const inCard =
        nx > 0.22 && nx < 0.78 && ny > 0.18 && ny < 0.82;
      if (inCard) {
        r = 56;
        g = 189;
        b = 248; // sky
      }
      // spine / fold
      if (inCard && nx > 0.22 && nx < 0.34) {
        r = 14;
        g = 165;
        b = 233;
      }
      // lines
      if (
        inCard &&
        nx > 0.4 &&
        nx < 0.72 &&
        ((ny > 0.32 && ny < 0.36) ||
          (ny > 0.44 && ny < 0.48) ||
          (ny > 0.56 && ny < 0.6))
      ) {
        r = 15;
        g = 23;
        b = 42;
      }
      row[i] = r;
      row[i + 1] = g;
      row[i + 2] = b;
      row[i + 3] = 255;
    }
    rows.push(row);
  }
  const raw = Buffer.concat(rows);
  const compressed = zlib.deflateSync(raw);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

fs.mkdirSync(outDir, { recursive: true });
for (const size of [32, 72, 96, 128, 144, 152, 192, 384, 512]) {
  const file = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(file, makePng(size));
  console.log('wrote', path.relative(path.join(__dirname, '..'), file));
}

// maskable (full-bleed same art)
fs.writeFileSync(path.join(outDir, 'maskable-512.png'), makePng(512));
console.log('wrote public/icons/maskable-512.png');
