import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const srcDir = 'C:\\Users\\assvi\\.gemini\\antigravity\\brain\\52f96229-2616-4672-b1e3-6248e71a2669';
const destDir = 'c:\\Users\\assvi\\Desktop\\SITES ANTIGRAVITY\\CLONE VIRTUAL\\public\\images\\hero';

const files = [
  { src: 'hero_novidades_webp_1775168948484.png', dest: 'hero_novidades.png' },
  { src: 'hero_colecao_petala_webp_1775168965143.png', dest: 'hero_colecao_petala.png' },
  { src: 'hero_frete_webp_1775168978752.png', dest: 'hero_frete.png' },
  { src: 'hero_tecido_webp_1775168991043.png', dest: 'hero_tecido.png' },
  { src: 'hero_points_webp_1775169006941.png', dest: 'hero_points.png' },
  { src: 'hero_bordo_webp_1775169022364.png', dest: 'hero_bordo.png' }
];

try {
  mkdirSync(destDir, { recursive: true });
  files.forEach(f => {
    copyFileSync(join(srcDir, f.src), join(destDir, f.dest));
    console.log(`Copied ${f.src} to ${f.dest}`);
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
