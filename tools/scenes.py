"""Draw the story illustrations for The Plates.

Each scene is composed from the site's traced creatures plus hand-drawn props
(jittered, double-pass strokes and hatching), rendered in Chromium at 2x,
then traced with potrace so every scene shares the same line quality as the
rest of the art. Output: src/art/scenes.json (same format as the other art files).

Run:  python3 tools/scenes.py      (needs playwright, opencv-python, numpy, potracer)
"""
import json, math, random, sys
from pathlib import Path
import numpy as np, cv2, potrace
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
A = json.load(open(ROOT / 'src/art/home.json')); A.update(json.load(open(ROOT / 'src/art/story.json')))
import base64
FONT = 'data:font/woff2;base64,' + base64.b64encode((ROOT / 'src/fonts/covered-by-your-grace-latin-400-normal.woff2').read_bytes()).decode()
W, H = 1000, 560

# ---------- hand-drawn primitives ----------
class Pen:
    def __init__(self, seed):
        self.r = random.Random(seed)
    def wobble(self, pts, amp=1.6, step=6):
        dense = []
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            L = math.hypot(x1 - x0, y1 - y0); n = max(1, int(L / step))
            for i in range(n):
                t = i / n; dense.append([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t])
        dense.append(list(pts[-1]))
        off = [[self.r.uniform(-amp, amp), self.r.uniform(-amp, amp)] for _ in dense]
        sm = []
        for i in range(len(dense)):
            a = off[max(0, i - 1)]; b = off[i]; c = off[min(len(off) - 1, i + 1)]
            sm.append([dense[i][0] + (a[0] + b[0] + c[0]) / 3, dense[i][1] + (a[1] + b[1] + c[1]) / 3])
        return sm
    def d(self, pts):
        return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)
    def line(self, pts, w=3.2, passes=2, amp=1.6, closed=False):
        if closed: pts = list(pts) + [pts[0]]
        out = []
        for k in range(passes):
            p = [list(q) for q in pts]
            if not closed and len(p) >= 2:  # small overshoot at the ends
                for (i, j) in ((0, 1), (-1, -2)):
                    dx, dy = p[i][0] - p[j][0], p[i][1] - p[j][1]; L = math.hypot(dx, dy) or 1
                    e = self.r.uniform(0, 4); p[i] = [p[i][0] + dx / L * e, p[i][1] + dy / L * e]
            ww = w if k == 0 else w * 0.55
            out.append(f'<path d="{self.d(self.wobble(p, amp))}" fill="none" stroke="#fff" stroke-width="{ww:.2f}" stroke-linecap="round" stroke-linejoin="round"/>')
        return ''.join(out)
    def rect(self, x, y, rw, rh, **k):
        return self.line([(x, y), (x + rw, y), (x + rw, y + rh), (x, y + rh)], closed=True, **k)
    def ellipse(self, cx, cy, rx, ry, a0=0, a1=360, n=40, **k):
        pts = [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cy + ry * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]
        return self.line(pts, **k)
    def hatch(self, poly, ang=-35, gap=9, w=1.5, cid=None):
        cid = cid or f'c{self.r.randrange(10**8)}'
        xs = [p[0] for p in poly]; ys = [p[1] for p in poly]
        cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
        R = math.hypot(max(xs) - min(xs), max(ys) - min(ys)) / 2 + 10
        a = math.radians(ang); dx, dy = math.cos(a), math.sin(a); nx, ny = -dy, dx
        lines = []
        t = -R
        while t <= R:
            ox, oy = cx + nx * t, cy + ny * t
            lines.append(self.line([(ox - dx * R, oy - dy * R), (ox + dx * R, oy + dy * R)], w=w, passes=1, amp=1.0))
            t += gap * self.r.uniform(.8, 1.2)
        pd = 'M' + ' L'.join(f'{x} {y}' for x, y in poly) + 'Z'
        return f'<clipPath id="{cid}"><path d="{pd}"/></clipPath><g clip-path="url(#{cid})">' + ''.join(lines) + '</g>'
    def fill(self, poly, color='#fff'):
        return f'<path d="{self.d(self.wobble(list(poly) + [poly[0]], 1.0))}Z" fill="{color}"/>'
    def text(self, x, y, s, size=30, rot=0, anchor='middle', color='#fff'):
        return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" fill="{color}" transform="rotate({rot} {x} {y})" font-family="H">{s}</text>'
    def grass(self, x0, x1, y, n=10):
        out = []
        for _ in range(n):
            x = self.r.uniform(x0, x1)
            for k in range(self.r.randint(2, 4)):
                out.append(self.line([(x, y), (x + self.r.uniform(-8, 8), y - self.r.uniform(8, 22))], w=2, passes=1, amp=.6))
                x += self.r.uniform(2, 5)
        return ''.join(out)

