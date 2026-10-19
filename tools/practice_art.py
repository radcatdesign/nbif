"""Draw the recipe-style practice art for The Plates (black line on white).

Same pipeline as tools/scenes.py: hand-drawn strokes plus the site's traced art,
rendered in Chromium at 2x and traced with potrace. Drawn white on black, then
traced as ink so it sits on the paper-coloured practice section.
Output: src/art/practice.json

Run:  python3 tools/practice_art.py
"""
import json, math, sys
from pathlib import Path
import numpy as np, cv2
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).resolve().parent))
import scenes as S
from scenes import Pen, blackout, A, FONT, trace

ROOT = Path(__file__).resolve().parent.parent

def icon(name, x, y, s):
    """Place a light-mode traced icon (ink paths) as white strokes."""
    a = A[name]
    return f'<g transform="translate({x} {y}) scale({s})"><path d="{a["ink"]}" fill="#fff" fill-rule="evenodd"/></g>'

def solid(name, x, y, s):
    """Place a dark-mode creature as a solid silhouette (body becomes ink)."""
    a = A[name]; inner = ''
    if a.get('body'): inner += f'<path d="{a["body"]}" fill="#fff" fill-rule="evenodd"/>'
    inner += f'<path d="{a["light"]}" fill="#fff" fill-rule="evenodd"/>'
    for ex, ey, er in a.get('eyes', []):
        inner += f'<circle cx="{ex}" cy="{ey}" r="{er * 1.12:.2f}" fill="#000"/>'
        S.EYES.append((round(x + ex * s, 1), round(y + ey * s, 1), round(er * s, 1)))
    return f'<g transform="translate({x} {y}) scale({s})">{inner}</g>'

def plate_stack(p, cx, base, n, rx=70, ry=14, top=True):
    s = ''
    for k in range(n): s += p.ellipse(cx, base - k * 11, rx, ry, a0=0, a1=180, n=16, w=2.6, passes=1)
    if top and n:
        ty = base - (n - 1) * 11 - 2
        s += p.ellipse(cx, ty, rx, ry, w=3) + p.ellipse(cx, ty, rx * .55, ry * .55, w=2.2, passes=1)
        s += p.line([(cx - rx, ty), (cx - rx, base)], w=2.6) + p.line([(cx + rx, ty), (cx + rx, base)], w=2.6)
    return s

def ugly_flower(p, cx, cy, r=10):
    s = ''
    for k in range(5):
        a = math.radians(k * 72)
        s += p.ellipse(cx + math.cos(a) * r, cy + math.sin(a) * r * .5, r * .55, r * .3, w=1.8, passes=1, n=12)
    return s + p.ellipse(cx, cy, r * .3, r * .2, w=1.8, passes=1, n=10)

# ---------- what you'll need (320 x 240) ----------
def need_plates():
    p = Pen(101); s = plate_stack(p, 140, 196, 7, rx=86, ry=17)
    for (x, y) in [(110, 126), (150, 120), (178, 130)]: s += ugly_flower(p, x, y, 9)
    s += p.line([(244, 110), (290, 110), (282, 200), (252, 200)], closed=True, w=3) + p.ellipse(267, 110, 23, 6, w=2.4, passes=1)
    s += p.hatch([(250, 150), (286, 150), (282, 196), (254, 196)], ang=-50, gap=8)
    s += p.ellipse(64, 70, 26, 26, w=2.8) + p.text(64, 80, '$1', 28)
    return s

def need_sharpie():
    p = Pen(102)
    s = '<g transform="rotate(-28 160 130)">' + p.rect(70, 112, 150, 34, w=3.4) + p.rect(220, 112, 52, 34, w=3.4)
    s += p.line([(70, 118), (48, 124), (40, 129), (48, 134), (70, 140)], w=3) + p.text(146, 136, 'SHARPIE', 24)
    s += p.line([(232, 112), (232, 146)], w=2.4) + '</g>'
    s += p.line([(40, 214), (70, 196), (100, 220), (130, 198), (160, 216)], w=3)
    return s

def need_glasses():
    p = Pen(103)
    s = p.line([(52, 104), (150, 92), (164, 108), (176, 92), (272, 104), (268, 160), (206, 176), (176, 150), (164, 150), (134, 176), (60, 160)], closed=True, w=3.6)
    s += p.line([(52, 104), (24, 92), (12, 120)], w=3) + p.line([(272, 104), (300, 92), (310, 120)], w=3)
    s += p.line([(84, 112), (110, 108)], w=2.2, passes=1) + p.line([(78, 128), (122, 120)], w=2.2, passes=1)
    s += p.line([(206, 112), (236, 110)], w=2.2, passes=1) + p.line([(200, 128), (246, 122)], w=2.2, passes=1)
    return s

