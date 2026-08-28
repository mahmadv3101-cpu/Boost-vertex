import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const screenshot = '/home/ubuntu/screenshots/figma_2026-08-19_10-20-44_1172.webp';
const outputDir = '/home/ubuntu/webdev-static-assets';
mkdirSync(outputDir, { recursive: true });

const crops = [
  ['case-study-reading-network-figma.png', '267x136+34+145'],
  ['case-study-reading-servers-figma.png', '269x136+317+145'],
  ['case-study-reading-abstract-figma.png', '269x136+603+145'],
];

for (const [name, geometry] of crops) {
  execFileSync('convert', [screenshot, '-crop', geometry, `${outputDir}/${name}`], { stdio: 'inherit' });
}