EYES = []
def creature(name, x, y, s, clip=None):
    """Place a traced creature. clip = (x, y, w, h) in the creature's own coordinates."""
    a = A[name]; inner = ''
    if a.get('body'): inner += f'<path d="{a["body"]}" fill="#000" fill-rule="evenodd"/>'
    inner += f'<path d="{a["light"]}" fill="#fff" fill-rule="evenodd"/>'
    for ex, ey, er in a.get('eyes', []):
        if clip and not (clip[0] <= ex <= clip[0] + clip[2] and clip[1] <= ey <= clip[1] + clip[3]): continue
        inner += f'<circle cx="{ex}" cy="{ey}" r="{er * 1.12:.2f}" fill="#000"/>'
        EYES.append((round(x + ex * s, 1), round(y + ey * s, 1), round(er * s, 1)))
    if clip:
        cid = f'cl{len(EYES)}{name}'
        inner = f'<clipPath id="{cid}"><rect x="{clip[0]}" y="{clip[1]}" width="{clip[2]}" height="{clip[3]}"/></clipPath><g clip-path="url(#{cid})">{inner}</g>'
    return f'<g transform="translate({x} {y}) scale({s})">{inner}</g>'

def blackout(poly):
    return '<path d="M' + ' L'.join(f'{x} {y}' for x, y in poly) + 'Z" fill="#000"/>'

# ---------- scenes ----------
def scene1():
    p = Pen(11); s = ''
    # window with moon
    s += p.rect(70, 46, 190, 150, w=3.6) + p.line([(165, 46), (165, 196)]) + p.line([(70, 121), (260, 121)])
    s += p.ellipse(118, 84, 20, 20, w=2.6) + blackout([(126, 64), (148, 70), (150, 100), (128, 104), (134, 84)])
    s += p.hatch([(70, 196), (260, 196), (270, 214), (60, 214)], ang=0, gap=7, w=1.4)
    for (x, y) in [(212, 70), (236, 98), (200, 160), (96, 160)]:
        s += p.line([(x - 5, y), (x + 5, y)], w=2, passes=1) + p.line([(x, y - 5), (x, y + 5)], w=2, passes=1)
    # calendar
    s += p.rect(790, 50, 128, 128, w=3.2) + p.hatch([(790, 50), (918, 50), (918, 80), (790, 80)], ang=-20, gap=6)
    s += p.text(854, 122, 'OCT', 34) + p.text(854, 160, '2016', 30)
    s += p.line([(812, 50), (812, 38)], w=3) + p.line([(896, 50), (896, 38)], w=3)
    # creature in bed
    s += creature('panel1', 34, 210, 2.35)
    # nightstand + buzzing phone
    s += p.rect(744, 404, 196, 116, w=3.4) + p.line([(744, 452), (940, 452)]) + p.ellipse(842, 480, 6, 6, w=2.4)
    s += p.line([(752, 520), (746, 544)], w=3) + p.line([(932, 520), (938, 544)], w=3)
    ph = [(786, 384), (898, 372), (902, 396), (790, 408)]
    s += p.line(ph, closed=True, w=3.4) + p.fill([(796, 386), (890, 376), (892, 392), (798, 402)])
    s += p.text(842, 396, 'GRANDMA', 17, rot=-6, color='#000')
    for k, (dx, r0) in enumerate([(-1, 22), (-1, 38), (1, 22), (1, 38)]):
        cx = 772 if dx < 0 else 916
        s += p.ellipse(cx, 386, r0 * .5, r0, a0=110 if dx < 0 else -70, a1=250 if dx < 0 else 70, n=12, w=2.6, passes=1)
    s += p.text(848, 330, 'bzzz', 30, rot=-8)
    s += p.line([(0, 544), (1000, 540)], w=3)
    return s

