from pathlib import Path
from PIL import Image

screenshot = Path('/home/ubuntu/screenshots/figma_2026-08-19_10-20-44_1172.webp')
output_dir = Path('/home/ubuntu/webdev-static-assets')
output_dir.mkdir(parents=True, exist_ok=True)

image = Image.open(screenshot).convert('RGB')
crops = [
    ('case-study-reading-network-figma.png', (34, 145, 301, 281)),
    ('case-study-reading-servers-figma.png', (317, 145, 586, 281)),
    ('case-study-reading-abstract-figma.png', (603, 145, 872, 281)),
]

for name, box in crops:
    image.crop(box).save(output_dir / name, 'PNG', optimize=True)
