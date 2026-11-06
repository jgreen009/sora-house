import sys
import os
from PIL import Image

src = sys.argv[1]
outdir = sys.argv[2]
count = int(sys.argv[3]) if len(sys.argv) > 3 else 6
maxw = int(sys.argv[4]) if len(sys.argv) > 4 else 900

im = Image.open(src)
os.makedirs(outdir, exist_ok=True)
w, h = im.size
scale = min(1.0, maxw / w)
sw = int(w * scale)
sh = int(h * scale)
small = im.resize((sw, sh), Image.LANCZOS)
seg_h = sh / count
for i in range(count):
    top = int(round(i * seg_h))
    bot = int(round((i + 1) * seg_h))
    if top >= sh:
        break
    seg = small.crop((0, top, sw, min(sh, bot)))
    seg.save(os.path.join(outdir, f"{i:02d}.png"))
print(f"{count} slices", (sw, sh), f"seg~{int(seg_h)}px")