def scene2():
    p = Pen(22); s = ''
    # wall list of names
    s += p.rect(650, 30, 300, 250, w=3.4) + p.line([(800, 30), (800, 16)], w=3) + p.ellipse(800, 14, 6, 6, w=2.4)
    names = ['ST. MARY’S', 'COUNTY GEN.', 'PRECINCT 4', 'MERCY', '5TH ST. PD']
    for i, n in enumerate(names):
        y = 78 + i * 44
        s += p.text(676, y, n, 30, anchor='start')
        if i in (0, 1, 2): s += p.line([(668, y - 10), (680 + len(n) * 15, y - 13)], w=3.4)
        if i == 4: s += p.line([(668, y - 10), (680 + len(n) * 15, y - 8)], w=3.4)
    s += p.ellipse(740, 200, 86, 26, w=3.2)
    # big speech bubble from the phone
    bub = [(60 + 230 * math.cos(math.radians(a)) * .9 + 230, 120 + 80 * math.sin(math.radians(a))) for a in range(0, 361, 10)]
    s += p.line(bub, w=3.6)
    s += p.line([(150, 186), (118, 246), (206, 196)], w=3.6)
    s += p.text(266, 140, 'He’s here.', 64)
    # phone held up on the left
    s += f'<g transform="rotate(-12 110 330)">' + p.rect(66, 250, 92, 168, w=3.6) + p.hatch([(76, 268), (148, 268), (148, 394), (76, 394)], gap=8) + p.line([(98, 406), (126, 406)], w=3) + '</g>'
    s += p.ellipse(186, 288, 14, 26, a0=-70, a1=70, n=10, w=2.6, passes=1) + p.ellipse(198, 288, 24, 44, a0=-70, a1=70, n=12, w=2.6, passes=1)
    # creature at the desk (cloud cropped away)
    s += creature('stuck_hero', 260, -12, 1.55, clip=(0, 150, 451, 210))
    return s

def scene3():
    p = Pen(33); s = ''
    # window with a red-eye flight
    s += p.rect(360, 40, 230, 140, w=3.4) + p.line([(475, 40), (475, 180)])
    s += p.line([(400, 120), (450, 104), (470, 106), (460, 112), (412, 128)], closed=True, w=2.6)
    s += p.line([(436, 110), (446, 92), (452, 94), (448, 112)], w=2.4) + p.line([(420, 124), (414, 136)], w=2.4)
    s += p.line([(380, 136), (398, 126)], w=1.6, passes=1) + p.line([(366, 142), (380, 134)], w=1.6, passes=1)
    s += p.ellipse(548, 78, 16, 16, w=2.4) + blackout([(552, 60), (570, 66), (570, 92), (552, 96), (558, 78)])
    # heart monitor
    s += p.rect(60, 70, 190, 130, w=3.4) + p.line([(155, 200), (155, 290)], w=3)
    s += p.line([(76, 140), (110, 140), (120, 108), (132, 176), (146, 92), (158, 150), (168, 140), (234, 140)], w=3.2)
    s += p.text(186, 186, 'beep', 22)
    # IV pole + bag
    s += p.line([(300, 70), (300, 500)], w=3) + p.line([(270, 70), (330, 70)], w=3)
    s += p.line([(312, 74), (338, 74), (342, 130), (316, 132)], closed=True, w=2.8) + p.line([(328, 132), (318, 330), (380, 360)], w=2, passes=1)
    # hospital bed
    s += p.rect(70, 330, 400, 46, w=3.6) + p.line([(70, 300), (70, 470)], w=4) + p.line([(470, 340), (470, 470)], w=4)
    s += p.line([(70, 376), (470, 376)], w=3) + p.line([(90, 430), (450, 430)], w=3)
    for x in (100, 440): s += p.ellipse(x, 486, 14, 14, w=3)
    s += p.line([(84, 330), (110, 300), (190, 300), (200, 330)], w=3)
    s += p.line([(190, 330), (230, 300), (300, 296), (360, 306), (420, 304), (466, 330)], w=3.2)
    s += p.hatch([(200, 330), (232, 304), (420, 306), (466, 330)], ang=-60, gap=10)
    # the two of them (him and his brother)
    s += creature('card2', 600, 168, 3.0)
    # speech bubble
    bub = [(830 + 130 * math.cos(math.radians(a)), 96 + 58 * math.sin(math.radians(a))) for a in range(0, 361, 10)]
    s += p.line(bub, w=3.4) + p.line([(760, 140), (716, 196), (800, 150)], w=3.4)
    s += p.text(830, 92, 'No biggie,', 34) + p.text(830, 128, 'I’m fine.', 34)
    s += p.line([(0, 520), (1000, 516)], w=3)
    return s

