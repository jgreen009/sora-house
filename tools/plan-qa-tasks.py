import os
import glob

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
frames_root = os.path.join(root, 'tools', '.frames')

pages = ['index', 'rooms', 'room-atlantic', 'book', 'experiences', 'gallery',
         'about', 'contact', 'confirmation', 'components', '404']
vps = ['desktop', 'mobile']

units = []
for vp in vps:
    for p in pages:
        d = os.path.join(frames_root, f'{p}-{vp}')
        fs = sorted(glob.glob(os.path.join(d, '*.png')))
        if fs:
            units.append((p, vp, fs))

MAX = 5
tasks = []
cur = []
for p, vp, fs in units:
    for f in fs:
        cur.append((p, vp, f))
        if len(cur) == MAX:
            tasks.append(cur)
            cur = []
if cur:
    tasks.append(cur)

for i, t in enumerate(tasks):
    scopes = []
    for p, vp, f in t:
        scopes.append(f'{p}-{vp}/{os.path.basename(f)[:-4]}')
    print(f'TASK {i+1:02d}: {len(t)} images')
    print('  ' + ', '.join(scopes))
print(f'TOTAL TASKS {len(tasks)}, TOTAL IMAGES {sum(len(t) for t in tasks)}')
