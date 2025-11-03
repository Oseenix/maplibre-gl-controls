var Cn = Object.defineProperty;
var wn = (n, e, t) => e in n ? Cn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => wn(n, typeof e != "symbol" ? e + "" : e, t);
const kn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>', xn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>', En = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>', Mn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-backward</title><path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" /></svg>', Sn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-forward</title><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" /></svg>', de = "rgb(204, 204, 204)", re = (n) => {
  const e = document.createElement("img");
  return e.src = `data:image/svg+xml,${encodeURIComponent(n)}`, e.style.width = "24px", e.style.height = "24px", e;
};
let ye;
const In = ({
  length: n,
  interval: e,
  onSliderValueChange: t
}) => {
  const r = document.createElement("div");
  r.classList.add("maplibregl-ctrl"), r.classList.add("maplibregl-ctrl-group"), r.style.width = "calc(min((500% - 29px), 260px))", r.style.height = "84px", r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.textAlign = "center";
  const i = document.createElement("div");
  i.innerHTML = "<br />", i.style.marginTop = "4px", r.appendChild(i);
  const s = document.createElement("input");
  s.type = "range", s.value = "0", s.min = "0", s.max = String(n - 1), s.addEventListener("input", () => {
    t();
  }), s.style.width = "80%", s.style.margin = "4px 0", r.appendChild(s);
  const o = document.createElement("div");
  o.style.display = "flex", o.style.justifyContent = "center", o.style.margin = "4px 0 0 0";
  const a = (H) => {
    u.style.backgroundColor = H ? de : "";
  }, l = () => u.style.backgroundColor === de, u = document.createElement("button");
  u.appendChild(re(En)), u.style.border = "0", u.style.borderRadius = "0", u.style.marginRight = "16px", u.style.height = "24px", u.style.borderRadius = "4px", u.onclick = () => a(!l()), o.appendChild(u);
  const c = () => (s.value = String(Math.max(0, Number(s.value) - 1)), t(), Number(s.min) < Number(s.value)), f = () => {
    if (u.style.backgroundColor !== "" && Number(s.value) == Number(s.max))
      for (; c(); )
        ;
    else
      s.value = String(
        Math.min(Number(s.max), Number(s.value) + 1)
      );
    return t(), Number(s.value) < Number(s.max);
  }, h = document.createElement("button");
  h.appendChild(re(Mn)), h.onclick = c, h.style.border = "0", h.style.height = "24px", h.style.borderRadius = "4px";
  const d = () => {
    ye !== void 0 && (clearInterval(ye), ye = void 0, y.onclick = null, w.style.backgroundColor = "");
  }, y = document.createElement("button");
  y.appendChild(re(kn)), y.style.border = "0", y.style.height = "24px", y.style.borderRadius = "4px", y.onclick = d;
  const C = () => w.style.backgroundColor === de, E = () => {
    C() || (w.style.backgroundColor = de, ye = setInterval(() => {
      f();
    }, e));
  }, w = document.createElement("button");
  w.appendChild(re(xn)), w.style.border = "0", w.style.height = "24px", w.style.borderRadius = "4px", w.onclick = E;
  const I = document.createElement("button");
  return I.appendChild(re(Sn)), I.style.border = "0", I.style.height = "24px", I.style.borderRadius = "4px", I.onclick = f, o.appendChild(h), o.appendChild(y), o.appendChild(w), o.appendChild(I), r.appendChild(o), {
    container: r,
    titleDiv: i,
    slider: s,
    increment: f,
    decrement: c,
    isPlaying: C,
    play: E,
    pause: d,
    isLoopEnabled: l,
    setLoopEnabled: a
  };
};
class Yr {
  constructor(e, t = {}) {
    g(this, "map");
    g(this, "options");
    g(this, "container");
    g(this, "containerTitle");
    g(this, "temporalSlider");
    g(this, "temporalFrames");
    g(this, "next");
    g(this, "prev");
    g(this, "play");
    g(this, "pause");
    g(this, "isPlaying");
    g(this, "isLoopEnabled");
    g(this, "setLoopEnabled");
    g(this, "goto");
    this.temporalFrames = e, this.options = t;
    const r = {
      length: this.temporalFrames.length,
      interval: this.options.interval || 500,
      onSliderValueChange: () => this.refresh()
    }, {
      container: i,
      titleDiv: s,
      slider: o,
      increment: a,
      decrement: l,
      play: u,
      pause: c,
      isPlaying: f,
      isLoopEnabled: h,
      setLoopEnabled: d
    } = In(r);
    this.container = i, this.containerTitle = s, this.temporalSlider = o, this.next = a, this.prev = l, this.play = u, this.pause = c, this.isPlaying = f, this.isLoopEnabled = h, this.setLoopEnabled = d, this.goto = (y) => {
      o.value = String(
        Math.min(this.temporalFrames.length - 1, Math.max(0, y))
      ), this.refresh();
    };
  }
  onAdd(e) {
    return this.map = e, e.getContainer().appendChild(this.container), this.map.once("styledata", () => {
      this.refresh();
    }), this.container;
  }
  onRemove() {
    var e;
    (e = this.container.parentNode) == null || e.removeChild(this.container), this.map = void 0;
  }
  getDefaultPosition() {
    return "bottom-left";
  }
  refresh() {
    const e = Number(this.temporalSlider.value);
    this.containerTitle.innerHTML = this.temporalFrames[e].title;
    const t = this.temporalFrames[e].layers.map(
      (r) => r.id
    );
    this.temporalFrames.forEach((r) => {
      r.layers.forEach(
        (i) => this.setVisible(i, t.includes(i.id))
      );
    });
  }
  setVisible(e, t = !0) {
    var r, i, s, o;
    if (e.type === "raster" || e.type === "fill" || e.type === "circle" || e.type === "line") {
      e.type === "raster" && ((r = this.map) == null || r.setPaintProperty(
        e.id,
        `${e.type}-opacity-transition`,
        {
          // set disable fade-in transition
          duration: 0
        }
      ));
      let a;
      t ? a = ((i = e.paint) == null ? void 0 : i[`${e.type}-opacity`]) || 1 : a = this.options.performance ? 1e-21 : 0, (s = this.map) == null || s.setPaintProperty(e.id, `${e.type}-opacity`, a);
    } else
      (o = this.map) == null || o.setLayoutProperty(
        e.id,
        "visibility",
        t ? "visible" : "none"
      );
  }
}
function Ut(n, ...e) {
  for (const t of e)
    for (const r in t)
      n[r] = t[r];
  return n;
}
class _ extends Error {
  constructor(e, t) {
    super(t), this.message = t, this.key = e;
  }
}
class it {
  constructor(e, t = []) {
    this.parent = e, this.bindings = {};
    for (const [r, i] of t)
      this.bindings[r] = i;
  }
  concat(e) {
    return new it(this, e);
  }
  get(e) {
    if (this.bindings[e])
      return this.bindings[e];
    if (this.parent)
      return this.parent.get(e);
    throw new Error(`${e} not found in scope.`);
  }
  has(e) {
    return this.bindings[e] ? !0 : this.parent ? this.parent.has(e) : !1;
  }
}
const Se = { kind: "null" }, p = { kind: "number" }, b = { kind: "string" }, m = { kind: "boolean" }, F = { kind: "color" }, Ie = { kind: "projectionDefinition" }, Q = { kind: "object" }, v = { kind: "value" }, Tn = { kind: "error" }, Te = { kind: "collator" }, Le = { kind: "formatted" }, $e = { kind: "padding" }, ce = { kind: "resolvedImage" }, Ne = { kind: "variableAnchorOffsetCollection" };
function L(n, e) {
  return {
    kind: "array",
    itemType: n,
    N: e
  };
}
function x(n) {
  if (n.kind === "array") {
    const e = x(n.itemType);
    return typeof n.N == "number" ? `array<${e}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${e}>`;
  } else
    return n.kind;
}
const Ln = [
  Se,
  p,
  b,
  m,
  F,
  Ie,
  Le,
  Q,
  L(v),
  $e,
  ce,
  Ne
];
function se(n, e) {
  if (e.kind === "error")
    return null;
  if (n.kind === "array") {
    if (e.kind === "array" && (e.N === 0 && e.itemType.kind === "value" || !se(n.itemType, e.itemType)) && (typeof n.N != "number" || n.N === e.N))
      return null;
  } else {
    if (n.kind === e.kind)
      return null;
    if (n.kind === "value") {
      for (const t of Ln)
        if (!se(t, e))
          return null;
    }
  }
  return `Expected ${x(n)} but found ${x(e)} instead.`;
}
function st(n, e) {
  return e.some((t) => t.kind === n.kind);
}
function U(n, e) {
  return e.some((t) => t === "null" ? n === null : t === "array" ? Array.isArray(n) : t === "object" ? n && !Array.isArray(n) && typeof n == "object" : t === typeof n);
}
function G(n, e) {
  return n.kind === "array" && e.kind === "array" ? n.itemType.kind === e.itemType.kind && typeof n.N == "number" : n.kind === e.kind;
}
const Xt = 0.96422, Zt = 1, Gt = 0.82521, Jt = 4 / 29, K = 6 / 29, Yt = 3 * K * K, $n = K * K * K, Nn = Math.PI / 180, Dn = 180 / Math.PI;
function Qt(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function Kt([n, e, t, r]) {
  n = je(n), e = je(e), t = je(t);
  let i, s;
  const o = Re((0.2225045 * n + 0.7168786 * e + 0.0606169 * t) / Zt);
  n === e && e === t ? i = s = o : (i = Re((0.4360747 * n + 0.3850649 * e + 0.1430804 * t) / Xt), s = Re((0.0139322 * n + 0.0971045 * e + 0.7141733 * t) / Gt));
  const a = 116 * o - 16;
  return [a < 0 ? 0 : a, 500 * (i - o), 200 * (o - s), r];
}
function je(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function Re(n) {
  return n > $n ? Math.pow(n, 1 / 3) : n / Yt + Jt;
}
function en([n, e, t, r]) {
  let i = (n + 16) / 116, s = isNaN(e) ? i : i + e / 500, o = isNaN(t) ? i : i - t / 200;
  return i = Zt * qe(i), s = Xt * qe(s), o = Gt * qe(o), [
    Oe(3.1338561 * s - 1.6168667 * i - 0.4906146 * o),
    // D50 -> sRGB
    Oe(-0.9787684 * s + 1.9161415 * i + 0.033454 * o),
    Oe(0.0719453 * s - 0.2289914 * i + 1.4052427 * o),
    r
  ];
}
function Oe(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function qe(n) {
  return n > K ? n * n * n : Yt * (n - Jt);
}
function An(n) {
  const [e, t, r, i] = Kt(n), s = Math.sqrt(t * t + r * r);
  return [Math.round(s * 1e4) ? Qt(Math.atan2(r, t) * Dn) : NaN, s, e, i];
}
function Pn([n, e, t, r]) {
  return n = isNaN(n) ? 0 : n * Nn, en([t, Math.cos(n) * e, Math.sin(n) * e, r]);
}
function _n([n, e, t, r]) {
  n = Qt(n), e /= 100, t /= 100;
  function i(s) {
    const o = (s + n / 30) % 12, a = e * Math.min(t, 1 - t);
    return t - a * Math.max(-1, Math.min(o - 3, 9 - o, 1));
  }
  return [i(0), i(8), i(4), r];
}
function Fn(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const e = Bn[n];
  if (e) {
    const [i, s, o] = e;
    return [i / 255, s / 255, o / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const s = n.length < 6 ? 1 : 2;
    let o = 1;
    return [
      ge(n.slice(o, o += s)),
      ge(n.slice(o, o += s)),
      ge(n.slice(o, o += s)),
      ge(n.slice(o, o + s) || "ff")
    ];
  }
  if (n.startsWith("rgb")) {
    const i = /^rgba?\(\s*([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, s = n.match(i);
    if (s) {
      const [
        o,
        // eslint-disable-line @typescript-eslint/no-unused-vars
        a,
        // <numeric>
        l,
        // %         (optional)
        u,
        // ,         (optional)
        c,
        // <numeric>
        f,
        // %         (optional)
        h,
        // ,         (optional)
        d,
        // <numeric>
        y,
        // %         (optional)
        C,
        // ,|/       (optional)
        E,
        // <numeric> (optional)
        w
        // %         (optional)
      ] = s, I = [u || " ", h || " ", C].join("");
      if (I === "  " || I === "  /" || I === ",," || I === ",,,") {
        const H = [l, f, y].join(""), pe = H === "%%%" ? 100 : H === "" ? 255 : 0;
        if (pe) {
          const Mt = [
            J(+a / pe, 0, 1),
            J(+c / pe, 0, 1),
            J(+d / pe, 0, 1),
            E ? St(+E, w) : 1
          ];
          if (It(Mt))
            return Mt;
        }
      }
      return;
    }
  }
  const t = /^hsla?\(\s*([\de.+-]+)(?:deg)?(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, r = n.match(t);
  if (r) {
    const [
      i,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      s,
      // <numeric>
      o,
      // ,         (optional)
      a,
      // <numeric>
      l,
      // ,         (optional)
      u,
      // <numeric>
      c,
      // ,|/       (optional)
      f,
      // <numeric> (optional)
      h
      // %         (optional)
    ] = r, d = [o || " ", l || " ", c].join("");
    if (d === "  " || d === "  /" || d === ",," || d === ",,,") {
      const y = [
        +s,
        J(+a, 0, 100),
        J(+u, 0, 100),
        f ? St(+f, h) : 1
      ];
      if (It(y))
        return _n(y);
    }
  }
}
function ge(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function St(n, e) {
  return J(e ? n / 100 : n, 0, 1);
}
function J(n, e, t) {
  return Math.min(Math.max(e, n), t);
}
function It(n) {
  return !n.some(Number.isNaN);
}
const Bn = {
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
function q(n, e, t) {
  return n + t * (e - n);
}
function oe(n, e, t) {
  return n.map((r, i) => q(r, e[i], t));
}
function zn(n) {
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
  constructor(e, t, r, i = 1, s = !0) {
    this.r = e, this.g = t, this.b = r, this.a = i, s || (this.r *= i, this.g *= i, this.b *= i, i || this.overwriteGetter("rgb", [e, t, r, i]));
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
  static parse(e) {
    if (e instanceof k)
      return e;
    if (typeof e != "string")
      return;
    const t = Fn(e);
    if (t)
      return new k(...t, !1);
  }
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb() {
    const { r: e, g: t, b: r, a: i } = this, s = i || 1 / 0;
    return this.overwriteGetter("rgb", [e / s, t / s, r / s, i]);
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl() {
    return this.overwriteGetter("hcl", An(this.rgb));
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab() {
    return this.overwriteGetter("lab", Kt(this.rgb));
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
  overwriteGetter(e, t) {
    return Object.defineProperty(this, e, { value: t }), t;
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
    const [e, t, r, i] = this.rgb;
    return `rgba(${[e, t, r].map((s) => Math.round(s * 255)).join(",")},${i})`;
  }
  static interpolate(e, t, r, i = "rgb") {
    switch (i) {
      case "rgb": {
        const [s, o, a, l] = oe(e.rgb, t.rgb, r);
        return new k(s, o, a, l, !1);
      }
      case "hcl": {
        const [s, o, a, l] = e.hcl, [u, c, f, h] = t.hcl;
        let d, y;
        if (!isNaN(s) && !isNaN(u)) {
          let H = u - s;
          u > s && H > 180 ? H -= 360 : u < s && s - u > 180 && (H += 360), d = s + r * H;
        } else isNaN(s) ? isNaN(u) ? d = NaN : (d = u, (a === 1 || a === 0) && (y = c)) : (d = s, (f === 1 || f === 0) && (y = o));
        const [C, E, w, I] = Pn([
          d,
          y ?? q(o, c, r),
          q(a, f, r),
          q(l, h, r)
        ]);
        return new k(C, E, w, I, !1);
      }
      case "lab": {
        const [s, o, a, l] = en(oe(e.lab, t.lab, r));
        return new k(s, o, a, l, !1);
      }
    }
  }
}
k.black = new k(0, 0, 0, 1);
k.white = new k(1, 1, 1, 1);
k.transparent = new k(0, 0, 0, 0);
k.red = new k(1, 0, 0, 1);
class ot {
  constructor(e, t, r) {
    e ? this.sensitivity = t ? "variant" : "case" : this.sensitivity = t ? "accent" : "base", this.locale = r, this.collator = new Intl.Collator(this.locale ? this.locale : [], { sensitivity: this.sensitivity, usage: "search" });
  }
  compare(e, t) {
    return this.collator.compare(e, t);
  }
  resolvedLocale() {
    return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
  }
}
class Ze {
  constructor(e, t, r, i, s) {
    this.text = e, this.image = t, this.scale = r, this.fontStack = i, this.textColor = s;
  }
}
class B {
  constructor(e) {
    this.sections = e;
  }
  static fromString(e) {
    return new B([new Ze(e, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((e) => e.text.length !== 0 || e.image && e.image.name.length !== 0);
  }
  static factory(e) {
    return e instanceof B ? e : B.fromString(e);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((e) => e.text).join("");
  }
}
class T {
  constructor(e) {
    this.values = e.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(e) {
    if (e instanceof T)
      return e;
    if (typeof e == "number")
      return new T([e, e, e, e]);
    if (Array.isArray(e) && !(e.length < 1 || e.length > 4)) {
      for (const t of e)
        if (typeof t != "number")
          return;
      switch (e.length) {
        case 1:
          e = [e[0], e[0], e[0], e[0]];
          break;
        case 2:
          e = [e[0], e[1], e[0], e[1]];
          break;
        case 3:
          e = [e[0], e[1], e[2], e[1]];
          break;
      }
      return new T(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, r) {
    return new T(oe(e.values, t.values, r));
  }
}
class M {
  constructor(e) {
    this.name = "ExpressionEvaluationError", this.message = e;
  }
  toJSON() {
    return this.message;
  }
}
const Hn = /* @__PURE__ */ new Set(["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]);
class N {
  constructor(e) {
    this.values = e.slice();
  }
  static parse(e) {
    if (e instanceof N)
      return e;
    if (!(!Array.isArray(e) || e.length < 1 || e.length % 2 !== 0)) {
      for (let t = 0; t < e.length; t += 2) {
        const r = e[t], i = e[t + 1];
        if (typeof r != "string" || !Hn.has(r) || !Array.isArray(i) || i.length !== 2 || typeof i[0] != "number" || typeof i[1] != "number")
          return;
      }
      return new N(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, r) {
    const i = e.values, s = t.values;
    if (i.length !== s.length)
      throw new M(`Cannot interpolate values of different length. from: ${e.toString()}, to: ${t.toString()}`);
    const o = [];
    for (let a = 0; a < i.length; a += 2) {
      if (i[a] !== s[a])
        throw new M(`Cannot interpolate values containing mismatched anchors. from[${a}]: ${i[a]}, to[${a}]: ${s[a]}`);
      o.push(i[a]);
      const [l, u] = i[a + 1], [c, f] = s[a + 1];
      o.push([q(l, c, r), q(u, f, r)]);
    }
    return new N(o);
  }
}
class R {
  constructor(e) {
    this.name = e.name, this.available = e.available;
  }
  toString() {
    return this.name;
  }
  static fromString(e) {
    return e ? new R({ name: e, available: !1 }) : null;
  }
}
class $ {
  constructor(e, t, r) {
    this.from = e, this.to = t, this.transition = r;
  }
  static interpolate(e, t, r) {
    return new $(e, t, r);
  }
  static parse(e) {
    if (e instanceof $)
      return e;
    if (Array.isArray(e) && e.length === 3 && typeof e[0] == "string" && typeof e[1] == "string" && typeof e[2] == "number")
      return new $(e[0], e[1], e[2]);
    if (typeof e == "object" && typeof e.from == "string" && typeof e.to == "string" && typeof e.transition == "number")
      return new $(e.from, e.to, e.transition);
    if (typeof e == "string")
      return new $(e, e, 1);
  }
}
function tn(n, e, t, r) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof e == "number" && e >= 0 && e <= 255 && typeof t == "number" && t >= 0 && t <= 255 ? typeof r > "u" || typeof r == "number" && r >= 0 && r <= 1 ? null : `Invalid rgba value [${[n, e, t, r].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof r == "number" ? [n, e, t, r] : [n, e, t]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function ae(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof $ || n instanceof k || n instanceof ot || n instanceof B || n instanceof T || n instanceof N || n instanceof R)
    return !0;
  if (Array.isArray(n)) {
    for (const e of n)
      if (!ae(e))
        return !1;
    return !0;
  } else if (typeof n == "object") {
    for (const e in n)
      if (!ae(n[e]))
        return !1;
    return !0;
  } else
    return !1;
}
function S(n) {
  if (n === null)
    return Se;
  if (typeof n == "string")
    return b;
  if (typeof n == "boolean")
    return m;
  if (typeof n == "number")
    return p;
  if (n instanceof k)
    return F;
  if (n instanceof $)
    return Ie;
  if (n instanceof ot)
    return Te;
  if (n instanceof B)
    return Le;
  if (n instanceof T)
    return $e;
  if (n instanceof N)
    return Ne;
  if (n instanceof R)
    return ce;
  if (Array.isArray(n)) {
    const e = n.length;
    let t;
    for (const r of n) {
      const i = S(r);
      if (!t)
        t = i;
      else {
        if (t === i)
          continue;
        t = v;
        break;
      }
    }
    return L(t || v, e);
  } else
    return Q;
}
function ie(n) {
  const e = typeof n;
  return n === null ? "" : e === "string" || e === "number" || e === "boolean" ? String(n) : n instanceof k || n instanceof $ || n instanceof B || n instanceof T || n instanceof N || n instanceof R ? n.toString() : JSON.stringify(n);
}
class ee {
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'literal' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (!ae(e[1]))
      return t.error("invalid value");
    const r = e[1];
    let i = S(r);
    const s = t.expectedType;
    return i.kind === "array" && i.N === 0 && s && s.kind === "array" && (typeof s.N != "number" || s.N === 0) && (i = s), new ee(i, r);
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
const me = {
  string: b,
  number: p,
  boolean: m,
  object: Q
};
class A {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let r = 1, i;
    const s = e[0];
    if (s === "array") {
      let a;
      if (e.length > 2) {
        const u = e[1];
        if (typeof u != "string" || !(u in me) || u === "object")
          return t.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = me[u], r++;
      } else
        a = v;
      let l;
      if (e.length > 3) {
        if (e[2] !== null && (typeof e[2] != "number" || e[2] < 0 || e[2] !== Math.floor(e[2])))
          return t.error('The length argument to "array" must be a positive integer literal', 2);
        l = e[2], r++;
      }
      i = L(a, l);
    } else {
      if (!me[s])
        throw new Error(`Types doesn't contain name = ${s}`);
      i = me[s];
    }
    const o = [];
    for (; r < e.length; r++) {
      const a = t.parse(e[r], r, v);
      if (!a)
        return null;
      o.push(a);
    }
    return new A(i, o);
  }
  evaluate(e) {
    for (let t = 0; t < this.args.length; t++) {
      const r = this.args[t].evaluate(e);
      if (se(this.type, S(r))) {
        if (t === this.args.length - 1)
          throw new M(`Expected value to be of type ${x(this.type)}, but found ${x(S(r))} instead.`);
      } else return r;
    }
    throw new Error();
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
const Tt = {
  "to-boolean": m,
  "to-color": F,
  "to-number": p,
  "to-string": b
};
class O {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const r = e[0];
    if (!Tt[r])
      throw new Error(`Can't parse ${r} as it is not part of the known types`);
    if ((r === "to-boolean" || r === "to-string") && e.length !== 2)
      return t.error("Expected one argument.");
    const i = Tt[r], s = [];
    for (let o = 1; o < e.length; o++) {
      const a = t.parse(e[o], o, v);
      if (!a)
        return null;
      s.push(a);
    }
    return new O(i, s);
  }
  evaluate(e) {
    switch (this.type.kind) {
      case "boolean":
        return !!this.args[0].evaluate(e);
      case "color": {
        let t, r;
        for (const i of this.args) {
          if (t = i.evaluate(e), r = null, t instanceof k)
            return t;
          if (typeof t == "string") {
            const s = e.parseColor(t);
            if (s)
              return s;
          } else if (Array.isArray(t) && (t.length < 3 || t.length > 4 ? r = `Invalid rgba value ${JSON.stringify(t)}: expected an array containing either three or four numeric values.` : r = tn(t[0], t[1], t[2], t[3]), !r))
            return new k(t[0] / 255, t[1] / 255, t[2] / 255, t[3]);
        }
        throw new M(r || `Could not parse color from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "padding": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = T.parse(t);
          if (i)
            return i;
        }
        throw new M(`Could not parse padding from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = N.parse(t);
          if (i)
            return i;
        }
        throw new M(`Could not parse variableAnchorOffsetCollection from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "number": {
        let t = null;
        for (const r of this.args) {
          if (t = r.evaluate(e), t === null)
            return 0;
          const i = Number(t);
          if (!isNaN(i))
            return i;
        }
        throw new M(`Could not convert ${JSON.stringify(t)} to number.`);
      }
      case "formatted":
        return B.fromString(ie(this.args[0].evaluate(e)));
      case "resolvedImage":
        return R.fromString(ie(this.args[0].evaluate(e)));
      case "projectionDefinition":
        return this.args[0].evaluate(e);
      default:
        return ie(this.args[0].evaluate(e));
    }
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
function jn(n, e) {
  if (n.length <= 1)
    return [n];
  const r = [];
  let i, s;
  for (const o of n) {
    const a = nn(o);
    a !== 0 && (o.area = Math.abs(a), s === void 0 && (s = a < 0), s === a < 0 ? (i && r.push(i), i = [o]) : i.push(o));
  }
  return i && r.push(i), r;
}
function nn(n) {
  let e = 0;
  for (let t = 0, r = n.length, i = r - 1, s, o; t < r; i = t++)
    s = n[t], o = n[i], e += (o.x - s.x) * (s.y + o.y);
  return e;
}
function Rn(n) {
  const e = n.length;
  for (let t = 0, r; t < e; t++) {
    const i = nn(n[t]);
    if (i !== 0) {
      if (r === void 0)
        r = i < 0;
      else if (r === i < 0)
        return !0;
    }
  }
  return !1;
}
const Lt = ["Unknown", "Point", "LineString", "Polygon"], On = {
  Unknown: "Unknown",
  Point: "Point",
  MultiPoint: "Point",
  LineString: "LineString",
  MultiLineString: "LineString",
  Polygon: "Polygon",
  MultiPolygon: "Polygon"
};
class rn {
  constructor() {
    this.globals = null, this.feature = null, this.featureState = null, this.formattedSection = null, this._parseColorCache = {}, this.availableImages = null, this.canonical = null;
  }
  id() {
    return this.feature && "id" in this.feature ? this.feature.id : null;
  }
  geometryDollarType() {
    return this.feature ? typeof this.feature.type == "number" ? Lt[this.feature.type] : On[this.feature.type] : null;
  }
  geometryType() {
    let e = this.feature.type;
    if (typeof e != "number" || (e = Lt[this.feature.type], e === "Unknown"))
      return e;
    const t = this.geometry();
    return t.length === 1 ? e : e !== "Polygon" ? `Multi${e}` : Rn(t) ? "MultiPolygon" : "Polygon";
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
  parseColor(e) {
    let t = this._parseColorCache[e];
    return t || (t = this._parseColorCache[e] = k.parse(e)), t;
  }
}
class De {
  constructor(e, t, r = [], i, s = new it(), o = []) {
    this.registry = e, this.path = r, this.key = r.map((a) => `[${a}]`).join(""), this.scope = s, this.errors = o, this.expectedType = i, this._isConstant = t;
  }
  /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
  parse(e, t, r, i, s = {}) {
    return t ? this.concat(t, r, i)._parse(e, s) : this._parse(e, s);
  }
  _parse(e, t) {
    (e === null || typeof e == "string" || typeof e == "boolean" || typeof e == "number") && (e = ["literal", e]);
    function r(i, s, o) {
      return o === "assert" ? new A(s, [i]) : o === "coerce" ? new O(s, [i]) : i;
    }
    if (Array.isArray(e)) {
      if (e.length === 0)
        return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
      const i = e[0];
      if (typeof i != "string")
        return this.error(`Expression name must be a string, but found ${typeof i} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
      const s = this.registry[i];
      if (s) {
        let o = s.parse(e, this);
        if (!o)
          return null;
        if (this.expectedType) {
          const a = this.expectedType, l = o.type;
          if ((a.kind === "string" || a.kind === "number" || a.kind === "boolean" || a.kind === "object" || a.kind === "array") && l.kind === "value")
            o = r(o, a, t.typeAnnotation || "assert");
          else if (a.kind === "projectionDefinition" && (l.kind === "string" || l.kind === "array"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if ((a.kind === "color" || a.kind === "formatted" || a.kind === "resolvedImage") && (l.kind === "value" || l.kind === "string"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if (a.kind === "padding" && (l.kind === "value" || l.kind === "number" || l.kind === "array"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if (a.kind === "variableAnchorOffsetCollection" && (l.kind === "value" || l.kind === "array"))
            o = r(o, a, t.typeAnnotation || "coerce");
          else if (this.checkSubtype(a, l))
            return null;
        }
        if (!(o instanceof ee) && o.type.kind !== "resolvedImage" && this._isConstant(o)) {
          const a = new rn();
          try {
            o = new ee(o.type, o.evaluate(a));
          } catch (l) {
            return this.error(l.message), null;
          }
        }
        return o;
      }
      return this.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`, 0);
    } else return typeof e > "u" ? this.error("'undefined' value invalid. Use null instead.") : typeof e == "object" ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error(`Expected an array, but found ${typeof e} instead.`);
  }
  /**
   * Returns a copy of this context suitable for parsing the subexpression at
   * index `index`, optionally appending to 'let' binding map.
   *
   * Note that `errors` property, intended for collecting errors while
   * parsing, is copied by reference rather than cloned.
   * @private
   */
  concat(e, t, r) {
    const i = typeof e == "number" ? this.path.concat(e) : this.path, s = r ? this.scope.concat(r) : this.scope;
    return new De(this.registry, this._isConstant, i, t || null, s, this.errors);
  }
  /**
   * Push a parsing (or type checking) error into the `this.errors`
   * @param error The message
   * @param keys Optionally specify the source of the error at a child
   * of the current expression at `this.key`.
   * @private
   */
  error(e, ...t) {
    const r = `${this.key}${t.map((i) => `[${i}]`).join("")}`;
    this.errors.push(new _(r, e));
  }
  /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   * @param expected The expected type
   * @param t The actual type
   * @returns null if `t` is a subtype of `expected`; otherwise returns an error message
   */
  checkSubtype(e, t) {
    const r = se(e, t);
    return r && this.error(r), r;
  }
}
class Ae {
  constructor(e, t) {
    this.type = t.type, this.bindings = [].concat(e), this.result = t;
  }
  evaluate(e) {
    return this.result.evaluate(e);
  }
  eachChild(e) {
    for (const t of this.bindings)
      e(t[1]);
    e(this.result);
  }
  static parse(e, t) {
    if (e.length < 4)
      return t.error(`Expected at least 3 arguments, but found ${e.length - 1} instead.`);
    const r = [];
    for (let s = 1; s < e.length - 1; s += 2) {
      const o = e[s];
      if (typeof o != "string")
        return t.error(`Expected string, but found ${typeof o} instead.`, s);
      if (/[^a-zA-Z0-9_]/.test(o))
        return t.error("Variable names must contain only alphanumeric characters or '_'.", s);
      const a = t.parse(e[s + 1], s + 1);
      if (!a)
        return null;
      r.push([o, a]);
    }
    const i = t.parse(e[e.length - 1], e.length - 1, t.expectedType, r);
    return i ? new Ae(r, i) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class Pe {
  constructor(e, t) {
    this.type = t.type, this.name = e, this.boundExpression = t;
  }
  static parse(e, t) {
    if (e.length !== 2 || typeof e[1] != "string")
      return t.error("'var' expression requires exactly one string literal argument.");
    const r = e[1];
    return t.scope.has(r) ? new Pe(r, t.scope.get(r)) : t.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`, 1);
  }
  evaluate(e) {
    return this.boundExpression.evaluate(e);
  }
  eachChild() {
  }
  outputDefined() {
    return !1;
  }
}
class at {
  constructor(e, t, r) {
    this.type = e, this.index = t, this.input = r;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, p), i = t.parse(e[2], 2, L(t.expectedType || v));
    if (!r || !i)
      return null;
    const s = i.type;
    return new at(s.itemType, r, i);
  }
  evaluate(e) {
    const t = this.index.evaluate(e), r = this.input.evaluate(e);
    if (t < 0)
      throw new M(`Array index out of bounds: ${t} < 0.`);
    if (t >= r.length)
      throw new M(`Array index out of bounds: ${t} > ${r.length - 1}.`);
    if (t !== Math.floor(t))
      throw new M(`Array index must be an integer, but found ${t} instead.`);
    return r[t];
  }
  eachChild(e) {
    e(this.index), e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class lt {
  constructor(e, t) {
    this.type = m, this.needle = e, this.haystack = t;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, v), i = t.parse(e[2], 2, v);
    return !r || !i ? null : st(r.type, [m, b, p, Se, v]) ? new lt(r, i) : t.error(`Expected first argument to be of type boolean, string, number or null, but found ${x(r.type)} instead`);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!r)
      return !1;
    if (!U(t, ["boolean", "string", "number", "null"]))
      throw new M(`Expected first argument to be of type boolean, string, number or null, but found ${x(S(t))} instead.`);
    if (!U(r, ["string", "array"]))
      throw new M(`Expected second argument to be of type array or string, but found ${x(S(r))} instead.`);
    return r.indexOf(t) >= 0;
  }
  eachChild(e) {
    e(this.needle), e(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class Ce {
  constructor(e, t, r) {
    this.type = p, this.needle = e, this.haystack = t, this.fromIndex = r;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, v), i = t.parse(e[2], 2, v);
    if (!r || !i)
      return null;
    if (!st(r.type, [m, b, p, Se, v]))
      return t.error(`Expected first argument to be of type boolean, string, number or null, but found ${x(r.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, p);
      return s ? new Ce(r, i, s) : null;
    } else
      return new Ce(r, i);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!U(t, ["boolean", "string", "number", "null"]))
      throw new M(`Expected first argument to be of type boolean, string, number or null, but found ${x(S(t))} instead.`);
    let i;
    if (this.fromIndex && (i = this.fromIndex.evaluate(e)), U(r, ["string"])) {
      const s = r.indexOf(t, i);
      return s === -1 ? -1 : [...r.slice(0, s)].length;
    } else {
      if (U(r, ["array"]))
        return r.indexOf(t, i);
      throw new M(`Expected second argument to be of type array or string, but found ${x(S(r))} instead.`);
    }
  }
  eachChild(e) {
    e(this.needle), e(this.haystack), this.fromIndex && e(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class ut {
  constructor(e, t, r, i, s, o) {
    this.inputType = e, this.type = t, this.input = r, this.cases = i, this.outputs = s, this.otherwise = o;
  }
  static parse(e, t) {
    if (e.length < 5)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if (e.length % 2 !== 1)
      return t.error("Expected an even number of arguments.");
    let r, i;
    t.expectedType && t.expectedType.kind !== "value" && (i = t.expectedType);
    const s = {}, o = [];
    for (let u = 2; u < e.length - 1; u += 2) {
      let c = e[u];
      const f = e[u + 1];
      Array.isArray(c) || (c = [c]);
      const h = t.concat(u);
      if (c.length === 0)
        return h.error("Expected at least one branch label.");
      for (const y of c) {
        if (typeof y != "number" && typeof y != "string")
          return h.error("Branch labels must be numbers or strings.");
        if (typeof y == "number" && Math.abs(y) > Number.MAX_SAFE_INTEGER)
          return h.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
        if (typeof y == "number" && Math.floor(y) !== y)
          return h.error("Numeric branch labels must be integer values.");
        if (!r)
          r = S(y);
        else if (h.checkSubtype(r, S(y)))
          return null;
        if (typeof s[String(y)] < "u")
          return h.error("Branch labels must be unique.");
        s[String(y)] = o.length;
      }
      const d = t.parse(f, u, i);
      if (!d)
        return null;
      i = i || d.type, o.push(d);
    }
    const a = t.parse(e[1], 1, v);
    if (!a)
      return null;
    const l = t.parse(e[e.length - 1], e.length - 1, i);
    return !l || a.type.kind !== "value" && t.concat(1).checkSubtype(r, a.type) ? null : new ut(r, i, a, s, o, l);
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    return (S(t) === this.inputType && this.outputs[this.cases[t]] || this.otherwise).evaluate(e);
  }
  eachChild(e) {
    e(this.input), this.outputs.forEach(e), e(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined()) && this.otherwise.outputDefined();
  }
}
class ct {
  constructor(e, t, r) {
    this.type = e, this.branches = t, this.otherwise = r;
  }
  static parse(e, t) {
    if (e.length < 4)
      return t.error(`Expected at least 3 arguments, but found only ${e.length - 1}.`);
    if (e.length % 2 !== 0)
      return t.error("Expected an odd number of arguments.");
    let r;
    t.expectedType && t.expectedType.kind !== "value" && (r = t.expectedType);
    const i = [];
    for (let o = 1; o < e.length - 1; o += 2) {
      const a = t.parse(e[o], o, m);
      if (!a)
        return null;
      const l = t.parse(e[o + 1], o + 1, r);
      if (!l)
        return null;
      i.push([a, l]), r = r || l.type;
    }
    const s = t.parse(e[e.length - 1], e.length - 1, r);
    if (!s)
      return null;
    if (!r)
      throw new Error("Can't infer output type");
    return new ct(r, i, s);
  }
  evaluate(e) {
    for (const [t, r] of this.branches)
      if (t.evaluate(e))
        return r.evaluate(e);
    return this.otherwise.evaluate(e);
  }
  eachChild(e) {
    for (const [t, r] of this.branches)
      e(t), e(r);
    e(this.otherwise);
  }
  outputDefined() {
    return this.branches.every(([e, t]) => t.outputDefined()) && this.otherwise.outputDefined();
  }
}
class we {
  constructor(e, t, r, i) {
    this.type = e, this.input = t, this.beginIndex = r, this.endIndex = i;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, v), i = t.parse(e[2], 2, p);
    if (!r || !i)
      return null;
    if (!st(r.type, [L(v), b, v]))
      return t.error(`Expected first argument to be of type array or string, but found ${x(r.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, p);
      return s ? new we(r.type, r, i, s) : null;
    } else
      return new we(r.type, r, i);
  }
  evaluate(e) {
    const t = this.input.evaluate(e), r = this.beginIndex.evaluate(e);
    let i;
    if (this.endIndex && (i = this.endIndex.evaluate(e)), U(t, ["string"]))
      return [...t].slice(r, i).join("");
    if (U(t, ["array"]))
      return t.slice(r, i);
    throw new M(`Expected first argument to be of type array or string, but found ${x(S(t))} instead.`);
  }
  eachChild(e) {
    e(this.input), e(this.beginIndex), this.endIndex && e(this.endIndex);
  }
  outputDefined() {
    return !1;
  }
}
function _e(n, e) {
  const t = n.length - 1;
  let r = 0, i = t, s = 0, o, a;
  for (; r <= i; )
    if (s = Math.floor((r + i) / 2), o = n[s], a = n[s + 1], o <= e) {
      if (s === t || e < a)
        return s;
      r = s + 1;
    } else if (o > e)
      i = s - 1;
    else
      throw new M("Input is not a number.");
  return 0;
}
class Fe {
  constructor(e, t, r) {
    this.type = e, this.input = t, this.labels = [], this.outputs = [];
    for (const [i, s] of r)
      this.labels.push(i), this.outputs.push(s);
  }
  static parse(e, t) {
    if (e.length - 1 < 4)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if ((e.length - 1) % 2 !== 0)
      return t.error("Expected an even number of arguments.");
    const r = t.parse(e[1], 1, p);
    if (!r)
      return null;
    const i = [];
    let s = null;
    t.expectedType && t.expectedType.kind !== "value" && (s = t.expectedType);
    for (let o = 1; o < e.length; o += 2) {
      const a = o === 1 ? -1 / 0 : e[o], l = e[o + 1], u = o, c = o + 1;
      if (typeof a != "number")
        return t.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', u);
      if (i.length && i[i.length - 1][0] >= a)
        return t.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', u);
      const f = t.parse(l, c, s);
      if (!f)
        return null;
      s = s || f.type, i.push([a, f]);
    }
    return new Fe(s, r, i);
  }
  evaluate(e) {
    const t = this.labels, r = this.outputs;
    if (t.length === 1)
      return r[0].evaluate(e);
    const i = this.input.evaluate(e);
    if (i <= t[0])
      return r[0].evaluate(e);
    const s = t.length;
    if (i >= t[s - 1])
      return r[s - 1].evaluate(e);
    const o = _e(t, i);
    return r[o].evaluate(e);
  }
  eachChild(e) {
    e(this.input);
    for (const t of this.outputs)
      e(t);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined());
  }
}
function qn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var We, $t;
function Wn() {
  if ($t) return We;
  $t = 1, We = n;
  function n(e, t, r, i) {
    this.cx = 3 * e, this.bx = 3 * (r - e) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * t, this.by = 3 * (i - t) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = e, this.p1y = t, this.p2x = r, this.p2y = i;
  }
  return n.prototype = {
    sampleCurveX: function(e) {
      return ((this.ax * e + this.bx) * e + this.cx) * e;
    },
    sampleCurveY: function(e) {
      return ((this.ay * e + this.by) * e + this.cy) * e;
    },
    sampleCurveDerivativeX: function(e) {
      return (3 * this.ax * e + 2 * this.bx) * e + this.cx;
    },
    solveCurveX: function(e, t) {
      if (t === void 0 && (t = 1e-6), e < 0) return 0;
      if (e > 1) return 1;
      for (var r = e, i = 0; i < 8; i++) {
        var s = this.sampleCurveX(r) - e;
        if (Math.abs(s) < t) return r;
        var o = this.sampleCurveDerivativeX(r);
        if (Math.abs(o) < 1e-6) break;
        r = r - s / o;
      }
      var a = 0, l = 1;
      for (r = e, i = 0; i < 20 && (s = this.sampleCurveX(r), !(Math.abs(s - e) < t)); i++)
        e > s ? a = r : l = r, r = (l - a) * 0.5 + a;
      return r;
    },
    solve: function(e, t) {
      return this.sampleCurveY(this.solveCurveX(e, t));
    }
  }, We;
}
var Vn = Wn(), Un = /* @__PURE__ */ qn(Vn);
class D {
  constructor(e, t, r, i, s) {
    this.type = e, this.operator = t, this.interpolation = r, this.input = i, this.labels = [], this.outputs = [];
    for (const [o, a] of s)
      this.labels.push(o), this.outputs.push(a);
  }
  static interpolationFactor(e, t, r, i) {
    let s = 0;
    if (e.name === "exponential")
      s = Ve(t, e.base, r, i);
    else if (e.name === "linear")
      s = Ve(t, 1, r, i);
    else if (e.name === "cubic-bezier") {
      const o = e.controlPoints;
      s = new Un(o[0], o[1], o[2], o[3]).solve(Ve(t, 1, r, i));
    }
    return s;
  }
  static parse(e, t) {
    let [r, i, s, ...o] = e;
    if (!Array.isArray(i) || i.length === 0)
      return t.error("Expected an interpolation type expression.", 1);
    if (i[0] === "linear")
      i = { name: "linear" };
    else if (i[0] === "exponential") {
      const u = i[1];
      if (typeof u != "number")
        return t.error("Exponential interpolation requires a numeric base.", 1, 1);
      i = {
        name: "exponential",
        base: u
      };
    } else if (i[0] === "cubic-bezier") {
      const u = i.slice(1);
      if (u.length !== 4 || u.some((c) => typeof c != "number" || c < 0 || c > 1))
        return t.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
      i = {
        name: "cubic-bezier",
        controlPoints: u
      };
    } else
      return t.error(`Unknown interpolation type ${String(i[0])}`, 1, 0);
    if (e.length - 1 < 4)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if ((e.length - 1) % 2 !== 0)
      return t.error("Expected an even number of arguments.");
    if (s = t.parse(s, 2, p), !s)
      return null;
    const a = [];
    let l = null;
    r === "interpolate-hcl" || r === "interpolate-lab" ? l = F : t.expectedType && t.expectedType.kind !== "value" && (l = t.expectedType);
    for (let u = 0; u < o.length; u += 2) {
      const c = o[u], f = o[u + 1], h = u + 3, d = u + 4;
      if (typeof c != "number")
        return t.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', h);
      if (a.length && a[a.length - 1][0] >= c)
        return t.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', h);
      const y = t.parse(f, d, l);
      if (!y)
        return null;
      l = l || y.type, a.push([c, y]);
    }
    return !G(l, p) && !G(l, Ie) && !G(l, F) && !G(l, $e) && !G(l, Ne) && !G(l, L(p)) ? t.error(`Type ${x(l)} is not interpolatable.`) : new D(l, r, i, s, a);
  }
  evaluate(e) {
    const t = this.labels, r = this.outputs;
    if (t.length === 1)
      return r[0].evaluate(e);
    const i = this.input.evaluate(e);
    if (i <= t[0])
      return r[0].evaluate(e);
    const s = t.length;
    if (i >= t[s - 1])
      return r[s - 1].evaluate(e);
    const o = _e(t, i), a = t[o], l = t[o + 1], u = D.interpolationFactor(this.interpolation, i, a, l), c = r[o].evaluate(e), f = r[o + 1].evaluate(e);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return q(c, f, u);
          case "color":
            return k.interpolate(c, f, u);
          case "padding":
            return T.interpolate(c, f, u);
          case "variableAnchorOffsetCollection":
            return N.interpolate(c, f, u);
          case "array":
            return oe(c, f, u);
          case "projectionDefinition":
            return $.interpolate(c, f, u);
        }
      case "interpolate-hcl":
        return k.interpolate(c, f, u, "hcl");
      case "interpolate-lab":
        return k.interpolate(c, f, u, "lab");
    }
  }
  eachChild(e) {
    e(this.input);
    for (const t of this.outputs)
      e(t);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined());
  }
}
function Ve(n, e, t, r) {
  const i = r - t, s = n - t;
  return i === 0 ? 0 : e === 1 ? s / i : (Math.pow(e, s) - 1) / (Math.pow(e, i) - 1);
}
const Xn = {
  color: k.interpolate,
  number: q,
  padding: T.interpolate,
  variableAnchorOffsetCollection: N.interpolate,
  array: oe
};
class le {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let r = null;
    const i = t.expectedType;
    i && i.kind !== "value" && (r = i);
    const s = [];
    for (const a of e.slice(1)) {
      const l = t.parse(a, 1 + s.length, r, void 0, { typeAnnotation: "omit" });
      if (!l)
        return null;
      r = r || l.type, s.push(l);
    }
    if (!r)
      throw new Error("No output type");
    return i && s.some((a) => se(i, a.type)) ? new le(v, s) : new le(r, s);
  }
  evaluate(e) {
    let t = null, r = 0, i;
    for (const s of this.args)
      if (r++, t = s.evaluate(e), t && t instanceof R && !t.available && (i || (i = t.name), t = null, r === this.args.length && (t = i)), t !== null)
        break;
    return t;
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
function Nt(n, e) {
  return n === "==" || n === "!=" ? e.kind === "boolean" || e.kind === "string" || e.kind === "number" || e.kind === "null" || e.kind === "value" : e.kind === "string" || e.kind === "number" || e.kind === "value";
}
function Zn(n, e, t) {
  return e === t;
}
function Gn(n, e, t) {
  return e !== t;
}
function Jn(n, e, t) {
  return e < t;
}
function Yn(n, e, t) {
  return e > t;
}
function Qn(n, e, t) {
  return e <= t;
}
function Kn(n, e, t) {
  return e >= t;
}
function sn(n, e, t, r) {
  return r.compare(e, t) === 0;
}
function er(n, e, t, r) {
  return !sn(n, e, t, r);
}
function tr(n, e, t, r) {
  return r.compare(e, t) < 0;
}
function nr(n, e, t, r) {
  return r.compare(e, t) > 0;
}
function rr(n, e, t, r) {
  return r.compare(e, t) <= 0;
}
function ir(n, e, t, r) {
  return r.compare(e, t) >= 0;
}
function te(n, e, t) {
  const r = n !== "==" && n !== "!=";
  return class on {
    constructor(s, o, a) {
      this.type = m, this.lhs = s, this.rhs = o, this.collator = a, this.hasUntypedArgument = s.type.kind === "value" || o.type.kind === "value";
    }
    static parse(s, o) {
      if (s.length !== 3 && s.length !== 4)
        return o.error("Expected two or three arguments.");
      const a = s[0];
      let l = o.parse(s[1], 1, v);
      if (!l)
        return null;
      if (!Nt(a, l.type))
        return o.concat(1).error(`"${a}" comparisons are not supported for type '${x(l.type)}'.`);
      let u = o.parse(s[2], 2, v);
      if (!u)
        return null;
      if (!Nt(a, u.type))
        return o.concat(2).error(`"${a}" comparisons are not supported for type '${x(u.type)}'.`);
      if (l.type.kind !== u.type.kind && l.type.kind !== "value" && u.type.kind !== "value")
        return o.error(`Cannot compare types '${x(l.type)}' and '${x(u.type)}'.`);
      r && (l.type.kind === "value" && u.type.kind !== "value" ? l = new A(u.type, [l]) : l.type.kind !== "value" && u.type.kind === "value" && (u = new A(l.type, [u])));
      let c = null;
      if (s.length === 4) {
        if (l.type.kind !== "string" && u.type.kind !== "string" && l.type.kind !== "value" && u.type.kind !== "value")
          return o.error("Cannot use collator to compare non-string types.");
        if (c = o.parse(s[3], 3, Te), !c)
          return null;
      }
      return new on(l, u, c);
    }
    evaluate(s) {
      const o = this.lhs.evaluate(s), a = this.rhs.evaluate(s);
      if (r && this.hasUntypedArgument) {
        const l = S(o), u = S(a);
        if (l.kind !== u.kind || !(l.kind === "string" || l.kind === "number"))
          throw new M(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${u.kind}) instead.`);
      }
      if (this.collator && !r && this.hasUntypedArgument) {
        const l = S(o), u = S(a);
        if (l.kind !== "string" || u.kind !== "string")
          return e(s, o, a);
      }
      return this.collator ? t(s, o, a, this.collator.evaluate(s)) : e(s, o, a);
    }
    eachChild(s) {
      s(this.lhs), s(this.rhs), this.collator && s(this.collator);
    }
    outputDefined() {
      return !0;
    }
  };
}
const sr = te("==", Zn, sn), or = te("!=", Gn, er), ar = te("<", Jn, tr), lr = te(">", Yn, nr), ur = te("<=", Qn, rr), cr = te(">=", Kn, ir);
class Be {
  constructor(e, t, r) {
    this.type = Te, this.locale = r, this.caseSensitive = e, this.diacriticSensitive = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected one argument.");
    const r = e[1];
    if (typeof r != "object" || Array.isArray(r))
      return t.error("Collator options argument must be an object.");
    const i = t.parse(r["case-sensitive"] === void 0 ? !1 : r["case-sensitive"], 1, m);
    if (!i)
      return null;
    const s = t.parse(r["diacritic-sensitive"] === void 0 ? !1 : r["diacritic-sensitive"], 1, m);
    if (!s)
      return null;
    let o = null;
    return r.locale && (o = t.parse(r.locale, 1, b), !o) ? null : new Be(i, s, o);
  }
  evaluate(e) {
    return new ot(this.caseSensitive.evaluate(e), this.diacriticSensitive.evaluate(e), this.locale ? this.locale.evaluate(e) : null);
  }
  eachChild(e) {
    e(this.caseSensitive), e(this.diacriticSensitive), this.locale && e(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class ft {
  constructor(e, t, r, i, s) {
    this.type = b, this.number = e, this.locale = t, this.currency = r, this.minFractionDigits = i, this.maxFractionDigits = s;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error("Expected two arguments.");
    const r = t.parse(e[1], 1, p);
    if (!r)
      return null;
    const i = e[2];
    if (typeof i != "object" || Array.isArray(i))
      return t.error("NumberFormat options argument must be an object.");
    let s = null;
    if (i.locale && (s = t.parse(i.locale, 1, b), !s))
      return null;
    let o = null;
    if (i.currency && (o = t.parse(i.currency, 1, b), !o))
      return null;
    let a = null;
    if (i["min-fraction-digits"] && (a = t.parse(i["min-fraction-digits"], 1, p), !a))
      return null;
    let l = null;
    return i["max-fraction-digits"] && (l = t.parse(i["max-fraction-digits"], 1, p), !l) ? null : new ft(r, s, o, a, l);
  }
  evaluate(e) {
    return new Intl.NumberFormat(this.locale ? this.locale.evaluate(e) : [], {
      style: this.currency ? "currency" : "decimal",
      currency: this.currency ? this.currency.evaluate(e) : void 0,
      minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(e) : void 0,
      maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(e) : void 0
    }).format(this.number.evaluate(e));
  }
  eachChild(e) {
    e(this.number), this.locale && e(this.locale), this.currency && e(this.currency), this.minFractionDigits && e(this.minFractionDigits), this.maxFractionDigits && e(this.maxFractionDigits);
  }
  outputDefined() {
    return !1;
  }
}
class ht {
  constructor(e) {
    this.type = Le, this.sections = e;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const r = e[1];
    if (!Array.isArray(r) && typeof r == "object")
      return t.error("First argument must be an image or text section.");
    const i = [];
    let s = !1;
    for (let o = 1; o <= e.length - 1; ++o) {
      const a = e[o];
      if (s && typeof a == "object" && !Array.isArray(a)) {
        s = !1;
        let l = null;
        if (a["font-scale"] && (l = t.parse(a["font-scale"], 1, p), !l))
          return null;
        let u = null;
        if (a["text-font"] && (u = t.parse(a["text-font"], 1, L(b)), !u))
          return null;
        let c = null;
        if (a["text-color"] && (c = t.parse(a["text-color"], 1, F), !c))
          return null;
        const f = i[i.length - 1];
        f.scale = l, f.font = u, f.textColor = c;
      } else {
        const l = t.parse(e[o], 1, v);
        if (!l)
          return null;
        const u = l.type.kind;
        if (u !== "string" && u !== "value" && u !== "null" && u !== "resolvedImage")
          return t.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        s = !0, i.push({ content: l, scale: null, font: null, textColor: null });
      }
    }
    return new ht(i);
  }
  evaluate(e) {
    const t = (r) => {
      const i = r.content.evaluate(e);
      return S(i) === ce ? new Ze("", i, null, null, null) : new Ze(ie(i), null, r.scale ? r.scale.evaluate(e) : null, r.font ? r.font.evaluate(e).join(",") : null, r.textColor ? r.textColor.evaluate(e) : null);
    };
    return new B(this.sections.map(t));
  }
  eachChild(e) {
    for (const t of this.sections)
      e(t.content), t.scale && e(t.scale), t.font && e(t.font), t.textColor && e(t.textColor);
  }
  outputDefined() {
    return !1;
  }
}
class pt {
  constructor(e) {
    this.type = ce, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected two arguments.");
    const r = t.parse(e[1], 1, b);
    return r ? new pt(r) : t.error("No image name provided.");
  }
  evaluate(e) {
    const t = this.input.evaluate(e), r = R.fromString(t);
    return r && e.availableImages && (r.available = e.availableImages.indexOf(t) > -1), r;
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class dt {
  constructor(e) {
    this.type = p, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`Expected 1 argument, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1);
    return r ? r.type.kind !== "array" && r.type.kind !== "string" && r.type.kind !== "value" ? t.error(`Expected argument of type string or array, but found ${x(r.type)} instead.`) : new dt(r) : null;
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    if (typeof t == "string")
      return [...t].length;
    if (Array.isArray(t))
      return t.length;
    throw new M(`Expected value to be of type string or array, but found ${x(S(t))} instead.`);
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const z = 8192;
function fr(n, e) {
  const t = hr(n[0]), r = dr(n[1]), i = Math.pow(2, e.z);
  return [Math.round(t * i * z), Math.round(r * i * z)];
}
function yt(n, e) {
  const t = Math.pow(2, e.z), r = (n[0] / z + e.x) / t, i = (n[1] / z + e.y) / t;
  return [pr(r), yr(i)];
}
function hr(n) {
  return (180 + n) / 360;
}
function pr(n) {
  return n * 360 - 180;
}
function dr(n) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + n * Math.PI / 360))) / 360;
}
function yr(n) {
  return 360 / Math.PI * Math.atan(Math.exp((180 - n * 360) * Math.PI / 180)) - 90;
}
function fe(n, e) {
  n[0] = Math.min(n[0], e[0]), n[1] = Math.min(n[1], e[1]), n[2] = Math.max(n[2], e[0]), n[3] = Math.max(n[3], e[1]);
}
function ue(n, e) {
  return !(n[0] <= e[0] || n[2] >= e[2] || n[1] <= e[1] || n[3] >= e[3]);
}
function gr(n, e, t) {
  return e[1] > n[1] != t[1] > n[1] && n[0] < (t[0] - e[0]) * (n[1] - e[1]) / (t[1] - e[1]) + e[0];
}
function mr(n, e, t) {
  const r = n[0] - e[0], i = n[1] - e[1], s = n[0] - t[0], o = n[1] - t[1];
  return r * o - s * i === 0 && r * s <= 0 && i * o <= 0;
}
function ze(n, e, t, r) {
  const i = [e[0] - n[0], e[1] - n[1]], s = [r[0] - t[0], r[1] - t[1]];
  return wr(s, i) === 0 ? !1 : !!(Dt(n, e, t, r) && Dt(t, r, n, e));
}
function vr(n, e, t) {
  for (const r of t)
    for (let i = 0; i < r.length - 1; ++i)
      if (ze(n, e, r[i], r[i + 1]))
        return !0;
  return !1;
}
function ne(n, e, t = !1) {
  let r = !1;
  for (const i of e)
    for (let s = 0; s < i.length - 1; s++) {
      if (mr(n, i[s], i[s + 1]))
        return t;
      gr(n, i[s], i[s + 1]) && (r = !r);
    }
  return r;
}
function br(n, e) {
  for (const t of e)
    if (ne(n, t))
      return !0;
  return !1;
}
function an(n, e) {
  for (const t of n)
    if (!ne(t, e))
      return !1;
  for (let t = 0; t < n.length - 1; ++t)
    if (vr(n[t], n[t + 1], e))
      return !1;
  return !0;
}
function Cr(n, e) {
  for (const t of e)
    if (an(n, t))
      return !0;
  return !1;
}
function wr(n, e) {
  return n[0] * e[1] - n[1] * e[0];
}
function Dt(n, e, t, r) {
  const i = n[0] - t[0], s = n[1] - t[1], o = e[0] - t[0], a = e[1] - t[1], l = r[0] - t[0], u = r[1] - t[1], c = i * u - l * s, f = o * u - l * a;
  return c > 0 && f < 0 || c < 0 && f > 0;
}
function gt(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = [];
    for (let o = 0; o < n[i].length; o++) {
      const a = fr(n[i][o], t);
      fe(e, a), s.push(a);
    }
    r.push(s);
  }
  return r;
}
function ln(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = gt(n[i], e, t);
    r.push(s);
  }
  return r;
}
function un(n, e, t, r) {
  if (n[0] < t[0] || n[0] > t[2]) {
    const i = r * 0.5;
    let s = n[0] - t[0] > i ? -r : t[0] - n[0] > i ? r : 0;
    s === 0 && (s = n[0] - t[2] > i ? -r : t[2] - n[0] > i ? r : 0), n[0] += s;
  }
  fe(e, n);
}
function kr(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function At(n, e, t, r) {
  const i = Math.pow(2, r.z) * z, s = [r.x * z, r.y * z], o = [];
  for (const a of n)
    for (const l of a) {
      const u = [l.x + s[0], l.y + s[1]];
      un(u, e, t, i), o.push(u);
    }
  return o;
}
function Pt(n, e, t, r) {
  const i = Math.pow(2, r.z) * z, s = [r.x * z, r.y * z], o = [];
  for (const a of n) {
    const l = [];
    for (const u of a) {
      const c = [u.x + s[0], u.y + s[1]];
      fe(e, c), l.push(c);
    }
    o.push(l);
  }
  if (e[2] - e[0] <= i / 2) {
    kr(e);
    for (const a of o)
      for (const l of a)
        un(l, e, t, i);
  }
  return o;
}
function xr(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const s = gt(e.coordinates, r, i), o = At(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!ne(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = ln(e.coordinates, r, i), o = At(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!br(a, s))
        return !1;
  }
  return !0;
}
function Er(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const s = gt(e.coordinates, r, i), o = Pt(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!an(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = ln(e.coordinates, r, i), o = Pt(n.geometry(), t, r, i);
    if (!ue(t, r))
      return !1;
    for (const a of o)
      if (!Cr(a, s))
        return !1;
  }
  return !0;
}
class X {
  constructor(e, t) {
    this.type = m, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'within' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (ae(e[1])) {
      const r = e[1];
      if (r.type === "FeatureCollection") {
        const i = [];
        for (const s of r.features) {
          const { type: o, coordinates: a } = s.geometry;
          o === "Polygon" && i.push(a), o === "MultiPolygon" && i.push(...a);
        }
        if (i.length) {
          const s = {
            type: "MultiPolygon",
            coordinates: i
          };
          return new X(r, s);
        }
      } else if (r.type === "Feature") {
        const i = r.geometry.type;
        if (i === "Polygon" || i === "MultiPolygon")
          return new X(r, r.geometry);
      } else if (r.type === "Polygon" || r.type === "MultiPolygon")
        return new X(r, r);
    }
    return t.error("'within' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryDollarType() === "Point")
        return xr(e, this.geometries);
      if (e.geometryDollarType() === "LineString")
        return Er(e, this.geometries);
    }
    return !1;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class cn {
  constructor(e = [], t = (r, i) => r < i ? -1 : r > i ? 1 : 0) {
    if (this.data = e, this.length = this.data.length, this.compare = t, this.length > 0)
      for (let r = (this.length >> 1) - 1; r >= 0; r--) this._down(r);
  }
  push(e) {
    this.data.push(e), this._up(this.length++);
  }
  pop() {
    if (this.length === 0) return;
    const e = this.data[0], t = this.data.pop();
    return --this.length > 0 && (this.data[0] = t, this._down(0)), e;
  }
  peek() {
    return this.data[0];
  }
  _up(e) {
    const { data: t, compare: r } = this, i = t[e];
    for (; e > 0; ) {
      const s = e - 1 >> 1, o = t[s];
      if (r(i, o) >= 0) break;
      t[e] = o, e = s;
    }
    t[e] = i;
  }
  _down(e) {
    const { data: t, compare: r } = this, i = this.length >> 1, s = t[e];
    for (; e < i; ) {
      let o = (e << 1) + 1;
      const a = o + 1;
      if (a < this.length && r(t[a], t[o]) < 0 && (o = a), r(t[o], s) >= 0) break;
      t[e] = t[o], e = o;
    }
    t[e] = s;
  }
}
const Mr = 6378.137, _t = 1 / 298.257223563, Ft = _t * (2 - _t), Bt = Math.PI / 180;
class mt {
  constructor(e) {
    const t = Bt * Mr * 1e3, r = Math.cos(e * Bt), i = 1 / (1 - Ft * (1 - r * r)), s = Math.sqrt(i);
    this.kx = t * s * r, this.ky = t * s * i * (1 - Ft);
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
  distance(e, t) {
    const r = this.wrap(e[0] - t[0]) * this.kx, i = (e[1] - t[1]) * this.ky;
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
  pointOnLine(e, t) {
    let r = 1 / 0, i, s, o, a;
    for (let l = 0; l < e.length - 1; l++) {
      let u = e[l][0], c = e[l][1], f = this.wrap(e[l + 1][0] - u) * this.kx, h = (e[l + 1][1] - c) * this.ky, d = 0;
      (f !== 0 || h !== 0) && (d = (this.wrap(t[0] - u) * this.kx * f + (t[1] - c) * this.ky * h) / (f * f + h * h), d > 1 ? (u = e[l + 1][0], c = e[l + 1][1]) : d > 0 && (u += f / this.kx * d, c += h / this.ky * d)), f = this.wrap(t[0] - u) * this.kx, h = (t[1] - c) * this.ky;
      const y = f * f + h * h;
      y < r && (r = y, i = u, s = c, o = l, a = d);
    }
    return {
      point: [i, s],
      index: o,
      t: Math.max(0, Math.min(1, a))
    };
  }
  wrap(e) {
    for (; e < -180; )
      e += 360;
    for (; e > 180; )
      e -= 360;
    return e;
  }
}
const Ge = 100, Je = 50;
function fn(n, e) {
  return e[0] - n[0];
}
function ke(n) {
  return n[1] - n[0] + 1;
}
function j(n, e) {
  return n[1] >= n[0] && n[1] < e;
}
function Ye(n, e) {
  if (n[0] > n[1])
    return [null, null];
  const t = ke(n);
  if (e) {
    if (t === 2)
      return [n, null];
    const i = Math.floor(t / 2);
    return [
      [n[0], n[0] + i],
      [n[0] + i, n[1]]
    ];
  }
  if (t === 1)
    return [n, null];
  const r = Math.floor(t / 2) - 1;
  return [
    [n[0], n[0] + r],
    [n[0] + r + 1, n[1]]
  ];
}
function Qe(n, e) {
  if (!j(e, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let r = e[0]; r <= e[1]; ++r)
    fe(t, n[r]);
  return t;
}
function Ke(n) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const t of n)
    for (const r of t)
      fe(e, r);
  return e;
}
function zt(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function vt(n, e, t) {
  if (!zt(n) || !zt(e))
    return NaN;
  let r = 0, i = 0;
  return n[2] < e[0] && (r = e[0] - n[2]), n[0] > e[2] && (r = n[0] - e[2]), n[1] > e[3] && (i = n[1] - e[3]), n[3] < e[1] && (i = e[1] - n[3]), t.distance([0, 0], [r, i]);
}
function V(n, e, t) {
  const r = t.pointOnLine(e, n);
  return t.distance(n, r.point);
}
function bt(n, e, t, r, i) {
  const s = Math.min(V(n, [t, r], i), V(e, [t, r], i)), o = Math.min(V(t, [n, e], i), V(r, [n, e], i));
  return Math.min(s, o);
}
function Sr(n, e, t, r, i) {
  if (!(j(e, n.length) && j(r, t.length)))
    return 1 / 0;
  let o = 1 / 0;
  for (let a = e[0]; a < e[1]; ++a) {
    const l = n[a], u = n[a + 1];
    for (let c = r[0]; c < r[1]; ++c) {
      const f = t[c], h = t[c + 1];
      if (ze(l, u, f, h))
        return 0;
      o = Math.min(o, bt(l, u, f, h, i));
    }
  }
  return o;
}
function Ir(n, e, t, r, i) {
  if (!(j(e, n.length) && j(r, t.length)))
    return NaN;
  let o = 1 / 0;
  for (let a = e[0]; a <= e[1]; ++a)
    for (let l = r[0]; l <= r[1]; ++l)
      if (o = Math.min(o, i.distance(n[a], t[l])), o === 0)
        return o;
  return o;
}
function Tr(n, e, t) {
  if (ne(n, e, !0))
    return 0;
  let r = 1 / 0;
  for (const i of e) {
    const s = i[0], o = i[i.length - 1];
    if (s !== o && (r = Math.min(r, V(n, [o, s], t)), r === 0))
      return r;
    const a = t.pointOnLine(i, n);
    if (r = Math.min(r, t.distance(n, a.point)), r === 0)
      return r;
  }
  return r;
}
function Lr(n, e, t, r) {
  if (!j(e, n.length))
    return NaN;
  for (let s = e[0]; s <= e[1]; ++s)
    if (ne(n[s], t, !0))
      return 0;
  let i = 1 / 0;
  for (let s = e[0]; s < e[1]; ++s) {
    const o = n[s], a = n[s + 1];
    for (const l of t)
      for (let u = 0, c = l.length, f = c - 1; u < c; f = u++) {
        const h = l[f], d = l[u];
        if (ze(o, a, h, d))
          return 0;
        i = Math.min(i, bt(o, a, h, d, r));
      }
  }
  return i;
}
function Ht(n, e) {
  for (const t of n)
    for (const r of t)
      if (ne(r, e, !0))
        return !0;
  return !1;
}
function $r(n, e, t, r = 1 / 0) {
  const i = Ke(n), s = Ke(e);
  if (r !== 1 / 0 && vt(i, s, t) >= r)
    return r;
  if (ue(i, s)) {
    if (Ht(n, e))
      return 0;
  } else if (Ht(e, n))
    return 0;
  let o = 1 / 0;
  for (const a of n)
    for (let l = 0, u = a.length, c = u - 1; l < u; c = l++) {
      const f = a[c], h = a[l];
      for (const d of e)
        for (let y = 0, C = d.length, E = C - 1; y < C; E = y++) {
          const w = d[E], I = d[y];
          if (ze(f, h, w, I))
            return 0;
          o = Math.min(o, bt(f, h, w, I, t));
        }
    }
  return o;
}
function jt(n, e, t, r, i, s) {
  if (!s)
    return;
  const o = vt(Qe(r, s), i, t);
  o < e && n.push([o, s, [0, 0]]);
}
function ve(n, e, t, r, i, s, o) {
  if (!s || !o)
    return;
  const a = vt(Qe(r, s), Qe(i, o), t);
  a < e && n.push([a, s, o]);
}
function xe(n, e, t, r, i = 1 / 0) {
  let s = Math.min(r.distance(n[0], t[0][0]), i);
  if (s === 0)
    return s;
  const o = new cn([[0, [0, n.length - 1], [0, 0]]], fn), a = Ke(t);
  for (; o.length > 0; ) {
    const l = o.pop();
    if (l[0] >= s)
      continue;
    const u = l[1], c = e ? Je : Ge;
    if (ke(u) <= c) {
      if (!j(u, n.length))
        return NaN;
      if (e) {
        const f = Lr(n, u, t, r);
        if (isNaN(f) || f === 0)
          return f;
        s = Math.min(s, f);
      } else
        for (let f = u[0]; f <= u[1]; ++f) {
          const h = Tr(n[f], t, r);
          if (s = Math.min(s, h), s === 0)
            return 0;
        }
    } else {
      const f = Ye(u, e);
      jt(o, s, r, n, a, f[0]), jt(o, s, r, n, a, f[1]);
    }
  }
  return s;
}
function Ee(n, e, t, r, i, s = 1 / 0) {
  let o = Math.min(s, i.distance(n[0], t[0]));
  if (o === 0)
    return o;
  const a = new cn([[0, [0, n.length - 1], [0, t.length - 1]]], fn);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= o)
      continue;
    const u = l[1], c = l[2], f = e ? Je : Ge, h = r ? Je : Ge;
    if (ke(u) <= f && ke(c) <= h) {
      if (!j(u, n.length) && j(c, t.length))
        return NaN;
      let d;
      if (e && r)
        d = Sr(n, u, t, c, i), o = Math.min(o, d);
      else if (e && !r) {
        const y = n.slice(u[0], u[1] + 1);
        for (let C = c[0]; C <= c[1]; ++C)
          if (d = V(t[C], y, i), o = Math.min(o, d), o === 0)
            return o;
      } else if (!e && r) {
        const y = t.slice(c[0], c[1] + 1);
        for (let C = u[0]; C <= u[1]; ++C)
          if (d = V(n[C], y, i), o = Math.min(o, d), o === 0)
            return o;
      } else
        d = Ir(n, u, t, c, i), o = Math.min(o, d);
    } else {
      const d = Ye(u, e), y = Ye(c, r);
      ve(a, o, i, n, t, d[0], y[0]), ve(a, o, i, n, t, d[0], y[1]), ve(a, o, i, n, t, d[1], y[0]), ve(a, o, i, n, t, d[1], y[1]);
    }
  }
  return o;
}
function Nr(n, e) {
  const t = n.geometry(), r = t.flat().map((o) => yt([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new mt(r[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Ee(r, !1, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Ee(r, !1, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, xe(r, !1, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Dr(n, e) {
  const t = n.geometry(), r = t.flat().map((o) => yt([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new mt(r[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Ee(r, !0, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Ee(r, !0, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, xe(r, !0, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Ar(n, e) {
  const t = n.geometry();
  if (t.length === 0 || t[0].length === 0)
    return NaN;
  const r = jn(t).map((o) => o.map((a) => a.map((l) => yt([l.x, l.y], n.canonical)))), i = new mt(r[0][0][0][1]);
  let s = 1 / 0;
  for (const o of e)
    for (const a of r) {
      switch (o.type) {
        case "Point":
          s = Math.min(s, xe([o.coordinates], !1, a, i, s));
          break;
        case "LineString":
          s = Math.min(s, xe(o.coordinates, !0, a, i, s));
          break;
        case "Polygon":
          s = Math.min(s, $r(a, o.coordinates, i, s));
          break;
      }
      if (s === 0)
        return s;
    }
  return s;
}
function Ue(n) {
  return n.type === "MultiPolygon" ? n.coordinates.map((e) => ({
    type: "Polygon",
    coordinates: e
  })) : n.type === "MultiLineString" ? n.coordinates.map((e) => ({
    type: "LineString",
    coordinates: e
  })) : n.type === "MultiPoint" ? n.coordinates.map((e) => ({
    type: "Point",
    coordinates: e
  })) : [n];
}
class Z {
  constructor(e, t) {
    this.type = p, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'distance' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (ae(e[1])) {
      const r = e[1];
      if (r.type === "FeatureCollection")
        return new Z(r, r.features.map((i) => Ue(i.geometry)).flat());
      if (r.type === "Feature")
        return new Z(r, Ue(r.geometry));
      if ("type" in r && "coordinates" in r)
        return new Z(r, Ue(r));
    }
    return t.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryType() === "Point")
        return Nr(e, this.geometries);
      if (e.geometryType() === "LineString")
        return Dr(e, this.geometries);
      if (e.geometryType() === "Polygon")
        return Ar(e, this.geometries);
    }
    return NaN;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const Ct = {
  // special forms
  "==": sr,
  "!=": or,
  ">": lr,
  "<": ar,
  ">=": cr,
  "<=": ur,
  array: A,
  at,
  boolean: A,
  case: ct,
  coalesce: le,
  collator: Be,
  format: ht,
  image: pt,
  in: lt,
  "index-of": Ce,
  interpolate: D,
  "interpolate-hcl": D,
  "interpolate-lab": D,
  length: dt,
  let: Ae,
  literal: ee,
  match: ut,
  number: A,
  "number-format": ft,
  object: A,
  slice: we,
  step: Fe,
  string: A,
  "to-boolean": O,
  "to-color": O,
  "to-number": O,
  "to-string": O,
  var: Pe,
  within: X,
  distance: Z
};
class P {
  constructor(e, t, r, i) {
    this.name = e, this.type = t, this._evaluate = r, this.args = i;
  }
  evaluate(e) {
    return this._evaluate(e, this.args);
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return !1;
  }
  static parse(e, t) {
    const r = e[0], i = P.definitions[r];
    if (!i)
      return t.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const s = Array.isArray(i) ? i[0] : i.type, o = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads, a = o.filter(([u]) => !Array.isArray(u) || // varags
    u.length === e.length - 1);
    let l = null;
    for (const [u, c] of a) {
      l = new De(t.registry, Me, t.path, null, t.scope);
      const f = [];
      let h = !1;
      for (let d = 1; d < e.length; d++) {
        const y = e[d], C = Array.isArray(u) ? u[d - 1] : u.type, E = l.parse(y, 1 + f.length, C);
        if (!E) {
          h = !0;
          break;
        }
        f.push(E);
      }
      if (!h) {
        if (Array.isArray(u) && u.length !== f.length) {
          l.error(`Expected ${u.length} arguments, but found ${f.length} instead.`);
          continue;
        }
        for (let d = 0; d < f.length; d++) {
          const y = Array.isArray(u) ? u[d] : u.type, C = f[d];
          l.concat(d + 1).checkSubtype(y, C.type);
        }
        if (l.errors.length === 0)
          return new P(r, s, c, f);
      }
    }
    if (a.length === 1)
      t.errors.push(...l.errors);
    else {
      const c = (a.length ? a : o).map(([h]) => _r(h)).join(" | "), f = [];
      for (let h = 1; h < e.length; h++) {
        const d = t.parse(e[h], 1 + f.length);
        if (!d)
          return null;
        f.push(x(d.type));
      }
      t.error(`Expected arguments of type ${c}, but found (${f.join(", ")}) instead.`);
    }
    return null;
  }
  static register(e, t) {
    P.definitions = t;
    for (const r in t)
      e[r] = P;
  }
}
function Rt(n, [e, t, r, i]) {
  e = e.evaluate(n), t = t.evaluate(n), r = r.evaluate(n);
  const s = i ? i.evaluate(n) : 1, o = tn(e, t, r, s);
  if (o)
    throw new M(o);
  return new k(e / 255, t / 255, r / 255, s, !1);
}
function Ot(n, e) {
  return n in e;
}
function Xe(n, e) {
  const t = e[n];
  return typeof t > "u" ? null : t;
}
function Pr(n, e, t, r) {
  for (; t <= r; ) {
    const i = t + r >> 1;
    if (e[i] === n)
      return !0;
    e[i] > n ? r = i - 1 : t = i + 1;
  }
  return !1;
}
function W(n) {
  return { type: n };
}
P.register(Ct, {
  error: [
    Tn,
    [b],
    (n, [e]) => {
      throw new M(e.evaluate(n));
    }
  ],
  typeof: [
    b,
    [v],
    (n, [e]) => x(S(e.evaluate(n)))
  ],
  "to-rgba": [
    L(p, 4),
    [F],
    (n, [e]) => {
      const [t, r, i, s] = e.evaluate(n).rgb;
      return [t * 255, r * 255, i * 255, s];
    }
  ],
  rgb: [
    F,
    [p, p, p],
    Rt
  ],
  rgba: [
    F,
    [p, p, p, p],
    Rt
  ],
  has: {
    type: m,
    overloads: [
      [
        [b],
        (n, [e]) => Ot(e.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [e, t]) => Ot(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  get: {
    type: v,
    overloads: [
      [
        [b],
        (n, [e]) => Xe(e.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [e, t]) => Xe(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    v,
    [b],
    (n, [e]) => Xe(e.evaluate(n), n.featureState || {})
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
    p,
    [],
    (n) => n.globals.zoom
  ],
  "heatmap-density": [
    p,
    [],
    (n) => n.globals.heatmapDensity || 0
  ],
  "line-progress": [
    p,
    [],
    (n) => n.globals.lineProgress || 0
  ],
  accumulated: [
    v,
    [],
    (n) => n.globals.accumulated === void 0 ? null : n.globals.accumulated
  ],
  "+": [
    p,
    W(p),
    (n, e) => {
      let t = 0;
      for (const r of e)
        t += r.evaluate(n);
      return t;
    }
  ],
  "*": [
    p,
    W(p),
    (n, e) => {
      let t = 1;
      for (const r of e)
        t *= r.evaluate(n);
      return t;
    }
  ],
  "-": {
    type: p,
    overloads: [
      [
        [p, p],
        (n, [e, t]) => e.evaluate(n) - t.evaluate(n)
      ],
      [
        [p],
        (n, [e]) => -e.evaluate(n)
      ]
    ]
  },
  "/": [
    p,
    [p, p],
    (n, [e, t]) => e.evaluate(n) / t.evaluate(n)
  ],
  "%": [
    p,
    [p, p],
    (n, [e, t]) => e.evaluate(n) % t.evaluate(n)
  ],
  ln2: [
    p,
    [],
    () => Math.LN2
  ],
  pi: [
    p,
    [],
    () => Math.PI
  ],
  e: [
    p,
    [],
    () => Math.E
  ],
  "^": [
    p,
    [p, p],
    (n, [e, t]) => Math.pow(e.evaluate(n), t.evaluate(n))
  ],
  sqrt: [
    p,
    [p],
    (n, [e]) => Math.sqrt(e.evaluate(n))
  ],
  log10: [
    p,
    [p],
    (n, [e]) => Math.log(e.evaluate(n)) / Math.LN10
  ],
  ln: [
    p,
    [p],
    (n, [e]) => Math.log(e.evaluate(n))
  ],
  log2: [
    p,
    [p],
    (n, [e]) => Math.log(e.evaluate(n)) / Math.LN2
  ],
  sin: [
    p,
    [p],
    (n, [e]) => Math.sin(e.evaluate(n))
  ],
  cos: [
    p,
    [p],
    (n, [e]) => Math.cos(e.evaluate(n))
  ],
  tan: [
    p,
    [p],
    (n, [e]) => Math.tan(e.evaluate(n))
  ],
  asin: [
    p,
    [p],
    (n, [e]) => Math.asin(e.evaluate(n))
  ],
  acos: [
    p,
    [p],
    (n, [e]) => Math.acos(e.evaluate(n))
  ],
  atan: [
    p,
    [p],
    (n, [e]) => Math.atan(e.evaluate(n))
  ],
  min: [
    p,
    W(p),
    (n, e) => Math.min(...e.map((t) => t.evaluate(n)))
  ],
  max: [
    p,
    W(p),
    (n, e) => Math.max(...e.map((t) => t.evaluate(n)))
  ],
  abs: [
    p,
    [p],
    (n, [e]) => Math.abs(e.evaluate(n))
  ],
  round: [
    p,
    [p],
    (n, [e]) => {
      const t = e.evaluate(n);
      return t < 0 ? -Math.round(-t) : Math.round(t);
    }
  ],
  floor: [
    p,
    [p],
    (n, [e]) => Math.floor(e.evaluate(n))
  ],
  ceil: [
    p,
    [p],
    (n, [e]) => Math.ceil(e.evaluate(n))
  ],
  "filter-==": [
    m,
    [b, v],
    (n, [e, t]) => n.properties()[e.value] === t.value
  ],
  "filter-id-==": [
    m,
    [v],
    (n, [e]) => n.id() === e.value
  ],
  "filter-type-==": [
    m,
    [b],
    (n, [e]) => n.geometryDollarType() === e.value
  ],
  "filter-<": [
    m,
    [b, v],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r < i;
    }
  ],
  "filter-id-<": [
    m,
    [v],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t < r;
    }
  ],
  "filter->": [
    m,
    [b, v],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r > i;
    }
  ],
  "filter-id->": [
    m,
    [v],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t > r;
    }
  ],
  "filter-<=": [
    m,
    [b, v],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r <= i;
    }
  ],
  "filter-id-<=": [
    m,
    [v],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t <= r;
    }
  ],
  "filter->=": [
    m,
    [b, v],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r >= i;
    }
  ],
  "filter-id->=": [
    m,
    [v],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t >= r;
    }
  ],
  "filter-has": [
    m,
    [v],
    (n, [e]) => e.value in n.properties()
  ],
  "filter-has-id": [
    m,
    [],
    (n) => n.id() !== null && n.id() !== void 0
  ],
  "filter-type-in": [
    m,
    [L(b)],
    (n, [e]) => e.value.indexOf(n.geometryDollarType()) >= 0
  ],
  "filter-id-in": [
    m,
    [L(v)],
    (n, [e]) => e.value.indexOf(n.id()) >= 0
  ],
  "filter-in-small": [
    m,
    [b, L(v)],
    // assumes v is an array literal
    (n, [e, t]) => t.value.indexOf(n.properties()[e.value]) >= 0
  ],
  "filter-in-large": [
    m,
    [b, L(v)],
    // assumes v is a array literal with values sorted in ascending order and of a single type
    (n, [e, t]) => Pr(n.properties()[e.value], t.value, 0, t.value.length - 1)
  ],
  all: {
    type: m,
    overloads: [
      [
        [m, m],
        (n, [e, t]) => e.evaluate(n) && t.evaluate(n)
      ],
      [
        W(m),
        (n, e) => {
          for (const t of e)
            if (!t.evaluate(n))
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
        (n, [e, t]) => e.evaluate(n) || t.evaluate(n)
      ],
      [
        W(m),
        (n, e) => {
          for (const t of e)
            if (t.evaluate(n))
              return !0;
          return !1;
        }
      ]
    ]
  },
  "!": [
    m,
    [m],
    (n, [e]) => !e.evaluate(n)
  ],
  "is-supported-script": [
    m,
    [b],
    // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
    (n, [e]) => {
      const t = n.globals && n.globals.isSupportedScript;
      return t ? t(e.evaluate(n)) : !0;
    }
  ],
  upcase: [
    b,
    [b],
    (n, [e]) => e.evaluate(n).toUpperCase()
  ],
  downcase: [
    b,
    [b],
    (n, [e]) => e.evaluate(n).toLowerCase()
  ],
  concat: [
    b,
    W(v),
    (n, e) => e.map((t) => ie(t.evaluate(n))).join("")
  ],
  "resolved-locale": [
    b,
    [Te],
    (n, [e]) => e.evaluate(n).resolvedLocale()
  ]
});
function _r(n) {
  return Array.isArray(n) ? `(${n.map(x).join(", ")})` : `(${x(n.type)}...)`;
}
function Me(n) {
  if (n instanceof Pe)
    return Me(n.boundExpression);
  if (n instanceof P && n.name === "error")
    return !1;
  if (n instanceof Be)
    return !1;
  if (n instanceof X)
    return !1;
  if (n instanceof Z)
    return !1;
  const e = n instanceof O || n instanceof A;
  let t = !0;
  return n.eachChild((r) => {
    e ? t = t && Me(r) : t = t && r instanceof ee;
  }), t ? wt(n) && xt(n, ["zoom", "heatmap-density", "line-progress", "accumulated", "is-supported-script"]) : !1;
}
function wt(n) {
  if (n instanceof P) {
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
  let e = !0;
  return n.eachChild((t) => {
    e && !wt(t) && (e = !1);
  }), e;
}
function kt(n) {
  if (n instanceof P && n.name === "feature-state")
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !kt(t) && (e = !1);
  }), e;
}
function xt(n, e) {
  if (n instanceof P && e.indexOf(n.name) >= 0)
    return !1;
  let t = !0;
  return n.eachChild((r) => {
    t && !xt(r, e) && (t = !1);
  }), t;
}
function et(n) {
  return { result: "success", value: n };
}
function Y(n) {
  return { result: "error", value: n };
}
function Fr(n) {
  return n["property-type"] === "data-driven" || n["property-type"] === "cross-faded-data-driven";
}
function Br(n) {
  return !!n.expression && n.expression.parameters.indexOf("zoom") > -1;
}
function hn(n) {
  return !!n.expression && n.expression.interpolated;
}
function Et(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function pn(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function zr(n) {
  return n;
}
function dn(n, e) {
  const t = e.type === "color", r = n.stops && typeof n.stops[0][0] == "object", i = r || n.property !== void 0, s = r || !i, o = n.type || (hn(e) ? "exponential" : "interval");
  if (t || e.type === "padding") {
    const c = t ? k.parse : T.parse;
    n = Ut({}, n), n.stops && (n.stops = n.stops.map((f) => [f[0], c(f[1])])), n.default ? n.default = c(n.default) : n.default = c(e.default);
  }
  if (n.colorSpace && !zn(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  let a, l, u;
  if (o === "exponential")
    a = qt;
  else if (o === "interval")
    a = jr;
  else if (o === "categorical") {
    a = Hr, l = /* @__PURE__ */ Object.create(null);
    for (const c of n.stops)
      l[c[0]] = c[1];
    u = typeof n.stops[0][0];
  } else if (o === "identity")
    a = Rr;
  else
    throw new Error(`Unknown function type "${o}"`);
  if (r) {
    const c = {}, f = [];
    for (let y = 0; y < n.stops.length; y++) {
      const C = n.stops[y], E = C[0].zoom;
      c[E] === void 0 && (c[E] = {
        zoom: E,
        type: n.type,
        property: n.property,
        default: n.default,
        stops: []
      }, f.push(E)), c[E].stops.push([C[0].value, C[1]]);
    }
    const h = [];
    for (const y of f)
      h.push([c[y].zoom, dn(c[y], e)]);
    const d = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: d,
      interpolationFactor: D.interpolationFactor.bind(void 0, d),
      zoomStops: h.map((y) => y[0]),
      evaluate({ zoom: y }, C) {
        return qt({
          stops: h,
          base: n.base
        }, e, y).evaluate(y, C);
      }
    };
  } else if (s) {
    const c = o === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: c,
      interpolationFactor: D.interpolationFactor.bind(void 0, c),
      zoomStops: n.stops.map((f) => f[0]),
      evaluate: ({ zoom: f }) => a(n, e, f, l, u)
    };
  } else
    return {
      kind: "source",
      evaluate(c, f) {
        const h = f && f.properties ? f.properties[n.property] : void 0;
        return h === void 0 ? he(n.default, e.default) : a(n, e, h, l, u);
      }
    };
}
function he(n, e, t) {
  if (n !== void 0)
    return n;
  if (e !== void 0)
    return e;
  if (t !== void 0)
    return t;
}
function Hr(n, e, t, r, i) {
  const s = typeof t === i ? r[t] : void 0;
  return he(s, n.default, e.default);
}
function jr(n, e, t) {
  if (Et(t) !== "number")
    return he(n.default, e.default);
  const r = n.stops.length;
  if (r === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const i = _e(n.stops.map((s) => s[0]), t);
  return n.stops[i][1];
}
function qt(n, e, t) {
  const r = n.base !== void 0 ? n.base : 1;
  if (Et(t) !== "number")
    return he(n.default, e.default);
  const i = n.stops.length;
  if (i === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const s = _e(n.stops.map((c) => c[0]), t), o = Or(t, r, n.stops[s][0], n.stops[s + 1][0]), a = n.stops[s][1], l = n.stops[s + 1][1], u = Xn[e.type] || zr;
  return typeof a.evaluate == "function" ? {
    evaluate(...c) {
      const f = a.evaluate.apply(void 0, c), h = l.evaluate.apply(void 0, c);
      if (!(f === void 0 || h === void 0))
        return u(f, h, o, n.colorSpace);
    }
  } : u(a, l, o, n.colorSpace);
}
function Rr(n, e, t) {
  switch (e.type) {
    case "color":
      t = k.parse(t);
      break;
    case "formatted":
      t = B.fromString(t.toString());
      break;
    case "resolvedImage":
      t = R.fromString(t.toString());
      break;
    case "padding":
      t = T.parse(t);
      break;
    default:
      Et(t) !== e.type && (e.type !== "enum" || !e.values[t]) && (t = void 0);
  }
  return he(t, n.default, e.default);
}
function Or(n, e, t, r) {
  const i = r - t, s = n - t;
  return i === 0 ? 0 : e === 1 ? s / i : (Math.pow(e, s) - 1) / (Math.pow(e, i) - 1);
}
class yn {
  constructor(e, t) {
    this.expression = e, this._warningHistory = {}, this._evaluator = new rn(), this._defaultValue = t ? Ur(t) : null, this._enumValues = t && t.type === "enum" ? t.values : null;
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._evaluator.globals = e, this._evaluator.feature = t, this._evaluator.featureState = r, this._evaluator.canonical = i, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o, this.expression.evaluate(this._evaluator);
  }
  evaluate(e, t, r, i, s, o) {
    this._evaluator.globals = e, this._evaluator.feature = t || null, this._evaluator.featureState = r || null, this._evaluator.canonical = i, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o || null;
    try {
      const a = this.expression.evaluate(this._evaluator);
      if (a == null || typeof a == "number" && a !== a)
        return this._defaultValue;
      if (this._enumValues && !(a in this._enumValues))
        throw new M(`Expected value to be one of ${Object.keys(this._enumValues).map((l) => JSON.stringify(l)).join(", ")}, but found ${JSON.stringify(a)} instead.`);
      return a;
    } catch (a) {
      return this._warningHistory[a.message] || (this._warningHistory[a.message] = !0, typeof console < "u" && console.warn(a.message)), this._defaultValue;
    }
  }
}
function gn(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in Ct;
}
function mn(n, e) {
  const t = new De(Ct, Me, [], e ? Vr(e) : void 0), r = t.parse(n, void 0, void 0, void 0, e && e.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? et(new yn(r, e)) : Y(t.errors);
}
class tt {
  constructor(e, t) {
    this.kind = e, this._styleExpression = t, this.isStateDependent = e !== "constant" && !kt(t.expression);
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, s, o);
  }
  evaluate(e, t, r, i, s, o) {
    return this._styleExpression.evaluate(e, t, r, i, s, o);
  }
}
class nt {
  constructor(e, t, r, i) {
    this.kind = e, this.zoomStops = r, this._styleExpression = t, this.isStateDependent = e !== "camera" && !kt(t.expression), this.interpolationType = i;
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, s, o);
  }
  evaluate(e, t, r, i, s, o) {
    return this._styleExpression.evaluate(e, t, r, i, s, o);
  }
  interpolationFactor(e, t, r) {
    return this.interpolationType ? D.interpolationFactor(this.interpolationType, e, t, r) : 0;
  }
}
function qr(n) {
  return n._styleExpression !== void 0;
}
function vn(n, e) {
  const t = mn(n, e);
  if (t.result === "error")
    return t;
  const r = t.value.expression, i = wt(r);
  if (!i && !Fr(e))
    return Y([new _("", "data expressions not supported")]);
  const s = xt(r, ["zoom"]);
  if (!s && !Br(e))
    return Y([new _("", "zoom expressions not supported")]);
  const o = be(r);
  if (!o && !s)
    return Y([new _("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
  if (o instanceof _)
    return Y([o]);
  if (o instanceof D && !hn(e))
    return Y([new _("", '"interpolate" expressions cannot be used with this property')]);
  if (!o)
    return et(i ? new tt("constant", t.value) : new tt("source", t.value));
  const a = o instanceof D ? o.interpolation : void 0;
  return et(i ? new nt("camera", t.value, o.labels, a) : new nt("composite", t.value, o.labels, a));
}
class He {
  constructor(e, t) {
    this._parameters = e, this._specification = t, Ut(this, dn(this._parameters, this._specification));
  }
  static deserialize(e) {
    return new He(e._parameters, e._specification);
  }
  static serialize(e) {
    return {
      _parameters: e._parameters,
      _specification: e._specification
    };
  }
}
function Wr(n, e) {
  if (pn(n))
    return new He(n, e);
  if (gn(n)) {
    const t = vn(n, e);
    if (t.result === "error")
      throw new Error(t.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return t.value;
  } else {
    let t = n;
    return e.type === "color" && typeof n == "string" ? t = k.parse(n) : e.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? t = T.parse(n) : e.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? t = N.parse(n) : e.type === "projectionDefinition" && typeof n == "string" && (t = $.parse(n)), {
      kind: "constant",
      evaluate: () => t
    };
  }
}
function be(n) {
  let e = null;
  if (n instanceof Ae)
    e = be(n.result);
  else if (n instanceof le) {
    for (const t of n.args)
      if (e = be(t), e)
        break;
  } else (n instanceof Fe || n instanceof D) && n.input instanceof P && n.input.name === "zoom" && (e = n);
  return e instanceof _ || n.eachChild((t) => {
    const r = be(t);
    r instanceof _ ? e = r : !e && r ? e = new _("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : e && r && e !== r && (e = new _("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), e;
}
function Vr(n) {
  const e = {
    color: F,
    string: b,
    number: p,
    enum: b,
    boolean: m,
    formatted: Le,
    padding: $e,
    projectionDefinition: Ie,
    resolvedImage: ce,
    variableAnchorOffsetCollection: Ne
  };
  return n.type === "array" ? L(e[n.value] || v, n.length) : e[n.type];
}
function Ur(n) {
  return n.type === "color" && pn(n.default) ? new k(0, 0, 0, 0) : n.type === "color" ? k.parse(n.default) || null : n.type === "padding" ? T.parse(n.default) || null : n.type === "variableAnchorOffsetCollection" ? N.parse(n.default) || null : n.type === "projectionDefinition" ? $.parse(n.default) || null : n.default === void 0 ? null : n.default;
}
function bn(n) {
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
      for (const e of n.slice(1))
        if (!bn(e) && typeof e != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const Xr = {
  StyleExpression: yn,
  StylePropertyFunction: He,
  ZoomConstantExpression: tt,
  ZoomDependentExpression: nt,
  createExpression: mn,
  createPropertyExpression: vn,
  isExpression: gn,
  isExpressionFilter: bn,
  isZoomExpression: qr,
  normalizePropertyExpression: Wr
};
class Qr {
  constructor(e, t) {
    g(this, "map");
    g(this, "options");
    g(this, "colorSteps");
    g(this, "container");
    g(this, "outContainer");
    g(this, "titleDiv");
    g(this, "unitDiv");
    g(this, "legendItems", []);
    g(this, "propertySpec");
    // Handler for container click events
    g(this, "handleContainerClick", (e) => {
      this.options.onClick && this.options.onClick(e, this, this.options);
    });
    e ? this.propertySpec = e : this.propertySpec = {
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
      width: "56px",
      // Default width
      height: "272px",
      // Default width
      max: 30,
      // Default max
      decimal: 1,
      // Default max
      tickMinStep: 0,
      // Default tick value
      ...t
      // Override with user-provided options
    }, this.colorSteps = this.getColorSteps();
    const { outContainer: r, innerContainer: i } = this.createContainer();
    this.outContainer = r, this.container = i, this.titleDiv = this.createTitleDiv(this.options.title), this.unitDiv = this.createUnitDiv(this.options.unit), this.container.appendChild(this.titleDiv), this.container.appendChild(this.unitDiv), this.options.onClick && this.container.addEventListener("click", this.handleContainerClick);
  }
  getTickMinStep() {
    return this.options.tickMinStep || 0;
  }
  getWidth() {
    return this.options.width || "52px";
  }
  getHeight() {
    return this.options.height || "272px";
  }
  getHeightInPixels() {
    const e = this.getHeight();
    if (e.endsWith("px"))
      return parseFloat(e);
    if (e.endsWith("%")) {
      const t = this.outContainer.offsetHeight, r = parseFloat(e) / 100;
      return t * r;
    }
    return 272;
  }
  createContainer() {
    var i;
    const e = document.createElement("div");
    e.classList.add("maplibregl-ctrl"), e.style.height = "100%", e.style.display = "flex", e.style.flexDirection = "column", e.style.alignItems = "center", e.style.backgroundColor = "transparent", e.style.pointerEvents = "none";
    const t = (i = this.options.position) != null && i.endsWith("left") ? "map-colorbar-left-group" : "map-colorbar-right-group", r = document.createElement("div");
    return r.classList.add(t), r.style.width = this.getWidth(), r.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`, r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.display = "flex", r.style.flexDirection = "column", r.style.borderRadius = "10px", r.style.pointerEvents = "auto", e.appendChild(r), { outContainer: e, innerContainer: r };
  }
  createTitleDiv(e) {
    const t = document.createElement("div");
    return t.innerHTML = e, t.style.marginTop = "6px", t.style.marginBottom = "8px", t.style.display = "flex", t.style.justifyContent = "center", t.style.textAlign = "center", t.style.fontSize = "11px", t.style.lineHeight = "14px", t.style.color = "white", t.style.width = this.getWidth(), t;
  }
  createUnitDiv(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_unit"), t.innerHTML = `(${e})`, t.style.marginTop = "8px", t.style.width = this.getWidth(), t.style.display = "flex", t.style.justifyContent = "center", t.style.color = "white", t.style.fontSize = "12px", t.style.textAlign = "center", t;
  }
  createColorBox(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_color_box"), t.style.width = "12px", t.style.backgroundColor = e, t;
  }
  createLabel(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_label"), t.style.marginTop = "0px", t.style.marginLeft = "0px", t.style.marginRight = "2px", t.style.color = "white", t.style.fontSize = "9px", t.textContent = "", t;
  }
  initializeLegendItems() {
    this.colorSteps.forEach(({ speed: e, color: t }) => {
      const r = document.createElement("div");
      r.classList.add("map_colorbar_item"), r.style.display = "flex", r.style.alignItems = "center", r.style.marginBottom = "0px", r.style.marginTop = "0px", r.style.marginLeft = "10px";
      const i = this.createColorBox(t), s = this.createLabel({ speed: e, color: t });
      r.appendChild(i), r.appendChild(s), this.legendItems.push(r), this.container.insertBefore(r, this.unitDiv);
    });
  }
  calculateHeights() {
    const e = this.getHeightInPixels(), i = (this.container.getBoundingClientRect().height ? this.container.getBoundingClientRect().height : e) - this.titleDiv.offsetHeight - this.unitDiv.offsetHeight - 22, s = Math.max(Math.floor(i / this.colorSteps.length), 5), o = Math.ceil(20 * this.colorSteps.length / i);
    return { stepHeight: s, showInterval: o };
  }
  update() {
    this.updateInnerContainerStyle(this.outContainer, this.container);
    const { stepHeight: e, showInterval: t } = this.calculateHeights();
    let r = this.colorSteps.length - 1;
    [...this.legendItems].reverse().forEach((i, s) => {
      const o = i.querySelector(".map_colorbar_color_box"), a = i.querySelector(".map_colorbar_label"), l = s === 0 ? e + 3 : e;
      i.style.height = `${e}px`, o.style.height = `${l}px`;
      let u = this.colorSteps.length - 1 - s;
      const c = this.colorSteps[u].speed, f = this.colorSteps[r].speed, h = Math.abs(c - f);
      (this.getTickMinStep() == 0 && t > 0 && s % t !== 0 || h < this.getTickMinStep()) && u < r ? a.textContent = "" : (a.textContent = `- ${c.toFixed(this.options.decimal)}`, r = u, a.style.marginTop = `${e}px`);
    });
  }
  onAdd(e) {
    return this.map = e, e.getContainer().appendChild(this.outContainer), this.initializeLegendItems(), this.update(), this.map.once("styledata", () => {
      this.refresh();
    }), this.map.on("resize", () => {
      this.update();
    }), this.outContainer;
  }
  onRemove() {
    var e;
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), (e = this.outContainer.parentNode) == null || e.removeChild(this.outContainer), this.map = void 0;
  }
  refresh() {
  }
  getDefaultPosition() {
    return this.options.position || "top-left";
  }
  /**
   * Updates the options and refreshes the control
   * @param newOptions Partial options to update
   */
  updateOptions(e) {
    const t = { ...this.options };
    if (this.options = { ...this.options, ...e }, e.max !== void 0 && e.tickMinStep, e.title !== void 0 && (this.titleDiv.innerHTML = e.title), e.unit !== void 0 && (this.unitDiv.innerHTML = `(${e.unit})`), (e.width !== void 0 || e.height !== void 0) && (this.container.style.width = this.getWidth(), this.container.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`), e.max !== void 0) {
      if (e.tickMinStep === void 0) {
        const r = t.tickMinStep ?? 0, i = t.max ?? 30;
        this.options.tickMinStep = r * e.max / i;
      }
      this.colorSteps = this.getColorSteps(), this.legendItems.forEach((r) => r.remove()), this.legendItems = [], this.initializeLegendItems();
    }
    e.onClick !== void 0 && this.container.removeEventListener("click", this.handleContainerClick), this.update();
  }
  getOptions() {
    return this.options;
  }
  getMap() {
    return this.map;
  }
  updateInnerContainerStyle(e, t) {
    var h;
    if (!this.map)
      return;
    const r = this.map.getContainer(), i = r.offsetWidth, s = r.offsetHeight;
    e.style.height = `${s}px`;
    let o = 10, a = 10, l = Math.max(
      0,
      parseFloat(
        getComputedStyle(r).getPropertyValue("env(safe-area-inset-left)") || "0"
      )
    ), u = Math.max(
      0,
      parseFloat(
        getComputedStyle(r).getPropertyValue("env(safe-area-inset-right)") || "0"
      )
    ), c = l, f = u;
    i >= 480 && (o = 15, a = 15, c = Math.max(15, l), f = Math.max(15, u)), i >= 992 && s >= 992 && (o = 40, a = 40, c = Math.max(40, l), f = Math.max(40, u)), (h = this.options.position) != null && h.endsWith("left") ? (t.style.marginLeft = `${c}px`, t.style.marginRight = `${u}px`) : (t.style.marginLeft = `${l}px`, t.style.marginRight = `${f}px`), t.style.marginTop = `${o}px`, t.style.marginBottom = `${a}px`, t.style.alignItems = "flex-start", t.style.display = "flex", t.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;
  }
  /**
   * Parses the "fill-color" property and extracts speed-to-color mappings.
   * @returns An array of speed thresholds and their corresponding colors.
   */
  getColorSteps() {
    var l;
    const e = this.propertySpec["fill-color"];
    if (!e)
      throw new Error("Missing 'fill-color' specification.");
    const t = e.default || e;
    if (t[0] !== "step")
      throw new Error("Only 'step' expressions are supported.");
    const i = [], [, , s, ...o] = t, a = ((l = this.options) == null ? void 0 : l.max) || 30;
    i.push({ speed: 0, color: s });
    for (let u = 0; u < o.length; u += 2) {
      const f = o[u] * a, h = o[u + 1];
      i.push({ speed: f, color: h });
    }
    return i.sort((u, c) => c.speed - u.speed);
  }
  /**
   * Sets a property using a Mapbox style expression.
   * @param prop The property name.
   * @param value The Mapbox style expression.
   */
  setProperty(e, t) {
    const r = this.propertySpec[e];
    if (!r)
      throw new Error(`Property "${e}" is not defined in the specification.`);
    const i = Xr.createPropertyExpression(t, r);
    if (i.result === "success")
      switch (i.value.kind) {
        case "camera":
        case "composite":
          console.log(`Camera/composite expression set for property "${e}"`);
          break;
        default:
          console.log(`Property "${e}" set with value`, i.value);
          break;
      }
    else
      throw new Error(`Invalid expression for property "${e}": ${i.value}`);
  }
}
class Kr {
  constructor(e) {
    g(this, "map");
    g(this, "options");
    g(this, "container");
    g(this, "outContainer");
    this.options = {
      position: "top-left",
      width: "146px",
      // Default width
      height: "24px",
      // Default width
      ...e
      // Override with user-provided options
    };
    const { outContainer: t, innerContainer: r } = this.createContainer();
    this.outContainer = t, this.container = r;
  }
  getWidth() {
    return this.options.width || "146px";
  }
  getHeight() {
    return this.options.height || "24px";
  }
  // Create the control's container elements
  createContainer() {
    const e = document.createElement("div");
    e.className = "maplibregl-ctrl maplibregl-ctrl-msg";
    const t = document.createElement("div");
    return t.style.width = this.getWidth(), t.style.height = this.getHeight(), t.style.backgroundColor = "rgba(0, 36, 71, 0.7)", t.style.padding = "5px 10px", t.style.borderRadius = "3px", t.style.fontFamily = "Arial, sans-serif", t.style.fontSize = "14px", this.options.innerHTML ? t.innerHTML = this.options.innerHTML : this.options.msg && (t.textContent = this.options.msg), this.options.style && Object.assign(t.style, this.options.style), e.appendChild(t), { outContainer: e, innerContainer: t };
  }
  updateInnerContainerStyle() {
    var c;
    if (!this.map)
      return;
    const e = this.map.getContainer(), t = e.offsetWidth, r = e.offsetHeight;
    let i = 10, s = 10, o = Math.max(
      10,
      parseFloat(
        getComputedStyle(e).getPropertyValue("env(safe-area-inset-left)") || "0"
      )
    ), a = Math.max(
      10,
      parseFloat(
        getComputedStyle(e).getPropertyValue("env(safe-area-inset-right)") || "0"
      )
    ), l = o, u = a;
    t >= 480 && (i = 15, s = 15, l = Math.max(15, o), u = Math.max(15, a)), t >= 992 && r >= 992 && (l = Math.max(40, o), u = Math.max(40, a)), (c = this.options.position) != null && c.endsWith("left") ? (this.container.style.marginLeft = `${l}px`, this.container.style.marginRight = `${a}px`) : (this.container.style.marginLeft = `${o}px`, this.container.style.marginRight = `${u}px`), this.container.style.marginTop = `${i}px`, this.container.style.marginBottom = `${s}px`;
  }
  update() {
    this.updateInnerContainerStyle();
  }
  onAdd(e) {
    return this.map = e, e.getContainer().appendChild(this.outContainer), this.update(), this.map.once("styledata", () => {
      this.refresh();
    }), this.map.on("resize", () => {
      this.update();
    }), this.outContainer;
  }
  onRemove() {
    var e;
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), (e = this.outContainer.parentNode) == null || e.removeChild(this.outContainer), this.map = void 0;
  }
  refresh() {
  }
  // Update the control's styles dynamically
  updateStyle(e) {
    this.container && Object.assign(this.container.style, e);
  }
  // Update the control's content dynamically, with an option to specify if it's HTML
  updateContent(e, t = !1) {
    this.container && (t ? this.container.innerHTML = e : this.container.textContent = e);
  }
  getDefaultPosition() {
    return this.options.position || "top-left";
  }
}
const rt = 20, Wt = 6, Zr = 4, Vt = 4, Gr = (n, e) => {
  const t = document.createElement("img");
  return t.src = `data:image/svg+xml,${encodeURIComponent(n)}`, t.alt = e, t.style.width = `${rt}px`, t.style.height = `${rt}px`, t.style.color = "white", t;
};
class ei {
  constructor(e) {
    g(this, "map");
    g(this, "container");
    g(this, "outContainer");
    g(this, "options");
    g(this, "defaultActiveId");
    g(this, "activeButtonId", null);
    g(this, "buttons", /* @__PURE__ */ new Map());
    g(this, "listeners", {
      toggle: /* @__PURE__ */ new Set(),
      untoggle: /* @__PURE__ */ new Set()
    });
    this.options = e;
    const { outContainer: t, container: r } = this.createContainer();
    this.outContainer = t, this.container = r, this.defaultActiveId = this.options.defaultActive;
  }
  on(e, t) {
    this.listeners[e].add(t);
  }
  off(e, t) {
    this.listeners[e].delete(t);
  }
  emit(e) {
    for (const t of this.listeners[e])
      try {
        t(this);
      } catch (r) {
        console.error(`[ToggleCtl] error in ${e} listener`, r);
      }
  }
  // Create the outer container for the control
  createContainer() {
    const e = document.createElement("div");
    e.classList.add("maplibregl-ctrl"), e.style.height = "100%", e.style.display = "flex", e.style.flexDirection = "column", e.style.alignItems = "center", e.style.backgroundColor = "transparent";
    const t = document.createElement("div");
    return t.classList.add("maplibregl-ctrl", "maplibregl-ctrl-group"), t.style.backgroundColor = "transparent", t.style.padding = "5px", t.style.border = "transparent", t.style.boxShadow = "none", t.style.borderRadius = "4px", t.style.display = "flex", t.style.flexDirection = "column", t.style.gap = "4px", this.options.buttons.forEach((r) => {
      const i = this.createButton(r);
      t.appendChild(i), this.buttons.set(r.id, i);
    }), this.container = t, this.updateLayout(), e.appendChild(this.container), { outContainer: e, container: t };
  }
  updateInnerContainerStyle() {
    var c;
    if (!this.map)
      return;
    const e = this.map.getContainer(), t = e.offsetWidth, r = e.offsetHeight;
    this.outContainer.style.height = `${r}px`;
    let i = 10, s = 10, o = Math.max(
      0,
      parseFloat(
        getComputedStyle(e).getPropertyValue("env(safe-area-inset-left)") || "0"
      )
    ), a = Math.max(
      0,
      parseFloat(
        getComputedStyle(e).getPropertyValue("env(safe-area-inset-right)") || "0"
      )
    ), l = o, u = a;
    t >= 480 && (i = 15, s = 15, l = Math.max(15, o), u = Math.max(15, a)), r >= 992 && (i = 40, s = 40), t >= 992 && (l = Math.max(40, o), u = Math.max(40, a)), (c = this.options.position) != null && c.endsWith("left") ? (this.container.style.marginLeft = `${l}px`, this.container.style.marginRight = `${a}px`) : (this.container.style.marginLeft = `${o}px`, this.container.style.marginRight = `${u}px`), this.container.style.marginTop = `${i}px`, this.container.style.marginBottom = `${s}px`, this.container.style.alignItems = "flex-start", this.container.style.display = "flex", this.updateLayout();
  }
  // Responsive design handling
  updateLayout() {
    if (!this.map)
      return;
    const r = this.map.getContainer().clientWidth < 768;
    this.buttons.forEach((c) => {
      const f = c.querySelector("span");
      f && (f.style.display = r ? "none" : "inline"), c.style.width = "fit-content";
    });
    const i = Array.from(this.buttons.values()), s = Math.max(...i.map((c) => c.offsetWidth)), o = r ? "34px" : `${s}px`, a = 12, l = i.map((c) => {
      if (c.style.width = o, r) return null;
      const f = c.querySelector("span");
      return !f || !f.textContent ? null : [f, this.calculateFontSize(s, f.textContent)];
    }).filter((c) => !!c), u = Math.min(a, ...l.map(([, c]) => c));
    l.forEach(([c]) => {
      c.style.fontSize = `${u}px`;
    });
  }
  // Function to calculate font size based on width and character count
  calculateFontSize(e, t, r = 12, i = 6) {
    const s = e - rt - Wt * 2 - Vt, o = t.replace(/<[^>]+>/g, "").length;
    if (o === 0) return;
    let l = Math.floor(s / (o * 0.5));
    return l = Math.min(r, Math.max(i, l)), l;
  }
  // Create a single button with icon and label
  createButton(e) {
    const t = document.createElement("button");
    t.style.display = "flex", t.style.alignItems = "center", t.style.gap = `${Vt}px`, t.style.padding = `${Zr}px ${Wt}px`, t.style.border = "none", t.style.cursor = "pointer", t.style.borderRadius = "4px", t.style.width = "fit-content", t.style.color = "white", t.style.backgroundColor = "rgba(0, 36, 71, 0.6)";
    const r = Gr(e.svg, e.label);
    t.appendChild(r);
    const i = document.createElement("span");
    return i.textContent = e.label, i.style.fontSize = "10px", i.style.color = "inherit", t.appendChild(i), t.onclick = () => this.handleButtonClick(e), t;
  }
  // Handle button click event
  handleButtonClick(e) {
    if (this.activeButtonId === e.id && !e.repeat)
      return;
    const t = this.activeButtonId;
    if (e.repeat || (this.activeButtonId = e.id), t && t !== this.activeButtonId && this.map) {
      const r = this.options.buttons.find((i) => i.id === t);
      r && this.options.onUntoggle && (this.options.onUntoggle(this, this.map, r), this.emit("untoggle"));
    }
    this.buttons.forEach((r, i) => {
      i === this.activeButtonId ? r.style.backgroundColor = "rgba(0, 36, 71, 0.98)" : r.style.backgroundColor = "rgba(0, 36, 71, 0.6)";
    }), this.map && this.options.onToggle && (this.options.onToggle(this, this.map, e), this.emit("toggle"));
  }
  // Add control to the map
  onAdd(e) {
    if (this.map = e, this.map.on("resize", () => {
      this.updateInnerContainerStyle();
    }), this.map.on("styledata", () => {
      this.updateInnerContainerStyle();
    }), this.options.buttons.forEach((t) => {
      t.setup && t.setup(this, this.map);
    }), this.options.buttons.length > 0 && !this.activeButtonId) {
      const t = this.options.buttons.find((r) => r.id === this.defaultActiveId);
      this.handleButtonClick(t || this.options.buttons[0]);
    }
    return this.container;
  }
  // Remove control from the map
  onRemove() {
    var e;
    this.map && (this.map.off("resize", this.updateInnerContainerStyle), this.map.off("styledata", this.updateInnerContainerStyle)), this.options.buttons.forEach((t) => {
      t.cleanup && t.cleanup(this, this.map);
    }), (e = this.container.parentNode) == null || e.removeChild(this.container), this.map = void 0;
  }
  // Default position of the control
  getDefaultPosition() {
    return "top-right";
  }
  // Public method to programmatically switch to a specific button
  setActiveButton(e) {
    const t = this.options.buttons.find((r) => r.id === e);
    t && this.handleButtonClick(t);
  }
  getActiveButton() {
    const e = this.activeButtonId || this.defaultActiveId, t = this.options.buttons.find((r) => r.id === e);
    return t || this.options.buttons[0];
  }
  // New method to update a specific button
  updateButton(e, t) {
    const r = this.buttons.get(e), i = this.options.buttons.find((a) => a.id === e);
    if (!r || !i)
      return;
    Object.assign(i, t);
    const s = r.querySelector("img");
    s && (t.svg && (s.src = `data:image/svg+xml,${encodeURIComponent(t.svg)}`), t.label && (s.alt = t.label));
    const o = r.querySelector("span");
    o && t.label && (o.textContent = t.label), this.updateLayout();
  }
  // Update a all button configs
  updateButtonCallback(e) {
    e.forEach((t) => {
      const r = t.id || "", i = this.buttons.get(r), s = this.options.buttons.find((o) => o.id === r);
      !i || !s || Object.assign(s, t);
    });
  }
}
class ti {
  constructor(e = {}) {
    g(this, "map", null);
    g(this, "container", null);
    g(this, "panel", null);
    g(this, "draggedElement", null);
    // Configuration
    g(this, "layers", []);
    g(this, "position", "top-left");
    g(this, "collapsed", !1);
    // Runtime state
    g(this, "layerConfigs", /* @__PURE__ */ new Map());
    this.layers = e.layers || [], this.position = e.position || "top-left", this.collapsed = e.collapsed || !1, this.layers.forEach((t) => {
      this.layerConfigs.set(t.id, {
        visible: t.visible !== !1,
        opacity: t.opacity ?? 1,
        minzoom: t.minzoom,
        maxzoom: t.maxzoom
      });
    });
  }
  /** Called when control is added to the map */
  onAdd(e) {
    this.map = e, this.container = document.createElement("div"), this.container.className = "maplibregl-ctrl maplibregl-ctrl-group layer-manager", this.panel = document.createElement("div"), this.panel.className = "layer-manager-panel", this.collapsed && (this.panel.style.display = "none");
    const t = this._createHeader(), r = this._createLayersSection();
    return this.container.appendChild(t), this.panel.appendChild(r), this.container.appendChild(this.panel), this.container;
  }
  /** Called when control is removed from the map */
  onRemove() {
    this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.map = null;
  }
  /** Get control position */
  getPosition() {
    return this.position;
  }
  // ========================
  // UI Creation
  // ========================
  _createLayersIcon(e = 20) {
    return `
      <svg
        width="${e}"
        height="${e}"
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
    const e = document.createElement("div");
    e.className = "layer-manager-header";
    const t = document.createElement("button");
    return t.className = "layer-manager-toggle", t.innerHTML = this._createLayersIcon(20), t.title = "Toggle Layers", t.onclick = () => this._togglePanel(), e.appendChild(t), e;
  }
  _togglePanel() {
    this.panel && (this.panel.style.display === "none" ? (this.panel.style.display = "", this.collapsed = !1) : (this.panel.style.display = "none", this.collapsed = !0));
  }
  _createLayersSection() {
    const e = document.createElement("div");
    e.className = "layer-manager-section";
    const t = document.createElement("div");
    t.className = "layer-manager-title", t.innerHTML = this._createLayersIcon(16) + '<span style="vertical-align: middle;">Layers</span>';
    const r = document.createElement("button");
    r.className = "layer-manager-btn-collapse", r.innerHTML = "▲", r.onclick = (s) => {
      const o = e.querySelector(".layer-manager-list");
      o && (o.style.display === "none" ? (o.style.display = "", s.target.innerHTML = "▲") : (o.style.display = "none", s.target.innerHTML = "▼"));
    }, t.appendChild(r), e.appendChild(t);
    const i = document.createElement("div");
    return i.className = "layer-manager-list", this.layers.forEach((s) => {
      const o = this._createLayerItem(s);
      i.appendChild(o);
    }), e.appendChild(i), e;
  }
  _createLayerItem(e) {
    var C, E;
    const t = document.createElement("div");
    t.className = "layer-manager-item", t.dataset.layerId = e.id;
    const r = document.createElement("div");
    r.className = "layer-manager-reorder-controls";
    const i = document.createElement("div");
    i.className = "layer-manager-drag-handle", i.innerHTML = "⋮⋮", i.title = "Drag to reorder", i.draggable = !0, i.ondragstart = (w) => this._handleDragStart(w);
    const s = document.createElement("button");
    s.className = "layer-manager-btn-move-up", s.innerHTML = "▲", s.title = "Move up", s.onclick = () => this._moveLayerUp(e.id);
    const o = document.createElement("button");
    o.className = "layer-manager-btn-move-down", o.innerHTML = "▼", o.title = "Move down", o.onclick = () => this._moveLayerDown(e.id), r.append(i, s, o);
    const a = document.createElement("input");
    a.type = "checkbox", a.className = "layer-manager-checkbox", a.checked = ((C = this.layerConfigs.get(e.id)) == null ? void 0 : C.visible) ?? !0, a.onchange = (w) => this._toggleLayerVisibility(e.id, w.target.checked);
    const l = document.createElement("label");
    l.className = "layer-manager-label", l.textContent = e.name || e.id, l.onclick = () => a.click();
    const u = document.createElement("div");
    u.className = "layer-manager-controls";
    const c = document.createElement("div");
    c.className = "layer-manager-opacity";
    const f = document.createElement("input");
    f.type = "range", f.min = "0", f.max = "1", f.step = "0.05", f.value = String(((E = this.layerConfigs.get(e.id)) == null ? void 0 : E.opacity) ?? 1), f.className = "layer-manager-slider", f.oninput = (w) => this._updateLayerOpacity(e.id, parseFloat(w.target.value)), c.appendChild(f);
    const h = document.createElement("button");
    h.className = "layer-manager-btn-style", h.innerHTML = "⚙", h.title = "Style layer", h.onclick = () => this._toggleStyleEditor(e.id);
    const d = document.createElement("button");
    d.className = "layer-manager-btn-remove", d.innerHTML = "×", d.title = "Remove layer", d.onclick = () => this._removeLayer(e.id), u.append(c, h, d), t.append(r, a, l, u);
    const y = this._createStyleEditor(e);
    return t.appendChild(y), t.ondragover = (w) => this._handleDragOver(w), t.ondrop = (w) => this._handleDrop(w), t.ondragend = (w) => this._handleDragEnd(w), t.ondragenter = (w) => this._handleDragEnter(w), t.ondragleave = (w) => this._handleDragLeave(w), t;
  }
  _createStyleEditor(e) {
    var h;
    const t = document.createElement("div");
    t.className = "layer-manager-style-editor", t.style.display = "none", t.dataset.layerId = e.id;
    const r = (h = this.map) == null ? void 0 : h.getLayer(e.id);
    if (!r) return t;
    const i = r.type, s = r.paint || {}, o = document.createElement("div");
    o.className = "layer-manager-style-title", o.innerHTML = `<span>🎨</span> Style ${e.name || e.id}`;
    const a = document.createElement("button");
    a.className = "layer-manager-btn-close", a.innerHTML = "×", a.onclick = () => this._toggleStyleEditor(e.id), o.appendChild(a), t.appendChild(o), i === "circle" ? (t.appendChild(this._createColorControl("Circle Color", e.id, "circle-color", s["circle-color"] || "#3388ff")), t.appendChild(this._createSliderControl("Circle Radius", e.id, "circle-radius", s["circle-radius"] || 5, 0, 20, 0.5)), t.appendChild(this._createSliderControl("Circle Opacity", e.id, "circle-opacity", s["circle-opacity"] || 1, 0, 1, 0.05)), t.appendChild(this._createSliderControl("Circle Blur", e.id, "circle-blur", s["circle-blur"] || 0, 0, 5, 0.1)), t.appendChild(this._createColorControl("Circle Stroke Color", e.id, "circle-stroke-color", s["circle-stroke-color"] || "#ffffff")), t.appendChild(this._createSliderControl("Circle Stroke Width", e.id, "circle-stroke-width", s["circle-stroke-width"] || 1, 0, 5, 0.1)), t.appendChild(this._createSliderControl("Circle Stroke Opacity", e.id, "circle-stroke-opacity", s["circle-stroke-opacity"] || 1, 0, 1, 0.05))) : i === "line" ? (t.appendChild(this._createColorControl("Line Color", e.id, "line-color", s["line-color"] || "#3388ff")), t.appendChild(this._createSliderControl("Line Width", e.id, "line-width", s["line-width"] || 2, 0, 20, 0.5)), t.appendChild(this._createSliderControl("Line Opacity", e.id, "line-opacity", s["line-opacity"] || 1, 0, 1, 0.05)), t.appendChild(this._createSliderControl("Line Blur", e.id, "line-blur", s["line-blur"] || 0, 0, 5, 0.1))) : i === "fill" ? (t.appendChild(this._createColorControl("Fill Color", e.id, "fill-color", s["fill-color"] || "#3388ff")), t.appendChild(this._createSliderControl("Fill Opacity", e.id, "fill-opacity", s["fill-opacity"] || 0.5, 0, 1, 0.05)), t.appendChild(this._createColorControl("Fill Outline Color", e.id, "fill-outline-color", s["fill-outline-color"] || "#3388ff"))) : i === "raster" && (t.appendChild(this._createSliderControl("Raster Opacity", e.id, "raster-opacity", s["raster-opacity"] || 1, 0, 1, 0.05)), t.appendChild(this._createSliderControl("Raster Brightness Min", e.id, "raster-brightness-min", s["raster-brightness-min"] || 0, -1, 1, 0.05)), t.appendChild(this._createSliderControl("Raster Brightness Max", e.id, "raster-brightness-max", s["raster-brightness-max"] || 1, -1, 1, 0.05)), t.appendChild(this._createSliderControl("Raster Saturation", e.id, "raster-saturation", s["raster-saturation"] || 0, -1, 1, 0.05)), t.appendChild(this._createSliderControl("Raster Contrast", e.id, "raster-contrast", s["raster-contrast"] || 0, -1, 1, 0.05)));
    const l = document.createElement("div");
    l.className = "layer-manager-style-actions";
    const u = document.createElement("button");
    u.className = "layer-manager-btn-apply", u.textContent = "Apply", u.onclick = () => this._applyStyles(e.id);
    const c = document.createElement("button");
    c.className = "layer-manager-btn-reset", c.textContent = "Reset", c.onclick = () => this._resetStyles(e.id);
    const f = document.createElement("button");
    return f.className = "layer-manager-btn-close-bottom", f.textContent = "Close", f.onclick = () => this._toggleStyleEditor(e.id), l.append(u, c, f), t.appendChild(l), t;
  }
  _createColorControl(e, t, r, i) {
    const s = document.createElement("div");
    s.className = "layer-manager-style-control";
    const o = document.createElement("label");
    o.textContent = e;
    const a = document.createElement("div");
    a.className = "layer-manager-color-input";
    const l = document.createElement("input");
    l.type = "color", l.value = this._rgbToHex(i), l.dataset.property = r;
    const u = document.createElement("input");
    return u.type = "text", u.value = this._rgbToHex(i), u.readOnly = !0, l.oninput = (c) => {
      u.value = c.target.value;
    }, a.append(l, u), s.append(o, a), s;
  }
  _createSliderControl(e, t, r, i, s, o, a) {
    const l = document.createElement("div");
    l.className = "layer-manager-style-control";
    const u = document.createElement("label");
    u.textContent = e;
    const c = document.createElement("div");
    c.className = "layer-manager-slider-input";
    const f = document.createElement("input");
    f.type = "range", f.min = String(s), f.max = String(o), f.step = String(a), f.value = String(i), f.dataset.property = r, f.className = "layer-manager-slider";
    const h = document.createElement("span");
    return h.className = "layer-manager-value", h.textContent = i.toFixed(2), f.oninput = (d) => {
      var C;
      const y = parseFloat(d.target.value);
      h.textContent = y.toFixed(2), (C = this.map) == null || C.setPaintProperty(t, r, y);
    }, c.append(f, h), l.append(u, c), l;
  }
  // ========================
  // Layer Operations
  // ========================
  _toggleLayerVisibility(e, t) {
    var s;
    const r = t ? "visible" : "none";
    (s = this.map) == null || s.setLayoutProperty(e, "visibility", r);
    const i = this.layerConfigs.get(e);
    i && (i.visible = t);
  }
  _updateLayerOpacity(e, t) {
    var s, o;
    const r = this.layerConfigs.get(e);
    r && (r.opacity = t);
    const i = (s = this.map) == null ? void 0 : s.getLayer(e);
    if (i) {
      const l = `${i.type}-opacity`;
      (o = this.map) == null || o.setPaintProperty(e, l, t);
    }
  }
  _toggleStyleEditor(e) {
    var i, s;
    const t = (i = this.container) == null ? void 0 : i.querySelector(
      `.layer-manager-style-editor[data-layer-id="${e}"]`
    );
    if (!t) return;
    const r = t.style.display === "none";
    (s = this.container) == null || s.querySelectorAll(".layer-manager-style-editor").forEach((o) => o.style.display = "none"), t.style.display = r ? "block" : "none";
  }
  _applyStyles(e) {
    var i;
    const t = (i = this.container) == null ? void 0 : i.querySelector(
      `.layer-manager-style-editor[data-layer-id="${e}"]`
    );
    if (!t) return;
    t.querySelectorAll("input[data-property]").forEach((s) => {
      var l;
      const o = s.dataset.property, a = s.type === "color" ? s.value : parseFloat(s.value);
      (l = this.map) == null || l.setPaintProperty(e, o, a);
    });
  }
  _resetStyles(e) {
    var a;
    const t = this.layers.find((l) => l.id === e);
    if (!(t != null && t.originalStyle)) return;
    Object.entries(t.originalStyle).forEach(([l, u]) => {
      var c;
      (c = this.map) == null || c.setPaintProperty(e, l, u);
    });
    const r = (a = this.container) == null ? void 0 : a.querySelector(`.layer-manager-item[data-layer-id="${e}"]`);
    if (!r) return;
    const i = r.querySelector(".layer-manager-style-editor"), s = (i == null ? void 0 : i.style.display) === "block", o = this._createStyleEditor(t);
    s && (o.style.display = "block"), r.replaceChild(o, i);
  }
  _removeLayer(e) {
    var r, i;
    (r = this.map) == null || r.removeLayer(e);
    const t = (i = this.container) == null ? void 0 : i.querySelector(`.layer-manager-item[data-layer-id="${e}"]`);
    t == null || t.remove(), this.layerConfigs.delete(e), this.layers = this.layers.filter((s) => s.id !== e);
  }
  _rgbToHex(e) {
    if (!e) return "#000000";
    if (e.startsWith("#")) return e;
    if (e.startsWith("rgb")) {
      const t = e.match(/\d+/g);
      if (t)
        return "#" + t.slice(0, 3).map((r) => {
          const i = parseInt(r).toString(16);
          return i.length === 1 ? "0" + i : i;
        }).join("");
    }
    return "#000000";
  }
  // ========================
  // Public API
  // ========================
  addLayer(e) {
    var r;
    this.layers.push(e), this.layerConfigs.set(e.id, {
      visible: e.visible !== !1,
      opacity: e.opacity ?? 1,
      minzoom: e.minzoom,
      maxzoom: e.maxzoom
    });
    const t = (r = this.container) == null ? void 0 : r.querySelector(".layer-manager-list");
    if (t) {
      const i = this._createLayerItem(e);
      t.appendChild(i);
    }
  }
  removeLayer(e) {
    this._removeLayer(e);
  }
  // ========================
  // Drag & Drop Reordering
  // ========================
  _handleDragStart(e) {
    const t = e.target.closest(".layer-manager-item");
    t && (this.draggedElement = t, t.classList.add("dragging"), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/html", t.innerHTML));
  }
  _handleDragOver(e) {
    return e.preventDefault && e.preventDefault(), e.dataTransfer.dropEffect = "move", !1;
  }
  _handleDragEnter(e) {
    const t = e.target.closest(".layer-manager-item");
    t && t !== this.draggedElement && t.classList.add("drag-over");
  }
  _handleDragLeave(e) {
    const t = e.target.closest(".layer-manager-item");
    t && t.classList.remove("drag-over");
  }
  _handleDrop(e) {
    var f;
    e.stopPropagation && e.stopPropagation();
    const t = e.target.closest(".layer-manager-item");
    if (!t || !this.draggedElement || t === this.draggedElement) return !1;
    const r = this.draggedElement.dataset.layerId, i = t.dataset.layerId, s = (f = this.container) == null ? void 0 : f.querySelector(".layer-manager-list"), o = Array.from((s == null ? void 0 : s.querySelectorAll(".layer-manager-item")) || []), a = o.indexOf(this.draggedElement), l = o.indexOf(t);
    a < l ? t.parentNode.insertBefore(this.draggedElement, t.nextSibling) : t.parentNode.insertBefore(this.draggedElement, t);
    const u = this.layers.find((h) => h.id === r);
    this.layers = this.layers.filter((h) => h.id !== r);
    const c = this.layers.findIndex((h) => h.id === i);
    return this.layers.splice(a < l ? c + 1 : c, 0, u), this._updateMapLayerOrder(), t.classList.remove("drag-over"), !1;
  }
  _handleDragEnd(e) {
    var r;
    const t = e.target.closest(".layer-manager-item");
    t && t.classList.remove("dragging"), (r = this.container) == null || r.querySelectorAll(".layer-manager-item").forEach((i) => i.classList.remove("drag-over")), this.draggedElement = null;
  }
  _updateMapLayerOrder() {
    var i;
    const e = (i = this.container) == null ? void 0 : i.querySelectorAll(".layer-manager-item");
    if (!e || !this.map) return;
    const t = Array.from(e).map((s) => s.dataset.layerId).reverse();
    let r = null;
    for (const s of t)
      try {
        if (this.map.getLayer(s)) {
          if (r && this.map.getLayer(r))
            this.map.moveLayer(s, r);
          else {
            const a = this.map.getStyle().layers.find((l) => !t.includes(l.id));
            a && this.map.moveLayer(s, a.id);
          }
          r = s;
        }
      } catch (o) {
        console.warn(`Failed to move layer ${s}:`, o);
      }
  }
  _moveLayerUp(e) {
    var u;
    const t = (u = this.container) == null ? void 0 : u.querySelector(".layer-manager-list"), r = Array.from((t == null ? void 0 : t.querySelectorAll(".layer-manager-item")) || []), i = r.find((c) => c.dataset.layerId === e), s = r.indexOf(i);
    if (s <= 0) return;
    const o = r[s - 1];
    t == null || t.insertBefore(i, o);
    const a = this.layers.findIndex((c) => c.id === e), [l] = this.layers.splice(a, 1);
    this.layers.splice(a - 1, 0, l), this._updateMapLayerOrder();
  }
  _moveLayerDown(e) {
    var u;
    const t = (u = this.container) == null ? void 0 : u.querySelector(".layer-manager-list"), r = Array.from((t == null ? void 0 : t.querySelectorAll(".layer-manager-item")) || []), i = r.find((c) => c.dataset.layerId === e), s = r.indexOf(i);
    if (s >= r.length - 1) return;
    const o = r[s + 1];
    t == null || t.insertBefore(o, i);
    const a = this.layers.findIndex((c) => c.id === e), [l] = this.layers.splice(a, 1);
    this.layers.splice(a + 1, 0, l), this._updateMapLayerOrder();
  }
}
export {
  Qr as ColorBar,
  ti as ConfigManager,
  Kr as MsgCtl,
  Yr as TemporalControl,
  ei as ToggleCtl
};
//# sourceMappingURL=index.js.map