def need_shoes():
    p = Pen(104)
    s = icon('i_boots', 18, 40, 2.05)
    return s + p.line([(10, 214), (310, 212)], w=2.6)

def need_zone():
    p = Pen(105)
    s = p.line([(96, 76), (224, 76), (212, 214), (108, 214)], closed=True, w=3.6)
    for x in (124, 146, 168, 190): s += p.line([(x, 84), (x + (x - 160) * .04, 206)], w=2, passes=1)
    s += p.line([(84, 70), (236, 58)], w=4) + p.line([(150, 62), (152, 48), (176, 46), (178, 60)], w=3)
    s += p.line([(108, 214), (100, 222)], w=2.4) + p.line([(212, 214), (220, 222)], w=2.4)
    s += p.line([(20, 222), (300, 220)], w=2.6)
    return s

def need_broom():
    p = Pen(106)
    s = p.line([(250, 20), (150, 150)], w=4)
    s += p.line([(126, 140), (170, 168), (138, 222), (82, 192)], closed=True, w=3.4)
    s += p.hatch([(126, 146), (166, 170), (138, 218), (88, 190)], ang=60, gap=7)
    s += p.line([(196, 196), (290, 196), (300, 222), (186, 222)], closed=True, w=3) + p.line([(290, 196), (312, 178)], w=3)
    s += p.fill([(220, 206), (228, 200), (232, 208)]) + p.fill([(248, 210), (258, 204), (256, 214)])
    return s

# ---------- the steps (480 x 300) ----------
def step1():
    p = Pen(201)
    s = p.line([(120, 110), (300, 110), (318, 286), (102, 286)], closed=True, w=3.6)
    s += p.line([(120, 110), (132, 96), (288, 96), (300, 110)], w=2.6)
    s += p.ellipse(176, 102, 54, 46, a0=180, a1=360, n=18, w=3) + p.ellipse(244, 98, 50, 52, a0=180, a1=360, n=18, w=3)
    s += ugly_flower(p, 176, 76, 10) + ugly_flower(p, 246, 66, 10)
    s += p.text(210, 210, 'DOLLAR', 34) + p.text(210, 246, 'STORE', 34)
    s += '<g transform="rotate(8 390 200)">' + p.line([(352, 120), (420, 120), (424, 270), (356, 266)], closed=True, w=3)
    for y in (146, 170, 194): s += p.line([(364, y), (410, y)], w=1.8, passes=1)
    s += p.text(390, 246, '$6.00', 26) + '</g>'
    return s

def step2():
    p = Pen(202)
    s = p.ellipse(220, 152, 136, 126, w=3.6) + p.ellipse(220, 152, 100, 92, w=2.2, passes=1)
    s += p.text(220, 122, 'HE WAS', 34) + p.text(220, 162, 'CHOOSING TO', 34) + p.text(220, 202, 'ABANDON US', 34)
    s += '<g transform="rotate(-38 392 214)">' + p.rect(344, 202, 104, 26, w=3.2) + p.rect(448, 202, 30, 26, w=3.2)
    s += p.line([(344, 206), (326, 212), (320, 215), (326, 218), (344, 224)], w=2.6) + '</g>'
    return s

def step3():
    p = Pen(203)
    s = p.line([(60, 20), (420, 20)], w=3) + p.line([(70, 20), (60, 230), (420, 236), (410, 20)], w=3.2)
    for x in (130, 200, 270, 340): s += p.line([(x, 24), (x + 8, 120), (x - 4, 232)], w=1.8, passes=1)
    s += blackout([(150, 104), (322, 98), (300, 274), (160, 278)])
    s += p.line([(150, 120), (310, 112), (300, 274), (160, 278)], closed=True, w=3.6)
    for x in (182, 210, 238, 266): s += p.line([(x, 126), (x + 1, 268)], w=1.8, passes=1)
    s += p.line([(140, 116), (322, 104)], w=4)
    s += icon('i_boots', 324, 206, 0.95)
    s += '<g transform="translate(12 222) scale(.42)">' + need_glasses() + '</g>'
    s += p.line([(0, 286), (480, 282)], w=2.6)
    return s

