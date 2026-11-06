import sys
import os
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
files = sorted(f for f in os.listdir(src) if f.endswith('.png'))
frames = [Image.open(os.path.join(src, f)).convert('RGB') for f in files]
w = max(f.width for f in frames)
h = sum(f.height for f in frames)
canvas = Image.new('RGB', (w, h), 'white')
y = 0
for f in frames:
    canvas.paste(f, (0, y))
    y += f.height
canvas.save(dst)
print(dst, canvas.size)
