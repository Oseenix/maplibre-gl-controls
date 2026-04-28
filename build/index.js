import './index.css';
var Mn = Object.defineProperty;
var Sn = (n, t, e) => t in n ? Mn(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var y = (n, t, e) => Sn(n, typeof t != "symbol" ? t + "" : t, e);
const Tn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>', Ln = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>', Nn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>', $n = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-backward</title><path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" /></svg>', An = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-forward</title><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" /></svg>', mt = "rgb(204, 204, 204)", ot = (n) => {
  const t = document.createElement("img");
  return t.src = `data:image/svg+xml,${encodeURIComponent(n)}`, t.style.width = "24px", t.style.height = "24px", t;
};
let vt;
const Dn = ({
  length: n,
  interval: t,
  onSliderValueChange: e
}) => {
  const r = document.createElement("div");
  r.classList.add("maplibregl-ctrl"), r.classList.add("maplibregl-ctrl-group"), r.style.width = "calc(min((500% - 29px), 260px))", r.style.height = "84px", r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.textAlign = "center";
  const i = document.createElement("div");
  i.innerHTML = "<br />", i.style.marginTop = "4px", r.appendChild(i);
  const o = document.createElement("input");
  o.type = "range", o.value = "0", o.min = "0", o.max = String(n - 1), o.addEventListener("input", () => {
    e();
  }), o.style.width = "80%", o.style.margin = "4px 0", r.appendChild(o);
  const s = document.createElement("div");
  s.style.display = "flex", s.style.justifyContent = "center", s.style.margin = "4px 0 0 0";
  const a = (R) => {
    u.style.backgroundColor = R ? mt : "";
  }, l = () => u.style.backgroundColor === mt, u = document.createElement("button");
  u.appendChild(ot(Nn)), u.style.border = "0", u.style.borderRadius = "0", u.style.marginRight = "16px", u.style.height = "24px", u.style.borderRadius = "4px", u.onclick = () => a(!l()), s.appendChild(u);
  const c = () => (o.value = String(Math.max(0, Number(o.value) - 1)), e(), Number(o.min) < Number(o.value)), h = () => {
    if (u.style.backgroundColor !== "" && Number(o.value) == Number(o.max))
      for (; c(); )
        ;
    else
      o.value = String(
        Math.min(Number(o.max), Number(o.value) + 1)
      );
    return e(), Number(o.value) < Number(o.max);
  }, p = document.createElement("button");
  p.appendChild(ot($n)), p.onclick = c, p.style.border = "0", p.style.height = "24px", p.style.borderRadius = "4px";
  const d = () => {
    vt !== void 0 && (clearInterval(vt), vt = void 0, g.onclick = null, M.style.backgroundColor = "");
  }, g = document.createElement("button");
  g.appendChild(ot(Tn)), g.style.border = "0", g.style.height = "24px", g.style.borderRadius = "4px", g.onclick = d;
  const C = () => M.style.backgroundColor === mt, x = () => {
    C() || (M.style.backgroundColor = mt, vt = setInterval(() => {
      h();
    }, t));
  }, M = document.createElement("button");
  M.appendChild(ot(Ln)), M.style.border = "0", M.style.height = "24px", M.style.borderRadius = "4px", M.onclick = x;
  const S = document.createElement("button");
  return S.appendChild(ot(An)), S.style.border = "0", S.style.height = "24px", S.style.borderRadius = "4px", S.onclick = h, s.appendChild(p), s.appendChild(g), s.appendChild(M), s.appendChild(S), r.appendChild(s), {
    container: r,
    titleDiv: i,
    slider: o,
    increment: h,
    decrement: c,
    isPlaying: C,
    play: x,
    pause: d,
    isLoopEnabled: l,
    setLoopEnabled: a
  };
};
class hi {
  constructor(t, e = {}) {
    y(this, "map");
    y(this, "options");
    y(this, "container");
    y(this, "containerTitle");
    y(this, "temporalSlider");
    y(this, "temporalFrames");
    y(this, "next");
    y(this, "prev");
    y(this, "play");
    y(this, "pause");
    y(this, "isPlaying");
    y(this, "isLoopEnabled");
    y(this, "setLoopEnabled");
    y(this, "goto");
    this.temporalFrames = t, this.options = e;
    const r = {
      length: this.temporalFrames.length,
      interval: this.options.interval || 500,
      onSliderValueChange: () => this.refresh()
    }, {
      container: i,
      titleDiv: o,
      slider: s,
      increment: a,
      decrement: l,
      play: u,
      pause: c,
      isPlaying: h,
      isLoopEnabled: p,
      setLoopEnabled: d
    } = Dn(r);
    this.container = i, this.containerTitle = o, this.temporalSlider = s, this.next = a, this.prev = l, this.play = u, this.pause = c, this.isPlaying = h, this.isLoopEnabled = p, this.setLoopEnabled = d, this.goto = (g) => {
      s.value = String(
        Math.min(this.temporalFrames.length - 1, Math.max(0, g))
      ), this.refresh();
    };
  }
  onAdd(t) {
    return this.map = t, t.getContainer().appendChild(this.container), this.map.once("styledata", () => {
      this.refresh();
    }), this.container;
  }
  onRemove() {
    var t;
    (t = this.container.parentNode) == null || t.removeChild(this.container), this.map = void 0;
  }
  getPosition() {
    return "bottom-left";
  }
  refresh() {
    const t = Number(this.temporalSlider.value);
    this.containerTitle.innerHTML = this.temporalFrames[t].title;
    const e = this.temporalFrames[t].layers.map(
      (r) => r.id
    );
    this.temporalFrames.forEach((r) => {
      r.layers.forEach(
        (i) => this.setVisible(i, e.includes(i.id))
      );
    });
  }
  setVisible(t, e = !0) {
    var r, i, o, s;
    if (t.type === "raster" || t.type === "fill" || t.type === "circle" || t.type === "line") {
      t.type === "raster" && ((r = this.map) == null || r.setPaintProperty(
        t.id,
        `${t.type}-opacity-transition`,
        {
          // set disable fade-in transition
          duration: 0
        }
      ));
      let a;
      e ? a = ((i = t.paint) == null ? void 0 : i[`${t.type}-opacity`]) || 1 : a = this.options.performance ? 1e-21 : 0, (o = this.map) == null || o.setPaintProperty(t.id, `${t.type}-opacity`, a);
    } else
      (s = this.map) == null || s.setLayoutProperty(
        t.id,
        "visibility",
        e ? "visible" : "none"
      );
  }
}
function Xe(n, ...t) {
  for (const e of t)
    for (const r in e)
      n[r] = e[r];
  return n;
}
class z extends Error {
  constructor(t, e) {
    super(e), this.message = e, this.key = t;
  }
}
class ae {
  constructor(t, e = []) {
    this.parent = t, this.bindings = {};
    for (const [r, i] of e)
      this.bindings[r] = i;
  }
  concat(t) {
    return new ae(this, t);
  }
  get(t) {
    if (this.bindings[t])
      return this.bindings[t];
    if (this.parent)
      return this.parent.get(t);
    throw new Error(`${t} not found in scope.`);
  }
  has(t) {
    return this.bindings[t] ? !0 : this.parent ? this.parent.has(t) : !1;
  }
}
const Tt = { kind: "null" }, f = { kind: "number" }, b = { kind: "string" }, m = { kind: "boolean" }, _ = { kind: "color" }, Lt = { kind: "projectionDefinition" }, Q = { kind: "object" }, v = { kind: "value" }, Bn = { kind: "error" }, Nt = { kind: "collator" }, $t = { kind: "formatted" }, At = { kind: "padding" }, pt = { kind: "resolvedImage" }, Dt = { kind: "variableAnchorOffsetCollection" };
function L(n, t) {
  return {
    kind: "array",
    itemType: n,
    N: t
  };
}
function w(n) {
  if (n.kind === "array") {
    const t = w(n.itemType);
    return typeof n.N == "number" ? `array<${t}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${t}>`;
  } else
    return n.kind;
}
const zn = [
  Tt,
  f,
  b,
  m,
  _,
  Lt,
  $t,
  Q,
  L(v),
  At,
  pt,
  Dt
];
function lt(n, t) {
  if (t.kind === "error")
    return null;
  if (n.kind === "array") {
    if (t.kind === "array" && (t.N === 0 && t.itemType.kind === "value" || !lt(n.itemType, t.itemType)) && (typeof n.N != "number" || n.N === t.N))
      return null;
  } else {
    if (n.kind === t.kind)
      return null;
    if (n.kind === "value") {
      for (const e of zn)
        if (!lt(e, t))
          return null;
    }
  }
  return `Expected ${w(n)} but found ${w(t)} instead.`;
}
function le(n, t) {
  return t.some((e) => e.kind === n.kind);
}
function G(n, t) {
  return t.some((e) => e === "null" ? n === null : e === "array" ? Array.isArray(n) : e === "object" ? n && !Array.isArray(n) && typeof n == "object" : e === typeof n);
}
function J(n, t) {
  return n.kind === "array" && t.kind === "array" ? n.itemType.kind === t.itemType.kind && typeof n.N == "number" : n.kind === t.kind;
}
const Ze = 0.96422, Je = 1, Ke = 0.82521, Ye = 4 / 29, tt = 6 / 29, Qe = 3 * tt * tt, _n = tt * tt * tt, Fn = Math.PI / 180, jn = 180 / Math.PI;
function tn(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function en([n, t, e, r]) {
  n = qt(n), t = qt(t), e = qt(e);
  let i, o;
  const s = Vt((0.2225045 * n + 0.7168786 * t + 0.0606169 * e) / Je);
  n === t && t === e ? i = o = s : (i = Vt((0.4360747 * n + 0.3850649 * t + 0.1430804 * e) / Ze), o = Vt((0.0139322 * n + 0.0971045 * t + 0.7141733 * e) / Ke));
  const a = 116 * s - 16;
  return [a < 0 ? 0 : a, 500 * (i - s), 200 * (s - o), r];
}
function qt(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function Vt(n) {
  return n > _n ? Math.pow(n, 1 / 3) : n / Qe + Ye;
}
function nn([n, t, e, r]) {
  let i = (n + 16) / 116, o = isNaN(t) ? i : i + t / 500, s = isNaN(e) ? i : i - e / 200;
  return i = Je * Gt(i), o = Ze * Gt(o), s = Ke * Gt(s), [
    Wt(3.1338561 * o - 1.6168667 * i - 0.4906146 * s),
    // D50 -> sRGB
    Wt(-0.9787684 * o + 1.9161415 * i + 0.033454 * s),
    Wt(0.0719453 * o - 0.2289914 * i + 1.4052427 * s),
    r
  ];
}
function Wt(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function Gt(n) {
  return n > tt ? n * n * n : Qe * (n - Ye);
}
function Rn(n) {
  const [t, e, r, i] = en(n), o = Math.sqrt(e * e + r * r);
  return [Math.round(o * 1e4) ? tn(Math.atan2(r, e) * jn) : NaN, o, t, i];
}
function Hn([n, t, e, r]) {
  return n = isNaN(n) ? 0 : n * Fn, nn([e, Math.cos(n) * t, Math.sin(n) * t, r]);
}
function On([n, t, e, r]) {
  n = tn(n), t /= 100, e /= 100;
  function i(o) {
    const s = (o + n / 30) % 12, a = t * Math.min(e, 1 - e);
    return e - a * Math.max(-1, Math.min(s - 3, 9 - s, 1));
  }
  return [i(0), i(8), i(4), r];
}
function Un(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const t = qn[n];
  if (t) {
    const [i, o, s] = t;
    return [i / 255, o / 255, s / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const o = n.length < 6 ? 1 : 2;
    let s = 1;
    return [
      bt(n.slice(s, s += o)),
      bt(n.slice(s, s += o)),
      bt(n.slice(s, s += o)),
      bt(n.slice(s, s + o) || "ff")
    ];
  }
  if (n.startsWith("rgb")) {
    const i = /^rgba?\(\s*([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, o = n.match(i);
    if (o) {
      const [
        s,
        // eslint-disable-line @typescript-eslint/no-unused-vars
        a,
        // <numeric>
        l,
        // %         (optional)
        u,
        // ,         (optional)
        c,
        // <numeric>
        h,
        // %         (optional)
        p,
        // ,         (optional)
        d,
        // <numeric>
        g,
        // %         (optional)
        C,
        // ,|/       (optional)
        x,
        // <numeric> (optional)
        M
        // %         (optional)
      ] = o, S = [u || " ", p || " ", C].join("");
      if (S === "  " || S === "  /" || S === ",," || S === ",,,") {
        const R = [l, h, g].join(""), yt = R === "%%%" ? 100 : R === "" ? 255 : 0;
        if (yt) {
          const Te = [
            K(+a / yt, 0, 1),
            K(+c / yt, 0, 1),
            K(+d / yt, 0, 1),
            x ? Le(+x, M) : 1
          ];
          if (Ne(Te))
            return Te;
        }
      }
      return;
    }
  }
  const e = /^hsla?\(\s*([\de.+-]+)(?:deg)?(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, r = n.match(e);
  if (r) {
    const [
      i,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      o,
      // <numeric>
      s,
      // ,         (optional)
      a,
      // <numeric>
      l,
      // ,         (optional)
      u,
      // <numeric>
      c,
      // ,|/       (optional)
      h,
      // <numeric> (optional)
      p
      // %         (optional)
    ] = r, d = [s || " ", l || " ", c].join("");
    if (d === "  " || d === "  /" || d === ",," || d === ",,,") {
      const g = [
        +o,
        K(+a, 0, 100),
        K(+u, 0, 100),
        h ? Le(+h, p) : 1
      ];
      if (Ne(g))
        return On(g);
    }
  }
}
function bt(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function Le(n, t) {
  return K(t ? n / 100 : n, 0, 1);
}
function K(n, t, e) {
  return Math.min(Math.max(t, n), e);
}
function Ne(n) {
  return !n.some(Number.isNaN);
}
const qn = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
function q(n, t, e) {
  return n + e * (t - n);
}
function ut(n, t, e) {
  return n.map((r, i) => q(r, t[i], e));
}
function Vn(n) {
  return n === "rgb" || n === "hcl" || n === "lab";
}
class k {
  /**
   * @param r Red component premultiplied by `alpha` 0..1
   * @param g Green component premultiplied by `alpha` 0..1
   * @param b Blue component premultiplied by `alpha` 0..1
   * @param [alpha=1] Alpha component 0..1
   * @param [premultiplied=true] Whether the `r`, `g` and `b` values have already
   * been multiplied by alpha. If `true` nothing happens if `false` then they will
   * be multiplied automatically.
   */
  constructor(t, e, r, i = 1, o = !0) {
    this.r = t, this.g = e, this.b = r, this.a = i, o || (this.r *= i, this.g *= i, this.b *= i, i || this.overwriteGetter("rgb", [t, e, r, i]));
  }
  /**
   * Parses CSS color strings and converts colors to sRGB color space if needed.
   * Officially supported color formats:
   * - keyword, e.g. 'aquamarine' or 'steelblue'
   * - hex (with 3, 4, 6 or 8 digits), e.g. '#f0f' or '#e9bebea9'
   * - rgb and rgba, e.g. 'rgb(0,240,120)' or 'rgba(0%,94%,47%,0.1)' or 'rgb(0 240 120 / .3)'
   * - hsl and hsla, e.g. 'hsl(0,0%,83%)' or 'hsla(0,0%,83%,.5)' or 'hsl(0 0% 83% / 20%)'
   *
   * @param input CSS color string to parse.
   * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
   */
  static parse(t) {
    if (t instanceof k)
      return t;
    if (typeof t != "string")
      return;
    const e = Un(t);
    if (e)
      return new k(...e, !1);
  }
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb() {
    const { r: t, g: e, b: r, a: i } = this, o = i || 1 / 0;
    return this.overwriteGetter("rgb", [t / o, e / o, r / o, i]);
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl() {
    return this.overwriteGetter("hcl", Rn(this.rgb));
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab() {
    return this.overwriteGetter("lab", en(this.rgb));
  }
  /**
   * Lazy getter pattern. When getter is called for the first time lazy value
   * is calculated and then overwrites getter function in given object instance.
   *
   * @example:
   * const redColor = Color.parse('red');
   * let x = redColor.hcl; // this will invoke `get hcl()`, which will calculate
   * // the value of red in HCL space and invoke this `overwriteGetter` function
   * // which in turn will set a field with a key 'hcl' in the `redColor` object.
   * // In other words it will override `get hcl()` from its `Color` prototype
   * // with its own property: hcl = [calculated red value in hcl].
   * let y = redColor.hcl; // next call will no longer invoke getter but simply
   * // return the previously calculated value
   * x === y; // true - `x` is exactly the same object as `y`
   *
   * @param getterKey Getter key
   * @param lazyValue Lazily calculated value to be memoized by current instance
   * @private
   */
  overwriteGetter(t, e) {
    return Object.defineProperty(this, t, { value: e }), e;
  }
  /**
   * Used by 'to-string' expression.
   *
   * @returns Serialized color in format `rgba(r,g,b,a)`
   * where r,g,b are numbers within 0..255 and alpha is number within 1..0
   *
   * @example
   * var purple = new Color.parse('purple');
   * purple.toString; // = "rgba(128,0,128,1)"
   * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
   * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
   */
  toString() {
    const [t, e, r, i] = this.rgb;
    return `rgba(${[t, e, r].map((o) => Math.round(o * 255)).join(",")},${i})`;
  }
  static interpolate(t, e, r, i = "rgb") {
    switch (i) {
      case "rgb": {
        const [o, s, a, l] = ut(t.rgb, e.rgb, r);
        return new k(o, s, a, l, !1);
      }
      case "hcl": {
        const [o, s, a, l] = t.hcl, [u, c, h, p] = e.hcl;
        let d, g;
        if (!isNaN(o) && !isNaN(u)) {
          let R = u - o;
          u > o && R > 180 ? R -= 360 : u < o && o - u > 180 && (R += 360), d = o + r * R;
        } else isNaN(o) ? isNaN(u) ? d = NaN : (d = u, (a === 1 || a === 0) && (g = c)) : (d = o, (h === 1 || h === 0) && (g = s));
        const [C, x, M, S] = Hn([
          d,
          g ?? q(s, c, r),
          q(a, h, r),
          q(l, p, r)
        ]);
        return new k(C, x, M, S, !1);
      }
      case "lab": {
        const [o, s, a, l] = nn(ut(t.lab, e.lab, r));
        return new k(o, s, a, l, !1);
      }
    }
  }
}
k.black = new k(0, 0, 0, 1);
k.white = new k(1, 1, 1, 1);
k.transparent = new k(0, 0, 0, 0);
k.red = new k(1, 0, 0, 1);
class ue {
  constructor(t, e, r) {
    t ? this.sensitivity = e ? "variant" : "case" : this.sensitivity = e ? "accent" : "base", this.locale = r, this.collator = new Intl.Collator(this.locale ? this.locale : [], { sensitivity: this.sensitivity, usage: "search" });
  }
  compare(t, e) {
    return this.collator.compare(t, e);
  }
  resolvedLocale() {
    return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
  }
}
class Yt {
  constructor(t, e, r, i, o) {
    this.text = t, this.image = e, this.scale = r, this.fontStack = i, this.textColor = o;
  }
}
class F {
  constructor(t) {
    this.sections = t;
  }
  static fromString(t) {
    return new F([new Yt(t, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((t) => t.text.length !== 0 || t.image && t.image.name.length !== 0);
  }
  static factory(t) {
    return t instanceof F ? t : F.fromString(t);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((t) => t.text).join("");
  }
}
class T {
  constructor(t) {
    this.values = t.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(t) {
    if (t instanceof T)
      return t;
    if (typeof t == "number")
      return new T([t, t, t, t]);
    if (Array.isArray(t) && !(t.length < 1 || t.length > 4)) {
      for (const e of t)
        if (typeof e != "number")
          return;
      switch (t.length) {
        case 1:
          t = [t[0], t[0], t[0], t[0]];
          break;
        case 2:
          t = [t[0], t[1], t[0], t[1]];
          break;
        case 3:
          t = [t[0], t[1], t[2], t[1]];
          break;
      }
      return new T(t);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, r) {
    return new T(ut(t.values, e.values, r));
  }
}
class I {
  constructor(t) {
    this.name = "ExpressionEvaluationError", this.message = t;
  }
  toJSON() {
    return this.message;
  }
}
const Wn = /* @__PURE__ */ new Set(["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]);
class $ {
  constructor(t) {
    this.values = t.slice();
  }
  static parse(t) {
    if (t instanceof $)
      return t;
    if (!(!Array.isArray(t) || t.length < 1 || t.length % 2 !== 0)) {
      for (let e = 0; e < t.length; e += 2) {
        const r = t[e], i = t[e + 1];
        if (typeof r != "string" || !Wn.has(r) || !Array.isArray(i) || i.length !== 2 || typeof i[0] != "number" || typeof i[1] != "number")
          return;
      }
      return new $(t);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, r) {
    const i = t.values, o = e.values;
    if (i.length !== o.length)
      throw new I(`Cannot interpolate values of different length. from: ${t.toString()}, to: ${e.toString()}`);
    const s = [];
    for (let a = 0; a < i.length; a += 2) {
      if (i[a] !== o[a])
        throw new I(`Cannot interpolate values containing mismatched anchors. from[${a}]: ${i[a]}, to[${a}]: ${o[a]}`);
      s.push(i[a]);
      const [l, u] = i[a + 1], [c, h] = o[a + 1];
      s.push([q(l, c, r), q(u, h, r)]);
    }
    return new $(s);
  }
}
class O {
  constructor(t) {
    this.name = t.name, this.available = t.available;
  }
  toString() {
    return this.name;
  }
  static fromString(t) {
    return t ? new O({ name: t, available: !1 }) : null;
  }
}
class N {
  constructor(t, e, r) {
    this.from = t, this.to = e, this.transition = r;
  }
  static interpolate(t, e, r) {
    return new N(t, e, r);
  }
  static parse(t) {
    if (t instanceof N)
      return t;
    if (Array.isArray(t) && t.length === 3 && typeof t[0] == "string" && typeof t[1] == "string" && typeof t[2] == "number")
      return new N(t[0], t[1], t[2]);
    if (typeof t == "object" && typeof t.from == "string" && typeof t.to == "string" && typeof t.transition == "number")
      return new N(t.from, t.to, t.transition);
    if (typeof t == "string")
      return new N(t, t, 1);
  }
}
function rn(n, t, e, r) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof t == "number" && t >= 0 && t <= 255 && typeof e == "number" && e >= 0 && e <= 255 ? typeof r > "u" || typeof r == "number" && r >= 0 && r <= 1 ? null : `Invalid rgba value [${[n, t, e, r].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof r == "number" ? [n, t, e, r] : [n, t, e]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function ct(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof N || n instanceof k || n instanceof ue || n instanceof F || n instanceof T || n instanceof $ || n instanceof O)
    return !0;
  if (Array.isArray(n)) {
    for (const t of n)
      if (!ct(t))
        return !1;
    return !0;
  } else if (typeof n == "object") {
    for (const t in n)
      if (!ct(n[t]))
        return !1;
    return !0;
  } else
    return !1;
}
function E(n) {
  if (n === null)
    return Tt;
  if (typeof n == "string")
    return b;
  if (typeof n == "boolean")
    return m;
  if (typeof n == "number")
    return f;
  if (n instanceof k)
    return _;
  if (n instanceof N)
    return Lt;
  if (n instanceof ue)
    return Nt;
  if (n instanceof F)
    return $t;
  if (n instanceof T)
    return At;
  if (n instanceof $)
    return Dt;
  if (n instanceof O)
    return pt;
  if (Array.isArray(n)) {
    const t = n.length;
    let e;
    for (const r of n) {
      const i = E(r);
      if (!e)
        e = i;
      else {
        if (e === i)
          continue;
        e = v;
        break;
      }
    }
    return L(e || v, t);
  } else
    return Q;
}
function st(n) {
  const t = typeof n;
  return n === null ? "" : t === "string" || t === "number" || t === "boolean" ? String(n) : n instanceof k || n instanceof N || n instanceof F || n instanceof T || n instanceof $ || n instanceof O ? n.toString() : JSON.stringify(n);
}
class nt {
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'literal' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (!ct(t[1]))
      return e.error("invalid value");
    const r = t[1];
    let i = E(r);
    const o = e.expectedType;
    return i.kind === "array" && i.N === 0 && o && o.kind === "array" && (typeof o.N != "number" || o.N === 0) && (i = o), new nt(i, r);
  }
  evaluate() {
    return this.value;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const Ct = {
  string: b,
  number: f,
  boolean: m,
  object: Q
};
class D {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    let r = 1, i;
    const o = t[0];
    if (o === "array") {
      let a;
      if (t.length > 2) {
        const u = t[1];
        if (typeof u != "string" || !(u in Ct) || u === "object")
          return e.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = Ct[u], r++;
      } else
        a = v;
      let l;
      if (t.length > 3) {
        if (t[2] !== null && (typeof t[2] != "number" || t[2] < 0 || t[2] !== Math.floor(t[2])))
          return e.error('The length argument to "array" must be a positive integer literal', 2);
        l = t[2], r++;
      }
      i = L(a, l);
    } else {
      if (!Ct[o])
        throw new Error(`Types doesn't contain name = ${o}`);
      i = Ct[o];
    }
    const s = [];
    for (; r < t.length; r++) {
      const a = e.parse(t[r], r, v);
      if (!a)
        return null;
      s.push(a);
    }
    return new D(i, s);
  }
  evaluate(t) {
    for (let e = 0; e < this.args.length; e++) {
      const r = this.args[e].evaluate(t);
      if (lt(this.type, E(r))) {
        if (e === this.args.length - 1)
          throw new I(`Expected value to be of type ${w(this.type)}, but found ${w(E(r))} instead.`);
      } else return r;
    }
    throw new Error();
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return this.args.every((t) => t.outputDefined());
  }
}
const $e = {
  "to-boolean": m,
  "to-color": _,
  "to-number": f,
  "to-string": b
};
class U {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    const r = t[0];
    if (!$e[r])
      throw new Error(`Can't parse ${r} as it is not part of the known types`);
    if ((r === "to-boolean" || r === "to-string") && t.length !== 2)
      return e.error("Expected one argument.");
    const i = $e[r], o = [];
    for (let s = 1; s < t.length; s++) {
      const a = e.parse(t[s], s, v);
      if (!a)
        return null;
      o.push(a);
    }
    return new U(i, o);
  }
  evaluate(t) {
    switch (this.type.kind) {
      case "boolean":
        return !!this.args[0].evaluate(t);
      case "color": {
        let e, r;
        for (const i of this.args) {
          if (e = i.evaluate(t), r = null, e instanceof k)
            return e;
          if (typeof e == "string") {
            const o = t.parseColor(e);
            if (o)
              return o;
          } else if (Array.isArray(e) && (e.length < 3 || e.length > 4 ? r = `Invalid rgba value ${JSON.stringify(e)}: expected an array containing either three or four numeric values.` : r = rn(e[0], e[1], e[2], e[3]), !r))
            return new k(e[0] / 255, e[1] / 255, e[2] / 255, e[3]);
        }
        throw new I(r || `Could not parse color from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "padding": {
        let e;
        for (const r of this.args) {
          e = r.evaluate(t);
          const i = T.parse(e);
          if (i)
            return i;
        }
        throw new I(`Could not parse padding from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let e;
        for (const r of this.args) {
          e = r.evaluate(t);
          const i = $.parse(e);
          if (i)
            return i;
        }
        throw new I(`Could not parse variableAnchorOffsetCollection from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "number": {
        let e = null;
        for (const r of this.args) {
          if (e = r.evaluate(t), e === null)
            return 0;
          const i = Number(e);
          if (!isNaN(i))
            return i;
        }
        throw new I(`Could not convert ${JSON.stringify(e)} to number.`);
      }
      case "formatted":
        return F.fromString(st(this.args[0].evaluate(t)));
      case "resolvedImage":
        return O.fromString(st(this.args[0].evaluate(t)));
      case "projectionDefinition":
        return this.args[0].evaluate(t);
      default:
        return st(this.args[0].evaluate(t));
    }
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return this.args.every((t) => t.outputDefined());
  }
}
function Gn(n, t) {
  if (n.length <= 1)
    return [n];
  const r = [];
  let i, o;
  for (const s of n) {
    const a = on(s);
    a !== 0 && (s.area = Math.abs(a), o === void 0 && (o = a < 0), o === a < 0 ? (i && r.push(i), i = [s]) : i.push(s));
  }
  return i && r.push(i), r;
}
function on(n) {
  let t = 0;
  for (let e = 0, r = n.length, i = r - 1, o, s; e < r; i = e++)
    o = n[e], s = n[i], t += (s.x - o.x) * (o.y + s.y);
  return t;
}
function Xn(n) {
  const t = n.length;
  for (let e = 0, r; e < t; e++) {
    const i = on(n[e]);
    if (i !== 0) {
      if (r === void 0)
        r = i < 0;
      else if (r === i < 0)
        return !0;
    }
  }
  return !1;
}
const Ae = ["Unknown", "Point", "LineString", "Polygon"], Zn = {
  Unknown: "Unknown",
  Point: "Point",
  MultiPoint: "Point",
  LineString: "LineString",
  MultiLineString: "LineString",
  Polygon: "Polygon",
  MultiPolygon: "Polygon"
};
class sn {
  constructor() {
    this.globals = null, this.feature = null, this.featureState = null, this.formattedSection = null, this._parseColorCache = {}, this.availableImages = null, this.canonical = null;
  }
  id() {
    return this.feature && "id" in this.feature ? this.feature.id : null;
  }
  geometryDollarType() {
    return this.feature ? typeof this.feature.type == "number" ? Ae[this.feature.type] : Zn[this.feature.type] : null;
  }
  geometryType() {
    let t = this.feature.type;
    if (typeof t != "number" || (t = Ae[this.feature.type], t === "Unknown"))
      return t;
    const e = this.geometry();
    return e.length === 1 ? t : t !== "Polygon" ? `Multi${t}` : Xn(e) ? "MultiPolygon" : "Polygon";
  }
  geometry() {
    return this.feature && "geometry" in this.feature ? this.feature.geometry : null;
  }
  canonicalID() {
    return this.canonical;
  }
  properties() {
    return this.feature && this.feature.properties || {};
  }
  parseColor(t) {
    let e = this._parseColorCache[t];
    return e || (e = this._parseColorCache[t] = k.parse(t)), e;
  }
}
class Bt {
  constructor(t, e, r = [], i, o = new ae(), s = []) {
    this.registry = t, this.path = r, this.key = r.map((a) => `[${a}]`).join(""), this.scope = o, this.errors = s, this.expectedType = i, this._isConstant = e;
  }
  /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
  parse(t, e, r, i, o = {}) {
    return e ? this.concat(e, r, i)._parse(t, o) : this._parse(t, o);
  }
  _parse(t, e) {
    (t === null || typeof t == "string" || typeof t == "boolean" || typeof t == "number") && (t = ["literal", t]);
    function r(i, o, s) {
      return s === "assert" ? new D(o, [i]) : s === "coerce" ? new U(o, [i]) : i;
    }
    if (Array.isArray(t)) {
      if (t.length === 0)
        return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
      const i = t[0];
      if (typeof i != "string")
        return this.error(`Expression name must be a string, but found ${typeof i} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
      const o = this.registry[i];
      if (o) {
        let s = o.parse(t, this);
        if (!s)
          return null;
        if (this.expectedType) {
          const a = this.expectedType, l = s.type;
          if ((a.kind === "string" || a.kind === "number" || a.kind === "boolean" || a.kind === "object" || a.kind === "array") && l.kind === "value")
            s = r(s, a, e.typeAnnotation || "assert");
          else if (a.kind === "projectionDefinition" && (l.kind === "string" || l.kind === "array"))
            s = r(s, a, e.typeAnnotation || "coerce");
          else if ((a.kind === "color" || a.kind === "formatted" || a.kind === "resolvedImage") && (l.kind === "value" || l.kind === "string"))
            s = r(s, a, e.typeAnnotation || "coerce");
          else if (a.kind === "padding" && (l.kind === "value" || l.kind === "number" || l.kind === "array"))
            s = r(s, a, e.typeAnnotation || "coerce");
          else if (a.kind === "variableAnchorOffsetCollection" && (l.kind === "value" || l.kind === "array"))
            s = r(s, a, e.typeAnnotation || "coerce");
          else if (this.checkSubtype(a, l))
            return null;
        }
        if (!(s instanceof nt) && s.type.kind !== "resolvedImage" && this._isConstant(s)) {
          const a = new sn();
          try {
            s = new nt(s.type, s.evaluate(a));
          } catch (l) {
            return this.error(l.message), null;
          }
        }
        return s;
      }
      return this.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`, 0);
    } else return typeof t > "u" ? this.error("'undefined' value invalid. Use null instead.") : typeof t == "object" ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error(`Expected an array, but found ${typeof t} instead.`);
  }
  /**
   * Returns a copy of this context suitable for parsing the subexpression at
   * index `index`, optionally appending to 'let' binding map.
   *
   * Note that `errors` property, intended for collecting errors while
   * parsing, is copied by reference rather than cloned.
   * @private
   */
  concat(t, e, r) {
    const i = typeof t == "number" ? this.path.concat(t) : this.path, o = r ? this.scope.concat(r) : this.scope;
    return new Bt(this.registry, this._isConstant, i, e || null, o, this.errors);
  }
  /**
   * Push a parsing (or type checking) error into the `this.errors`
   * @param error The message
   * @param keys Optionally specify the source of the error at a child
   * of the current expression at `this.key`.
   * @private
   */
  error(t, ...e) {
    const r = `${this.key}${e.map((i) => `[${i}]`).join("")}`;
    this.errors.push(new z(r, t));
  }
  /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   * @param expected The expected type
   * @param t The actual type
   * @returns null if `t` is a subtype of `expected`; otherwise returns an error message
   */
  checkSubtype(t, e) {
    const r = lt(t, e);
    return r && this.error(r), r;
  }
}
class zt {
  constructor(t, e) {
    this.type = e.type, this.bindings = [].concat(t), this.result = e;
  }
  evaluate(t) {
    return this.result.evaluate(t);
  }
  eachChild(t) {
    for (const e of this.bindings)
      t(e[1]);
    t(this.result);
  }
  static parse(t, e) {
    if (t.length < 4)
      return e.error(`Expected at least 3 arguments, but found ${t.length - 1} instead.`);
    const r = [];
    for (let o = 1; o < t.length - 1; o += 2) {
      const s = t[o];
      if (typeof s != "string")
        return e.error(`Expected string, but found ${typeof s} instead.`, o);
      if (/[^a-zA-Z0-9_]/.test(s))
        return e.error("Variable names must contain only alphanumeric characters or '_'.", o);
      const a = e.parse(t[o + 1], o + 1);
      if (!a)
        return null;
      r.push([s, a]);
    }
    const i = e.parse(t[t.length - 1], t.length - 1, e.expectedType, r);
    return i ? new zt(r, i) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class _t {
  constructor(t, e) {
    this.type = e.type, this.name = t, this.boundExpression = e;
  }
  static parse(t, e) {
    if (t.length !== 2 || typeof t[1] != "string")
      return e.error("'var' expression requires exactly one string literal argument.");
    const r = t[1];
    return e.scope.has(r) ? new _t(r, e.scope.get(r)) : e.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`, 1);
  }
  evaluate(t) {
    return this.boundExpression.evaluate(t);
  }
  eachChild() {
  }
  outputDefined() {
    return !1;
  }
}
class ce {
  constructor(t, e, r) {
    this.type = t, this.index = e, this.input = r;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error(`Expected 2 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, f), i = e.parse(t[2], 2, L(e.expectedType || v));
    if (!r || !i)
      return null;
    const o = i.type;
    return new ce(o.itemType, r, i);
  }
  evaluate(t) {
    const e = this.index.evaluate(t), r = this.input.evaluate(t);
    if (e < 0)
      throw new I(`Array index out of bounds: ${e} < 0.`);
    if (e >= r.length)
      throw new I(`Array index out of bounds: ${e} > ${r.length - 1}.`);
    if (e !== Math.floor(e))
      throw new I(`Array index must be an integer, but found ${e} instead.`);
    return r[e];
  }
  eachChild(t) {
    t(this.index), t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class he {
  constructor(t, e) {
    this.type = m, this.needle = t, this.haystack = e;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error(`Expected 2 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, v), i = e.parse(t[2], 2, v);
    return !r || !i ? null : le(r.type, [m, b, f, Tt, v]) ? new he(r, i) : e.error(`Expected first argument to be of type boolean, string, number or null, but found ${w(r.type)} instead`);
  }
  evaluate(t) {
    const e = this.needle.evaluate(t), r = this.haystack.evaluate(t);
    if (!r)
      return !1;
    if (!G(e, ["boolean", "string", "number", "null"]))
      throw new I(`Expected first argument to be of type boolean, string, number or null, but found ${w(E(e))} instead.`);
    if (!G(r, ["string", "array"]))
      throw new I(`Expected second argument to be of type array or string, but found ${w(E(r))} instead.`);
    return r.indexOf(e) >= 0;
  }
  eachChild(t) {
    t(this.needle), t(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class Pt {
  constructor(t, e, r) {
    this.type = f, this.needle = t, this.haystack = e, this.fromIndex = r;
  }
  static parse(t, e) {
    if (t.length <= 2 || t.length >= 5)
      return e.error(`Expected 3 or 4 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, v), i = e.parse(t[2], 2, v);
    if (!r || !i)
      return null;
    if (!le(r.type, [m, b, f, Tt, v]))
      return e.error(`Expected first argument to be of type boolean, string, number or null, but found ${w(r.type)} instead`);
    if (t.length === 4) {
      const o = e.parse(t[3], 3, f);
      return o ? new Pt(r, i, o) : null;
    } else
      return new Pt(r, i);
  }
  evaluate(t) {
    const e = this.needle.evaluate(t), r = this.haystack.evaluate(t);
    if (!G(e, ["boolean", "string", "number", "null"]))
      throw new I(`Expected first argument to be of type boolean, string, number or null, but found ${w(E(e))} instead.`);
    let i;
    if (this.fromIndex && (i = this.fromIndex.evaluate(t)), G(r, ["string"])) {
      const o = r.indexOf(e, i);
      return o === -1 ? -1 : [...r.slice(0, o)].length;
    } else {
      if (G(r, ["array"]))
        return r.indexOf(e, i);
      throw new I(`Expected second argument to be of type array or string, but found ${w(E(r))} instead.`);
    }
  }
  eachChild(t) {
    t(this.needle), t(this.haystack), this.fromIndex && t(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class fe {
  constructor(t, e, r, i, o, s) {
    this.inputType = t, this.type = e, this.input = r, this.cases = i, this.outputs = o, this.otherwise = s;
  }
  static parse(t, e) {
    if (t.length < 5)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if (t.length % 2 !== 1)
      return e.error("Expected an even number of arguments.");
    let r, i;
    e.expectedType && e.expectedType.kind !== "value" && (i = e.expectedType);
    const o = {}, s = [];
    for (let u = 2; u < t.length - 1; u += 2) {
      let c = t[u];
      const h = t[u + 1];
      Array.isArray(c) || (c = [c]);
      const p = e.concat(u);
      if (c.length === 0)
        return p.error("Expected at least one branch label.");
      for (const g of c) {
        if (typeof g != "number" && typeof g != "string")
          return p.error("Branch labels must be numbers or strings.");
        if (typeof g == "number" && Math.abs(g) > Number.MAX_SAFE_INTEGER)
          return p.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
        if (typeof g == "number" && Math.floor(g) !== g)
          return p.error("Numeric branch labels must be integer values.");
        if (!r)
          r = E(g);
        else if (p.checkSubtype(r, E(g)))
          return null;
        if (typeof o[String(g)] < "u")
          return p.error("Branch labels must be unique.");
        o[String(g)] = s.length;
      }
      const d = e.parse(h, u, i);
      if (!d)
        return null;
      i = i || d.type, s.push(d);
    }
    const a = e.parse(t[1], 1, v);
    if (!a)
      return null;
    const l = e.parse(t[t.length - 1], t.length - 1, i);
    return !l || a.type.kind !== "value" && e.concat(1).checkSubtype(r, a.type) ? null : new fe(r, i, a, o, s, l);
  }
  evaluate(t) {
    const e = this.input.evaluate(t);
    return (E(e) === this.inputType && this.outputs[this.cases[e]] || this.otherwise).evaluate(t);
  }
  eachChild(t) {
    t(this.input), this.outputs.forEach(t), t(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((t) => t.outputDefined()) && this.otherwise.outputDefined();
  }
}
class pe {
  constructor(t, e, r) {
    this.type = t, this.branches = e, this.otherwise = r;
  }
  static parse(t, e) {
    if (t.length < 4)
      return e.error(`Expected at least 3 arguments, but found only ${t.length - 1}.`);
    if (t.length % 2 !== 0)
      return e.error("Expected an odd number of arguments.");
    let r;
    e.expectedType && e.expectedType.kind !== "value" && (r = e.expectedType);
    const i = [];
    for (let s = 1; s < t.length - 1; s += 2) {
      const a = e.parse(t[s], s, m);
      if (!a)
        return null;
      const l = e.parse(t[s + 1], s + 1, r);
      if (!l)
        return null;
      i.push([a, l]), r = r || l.type;
    }
    const o = e.parse(t[t.length - 1], t.length - 1, r);
    if (!o)
      return null;
    if (!r)
      throw new Error("Can't infer output type");
    return new pe(r, i, o);
  }
  evaluate(t) {
    for (const [e, r] of this.branches)
      if (e.evaluate(t))
        return r.evaluate(t);
    return this.otherwise.evaluate(t);
  }
  eachChild(t) {
    for (const [e, r] of this.branches)
      t(e), t(r);
    t(this.otherwise);
  }
  outputDefined() {
    return this.branches.every(([t, e]) => e.outputDefined()) && this.otherwise.outputDefined();
  }
}
class It {
  constructor(t, e, r, i) {
    this.type = t, this.input = e, this.beginIndex = r, this.endIndex = i;
  }
  static parse(t, e) {
    if (t.length <= 2 || t.length >= 5)
      return e.error(`Expected 3 or 4 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, v), i = e.parse(t[2], 2, f);
    if (!r || !i)
      return null;
    if (!le(r.type, [L(v), b, v]))
      return e.error(`Expected first argument to be of type array or string, but found ${w(r.type)} instead`);
    if (t.length === 4) {
      const o = e.parse(t[3], 3, f);
      return o ? new It(r.type, r, i, o) : null;
    } else
      return new It(r.type, r, i);
  }
  evaluate(t) {
    const e = this.input.evaluate(t), r = this.beginIndex.evaluate(t);
    let i;
    if (this.endIndex && (i = this.endIndex.evaluate(t)), G(e, ["string"]))
      return [...e].slice(r, i).join("");
    if (G(e, ["array"]))
      return e.slice(r, i);
    throw new I(`Expected first argument to be of type array or string, but found ${w(E(e))} instead.`);
  }
  eachChild(t) {
    t(this.input), t(this.beginIndex), this.endIndex && t(this.endIndex);
  }
  outputDefined() {
    return !1;
  }
}
function Ft(n, t) {
  const e = n.length - 1;
  let r = 0, i = e, o = 0, s, a;
  for (; r <= i; )
    if (o = Math.floor((r + i) / 2), s = n[o], a = n[o + 1], s <= t) {
      if (o === e || t < a)
        return o;
      r = o + 1;
    } else if (s > t)
      i = o - 1;
    else
      throw new I("Input is not a number.");
  return 0;
}
class jt {
  constructor(t, e, r) {
    this.type = t, this.input = e, this.labels = [], this.outputs = [];
    for (const [i, o] of r)
      this.labels.push(i), this.outputs.push(o);
  }
  static parse(t, e) {
    if (t.length - 1 < 4)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if ((t.length - 1) % 2 !== 0)
      return e.error("Expected an even number of arguments.");
    const r = e.parse(t[1], 1, f);
    if (!r)
      return null;
    const i = [];
    let o = null;
    e.expectedType && e.expectedType.kind !== "value" && (o = e.expectedType);
    for (let s = 1; s < t.length; s += 2) {
      const a = s === 1 ? -1 / 0 : t[s], l = t[s + 1], u = s, c = s + 1;
      if (typeof a != "number")
        return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', u);
      if (i.length && i[i.length - 1][0] >= a)
        return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', u);
      const h = e.parse(l, c, o);
      if (!h)
        return null;
      o = o || h.type, i.push([a, h]);
    }
    return new jt(o, r, i);
  }
  evaluate(t) {
    const e = this.labels, r = this.outputs;
    if (e.length === 1)
      return r[0].evaluate(t);
    const i = this.input.evaluate(t);
    if (i <= e[0])
      return r[0].evaluate(t);
    const o = e.length;
    if (i >= e[o - 1])
      return r[o - 1].evaluate(t);
    const s = Ft(e, i);
    return r[s].evaluate(t);
  }
  eachChild(t) {
    t(this.input);
    for (const e of this.outputs)
      t(e);
  }
  outputDefined() {
    return this.outputs.every((t) => t.outputDefined());
  }
}
function Jn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Xt, De;
function Kn() {
  if (De) return Xt;
  De = 1, Xt = n;
  function n(t, e, r, i) {
    this.cx = 3 * t, this.bx = 3 * (r - t) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * e, this.by = 3 * (i - e) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = t, this.p1y = e, this.p2x = r, this.p2y = i;
  }
  return n.prototype = {
    sampleCurveX: function(t) {
      return ((this.ax * t + this.bx) * t + this.cx) * t;
    },
    sampleCurveY: function(t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
    },
    sampleCurveDerivativeX: function(t) {
      return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
    },
    solveCurveX: function(t, e) {
      if (e === void 0 && (e = 1e-6), t < 0) return 0;
      if (t > 1) return 1;
      for (var r = t, i = 0; i < 8; i++) {
        var o = this.sampleCurveX(r) - t;
        if (Math.abs(o) < e) return r;
        var s = this.sampleCurveDerivativeX(r);
        if (Math.abs(s) < 1e-6) break;
        r = r - o / s;
      }
      var a = 0, l = 1;
      for (r = t, i = 0; i < 20 && (o = this.sampleCurveX(r), !(Math.abs(o - t) < e)); i++)
        t > o ? a = r : l = r, r = (l - a) * 0.5 + a;
      return r;
    },
    solve: function(t, e) {
      return this.sampleCurveY(this.solveCurveX(t, e));
    }
  }, Xt;
}
var Yn = Kn(), Qn = /* @__PURE__ */ Jn(Yn);
class A {
  constructor(t, e, r, i, o) {
    this.type = t, this.operator = e, this.interpolation = r, this.input = i, this.labels = [], this.outputs = [];
    for (const [s, a] of o)
      this.labels.push(s), this.outputs.push(a);
  }
  static interpolationFactor(t, e, r, i) {
    let o = 0;
    if (t.name === "exponential")
      o = Zt(e, t.base, r, i);
    else if (t.name === "linear")
      o = Zt(e, 1, r, i);
    else if (t.name === "cubic-bezier") {
      const s = t.controlPoints;
      o = new Qn(s[0], s[1], s[2], s[3]).solve(Zt(e, 1, r, i));
    }
    return o;
  }
  static parse(t, e) {
    let [r, i, o, ...s] = t;
    if (!Array.isArray(i) || i.length === 0)
      return e.error("Expected an interpolation type expression.", 1);
    if (i[0] === "linear")
      i = { name: "linear" };
    else if (i[0] === "exponential") {
      const u = i[1];
      if (typeof u != "number")
        return e.error("Exponential interpolation requires a numeric base.", 1, 1);
      i = {
        name: "exponential",
        base: u
      };
    } else if (i[0] === "cubic-bezier") {
      const u = i.slice(1);
      if (u.length !== 4 || u.some((c) => typeof c != "number" || c < 0 || c > 1))
        return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
      i = {
        name: "cubic-bezier",
        controlPoints: u
      };
    } else
      return e.error(`Unknown interpolation type ${String(i[0])}`, 1, 0);
    if (t.length - 1 < 4)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if ((t.length - 1) % 2 !== 0)
      return e.error("Expected an even number of arguments.");
    if (o = e.parse(o, 2, f), !o)
      return null;
    const a = [];
    let l = null;
    r === "interpolate-hcl" || r === "interpolate-lab" ? l = _ : e.expectedType && e.expectedType.kind !== "value" && (l = e.expectedType);
    for (let u = 0; u < s.length; u += 2) {
      const c = s[u], h = s[u + 1], p = u + 3, d = u + 4;
      if (typeof c != "number")
        return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', p);
      if (a.length && a[a.length - 1][0] >= c)
        return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', p);
      const g = e.parse(h, d, l);
      if (!g)
        return null;
      l = l || g.type, a.push([c, g]);
    }
    return !J(l, f) && !J(l, Lt) && !J(l, _) && !J(l, At) && !J(l, Dt) && !J(l, L(f)) ? e.error(`Type ${w(l)} is not interpolatable.`) : new A(l, r, i, o, a);
  }
  evaluate(t) {
    const e = this.labels, r = this.outputs;
    if (e.length === 1)
      return r[0].evaluate(t);
    const i = this.input.evaluate(t);
    if (i <= e[0])
      return r[0].evaluate(t);
    const o = e.length;
    if (i >= e[o - 1])
      return r[o - 1].evaluate(t);
    const s = Ft(e, i), a = e[s], l = e[s + 1], u = A.interpolationFactor(this.interpolation, i, a, l), c = r[s].evaluate(t), h = r[s + 1].evaluate(t);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return q(c, h, u);
          case "color":
            return k.interpolate(c, h, u);
          case "padding":
            return T.interpolate(c, h, u);
          case "variableAnchorOffsetCollection":
            return $.interpolate(c, h, u);
          case "array":
            return ut(c, h, u);
          case "projectionDefinition":
            return N.interpolate(c, h, u);
        }
      case "interpolate-hcl":
        return k.interpolate(c, h, u, "hcl");
      case "interpolate-lab":
        return k.interpolate(c, h, u, "lab");
    }
  }
  eachChild(t) {
    t(this.input);
    for (const e of this.outputs)
      t(e);
  }
  outputDefined() {
    return this.outputs.every((t) => t.outputDefined());
  }
}
function Zt(n, t, e, r) {
  const i = r - e, o = n - e;
  return i === 0 ? 0 : t === 1 ? o / i : (Math.pow(t, o) - 1) / (Math.pow(t, i) - 1);
}
const tr = {
  color: k.interpolate,
  number: q,
  padding: T.interpolate,
  variableAnchorOffsetCollection: $.interpolate,
  array: ut
};
class ht {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    let r = null;
    const i = e.expectedType;
    i && i.kind !== "value" && (r = i);
    const o = [];
    for (const a of t.slice(1)) {
      const l = e.parse(a, 1 + o.length, r, void 0, { typeAnnotation: "omit" });
      if (!l)
        return null;
      r = r || l.type, o.push(l);
    }
    if (!r)
      throw new Error("No output type");
    return i && o.some((a) => lt(i, a.type)) ? new ht(v, o) : new ht(r, o);
  }
  evaluate(t) {
    let e = null, r = 0, i;
    for (const o of this.args)
      if (r++, e = o.evaluate(t), e && e instanceof O && !e.available && (i || (i = e.name), e = null, r === this.args.length && (e = i)), e !== null)
        break;
    return e;
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return this.args.every((t) => t.outputDefined());
  }
}
function Be(n, t) {
  return n === "==" || n === "!=" ? t.kind === "boolean" || t.kind === "string" || t.kind === "number" || t.kind === "null" || t.kind === "value" : t.kind === "string" || t.kind === "number" || t.kind === "value";
}
function er(n, t, e) {
  return t === e;
}
function nr(n, t, e) {
  return t !== e;
}
function rr(n, t, e) {
  return t < e;
}
function ir(n, t, e) {
  return t > e;
}
function or(n, t, e) {
  return t <= e;
}
function sr(n, t, e) {
  return t >= e;
}
function an(n, t, e, r) {
  return r.compare(t, e) === 0;
}
function ar(n, t, e, r) {
  return !an(n, t, e, r);
}
function lr(n, t, e, r) {
  return r.compare(t, e) < 0;
}
function ur(n, t, e, r) {
  return r.compare(t, e) > 0;
}
function cr(n, t, e, r) {
  return r.compare(t, e) <= 0;
}
function hr(n, t, e, r) {
  return r.compare(t, e) >= 0;
}
function rt(n, t, e) {
  const r = n !== "==" && n !== "!=";
  return class ln {
    constructor(o, s, a) {
      this.type = m, this.lhs = o, this.rhs = s, this.collator = a, this.hasUntypedArgument = o.type.kind === "value" || s.type.kind === "value";
    }
    static parse(o, s) {
      if (o.length !== 3 && o.length !== 4)
        return s.error("Expected two or three arguments.");
      const a = o[0];
      let l = s.parse(o[1], 1, v);
      if (!l)
        return null;
      if (!Be(a, l.type))
        return s.concat(1).error(`"${a}" comparisons are not supported for type '${w(l.type)}'.`);
      let u = s.parse(o[2], 2, v);
      if (!u)
        return null;
      if (!Be(a, u.type))
        return s.concat(2).error(`"${a}" comparisons are not supported for type '${w(u.type)}'.`);
      if (l.type.kind !== u.type.kind && l.type.kind !== "value" && u.type.kind !== "value")
        return s.error(`Cannot compare types '${w(l.type)}' and '${w(u.type)}'.`);
      r && (l.type.kind === "value" && u.type.kind !== "value" ? l = new D(u.type, [l]) : l.type.kind !== "value" && u.type.kind === "value" && (u = new D(l.type, [u])));
      let c = null;
      if (o.length === 4) {
        if (l.type.kind !== "string" && u.type.kind !== "string" && l.type.kind !== "value" && u.type.kind !== "value")
          return s.error("Cannot use collator to compare non-string types.");
        if (c = s.parse(o[3], 3, Nt), !c)
          return null;
      }
      return new ln(l, u, c);
    }
    evaluate(o) {
      const s = this.lhs.evaluate(o), a = this.rhs.evaluate(o);
      if (r && this.hasUntypedArgument) {
        const l = E(s), u = E(a);
        if (l.kind !== u.kind || !(l.kind === "string" || l.kind === "number"))
          throw new I(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${u.kind}) instead.`);
      }
      if (this.collator && !r && this.hasUntypedArgument) {
        const l = E(s), u = E(a);
        if (l.kind !== "string" || u.kind !== "string")
          return t(o, s, a);
      }
      return this.collator ? e(o, s, a, this.collator.evaluate(o)) : t(o, s, a);
    }
    eachChild(o) {
      o(this.lhs), o(this.rhs), this.collator && o(this.collator);
    }
    outputDefined() {
      return !0;
    }
  };
}
const fr = rt("==", er, an), pr = rt("!=", nr, ar), dr = rt("<", rr, lr), gr = rt(">", ir, ur), yr = rt("<=", or, cr), mr = rt(">=", sr, hr);
class Rt {
  constructor(t, e, r) {
    this.type = Nt, this.locale = r, this.caseSensitive = t, this.diacriticSensitive = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error("Expected one argument.");
    const r = t[1];
    if (typeof r != "object" || Array.isArray(r))
      return e.error("Collator options argument must be an object.");
    const i = e.parse(r["case-sensitive"] === void 0 ? !1 : r["case-sensitive"], 1, m);
    if (!i)
      return null;
    const o = e.parse(r["diacritic-sensitive"] === void 0 ? !1 : r["diacritic-sensitive"], 1, m);
    if (!o)
      return null;
    let s = null;
    return r.locale && (s = e.parse(r.locale, 1, b), !s) ? null : new Rt(i, o, s);
  }
  evaluate(t) {
    return new ue(this.caseSensitive.evaluate(t), this.diacriticSensitive.evaluate(t), this.locale ? this.locale.evaluate(t) : null);
  }
  eachChild(t) {
    t(this.caseSensitive), t(this.diacriticSensitive), this.locale && t(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class de {
  constructor(t, e, r, i, o) {
    this.type = b, this.number = t, this.locale = e, this.currency = r, this.minFractionDigits = i, this.maxFractionDigits = o;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error("Expected two arguments.");
    const r = e.parse(t[1], 1, f);
    if (!r)
      return null;
    const i = t[2];
    if (typeof i != "object" || Array.isArray(i))
      return e.error("NumberFormat options argument must be an object.");
    let o = null;
    if (i.locale && (o = e.parse(i.locale, 1, b), !o))
      return null;
    let s = null;
    if (i.currency && (s = e.parse(i.currency, 1, b), !s))
      return null;
    let a = null;
    if (i["min-fraction-digits"] && (a = e.parse(i["min-fraction-digits"], 1, f), !a))
      return null;
    let l = null;
    return i["max-fraction-digits"] && (l = e.parse(i["max-fraction-digits"], 1, f), !l) ? null : new de(r, o, s, a, l);
  }
  evaluate(t) {
    return new Intl.NumberFormat(this.locale ? this.locale.evaluate(t) : [], {
      style: this.currency ? "currency" : "decimal",
      currency: this.currency ? this.currency.evaluate(t) : void 0,
      minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(t) : void 0,
      maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(t) : void 0
    }).format(this.number.evaluate(t));
  }
  eachChild(t) {
    t(this.number), this.locale && t(this.locale), this.currency && t(this.currency), this.minFractionDigits && t(this.minFractionDigits), this.maxFractionDigits && t(this.maxFractionDigits);
  }
  outputDefined() {
    return !1;
  }
}
class ge {
  constructor(t) {
    this.type = $t, this.sections = t;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    const r = t[1];
    if (!Array.isArray(r) && typeof r == "object")
      return e.error("First argument must be an image or text section.");
    const i = [];
    let o = !1;
    for (let s = 1; s <= t.length - 1; ++s) {
      const a = t[s];
      if (o && typeof a == "object" && !Array.isArray(a)) {
        o = !1;
        let l = null;
        if (a["font-scale"] && (l = e.parse(a["font-scale"], 1, f), !l))
          return null;
        let u = null;
        if (a["text-font"] && (u = e.parse(a["text-font"], 1, L(b)), !u))
          return null;
        let c = null;
        if (a["text-color"] && (c = e.parse(a["text-color"], 1, _), !c))
          return null;
        const h = i[i.length - 1];
        h.scale = l, h.font = u, h.textColor = c;
      } else {
        const l = e.parse(t[s], 1, v);
        if (!l)
          return null;
        const u = l.type.kind;
        if (u !== "string" && u !== "value" && u !== "null" && u !== "resolvedImage")
          return e.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        o = !0, i.push({ content: l, scale: null, font: null, textColor: null });
      }
    }
    return new ge(i);
  }
  evaluate(t) {
    const e = (r) => {
      const i = r.content.evaluate(t);
      return E(i) === pt ? new Yt("", i, null, null, null) : new Yt(st(i), null, r.scale ? r.scale.evaluate(t) : null, r.font ? r.font.evaluate(t).join(",") : null, r.textColor ? r.textColor.evaluate(t) : null);
    };
    return new F(this.sections.map(e));
  }
  eachChild(t) {
    for (const e of this.sections)
      t(e.content), e.scale && t(e.scale), e.font && t(e.font), e.textColor && t(e.textColor);
  }
  outputDefined() {
    return !1;
  }
}
class ye {
  constructor(t) {
    this.type = pt, this.input = t;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error("Expected two arguments.");
    const r = e.parse(t[1], 1, b);
    return r ? new ye(r) : e.error("No image name provided.");
  }
  evaluate(t) {
    const e = this.input.evaluate(t), r = O.fromString(e);
    return r && t.availableImages && (r.available = t.availableImages.indexOf(e) > -1), r;
  }
  eachChild(t) {
    t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class me {
  constructor(t) {
    this.type = f, this.input = t;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`Expected 1 argument, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1);
    return r ? r.type.kind !== "array" && r.type.kind !== "string" && r.type.kind !== "value" ? e.error(`Expected argument of type string or array, but found ${w(r.type)} instead.`) : new me(r) : null;
  }
  evaluate(t) {
    const e = this.input.evaluate(t);
    if (typeof e == "string")
      return [...e].length;
    if (Array.isArray(e))
      return e.length;
    throw new I(`Expected value to be of type string or array, but found ${w(E(e))} instead.`);
  }
  eachChild(t) {
    t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const j = 8192;
function vr(n, t) {
  const e = br(n[0]), r = kr(n[1]), i = Math.pow(2, t.z);
  return [Math.round(e * i * j), Math.round(r * i * j)];
}
function ve(n, t) {
  const e = Math.pow(2, t.z), r = (n[0] / j + t.x) / e, i = (n[1] / j + t.y) / e;
  return [Cr(r), wr(i)];
}
function br(n) {
  return (180 + n) / 360;
}
function Cr(n) {
  return n * 360 - 180;
}
function kr(n) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + n * Math.PI / 360))) / 360;
}
function wr(n) {
  return 360 / Math.PI * Math.atan(Math.exp((180 - n * 360) * Math.PI / 180)) - 90;
}
function dt(n, t) {
  n[0] = Math.min(n[0], t[0]), n[1] = Math.min(n[1], t[1]), n[2] = Math.max(n[2], t[0]), n[3] = Math.max(n[3], t[1]);
}
function ft(n, t) {
  return !(n[0] <= t[0] || n[2] >= t[2] || n[1] <= t[1] || n[3] >= t[3]);
}
function Pr(n, t, e) {
  return t[1] > n[1] != e[1] > n[1] && n[0] < (e[0] - t[0]) * (n[1] - t[1]) / (e[1] - t[1]) + t[0];
}
function Ir(n, t, e) {
  const r = n[0] - t[0], i = n[1] - t[1], o = n[0] - e[0], s = n[1] - e[1];
  return r * s - o * i === 0 && r * o <= 0 && i * s <= 0;
}
function Ht(n, t, e, r) {
  const i = [t[0] - n[0], t[1] - n[1]], o = [r[0] - e[0], r[1] - e[1]];
  return Sr(o, i) === 0 ? !1 : !!(ze(n, t, e, r) && ze(e, r, n, t));
}
function xr(n, t, e) {
  for (const r of e)
    for (let i = 0; i < r.length - 1; ++i)
      if (Ht(n, t, r[i], r[i + 1]))
        return !0;
  return !1;
}
function it(n, t, e = !1) {
  let r = !1;
  for (const i of t)
    for (let o = 0; o < i.length - 1; o++) {
      if (Ir(n, i[o], i[o + 1]))
        return e;
      Pr(n, i[o], i[o + 1]) && (r = !r);
    }
  return r;
}
function Er(n, t) {
  for (const e of t)
    if (it(n, e))
      return !0;
  return !1;
}
function un(n, t) {
  for (const e of n)
    if (!it(e, t))
      return !1;
  for (let e = 0; e < n.length - 1; ++e)
    if (xr(n[e], n[e + 1], t))
      return !1;
  return !0;
}
function Mr(n, t) {
  for (const e of t)
    if (un(n, e))
      return !0;
  return !1;
}
function Sr(n, t) {
  return n[0] * t[1] - n[1] * t[0];
}
function ze(n, t, e, r) {
  const i = n[0] - e[0], o = n[1] - e[1], s = t[0] - e[0], a = t[1] - e[1], l = r[0] - e[0], u = r[1] - e[1], c = i * u - l * o, h = s * u - l * a;
  return c > 0 && h < 0 || c < 0 && h > 0;
}
function be(n, t, e) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const o = [];
    for (let s = 0; s < n[i].length; s++) {
      const a = vr(n[i][s], e);
      dt(t, a), o.push(a);
    }
    r.push(o);
  }
  return r;
}
function cn(n, t, e) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const o = be(n[i], t, e);
    r.push(o);
  }
  return r;
}
function hn(n, t, e, r) {
  if (n[0] < e[0] || n[0] > e[2]) {
    const i = r * 0.5;
    let o = n[0] - e[0] > i ? -r : e[0] - n[0] > i ? r : 0;
    o === 0 && (o = n[0] - e[2] > i ? -r : e[2] - n[0] > i ? r : 0), n[0] += o;
  }
  dt(t, n);
}
function Tr(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function _e(n, t, e, r) {
  const i = Math.pow(2, r.z) * j, o = [r.x * j, r.y * j], s = [];
  for (const a of n)
    for (const l of a) {
      const u = [l.x + o[0], l.y + o[1]];
      hn(u, t, e, i), s.push(u);
    }
  return s;
}
function Fe(n, t, e, r) {
  const i = Math.pow(2, r.z) * j, o = [r.x * j, r.y * j], s = [];
  for (const a of n) {
    const l = [];
    for (const u of a) {
      const c = [u.x + o[0], u.y + o[1]];
      dt(t, c), l.push(c);
    }
    s.push(l);
  }
  if (t[2] - t[0] <= i / 2) {
    Tr(t);
    for (const a of s)
      for (const l of a)
        hn(l, t, e, i);
  }
  return s;
}
function Lr(n, t) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (t.type === "Polygon") {
    const o = be(t.coordinates, r, i), s = _e(n.geometry(), e, r, i);
    if (!ft(e, r))
      return !1;
    for (const a of s)
      if (!it(a, o))
        return !1;
  }
  if (t.type === "MultiPolygon") {
    const o = cn(t.coordinates, r, i), s = _e(n.geometry(), e, r, i);
    if (!ft(e, r))
      return !1;
    for (const a of s)
      if (!Er(a, o))
        return !1;
  }
  return !0;
}
function Nr(n, t) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (t.type === "Polygon") {
    const o = be(t.coordinates, r, i), s = Fe(n.geometry(), e, r, i);
    if (!ft(e, r))
      return !1;
    for (const a of s)
      if (!un(a, o))
        return !1;
  }
  if (t.type === "MultiPolygon") {
    const o = cn(t.coordinates, r, i), s = Fe(n.geometry(), e, r, i);
    if (!ft(e, r))
      return !1;
    for (const a of s)
      if (!Mr(a, o))
        return !1;
  }
  return !0;
}
class X {
  constructor(t, e) {
    this.type = m, this.geojson = t, this.geometries = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'within' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (ct(t[1])) {
      const r = t[1];
      if (r.type === "FeatureCollection") {
        const i = [];
        for (const o of r.features) {
          const { type: s, coordinates: a } = o.geometry;
          s === "Polygon" && i.push(a), s === "MultiPolygon" && i.push(...a);
        }
        if (i.length) {
          const o = {
            type: "MultiPolygon",
            coordinates: i
          };
          return new X(r, o);
        }
      } else if (r.type === "Feature") {
        const i = r.geometry.type;
        if (i === "Polygon" || i === "MultiPolygon")
          return new X(r, r.geometry);
      } else if (r.type === "Polygon" || r.type === "MultiPolygon")
        return new X(r, r);
    }
    return e.error("'within' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(t) {
    if (t.geometry() != null && t.canonicalID() != null) {
      if (t.geometryDollarType() === "Point")
        return Lr(t, this.geometries);
      if (t.geometryDollarType() === "LineString")
        return Nr(t, this.geometries);
    }
    return !1;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class fn {
  constructor(t = [], e = (r, i) => r < i ? -1 : r > i ? 1 : 0) {
    if (this.data = t, this.length = this.data.length, this.compare = e, this.length > 0)
      for (let r = (this.length >> 1) - 1; r >= 0; r--) this._down(r);
  }
  push(t) {
    this.data.push(t), this._up(this.length++);
  }
  pop() {
    if (this.length === 0) return;
    const t = this.data[0], e = this.data.pop();
    return --this.length > 0 && (this.data[0] = e, this._down(0)), t;
  }
  peek() {
    return this.data[0];
  }
  _up(t) {
    const { data: e, compare: r } = this, i = e[t];
    for (; t > 0; ) {
      const o = t - 1 >> 1, s = e[o];
      if (r(i, s) >= 0) break;
      e[t] = s, t = o;
    }
    e[t] = i;
  }
  _down(t) {
    const { data: e, compare: r } = this, i = this.length >> 1, o = e[t];
    for (; t < i; ) {
      let s = (t << 1) + 1;
      const a = s + 1;
      if (a < this.length && r(e[a], e[s]) < 0 && (s = a), r(e[s], o) >= 0) break;
      e[t] = e[s], t = s;
    }
    e[t] = o;
  }
}
const $r = 6378.137, je = 1 / 298.257223563, Re = je * (2 - je), He = Math.PI / 180;
class Ce {
  constructor(t) {
    const e = He * $r * 1e3, r = Math.cos(t * He), i = 1 / (1 - Re * (1 - r * r)), o = Math.sqrt(i);
    this.kx = e * o * r, this.ky = e * o * i * (1 - Re);
  }
  /**
   * Given two points of the form [longitude, latitude], returns the distance.
   *
   * @param a - point [longitude, latitude]
   * @param b - point [longitude, latitude]
   * @returns distance
   * @example
   * const distance = ruler.distance([30.5, 50.5], [30.51, 50.49]);
   * //=distance
   */
  distance(t, e) {
    const r = this.wrap(t[0] - e[0]) * this.kx, i = (t[1] - e[1]) * this.ky;
    return Math.sqrt(r * r + i * i);
  }
  /**
   * Returns an object of the form {point, index, t}, where point is closest point on the line
   * from the given point, index is the start index of the segment with the closest point,
   * and t is a parameter from 0 to 1 that indicates where the closest point is on that segment.
   *
   * @param line - an array of points that form the line
   * @param p - point [longitude, latitude]
   * @returns the nearest point, its index in the array and the proportion along the line
   * @example
   * const point = ruler.pointOnLine(line, [-67.04, 50.5]).point;
   * //=point
   */
  pointOnLine(t, e) {
    let r = 1 / 0, i, o, s, a;
    for (let l = 0; l < t.length - 1; l++) {
      let u = t[l][0], c = t[l][1], h = this.wrap(t[l + 1][0] - u) * this.kx, p = (t[l + 1][1] - c) * this.ky, d = 0;
      (h !== 0 || p !== 0) && (d = (this.wrap(e[0] - u) * this.kx * h + (e[1] - c) * this.ky * p) / (h * h + p * p), d > 1 ? (u = t[l + 1][0], c = t[l + 1][1]) : d > 0 && (u += h / this.kx * d, c += p / this.ky * d)), h = this.wrap(e[0] - u) * this.kx, p = (e[1] - c) * this.ky;
      const g = h * h + p * p;
      g < r && (r = g, i = u, o = c, s = l, a = d);
    }
    return {
      point: [i, o],
      index: s,
      t: Math.max(0, Math.min(1, a))
    };
  }
  wrap(t) {
    for (; t < -180; )
      t += 360;
    for (; t > 180; )
      t -= 360;
    return t;
  }
}
const Qt = 100, te = 50;
function pn(n, t) {
  return t[0] - n[0];
}
function xt(n) {
  return n[1] - n[0] + 1;
}
function H(n, t) {
  return n[1] >= n[0] && n[1] < t;
}
function ee(n, t) {
  if (n[0] > n[1])
    return [null, null];
  const e = xt(n);
  if (t) {
    if (e === 2)
      return [n, null];
    const i = Math.floor(e / 2);
    return [
      [n[0], n[0] + i],
      [n[0] + i, n[1]]
    ];
  }
  if (e === 1)
    return [n, null];
  const r = Math.floor(e / 2) - 1;
  return [
    [n[0], n[0] + r],
    [n[0] + r + 1, n[1]]
  ];
}
function ne(n, t) {
  if (!H(t, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let r = t[0]; r <= t[1]; ++r)
    dt(e, n[r]);
  return e;
}
function re(n) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const e of n)
    for (const r of e)
      dt(t, r);
  return t;
}
function Oe(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function ke(n, t, e) {
  if (!Oe(n) || !Oe(t))
    return NaN;
  let r = 0, i = 0;
  return n[2] < t[0] && (r = t[0] - n[2]), n[0] > t[2] && (r = n[0] - t[2]), n[1] > t[3] && (i = n[1] - t[3]), n[3] < t[1] && (i = t[1] - n[3]), e.distance([0, 0], [r, i]);
}
function W(n, t, e) {
  const r = e.pointOnLine(t, n);
  return e.distance(n, r.point);
}
function we(n, t, e, r, i) {
  const o = Math.min(W(n, [e, r], i), W(t, [e, r], i)), s = Math.min(W(e, [n, t], i), W(r, [n, t], i));
  return Math.min(o, s);
}
function Ar(n, t, e, r, i) {
  if (!(H(t, n.length) && H(r, e.length)))
    return 1 / 0;
  let s = 1 / 0;
  for (let a = t[0]; a < t[1]; ++a) {
    const l = n[a], u = n[a + 1];
    for (let c = r[0]; c < r[1]; ++c) {
      const h = e[c], p = e[c + 1];
      if (Ht(l, u, h, p))
        return 0;
      s = Math.min(s, we(l, u, h, p, i));
    }
  }
  return s;
}
function Dr(n, t, e, r, i) {
  if (!(H(t, n.length) && H(r, e.length)))
    return NaN;
  let s = 1 / 0;
  for (let a = t[0]; a <= t[1]; ++a)
    for (let l = r[0]; l <= r[1]; ++l)
      if (s = Math.min(s, i.distance(n[a], e[l])), s === 0)
        return s;
  return s;
}
function Br(n, t, e) {
  if (it(n, t, !0))
    return 0;
  let r = 1 / 0;
  for (const i of t) {
    const o = i[0], s = i[i.length - 1];
    if (o !== s && (r = Math.min(r, W(n, [s, o], e)), r === 0))
      return r;
    const a = e.pointOnLine(i, n);
    if (r = Math.min(r, e.distance(n, a.point)), r === 0)
      return r;
  }
  return r;
}
function zr(n, t, e, r) {
  if (!H(t, n.length))
    return NaN;
  for (let o = t[0]; o <= t[1]; ++o)
    if (it(n[o], e, !0))
      return 0;
  let i = 1 / 0;
  for (let o = t[0]; o < t[1]; ++o) {
    const s = n[o], a = n[o + 1];
    for (const l of e)
      for (let u = 0, c = l.length, h = c - 1; u < c; h = u++) {
        const p = l[h], d = l[u];
        if (Ht(s, a, p, d))
          return 0;
        i = Math.min(i, we(s, a, p, d, r));
      }
  }
  return i;
}
function Ue(n, t) {
  for (const e of n)
    for (const r of e)
      if (it(r, t, !0))
        return !0;
  return !1;
}
function _r(n, t, e, r = 1 / 0) {
  const i = re(n), o = re(t);
  if (r !== 1 / 0 && ke(i, o, e) >= r)
    return r;
  if (ft(i, o)) {
    if (Ue(n, t))
      return 0;
  } else if (Ue(t, n))
    return 0;
  let s = 1 / 0;
  for (const a of n)
    for (let l = 0, u = a.length, c = u - 1; l < u; c = l++) {
      const h = a[c], p = a[l];
      for (const d of t)
        for (let g = 0, C = d.length, x = C - 1; g < C; x = g++) {
          const M = d[x], S = d[g];
          if (Ht(h, p, M, S))
            return 0;
          s = Math.min(s, we(h, p, M, S, e));
        }
    }
  return s;
}
function qe(n, t, e, r, i, o) {
  if (!o)
    return;
  const s = ke(ne(r, o), i, e);
  s < t && n.push([s, o, [0, 0]]);
}
function kt(n, t, e, r, i, o, s) {
  if (!o || !s)
    return;
  const a = ke(ne(r, o), ne(i, s), e);
  a < t && n.push([a, o, s]);
}
function Et(n, t, e, r, i = 1 / 0) {
  let o = Math.min(r.distance(n[0], e[0][0]), i);
  if (o === 0)
    return o;
  const s = new fn([[0, [0, n.length - 1], [0, 0]]], pn), a = re(e);
  for (; s.length > 0; ) {
    const l = s.pop();
    if (l[0] >= o)
      continue;
    const u = l[1], c = t ? te : Qt;
    if (xt(u) <= c) {
      if (!H(u, n.length))
        return NaN;
      if (t) {
        const h = zr(n, u, e, r);
        if (isNaN(h) || h === 0)
          return h;
        o = Math.min(o, h);
      } else
        for (let h = u[0]; h <= u[1]; ++h) {
          const p = Br(n[h], e, r);
          if (o = Math.min(o, p), o === 0)
            return 0;
        }
    } else {
      const h = ee(u, t);
      qe(s, o, r, n, a, h[0]), qe(s, o, r, n, a, h[1]);
    }
  }
  return o;
}
function Mt(n, t, e, r, i, o = 1 / 0) {
  let s = Math.min(o, i.distance(n[0], e[0]));
  if (s === 0)
    return s;
  const a = new fn([[0, [0, n.length - 1], [0, e.length - 1]]], pn);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= s)
      continue;
    const u = l[1], c = l[2], h = t ? te : Qt, p = r ? te : Qt;
    if (xt(u) <= h && xt(c) <= p) {
      if (!H(u, n.length) && H(c, e.length))
        return NaN;
      let d;
      if (t && r)
        d = Ar(n, u, e, c, i), s = Math.min(s, d);
      else if (t && !r) {
        const g = n.slice(u[0], u[1] + 1);
        for (let C = c[0]; C <= c[1]; ++C)
          if (d = W(e[C], g, i), s = Math.min(s, d), s === 0)
            return s;
      } else if (!t && r) {
        const g = e.slice(c[0], c[1] + 1);
        for (let C = u[0]; C <= u[1]; ++C)
          if (d = W(n[C], g, i), s = Math.min(s, d), s === 0)
            return s;
      } else
        d = Dr(n, u, e, c, i), s = Math.min(s, d);
    } else {
      const d = ee(u, t), g = ee(c, r);
      kt(a, s, i, n, e, d[0], g[0]), kt(a, s, i, n, e, d[0], g[1]), kt(a, s, i, n, e, d[1], g[0]), kt(a, s, i, n, e, d[1], g[1]);
    }
  }
  return s;
}
function Fr(n, t) {
  const e = n.geometry(), r = e.flat().map((s) => ve([s.x, s.y], n.canonical));
  if (e.length === 0)
    return NaN;
  const i = new Ce(r[0][1]);
  let o = 1 / 0;
  for (const s of t) {
    switch (s.type) {
      case "Point":
        o = Math.min(o, Mt(r, !1, [s.coordinates], !1, i, o));
        break;
      case "LineString":
        o = Math.min(o, Mt(r, !1, s.coordinates, !0, i, o));
        break;
      case "Polygon":
        o = Math.min(o, Et(r, !1, s.coordinates, i, o));
        break;
    }
    if (o === 0)
      return o;
  }
  return o;
}
function jr(n, t) {
  const e = n.geometry(), r = e.flat().map((s) => ve([s.x, s.y], n.canonical));
  if (e.length === 0)
    return NaN;
  const i = new Ce(r[0][1]);
  let o = 1 / 0;
  for (const s of t) {
    switch (s.type) {
      case "Point":
        o = Math.min(o, Mt(r, !0, [s.coordinates], !1, i, o));
        break;
      case "LineString":
        o = Math.min(o, Mt(r, !0, s.coordinates, !0, i, o));
        break;
      case "Polygon":
        o = Math.min(o, Et(r, !0, s.coordinates, i, o));
        break;
    }
    if (o === 0)
      return o;
  }
  return o;
}
function Rr(n, t) {
  const e = n.geometry();
  if (e.length === 0 || e[0].length === 0)
    return NaN;
  const r = Gn(e).map((s) => s.map((a) => a.map((l) => ve([l.x, l.y], n.canonical)))), i = new Ce(r[0][0][0][1]);
  let o = 1 / 0;
  for (const s of t)
    for (const a of r) {
      switch (s.type) {
        case "Point":
          o = Math.min(o, Et([s.coordinates], !1, a, i, o));
          break;
        case "LineString":
          o = Math.min(o, Et(s.coordinates, !0, a, i, o));
          break;
        case "Polygon":
          o = Math.min(o, _r(a, s.coordinates, i, o));
          break;
      }
      if (o === 0)
        return o;
    }
  return o;
}
function Jt(n) {
  return n.type === "MultiPolygon" ? n.coordinates.map((t) => ({
    type: "Polygon",
    coordinates: t
  })) : n.type === "MultiLineString" ? n.coordinates.map((t) => ({
    type: "LineString",
    coordinates: t
  })) : n.type === "MultiPoint" ? n.coordinates.map((t) => ({
    type: "Point",
    coordinates: t
  })) : [n];
}
class Z {
  constructor(t, e) {
    this.type = f, this.geojson = t, this.geometries = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'distance' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (ct(t[1])) {
      const r = t[1];
      if (r.type === "FeatureCollection")
        return new Z(r, r.features.map((i) => Jt(i.geometry)).flat());
      if (r.type === "Feature")
        return new Z(r, Jt(r.geometry));
      if ("type" in r && "coordinates" in r)
        return new Z(r, Jt(r));
    }
    return e.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(t) {
    if (t.geometry() != null && t.canonicalID() != null) {
      if (t.geometryType() === "Point")
        return Fr(t, this.geometries);
      if (t.geometryType() === "LineString")
        return jr(t, this.geometries);
      if (t.geometryType() === "Polygon")
        return Rr(t, this.geometries);
    }
    return NaN;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const Pe = {
  // special forms
  "==": fr,
  "!=": pr,
  ">": gr,
  "<": dr,
  ">=": mr,
  "<=": yr,
  array: D,
  at: ce,
  boolean: D,
  case: pe,
  coalesce: ht,
  collator: Rt,
  format: ge,
  image: ye,
  in: he,
  "index-of": Pt,
  interpolate: A,
  "interpolate-hcl": A,
  "interpolate-lab": A,
  length: me,
  let: zt,
  literal: nt,
  match: fe,
  number: D,
  "number-format": de,
  object: D,
  slice: It,
  step: jt,
  string: D,
  "to-boolean": U,
  "to-color": U,
  "to-number": U,
  "to-string": U,
  var: _t,
  within: X,
  distance: Z
};
class B {
  constructor(t, e, r, i) {
    this.name = t, this.type = e, this._evaluate = r, this.args = i;
  }
  evaluate(t) {
    return this._evaluate(t, this.args);
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return !1;
  }
  static parse(t, e) {
    const r = t[0], i = B.definitions[r];
    if (!i)
      return e.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const o = Array.isArray(i) ? i[0] : i.type, s = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads, a = s.filter(([u]) => !Array.isArray(u) || // varags
    u.length === t.length - 1);
    let l = null;
    for (const [u, c] of a) {
      l = new Bt(e.registry, St, e.path, null, e.scope);
      const h = [];
      let p = !1;
      for (let d = 1; d < t.length; d++) {
        const g = t[d], C = Array.isArray(u) ? u[d - 1] : u.type, x = l.parse(g, 1 + h.length, C);
        if (!x) {
          p = !0;
          break;
        }
        h.push(x);
      }
      if (!p) {
        if (Array.isArray(u) && u.length !== h.length) {
          l.error(`Expected ${u.length} arguments, but found ${h.length} instead.`);
          continue;
        }
        for (let d = 0; d < h.length; d++) {
          const g = Array.isArray(u) ? u[d] : u.type, C = h[d];
          l.concat(d + 1).checkSubtype(g, C.type);
        }
        if (l.errors.length === 0)
          return new B(r, o, c, h);
      }
    }
    if (a.length === 1)
      e.errors.push(...l.errors);
    else {
      const c = (a.length ? a : s).map(([p]) => Or(p)).join(" | "), h = [];
      for (let p = 1; p < t.length; p++) {
        const d = e.parse(t[p], 1 + h.length);
        if (!d)
          return null;
        h.push(w(d.type));
      }
      e.error(`Expected arguments of type ${c}, but found (${h.join(", ")}) instead.`);
    }
    return null;
  }
  static register(t, e) {
    B.definitions = e;
    for (const r in e)
      t[r] = B;
  }
}
function Ve(n, [t, e, r, i]) {
  t = t.evaluate(n), e = e.evaluate(n), r = r.evaluate(n);
  const o = i ? i.evaluate(n) : 1, s = rn(t, e, r, o);
  if (s)
    throw new I(s);
  return new k(t / 255, e / 255, r / 255, o, !1);
}
function We(n, t) {
  return n in t;
}
function Kt(n, t) {
  const e = t[n];
  return typeof e > "u" ? null : e;
}
function Hr(n, t, e, r) {
  for (; e <= r; ) {
    const i = e + r >> 1;
    if (t[i] === n)
      return !0;
    t[i] > n ? r = i - 1 : e = i + 1;
  }
  return !1;
}
function V(n) {
  return { type: n };
}
B.register(Pe, {
  error: [
    Bn,
    [b],
    (n, [t]) => {
      throw new I(t.evaluate(n));
    }
  ],
  typeof: [
    b,
    [v],
    (n, [t]) => w(E(t.evaluate(n)))
  ],
  "to-rgba": [
    L(f, 4),
    [_],
    (n, [t]) => {
      const [e, r, i, o] = t.evaluate(n).rgb;
      return [e * 255, r * 255, i * 255, o];
    }
  ],
  rgb: [
    _,
    [f, f, f],
    Ve
  ],
  rgba: [
    _,
    [f, f, f, f],
    Ve
  ],
  has: {
    type: m,
    overloads: [
      [
        [b],
        (n, [t]) => We(t.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [t, e]) => We(t.evaluate(n), e.evaluate(n))
      ]
    ]
  },
  get: {
    type: v,
    overloads: [
      [
        [b],
        (n, [t]) => Kt(t.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [t, e]) => Kt(t.evaluate(n), e.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    v,
    [b],
    (n, [t]) => Kt(t.evaluate(n), n.featureState || {})
  ],
  properties: [
    Q,
    [],
    (n) => n.properties()
  ],
  "geometry-type": [
    b,
    [],
    (n) => n.geometryType()
  ],
  id: [
    v,
    [],
    (n) => n.id()
  ],
  zoom: [
    f,
    [],
    (n) => n.globals.zoom
  ],
  "heatmap-density": [
    f,
    [],
    (n) => n.globals.heatmapDensity || 0
  ],
  "line-progress": [
    f,
    [],
    (n) => n.globals.lineProgress || 0
  ],
  accumulated: [
    v,
    [],
    (n) => n.globals.accumulated === void 0 ? null : n.globals.accumulated
  ],
  "+": [
    f,
    V(f),
    (n, t) => {
      let e = 0;
      for (const r of t)
        e += r.evaluate(n);
      return e;
    }
  ],
  "*": [
    f,
    V(f),
    (n, t) => {
      let e = 1;
      for (const r of t)
        e *= r.evaluate(n);
      return e;
    }
  ],
  "-": {
    type: f,
    overloads: [
      [
        [f, f],
        (n, [t, e]) => t.evaluate(n) - e.evaluate(n)
      ],
      [
        [f],
        (n, [t]) => -t.evaluate(n)
      ]
    ]
  },
  "/": [
    f,
    [f, f],
    (n, [t, e]) => t.evaluate(n) / e.evaluate(n)
  ],
  "%": [
    f,
    [f, f],
    (n, [t, e]) => t.evaluate(n) % e.evaluate(n)
  ],
  ln2: [
    f,
    [],
    () => Math.LN2
  ],
  pi: [
    f,
    [],
    () => Math.PI
  ],
  e: [
    f,
    [],
    () => Math.E
  ],
  "^": [
    f,
    [f, f],
    (n, [t, e]) => Math.pow(t.evaluate(n), e.evaluate(n))
  ],
  sqrt: [
    f,
    [f],
    (n, [t]) => Math.sqrt(t.evaluate(n))
  ],
  log10: [
    f,
    [f],
    (n, [t]) => Math.log(t.evaluate(n)) / Math.LN10
  ],
  ln: [
    f,
    [f],
    (n, [t]) => Math.log(t.evaluate(n))
  ],
  log2: [
    f,
    [f],
    (n, [t]) => Math.log(t.evaluate(n)) / Math.LN2
  ],
  sin: [
    f,
    [f],
    (n, [t]) => Math.sin(t.evaluate(n))
  ],
  cos: [
    f,
    [f],
    (n, [t]) => Math.cos(t.evaluate(n))
  ],
  tan: [
    f,
    [f],
    (n, [t]) => Math.tan(t.evaluate(n))
  ],
  asin: [
    f,
    [f],
    (n, [t]) => Math.asin(t.evaluate(n))
  ],
  acos: [
    f,
    [f],
    (n, [t]) => Math.acos(t.evaluate(n))
  ],
  atan: [
    f,
    [f],
    (n, [t]) => Math.atan(t.evaluate(n))
  ],
  min: [
    f,
    V(f),
    (n, t) => Math.min(...t.map((e) => e.evaluate(n)))
  ],
  max: [
    f,
    V(f),
    (n, t) => Math.max(...t.map((e) => e.evaluate(n)))
  ],
  abs: [
    f,
    [f],
    (n, [t]) => Math.abs(t.evaluate(n))
  ],
  round: [
    f,
    [f],
    (n, [t]) => {
      const e = t.evaluate(n);
      return e < 0 ? -Math.round(-e) : Math.round(e);
    }
  ],
  floor: [
    f,
    [f],
    (n, [t]) => Math.floor(t.evaluate(n))
  ],
  ceil: [
    f,
    [f],
    (n, [t]) => Math.ceil(t.evaluate(n))
  ],
  "filter-==": [
    m,
    [b, v],
    (n, [t, e]) => n.properties()[t.value] === e.value
  ],
  "filter-id-==": [
    m,
    [v],
    (n, [t]) => n.id() === t.value
  ],
  "filter-type-==": [
    m,
    [b],
    (n, [t]) => n.geometryDollarType() === t.value
  ],
  "filter-<": [
    m,
    [b, v],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r < i;
    }
  ],
  "filter-id-<": [
    m,
    [v],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e < r;
    }
  ],
  "filter->": [
    m,
    [b, v],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r > i;
    }
  ],
  "filter-id->": [
    m,
    [v],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e > r;
    }
  ],
  "filter-<=": [
    m,
    [b, v],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r <= i;
    }
  ],
  "filter-id-<=": [
    m,
    [v],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e <= r;
    }
  ],
  "filter->=": [
    m,
    [b, v],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r >= i;
    }
  ],
  "filter-id->=": [
    m,
    [v],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e >= r;
    }
  ],
  "filter-has": [
    m,
    [v],
    (n, [t]) => t.value in n.properties()
  ],
  "filter-has-id": [
    m,
    [],
    (n) => n.id() !== null && n.id() !== void 0
  ],
  "filter-type-in": [
    m,
    [L(b)],
    (n, [t]) => t.value.indexOf(n.geometryDollarType()) >= 0
  ],
  "filter-id-in": [
    m,
    [L(v)],
    (n, [t]) => t.value.indexOf(n.id()) >= 0
  ],
  "filter-in-small": [
    m,
    [b, L(v)],
    // assumes v is an array literal
    (n, [t, e]) => e.value.indexOf(n.properties()[t.value]) >= 0
  ],
  "filter-in-large": [
    m,
    [b, L(v)],
    // assumes v is a array literal with values sorted in ascending order and of a single type
    (n, [t, e]) => Hr(n.properties()[t.value], e.value, 0, e.value.length - 1)
  ],
  all: {
    type: m,
    overloads: [
      [
        [m, m],
        (n, [t, e]) => t.evaluate(n) && e.evaluate(n)
      ],
      [
        V(m),
        (n, t) => {
          for (const e of t)
            if (!e.evaluate(n))
              return !1;
          return !0;
        }
      ]
    ]
  },
  any: {
    type: m,
    overloads: [
      [
        [m, m],
        (n, [t, e]) => t.evaluate(n) || e.evaluate(n)
      ],
      [
        V(m),
        (n, t) => {
          for (const e of t)
            if (e.evaluate(n))
              return !0;
          return !1;
        }
      ]
    ]
  },
  "!": [
    m,
    [m],
    (n, [t]) => !t.evaluate(n)
  ],
  "is-supported-script": [
    m,
    [b],
    // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
    (n, [t]) => {
      const e = n.globals && n.globals.isSupportedScript;
      return e ? e(t.evaluate(n)) : !0;
    }
  ],
  upcase: [
    b,
    [b],
    (n, [t]) => t.evaluate(n).toUpperCase()
  ],
  downcase: [
    b,
    [b],
    (n, [t]) => t.evaluate(n).toLowerCase()
  ],
  concat: [
    b,
    V(v),
    (n, t) => t.map((e) => st(e.evaluate(n))).join("")
  ],
  "resolved-locale": [
    b,
    [Nt],
    (n, [t]) => t.evaluate(n).resolvedLocale()
  ]
});
function Or(n) {
  return Array.isArray(n) ? `(${n.map(w).join(", ")})` : `(${w(n.type)}...)`;
}
function St(n) {
  if (n instanceof _t)
    return St(n.boundExpression);
  if (n instanceof B && n.name === "error")
    return !1;
  if (n instanceof Rt)
    return !1;
  if (n instanceof X)
    return !1;
  if (n instanceof Z)
    return !1;
  const t = n instanceof U || n instanceof D;
  let e = !0;
  return n.eachChild((r) => {
    t ? e = e && St(r) : e = e && r instanceof nt;
  }), e ? Ie(n) && Ee(n, ["zoom", "heatmap-density", "line-progress", "accumulated", "is-supported-script"]) : !1;
}
function Ie(n) {
  if (n instanceof B) {
    if (n.name === "get" && n.args.length === 1)
      return !1;
    if (n.name === "feature-state")
      return !1;
    if (n.name === "has" && n.args.length === 1)
      return !1;
    if (n.name === "properties" || n.name === "geometry-type" || n.name === "id")
      return !1;
    if (/^filter-/.test(n.name))
      return !1;
  }
  if (n instanceof X || n instanceof Z)
    return !1;
  let t = !0;
  return n.eachChild((e) => {
    t && !Ie(e) && (t = !1);
  }), t;
}
function xe(n) {
  if (n instanceof B && n.name === "feature-state")
    return !1;
  let t = !0;
  return n.eachChild((e) => {
    t && !xe(e) && (t = !1);
  }), t;
}
function Ee(n, t) {
  if (n instanceof B && t.indexOf(n.name) >= 0)
    return !1;
  let e = !0;
  return n.eachChild((r) => {
    e && !Ee(r, t) && (e = !1);
  }), e;
}
function ie(n) {
  return { result: "success", value: n };
}
function Y(n) {
  return { result: "error", value: n };
}
function Ur(n) {
  return n["property-type"] === "data-driven" || n["property-type"] === "cross-faded-data-driven";
}
function qr(n) {
  return !!n.expression && n.expression.parameters.indexOf("zoom") > -1;
}
function dn(n) {
  return !!n.expression && n.expression.interpolated;
}
function Me(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function gn(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Vr(n) {
  return n;
}
function yn(n, t) {
  const e = t.type === "color", r = n.stops && typeof n.stops[0][0] == "object", i = r || n.property !== void 0, o = r || !i, s = n.type || (dn(t) ? "exponential" : "interval");
  if (e || t.type === "padding") {
    const c = e ? k.parse : T.parse;
    n = Xe({}, n), n.stops && (n.stops = n.stops.map((h) => [h[0], c(h[1])])), n.default ? n.default = c(n.default) : n.default = c(t.default);
  }
  if (n.colorSpace && !Vn(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  let a, l, u;
  if (s === "exponential")
    a = Ge;
  else if (s === "interval")
    a = Gr;
  else if (s === "categorical") {
    a = Wr, l = /* @__PURE__ */ Object.create(null);
    for (const c of n.stops)
      l[c[0]] = c[1];
    u = typeof n.stops[0][0];
  } else if (s === "identity")
    a = Xr;
  else
    throw new Error(`Unknown function type "${s}"`);
  if (r) {
    const c = {}, h = [];
    for (let g = 0; g < n.stops.length; g++) {
      const C = n.stops[g], x = C[0].zoom;
      c[x] === void 0 && (c[x] = {
        zoom: x,
        type: n.type,
        property: n.property,
        default: n.default,
        stops: []
      }, h.push(x)), c[x].stops.push([C[0].value, C[1]]);
    }
    const p = [];
    for (const g of h)
      p.push([c[g].zoom, yn(c[g], t)]);
    const d = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: d,
      interpolationFactor: A.interpolationFactor.bind(void 0, d),
      zoomStops: p.map((g) => g[0]),
      evaluate({ zoom: g }, C) {
        return Ge({
          stops: p,
          base: n.base
        }, t, g).evaluate(g, C);
      }
    };
  } else if (o) {
    const c = s === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: c,
      interpolationFactor: A.interpolationFactor.bind(void 0, c),
      zoomStops: n.stops.map((h) => h[0]),
      evaluate: ({ zoom: h }) => a(n, t, h, l, u)
    };
  } else
    return {
      kind: "source",
      evaluate(c, h) {
        const p = h && h.properties ? h.properties[n.property] : void 0;
        return p === void 0 ? gt(n.default, t.default) : a(n, t, p, l, u);
      }
    };
}
function gt(n, t, e) {
  if (n !== void 0)
    return n;
  if (t !== void 0)
    return t;
  if (e !== void 0)
    return e;
}
function Wr(n, t, e, r, i) {
  const o = typeof e === i ? r[e] : void 0;
  return gt(o, n.default, t.default);
}
function Gr(n, t, e) {
  if (Me(e) !== "number")
    return gt(n.default, t.default);
  const r = n.stops.length;
  if (r === 1 || e <= n.stops[0][0])
    return n.stops[0][1];
  if (e >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const i = Ft(n.stops.map((o) => o[0]), e);
  return n.stops[i][1];
}
function Ge(n, t, e) {
  const r = n.base !== void 0 ? n.base : 1;
  if (Me(e) !== "number")
    return gt(n.default, t.default);
  const i = n.stops.length;
  if (i === 1 || e <= n.stops[0][0])
    return n.stops[0][1];
  if (e >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const o = Ft(n.stops.map((c) => c[0]), e), s = Zr(e, r, n.stops[o][0], n.stops[o + 1][0]), a = n.stops[o][1], l = n.stops[o + 1][1], u = tr[t.type] || Vr;
  return typeof a.evaluate == "function" ? {
    evaluate(...c) {
      const h = a.evaluate.apply(void 0, c), p = l.evaluate.apply(void 0, c);
      if (!(h === void 0 || p === void 0))
        return u(h, p, s, n.colorSpace);
    }
  } : u(a, l, s, n.colorSpace);
}
function Xr(n, t, e) {
  switch (t.type) {
    case "color":
      e = k.parse(e);
      break;
    case "formatted":
      e = F.fromString(e.toString());
      break;
    case "resolvedImage":
      e = O.fromString(e.toString());
      break;
    case "padding":
      e = T.parse(e);
      break;
    default:
      Me(e) !== t.type && (t.type !== "enum" || !t.values[e]) && (e = void 0);
  }
  return gt(e, n.default, t.default);
}
function Zr(n, t, e, r) {
  const i = r - e, o = n - e;
  return i === 0 ? 0 : t === 1 ? o / i : (Math.pow(t, o) - 1) / (Math.pow(t, i) - 1);
}
class mn {
  constructor(t, e) {
    this.expression = t, this._warningHistory = {}, this._evaluator = new sn(), this._defaultValue = e ? Qr(e) : null, this._enumValues = e && e.type === "enum" ? e.values : null;
  }
  evaluateWithoutErrorHandling(t, e, r, i, o, s) {
    return this._evaluator.globals = t, this._evaluator.feature = e, this._evaluator.featureState = r, this._evaluator.canonical = i, this._evaluator.availableImages = o || null, this._evaluator.formattedSection = s, this.expression.evaluate(this._evaluator);
  }
  evaluate(t, e, r, i, o, s) {
    this._evaluator.globals = t, this._evaluator.feature = e || null, this._evaluator.featureState = r || null, this._evaluator.canonical = i, this._evaluator.availableImages = o || null, this._evaluator.formattedSection = s || null;
    try {
      const a = this.expression.evaluate(this._evaluator);
      if (a == null || typeof a == "number" && a !== a)
        return this._defaultValue;
      if (this._enumValues && !(a in this._enumValues))
        throw new I(`Expected value to be one of ${Object.keys(this._enumValues).map((l) => JSON.stringify(l)).join(", ")}, but found ${JSON.stringify(a)} instead.`);
      return a;
    } catch (a) {
      return this._warningHistory[a.message] || (this._warningHistory[a.message] = !0, typeof console < "u" && console.warn(a.message)), this._defaultValue;
    }
  }
}
function vn(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in Pe;
}
function bn(n, t) {
  const e = new Bt(Pe, St, [], t ? Yr(t) : void 0), r = e.parse(n, void 0, void 0, void 0, t && t.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? ie(new mn(r, t)) : Y(e.errors);
}
class oe {
  constructor(t, e) {
    this.kind = t, this._styleExpression = e, this.isStateDependent = t !== "constant" && !xe(e.expression);
  }
  evaluateWithoutErrorHandling(t, e, r, i, o, s) {
    return this._styleExpression.evaluateWithoutErrorHandling(t, e, r, i, o, s);
  }
  evaluate(t, e, r, i, o, s) {
    return this._styleExpression.evaluate(t, e, r, i, o, s);
  }
}
class se {
  constructor(t, e, r, i) {
    this.kind = t, this.zoomStops = r, this._styleExpression = e, this.isStateDependent = t !== "camera" && !xe(e.expression), this.interpolationType = i;
  }
  evaluateWithoutErrorHandling(t, e, r, i, o, s) {
    return this._styleExpression.evaluateWithoutErrorHandling(t, e, r, i, o, s);
  }
  evaluate(t, e, r, i, o, s) {
    return this._styleExpression.evaluate(t, e, r, i, o, s);
  }
  interpolationFactor(t, e, r) {
    return this.interpolationType ? A.interpolationFactor(this.interpolationType, t, e, r) : 0;
  }
}
function Jr(n) {
  return n._styleExpression !== void 0;
}
function Cn(n, t) {
  const e = bn(n, t);
  if (e.result === "error")
    return e;
  const r = e.value.expression, i = Ie(r);
  if (!i && !Ur(t))
    return Y([new z("", "data expressions not supported")]);
  const o = Ee(r, ["zoom"]);
  if (!o && !qr(t))
    return Y([new z("", "zoom expressions not supported")]);
  const s = wt(r);
  if (!s && !o)
    return Y([new z("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
  if (s instanceof z)
    return Y([s]);
  if (s instanceof A && !dn(t))
    return Y([new z("", '"interpolate" expressions cannot be used with this property')]);
  if (!s)
    return ie(i ? new oe("constant", e.value) : new oe("source", e.value));
  const a = s instanceof A ? s.interpolation : void 0;
  return ie(i ? new se("camera", e.value, s.labels, a) : new se("composite", e.value, s.labels, a));
}
class Ot {
  constructor(t, e) {
    this._parameters = t, this._specification = e, Xe(this, yn(this._parameters, this._specification));
  }
  static deserialize(t) {
    return new Ot(t._parameters, t._specification);
  }
  static serialize(t) {
    return {
      _parameters: t._parameters,
      _specification: t._specification
    };
  }
}
function Kr(n, t) {
  if (gn(n))
    return new Ot(n, t);
  if (vn(n)) {
    const e = Cn(n, t);
    if (e.result === "error")
      throw new Error(e.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return e.value;
  } else {
    let e = n;
    return t.type === "color" && typeof n == "string" ? e = k.parse(n) : t.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? e = T.parse(n) : t.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? e = $.parse(n) : t.type === "projectionDefinition" && typeof n == "string" && (e = N.parse(n)), {
      kind: "constant",
      evaluate: () => e
    };
  }
}
function wt(n) {
  let t = null;
  if (n instanceof zt)
    t = wt(n.result);
  else if (n instanceof ht) {
    for (const e of n.args)
      if (t = wt(e), t)
        break;
  } else (n instanceof jt || n instanceof A) && n.input instanceof B && n.input.name === "zoom" && (t = n);
  return t instanceof z || n.eachChild((e) => {
    const r = wt(e);
    r instanceof z ? t = r : !t && r ? t = new z("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : t && r && t !== r && (t = new z("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), t;
}
function Yr(n) {
  const t = {
    color: _,
    string: b,
    number: f,
    enum: b,
    boolean: m,
    formatted: $t,
    padding: At,
    projectionDefinition: Lt,
    resolvedImage: pt,
    variableAnchorOffsetCollection: Dt
  };
  return n.type === "array" ? L(t[n.value] || v, n.length) : t[n.type];
}
function Qr(n) {
  return n.type === "color" && gn(n.default) ? new k(0, 0, 0, 0) : n.type === "color" ? k.parse(n.default) || null : n.type === "padding" ? T.parse(n.default) || null : n.type === "variableAnchorOffsetCollection" ? $.parse(n.default) || null : n.type === "projectionDefinition" ? N.parse(n.default) || null : n.default === void 0 ? null : n.default;
}
function kn(n) {
  if (n === !0 || n === !1)
    return !0;
  if (!Array.isArray(n) || n.length === 0)
    return !1;
  switch (n[0]) {
    case "has":
      return n.length >= 2 && n[1] !== "$id" && n[1] !== "$type";
    case "in":
      return n.length >= 3 && (typeof n[1] != "string" || Array.isArray(n[2]));
    case "!in":
    case "!has":
    case "none":
      return !1;
    case "==":
    case "!=":
    case ">":
    case ">=":
    case "<":
    case "<=":
      return n.length !== 3 || Array.isArray(n[1]) || Array.isArray(n[2]);
    case "any":
    case "all":
      for (const t of n.slice(1))
        if (!kn(t) && typeof t != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const ti = {
  StyleExpression: mn,
  StylePropertyFunction: Ot,
  ZoomConstantExpression: oe,
  ZoomDependentExpression: se,
  createExpression: bn,
  createPropertyExpression: Cn,
  isExpression: vn,
  isExpressionFilter: kn,
  isZoomExpression: Jr,
  normalizePropertyExpression: Kr
}, P = {
  // Color palette
  color: {
    text: "rgba(255, 255, 255, 1.0)",
    // General border
    border: "rgba(0, 36, 71, 0.4)",
    // General border
    borderLight: "#dee2e6",
    // Light border for fields
    background: "rgba(0, 36, 71, 0.6)",
    // Buttons and panel background unified
    hover: "rgba(0, 36, 71, 0.8)",
    // Hover state
    activeBackground: "rgba(0, 36, 71, 0.98)"
  },
  // Border radius
  radius: {
    sm: "3px",
    md: "4px",
    lg: "6px"
  },
  // Shadows
  shadow: {
    sm: "0 1px 2px rgba(0, 36, 71, 0.05)",
    md: "0 2px 4px rgba(0, 36, 71, 0.1)"
  },
  // Font
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
    size: "11px"
  }
}, wn = /* @__PURE__ */ new Set();
function ei(n) {
  n.style.setProperty("--rp-mctl-text", P.color.text), n.style.setProperty("--rp-mctl-background", P.color.background), n.style.setProperty("--rp-mctl-hover", P.color.hover), n.style.setProperty("--rp-mctl-border", P.color.border), n.style.setProperty("--rp-mctl-borderLight", P.color.borderLight), n.style.setProperty("--rp-mctl-radius-sm", P.radius.sm), n.style.setProperty("--rp-mctl-radius-md", P.radius.md), n.style.setProperty("--rp-mctl-radius-lg", P.radius.lg), n.style.setProperty("--rp-mctl-shadow-sm", P.shadow.sm), n.style.setProperty("--rp-mctl-shadow-md", P.shadow.md), n.style.setProperty("--rp-mctl-font-family", P.font.family), n.style.setProperty("--rp-mctl-font-size", P.font.size);
}
function ni(n) {
  wn.add(n), ei(n);
}
function ri(n) {
  wn.delete(n);
}
const ii = {
  backgroundColor: "transparent",
  padding: "5px",
  border: "transparent",
  boxShadow: "none",
  borderRadius: P.radius.md,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontFamily: P.font.family,
  fontSize: P.font.size,
  color: P.color.text
};
function Se(n, t = {}) {
  Object.assign(n.style, ii), n.classList.add("maplibregl-ctrl", "maplibregl-ctrl-group"), t.classNames && t.classNames.forEach((e) => n.classList.add(e));
}
const oi = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 6px",
  border: "none",
  cursor: "pointer",
  borderRadius: P.radius.md,
  width: "fit-content",
  color: P.color.text,
  backgroundColor: P.color.background,
  fontSize: P.font.size,
  whiteSpace: "nowrap"
}, at = {
  iconWidth: 20,
  btnPaddingX: 6,
  btnGap: 4,
  smallScreenThreshold: 768,
  minFontSize: 10,
  maxFontSize: 16,
  scalingFactor: 0.5
}, et = /* @__PURE__ */ new Map();
function Pn(n, t) {
  et.has(n) || et.set(n, /* @__PURE__ */ new Map());
  const e = et.get(n);
  t.forEach((r, i) => {
    e == null || e.set(i, r);
  });
}
function In(n, t) {
  const e = et.get(n);
  e && (Object.entries(t).forEach(([r]) => {
    e.delete(r);
  }), e.size === 0 && et.delete(n));
}
function xn(n) {
  const t = document.createElement("button");
  if (Object.assign(t.style, oi), n.backgroundColor && (t.style.backgroundColor = n.backgroundColor), n.className && (t.className = n.className), n.title && (t.title = n.title), n.onClick && (t.onclick = n.onClick), n.icon)
    if (typeof n.icon == "string") {
      const r = document.createElement("div");
      r.innerHTML = n.icon, t.appendChild(r);
    } else
      t.appendChild(n.icon);
  const e = document.createElement("span");
  return e.textContent = n.label, e.style.fontSize = P.font.size, e.style.color = "inherit", t.appendChild(e), t;
}
function si(n, t, e = 20) {
  const r = document.createElement("img");
  return r.src = `data:image/svg+xml,${encodeURIComponent(n)}`, r.alt = t, r.style.width = `${e}px`, r.style.height = `${e}px`, r.style.color = "white", r;
}
function ai(n) {
  return n.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function li(n, t, e = at.maxFontSize, r = at.minFontSize) {
  const { iconWidth: i, btnPaddingX: o, btnGap: s, scalingFactor: a } = at, l = n - i - o * 2 - s, u = t.replace(/<[^>]+>/g, "").length;
  if (u === 0) return r;
  let c = Math.floor(l / (u * a));
  return c = Math.min(e, Math.max(r, c)), c;
}
function En(n, t) {
  const e = et.get(n);
  if (!e || e.size === 0) return;
  const r = Array.from(e.values()), { smallScreenThreshold: i } = at, o = t < i;
  r.forEach((l) => {
    const u = l.querySelector("span");
    u && (u.style.display = o ? "none" : "inline"), l.style.width = "fit-content";
  });
  const s = Math.max(...r.map((l) => l.offsetWidth)), a = o ? "34px" : `${s}px`;
  if (r.forEach((l) => {
    l.style.width = a;
  }), !o) {
    const l = r.map((c) => {
      const h = c.querySelector("span");
      return !h || !h.textContent ? null : [h, li(s, h.textContent)];
    }).filter((c) => !!c), u = Math.max(
      at.minFontSize,
      Math.min(...l.map(([, c]) => c))
    );
    l.forEach(([c]) => {
      c.style.fontSize = `${u}px`;
    });
  }
}
function ui(n, t, e) {
  const r = n.offsetWidth, i = n.offsetHeight;
  let o = 10, s = 10, a = Math.max(
    0,
    parseFloat(
      getComputedStyle(n).getPropertyValue("env(safe-area-inset-left)") || "0"
    )
  ), l = Math.max(
    0,
    parseFloat(
      getComputedStyle(n).getPropertyValue("env(safe-area-inset-right)") || "0"
    )
  ), u = a, c = l;
  r >= 480 && (o = 15, s = 15, u = Math.max(15, a), c = Math.max(15, l)), i >= 992 && (o = 40, s = 40), r >= 992 && (u = Math.max(40, a), c = Math.max(40, l)), t != null && t.endsWith("left") ? (u = u, c = l) : (u = a, c = c);
  const h = e == null ? void 0 : e.margin, p = e == null ? void 0 : e.marginTop, d = e == null ? void 0 : e.marginBottom, g = e == null ? void 0 : e.marginLeft, C = e == null ? void 0 : e.marginRight;
  return {
    marginTop: h || p ? null : o,
    marginBottom: h || d ? null : s,
    marginLeft: h || g ? null : u,
    marginRight: h || C ? null : c
  };
}
function Ut(n, t, e, r) {
  const { marginTop: i, marginBottom: o, marginLeft: s, marginRight: a } = ui(t, e, r);
  i !== null && (n.style.marginTop = `${i}px`), o !== null && (n.style.marginBottom = `${o}px`), s !== null && (n.style.marginLeft = `${s}px`), a !== null && (n.style.marginRight = `${a}px`);
}
class fi {
  constructor(t, e) {
    y(this, "map");
    y(this, "options");
    y(this, "colorSteps");
    y(this, "container");
    y(this, "outContainer");
    y(this, "titleDiv");
    y(this, "unitDiv");
    y(this, "legendItems", []);
    y(this, "colorPickerInput", null);
    y(this, "nativeColorPickerInput", null);
    y(this, "colorPickerPopover", null);
    y(this, "nativeColorPickerOpen", !1);
    y(this, "colorPickerOutsidePointerDownHandler", null);
    y(this, "colorPickerEscapeKeyHandler", null);
    y(this, "resetButton", null);
    y(this, "paletteSelect", null);
    y(this, "customColors", {});
    y(this, "propertySpec");
    // Handler for container click events
    y(this, "handleContainerClick", (t) => {
      const e = t.target;
      if (e.matches(".map_colorbar_color_box")) {
        t.stopPropagation();
        const r = e.dataset.speed;
        r && this.showColorPicker(parseFloat(r), e);
        return;
      }
      this.options.onClick && this.options.onClick(t, this, this.options);
    });
    y(this, "closeColorPicker", () => {
      if (!this.colorPickerInput) return;
      const t = this.colorPickerInput;
      t.removeAttribute("data-picker-open"), t.removeAttribute("data-speed"), this.nativeColorPickerInput && (this.nativeColorPickerInput.removeAttribute("data-speed"), this.nativeColorPickerInput.style.zIndex = "-1"), this.nativeColorPickerOpen = !1, this.colorPickerPopover && (this.colorPickerPopover.style.display = "none"), this.colorPickerOutsidePointerDownHandler && (document.removeEventListener("pointerdown", this.colorPickerOutsidePointerDownHandler, !0), this.colorPickerOutsidePointerDownHandler = null), this.colorPickerEscapeKeyHandler && (document.removeEventListener("keydown", this.colorPickerEscapeKeyHandler, !0), this.colorPickerEscapeKeyHandler = null);
    });
    // Handle color input changes
    y(this, "handleColorInputChange", (t) => {
      const e = t.target, r = e.dataset.speed;
      if (!r) return;
      const i = parseFloat(r), o = e.value;
      this.customColors[r] = o, this.colorPickerInput && (this.colorPickerInput.value = o), this.updateSingleColorUI(i, o), this.updateResetButtonVisibility(), this.options.onColorChange && this.options.onColorChange(i, o, this);
    });
    t ? this.propertySpec = t : this.propertySpec = {
      "fill-color": {
        default: [
          "step",
          ["get", "speed"],
          "#ff3f00",
          // Default color for speed < 0.10
          0.1,
          "#ff7e00",
          0.15,
          "#ffbe00",
          0.2,
          "#fffd00",
          0.25,
          "#c0ff00",
          0.3,
          "#81ff00",
          0.35,
          "#41ff00",
          0.4,
          "#02ff00",
          0.45,
          "#00ff3d",
          0.5,
          "#00ff7c",
          0.55,
          "#00ffbc",
          0.6,
          "#00fffb",
          0.65,
          "#00c2ff",
          0.7,
          "#0083ff",
          0.75,
          "#0043ff",
          0.8,
          "#0004ff",
          0.85,
          "#3b00ff",
          0.9,
          "#7a00ff",
          0.95,
          "#ba00ff",
          0.98,
          "#f900ff",
          1,
          "#f900ff"
        ],
        doc: "The color of each pixel of this layer",
        expression: {
          interpolated: !0,
          parameters: ["zoom", "feature"]
        },
        "property-type": "data-driven"
      },
      "fill-opacity": {
        type: "number",
        default: 0.5,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ["zoom"]
        },
        "property-type": "data-constant"
      }
    }, this.options = {
      position: "top-left",
      width: "50px",
      // Default width
      height: "272px",
      // Default width
      max: 30,
      // Default max
      decimal: 1,
      // Default max
      tickMinStep: 0,
      // Default tick value
      ...e
      // Override with user-provided options
    }, this.colorSteps = this.getColorSteps();
    const { outContainer: r, innerContainer: i } = this.createContainer();
    this.outContainer = r, this.container = i, this.titleDiv = this.createTitleDiv(this.options.title), this.unitDiv = this.createUnitDiv(this.options.unit), this.container.appendChild(this.titleDiv), this.paletteSelect = this.createPaletteSelect(), this.paletteSelect && this.container.appendChild(this.paletteSelect), this.container.appendChild(this.unitDiv), this.resetButton = this.createResetButton(), this.container.appendChild(this.resetButton), this.container.addEventListener("click", this.handleContainerClick), this.options.style && Object.assign(this.container.style, this.options.style);
  }
  getTickMinStep() {
    return this.options.tickMinStep || 0;
  }
  getDisplaySteps() {
    return [...this.colorSteps].reverse();
  }
  getWidth() {
    return this.options.width || "52px";
  }
  getHeight() {
    return this.options.height || "272px";
  }
  getHeightInPixels() {
    const t = this.getHeight();
    if (t.endsWith("px"))
      return parseFloat(t);
    if (t.endsWith("%")) {
      const e = this.outContainer.offsetHeight, r = parseFloat(t) / 100;
      return e * r;
    }
    return 272;
  }
  createContainer() {
    var i;
    const t = document.createElement("div");
    Se(t, {
      classNames: ["maplibregl-ctrl"]
    }), t.style.height = "100%", t.style.display = "flex", t.style.flexDirection = "column", t.style.alignItems = "center", t.style.backgroundColor = "transparent", t.style.pointerEvents = "none", t.style.margin = "0";
    const e = (i = this.options.position) != null && i.endsWith("left") ? "map-colorbar-left-group" : "map-colorbar-right-group", r = document.createElement("div");
    return r.classList.add(e), r.classList.add("rp-colorBar"), r.style.width = this.getWidth(), r.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`, r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.display = "flex", r.style.flexDirection = "column", r.style.borderRadius = "10px", r.style.pointerEvents = "auto", t.appendChild(r), { outContainer: t, innerContainer: r };
  }
  createTitleDiv(t) {
    const e = document.createElement("div");
    return e.classList.add("map_colorbar_title"), e.innerHTML = t, e.style.marginTop = "6px", e.style.marginBottom = "8px", e.style.display = "flex", e.style.justifyContent = "center", e.style.textAlign = "center", e.style.fontSize = "11px", e.style.lineHeight = "14px", e.style.color = "white", e.style.width = this.getWidth(), e;
  }
  createUnitDiv(t) {
    const e = document.createElement("div");
    return e.classList.add("map_colorbar_unit"), e.innerHTML = `(${t})`, e.style.marginTop = "8px", e.style.width = this.getWidth(), e.style.display = "flex", e.style.justifyContent = "center", e.style.color = "white", e.style.fontSize = "12px", e.style.textAlign = "center", e;
  }
  createPaletteSelect() {
    if (!this.options.palettes || this.options.palettes.length <= 1)
      return null;
    const t = document.createElement("select");
    return t.classList.add("map_colorbar_palette_select"), t.style.cssText = `
      margin: 0 4px 6px 4px;
      width: calc(100% - 8px);
      height: 20px;
      border: 0;
      background: transparent;
      color: white;
      font-size: 10px;
      outline: none;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      padding-right: 14px;
      background-image: linear-gradient(45deg, transparent 50%, white 50%), linear-gradient(135deg, white 50%, transparent 50%);
      background-position: calc(100% - 8px) 8px, calc(100% - 3px) 8px;
      background-size: 5px 5px, 5px 5px;
      background-repeat: no-repeat;
    `, this.options.palettes.forEach((e) => {
      const r = document.createElement("option");
      r.value = e.id, r.textContent = e.label, t.appendChild(r);
    }), this.options.activePaletteId && (t.value = this.options.activePaletteId), t.addEventListener("click", (e) => e.stopPropagation()), t.addEventListener("change", (e) => {
      e.stopPropagation(), this.options.onPaletteChange && this.options.onPaletteChange(t.value, this);
    }), t;
  }
  createColorBox(t, e) {
    const r = document.createElement("div");
    return r.classList.add("map_colorbar_color_box"), r.style.width = "12px", r.style.backgroundColor = t, r.dataset.speed = e.toString(), r;
  }
  createLabel(t) {
    const e = document.createElement("div");
    return e.classList.add("map_colorbar_label"), e.style.marginTop = "0px", e.style.marginLeft = "0px", e.style.marginRight = "2px", e.style.color = "white", e.style.fontSize = "9px", e.textContent = "", e;
  }
  initializeLegendItems() {
    this.getDisplaySteps().forEach(({ speed: t, color: e }) => {
      const r = document.createElement("div");
      r.classList.add("map_colorbar_item"), r.style.display = "flex", r.style.alignItems = "center", r.style.marginBottom = "0px", r.style.marginTop = "0px", r.style.marginLeft = "10px";
      const i = this.createColorBox(e, t), o = this.createLabel({ speed: t, color: e });
      r.appendChild(i), r.appendChild(o), this.legendItems.push(r), this.container.insertBefore(r, this.unitDiv);
    });
  }
  resetLegendItems() {
    this.legendItems.forEach((t) => t.remove()), this.legendItems = [], this.initializeLegendItems();
  }
  calculateHeights() {
    const t = this.getHeightInPixels(), i = (this.container.getBoundingClientRect().height ? this.container.getBoundingClientRect().height : t) - this.titleDiv.offsetHeight - this.unitDiv.offsetHeight - 22;
    return { stepHeight: Math.max(Math.floor(i / this.colorSteps.length), 5) };
  }
  update() {
    this.updateInnerContainerStyle(this.outContainer, this.container);
    const { stepHeight: t } = this.calculateHeights(), e = this.getDisplaySteps();
    let r = null;
    this.legendItems.forEach((i, o) => {
      const s = i.querySelector(".map_colorbar_color_box"), a = i.querySelector(".map_colorbar_label"), l = e[o];
      if (!l) {
        a.textContent = "";
        return;
      }
      const u = o === 0 ? t + 3 : t;
      i.style.height = `${t}px`, s.style.height = `${u}px`, a.style.marginTop = `${t}px`;
      const c = l.speed, h = o % 2 === 0, p = r === null || Math.abs(r - c) >= this.getTickMinStep();
      if (h && p) {
        a.textContent = `- ${c.toFixed(this.options.decimal)}`, r = c;
        return;
      }
      a.textContent = "";
    });
  }
  onAdd(t) {
    return this.map = t, t.getContainer().appendChild(this.outContainer), this.initializeLegendItems(), this.update(), this.map.once("styledata", () => {
      this.refresh();
    }), this.map.on("resize", () => {
      this.update();
    }), this.outContainer;
  }
  onRemove() {
    var t;
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), this.closeColorPicker(), (t = this.outContainer.parentNode) == null || t.removeChild(this.outContainer), this.colorPickerInput && this.colorPickerInput.parentNode && this.colorPickerInput.parentNode.removeChild(this.colorPickerInput), this.colorPickerPopover && this.colorPickerPopover.parentNode && this.colorPickerPopover.parentNode.removeChild(this.colorPickerPopover), this.nativeColorPickerInput && this.nativeColorPickerInput.parentNode && this.nativeColorPickerInput.parentNode.removeChild(this.nativeColorPickerInput), this.map = void 0;
  }
  refresh() {
  }
  getPosition() {
    return this.options.position || "top-left";
  }
  /**
   * Updates the options and refreshes the control
   * @param newOptions Partial options to update
   */
  updateOptions(t) {
    const e = { ...this.options };
    if (this.options = { ...this.options, ...t }, t.max !== void 0 && t.tickMinStep, t.title !== void 0 && (this.titleDiv.innerHTML = t.title), t.unit !== void 0 && (this.unitDiv.innerHTML = `(${t.unit})`), t.activePaletteId !== void 0 && this.paletteSelect && (this.paletteSelect.value = t.activePaletteId), (t.width !== void 0 || t.height !== void 0) && (this.container.style.width = this.getWidth(), this.container.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`), t.max !== void 0) {
      if (t.tickMinStep === void 0) {
        const r = e.tickMinStep ?? 0, i = e.max ?? 30;
        this.options.tickMinStep = r * t.max / i;
      }
      this.colorSteps = this.getColorSteps(), this.resetLegendItems();
    }
    t.onClick !== void 0 && this.container.removeEventListener("click", this.handleContainerClick), this.update();
  }
  updatePalette(t, e = {}) {
    this.propertySpec = t, this.customColors = {}, this.options = { ...this.options, ...e }, this.colorSteps = this.getColorSteps(), e.title !== void 0 && (this.titleDiv.innerHTML = e.title), e.unit !== void 0 && (this.unitDiv.innerHTML = `(${e.unit})`), this.paletteSelect && e.activePaletteId && (this.paletteSelect.value = e.activePaletteId), this.resetLegendItems(), this.updateResetButtonVisibility(), this.update();
  }
  getOptions() {
    return this.options;
  }
  getMap() {
    return this.map;
  }
  updateInnerContainerStyle(t, e) {
    var o;
    if (!this.map)
      return;
    const r = this.map.getContainer(), i = r.offsetHeight;
    t.style.height = `${i}px`, Ut(
      e,
      r,
      this.options.position || "top-left",
      (o = this.options) == null ? void 0 : o.style
    ), e.style.alignItems = "flex-start", e.style.display = "flex", e.style.height = `calc(min((100% - 50px), ${this.getHeight()}))`;
  }
  /**
   * Parses the "fill-color" property and extracts speed-to-color mappings.
   * @returns An array of speed thresholds and their corresponding colors.
   */
  getColorSteps() {
    var l;
    const t = this.propertySpec["fill-color"];
    if (!t)
      throw new Error("Missing 'fill-color' specification.");
    const e = t.default || t;
    if (e[0] !== "step")
      throw new Error("Only 'step' expressions are supported.");
    const i = [], [, , o, ...s] = e, a = ((l = this.options) == null ? void 0 : l.max) || 30;
    i.push({ speed: 0, color: o });
    for (let u = 0; u < s.length; u += 2) {
      const h = s[u] * a, p = s[u + 1];
      i.push({ speed: h, color: p });
    }
    return i.sort((u, c) => u.speed - c.speed);
  }
  createColorPickerInput() {
    const t = document.createElement("input");
    return t.type = "color", t.classList.add("map_colorbar_picker_input"), t.style.cssText = `
      display: block;
      width: 100%;
      height: 26px;
      padding: 0;
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      box-sizing: border-box;
      overflow: hidden;
    `, t.addEventListener("pointerdown", (e) => {
      e.preventDefault(), e.stopPropagation();
    }), t.addEventListener("click", (e) => {
      e.preventDefault(), e.stopPropagation(), this.toggleNativeColorPicker();
    }), t;
  }
  createNativeColorPickerInput() {
    const t = document.createElement("input");
    return t.type = "color", t.classList.add("map_colorbar_picker_native_input"), t.style.cssText = `
      position: fixed;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
    `, document.body.appendChild(t), t;
  }
  createColorPickerPopover() {
    const t = document.createElement("div");
    t.classList.add("map_colorbar_picker_popover"), t.style.cssText = `
      position: fixed;
      display: none;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      border-radius: 8px;
      background: rgba(0, 36, 71, 0.92);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
      z-index: 9998;
      pointer-events: auto;
    `, this.colorPickerInput || (this.colorPickerInput = this.createColorPickerInput()), this.nativeColorPickerInput || (this.nativeColorPickerInput = this.createNativeColorPickerInput()), t.appendChild(this.colorPickerInput);
    const e = document.createElement("div");
    e.classList.add("map_colorbar_picker_actions"), e.style.cssText = `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 6px;
      width: 100%;
    `;
    const r = this.createPickerActionButton("Reset");
    r.classList.add("map_colorbar_picker_reset_current"), r.addEventListener("click", (o) => {
      o.stopPropagation();
      const s = this.getActivePickerSpeed();
      if (s === null)
        return;
      this.options.onResetColor && this.options.onResetColor(s, this);
      const a = this.getDefaultColorForSpeed(s);
      this.resetSingleColor(s), a && this.colorPickerInput && (this.colorPickerInput.value = a), a && this.nativeColorPickerInput && (this.nativeColorPickerInput.value = a), this.closeColorPicker();
    });
    const i = this.createPickerActionButton("Restore");
    return i.classList.add("map_colorbar_picker_restore_mode"), i.addEventListener("click", (o) => {
      o.stopPropagation(), this.options.onReset && this.options.onReset(this), this.closeColorPicker();
    }), e.appendChild(i), e.appendChild(r), t.appendChild(e), document.body.appendChild(t), t;
  }
  createPickerActionButton(t) {
    const e = document.createElement("button");
    return e.type = "button", e.textContent = t, e.style.cssText = `
      appearance: none;
      color: white;
      font-size: 10px;
      line-height: 14px;
      padding: 4px;
      flex: 1;
      cursor: pointer;
    `, e.addEventListener("mouseenter", () => {
      e.style.background = "rgba(255, 255, 255, 0.08)";
    }), e;
  }
  getColorPickerPopover() {
    return this.colorPickerPopover || (this.colorPickerPopover = this.createColorPickerPopover()), this.colorPickerPopover;
  }
  getActivePickerSpeed() {
    if (!this.colorPickerInput)
      return null;
    const t = this.colorPickerInput.dataset.speed;
    if (!t)
      return null;
    const e = parseFloat(t);
    return Number.isFinite(e) ? e : null;
  }
  getDefaultColorForSpeed(t) {
    var e;
    return (e = this.colorSteps.find((r) => r.speed === t)) == null ? void 0 : e.color;
  }
  toggleNativeColorPicker() {
    const t = this.colorPickerInput, e = this.nativeColorPickerInput, r = this.colorPickerPopover;
    if (!t || !e || !r)
      return;
    if (this.nativeColorPickerOpen) {
      const o = e.dataset.speed, s = e.value;
      e.remove(), this.nativeColorPickerInput = this.createNativeColorPickerInput(), o && (this.nativeColorPickerInput.dataset.speed = o), this.nativeColorPickerInput.value = s, this.nativeColorPickerInput.style.left = e.style.left, this.nativeColorPickerInput.style.top = e.style.top, this.nativeColorPickerInput.style.zIndex = "-1", this.nativeColorPickerInput.removeEventListener("input", this.handleColorInputChange), this.nativeColorPickerInput.removeEventListener("change", this.handleColorInputChange), this.nativeColorPickerInput.addEventListener("input", this.handleColorInputChange), this.nativeColorPickerInput.addEventListener("change", this.handleColorInputChange), this.nativeColorPickerOpen = !1, t.focus({ preventScroll: !0 });
      return;
    }
    e.style.left = `${r.offsetLeft + r.offsetWidth + 12}px`, e.style.top = `${r.offsetTop + 8}px`, e.style.zIndex = "9999", e.removeEventListener("input", this.handleColorInputChange), e.removeEventListener("change", this.handleColorInputChange), e.addEventListener("input", this.handleColorInputChange), e.addEventListener("change", this.handleColorInputChange), this.nativeColorPickerOpen = !0;
    const i = e;
    try {
      typeof i.showPicker == "function" ? i.showPicker() : e.click();
    } catch {
      e.click();
    }
  }
  // Show the color picker at the specified position
  showColorPicker(t, e) {
    this.closeColorPicker();
    const r = this.getColorPickerPopover(), i = this.colorPickerInput, o = this.nativeColorPickerInput;
    if (!i || !o)
      return;
    const s = this.colorSteps.find((c) => c.speed === t), a = e.getBoundingClientRect(), l = a.top + a.height / 2 - 28, u = a.right + 8;
    i.value = this.customColors[String(t)] || (s == null ? void 0 : s.color) || "#ffffff", i.dataset.speed = t.toString(), r.style.left = `${u}px`, r.style.top = `${l}px`, r.style.display = "flex", o.value = i.value, o.dataset.speed = t.toString(), o.style.left = `${u + r.offsetWidth + 12}px`, o.style.top = `${l + 8}px`, o.style.zIndex = "-1", this.nativeColorPickerOpen = !1, this.colorPickerOutsidePointerDownHandler = (c) => {
      c.target instanceof Node && !r.contains(c.target) && this.closeColorPicker();
    }, this.colorPickerEscapeKeyHandler = (c) => {
      c.key === "Escape" && this.closeColorPicker();
    }, document.addEventListener("pointerdown", this.colorPickerOutsidePointerDownHandler, !0), document.addEventListener("keydown", this.colorPickerEscapeKeyHandler, !0), i.focus({ preventScroll: !0 });
  }
  // Update a single color box UI
  updateSingleColorUI(t, e) {
    const r = this.legendItems.find((i) => {
      const o = i.querySelector(".map_colorbar_color_box");
      return o && parseFloat(o.dataset.speed || "0") === t;
    });
    if (r) {
      const i = r.querySelector(".map_colorbar_color_box");
      i && (i.style.backgroundColor = e);
    }
  }
  resetSingleColor(t) {
    delete this.customColors[String(t)];
    const e = this.getDefaultColorForSpeed(t);
    e && this.updateSingleColorUI(t, e), this.updateResetButtonVisibility();
  }
  // Create the reset button
  createResetButton() {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_reset"), t.innerHTML = "restore", t.style.cssText = `
      width: 100%;
      display: none;
      justify-content: center;
      color: white;
      font-size: 10px;
      text-align: center;
      cursor: pointer;
      text-decoration: underline;
    `, t.addEventListener("mouseenter", () => {
      t.style.color = "#87ceeb";
    }), t.addEventListener("mouseleave", () => {
      t.style.color = "white";
    }), t.addEventListener("click", (e) => {
      e.stopPropagation(), this.options.onReset && this.options.onReset(this);
    }), t;
  }
  // Update reset button visibility
  updateResetButtonVisibility() {
    this.resetButton && (this.resetButton.style.display = "none");
  }
  // Set custom colors directly (e.g., from localStorage restoration)
  setCustomColors(t) {
    this.customColors = { ...t }, this.updateResetButtonVisibility();
  }
  // Reset colors to default
  resetColors(t) {
    this.customColors = {}, this.getDisplaySteps().forEach(({ speed: e, color: r }) => {
      var o;
      const i = ((o = t.find(([s]) => s === e)) == null ? void 0 : o[1]) ?? r;
      this.updateSingleColorUI(e, i);
    }), this.updateResetButtonVisibility(), this.update();
  }
  /**
   * Sets a property using a Mapbox style expression.
   * @param prop The property name.
   * @param value The Mapbox style expression.
   */
  setProperty(t, e) {
    const r = this.propertySpec[t];
    if (!r)
      throw new Error(`Property "${t}" is not defined in the specification.`);
    const i = ti.createPropertyExpression(e, r);
    if (i.result === "success")
      switch (i.value.kind) {
        case "camera":
        case "composite":
          console.log(`Camera/composite expression set for property "${t}"`);
          break;
        default:
          console.log(`Property "${t}" set with value`, i.value);
          break;
      }
    else
      throw new Error(`Invalid expression for property "${t}": ${i.value}`);
  }
}
class pi {
  constructor(t) {
    y(this, "map");
    y(this, "options");
    y(this, "container");
    this.options = {
      position: "top-left",
      width: "146px",
      // Default width
      height: "24px",
      // Default width
      ...t
      // Override with user-provided options
    }, this.container = this.createContainer();
  }
  getWidth() {
    return this.options.width || "146px";
  }
  getHeight() {
    return this.options.height || "24px";
  }
  // Create the control's container element
  createContainer() {
    const t = document.createElement("div");
    return t.className = "maplibregl-ctrl maplibregl-ctrl-msg", this.options.innerClassName && t.classList.add(this.options.innerClassName), t.style.width = this.getWidth(), t.style.height = this.getHeight(), t.style.backgroundColor = "rgba(0, 36, 71, 0.7)", t.style.padding = "5px 10px", t.style.borderRadius = "3px", t.style.fontFamily = "Arial, sans-serif", t.style.fontSize = "14px", this.options.innerHTML ? t.innerHTML = this.options.innerHTML : this.options.msg && (t.textContent = this.options.msg), this.options.style && Object.assign(t.style, this.options.style), t;
  }
  updateInnerContainerStyle() {
    if (!this.map)
      return;
    const t = this.map.getContainer(), e = this.options.position || "top-left";
    Ut(this.container, t, e, this.options.style);
  }
  update() {
    this.updateInnerContainerStyle();
  }
  onAdd(t) {
    return this.map = t, t.getContainer().appendChild(this.container), this.update(), this.map.once("styledata", () => {
      this.refresh();
    }), this.map.on("resize", () => {
      this.update();
    }), this.container;
  }
  onRemove() {
    var t;
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), (t = this.container.parentNode) == null || t.removeChild(this.container), this.map = void 0;
  }
  refresh() {
  }
  // Update the control's styles dynamically
  updateStyle(t) {
    this.container && Object.assign(this.container.style, t);
  }
  // Update the control's content dynamically, with an option to specify if it's HTML
  updateContent(t, e = !1) {
    this.container && (e ? this.container.innerHTML = t : this.container.textContent = t);
  }
  getPosition() {
    return this.options.position || "top-left";
  }
}
class di {
  constructor(t) {
    y(this, "map");
    y(this, "container");
    y(this, "options");
    y(this, "defaultActiveId");
    y(this, "activeButtonId", null);
    y(this, "buttons", /* @__PURE__ */ new Map());
    y(this, "instanceId");
    y(this, "listeners", {
      toggle: /* @__PURE__ */ new Set(),
      untoggle: /* @__PURE__ */ new Set()
    });
    this.options = t, this.instanceId = this.generateInstanceId(), this.container = this.createContainer(), this.defaultActiveId = this.options.defaultActive;
  }
  /**
   * Generate a unique instance ID for this control
   * @returns Unique identifier string
   */
  generateInstanceId() {
    return `togglectl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  on(t, e) {
    this.listeners[t].add(e);
  }
  off(t, e) {
    this.listeners[t].delete(e);
  }
  emit(t) {
    for (const e of this.listeners[t])
      try {
        e(this);
      } catch (r) {
        console.error(`[ToggleCtl] error in ${t} listener`, r);
      }
  }
  // Create the container for the control
  createContainer() {
    const t = document.createElement("div");
    return t.id = this.instanceId, Se(t), this.options.innerClassName && t.classList.add(this.options.innerClassName), this.options.width && (t.style.width = this.options.width), this.options.height && (t.style.height = this.options.height), this.options.style && Object.assign(t.style, this.options.style), this.options.buttons.forEach((e) => {
      const r = this.createButton(e);
      t.appendChild(r), this.buttons.set(e.id, r);
    }), this.updateLayout(), t;
  }
  updateInnerContainerStyle() {
    if (!this.map)
      return;
    const t = this.map.getContainer(), e = this.getPosition();
    Ut(this.container, t, e, this.options.style), this.container.style.alignItems = "flex-start", this.container.style.display = "flex", this.updateLayout();
  }
  // Responsive design handling
  updateLayout() {
    if (!this.map)
      return;
    const e = this.map.getContainer().clientWidth;
    En(this.getPosition(), e);
  }
  // Create a single button with icon and label
  createButton(t) {
    return xn({
      icon: si(t.svg, t.label),
      label: t.label,
      // title: config.label,
      onClick: () => this.handleButtonClick(t)
    });
  }
  // Handle button click event
  handleButtonClick(t) {
    if (this.activeButtonId === t.id && !t.repeat)
      return;
    const e = this.activeButtonId;
    if (t.repeat || (this.activeButtonId = t.id), e && e !== this.activeButtonId && this.map) {
      const r = this.options.buttons.find((i) => i.id === e);
      r && this.options.onUntoggle && (this.options.onUntoggle(this, this.map, r), this.emit("untoggle"));
    }
    this.buttons.forEach((r, i) => {
      i === this.activeButtonId ? r.style.backgroundColor = P.color.activeBackground : r.style.backgroundColor = P.color.background;
    }), this.map && this.options.onToggle && (this.options.onToggle(this, this.map, t), this.emit("toggle"));
  }
  // Add control to the map
  onAdd(t) {
    if (this.map = t, this.map.on("resize", () => {
      this.updateInnerContainerStyle();
    }), this.map.on("styledata", () => {
      this.updateInnerContainerStyle();
    }), this.options.buttons.forEach((e) => {
      e.setup && e.setup(this, this.map);
    }), this.options.buttons.length > 0 && !this.activeButtonId) {
      const e = this.options.buttons.find((r) => r.id === this.defaultActiveId);
      this.handleButtonClick(e || this.options.buttons[0]);
    }
    return Pn(this.getPosition(), this.buttons), this.container;
  }
  // Remove control from the map
  onRemove() {
    var t;
    In(this.getPosition(), this.buttons), this.map && (this.map.off("resize", this.updateInnerContainerStyle), this.map.off("styledata", this.updateInnerContainerStyle)), this.options.buttons.forEach((e) => {
      e.cleanup && e.cleanup(this, this.map);
    }), (t = this.container.parentNode) == null || t.removeChild(this.container), this.map = void 0;
  }
  // Default position of the control
  getPosition() {
    var t;
    return ((t = this.options) == null ? void 0 : t.position) || "top-right";
  }
  /**
   * Get the unique instance ID for this control
   * @returns Unique identifier string
   */
  getInstanceId() {
    return this.instanceId;
  }
  // Public method to programmatically switch to a specific button
  setActiveButton(t) {
    const e = this.options.buttons.find((r) => r.id === t);
    e && this.handleButtonClick(e);
  }
  getActiveButton() {
    const t = this.activeButtonId || this.defaultActiveId, e = this.options.buttons.find((r) => r.id === t);
    return e || this.options.buttons[0];
  }
  // New method to update a specific button
  updateButton(t, e) {
    const r = this.buttons.get(t), i = this.options.buttons.find((a) => a.id === t);
    if (!r || !i)
      return;
    Object.assign(i, e);
    const o = r.querySelector("img");
    o && (e.svg && (o.src = `data:image/svg+xml,${encodeURIComponent(e.svg)}`), e.label && (o.alt = e.label));
    const s = r.querySelector("span");
    s && e.label && (s.textContent = e.label), this.updateLayout();
  }
  // Update a all button configs
  updateButtonCallback(t) {
    t.forEach((e) => {
      const r = e.id || "", i = this.buttons.get(r), o = this.options.buttons.find((s) => s.id === r);
      !i || !o || Object.assign(o, e);
    });
  }
  // Update the control's styles dynamically
  updateStyle(t) {
    this.container && Object.assign(this.container.style, t);
  }
}
class gi {
  constructor(t = {}) {
    y(this, "map", null);
    y(this, "container", null);
    y(this, "panel", null);
    y(this, "buttons", /* @__PURE__ */ new Map());
    y(this, "btnLabel", "Settings");
    y(this, "feature", "wave");
    y(this, "position");
    y(this, "collapsed", !1);
    y(this, "userStyle");
    // Runtime state
    y(this, "featureConfigGroups");
    y(this, "layerConfigs");
    y(this, "onChange");
    this.position = t.position || "top-right", this.collapsed = t.collapsed || !0, this.featureConfigGroups = t.featureConfigs || {}, this.feature = t.feature || "wave", this.btnLabel = t.btnLabel || "Settings", this.layerConfigs = this.featureConfigGroups[this.feature] || {}, this.onChange = t.onChange || ((e, r, i, o) => {
      console.log("Layer config changed:", e, r, i, o);
    }), t.style && (this.userStyle = t.style);
  }
  /** Called when control is added to the map */
  onAdd(t) {
    var i, o;
    this.map = t, this.container = document.createElement("div"), Se(this.container, { classNames: ["layer-manager"] }), (i = this.position) != null && i.startsWith("bottom") ? this.container.classList.add("bottom") : (o = this.position) != null && o.startsWith("top") && this.container.classList.add("top"), this.userStyle && Object.assign(this.container.style, this.userStyle), this.panel = document.createElement("div"), this.panel.className = "layer-manager-panel", this.collapsed && (this.panel.style.display = "none");
    const e = this._createHeader(), r = this._createLayersSection();
    return this.container.appendChild(e), this.panel.appendChild(r), this.container.appendChild(this.panel), ni(this.container), Pn(this.getPosition(), this.buttons), this.map.on("resize", () => {
      this._updateContainerPosition();
    }), this.map.on("styledata", () => {
      this._updateContainerPosition();
    }), this.container;
  }
  /** Called when control is removed from the map */
  onRemove() {
    this.map && (this.map.off("resize", this._updateContainerPosition), this.map.off("styledata", this._updateContainerPosition)), In(this.getPosition(), this.buttons), this.container && ri(this.container), this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.map = null;
  }
  /**
   * Update container positioning based on map dimensions and safe area insets
   */
  _updateContainerPosition() {
    if (!this.map || !this.container)
      return;
    const t = this.map.getContainer(), e = this.getPosition();
    Ut(this.container, t, e, this.userStyle), this._updateButtonLayout();
  }
  /** Get control position */
  getPosition() {
    return this.position;
  }
  // ========================
  // UI Creation
  // ========================
  _createLayersIcon(t = 20) {
    return `
      <svg
        width="${t}"
        height="${t}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="vertical-align: middle; margin-right: 6px;"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    `;
  }
  _createHeader() {
    var r;
    const t = document.createElement("div");
    t.className = "layer-manager-header", (r = this.position) != null && r.includes("left") ? t.classList.add("left") : t.classList.add("right");
    const e = xn({
      icon: this._createLayersIcon(20),
      label: this.btnLabel,
      title: `${this.feature} Layers Settings`,
      onClick: () => this._togglePanel(),
      className: "layer-manager-toggle"
    });
    return this.buttons.set("layer-manager-toggle", e), t.appendChild(e), t;
  }
  _togglePanel() {
    this.panel && (this.panel.style.display === "none" ? (this.panel.style.display = "", this.collapsed = !1) : (this.panel.style.display = "none", this.collapsed = !0));
  }
  _createLayersSection() {
    const t = document.createElement("div");
    t.className = "layer-manager-section";
    const e = document.createElement("div");
    e.className = "layer-manager-title", e.innerHTML = `<span style="vertical-align: middle;">${ai(this.feature)} Layers</span>`, t.appendChild(e);
    const r = document.createElement("div");
    return r.className = "layer-manager-list", Object.entries(this.layerConfigs).forEach(([i, o]) => {
      const s = this._createLayerItem(i, o);
      r.appendChild(s);
    }), t.appendChild(r), t;
  }
  /** Create toggle (checkbox) item */
  _createToggleItem(t, e) {
    const r = document.createElement("input");
    r.type = "checkbox", r.className = "layer-manager-checkbox", r.checked = !!e.value, r.onchange = (o) => {
      const s = { ...e };
      e.value = o.target.checked, this.onChange(this.feature, t, s, e);
    };
    const i = document.createElement("label");
    return i.className = "layer-manager-label", i.textContent = e.label || "Unnamed Layer", i.onclick = () => r.click(), [r, i];
  }
  /** Create select (dropdown or single choice) item */
  _createSelectUI(t, e) {
    const r = (e == null ? void 0 : e.mode) ?? "buttons";
    let i;
    if (r === "dropdown") {
      const a = document.createElement("select");
      a.className = "layer-manager-select", e.options.forEach((l, u) => {
        var h;
        const c = document.createElement("option");
        c.value = String(l), c.textContent = ((h = e.labels) == null ? void 0 : h[u]) ?? String(l), l === e.value && (c.selected = !0), a.appendChild(c);
      }), a.onchange = (l) => {
        const u = { ...e };
        e.value = l.target.value, this.onChange(this.feature, t, u, e);
      }, i = a;
    } else {
      const a = document.createElement("div");
      a.className = "layer-manager-radio-group", e.options.forEach((l, u) => {
        var d;
        const c = document.createElement("label");
        c.className = "layer-manager-radio-label";
        const h = document.createElement("input");
        h.type = "radio", h.name = t, h.value = String(l), h.checked = l === e.value, h.onchange = (g) => {
          const C = { ...e };
          e.value = g.target.value, this.onChange(this.feature, t, C, e);
        };
        const p = document.createElement("span");
        p.textContent = ((d = e.labels) == null ? void 0 : d[u]) ?? String(l), c.append(h, p), a.appendChild(c);
      }), i = a;
    }
    const o = document.createElement("fieldset");
    o.className = "layer-manager-fieldset";
    const s = document.createElement("legend");
    return s.className = "layer-manager-legend", s.textContent = e.label || t, o.append(s, i), [o];
  }
  /** Create a single layer config item */
  _createLayerItem(t, e) {
    const r = document.createElement("div");
    if (r.className = "layer-manager-item", e.type === "toggle")
      r.append(...this._createToggleItem(t, e));
    else if (e.type === "select")
      r.append(...this._createSelectUI(t, e));
    else {
      const i = document.createElement("div");
      i.textContent = `Unsupported type: ${e.type}`, r.append(i);
    }
    return r;
  }
  _updateButtonLayout() {
    if (!this.map || !this.container) return;
    const t = this.map.getContainer(), e = t ? t.clientWidth : -1;
    En(this.getPosition(), e);
  }
  /**
   * Refresh the UI to reflect current feature and layer configurations
   */
  _refreshUI() {
    if (!this.container || !this.panel) return;
    const t = this.buttons.get("layer-manager-toggle");
    t && (t.title = `${this.feature} Layers Settings`);
    const e = this.panel.querySelector(".layer-manager-section");
    e && e.remove();
    const r = this._createLayersSection();
    this.panel.appendChild(r), this._updateButtonLayout();
  }
  // ========================
  // Public API
  // ========================
  /**
   * Update the current feature and refresh the UI
   * @param feature - The new feature name
   * @param featureConfigs - Optional new feature configurations
   */
  updateFeature(t, e) {
    this.feature = t, e && (this.featureConfigGroups = e), this.layerConfigs = this.featureConfigGroups[this.feature] || {}, this._refreshUI();
  }
}
export {
  fi as ColorBar,
  gi as ConfigManager,
  pi as MsgCtl,
  hi as TemporalControl,
  di as ToggleCtl
};
//# sourceMappingURL=index.js.map
