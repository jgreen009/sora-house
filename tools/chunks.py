import sys
import os
from PIL import Image

path = sys.argv[1]
outdir = sys.argv[2]
n = int(sys.argv[3]) if len(sys.argv) > 3 else 8
maxw = int(sys.argv[4]) if len(sys.argv) > 4 else 520
im = Image.open(path)
os.makedirs(outdir, exist_ok=True)
w, h = im.size
step = h // n
for i in range(n):
    top = i * step
    bot = min(h, top + step)
    if top >= h:
        break
    seg = im.crop((0, top, w, bot))
    scale = min(1.0, maxw / seg.width)
    seg = seg.resize((int(seg.width * scale), int(seg.height * scale)))
    seg.save(f"{outdir}/{i}.png")
print("ok", (w, h))
