"""Build the No Biggie, I'm Fine site.

Reads src/template.html, src/app.js, the traced art in src/art and the fonts in src/fonts,
and writes one self-contained page:

  public/index.html    full HTML document, served by Vercel
  build/artifact.html  page body only, for publishing as a Claude artifact

Run from anywhere:  python3 src/build.py      (needs: pip install numpy pillow)
"""
import json, random, math, base64, re, sys
from pathlib import Path

SRC = Path(__file__).resolve().parent
ROOT = SRC.parent
A = json.load(open(SRC / 'art' / 'home.json'))
A.update(json.load(open(SRC / 'art' / 'story.json')))
A.update(json.load(open(SRC / 'art' / 'scenes.json')))
LIB = ['stuck_hero','panel1','panel2','panel3','walker','i_boots','i_nbook','i_mug','i_mtnsun','i_phones','i_cat','thumb1','thumb5','peek','ico_mtn','ico_sun','ico_flw','ico_book','card4','scene1','scene2','scene3','scene4','scene5','scene6']
FD = SRC / 'fonts'

def b64(path):
    return base64.b64encode(open(path, 'rb').read()).decode()

FONTS = (
    "@font-face{font-family:'Covered By Your Grace';font-style:normal;font-weight:400;font-display:swap;"
    "src:url(data:font/woff2;base64,%s) format('woff2')}\n" % b64(FD / 'covered-by-your-grace-latin-400-normal.woff2')
)
for st in ('normal', 'italic'):
    FONTS += ("@font-face{font-family:'Instrument Serif';font-style:%s;font-weight:400;font-display:swap;"
              "src:url(data:font/woff2;base64,%s) format('woff2')}\n" % (st, b64(FD / f'instrument-serif-latin-400-{st}.woff2')))
for w in (400, 500):
    FONTS += ("@font-face{font-family:'DM Mono';font-style:normal;font-weight:%d;font-display:swap;"
              "src:url(data:font/woff2;base64,%s) format('woff2')}\n" % (w, b64(FD / f'dm-mono-latin-{w}-normal.woff2')))

LABELS = {
    'hero': 'A shaggy black creature with wide eyes sits in the grass beside a daisy.',
    'featured': 'The creature sits in the rain under a scribbled storm cloud, a small flower growing next to it.',
    'card1': 'A low, round creature peeks over the ground.',
    'card2': 'Two tall, skinny creatures stand side by side.',
    'card3': 'A creature lies on its back in the grass.',
    'card4': 'A creature wearing a paper crown sits upright.',
    'practices': 'The creature lies on its back in the grass with one leg up, a bird perched on its foot, under a bright sun.',
    'ico_mtn': '', 'ico_sun': '', 'ico_flw': '', 'ico_book': '',
    'about': 'The crowned creature sits on a hilltop at night, snowy mountains and pine trees behind it, a crescent moon overhead.',
    'tee': 'White tee with the sitting creature printed on the chest.',
    'mug': 'White mug with the creature peeking over the bottom edge.',
    'nbook': 'Spiral notebook with the crowned creature on the cover.',
    'print': 'Night print of a moon over snowy mountains and pines.',
    'peek': 'The creature peeks over a ledge with wide eyes.',
    'stuck_hero': 'The creature peeks over a desk under a scribbled storm cloud, books and a mug on one side, a plant on the other.',
    'walker': 'The creature walks over a hill with a backpack on, under a bright sun.',
}

def rain_group(seed=7, clip="M118 68 L300 62 L338 286 L40 286 Z", xr=(30,362), cid="rainclip", n=34):
    """Seamlessly looping rain lines for the featured scene (crop-local coords)."""
    r = random.Random(seed)
    T = 72
    base = []
    for _ in range(n):
        x = r.uniform(*xr)
        y = r.uniform(0, T)
        L = r.uniform(9, 20)
        base.append((x, y, L, r.uniform(.18, .42)))
    lines = []
    for k in range(-1, 5):
        for (x, y, L, o) in base:
            yy = y + k * T
            lines.append(f'<line x1="{x:.1f}" y1="{yy:.1f}" x2="{x-L*.22:.1f}" y2="{yy+L:.1f}" opacity="{o+.2:.2f}"/>')
    return (f'<clipPath id="{cid}"><path d="{clip}"/></clipPath>'
            f'<g clip-path="url(#{cid})"><g class="rain">' + ''.join(lines) + '</g></g>')

