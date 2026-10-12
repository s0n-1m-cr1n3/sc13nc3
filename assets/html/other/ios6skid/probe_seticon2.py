import re, glob
for f in sorted(glob.glob('_next/static/immutable/chunks/*.js')):
    src = open(f, encoding='utf-8', errors='replace').read()
    for m in re.finditer(r'settings-icon', src):
        i = m.start()
        seg = src[max(0, i-60):i + 120]
        if 'className' in seg and 'cydia' not in seg.lower():
            print(f.split('/')[-1], ascii(seg))
