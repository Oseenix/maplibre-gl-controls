import './index.css';
var Mn = Object.defineProperty;
var Tn = (n, e, t) => e in n ? Mn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var y = (n, e, t) => Tn(n, typeof e != "symbol" ? e + "" : e, t);
const Sn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>', Ln = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>', Nn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>', An = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-backward</title><path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" /></svg>', $n = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-forward</title><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" /></svg>', me = "rgb(204, 204, 204)", oe = (n) => {
  const e = document.createElement("img");
  return e.src = `data:image/svg+xml,${encodeURIComponent(n)}`, e.style.width = "24px", e.style.height = "24px", e;
};
let ve;
const Dn = ({
  length: n,
  interval: e,
  onSliderValueChange: t
}) => {
  const r = document.createElement("div");
  r.classList.add("maplibregl-ctrl"), r.classList.add("maplibregl-ctrl-group"), r.style.width = "calc(min((500% - 29px), 260px))", r.style.height = "84px", r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.textAlign = "center";
  const i = document.createElement("div");
  i.innerHTML = "<br />", i.style.marginTop = "4px", r.appendChild(i);
  const o = document.createElement("input");
  o.type = "range", o.value = "0", o.min = "0", o.max = String(n - 1), o.addEventListener("input", () => {
    t();
  }), o.style.width = "80%", o.style.margin = "4px 0", r.appendChild(o);
  const s = document.createElement("div");
  s.style.display = "flex", s.style.justifyContent = "center", s.style.margin = "4px 0 0 0";
  const a = (H) => {
    u.style.backgroundColor = H ? me : "";
  }, l = () => u.style.backgroundColor === me, u = document.createElement("button");
  u.appendChild(oe(Nn)), u.style.border = "0", u.style.borderRadius = "0", u.style.marginRight = "16px", u.style.height = "24px", u.style.borderRadius = "4px", u.onclick = () => a(!l()), s.appendChild(u);
  const c = () => (o.value = String(Math.max(0, Number(o.value) - 1)), t(), Number(o.min) < Number(o.value)), h = () => {
    if (u.style.backgroundColor !== "" && Number(o.value) == Number(o.max))
      for (; c(); )
        ;
    else
      o.value = String(
        Math.min(Number(o.max), Number(o.value) + 1)
      );
    return t(), Number(o.value) < Number(o.max);
  }, f = document.createElement("button");
  f.appendChild(oe(An)), f.onclick = c, f.style.border = "0", f.style.height = "24px", f.style.borderRadius = "4px";
  const d = () => {
    ve !== void 0 && (clearInterval(ve), ve = void 0, g.onclick = null, M.style.backgroundColor = "");
  }, g = document.createElement("button");
  g.appendChild(oe(Sn)), g.style.border = "0", g.style.height = "24px", g.style.borderRadius = "4px", g.onclick = d;
  const C = () => M.style.backgroundColor === me, I = () => {
    C() || (M.style.backgroundColor = me, ve = setInterval(() => {
      h();
    }, e));
  }, M = document.createElement("button");
  M.appendChild(oe(Ln)), M.style.border = "0", M.style.height = "24px", M.style.borderRadius = "4px", M.onclick = I;
  const T = document.createElement("button");
  return T.appendChild(oe($n)), T.style.border = "0", T.style.height = "24px", T.style.borderRadius = "4px", T.onclick = h, s.appendChild(f), s.appendChild(g), s.appendChild(M), s.appendChild(T), r.appendChild(s), {
    container: r,
    titleDiv: i,
    slider: o,
    increment: h,
    decrement: c,
    isPlaying: C,
    play: I,
    pause: d,
    isLoopEnabled: l,
    setLoopEnabled: a
  };
};
class hi {
  constructor(e, t = {}) {
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
    this.temporalFrames = e, this.options = t;
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
      isLoopEnabled: f,
      setLoopEnabled: d
    } = Dn(r);
    this.container = i, this.containerTitle = o, this.temporalSlider = s, this.next = a, this.prev = l, this.play = u, this.pause = c, this.isPlaying = h, this.isLoopEnabled = f, this.setLoopEnabled = d, this.goto = (g) => {
      s.value = String(
        Math.min(this.temporalFrames.length - 1, Math.max(0, g))
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
  getPosition() {
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
    var r, i, o, s;
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
      t ? a = ((i = e.paint) == null ? void 0 : i[`${e.type}-opacity`]) || 1 : a = this.options.performance ? 1e-21 : 0, (o = this.map) == null || o.setPaintProperty(e.id, `${e.type}-opacity`, a);
    } else
      (s = this.map) == null || s.setLayoutProperty(
        e.id,
        "visibility",
        t ? "visible" : "none"
      );
  }
}
function Gt(n, ...e) {
  for (const t of e)
    for (const r in t)
      n[r] = t[r];
  return n;
}
class B extends Error {
  constructor(e, t) {
    super(t), this.message = t, this.key = e;
  }
}
class at {
  constructor(e, t = []) {
    this.parent = e, this.bindings = {};
    for (const [r, i] of t)
      this.bindings[r] = i;
  }
  concat(e) {
    return new at(this, e);
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
const Se = { kind: "null" }, p = { kind: "number" }, b = { kind: "string" }, m = { kind: "boolean" }, R = { kind: "color" }, Le = { kind: "projectionDefinition" }, Q = { kind: "object" }, v = { kind: "value" }, _n = { kind: "error" }, Ne = { kind: "collator" }, Ae = { kind: "formatted" }, $e = { kind: "padding" }, fe = { kind: "resolvedImage" }, De = { kind: "variableAnchorOffsetCollection" };
function L(n, e) {
  return {
    kind: "array",
    itemType: n,
    N: e
  };
}
function w(n) {
  if (n.kind === "array") {
    const e = w(n.itemType);
    return typeof n.N == "number" ? `array<${e}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${e}>`;
  } else
    return n.kind;
}
const Bn = [
  Se,
  p,
  b,
  m,
  R,
  Le,
  Ae,
  Q,
  L(v),
  $e,
  fe,
  De
];
function le(n, e) {
  if (e.kind === "error")
    return null;
  if (n.kind === "array") {
    if (e.kind === "array" && (e.N === 0 && e.itemType.kind === "value" || !le(n.itemType, e.itemType)) && (typeof n.N != "number" || n.N === e.N))
      return null;
  } else {
    if (n.kind === e.kind)
      return null;
    if (n.kind === "value") {
      for (const t of Bn)
        if (!le(t, e))
          return null;
    }
  }
  return `Expected ${w(n)} but found ${w(e)} instead.`;
}
function lt(n, e) {
  return e.some((t) => t.kind === n.kind);
}
function K(n, e) {
  return e.some((t) => t === "null" ? n === null : t === "array" ? Array.isArray(n) : t === "object" ? n && !Array.isArray(n) && typeof n == "object" : t === typeof n);
}
function Z(n, e) {
  return n.kind === "array" && e.kind === "array" ? n.itemType.kind === e.itemType.kind && typeof n.N == "number" : n.kind === e.kind;
}
const Xt = 0.96422, Zt = 1, Jt = 0.82521, Yt = 4 / 29, ee = 6 / 29, Qt = 3 * ee * ee, Rn = ee * ee * ee, zn = Math.PI / 180, Fn = 180 / Math.PI;
function en(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function tn([n, e, t, r]) {
  n = qe(n), e = qe(e), t = qe(t);
  let i, o;
  const s = Ve((0.2225045 * n + 0.7168786 * e + 0.0606169 * t) / Zt);
  n === e && e === t ? i = o = s : (i = Ve((0.4360747 * n + 0.3850649 * e + 0.1430804 * t) / Xt), o = Ve((0.0139322 * n + 0.0971045 * e + 0.7141733 * t) / Jt));
  const a = 116 * s - 16;
  return [a < 0 ? 0 : a, 500 * (i - s), 200 * (s - o), r];
}
function qe(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function Ve(n) {
  return n > Rn ? Math.pow(n, 1 / 3) : n / Qt + Yt;
}
function nn([n, e, t, r]) {
  let i = (n + 16) / 116, o = isNaN(e) ? i : i + e / 500, s = isNaN(t) ? i : i - t / 200;
  return i = Zt * Ke(i), o = Xt * Ke(o), s = Jt * Ke(s), [
    We(3.1338561 * o - 1.6168667 * i - 0.4906146 * s),
    // D50 -> sRGB
    We(-0.9787684 * o + 1.9161415 * i + 0.033454 * s),
    We(0.0719453 * o - 0.2289914 * i + 1.4052427 * s),
    r
  ];
}
function We(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function Ke(n) {
  return n > ee ? n * n * n : Qt * (n - Yt);
}
function Hn(n) {
  const [e, t, r, i] = tn(n), o = Math.sqrt(t * t + r * r);
  return [Math.round(o * 1e4) ? en(Math.atan2(r, t) * Fn) : NaN, o, e, i];
}
function jn([n, e, t, r]) {
  return n = isNaN(n) ? 0 : n * zn, nn([t, Math.cos(n) * e, Math.sin(n) * e, r]);
}
function On([n, e, t, r]) {
  n = en(n), e /= 100, t /= 100;
  function i(o) {
    const s = (o + n / 30) % 12, a = e * Math.min(t, 1 - t);
    return t - a * Math.max(-1, Math.min(s - 3, 9 - s, 1));
  }
  return [i(0), i(8), i(4), r];
}
function Un(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const e = qn[n];
  if (e) {
    const [i, o, s] = e;
    return [i / 255, o / 255, s / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const o = n.length < 6 ? 1 : 2;
    let s = 1;
    return [
      be(n.slice(s, s += o)),
      be(n.slice(s, s += o)),
      be(n.slice(s, s += o)),
      be(n.slice(s, s + o) || "ff")
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
        f,
        // ,         (optional)
        d,
        // <numeric>
        g,
        // %         (optional)
        C,
        // ,|/       (optional)
        I,
        // <numeric> (optional)
        M
        // %         (optional)
      ] = o, T = [u || " ", f || " ", C].join("");
      if (T === "  " || T === "  /" || T === ",," || T === ",,,") {
        const H = [l, h, g].join(""), ye = H === "%%%" ? 100 : H === "" ? 255 : 0;
        if (ye) {
          const St = [
            J(+a / ye, 0, 1),
            J(+c / ye, 0, 1),
            J(+d / ye, 0, 1),
            I ? Lt(+I, M) : 1
          ];
          if (Nt(St))
            return St;
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
      f
      // %         (optional)
    ] = r, d = [s || " ", l || " ", c].join("");
    if (d === "  " || d === "  /" || d === ",," || d === ",,,") {
      const g = [
        +o,
        J(+a, 0, 100),
        J(+u, 0, 100),
        h ? Lt(+h, f) : 1
      ];
      if (Nt(g))
        return On(g);
    }
  }
}
function be(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function Lt(n, e) {
  return J(e ? n / 100 : n, 0, 1);
}
function J(n, e, t) {
  return Math.min(Math.max(e, n), t);
}
function Nt(n) {
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
function q(n, e, t) {
  return n + t * (e - n);
}
function ue(n, e, t) {
  return n.map((r, i) => q(r, e[i], t));
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
  constructor(e, t, r, i = 1, o = !0) {
    this.r = e, this.g = t, this.b = r, this.a = i, o || (this.r *= i, this.g *= i, this.b *= i, i || this.overwriteGetter("rgb", [e, t, r, i]));
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
    const t = Un(e);
    if (t)
      return new k(...t, !1);
  }
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb() {
    const { r: e, g: t, b: r, a: i } = this, o = i || 1 / 0;
    return this.overwriteGetter("rgb", [e / o, t / o, r / o, i]);
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl() {
    return this.overwriteGetter("hcl", Hn(this.rgb));
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab() {
    return this.overwriteGetter("lab", tn(this.rgb));
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
    return `rgba(${[e, t, r].map((o) => Math.round(o * 255)).join(",")},${i})`;
  }
  static interpolate(e, t, r, i = "rgb") {
    switch (i) {
      case "rgb": {
        const [o, s, a, l] = ue(e.rgb, t.rgb, r);
        return new k(o, s, a, l, !1);
      }
      case "hcl": {
        const [o, s, a, l] = e.hcl, [u, c, h, f] = t.hcl;
        let d, g;
        if (!isNaN(o) && !isNaN(u)) {
          let H = u - o;
          u > o && H > 180 ? H -= 360 : u < o && o - u > 180 && (H += 360), d = o + r * H;
        } else isNaN(o) ? isNaN(u) ? d = NaN : (d = u, (a === 1 || a === 0) && (g = c)) : (d = o, (h === 1 || h === 0) && (g = s));
        const [C, I, M, T] = jn([
          d,
          g ?? q(s, c, r),
          q(a, h, r),
          q(l, f, r)
        ]);
        return new k(C, I, M, T, !1);
      }
      case "lab": {
        const [o, s, a, l] = nn(ue(e.lab, t.lab, r));
        return new k(o, s, a, l, !1);
      }
    }
  }
}
k.black = new k(0, 0, 0, 1);
k.white = new k(1, 1, 1, 1);
k.transparent = new k(0, 0, 0, 0);
k.red = new k(1, 0, 0, 1);
class ut {
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
class Ye {
  constructor(e, t, r, i, o) {
    this.text = e, this.image = t, this.scale = r, this.fontStack = i, this.textColor = o;
  }
}
class z {
  constructor(e) {
    this.sections = e;
  }
  static fromString(e) {
    return new z([new Ye(e, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((e) => e.text.length !== 0 || e.image && e.image.name.length !== 0);
  }
  static factory(e) {
    return e instanceof z ? e : z.fromString(e);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((e) => e.text).join("");
  }
}
class S {
  constructor(e) {
    this.values = e.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(e) {
    if (e instanceof S)
      return e;
    if (typeof e == "number")
      return new S([e, e, e, e]);
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
      return new S(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, r) {
    return new S(ue(e.values, t.values, r));
  }
}
class x {
  constructor(e) {
    this.name = "ExpressionEvaluationError", this.message = e;
  }
  toJSON() {
    return this.message;
  }
}
const Wn = /* @__PURE__ */ new Set(["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]);
class A {
  constructor(e) {
    this.values = e.slice();
  }
  static parse(e) {
    if (e instanceof A)
      return e;
    if (!(!Array.isArray(e) || e.length < 1 || e.length % 2 !== 0)) {
      for (let t = 0; t < e.length; t += 2) {
        const r = e[t], i = e[t + 1];
        if (typeof r != "string" || !Wn.has(r) || !Array.isArray(i) || i.length !== 2 || typeof i[0] != "number" || typeof i[1] != "number")
          return;
      }
      return new A(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, r) {
    const i = e.values, o = t.values;
    if (i.length !== o.length)
      throw new x(`Cannot interpolate values of different length. from: ${e.toString()}, to: ${t.toString()}`);
    const s = [];
    for (let a = 0; a < i.length; a += 2) {
      if (i[a] !== o[a])
        throw new x(`Cannot interpolate values containing mismatched anchors. from[${a}]: ${i[a]}, to[${a}]: ${o[a]}`);
      s.push(i[a]);
      const [l, u] = i[a + 1], [c, h] = o[a + 1];
      s.push([q(l, c, r), q(u, h, r)]);
    }
    return new A(s);
  }
}
class O {
  constructor(e) {
    this.name = e.name, this.available = e.available;
  }
  toString() {
    return this.name;
  }
  static fromString(e) {
    return e ? new O({ name: e, available: !1 }) : null;
  }
}
class N {
  constructor(e, t, r) {
    this.from = e, this.to = t, this.transition = r;
  }
  static interpolate(e, t, r) {
    return new N(e, t, r);
  }
  static parse(e) {
    if (e instanceof N)
      return e;
    if (Array.isArray(e) && e.length === 3 && typeof e[0] == "string" && typeof e[1] == "string" && typeof e[2] == "number")
      return new N(e[0], e[1], e[2]);
    if (typeof e == "object" && typeof e.from == "string" && typeof e.to == "string" && typeof e.transition == "number")
      return new N(e.from, e.to, e.transition);
    if (typeof e == "string")
      return new N(e, e, 1);
  }
}
function rn(n, e, t, r) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof e == "number" && e >= 0 && e <= 255 && typeof t == "number" && t >= 0 && t <= 255 ? typeof r > "u" || typeof r == "number" && r >= 0 && r <= 1 ? null : `Invalid rgba value [${[n, e, t, r].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof r == "number" ? [n, e, t, r] : [n, e, t]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function ce(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof N || n instanceof k || n instanceof ut || n instanceof z || n instanceof S || n instanceof A || n instanceof O)
    return !0;
  if (Array.isArray(n)) {
    for (const e of n)
      if (!ce(e))
        return !1;
    return !0;
  } else if (typeof n == "object") {
    for (const e in n)
      if (!ce(n[e]))
        return !1;
    return !0;
  } else
    return !1;
}
function E(n) {
  if (n === null)
    return Se;
  if (typeof n == "string")
    return b;
  if (typeof n == "boolean")
    return m;
  if (typeof n == "number")
    return p;
  if (n instanceof k)
    return R;
  if (n instanceof N)
    return Le;
  if (n instanceof ut)
    return Ne;
  if (n instanceof z)
    return Ae;
  if (n instanceof S)
    return $e;
  if (n instanceof A)
    return De;
  if (n instanceof O)
    return fe;
  if (Array.isArray(n)) {
    const e = n.length;
    let t;
    for (const r of n) {
      const i = E(r);
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
function se(n) {
  const e = typeof n;
  return n === null ? "" : e === "string" || e === "number" || e === "boolean" ? String(n) : n instanceof k || n instanceof N || n instanceof z || n instanceof S || n instanceof A || n instanceof O ? n.toString() : JSON.stringify(n);
}
class ne {
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'literal' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (!ce(e[1]))
      return t.error("invalid value");
    const r = e[1];
    let i = E(r);
    const o = t.expectedType;
    return i.kind === "array" && i.N === 0 && o && o.kind === "array" && (typeof o.N != "number" || o.N === 0) && (i = o), new ne(i, r);
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
const Ce = {
  string: b,
  number: p,
  boolean: m,
  object: Q
};
class D {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let r = 1, i;
    const o = e[0];
    if (o === "array") {
      let a;
      if (e.length > 2) {
        const u = e[1];
        if (typeof u != "string" || !(u in Ce) || u === "object")
          return t.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = Ce[u], r++;
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
      if (!Ce[o])
        throw new Error(`Types doesn't contain name = ${o}`);
      i = Ce[o];
    }
    const s = [];
    for (; r < e.length; r++) {
      const a = t.parse(e[r], r, v);
      if (!a)
        return null;
      s.push(a);
    }
    return new D(i, s);
  }
  evaluate(e) {
    for (let t = 0; t < this.args.length; t++) {
      const r = this.args[t].evaluate(e);
      if (le(this.type, E(r))) {
        if (t === this.args.length - 1)
          throw new x(`Expected value to be of type ${w(this.type)}, but found ${w(E(r))} instead.`);
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
const At = {
  "to-boolean": m,
  "to-color": R,
  "to-number": p,
  "to-string": b
};
class U {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const r = e[0];
    if (!At[r])
      throw new Error(`Can't parse ${r} as it is not part of the known types`);
    if ((r === "to-boolean" || r === "to-string") && e.length !== 2)
      return t.error("Expected one argument.");
    const i = At[r], o = [];
    for (let s = 1; s < e.length; s++) {
      const a = t.parse(e[s], s, v);
      if (!a)
        return null;
      o.push(a);
    }
    return new U(i, o);
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
            const o = e.parseColor(t);
            if (o)
              return o;
          } else if (Array.isArray(t) && (t.length < 3 || t.length > 4 ? r = `Invalid rgba value ${JSON.stringify(t)}: expected an array containing either three or four numeric values.` : r = rn(t[0], t[1], t[2], t[3]), !r))
            return new k(t[0] / 255, t[1] / 255, t[2] / 255, t[3]);
        }
        throw new x(r || `Could not parse color from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "padding": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = S.parse(t);
          if (i)
            return i;
        }
        throw new x(`Could not parse padding from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = A.parse(t);
          if (i)
            return i;
        }
        throw new x(`Could not parse variableAnchorOffsetCollection from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
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
        throw new x(`Could not convert ${JSON.stringify(t)} to number.`);
      }
      case "formatted":
        return z.fromString(se(this.args[0].evaluate(e)));
      case "resolvedImage":
        return O.fromString(se(this.args[0].evaluate(e)));
      case "projectionDefinition":
        return this.args[0].evaluate(e);
      default:
        return se(this.args[0].evaluate(e));
    }
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
function Kn(n, e) {
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
  let e = 0;
  for (let t = 0, r = n.length, i = r - 1, o, s; t < r; i = t++)
    o = n[t], s = n[i], e += (s.x - o.x) * (o.y + s.y);
  return e;
}
function Gn(n) {
  const e = n.length;
  for (let t = 0, r; t < e; t++) {
    const i = on(n[t]);
    if (i !== 0) {
      if (r === void 0)
        r = i < 0;
      else if (r === i < 0)
        return !0;
    }
  }
  return !1;
}
const $t = ["Unknown", "Point", "LineString", "Polygon"], Xn = {
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
    return this.feature ? typeof this.feature.type == "number" ? $t[this.feature.type] : Xn[this.feature.type] : null;
  }
  geometryType() {
    let e = this.feature.type;
    if (typeof e != "number" || (e = $t[this.feature.type], e === "Unknown"))
      return e;
    const t = this.geometry();
    return t.length === 1 ? e : e !== "Polygon" ? `Multi${e}` : Gn(t) ? "MultiPolygon" : "Polygon";
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
class _e {
  constructor(e, t, r = [], i, o = new at(), s = []) {
    this.registry = e, this.path = r, this.key = r.map((a) => `[${a}]`).join(""), this.scope = o, this.errors = s, this.expectedType = i, this._isConstant = t;
  }
  /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
  parse(e, t, r, i, o = {}) {
    return t ? this.concat(t, r, i)._parse(e, o) : this._parse(e, o);
  }
  _parse(e, t) {
    (e === null || typeof e == "string" || typeof e == "boolean" || typeof e == "number") && (e = ["literal", e]);
    function r(i, o, s) {
      return s === "assert" ? new D(o, [i]) : s === "coerce" ? new U(o, [i]) : i;
    }
    if (Array.isArray(e)) {
      if (e.length === 0)
        return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
      const i = e[0];
      if (typeof i != "string")
        return this.error(`Expression name must be a string, but found ${typeof i} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
      const o = this.registry[i];
      if (o) {
        let s = o.parse(e, this);
        if (!s)
          return null;
        if (this.expectedType) {
          const a = this.expectedType, l = s.type;
          if ((a.kind === "string" || a.kind === "number" || a.kind === "boolean" || a.kind === "object" || a.kind === "array") && l.kind === "value")
            s = r(s, a, t.typeAnnotation || "assert");
          else if (a.kind === "projectionDefinition" && (l.kind === "string" || l.kind === "array"))
            s = r(s, a, t.typeAnnotation || "coerce");
          else if ((a.kind === "color" || a.kind === "formatted" || a.kind === "resolvedImage") && (l.kind === "value" || l.kind === "string"))
            s = r(s, a, t.typeAnnotation || "coerce");
          else if (a.kind === "padding" && (l.kind === "value" || l.kind === "number" || l.kind === "array"))
            s = r(s, a, t.typeAnnotation || "coerce");
          else if (a.kind === "variableAnchorOffsetCollection" && (l.kind === "value" || l.kind === "array"))
            s = r(s, a, t.typeAnnotation || "coerce");
          else if (this.checkSubtype(a, l))
            return null;
        }
        if (!(s instanceof ne) && s.type.kind !== "resolvedImage" && this._isConstant(s)) {
          const a = new sn();
          try {
            s = new ne(s.type, s.evaluate(a));
          } catch (l) {
            return this.error(l.message), null;
          }
        }
        return s;
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
    const i = typeof e == "number" ? this.path.concat(e) : this.path, o = r ? this.scope.concat(r) : this.scope;
    return new _e(this.registry, this._isConstant, i, t || null, o, this.errors);
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
    this.errors.push(new B(r, e));
  }
  /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   * @param expected The expected type
   * @param t The actual type
   * @returns null if `t` is a subtype of `expected`; otherwise returns an error message
   */
  checkSubtype(e, t) {
    const r = le(e, t);
    return r && this.error(r), r;
  }
}
class Be {
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
    for (let o = 1; o < e.length - 1; o += 2) {
      const s = e[o];
      if (typeof s != "string")
        return t.error(`Expected string, but found ${typeof s} instead.`, o);
      if (/[^a-zA-Z0-9_]/.test(s))
        return t.error("Variable names must contain only alphanumeric characters or '_'.", o);
      const a = t.parse(e[o + 1], o + 1);
      if (!a)
        return null;
      r.push([s, a]);
    }
    const i = t.parse(e[e.length - 1], e.length - 1, t.expectedType, r);
    return i ? new Be(r, i) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class Re {
  constructor(e, t) {
    this.type = t.type, this.name = e, this.boundExpression = t;
  }
  static parse(e, t) {
    if (e.length !== 2 || typeof e[1] != "string")
      return t.error("'var' expression requires exactly one string literal argument.");
    const r = e[1];
    return t.scope.has(r) ? new Re(r, t.scope.get(r)) : t.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`, 1);
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
class ct {
  constructor(e, t, r) {
    this.type = e, this.index = t, this.input = r;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, p), i = t.parse(e[2], 2, L(t.expectedType || v));
    if (!r || !i)
      return null;
    const o = i.type;
    return new ct(o.itemType, r, i);
  }
  evaluate(e) {
    const t = this.index.evaluate(e), r = this.input.evaluate(e);
    if (t < 0)
      throw new x(`Array index out of bounds: ${t} < 0.`);
    if (t >= r.length)
      throw new x(`Array index out of bounds: ${t} > ${r.length - 1}.`);
    if (t !== Math.floor(t))
      throw new x(`Array index must be an integer, but found ${t} instead.`);
    return r[t];
  }
  eachChild(e) {
    e(this.index), e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class ht {
  constructor(e, t) {
    this.type = m, this.needle = e, this.haystack = t;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, v), i = t.parse(e[2], 2, v);
    return !r || !i ? null : lt(r.type, [m, b, p, Se, v]) ? new ht(r, i) : t.error(`Expected first argument to be of type boolean, string, number or null, but found ${w(r.type)} instead`);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!r)
      return !1;
    if (!K(t, ["boolean", "string", "number", "null"]))
      throw new x(`Expected first argument to be of type boolean, string, number or null, but found ${w(E(t))} instead.`);
    if (!K(r, ["string", "array"]))
      throw new x(`Expected second argument to be of type array or string, but found ${w(E(r))} instead.`);
    return r.indexOf(t) >= 0;
  }
  eachChild(e) {
    e(this.needle), e(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class Pe {
  constructor(e, t, r) {
    this.type = p, this.needle = e, this.haystack = t, this.fromIndex = r;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, v), i = t.parse(e[2], 2, v);
    if (!r || !i)
      return null;
    if (!lt(r.type, [m, b, p, Se, v]))
      return t.error(`Expected first argument to be of type boolean, string, number or null, but found ${w(r.type)} instead`);
    if (e.length === 4) {
      const o = t.parse(e[3], 3, p);
      return o ? new Pe(r, i, o) : null;
    } else
      return new Pe(r, i);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!K(t, ["boolean", "string", "number", "null"]))
      throw new x(`Expected first argument to be of type boolean, string, number or null, but found ${w(E(t))} instead.`);
    let i;
    if (this.fromIndex && (i = this.fromIndex.evaluate(e)), K(r, ["string"])) {
      const o = r.indexOf(t, i);
      return o === -1 ? -1 : [...r.slice(0, o)].length;
    } else {
      if (K(r, ["array"]))
        return r.indexOf(t, i);
      throw new x(`Expected second argument to be of type array or string, but found ${w(E(r))} instead.`);
    }
  }
  eachChild(e) {
    e(this.needle), e(this.haystack), this.fromIndex && e(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class pt {
  constructor(e, t, r, i, o, s) {
    this.inputType = e, this.type = t, this.input = r, this.cases = i, this.outputs = o, this.otherwise = s;
  }
  static parse(e, t) {
    if (e.length < 5)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if (e.length % 2 !== 1)
      return t.error("Expected an even number of arguments.");
    let r, i;
    t.expectedType && t.expectedType.kind !== "value" && (i = t.expectedType);
    const o = {}, s = [];
    for (let u = 2; u < e.length - 1; u += 2) {
      let c = e[u];
      const h = e[u + 1];
      Array.isArray(c) || (c = [c]);
      const f = t.concat(u);
      if (c.length === 0)
        return f.error("Expected at least one branch label.");
      for (const g of c) {
        if (typeof g != "number" && typeof g != "string")
          return f.error("Branch labels must be numbers or strings.");
        if (typeof g == "number" && Math.abs(g) > Number.MAX_SAFE_INTEGER)
          return f.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
        if (typeof g == "number" && Math.floor(g) !== g)
          return f.error("Numeric branch labels must be integer values.");
        if (!r)
          r = E(g);
        else if (f.checkSubtype(r, E(g)))
          return null;
        if (typeof o[String(g)] < "u")
          return f.error("Branch labels must be unique.");
        o[String(g)] = s.length;
      }
      const d = t.parse(h, u, i);
      if (!d)
        return null;
      i = i || d.type, s.push(d);
    }
    const a = t.parse(e[1], 1, v);
    if (!a)
      return null;
    const l = t.parse(e[e.length - 1], e.length - 1, i);
    return !l || a.type.kind !== "value" && t.concat(1).checkSubtype(r, a.type) ? null : new pt(r, i, a, o, s, l);
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    return (E(t) === this.inputType && this.outputs[this.cases[t]] || this.otherwise).evaluate(e);
  }
  eachChild(e) {
    e(this.input), this.outputs.forEach(e), e(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined()) && this.otherwise.outputDefined();
  }
}
class ft {
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
    for (let s = 1; s < e.length - 1; s += 2) {
      const a = t.parse(e[s], s, m);
      if (!a)
        return null;
      const l = t.parse(e[s + 1], s + 1, r);
      if (!l)
        return null;
      i.push([a, l]), r = r || l.type;
    }
    const o = t.parse(e[e.length - 1], e.length - 1, r);
    if (!o)
      return null;
    if (!r)
      throw new Error("Can't infer output type");
    return new ft(r, i, o);
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
class xe {
  constructor(e, t, r, i) {
    this.type = e, this.input = t, this.beginIndex = r, this.endIndex = i;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, v), i = t.parse(e[2], 2, p);
    if (!r || !i)
      return null;
    if (!lt(r.type, [L(v), b, v]))
      return t.error(`Expected first argument to be of type array or string, but found ${w(r.type)} instead`);
    if (e.length === 4) {
      const o = t.parse(e[3], 3, p);
      return o ? new xe(r.type, r, i, o) : null;
    } else
      return new xe(r.type, r, i);
  }
  evaluate(e) {
    const t = this.input.evaluate(e), r = this.beginIndex.evaluate(e);
    let i;
    if (this.endIndex && (i = this.endIndex.evaluate(e)), K(t, ["string"]))
      return [...t].slice(r, i).join("");
    if (K(t, ["array"]))
      return t.slice(r, i);
    throw new x(`Expected first argument to be of type array or string, but found ${w(E(t))} instead.`);
  }
  eachChild(e) {
    e(this.input), e(this.beginIndex), this.endIndex && e(this.endIndex);
  }
  outputDefined() {
    return !1;
  }
}
function ze(n, e) {
  const t = n.length - 1;
  let r = 0, i = t, o = 0, s, a;
  for (; r <= i; )
    if (o = Math.floor((r + i) / 2), s = n[o], a = n[o + 1], s <= e) {
      if (o === t || e < a)
        return o;
      r = o + 1;
    } else if (s > e)
      i = o - 1;
    else
      throw new x("Input is not a number.");
  return 0;
}
class Fe {
  constructor(e, t, r) {
    this.type = e, this.input = t, this.labels = [], this.outputs = [];
    for (const [i, o] of r)
      this.labels.push(i), this.outputs.push(o);
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
    let o = null;
    t.expectedType && t.expectedType.kind !== "value" && (o = t.expectedType);
    for (let s = 1; s < e.length; s += 2) {
      const a = s === 1 ? -1 / 0 : e[s], l = e[s + 1], u = s, c = s + 1;
      if (typeof a != "number")
        return t.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', u);
      if (i.length && i[i.length - 1][0] >= a)
        return t.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', u);
      const h = t.parse(l, c, o);
      if (!h)
        return null;
      o = o || h.type, i.push([a, h]);
    }
    return new Fe(o, r, i);
  }
  evaluate(e) {
    const t = this.labels, r = this.outputs;
    if (t.length === 1)
      return r[0].evaluate(e);
    const i = this.input.evaluate(e);
    if (i <= t[0])
      return r[0].evaluate(e);
    const o = t.length;
    if (i >= t[o - 1])
      return r[o - 1].evaluate(e);
    const s = ze(t, i);
    return r[s].evaluate(e);
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
function Zn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Ge, Dt;
function Jn() {
  if (Dt) return Ge;
  Dt = 1, Ge = n;
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
        var o = this.sampleCurveX(r) - e;
        if (Math.abs(o) < t) return r;
        var s = this.sampleCurveDerivativeX(r);
        if (Math.abs(s) < 1e-6) break;
        r = r - o / s;
      }
      var a = 0, l = 1;
      for (r = e, i = 0; i < 20 && (o = this.sampleCurveX(r), !(Math.abs(o - e) < t)); i++)
        e > o ? a = r : l = r, r = (l - a) * 0.5 + a;
      return r;
    },
    solve: function(e, t) {
      return this.sampleCurveY(this.solveCurveX(e, t));
    }
  }, Ge;
}
var Yn = Jn(), Qn = /* @__PURE__ */ Zn(Yn);
class $ {
  constructor(e, t, r, i, o) {
    this.type = e, this.operator = t, this.interpolation = r, this.input = i, this.labels = [], this.outputs = [];
    for (const [s, a] of o)
      this.labels.push(s), this.outputs.push(a);
  }
  static interpolationFactor(e, t, r, i) {
    let o = 0;
    if (e.name === "exponential")
      o = Xe(t, e.base, r, i);
    else if (e.name === "linear")
      o = Xe(t, 1, r, i);
    else if (e.name === "cubic-bezier") {
      const s = e.controlPoints;
      o = new Qn(s[0], s[1], s[2], s[3]).solve(Xe(t, 1, r, i));
    }
    return o;
  }
  static parse(e, t) {
    let [r, i, o, ...s] = e;
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
    if (o = t.parse(o, 2, p), !o)
      return null;
    const a = [];
    let l = null;
    r === "interpolate-hcl" || r === "interpolate-lab" ? l = R : t.expectedType && t.expectedType.kind !== "value" && (l = t.expectedType);
    for (let u = 0; u < s.length; u += 2) {
      const c = s[u], h = s[u + 1], f = u + 3, d = u + 4;
      if (typeof c != "number")
        return t.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', f);
      if (a.length && a[a.length - 1][0] >= c)
        return t.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', f);
      const g = t.parse(h, d, l);
      if (!g)
        return null;
      l = l || g.type, a.push([c, g]);
    }
    return !Z(l, p) && !Z(l, Le) && !Z(l, R) && !Z(l, $e) && !Z(l, De) && !Z(l, L(p)) ? t.error(`Type ${w(l)} is not interpolatable.`) : new $(l, r, i, o, a);
  }
  evaluate(e) {
    const t = this.labels, r = this.outputs;
    if (t.length === 1)
      return r[0].evaluate(e);
    const i = this.input.evaluate(e);
    if (i <= t[0])
      return r[0].evaluate(e);
    const o = t.length;
    if (i >= t[o - 1])
      return r[o - 1].evaluate(e);
    const s = ze(t, i), a = t[s], l = t[s + 1], u = $.interpolationFactor(this.interpolation, i, a, l), c = r[s].evaluate(e), h = r[s + 1].evaluate(e);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return q(c, h, u);
          case "color":
            return k.interpolate(c, h, u);
          case "padding":
            return S.interpolate(c, h, u);
          case "variableAnchorOffsetCollection":
            return A.interpolate(c, h, u);
          case "array":
            return ue(c, h, u);
          case "projectionDefinition":
            return N.interpolate(c, h, u);
        }
      case "interpolate-hcl":
        return k.interpolate(c, h, u, "hcl");
      case "interpolate-lab":
        return k.interpolate(c, h, u, "lab");
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
function Xe(n, e, t, r) {
  const i = r - t, o = n - t;
  return i === 0 ? 0 : e === 1 ? o / i : (Math.pow(e, o) - 1) / (Math.pow(e, i) - 1);
}
const er = {
  color: k.interpolate,
  number: q,
  padding: S.interpolate,
  variableAnchorOffsetCollection: A.interpolate,
  array: ue
};
class he {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let r = null;
    const i = t.expectedType;
    i && i.kind !== "value" && (r = i);
    const o = [];
    for (const a of e.slice(1)) {
      const l = t.parse(a, 1 + o.length, r, void 0, { typeAnnotation: "omit" });
      if (!l)
        return null;
      r = r || l.type, o.push(l);
    }
    if (!r)
      throw new Error("No output type");
    return i && o.some((a) => le(i, a.type)) ? new he(v, o) : new he(r, o);
  }
  evaluate(e) {
    let t = null, r = 0, i;
    for (const o of this.args)
      if (r++, t = o.evaluate(e), t && t instanceof O && !t.available && (i || (i = t.name), t = null, r === this.args.length && (t = i)), t !== null)
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
function _t(n, e) {
  return n === "==" || n === "!=" ? e.kind === "boolean" || e.kind === "string" || e.kind === "number" || e.kind === "null" || e.kind === "value" : e.kind === "string" || e.kind === "number" || e.kind === "value";
}
function tr(n, e, t) {
  return e === t;
}
function nr(n, e, t) {
  return e !== t;
}
function rr(n, e, t) {
  return e < t;
}
function ir(n, e, t) {
  return e > t;
}
function or(n, e, t) {
  return e <= t;
}
function sr(n, e, t) {
  return e >= t;
}
function an(n, e, t, r) {
  return r.compare(e, t) === 0;
}
function ar(n, e, t, r) {
  return !an(n, e, t, r);
}
function lr(n, e, t, r) {
  return r.compare(e, t) < 0;
}
function ur(n, e, t, r) {
  return r.compare(e, t) > 0;
}
function cr(n, e, t, r) {
  return r.compare(e, t) <= 0;
}
function hr(n, e, t, r) {
  return r.compare(e, t) >= 0;
}
function re(n, e, t) {
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
      if (!_t(a, l.type))
        return s.concat(1).error(`"${a}" comparisons are not supported for type '${w(l.type)}'.`);
      let u = s.parse(o[2], 2, v);
      if (!u)
        return null;
      if (!_t(a, u.type))
        return s.concat(2).error(`"${a}" comparisons are not supported for type '${w(u.type)}'.`);
      if (l.type.kind !== u.type.kind && l.type.kind !== "value" && u.type.kind !== "value")
        return s.error(`Cannot compare types '${w(l.type)}' and '${w(u.type)}'.`);
      r && (l.type.kind === "value" && u.type.kind !== "value" ? l = new D(u.type, [l]) : l.type.kind !== "value" && u.type.kind === "value" && (u = new D(l.type, [u])));
      let c = null;
      if (o.length === 4) {
        if (l.type.kind !== "string" && u.type.kind !== "string" && l.type.kind !== "value" && u.type.kind !== "value")
          return s.error("Cannot use collator to compare non-string types.");
        if (c = s.parse(o[3], 3, Ne), !c)
          return null;
      }
      return new ln(l, u, c);
    }
    evaluate(o) {
      const s = this.lhs.evaluate(o), a = this.rhs.evaluate(o);
      if (r && this.hasUntypedArgument) {
        const l = E(s), u = E(a);
        if (l.kind !== u.kind || !(l.kind === "string" || l.kind === "number"))
          throw new x(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${u.kind}) instead.`);
      }
      if (this.collator && !r && this.hasUntypedArgument) {
        const l = E(s), u = E(a);
        if (l.kind !== "string" || u.kind !== "string")
          return e(o, s, a);
      }
      return this.collator ? t(o, s, a, this.collator.evaluate(o)) : e(o, s, a);
    }
    eachChild(o) {
      o(this.lhs), o(this.rhs), this.collator && o(this.collator);
    }
    outputDefined() {
      return !0;
    }
  };
}
const pr = re("==", tr, an), fr = re("!=", nr, ar), dr = re("<", rr, lr), gr = re(">", ir, ur), yr = re("<=", or, cr), mr = re(">=", sr, hr);
class He {
  constructor(e, t, r) {
    this.type = Ne, this.locale = r, this.caseSensitive = e, this.diacriticSensitive = t;
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
    const o = t.parse(r["diacritic-sensitive"] === void 0 ? !1 : r["diacritic-sensitive"], 1, m);
    if (!o)
      return null;
    let s = null;
    return r.locale && (s = t.parse(r.locale, 1, b), !s) ? null : new He(i, o, s);
  }
  evaluate(e) {
    return new ut(this.caseSensitive.evaluate(e), this.diacriticSensitive.evaluate(e), this.locale ? this.locale.evaluate(e) : null);
  }
  eachChild(e) {
    e(this.caseSensitive), e(this.diacriticSensitive), this.locale && e(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class dt {
  constructor(e, t, r, i, o) {
    this.type = b, this.number = e, this.locale = t, this.currency = r, this.minFractionDigits = i, this.maxFractionDigits = o;
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
    let o = null;
    if (i.locale && (o = t.parse(i.locale, 1, b), !o))
      return null;
    let s = null;
    if (i.currency && (s = t.parse(i.currency, 1, b), !s))
      return null;
    let a = null;
    if (i["min-fraction-digits"] && (a = t.parse(i["min-fraction-digits"], 1, p), !a))
      return null;
    let l = null;
    return i["max-fraction-digits"] && (l = t.parse(i["max-fraction-digits"], 1, p), !l) ? null : new dt(r, o, s, a, l);
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
class gt {
  constructor(e) {
    this.type = Ae, this.sections = e;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const r = e[1];
    if (!Array.isArray(r) && typeof r == "object")
      return t.error("First argument must be an image or text section.");
    const i = [];
    let o = !1;
    for (let s = 1; s <= e.length - 1; ++s) {
      const a = e[s];
      if (o && typeof a == "object" && !Array.isArray(a)) {
        o = !1;
        let l = null;
        if (a["font-scale"] && (l = t.parse(a["font-scale"], 1, p), !l))
          return null;
        let u = null;
        if (a["text-font"] && (u = t.parse(a["text-font"], 1, L(b)), !u))
          return null;
        let c = null;
        if (a["text-color"] && (c = t.parse(a["text-color"], 1, R), !c))
          return null;
        const h = i[i.length - 1];
        h.scale = l, h.font = u, h.textColor = c;
      } else {
        const l = t.parse(e[s], 1, v);
        if (!l)
          return null;
        const u = l.type.kind;
        if (u !== "string" && u !== "value" && u !== "null" && u !== "resolvedImage")
          return t.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        o = !0, i.push({ content: l, scale: null, font: null, textColor: null });
      }
    }
    return new gt(i);
  }
  evaluate(e) {
    const t = (r) => {
      const i = r.content.evaluate(e);
      return E(i) === fe ? new Ye("", i, null, null, null) : new Ye(se(i), null, r.scale ? r.scale.evaluate(e) : null, r.font ? r.font.evaluate(e).join(",") : null, r.textColor ? r.textColor.evaluate(e) : null);
    };
    return new z(this.sections.map(t));
  }
  eachChild(e) {
    for (const t of this.sections)
      e(t.content), t.scale && e(t.scale), t.font && e(t.font), t.textColor && e(t.textColor);
  }
  outputDefined() {
    return !1;
  }
}
class yt {
  constructor(e) {
    this.type = fe, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected two arguments.");
    const r = t.parse(e[1], 1, b);
    return r ? new yt(r) : t.error("No image name provided.");
  }
  evaluate(e) {
    const t = this.input.evaluate(e), r = O.fromString(t);
    return r && e.availableImages && (r.available = e.availableImages.indexOf(t) > -1), r;
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class mt {
  constructor(e) {
    this.type = p, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`Expected 1 argument, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1);
    return r ? r.type.kind !== "array" && r.type.kind !== "string" && r.type.kind !== "value" ? t.error(`Expected argument of type string or array, but found ${w(r.type)} instead.`) : new mt(r) : null;
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    if (typeof t == "string")
      return [...t].length;
    if (Array.isArray(t))
      return t.length;
    throw new x(`Expected value to be of type string or array, but found ${w(E(t))} instead.`);
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const F = 8192;
function vr(n, e) {
  const t = br(n[0]), r = kr(n[1]), i = Math.pow(2, e.z);
  return [Math.round(t * i * F), Math.round(r * i * F)];
}
function vt(n, e) {
  const t = Math.pow(2, e.z), r = (n[0] / F + e.x) / t, i = (n[1] / F + e.y) / t;
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
function de(n, e) {
  n[0] = Math.min(n[0], e[0]), n[1] = Math.min(n[1], e[1]), n[2] = Math.max(n[2], e[0]), n[3] = Math.max(n[3], e[1]);
}
function pe(n, e) {
  return !(n[0] <= e[0] || n[2] >= e[2] || n[1] <= e[1] || n[3] >= e[3]);
}
function Pr(n, e, t) {
  return e[1] > n[1] != t[1] > n[1] && n[0] < (t[0] - e[0]) * (n[1] - e[1]) / (t[1] - e[1]) + e[0];
}
function xr(n, e, t) {
  const r = n[0] - e[0], i = n[1] - e[1], o = n[0] - t[0], s = n[1] - t[1];
  return r * s - o * i === 0 && r * o <= 0 && i * s <= 0;
}
function je(n, e, t, r) {
  const i = [e[0] - n[0], e[1] - n[1]], o = [r[0] - t[0], r[1] - t[1]];
  return Tr(o, i) === 0 ? !1 : !!(Bt(n, e, t, r) && Bt(t, r, n, e));
}
function Ir(n, e, t) {
  for (const r of t)
    for (let i = 0; i < r.length - 1; ++i)
      if (je(n, e, r[i], r[i + 1]))
        return !0;
  return !1;
}
function ie(n, e, t = !1) {
  let r = !1;
  for (const i of e)
    for (let o = 0; o < i.length - 1; o++) {
      if (xr(n, i[o], i[o + 1]))
        return t;
      Pr(n, i[o], i[o + 1]) && (r = !r);
    }
  return r;
}
function Er(n, e) {
  for (const t of e)
    if (ie(n, t))
      return !0;
  return !1;
}
function un(n, e) {
  for (const t of n)
    if (!ie(t, e))
      return !1;
  for (let t = 0; t < n.length - 1; ++t)
    if (Ir(n[t], n[t + 1], e))
      return !1;
  return !0;
}
function Mr(n, e) {
  for (const t of e)
    if (un(n, t))
      return !0;
  return !1;
}
function Tr(n, e) {
  return n[0] * e[1] - n[1] * e[0];
}
function Bt(n, e, t, r) {
  const i = n[0] - t[0], o = n[1] - t[1], s = e[0] - t[0], a = e[1] - t[1], l = r[0] - t[0], u = r[1] - t[1], c = i * u - l * o, h = s * u - l * a;
  return c > 0 && h < 0 || c < 0 && h > 0;
}
function bt(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const o = [];
    for (let s = 0; s < n[i].length; s++) {
      const a = vr(n[i][s], t);
      de(e, a), o.push(a);
    }
    r.push(o);
  }
  return r;
}
function cn(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const o = bt(n[i], e, t);
    r.push(o);
  }
  return r;
}
function hn(n, e, t, r) {
  if (n[0] < t[0] || n[0] > t[2]) {
    const i = r * 0.5;
    let o = n[0] - t[0] > i ? -r : t[0] - n[0] > i ? r : 0;
    o === 0 && (o = n[0] - t[2] > i ? -r : t[2] - n[0] > i ? r : 0), n[0] += o;
  }
  de(e, n);
}
function Sr(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function Rt(n, e, t, r) {
  const i = Math.pow(2, r.z) * F, o = [r.x * F, r.y * F], s = [];
  for (const a of n)
    for (const l of a) {
      const u = [l.x + o[0], l.y + o[1]];
      hn(u, e, t, i), s.push(u);
    }
  return s;
}
function zt(n, e, t, r) {
  const i = Math.pow(2, r.z) * F, o = [r.x * F, r.y * F], s = [];
  for (const a of n) {
    const l = [];
    for (const u of a) {
      const c = [u.x + o[0], u.y + o[1]];
      de(e, c), l.push(c);
    }
    s.push(l);
  }
  if (e[2] - e[0] <= i / 2) {
    Sr(e);
    for (const a of s)
      for (const l of a)
        hn(l, e, t, i);
  }
  return s;
}
function Lr(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const o = bt(e.coordinates, r, i), s = Rt(n.geometry(), t, r, i);
    if (!pe(t, r))
      return !1;
    for (const a of s)
      if (!ie(a, o))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const o = cn(e.coordinates, r, i), s = Rt(n.geometry(), t, r, i);
    if (!pe(t, r))
      return !1;
    for (const a of s)
      if (!Er(a, o))
        return !1;
  }
  return !0;
}
function Nr(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const o = bt(e.coordinates, r, i), s = zt(n.geometry(), t, r, i);
    if (!pe(t, r))
      return !1;
    for (const a of s)
      if (!un(a, o))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const o = cn(e.coordinates, r, i), s = zt(n.geometry(), t, r, i);
    if (!pe(t, r))
      return !1;
    for (const a of s)
      if (!Mr(a, o))
        return !1;
  }
  return !0;
}
class G {
  constructor(e, t) {
    this.type = m, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'within' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (ce(e[1])) {
      const r = e[1];
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
          return new G(r, o);
        }
      } else if (r.type === "Feature") {
        const i = r.geometry.type;
        if (i === "Polygon" || i === "MultiPolygon")
          return new G(r, r.geometry);
      } else if (r.type === "Polygon" || r.type === "MultiPolygon")
        return new G(r, r);
    }
    return t.error("'within' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryDollarType() === "Point")
        return Lr(e, this.geometries);
      if (e.geometryDollarType() === "LineString")
        return Nr(e, this.geometries);
    }
    return !1;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class pn {
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
      const o = e - 1 >> 1, s = t[o];
      if (r(i, s) >= 0) break;
      t[e] = s, e = o;
    }
    t[e] = i;
  }
  _down(e) {
    const { data: t, compare: r } = this, i = this.length >> 1, o = t[e];
    for (; e < i; ) {
      let s = (e << 1) + 1;
      const a = s + 1;
      if (a < this.length && r(t[a], t[s]) < 0 && (s = a), r(t[s], o) >= 0) break;
      t[e] = t[s], e = s;
    }
    t[e] = o;
  }
}
const Ar = 6378.137, Ft = 1 / 298.257223563, Ht = Ft * (2 - Ft), jt = Math.PI / 180;
class Ct {
  constructor(e) {
    const t = jt * Ar * 1e3, r = Math.cos(e * jt), i = 1 / (1 - Ht * (1 - r * r)), o = Math.sqrt(i);
    this.kx = t * o * r, this.ky = t * o * i * (1 - Ht);
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
    let r = 1 / 0, i, o, s, a;
    for (let l = 0; l < e.length - 1; l++) {
      let u = e[l][0], c = e[l][1], h = this.wrap(e[l + 1][0] - u) * this.kx, f = (e[l + 1][1] - c) * this.ky, d = 0;
      (h !== 0 || f !== 0) && (d = (this.wrap(t[0] - u) * this.kx * h + (t[1] - c) * this.ky * f) / (h * h + f * f), d > 1 ? (u = e[l + 1][0], c = e[l + 1][1]) : d > 0 && (u += h / this.kx * d, c += f / this.ky * d)), h = this.wrap(t[0] - u) * this.kx, f = (t[1] - c) * this.ky;
      const g = h * h + f * f;
      g < r && (r = g, i = u, o = c, s = l, a = d);
    }
    return {
      point: [i, o],
      index: s,
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
const Qe = 100, et = 50;
function fn(n, e) {
  return e[0] - n[0];
}
function Ie(n) {
  return n[1] - n[0] + 1;
}
function j(n, e) {
  return n[1] >= n[0] && n[1] < e;
}
function tt(n, e) {
  if (n[0] > n[1])
    return [null, null];
  const t = Ie(n);
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
function nt(n, e) {
  if (!j(e, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let r = e[0]; r <= e[1]; ++r)
    de(t, n[r]);
  return t;
}
function rt(n) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const t of n)
    for (const r of t)
      de(e, r);
  return e;
}
function Ot(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function kt(n, e, t) {
  if (!Ot(n) || !Ot(e))
    return NaN;
  let r = 0, i = 0;
  return n[2] < e[0] && (r = e[0] - n[2]), n[0] > e[2] && (r = n[0] - e[2]), n[1] > e[3] && (i = n[1] - e[3]), n[3] < e[1] && (i = e[1] - n[3]), t.distance([0, 0], [r, i]);
}
function W(n, e, t) {
  const r = t.pointOnLine(e, n);
  return t.distance(n, r.point);
}
function wt(n, e, t, r, i) {
  const o = Math.min(W(n, [t, r], i), W(e, [t, r], i)), s = Math.min(W(t, [n, e], i), W(r, [n, e], i));
  return Math.min(o, s);
}
function $r(n, e, t, r, i) {
  if (!(j(e, n.length) && j(r, t.length)))
    return 1 / 0;
  let s = 1 / 0;
  for (let a = e[0]; a < e[1]; ++a) {
    const l = n[a], u = n[a + 1];
    for (let c = r[0]; c < r[1]; ++c) {
      const h = t[c], f = t[c + 1];
      if (je(l, u, h, f))
        return 0;
      s = Math.min(s, wt(l, u, h, f, i));
    }
  }
  return s;
}
function Dr(n, e, t, r, i) {
  if (!(j(e, n.length) && j(r, t.length)))
    return NaN;
  let s = 1 / 0;
  for (let a = e[0]; a <= e[1]; ++a)
    for (let l = r[0]; l <= r[1]; ++l)
      if (s = Math.min(s, i.distance(n[a], t[l])), s === 0)
        return s;
  return s;
}
function _r(n, e, t) {
  if (ie(n, e, !0))
    return 0;
  let r = 1 / 0;
  for (const i of e) {
    const o = i[0], s = i[i.length - 1];
    if (o !== s && (r = Math.min(r, W(n, [s, o], t)), r === 0))
      return r;
    const a = t.pointOnLine(i, n);
    if (r = Math.min(r, t.distance(n, a.point)), r === 0)
      return r;
  }
  return r;
}
function Br(n, e, t, r) {
  if (!j(e, n.length))
    return NaN;
  for (let o = e[0]; o <= e[1]; ++o)
    if (ie(n[o], t, !0))
      return 0;
  let i = 1 / 0;
  for (let o = e[0]; o < e[1]; ++o) {
    const s = n[o], a = n[o + 1];
    for (const l of t)
      for (let u = 0, c = l.length, h = c - 1; u < c; h = u++) {
        const f = l[h], d = l[u];
        if (je(s, a, f, d))
          return 0;
        i = Math.min(i, wt(s, a, f, d, r));
      }
  }
  return i;
}
function Ut(n, e) {
  for (const t of n)
    for (const r of t)
      if (ie(r, e, !0))
        return !0;
  return !1;
}
function Rr(n, e, t, r = 1 / 0) {
  const i = rt(n), o = rt(e);
  if (r !== 1 / 0 && kt(i, o, t) >= r)
    return r;
  if (pe(i, o)) {
    if (Ut(n, e))
      return 0;
  } else if (Ut(e, n))
    return 0;
  let s = 1 / 0;
  for (const a of n)
    for (let l = 0, u = a.length, c = u - 1; l < u; c = l++) {
      const h = a[c], f = a[l];
      for (const d of e)
        for (let g = 0, C = d.length, I = C - 1; g < C; I = g++) {
          const M = d[I], T = d[g];
          if (je(h, f, M, T))
            return 0;
          s = Math.min(s, wt(h, f, M, T, t));
        }
    }
  return s;
}
function qt(n, e, t, r, i, o) {
  if (!o)
    return;
  const s = kt(nt(r, o), i, t);
  s < e && n.push([s, o, [0, 0]]);
}
function ke(n, e, t, r, i, o, s) {
  if (!o || !s)
    return;
  const a = kt(nt(r, o), nt(i, s), t);
  a < e && n.push([a, o, s]);
}
function Ee(n, e, t, r, i = 1 / 0) {
  let o = Math.min(r.distance(n[0], t[0][0]), i);
  if (o === 0)
    return o;
  const s = new pn([[0, [0, n.length - 1], [0, 0]]], fn), a = rt(t);
  for (; s.length > 0; ) {
    const l = s.pop();
    if (l[0] >= o)
      continue;
    const u = l[1], c = e ? et : Qe;
    if (Ie(u) <= c) {
      if (!j(u, n.length))
        return NaN;
      if (e) {
        const h = Br(n, u, t, r);
        if (isNaN(h) || h === 0)
          return h;
        o = Math.min(o, h);
      } else
        for (let h = u[0]; h <= u[1]; ++h) {
          const f = _r(n[h], t, r);
          if (o = Math.min(o, f), o === 0)
            return 0;
        }
    } else {
      const h = tt(u, e);
      qt(s, o, r, n, a, h[0]), qt(s, o, r, n, a, h[1]);
    }
  }
  return o;
}
function Me(n, e, t, r, i, o = 1 / 0) {
  let s = Math.min(o, i.distance(n[0], t[0]));
  if (s === 0)
    return s;
  const a = new pn([[0, [0, n.length - 1], [0, t.length - 1]]], fn);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= s)
      continue;
    const u = l[1], c = l[2], h = e ? et : Qe, f = r ? et : Qe;
    if (Ie(u) <= h && Ie(c) <= f) {
      if (!j(u, n.length) && j(c, t.length))
        return NaN;
      let d;
      if (e && r)
        d = $r(n, u, t, c, i), s = Math.min(s, d);
      else if (e && !r) {
        const g = n.slice(u[0], u[1] + 1);
        for (let C = c[0]; C <= c[1]; ++C)
          if (d = W(t[C], g, i), s = Math.min(s, d), s === 0)
            return s;
      } else if (!e && r) {
        const g = t.slice(c[0], c[1] + 1);
        for (let C = u[0]; C <= u[1]; ++C)
          if (d = W(n[C], g, i), s = Math.min(s, d), s === 0)
            return s;
      } else
        d = Dr(n, u, t, c, i), s = Math.min(s, d);
    } else {
      const d = tt(u, e), g = tt(c, r);
      ke(a, s, i, n, t, d[0], g[0]), ke(a, s, i, n, t, d[0], g[1]), ke(a, s, i, n, t, d[1], g[0]), ke(a, s, i, n, t, d[1], g[1]);
    }
  }
  return s;
}
function zr(n, e) {
  const t = n.geometry(), r = t.flat().map((s) => vt([s.x, s.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new Ct(r[0][1]);
  let o = 1 / 0;
  for (const s of e) {
    switch (s.type) {
      case "Point":
        o = Math.min(o, Me(r, !1, [s.coordinates], !1, i, o));
        break;
      case "LineString":
        o = Math.min(o, Me(r, !1, s.coordinates, !0, i, o));
        break;
      case "Polygon":
        o = Math.min(o, Ee(r, !1, s.coordinates, i, o));
        break;
    }
    if (o === 0)
      return o;
  }
  return o;
}
function Fr(n, e) {
  const t = n.geometry(), r = t.flat().map((s) => vt([s.x, s.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new Ct(r[0][1]);
  let o = 1 / 0;
  for (const s of e) {
    switch (s.type) {
      case "Point":
        o = Math.min(o, Me(r, !0, [s.coordinates], !1, i, o));
        break;
      case "LineString":
        o = Math.min(o, Me(r, !0, s.coordinates, !0, i, o));
        break;
      case "Polygon":
        o = Math.min(o, Ee(r, !0, s.coordinates, i, o));
        break;
    }
    if (o === 0)
      return o;
  }
  return o;
}
function Hr(n, e) {
  const t = n.geometry();
  if (t.length === 0 || t[0].length === 0)
    return NaN;
  const r = Kn(t).map((s) => s.map((a) => a.map((l) => vt([l.x, l.y], n.canonical)))), i = new Ct(r[0][0][0][1]);
  let o = 1 / 0;
  for (const s of e)
    for (const a of r) {
      switch (s.type) {
        case "Point":
          o = Math.min(o, Ee([s.coordinates], !1, a, i, o));
          break;
        case "LineString":
          o = Math.min(o, Ee(s.coordinates, !0, a, i, o));
          break;
        case "Polygon":
          o = Math.min(o, Rr(a, s.coordinates, i, o));
          break;
      }
      if (o === 0)
        return o;
    }
  return o;
}
function Ze(n) {
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
class X {
  constructor(e, t) {
    this.type = p, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'distance' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (ce(e[1])) {
      const r = e[1];
      if (r.type === "FeatureCollection")
        return new X(r, r.features.map((i) => Ze(i.geometry)).flat());
      if (r.type === "Feature")
        return new X(r, Ze(r.geometry));
      if ("type" in r && "coordinates" in r)
        return new X(r, Ze(r));
    }
    return t.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryType() === "Point")
        return zr(e, this.geometries);
      if (e.geometryType() === "LineString")
        return Fr(e, this.geometries);
      if (e.geometryType() === "Polygon")
        return Hr(e, this.geometries);
    }
    return NaN;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const Pt = {
  // special forms
  "==": pr,
  "!=": fr,
  ">": gr,
  "<": dr,
  ">=": mr,
  "<=": yr,
  array: D,
  at: ct,
  boolean: D,
  case: ft,
  coalesce: he,
  collator: He,
  format: gt,
  image: yt,
  in: ht,
  "index-of": Pe,
  interpolate: $,
  "interpolate-hcl": $,
  "interpolate-lab": $,
  length: mt,
  let: Be,
  literal: ne,
  match: pt,
  number: D,
  "number-format": dt,
  object: D,
  slice: xe,
  step: Fe,
  string: D,
  "to-boolean": U,
  "to-color": U,
  "to-number": U,
  "to-string": U,
  var: Re,
  within: G,
  distance: X
};
class _ {
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
    const r = e[0], i = _.definitions[r];
    if (!i)
      return t.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const o = Array.isArray(i) ? i[0] : i.type, s = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads, a = s.filter(([u]) => !Array.isArray(u) || // varags
    u.length === e.length - 1);
    let l = null;
    for (const [u, c] of a) {
      l = new _e(t.registry, Te, t.path, null, t.scope);
      const h = [];
      let f = !1;
      for (let d = 1; d < e.length; d++) {
        const g = e[d], C = Array.isArray(u) ? u[d - 1] : u.type, I = l.parse(g, 1 + h.length, C);
        if (!I) {
          f = !0;
          break;
        }
        h.push(I);
      }
      if (!f) {
        if (Array.isArray(u) && u.length !== h.length) {
          l.error(`Expected ${u.length} arguments, but found ${h.length} instead.`);
          continue;
        }
        for (let d = 0; d < h.length; d++) {
          const g = Array.isArray(u) ? u[d] : u.type, C = h[d];
          l.concat(d + 1).checkSubtype(g, C.type);
        }
        if (l.errors.length === 0)
          return new _(r, o, c, h);
      }
    }
    if (a.length === 1)
      t.errors.push(...l.errors);
    else {
      const c = (a.length ? a : s).map(([f]) => Or(f)).join(" | "), h = [];
      for (let f = 1; f < e.length; f++) {
        const d = t.parse(e[f], 1 + h.length);
        if (!d)
          return null;
        h.push(w(d.type));
      }
      t.error(`Expected arguments of type ${c}, but found (${h.join(", ")}) instead.`);
    }
    return null;
  }
  static register(e, t) {
    _.definitions = t;
    for (const r in t)
      e[r] = _;
  }
}
function Vt(n, [e, t, r, i]) {
  e = e.evaluate(n), t = t.evaluate(n), r = r.evaluate(n);
  const o = i ? i.evaluate(n) : 1, s = rn(e, t, r, o);
  if (s)
    throw new x(s);
  return new k(e / 255, t / 255, r / 255, o, !1);
}
function Wt(n, e) {
  return n in e;
}
function Je(n, e) {
  const t = e[n];
  return typeof t > "u" ? null : t;
}
function jr(n, e, t, r) {
  for (; t <= r; ) {
    const i = t + r >> 1;
    if (e[i] === n)
      return !0;
    e[i] > n ? r = i - 1 : t = i + 1;
  }
  return !1;
}
function V(n) {
  return { type: n };
}
_.register(Pt, {
  error: [
    _n,
    [b],
    (n, [e]) => {
      throw new x(e.evaluate(n));
    }
  ],
  typeof: [
    b,
    [v],
    (n, [e]) => w(E(e.evaluate(n)))
  ],
  "to-rgba": [
    L(p, 4),
    [R],
    (n, [e]) => {
      const [t, r, i, o] = e.evaluate(n).rgb;
      return [t * 255, r * 255, i * 255, o];
    }
  ],
  rgb: [
    R,
    [p, p, p],
    Vt
  ],
  rgba: [
    R,
    [p, p, p, p],
    Vt
  ],
  has: {
    type: m,
    overloads: [
      [
        [b],
        (n, [e]) => Wt(e.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [e, t]) => Wt(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  get: {
    type: v,
    overloads: [
      [
        [b],
        (n, [e]) => Je(e.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [e, t]) => Je(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    v,
    [b],
    (n, [e]) => Je(e.evaluate(n), n.featureState || {})
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
    V(p),
    (n, e) => {
      let t = 0;
      for (const r of e)
        t += r.evaluate(n);
      return t;
    }
  ],
  "*": [
    p,
    V(p),
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
    V(p),
    (n, e) => Math.min(...e.map((t) => t.evaluate(n)))
  ],
  max: [
    p,
    V(p),
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
    (n, [e, t]) => jr(n.properties()[e.value], t.value, 0, t.value.length - 1)
  ],
  all: {
    type: m,
    overloads: [
      [
        [m, m],
        (n, [e, t]) => e.evaluate(n) && t.evaluate(n)
      ],
      [
        V(m),
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
        V(m),
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
    V(v),
    (n, e) => e.map((t) => se(t.evaluate(n))).join("")
  ],
  "resolved-locale": [
    b,
    [Ne],
    (n, [e]) => e.evaluate(n).resolvedLocale()
  ]
});
function Or(n) {
  return Array.isArray(n) ? `(${n.map(w).join(", ")})` : `(${w(n.type)}...)`;
}
function Te(n) {
  if (n instanceof Re)
    return Te(n.boundExpression);
  if (n instanceof _ && n.name === "error")
    return !1;
  if (n instanceof He)
    return !1;
  if (n instanceof G)
    return !1;
  if (n instanceof X)
    return !1;
  const e = n instanceof U || n instanceof D;
  let t = !0;
  return n.eachChild((r) => {
    e ? t = t && Te(r) : t = t && r instanceof ne;
  }), t ? xt(n) && Et(n, ["zoom", "heatmap-density", "line-progress", "accumulated", "is-supported-script"]) : !1;
}
function xt(n) {
  if (n instanceof _) {
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
  if (n instanceof G || n instanceof X)
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !xt(t) && (e = !1);
  }), e;
}
function It(n) {
  if (n instanceof _ && n.name === "feature-state")
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !It(t) && (e = !1);
  }), e;
}
function Et(n, e) {
  if (n instanceof _ && e.indexOf(n.name) >= 0)
    return !1;
  let t = !0;
  return n.eachChild((r) => {
    t && !Et(r, e) && (t = !1);
  }), t;
}
function it(n) {
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
function Mt(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function gn(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Vr(n) {
  return n;
}
function yn(n, e) {
  const t = e.type === "color", r = n.stops && typeof n.stops[0][0] == "object", i = r || n.property !== void 0, o = r || !i, s = n.type || (dn(e) ? "exponential" : "interval");
  if (t || e.type === "padding") {
    const c = t ? k.parse : S.parse;
    n = Gt({}, n), n.stops && (n.stops = n.stops.map((h) => [h[0], c(h[1])])), n.default ? n.default = c(n.default) : n.default = c(e.default);
  }
  if (n.colorSpace && !Vn(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  let a, l, u;
  if (s === "exponential")
    a = Kt;
  else if (s === "interval")
    a = Kr;
  else if (s === "categorical") {
    a = Wr, l = /* @__PURE__ */ Object.create(null);
    for (const c of n.stops)
      l[c[0]] = c[1];
    u = typeof n.stops[0][0];
  } else if (s === "identity")
    a = Gr;
  else
    throw new Error(`Unknown function type "${s}"`);
  if (r) {
    const c = {}, h = [];
    for (let g = 0; g < n.stops.length; g++) {
      const C = n.stops[g], I = C[0].zoom;
      c[I] === void 0 && (c[I] = {
        zoom: I,
        type: n.type,
        property: n.property,
        default: n.default,
        stops: []
      }, h.push(I)), c[I].stops.push([C[0].value, C[1]]);
    }
    const f = [];
    for (const g of h)
      f.push([c[g].zoom, yn(c[g], e)]);
    const d = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: d,
      interpolationFactor: $.interpolationFactor.bind(void 0, d),
      zoomStops: f.map((g) => g[0]),
      evaluate({ zoom: g }, C) {
        return Kt({
          stops: f,
          base: n.base
        }, e, g).evaluate(g, C);
      }
    };
  } else if (o) {
    const c = s === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: c,
      interpolationFactor: $.interpolationFactor.bind(void 0, c),
      zoomStops: n.stops.map((h) => h[0]),
      evaluate: ({ zoom: h }) => a(n, e, h, l, u)
    };
  } else
    return {
      kind: "source",
      evaluate(c, h) {
        const f = h && h.properties ? h.properties[n.property] : void 0;
        return f === void 0 ? ge(n.default, e.default) : a(n, e, f, l, u);
      }
    };
}
function ge(n, e, t) {
  if (n !== void 0)
    return n;
  if (e !== void 0)
    return e;
  if (t !== void 0)
    return t;
}
function Wr(n, e, t, r, i) {
  const o = typeof t === i ? r[t] : void 0;
  return ge(o, n.default, e.default);
}
function Kr(n, e, t) {
  if (Mt(t) !== "number")
    return ge(n.default, e.default);
  const r = n.stops.length;
  if (r === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const i = ze(n.stops.map((o) => o[0]), t);
  return n.stops[i][1];
}
function Kt(n, e, t) {
  const r = n.base !== void 0 ? n.base : 1;
  if (Mt(t) !== "number")
    return ge(n.default, e.default);
  const i = n.stops.length;
  if (i === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const o = ze(n.stops.map((c) => c[0]), t), s = Xr(t, r, n.stops[o][0], n.stops[o + 1][0]), a = n.stops[o][1], l = n.stops[o + 1][1], u = er[e.type] || Vr;
  return typeof a.evaluate == "function" ? {
    evaluate(...c) {
      const h = a.evaluate.apply(void 0, c), f = l.evaluate.apply(void 0, c);
      if (!(h === void 0 || f === void 0))
        return u(h, f, s, n.colorSpace);
    }
  } : u(a, l, s, n.colorSpace);
}
function Gr(n, e, t) {
  switch (e.type) {
    case "color":
      t = k.parse(t);
      break;
    case "formatted":
      t = z.fromString(t.toString());
      break;
    case "resolvedImage":
      t = O.fromString(t.toString());
      break;
    case "padding":
      t = S.parse(t);
      break;
    default:
      Mt(t) !== e.type && (e.type !== "enum" || !e.values[t]) && (t = void 0);
  }
  return ge(t, n.default, e.default);
}
function Xr(n, e, t, r) {
  const i = r - t, o = n - t;
  return i === 0 ? 0 : e === 1 ? o / i : (Math.pow(e, o) - 1) / (Math.pow(e, i) - 1);
}
class mn {
  constructor(e, t) {
    this.expression = e, this._warningHistory = {}, this._evaluator = new sn(), this._defaultValue = t ? Qr(t) : null, this._enumValues = t && t.type === "enum" ? t.values : null;
  }
  evaluateWithoutErrorHandling(e, t, r, i, o, s) {
    return this._evaluator.globals = e, this._evaluator.feature = t, this._evaluator.featureState = r, this._evaluator.canonical = i, this._evaluator.availableImages = o || null, this._evaluator.formattedSection = s, this.expression.evaluate(this._evaluator);
  }
  evaluate(e, t, r, i, o, s) {
    this._evaluator.globals = e, this._evaluator.feature = t || null, this._evaluator.featureState = r || null, this._evaluator.canonical = i, this._evaluator.availableImages = o || null, this._evaluator.formattedSection = s || null;
    try {
      const a = this.expression.evaluate(this._evaluator);
      if (a == null || typeof a == "number" && a !== a)
        return this._defaultValue;
      if (this._enumValues && !(a in this._enumValues))
        throw new x(`Expected value to be one of ${Object.keys(this._enumValues).map((l) => JSON.stringify(l)).join(", ")}, but found ${JSON.stringify(a)} instead.`);
      return a;
    } catch (a) {
      return this._warningHistory[a.message] || (this._warningHistory[a.message] = !0, typeof console < "u" && console.warn(a.message)), this._defaultValue;
    }
  }
}
function vn(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in Pt;
}
function bn(n, e) {
  const t = new _e(Pt, Te, [], e ? Yr(e) : void 0), r = t.parse(n, void 0, void 0, void 0, e && e.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? it(new mn(r, e)) : Y(t.errors);
}
class ot {
  constructor(e, t) {
    this.kind = e, this._styleExpression = t, this.isStateDependent = e !== "constant" && !It(t.expression);
  }
  evaluateWithoutErrorHandling(e, t, r, i, o, s) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, o, s);
  }
  evaluate(e, t, r, i, o, s) {
    return this._styleExpression.evaluate(e, t, r, i, o, s);
  }
}
class st {
  constructor(e, t, r, i) {
    this.kind = e, this.zoomStops = r, this._styleExpression = t, this.isStateDependent = e !== "camera" && !It(t.expression), this.interpolationType = i;
  }
  evaluateWithoutErrorHandling(e, t, r, i, o, s) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, o, s);
  }
  evaluate(e, t, r, i, o, s) {
    return this._styleExpression.evaluate(e, t, r, i, o, s);
  }
  interpolationFactor(e, t, r) {
    return this.interpolationType ? $.interpolationFactor(this.interpolationType, e, t, r) : 0;
  }
}
function Zr(n) {
  return n._styleExpression !== void 0;
}
function Cn(n, e) {
  const t = bn(n, e);
  if (t.result === "error")
    return t;
  const r = t.value.expression, i = xt(r);
  if (!i && !Ur(e))
    return Y([new B("", "data expressions not supported")]);
  const o = Et(r, ["zoom"]);
  if (!o && !qr(e))
    return Y([new B("", "zoom expressions not supported")]);
  const s = we(r);
  if (!s && !o)
    return Y([new B("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
  if (s instanceof B)
    return Y([s]);
  if (s instanceof $ && !dn(e))
    return Y([new B("", '"interpolate" expressions cannot be used with this property')]);
  if (!s)
    return it(i ? new ot("constant", t.value) : new ot("source", t.value));
  const a = s instanceof $ ? s.interpolation : void 0;
  return it(i ? new st("camera", t.value, s.labels, a) : new st("composite", t.value, s.labels, a));
}
class Oe {
  constructor(e, t) {
    this._parameters = e, this._specification = t, Gt(this, yn(this._parameters, this._specification));
  }
  static deserialize(e) {
    return new Oe(e._parameters, e._specification);
  }
  static serialize(e) {
    return {
      _parameters: e._parameters,
      _specification: e._specification
    };
  }
}
function Jr(n, e) {
  if (gn(n))
    return new Oe(n, e);
  if (vn(n)) {
    const t = Cn(n, e);
    if (t.result === "error")
      throw new Error(t.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return t.value;
  } else {
    let t = n;
    return e.type === "color" && typeof n == "string" ? t = k.parse(n) : e.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? t = S.parse(n) : e.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? t = A.parse(n) : e.type === "projectionDefinition" && typeof n == "string" && (t = N.parse(n)), {
      kind: "constant",
      evaluate: () => t
    };
  }
}
function we(n) {
  let e = null;
  if (n instanceof Be)
    e = we(n.result);
  else if (n instanceof he) {
    for (const t of n.args)
      if (e = we(t), e)
        break;
  } else (n instanceof Fe || n instanceof $) && n.input instanceof _ && n.input.name === "zoom" && (e = n);
  return e instanceof B || n.eachChild((t) => {
    const r = we(t);
    r instanceof B ? e = r : !e && r ? e = new B("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : e && r && e !== r && (e = new B("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), e;
}
function Yr(n) {
  const e = {
    color: R,
    string: b,
    number: p,
    enum: b,
    boolean: m,
    formatted: Ae,
    padding: $e,
    projectionDefinition: Le,
    resolvedImage: fe,
    variableAnchorOffsetCollection: De
  };
  return n.type === "array" ? L(e[n.value] || v, n.length) : e[n.type];
}
function Qr(n) {
  return n.type === "color" && gn(n.default) ? new k(0, 0, 0, 0) : n.type === "color" ? k.parse(n.default) || null : n.type === "padding" ? S.parse(n.default) || null : n.type === "variableAnchorOffsetCollection" ? A.parse(n.default) || null : n.type === "projectionDefinition" ? N.parse(n.default) || null : n.default === void 0 ? null : n.default;
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
      for (const e of n.slice(1))
        if (!kn(e) && typeof e != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const ei = {
  StyleExpression: mn,
  StylePropertyFunction: Oe,
  ZoomConstantExpression: ot,
  ZoomDependentExpression: st,
  createExpression: bn,
  createPropertyExpression: Cn,
  isExpression: vn,
  isExpressionFilter: kn,
  isZoomExpression: Zr,
  normalizePropertyExpression: Jr
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
function ti(n) {
  n.style.setProperty("--rp-mctl-text", P.color.text), n.style.setProperty("--rp-mctl-background", P.color.background), n.style.setProperty("--rp-mctl-hover", P.color.hover), n.style.setProperty("--rp-mctl-border", P.color.border), n.style.setProperty("--rp-mctl-borderLight", P.color.borderLight), n.style.setProperty("--rp-mctl-radius-sm", P.radius.sm), n.style.setProperty("--rp-mctl-radius-md", P.radius.md), n.style.setProperty("--rp-mctl-radius-lg", P.radius.lg), n.style.setProperty("--rp-mctl-shadow-sm", P.shadow.sm), n.style.setProperty("--rp-mctl-shadow-md", P.shadow.md), n.style.setProperty("--rp-mctl-font-family", P.font.family), n.style.setProperty("--rp-mctl-font-size", P.font.size);
}
function ni(n) {
  wn.add(n), ti(n);
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
function Tt(n, e = {}) {
  Object.assign(n.style, ii), n.classList.add("maplibregl-ctrl", "maplibregl-ctrl-group"), e.classNames && e.classNames.forEach((t) => n.classList.add(t));
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
}, ae = {
  iconWidth: 20,
  btnPaddingX: 6,
  btnGap: 4,
  smallScreenThreshold: 768,
  minFontSize: 10,
  maxFontSize: 16,
  scalingFactor: 0.5
}, te = /* @__PURE__ */ new Map();
function Pn(n, e) {
  te.has(n) || te.set(n, /* @__PURE__ */ new Map());
  const t = te.get(n);
  e.forEach((r, i) => {
    t == null || t.set(i, r);
  });
}
function xn(n, e) {
  const t = te.get(n);
  t && (Object.entries(e).forEach(([r]) => {
    t.delete(r);
  }), t.size === 0 && te.delete(n));
}
function In(n) {
  const e = document.createElement("button");
  if (Object.assign(e.style, oi), n.backgroundColor && (e.style.backgroundColor = n.backgroundColor), n.className && (e.className = n.className), n.title && (e.title = n.title), n.onClick && (e.onclick = n.onClick), n.icon)
    if (typeof n.icon == "string") {
      const r = document.createElement("div");
      r.innerHTML = n.icon, e.appendChild(r);
    } else
      e.appendChild(n.icon);
  const t = document.createElement("span");
  return t.textContent = n.label, t.style.fontSize = P.font.size, t.style.color = "inherit", e.appendChild(t), e;
}
function si(n, e, t = 20) {
  const r = document.createElement("img");
  return r.src = `data:image/svg+xml,${encodeURIComponent(n)}`, r.alt = e, r.style.width = `${t}px`, r.style.height = `${t}px`, r.style.color = "white", r;
}
function ai(n) {
  return n.split("_").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
function li(n, e, t = ae.maxFontSize, r = ae.minFontSize) {
  const { iconWidth: i, btnPaddingX: o, btnGap: s, scalingFactor: a } = ae, l = n - i - o * 2 - s, u = e.replace(/<[^>]+>/g, "").length;
  if (u === 0) return r;
  let c = Math.floor(l / (u * a));
  return c = Math.min(t, Math.max(r, c)), c;
}
function En(n, e) {
  const t = te.get(n);
  if (!t || t.size === 0) return;
  const r = Array.from(t.values()), { smallScreenThreshold: i } = ae, o = e < i;
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
      ae.minFontSize,
      Math.min(...l.map(([, c]) => c))
    );
    l.forEach(([c]) => {
      c.style.fontSize = `${u}px`;
    });
  }
}
function ui(n, e, t) {
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
  r >= 480 && (o = 15, s = 15, u = Math.max(15, a), c = Math.max(15, l)), i >= 992 && (o = 40, s = 40), r >= 992 && (u = Math.max(40, a), c = Math.max(40, l)), e != null && e.endsWith("left") ? (u = u, c = l) : (u = a, c = c);
  const h = t == null ? void 0 : t.margin, f = t == null ? void 0 : t.marginTop, d = t == null ? void 0 : t.marginBottom, g = t == null ? void 0 : t.marginLeft, C = t == null ? void 0 : t.marginRight;
  return {
    marginTop: h || f ? null : o,
    marginBottom: h || d ? null : s,
    marginLeft: h || g ? null : u,
    marginRight: h || C ? null : c
  };
}
function Ue(n, e, t, r) {
  const { marginTop: i, marginBottom: o, marginLeft: s, marginRight: a } = ui(e, t, r);
  i !== null && (n.style.marginTop = `${i}px`), o !== null && (n.style.marginBottom = `${o}px`), s !== null && (n.style.marginLeft = `${s}px`), a !== null && (n.style.marginRight = `${a}px`);
}
class pi {
  constructor(e, t) {
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
    y(this, "resetConfirmPopover", null);
    y(this, "resetConfirmOutsidePointerDownHandler", null);
    y(this, "resetConfirmEscapeKeyHandler", null);
    y(this, "pendingResetAction", null);
    y(this, "resetButton", null);
    y(this, "paletteSelect", null);
    y(this, "paletteTrigger", null);
    y(this, "paletteMenu", null);
    y(this, "paletteOutsidePointerDownHandler", null);
    y(this, "paletteEscapeKeyHandler", null);
    y(this, "customColors", {});
    y(this, "confirmResetMessage", "Restore default colors?");
    y(this, "propertySpec");
    y(this, "closePaletteMenu", () => {
      this.paletteMenu && (this.paletteMenu.style.display = "none"), this.paletteTrigger && this.paletteTrigger.setAttribute("aria-expanded", "false"), this.paletteOutsidePointerDownHandler && (document.removeEventListener("pointerdown", this.paletteOutsidePointerDownHandler, !0), this.paletteOutsidePointerDownHandler = null), this.paletteEscapeKeyHandler && (document.removeEventListener("keydown", this.paletteEscapeKeyHandler, !0), this.paletteEscapeKeyHandler = null);
    });
    // Handler for container click events
    y(this, "handleContainerClick", (e) => {
      const t = e.target;
      if (t.matches(".map_colorbar_color_box")) {
        e.stopPropagation();
        const r = t.dataset.speed;
        r && this.showColorPicker(parseFloat(r), t);
        return;
      }
      this.options.onClick && this.options.onClick(e, this, this.options);
    });
    y(this, "closeResetConfirm", () => {
      this.pendingResetAction = null, this.resetConfirmPopover && (this.resetConfirmPopover.style.display = "none"), this.resetConfirmOutsidePointerDownHandler && (document.removeEventListener("pointerdown", this.resetConfirmOutsidePointerDownHandler, !0), this.resetConfirmOutsidePointerDownHandler = null), this.resetConfirmEscapeKeyHandler && (document.removeEventListener("keydown", this.resetConfirmEscapeKeyHandler, !0), this.resetConfirmEscapeKeyHandler = null);
    });
    y(this, "closeColorPicker", () => {
      if (this.closeResetConfirm(), !this.colorPickerInput) return;
      const e = this.colorPickerInput;
      e.removeAttribute("data-picker-open"), e.removeAttribute("data-speed"), this.nativeColorPickerInput && (this.nativeColorPickerInput.removeAttribute("data-speed"), this.nativeColorPickerInput.style.zIndex = "-1"), this.nativeColorPickerOpen = !1, this.colorPickerPopover && (this.colorPickerPopover.style.display = "none"), this.colorPickerOutsidePointerDownHandler && (document.removeEventListener("pointerdown", this.colorPickerOutsidePointerDownHandler, !0), this.colorPickerOutsidePointerDownHandler = null), this.colorPickerEscapeKeyHandler && (document.removeEventListener("keydown", this.colorPickerEscapeKeyHandler, !0), this.colorPickerEscapeKeyHandler = null);
    });
    // Handle color input changes
    y(this, "handleColorInputChange", (e) => {
      const t = e.target, r = t.dataset.speed;
      if (!r) return;
      const i = parseFloat(r), o = t.value;
      this.customColors[r] = o, this.colorPickerInput && (this.colorPickerInput.value = o), this.updateSingleColorUI(i, o), this.updateResetButtonVisibility(), this.options.onColorChange && this.options.onColorChange(i, o, this);
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
      ...t
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
  createContainer() {
    var i;
    const e = document.createElement("div");
    Tt(e, {
      classNames: ["maplibregl-ctrl"]
    }), e.style.height = "100%", e.style.display = "flex", e.style.flexDirection = "column", e.style.alignItems = "center", e.style.backgroundColor = "transparent", e.style.pointerEvents = "none", e.style.margin = "0";
    const t = (i = this.options.position) != null && i.endsWith("left") ? "map-colorbar-left-group" : "map-colorbar-right-group", r = document.createElement("div");
    return r.classList.add(t), r.classList.add("rp-colorBar"), r.style.width = this.getWidth(), r.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`, r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.display = "flex", r.style.flexDirection = "column", r.style.borderRadius = "10px", r.style.pointerEvents = "auto", e.appendChild(r), { outContainer: e, innerContainer: r };
  }
  createTitleDiv(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_title"), t.innerHTML = e, t.style.marginTop = "6px", t.style.marginBottom = "8px", t.style.display = "flex", t.style.justifyContent = "center", t.style.textAlign = "center", t.style.fontSize = "11px", t.style.lineHeight = "14px", t.style.color = "white", t.style.width = this.getWidth(), t;
  }
  createUnitDiv(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_unit"), t.innerHTML = `(${e})`, t.style.marginTop = "8px", t.style.width = this.getWidth(), t.style.display = "flex", t.style.justifyContent = "center", t.style.color = "white", t.style.fontSize = "12px", t.style.textAlign = "center", t;
  }
  createPaletteSelect() {
    if (!this.options.palettes || this.options.palettes.length <= 1)
      return null;
    const e = document.createElement("div");
    e.classList.add("map_colorbar_palette_select"), e.style.cssText = `
      margin: 0 4px 6px 4px;
      width: calc(100% - 8px);
      position: relative;
      box-sizing: border-box;
    `;
    const t = document.createElement("button");
    t.type = "button", t.classList.add("map_colorbar_palette_trigger"), t.style.cssText = `
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 0 7px;
      border-radius: 999px;
      color: rgba(255, 255, 255, 0.92);
      font-size: 10px;
      line-height: 20px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: left;
      backdrop-filter: blur(4px);
    `;
    const r = document.createElement("span");
    r.classList.add("map_colorbar_palette_trigger_label"), r.style.cssText = `
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
    const i = document.createElement("span");
    i.classList.add("map_colorbar_palette_trigger_caret"), i.setAttribute("aria-hidden", "true"), i.style.cssText = `
      width: 6px;
      height: 6px;
      border-top: 1px solid rgba(255, 255, 255, 0.68);
      border-right: 1px solid rgba(255, 255, 255, 0.68);
      transform: rotate(45deg) translateY(-1px);
      flex-shrink: 0;
      opacity: 0.8;
    `;
    const o = document.createElement("div");
    return o.classList.add("map_colorbar_palette_menu"), o.style.cssText = `
      position: absolute;
      top: auto;
      left: 100%;
      bottom:0;
      right: 0;
      display: none;
      width:74px;
      flex-direction: column;
      gap: 2px;
      padding: 4px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      background: rgba(0, 36, 71, 0.94);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
      z-index: 3;
      backdrop-filter: blur(8px);
    `, this.options.palettes.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.classList.add("map_colorbar_palette_option"), a.dataset.paletteId = s.id, a.textContent = s.label, a.style.cssText = `
        width: 100%;
        padding: 0 7px;
        border: 0;
        border-radius: 7px;
        height:22px;
        background: transparent;
        color: rgba(255, 255, 255, 0.88);
        font-size: 10px;
        line-height: 22px;
        text-align: left;
        cursor: pointer;
      `, a.addEventListener("mouseenter", () => {
        a.style.background = "rgba(255, 255, 255, 0.08)";
      }), a.addEventListener("mouseleave", () => {
        const l = a.dataset.active === "true";
        a.style.background = l ? "rgba(255, 255, 255, 0.12)" : "transparent";
      }), a.addEventListener("click", (l) => {
        l.stopPropagation(), this.setPaletteSelection(s.id), this.closePaletteMenu(), this.options.onPaletteChange && this.options.onPaletteChange(s.id, this);
      }), o.appendChild(a);
    }), t.appendChild(r), t.appendChild(i), t.addEventListener("click", (s) => {
      s.stopPropagation(), this.togglePaletteMenu();
    }), e.appendChild(t), e.appendChild(o), this.paletteTrigger = t, this.paletteMenu = o, this.setPaletteSelection(this.options.activePaletteId || this.options.palettes[0].id), e;
  }
  createColorBox(e, t) {
    const r = document.createElement("div");
    return r.classList.add("map_colorbar_color_box"), r.style.width = "12px", r.style.backgroundColor = e, r.dataset.speed = t.toString(), r;
  }
  setPaletteSelection(e) {
    if (!this.options.palettes || this.options.palettes.length === 0)
      return;
    const t = this.options.palettes.find((r) => r.id === e) || this.options.palettes[0];
    if (this.paletteSelect && (this.paletteSelect.dataset.value = t.id), this.paletteTrigger) {
      const r = this.paletteTrigger.querySelector(".map_colorbar_palette_trigger_label");
      r && (r.textContent = t.label);
    }
    this.paletteMenu && Array.from(this.paletteMenu.querySelectorAll(".map_colorbar_palette_option")).forEach((r) => {
      const i = r, o = i.dataset.paletteId === t.id;
      i.dataset.active = o ? "true" : "false", i.style.background = o ? "rgba(255, 255, 255, 0.12)" : "transparent", i.style.color = o ? "white" : "rgba(255, 255, 255, 0.88)";
    });
  }
  openPaletteMenu() {
    !this.paletteSelect || !this.paletteMenu || (this.closePaletteMenu(), this.paletteMenu.style.display = "flex", this.paletteTrigger && this.paletteTrigger.setAttribute("aria-expanded", "true"), this.paletteOutsidePointerDownHandler = (e) => {
      var t;
      e.target instanceof Node && !((t = this.paletteSelect) != null && t.contains(e.target)) && this.closePaletteMenu();
    }, this.paletteEscapeKeyHandler = (e) => {
      e.key === "Escape" && this.closePaletteMenu();
    }, document.addEventListener("pointerdown", this.paletteOutsidePointerDownHandler, !0), document.addEventListener("keydown", this.paletteEscapeKeyHandler, !0));
  }
  togglePaletteMenu() {
    var e;
    if (((e = this.paletteMenu) == null ? void 0 : e.style.display) === "flex") {
      this.closePaletteMenu();
      return;
    }
    this.openPaletteMenu();
  }
  createLabel(e) {
    const t = document.createElement("div");
    return t.classList.add("map_colorbar_label"), t.style.marginTop = "0px", t.style.marginLeft = "0px", t.style.marginRight = "2px", t.style.color = "white", t.style.fontSize = "9px", t.textContent = "", t;
  }
  initializeLegendItems() {
    this.getDisplaySteps().forEach(({ speed: e, color: t }) => {
      const r = document.createElement("div");
      r.classList.add("map_colorbar_item"), r.style.display = "flex", r.style.alignItems = "center", r.style.marginBottom = "0px", r.style.marginTop = "0px", r.style.marginLeft = "10px";
      const i = this.createColorBox(t, e), o = this.createLabel({ speed: e, color: t });
      r.appendChild(i), r.appendChild(o), this.legendItems.push(r), this.container.insertBefore(r, this.unitDiv);
    });
  }
  resetLegendItems() {
    this.legendItems.forEach((e) => e.remove()), this.legendItems = [], this.initializeLegendItems();
  }
  update() {
    this.updateInnerContainerStyle(this.outContainer, this.container);
    const e = this.getDisplaySteps();
    let t = null;
    const r = 9;
    this.legendItems.forEach((i, o) => {
      const s = i.querySelector(".map_colorbar_color_box"), a = i.querySelector(".map_colorbar_label"), l = e[o];
      if (!l) {
        a.textContent = "";
        return;
      }
      i.style.height = `${r}px`, s.style.height = `${r}px`, a.style.marginTop = `${r}px`;
      const u = l.speed, c = o % 2 === 0, h = t === null || Math.abs(t - u) >= this.getTickMinStep();
      if (c && h) {
        a.textContent = `- ${u.toFixed(this.options.decimal)}`, t = u;
        return;
      }
      a.textContent = "";
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
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), this.closeColorPicker(), this.closeResetConfirm(), this.closePaletteMenu(), (e = this.outContainer.parentNode) == null || e.removeChild(this.outContainer), this.colorPickerInput && this.colorPickerInput.parentNode && this.colorPickerInput.parentNode.removeChild(this.colorPickerInput), this.colorPickerPopover && this.colorPickerPopover.parentNode && this.colorPickerPopover.parentNode.removeChild(this.colorPickerPopover), this.nativeColorPickerInput && this.nativeColorPickerInput.parentNode && this.nativeColorPickerInput.parentNode.removeChild(this.nativeColorPickerInput), this.resetConfirmPopover && this.resetConfirmPopover.parentNode && this.resetConfirmPopover.parentNode.removeChild(this.resetConfirmPopover), this.map = void 0;
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
  updateOptions(e) {
    const t = { ...this.options };
    if (this.options = { ...this.options, ...e }, e.max !== void 0 && e.tickMinStep, e.title !== void 0 && (this.titleDiv.innerHTML = e.title), e.unit !== void 0 && (this.unitDiv.innerHTML = `(${e.unit})`), e.activePaletteId !== void 0 && this.paletteSelect && this.setPaletteSelection(e.activePaletteId), (e.width !== void 0 || e.height !== void 0) && (this.container.style.width = this.getWidth(), this.container.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`), e.max !== void 0) {
      if (e.tickMinStep === void 0) {
        const r = t.tickMinStep ?? 0, i = t.max ?? 30;
        this.options.tickMinStep = r * e.max / i;
      }
      this.colorSteps = this.getColorSteps(), this.resetLegendItems();
    }
    e.onClick !== void 0 && this.container.removeEventListener("click", this.handleContainerClick), this.update();
  }
  updatePalette(e, t = {}) {
    this.propertySpec = e, this.customColors = {}, this.options = { ...this.options, ...t }, this.colorSteps = this.getColorSteps(), t.title !== void 0 && (this.titleDiv.innerHTML = t.title), t.unit !== void 0 && (this.unitDiv.innerHTML = `(${t.unit})`), this.paletteSelect && t.activePaletteId && this.setPaletteSelection(t.activePaletteId), this.resetLegendItems(), this.updateResetButtonVisibility(), this.update();
  }
  getOptions() {
    return this.options;
  }
  getMap() {
    return this.map;
  }
  updateInnerContainerStyle(e, t) {
    var o;
    if (!this.map)
      return;
    const r = this.map.getContainer(), i = r.offsetHeight;
    e.style.height = `${i}px`, Ue(
      t,
      r,
      this.options.position || "top-left",
      (o = this.options) == null ? void 0 : o.style
    ), t.style.alignItems = "flex-start", t.style.display = "flex", t.style.height = `calc(min((100% - 50px), ${this.getHeight()}))`;
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
    const i = [], [, , o, ...s] = t, a = ((l = this.options) == null ? void 0 : l.max) || 30;
    i.push({ speed: 0, color: o });
    for (let u = 0; u < s.length; u += 2) {
      const h = s[u] * a, f = s[u + 1];
      i.push({ speed: h, color: f });
    }
    return i.sort((u, c) => u.speed - c.speed);
  }
  createColorPickerInput() {
    const e = document.createElement("input");
    return e.type = "color", e.classList.add("map_colorbar_picker_input"), e.style.cssText = `
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
    `, e.addEventListener("pointerdown", (t) => {
      t.preventDefault(), t.stopPropagation();
    }), e.addEventListener("click", (t) => {
      t.preventDefault(), t.stopPropagation(), this.toggleNativeColorPicker();
    }), e;
  }
  createNativeColorPickerInput() {
    const e = document.createElement("input");
    return e.type = "color", e.classList.add("map_colorbar_picker_native_input"), e.style.cssText = `
      position: fixed;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
    `, document.body.appendChild(e), e;
  }
  createColorPickerPopover() {
    const e = document.createElement("div");
    e.classList.add("map_colorbar_picker_popover"), e.style.cssText = `
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
    `, this.colorPickerInput || (this.colorPickerInput = this.createColorPickerInput()), this.nativeColorPickerInput || (this.nativeColorPickerInput = this.createNativeColorPickerInput()), e.appendChild(this.colorPickerInput);
    const t = document.createElement("div");
    t.classList.add("map_colorbar_picker_actions"), t.style.cssText = `
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
      o.stopPropagation(), this.showResetConfirm(i, () => {
        this.options.onReset && this.options.onReset(this), this.closeColorPicker();
      });
    }), t.appendChild(i), t.appendChild(r), e.appendChild(t), document.body.appendChild(e), e;
  }
  createPickerActionButton(e) {
    const t = document.createElement("button");
    return t.type = "button", t.textContent = e, t.style.cssText = `
      appearance: none;
      color: white;
      font-size: 10px;
      line-height: 14px;
      padding: 4px;
      flex: 1;
      cursor: pointer;
    `, t.addEventListener("mouseenter", () => {
      t.style.background = "rgba(255, 255, 255, 0.08)";
    }), t;
  }
  createResetConfirmPopover() {
    const e = document.createElement("div");
    e.classList.add("map_colorbar_reset_confirm"), e.style.cssText = `
      position: fixed;
      display: none;
      flex-direction: column;
      gap: 8px;
      min-width: 136px;
      padding: 10px;
      border-radius: 10px;
      background: rgba(0, 36, 71, 0.96);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
      z-index: 9999;
      pointer-events: auto;
    `;
    const t = document.createElement("div");
    t.classList.add("map_colorbar_reset_confirm_message"), t.textContent = this.confirmResetMessage, t.style.cssText = `
      color: white;
      font-size: 10px;
      line-height: 14px;
      text-align: center;
    `;
    const r = document.createElement("div");
    r.classList.add("map_colorbar_reset_confirm_actions"), r.style.cssText = `
      display: flex;
      gap: 6px;
    `;
    const i = this.createPickerActionButton("Cancel");
    i.classList.add("map_colorbar_reset_confirm_cancel"), i.addEventListener("click", (s) => {
      s.stopPropagation(), this.closeResetConfirm();
    });
    const o = this.createPickerActionButton("Restore");
    return o.classList.add("map_colorbar_reset_confirm_accept"), o.style.background = "rgba(255, 255, 255, 0.12)", o.addEventListener("click", (s) => {
      s.stopPropagation();
      const a = this.pendingResetAction;
      this.closeResetConfirm(), a == null || a();
    }), r.appendChild(i), r.appendChild(o), e.appendChild(t), e.appendChild(r), document.body.appendChild(e), e;
  }
  getResetConfirmPopover() {
    return this.resetConfirmPopover || (this.resetConfirmPopover = this.createResetConfirmPopover()), this.resetConfirmPopover;
  }
  showResetConfirm(e, t) {
    const r = this.getResetConfirmPopover(), i = e.getBoundingClientRect();
    this.closeResetConfirm(), this.pendingResetAction = t, r.style.display = "flex";
    const o = 8, s = r.offsetWidth, a = r.offsetHeight, l = window.innerWidth, u = window.innerHeight;
    let c = i.right + o;
    c + s > l - o && (c = Math.max(o, i.left - s - o));
    let h = i.top + (i.height - a) / 2;
    h + a > u - o && (h = u - a - o), h < o && (h = o), r.style.left = `${c}px`, r.style.top = `${h}px`, this.resetConfirmOutsidePointerDownHandler = (f) => {
      f.target instanceof Node && !r.contains(f.target) && this.closeResetConfirm();
    }, this.resetConfirmEscapeKeyHandler = (f) => {
      f.key === "Escape" && this.closeResetConfirm();
    }, document.addEventListener("pointerdown", this.resetConfirmOutsidePointerDownHandler, !0), document.addEventListener("keydown", this.resetConfirmEscapeKeyHandler, !0);
  }
  getColorPickerPopover() {
    return this.colorPickerPopover || (this.colorPickerPopover = this.createColorPickerPopover()), this.colorPickerPopover;
  }
  getActivePickerSpeed() {
    if (!this.colorPickerInput)
      return null;
    const e = this.colorPickerInput.dataset.speed;
    if (!e)
      return null;
    const t = parseFloat(e);
    return Number.isFinite(t) ? t : null;
  }
  getDefaultColorForSpeed(e) {
    var t;
    return (t = this.colorSteps.find((r) => r.speed === e)) == null ? void 0 : t.color;
  }
  toggleNativeColorPicker() {
    const e = this.colorPickerInput, t = this.nativeColorPickerInput, r = this.colorPickerPopover;
    if (!e || !t || !r)
      return;
    if (this.nativeColorPickerOpen) {
      const o = t.dataset.speed, s = t.value;
      t.remove(), this.nativeColorPickerInput = this.createNativeColorPickerInput(), o && (this.nativeColorPickerInput.dataset.speed = o), this.nativeColorPickerInput.value = s, this.nativeColorPickerInput.style.left = t.style.left, this.nativeColorPickerInput.style.top = t.style.top, this.nativeColorPickerInput.style.zIndex = "-1", this.nativeColorPickerInput.removeEventListener("input", this.handleColorInputChange), this.nativeColorPickerInput.removeEventListener("change", this.handleColorInputChange), this.nativeColorPickerInput.addEventListener("input", this.handleColorInputChange), this.nativeColorPickerInput.addEventListener("change", this.handleColorInputChange), this.nativeColorPickerOpen = !1, e.focus({ preventScroll: !0 });
      return;
    }
    t.style.left = `${r.offsetLeft + r.offsetWidth + 12}px`, t.style.top = `${r.offsetTop + 8}px`, t.style.zIndex = "9999", t.removeEventListener("input", this.handleColorInputChange), t.removeEventListener("change", this.handleColorInputChange), t.addEventListener("input", this.handleColorInputChange), t.addEventListener("change", this.handleColorInputChange), this.nativeColorPickerOpen = !0;
    const i = t;
    try {
      typeof i.showPicker == "function" ? i.showPicker() : t.click();
    } catch {
      t.click();
    }
  }
  // Show the color picker at the specified position
  showColorPicker(e, t) {
    this.closeColorPicker(), this.closeResetConfirm();
    const r = this.getColorPickerPopover(), i = this.colorPickerInput, o = this.nativeColorPickerInput;
    if (!i || !o)
      return;
    const s = this.colorSteps.find((c) => c.speed === e), a = t.getBoundingClientRect(), l = a.top + a.height / 2 - 28, u = a.right + 8;
    i.value = this.customColors[String(e)] || (s == null ? void 0 : s.color) || "#ffffff", i.dataset.speed = e.toString(), r.style.left = `${u}px`, r.style.top = `${l}px`, r.style.display = "flex", o.value = i.value, o.dataset.speed = e.toString(), o.style.left = `${u + r.offsetWidth + 12}px`, o.style.top = `${l + 8}px`, o.style.zIndex = "-1", this.nativeColorPickerOpen = !1, this.colorPickerOutsidePointerDownHandler = (c) => {
      const h = this.resetConfirmPopover;
      c.target instanceof Node && !r.contains(c.target) && !(h && h.contains(c.target)) && this.closeColorPicker();
    }, this.colorPickerEscapeKeyHandler = (c) => {
      c.key === "Escape" && this.closeColorPicker();
    }, document.addEventListener("pointerdown", this.colorPickerOutsidePointerDownHandler, !0), document.addEventListener("keydown", this.colorPickerEscapeKeyHandler, !0), i.focus({ preventScroll: !0 });
  }
  // Update a single color box UI
  updateSingleColorUI(e, t) {
    const r = this.legendItems.find((i) => {
      const o = i.querySelector(".map_colorbar_color_box");
      return o && parseFloat(o.dataset.speed || "0") === e;
    });
    if (r) {
      const i = r.querySelector(".map_colorbar_color_box");
      i && (i.style.backgroundColor = t);
    }
  }
  resetSingleColor(e) {
    delete this.customColors[String(e)];
    const t = this.getDefaultColorForSpeed(e);
    t && this.updateSingleColorUI(e, t), this.updateResetButtonVisibility();
  }
  // Create the reset button
  createResetButton() {
    const e = document.createElement("div");
    return e.classList.add("map_colorbar_reset"), e.innerHTML = "restore", e.style.cssText = `
      width: 100%;
      display: none;
      justify-content: center;
      color: white;
      font-size: 10px;
      text-align: center;
      cursor: pointer;
      text-decoration: underline;
    `, e.addEventListener("mouseenter", () => {
      e.style.color = "#87ceeb";
    }), e.addEventListener("mouseleave", () => {
      e.style.color = "white";
    }), e.addEventListener("click", (t) => {
      t.stopPropagation(), this.showResetConfirm(e, () => {
        this.options.onReset && this.options.onReset(this);
      });
    }), e;
  }
  // Update reset button visibility
  updateResetButtonVisibility() {
    this.resetButton && (this.resetButton.style.display = "none");
  }
  // Set custom colors directly (e.g., from localStorage restoration)
  setCustomColors(e) {
    this.customColors = { ...e }, this.updateResetButtonVisibility();
  }
  // Reset colors to default
  resetColors(e) {
    this.customColors = {}, this.getDisplaySteps().forEach(({ speed: t, color: r }) => {
      var o;
      const i = ((o = e.find(([s]) => s === t)) == null ? void 0 : o[1]) ?? r;
      this.updateSingleColorUI(t, i);
    }), this.updateResetButtonVisibility(), this.update();
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
    const i = ei.createPropertyExpression(t, r);
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
class fi {
  constructor(e) {
    y(this, "map");
    y(this, "options");
    y(this, "container");
    this.options = {
      position: "top-left",
      width: "146px",
      // Default width
      height: "24px",
      // Default width
      ...e
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
    const e = document.createElement("div");
    return e.className = "maplibregl-ctrl maplibregl-ctrl-msg", this.options.innerClassName && e.classList.add(this.options.innerClassName), e.style.width = this.getWidth(), e.style.height = this.getHeight(), e.style.backgroundColor = "rgba(0, 36, 71, 0.7)", e.style.padding = "5px 10px", e.style.borderRadius = "3px", e.style.fontFamily = "Arial, sans-serif", e.style.fontSize = "14px", this.options.innerHTML ? e.innerHTML = this.options.innerHTML : this.options.msg && (e.textContent = this.options.msg), this.options.style && Object.assign(e.style, this.options.style), e;
  }
  updateInnerContainerStyle() {
    if (!this.map)
      return;
    const e = this.map.getContainer(), t = this.options.position || "top-left";
    Ue(this.container, e, t, this.options.style);
  }
  update() {
    this.updateInnerContainerStyle();
  }
  onAdd(e) {
    return this.map = e, e.getContainer().appendChild(this.container), this.update(), this.map.once("styledata", () => {
      this.refresh();
    }), this.map.on("resize", () => {
      this.update();
    }), this.container;
  }
  onRemove() {
    var e;
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), (e = this.container.parentNode) == null || e.removeChild(this.container), this.map = void 0;
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
  getPosition() {
    return this.options.position || "top-left";
  }
}
class di {
  constructor(e) {
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
    this.options = e, this.instanceId = this.generateInstanceId(), this.container = this.createContainer(), this.defaultActiveId = this.options.defaultActive;
  }
  /**
   * Generate a unique instance ID for this control
   * @returns Unique identifier string
   */
  generateInstanceId() {
    return `togglectl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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
  // Create the container for the control
  createContainer() {
    const e = document.createElement("div");
    return e.id = this.instanceId, Tt(e), this.options.innerClassName && e.classList.add(this.options.innerClassName), this.options.width && (e.style.width = this.options.width), this.options.height && (e.style.height = this.options.height), this.options.style && Object.assign(e.style, this.options.style), this.options.buttons.forEach((t) => {
      const r = this.createButton(t);
      e.appendChild(r), this.buttons.set(t.id, r);
    }), this.updateLayout(), e;
  }
  updateInnerContainerStyle() {
    if (!this.map)
      return;
    const e = this.map.getContainer(), t = this.getPosition();
    Ue(this.container, e, t, this.options.style), this.container.style.alignItems = "flex-start", this.container.style.display = "flex", this.updateLayout();
  }
  // Responsive design handling
  updateLayout() {
    if (!this.map)
      return;
    const t = this.map.getContainer().clientWidth;
    En(this.getPosition(), t);
  }
  // Create a single button with icon and label
  createButton(e) {
    return In({
      icon: si(e.svg, e.label),
      label: e.label,
      // title: config.label,
      onClick: () => this.handleButtonClick(e)
    });
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
      i === this.activeButtonId ? r.style.backgroundColor = P.color.activeBackground : r.style.backgroundColor = P.color.background;
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
    return Pn(this.getPosition(), this.buttons), this.container;
  }
  // Remove control from the map
  onRemove() {
    var e;
    xn(this.getPosition(), this.buttons), this.map && (this.map.off("resize", this.updateInnerContainerStyle), this.map.off("styledata", this.updateInnerContainerStyle)), this.options.buttons.forEach((t) => {
      t.cleanup && t.cleanup(this, this.map);
    }), (e = this.container.parentNode) == null || e.removeChild(this.container), this.map = void 0;
  }
  // Default position of the control
  getPosition() {
    var e;
    return ((e = this.options) == null ? void 0 : e.position) || "top-right";
  }
  /**
   * Get the unique instance ID for this control
   * @returns Unique identifier string
   */
  getInstanceId() {
    return this.instanceId;
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
    const o = r.querySelector("img");
    o && (t.svg && (o.src = `data:image/svg+xml,${encodeURIComponent(t.svg)}`), t.label && (o.alt = t.label));
    const s = r.querySelector("span");
    s && t.label && (s.textContent = t.label), this.updateLayout();
  }
  // Update a all button configs
  updateButtonCallback(e) {
    e.forEach((t) => {
      const r = t.id || "", i = this.buttons.get(r), o = this.options.buttons.find((s) => s.id === r);
      !i || !o || Object.assign(o, t);
    });
  }
  // Update the control's styles dynamically
  updateStyle(e) {
    this.container && Object.assign(this.container.style, e);
  }
}
class gi {
  constructor(e = {}) {
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
    this.position = e.position || "top-right", this.collapsed = e.collapsed || !0, this.featureConfigGroups = e.featureConfigs || {}, this.feature = e.feature || "wave", this.btnLabel = e.btnLabel || "Settings", this.layerConfigs = this.featureConfigGroups[this.feature] || {}, this.onChange = e.onChange || ((t, r, i, o) => {
      console.log("Layer config changed:", t, r, i, o);
    }), e.style && (this.userStyle = e.style);
  }
  /** Called when control is added to the map */
  onAdd(e) {
    var i, o;
    this.map = e, this.container = document.createElement("div"), Tt(this.container, { classNames: ["layer-manager"] }), (i = this.position) != null && i.startsWith("bottom") ? this.container.classList.add("bottom") : (o = this.position) != null && o.startsWith("top") && this.container.classList.add("top"), this.userStyle && Object.assign(this.container.style, this.userStyle), this.panel = document.createElement("div"), this.panel.className = "layer-manager-panel", this.collapsed && (this.panel.style.display = "none");
    const t = this._createHeader(), r = this._createLayersSection();
    return this.container.appendChild(t), this.panel.appendChild(r), this.container.appendChild(this.panel), ni(this.container), Pn(this.getPosition(), this.buttons), this.map.on("resize", () => {
      this._updateContainerPosition();
    }), this.map.on("styledata", () => {
      this._updateContainerPosition();
    }), this.container;
  }
  /** Called when control is removed from the map */
  onRemove() {
    this.map && (this.map.off("resize", this._updateContainerPosition), this.map.off("styledata", this._updateContainerPosition)), xn(this.getPosition(), this.buttons), this.container && ri(this.container), this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.map = null;
  }
  /**
   * Update container positioning based on map dimensions and safe area insets
   */
  _updateContainerPosition() {
    if (!this.map || !this.container)
      return;
    const e = this.map.getContainer(), t = this.getPosition();
    Ue(this.container, e, t, this.userStyle), this._updateButtonLayout();
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
    var r;
    const e = document.createElement("div");
    e.className = "layer-manager-header", (r = this.position) != null && r.includes("left") ? e.classList.add("left") : e.classList.add("right");
    const t = In({
      icon: this._createLayersIcon(20),
      label: this.btnLabel,
      title: `${this.feature} Layers Settings`,
      onClick: () => this._togglePanel(),
      className: "layer-manager-toggle"
    });
    return this.buttons.set("layer-manager-toggle", t), e.appendChild(t), e;
  }
  _togglePanel() {
    this.panel && (this.panel.style.display === "none" ? (this.panel.style.display = "", this.collapsed = !1) : (this.panel.style.display = "none", this.collapsed = !0));
  }
  _createLayersSection() {
    const e = document.createElement("div");
    e.className = "layer-manager-section";
    const t = document.createElement("div");
    t.className = "layer-manager-title", t.innerHTML = `<span style="vertical-align: middle;">${ai(this.feature)} Layers</span>`, e.appendChild(t);
    const r = document.createElement("div");
    return r.className = "layer-manager-list", Object.entries(this.layerConfigs).forEach(([i, o]) => {
      const s = this._createLayerItem(i, o);
      r.appendChild(s);
    }), e.appendChild(r), e;
  }
  /** Create toggle (checkbox) item */
  _createToggleItem(e, t) {
    const r = document.createElement("input");
    r.type = "checkbox", r.className = "layer-manager-checkbox", r.checked = !!t.value, r.onchange = (o) => {
      const s = { ...t };
      t.value = o.target.checked, this.onChange(this.feature, e, s, t);
    };
    const i = document.createElement("label");
    return i.className = "layer-manager-label", i.textContent = t.label || "Unnamed Layer", i.onclick = () => r.click(), [r, i];
  }
  /** Create select (dropdown or single choice) item */
  _createSelectUI(e, t) {
    const r = (t == null ? void 0 : t.mode) ?? "buttons";
    let i;
    if (r === "dropdown") {
      const a = document.createElement("select");
      a.className = "layer-manager-select", t.options.forEach((l, u) => {
        var h;
        const c = document.createElement("option");
        c.value = String(l), c.textContent = ((h = t.labels) == null ? void 0 : h[u]) ?? String(l), l === t.value && (c.selected = !0), a.appendChild(c);
      }), a.onchange = (l) => {
        const u = { ...t };
        t.value = l.target.value, this.onChange(this.feature, e, u, t);
      }, i = a;
    } else {
      const a = document.createElement("div");
      a.className = "layer-manager-radio-group", t.options.forEach((l, u) => {
        var d;
        const c = document.createElement("label");
        c.className = "layer-manager-radio-label";
        const h = document.createElement("input");
        h.type = "radio", h.name = e, h.value = String(l), h.checked = l === t.value, h.onchange = (g) => {
          const C = { ...t };
          t.value = g.target.value, this.onChange(this.feature, e, C, t);
        };
        const f = document.createElement("span");
        f.textContent = ((d = t.labels) == null ? void 0 : d[u]) ?? String(l), c.append(h, f), a.appendChild(c);
      }), i = a;
    }
    const o = document.createElement("fieldset");
    o.className = "layer-manager-fieldset";
    const s = document.createElement("legend");
    return s.className = "layer-manager-legend", s.textContent = t.label || e, o.append(s, i), [o];
  }
  /** Create a single layer config item */
  _createLayerItem(e, t) {
    const r = document.createElement("div");
    if (r.className = "layer-manager-item", t.type === "toggle")
      r.append(...this._createToggleItem(e, t));
    else if (t.type === "select")
      r.append(...this._createSelectUI(e, t));
    else {
      const i = document.createElement("div");
      i.textContent = `Unsupported type: ${t.type}`, r.append(i);
    }
    return r;
  }
  _updateButtonLayout() {
    if (!this.map || !this.container) return;
    const e = this.map.getContainer(), t = e ? e.clientWidth : -1;
    En(this.getPosition(), t);
  }
  /**
   * Refresh the UI to reflect current feature and layer configurations
   */
  _refreshUI() {
    if (!this.container || !this.panel) return;
    const e = this.buttons.get("layer-manager-toggle");
    e && (e.title = `${this.feature} Layers Settings`);
    const t = this.panel.querySelector(".layer-manager-section");
    t && t.remove();
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
  updateFeature(e, t) {
    this.feature = e, t && (this.featureConfigGroups = t), this.layerConfigs = this.featureConfigGroups[this.feature] || {}, this._refreshUI();
  }
}
export {
  pi as ColorBar,
  gi as ConfigManager,
  fi as MsgCtl,
  hi as TemporalControl,
  di as ToggleCtl
};
//# sourceMappingURL=index.js.map