def stars():
    pts = [(108, 22, 1.6, 0), (172, 50, 1.2, 1.3), (300, 12, 1.4, .6), (452, 46, 1.3, 2.1), (210, 16, 1.1, 2.8), (338, 64, 1.0, 1.7)]
    out = []
    for x, y, s, d in pts:
        out.append(f'<path class="twinkle" style="animation-delay:-{d}s" d="M{x} {y-s*2.6}L{x+s*.55} {y-s*.55}L{x+s*2.6} {y}L{x+s*.55} {y+s*.55}L{x} {y+s*2.6}L{x-s*.55} {y+s*.55}L{x-s*2.6} {y}L{x-s*.55} {y-s*.55}Z"/>')
    return ''.join(out)

def art(name, cls='', back='', front='', label=None):
    a = A[name]
    w, h = a['w'], a['h']
    lab = LABELS.get(name, '') if label is None else label
    aria = f'role="img" aria-label="{lab}"' if lab else 'aria-hidden="true"'
    par = ' preserveAspectRatio="xMidYMax meet"' if name in ('tee','mug','nbook','print') else ''
    s = [f'<svg class="art art--{name} {cls}" viewBox="0 0 {w} {h}"{par} {aria} focusable="false" style="--aw:{w};--ah:{h}">']
    s.append(back)
    if a.get('mid'):
        s.append(f'<path class="p-mid" d="{a["mid"]}"/>')
    if a['mode'] == 'light':
        s.append(f'<path class="p-ink" d="{a["ink"]}"/>')
    else:
        s.append(f'<path class="p-body" d="{a["body"]}"/>')
        s.append(f'<path class="p-lite" d="{a["light"]}"/>')
    for (x, y, r) in a.get('eyes', []):
        s.append(
            f'<g class="eye" data-cx="{x}" data-cy="{y}" data-r="{r}"><g class="lid">'
            f'<circle class="ew" cx="{x}" cy="{y}" r="{r}"/>'
            f'<circle class="pp" cx="{x}" cy="{y}" r="{r*.31:.2f}"/>'
            f'</g></g>')
    s.append(front)
    s.append('</svg>')
    return ''.join(s)

def tear_pts(r, w=1600, base=19.0, amp=10.0):
    ph = [r.random() * 6.283 for _ in range(4)]
    pts = []
    x = 0.0
    while x < w:
        y = (base + amp * .42 * math.sin(x / 140 + ph[0]) + amp * .3 * math.sin(x / 47 + ph[1])
             + amp * .2 * math.sin(x / 17 + ph[2]) + r.uniform(-2.4, 2.4))
        if r.random() < .07:
            y += r.uniform(-7, 5)
        pts.append((x, max(2, min(36, y))))
        x += r.uniform(3, 12)
    pts.append((w, pts[-1][1]))
    return pts

def tear(seed, kind='top', rim='var(--paper-hi)', fill='var(--night)'):
    r = random.Random(seed)
    pts = tear_pts(r)
    main = 'M0 40' + ''.join(f'L{x:.0f} {y:.1f}' for x, y in pts) + 'L1600 40Z'
    rim_pts = [(x, max(0.5, y - 2.2 - r.uniform(0, 3.2))) for x, y in pts]
    rimd = 'M0 40' + ''.join(f'L{x:.0f} {y:.1f}' for x, y in rim_pts) + 'L1600 40Z'
    return (f'<svg class="tear tear--{kind}" viewBox="0 0 1600 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
            f'<path d="{rimd}" fill="{rim}"/><path d="{main}" fill="{fill}"/></svg>')

ARROW = ('<svg class="arr" viewBox="0 0 20 10" aria-hidden="true" focusable="false">'
         '<path d="M1 5.2h16.5M13.4 1.4 17.6 5.2l-4.2 3.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')
RULE = ('<svg class="rule" viewBox="0 0 400 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
        '<path d="M2 4.6C58 3.4 118 5.6 196 4.4S320 3.2 398 4.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>')
SCRIBBLE = ('<svg class="scrib" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
            '<path d="M3 8.5C30 6.4 64 4.8 117 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>')