def step4():
    p = Pen(204)
    s = solid('card1', 20, 168, 1.55)
    bub = [(150 + 116 * math.cos(math.radians(a)), 70 + 48 * math.sin(math.radians(a))) for a in range(0, 361, 10)]
    s += p.line(bub, w=3.2) + p.line([(102, 108), (92, 150), (138, 114)], w=3.2)
    s += p.text(150, 64, 'HE WAS CHOOSING', 21) + p.text(150, 90, 'TO ABANDON US', 21)
    s += p.ellipse(392, 120, 44, 40, w=3.4) + p.ellipse(392, 120, 28, 25, w=2, passes=1)
    for k in range(6):
        t0, t1 = k / 6, (k + .55) / 6
        def arc(t): return (210 + 150 * t, 210 - 90 * math.sin(math.pi * t * .5))
        s += p.line([arc(t0), arc(t1)], w=2.2, passes=1)
    s += p.line([(326, 96), (300, 92)], w=2.2, passes=1) + p.line([(322, 130), (292, 132)], w=2.2, passes=1)
    s += p.text(430, 214, 'once.', 38, rot=-8)
    s += p.line([(0, 290), (480, 286)], w=2.6)
    return s

def step5():
    p = Pen(205); s = ''
    for i, n in enumerate([6, 4, 2]):
        cx = 70 + i * 120; s += plate_stack(p, cx, 250, n, rx=46, ry=10)
        if i < 2: s += p.line([(cx + 56, 200), (cx + 70, 200)], w=2.6) + p.line([(cx + 64, 194), (cx + 70, 200), (cx + 64, 206)], w=2.6)
    s += p.ellipse(410, 250, 46, 10, w=2.2, passes=1, a0=0, a1=360)
    s += p.text(410, 196, 'quiet.', 34, rot=-6)
    s += p.line([(0, 268), (480, 264)], w=2.6)
    return s

def step6():
    p = Pen(206)
    s = p.line([(270, 16), (190, 180)], w=4)
    s += p.line([(160, 168), (214, 192), (186, 252), (122, 226)], closed=True, w=3.4) + p.hatch([(160, 174), (210, 194), (186, 248), (128, 224)], ang=65, gap=7)
    s += p.line([(40, 228), (120, 236), (126, 262), (34, 262)], closed=True, w=3) + p.line([(40, 228), (14, 206)], w=3)
    for (x, y) in [(150, 262), (170, 268), (196, 262), (220, 270), (64, 248), (88, 250)]:
        s += p.fill([(x, y), (x + 9, y - 6), (x + 12, y + 2)])
    s += p.line([(330, 270), (320, 180), (346, 150), (404, 150), (430, 180), (420, 272)], closed=True, w=3.4)
    s += p.line([(352, 150), (366, 128), (378, 140), (392, 122), (398, 150)], w=3)
    s += p.line([(0, 278), (480, 274)], w=2.6)
    return s

ITEMS = {
    'need_plates': (need_plates, 320, 240), 'need_sharpie': (need_sharpie, 320, 240), 'need_glasses': (need_glasses, 320, 240),
    'need_shoes': (need_shoes, 320, 240), 'need_zone': (need_zone, 320, 240), 'need_broom': (need_broom, 320, 240),
    'step1': (step1, 480, 300), 'step2': (step2, 480, 300), 'step3': (step3, 480, 300),
    'step4': (step4, 480, 300), 'step5': (step5, 480, 300), 'step6': (step6, 480, 300),
}

def main(names):
    out = {}
    try: out = json.load(open(ROOT / 'src/art/practice.json'))
    except Exception: pass
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        for n in names:
            fn, w, h = ITEMS[n]
            S.EYES.clear()
            body = fn()
            pg = b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=2)
            html = (f'<style>@font-face{{font-family:H;src:url({FONT})}}html,body{{margin:0;background:#000}}text{{font-family:H}}</style>'
                    f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><rect width="{w}" height="{h}" fill="#000"/>{body}</svg>')
            pg.set_content(html); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(120)
            png = pg.screenshot(clip={'x': 0, 'y': 0, 'width': w, 'height': h}); pg.close()
            img = cv2.imdecode(np.frombuffer(png, np.uint8), cv2.IMREAD_GRAYSCALE)
            cv2.imwrite(str(ROOT / f'build/{n}.png'), 255 - img)
            out[n] = {'name': n, 'w': w, 'h': h, 'mode': 'light', 'ink': trace(img), 'eyes': list(S.EYES)}
            print(n, len(out[n]['ink']) // 1024, 'KB', S.EYES)
        b.close()
    json.dump(out, open(ROOT / 'src/art/practice.json', 'w'))

if __name__ == '__main__':
    (ROOT / 'build').mkdir(exist_ok=True)
    main(sys.argv[1:] or list(ITEMS))