def scene4():
    p = Pen(44); s = ''
    # tiles
    for y in range(40, 520, 64): s += p.line([(150, y), (920, y + 2)], w=1.4, passes=1, amp=1)
    for x in range(150, 921, 64): s += p.line([(x, 40), (x + 2, 516)], w=1.4, passes=1, amp=1)
    # curtain rod + curtain
    s += p.line([(40, 30), (960, 28)], w=4)
    for k in range(7): s += p.ellipse(60 + k * 22, 30, 7, 7, w=2, passes=1)
    s += p.line([(52, 36), (74, 180), (50, 320), (70, 520)], w=3.2) + p.line([(196, 36), (178, 180), (200, 330), (184, 520)], w=3.2)
    for x in (88, 118, 150): s += p.line([(x, 40), (x + 12, 200), (x - 8, 360), (x + 6, 516)], w=2, passes=1)
    s += p.line([(52, 520), (184, 520)], w=3)
    # shower head + water
    s += p.line([(900, 40), (900, 70), (870, 96), (820, 100)], w=4.4)
    s += p.line([(780, 90), (830, 82), (838, 118), (776, 122)], closed=True, w=3.4)
    pr = Pen(45)
    for i in range(46):
        x = pr.r.uniform(560, 830); y = pr.r.uniform(130, 480); L = pr.r.uniform(18, 40)
        s += pr.line([(x, y), (x - L * .45, y + L)], w=2, passes=1, amp=.4)
    # steam
    for (x, y) in [(300, 120), (360, 80), (690, 60)]:
        s += p.line([(x, y + 40), (x - 12, y + 26), (x + 6, y + 14), (x - 6, y)], w=2.4, passes=1)
    # creature sitting it out, flower cropped away
    s += creature('featured', 250, 56, 1.58, clip=(0, 0, 262, 286))
    # tub edge
    s += p.line([(140, 520), (960, 516)], w=4) + p.line([(150, 540), (950, 538)], w=2.4)
    return s

def scene5():
    p = Pen(55); s = ''
    # brick wall
    for row, y in enumerate(range(20, 430, 36)):
        s += p.line([(0, y), (1000, y + 1)], w=1.6, passes=1, amp=1.2)
        off = 0 if row % 2 else 44
        for x in range(off, 1000, 88): s += p.line([(x, y), (x + 1, y + 36)], w=1.6, passes=1, amp=1)
    s += blackout([(560, 70), (760, 60), (790, 280), (560, 300)])
    # burst
    cx, cy = 668, 178
    for k in range(14):
        a = math.radians(k * 360 / 14 + p.r.uniform(-8, 8)); r0, r1 = 40, p.r.uniform(90, 140)
        s += p.line([(cx + math.cos(a) * r0, cy + math.sin(a) * r0), (cx + math.cos(a) * r1, cy + math.sin(a) * r1)], w=2.6, passes=1)
    shards = [[(560, 110), (590, 94), (586, 126)], [(760, 100), (790, 118), (764, 130)], [(780, 230), (800, 262), (770, 250)],
              [(600, 270), (626, 286), (596, 296)], [(540, 190), (520, 214), (512, 186)], [(700, 60), (724, 50), (716, 76)]]
    for sh in shards: s += p.fill(sh)
    s += p.line([(606, 140), (672, 128), (682, 176), (614, 190)], closed=True, w=3.4)
    s += p.line([(640, 196), (722, 186), (730, 228), (650, 236)], closed=True, w=3.4)
    s += p.text(644, 168, 'HE WAS CHOOSING', 15, rot=-10) + p.text(688, 218, 'TO ABANDON US', 15, rot=-8)
    # throw arc
    for k in range(9):
        t0, t1 = k / 9, (k + .5) / 9
        def arc(t): return (330 + 270 * t, 380 - 260 * math.sin(math.pi * t * .5))
        s += p.line([arc(t0), arc(t1)], w=2.4, passes=1)
    # dumpster
    s += p.line([(830, 300), (990, 300), (980, 500), (840, 500)], closed=True, w=3.6) + p.line([(822, 300), (998, 286)], w=4)
    s += p.hatch([(840, 310), (980, 310), (972, 490), (846, 490)], ang=90, gap=14)
    # stack of plates + sharpie
    for k in range(7): s += p.ellipse(520, 500 - k * 11, 62, 13, a0=0, a1=180, n=16, w=2.6, passes=1)
    s += p.ellipse(520, 434, 62, 13, w=3) + p.ellipse(520, 434, 34, 7, w=2.2, passes=1)
    s += p.line([(458, 434), (458, 500)], w=2.6) + p.line([(582, 434), (582, 500)], w=2.6)
    s += f'<g transform="rotate(-14 650 508)">' + p.rect(606, 500, 90, 16, w=3) + p.rect(696, 500, 22, 16, w=3) + '</g>'
    # the creature, low to the ground
    s += creature('card1', 70, 330, 2.6)
    s += p.line([(0, 520), (1000, 516)], w=3.4) + p.ellipse(220, 540, 70, 8, w=2, passes=1)
    return s