src = open(SRC / 'template.html').read().replace('/*MARKUP*/', open(SRC / 'markup.html').read())
import numpy as np, io
from PIL import Image
def grain(rgb, base, speck, seed):
    g = np.random.default_rng(seed)
    n = 160
    a = g.random((n, n)) * base
    m = g.random((n, n)) < .035
    a[m] += g.random(m.sum()) * speck
    # soft fibers: a few short horizontal smears
    for _ in range(26):
        y, x, L = g.integers(0, n), g.integers(0, n), g.integers(4, 14)
        xs = (np.arange(L) + x) % n
        a[y, xs] += speck * .35
    a = np.clip(a, 0, 255).astype(np.uint8)
    img = np.zeros((n, n, 4), np.uint8); img[..., :3] = rgb; img[..., 3] = a
    buf = io.BytesIO(); Image.fromarray(img, 'RGBA').save(buf, 'PNG', optimize=True)
    return 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
src = src.replace('/*PAPERGRAIN*/', grain((70, 62, 48), 20, 55, 3))
src = src.replace('/*NIGHTGRAIN*/', grain((236, 230, 218), 11, 38, 5))
src = src.replace('/*FONTS*/', FONTS)
lib = {}
for n in LIB:
    back = rain_group(11, 'M175 172 L415 166 L448 346 L118 346 Z', (110, 480), 'rainclip2', 44) if n == 'stuck_hero' else ''
    lib[n] = art(n, back=back)
src = src.replace('/*ARTLIB*/', 'window.__ARTLIB=' + json.dumps(lib, separators=(',',':')).replace('</', '<\\/') + ';')
src = src.replace('/*APP*/', open(SRC / 'app.js').read())
src = src.replace('{{ARROW}}', ARROW).replace('{{RULE}}', RULE).replace('{{SCRIB}}', SCRIBBLE)

def art_sub(m):
    name = m.group(1)
    extra = m.group(2) or ''
    back = rain_group() if name == 'featured' else ''
    front = stars() if name == 'about' else ''
    return art(name, cls=extra.strip(), back=back, front=front)

src = re.sub(r'\{\{LIB:(\w+)\}\}', lambda m: art(m.group(1)), src)
src = re.sub(r'\{\{ART:(\w+)(?: ([\w\- ]+))?\}\}', art_sub, src)

def tear_sub(m):
    seed, kind, rim, fill = m.group(1), m.group(2), m.group(3), m.group(4)
    return tear(int(seed), kind, rim, fill)

src = re.sub(r'\{\{TEAR:(\d+):(\w+):([^:}]+):([^}]+)\}\}', tear_sub, src)
left = re.findall(r'\{\{[^}]+\}\}', src)
if left:
    print('UNRESOLVED', left[:5]); sys.exit(1)
# ---------- outputs ----------
SITE_URL = 'https://radcatdesign.github.io/nbif'
FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E"
           "%3Cpath d='M8 60C8 30 18 8 32 8s24 22 24 52z' fill='%23131312'/%3E"
           "%3Ccircle cx='24' cy='32' r='9' fill='%23F1ECE0'/%3E%3Ccircle cx='41' cy='30' r='9' fill='%23F1ECE0'/%3E"
           "%3Ccircle cx='25' cy='33' r='3.4' fill='%23131312'/%3E%3Ccircle cx='42' cy='31' r='3.4' fill='%23131312'/%3E%3C/svg%3E")
DESC = "A field guide for people who push it down and power through."

(ROOT / 'build').mkdir(exist_ok=True)
(ROOT / 'build' / 'artifact.html').write_text(src)

# full document for the web: the template opens with <title>, <meta> and one <style> block
cut = src.index('</style>') + len('</style>')
head_part, body_part = src[:cut], src[cut:]
head_part = re.sub(r'<title>.*?</title>\s*<meta name="description"[^>]*>\s*', '', head_part, count=1, flags=re.S)
doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>No Biggie, I'm Fine</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#F1ECE0">
<link rel="icon" href="{FAVICON}">
<meta property="og:type" content="website">
<meta property="og:title" content="No Biggie, I'm Fine">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{SITE_URL}/">
<meta property="og:image" content="{SITE_URL}/og.png">
<meta name="twitter:card" content="summary_large_image">
<style>:root{{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
{head_part.strip()}
</head>
<body>
{body_part.strip()}
</body>
</html>
"""
(ROOT / 'public').mkdir(exist_ok=True)
(ROOT / 'public' / 'index.html').write_text(doc)
print('built public/index.html', len(doc) // 1024, 'KB')