def scene6():
    p = Pen(66); s = ''
    # hanging sign
    s += p.line([(420, 0), (430, 36)], w=2.4) + p.line([(580, 0), (570, 36)], w=2.4)
    s += p.rect(370, 36, 260, 70, w=3.6) + p.text(500, 84, 'DOLLAR STORE', 40)
    # shelves with plate stacks
    for y in (190, 300):
        s += p.line([(20, y), (330, y)], w=3.4) + p.line([(670, y), (980, y)], w=3.4)
        for x in (60, 150, 240, 710, 800, 890):
            for k in range(4): s += p.ellipse(x, y - 8 - k * 9, 36, 7, a0=0, a1=180, n=12, w=2.2, passes=1)
            s += p.ellipse(x, y - 44, 36, 7, w=2.4, passes=1)
        s += p.text(100, y + 30, '$1', 24) + p.text(850, y + 30, '$1', 24)
    # counter
    s += p.line([(150, 380), (850, 376)], w=4) + p.line([(160, 380), (160, 560)], w=3.6) + p.line([(840, 378), (840, 560)], w=3.6)
    s += p.hatch([(160, 384), (840, 380), (840, 560), (160, 560)], ang=-30, gap=12, w=1.3)
    # register
    s += p.line([(610, 376), (620, 300), (780, 296), (790, 374)], w=3.6) + p.rect(640, 240, 120, 50, w=3.4)
    s += p.fill([(650, 250), (750, 248), (750, 280), (650, 282)]) + p.text(700, 276, '$6.00', 30, color='#000')
    s += p.line([(700, 290), (700, 300)], w=3)
    # stack of plates on the counter, sharpie
    for k in range(8): s += p.ellipse(330, 372 - k * 11, 70, 14, a0=0, a1=180, n=16, w=2.6, passes=1)
    s += p.ellipse(330, 295, 70, 14, w=3) + p.ellipse(330, 295, 38, 8, w=2.2, passes=1)
    s += p.line([(260, 295), (260, 372)], w=2.6) + p.line([(400, 295), (400, 372)], w=2.6)
    s += f'<g transform="rotate(-10 480 360)">' + p.rect(440, 354, 80, 14, w=3) + p.rect(520, 354, 20, 14, w=3) + '</g>'
    # the creature peeking over the bottom edge
    s += blackout([(300, 470), (720, 470), (720, 560), (300, 560)])
    s += creature('peek', 296, 398, 2.15)
    return s

SCENES = {'scene1': scene1, 'scene2': scene2, 'scene3': scene3, 'scene4': scene4, 'scene5': scene5, 'scene6': scene6}

def trace(img, S=2.0):
    g = cv2.GaussianBlur(img.astype(np.float32), (0, 0), 0.8)
    bm = potrace.Bitmap(~(g > 128))
    pl = bm.trace(turdsize=8, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=0.95, opticurve=True, opttolerance=0.45)
    def fm(v):
        s = ('%.1f' % v).rstrip('0').rstrip('.'); return '0' if s in ('-0', '') else s
    def f(pt): return fm(pt.x / S) + ' ' + fm(pt.y / S)
    out = []
    for c in pl:
        seg = ['M' + f(c.start_point)]
        for sg in c.segments:
            seg.append(('L' + f(sg.c) + 'L' + f(sg.end_point)) if sg.is_corner else ('C' + f(sg.c1) + ' ' + f(sg.c2) + ' ' + f(sg.end_point)))
        out.append(''.join(seg) + 'Z')
    return ''.join(out)

def main(names):
    out = {}
    try: out = json.load(open(ROOT / 'src/art/scenes.json'))
    except Exception: pass
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page(viewport={'width': W, 'height': H}, device_scale_factor=2)
        for n in names:
            EYES.clear()
            body = SCENES[n]()
            html = (f'<style>@font-face{{font-family:H;src:url({FONT})}}html,body{{margin:0;background:#000}}text{{font-family:H}}</style>'
                    f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#000"/>{body}</svg>')
            pg.set_content(html); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(150)
            png = pg.screenshot(clip={'x': 0, 'y': 0, 'width': W, 'height': H})
            img = cv2.imdecode(np.frombuffer(png, np.uint8), cv2.IMREAD_GRAYSCALE)
            cv2.imwrite(str(ROOT / f'build/{n}.png'), img)
            out[n] = {'name': n, 'w': W, 'h': H, 'mode': 'dark', 'body': '', 'light': trace(img), 'eyes': list(EYES)}
            print(n, len(out[n]['light']) // 1024, 'KB', 'eyes', EYES)
        b.close()
    json.dump(out, open(ROOT / 'src/art/scenes.json', 'w'))

if __name__ == '__main__':
    (ROOT / 'build').mkdir(exist_ok=True)
    main(sys.argv[1:] or list(SCENES))
