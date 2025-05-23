var wn = Object.defineProperty;
var kn = (n, t, e) => t in n ? wn(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var v = (n, t, e) => kn(n, typeof t != "symbol" ? t + "" : t, e);
const Cn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>', xn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>', Mn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>', In = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-backward</title><path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" /></svg>', En = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-forward</title><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" /></svg>', dt = "rgb(204, 204, 204)", rt = (n) => {
  const t = document.createElement("img");
  return t.src = `data:image/svg+xml,${encodeURIComponent(n)}`, t.style.width = "24px", t.style.height = "24px", t;
};
let yt;
const Tn = ({
  length: n,
  interval: t,
  onSliderValueChange: e
}) => {
  const r = document.createElement("div");
  r.classList.add("maplibregl-ctrl"), r.classList.add("maplibregl-ctrl-group"), r.style.width = "calc(min((500% - 29px), 260px))", r.style.height = "84px", r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.textAlign = "center";
  const i = document.createElement("div");
  i.innerHTML = "<br />", i.style.marginTop = "4px", r.appendChild(i);
  const s = document.createElement("input");
  s.type = "range", s.value = "0", s.min = "0", s.max = String(n - 1), s.addEventListener("input", () => {
    e();
  }), s.style.width = "80%", s.style.margin = "4px 0", r.appendChild(s);
  const o = document.createElement("div");
  o.style.display = "flex", o.style.justifyContent = "center", o.style.margin = "4px 0 0 0";
  const a = (R) => {
    u.style.backgroundColor = R ? dt : "";
  }, l = () => u.style.backgroundColor === dt, u = document.createElement("button");
  u.appendChild(rt(Mn)), u.style.border = "0", u.style.borderRadius = "0", u.style.marginRight = "16px", u.style.height = "24px", u.style.borderRadius = "4px", u.onclick = () => a(!l()), o.appendChild(u);
  const c = () => (s.value = String(Math.max(0, Number(s.value) - 1)), e(), Number(s.min) < Number(s.value)), f = () => {
    if (u.style.backgroundColor !== "" && Number(s.value) == Number(s.max))
      for (; c(); )
        ;
    else
      s.value = String(
        Math.min(Number(s.max), Number(s.value) + 1)
      );
    return e(), Number(s.value) < Number(s.max);
  }, p = document.createElement("button");
  p.appendChild(rt(In)), p.onclick = c, p.style.border = "0", p.style.height = "24px", p.style.borderRadius = "4px";
  const d = () => {
    yt !== void 0 && (clearInterval(yt), yt = void 0, y.onclick = null, E.style.backgroundColor = "");
  }, y = document.createElement("button");
  y.appendChild(rt(Cn)), y.style.border = "0", y.style.height = "24px", y.style.borderRadius = "4px", y.onclick = d;
  const k = () => E.style.backgroundColor === dt, M = () => {
    k() || (E.style.backgroundColor = dt, yt = setInterval(() => {
      f();
    }, t));
  }, E = document.createElement("button");
  E.appendChild(rt(xn)), E.style.border = "0", E.style.height = "24px", E.style.borderRadius = "4px", E.onclick = M;
  const T = document.createElement("button");
  return T.appendChild(rt(En)), T.style.border = "0", T.style.height = "24px", T.style.borderRadius = "4px", T.onclick = f, o.appendChild(p), o.appendChild(y), o.appendChild(E), o.appendChild(T), r.appendChild(o), {
    container: r,
    titleDiv: i,
    slider: s,
    increment: f,
    decrement: c,
    isPlaying: k,
    play: M,
    pause: d,
    isLoopEnabled: l,
    setLoopEnabled: a
  };
};
class Yr {
  constructor(t, e = {}) {
    v(this, "map");
    v(this, "options");
    v(this, "container");
    v(this, "containerTitle");
    v(this, "temporalSlider");
    v(this, "temporalFrames");
    v(this, "next");
    v(this, "prev");
    v(this, "play");
    v(this, "pause");
    v(this, "isPlaying");
    v(this, "isLoopEnabled");
    v(this, "setLoopEnabled");
    v(this, "goto");
    this.temporalFrames = t, this.options = e;
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
      isLoopEnabled: p,
      setLoopEnabled: d
    } = Tn(r);
    this.container = i, this.containerTitle = s, this.temporalSlider = o, this.next = a, this.prev = l, this.play = u, this.pause = c, this.isPlaying = f, this.isLoopEnabled = p, this.setLoopEnabled = d, this.goto = (y) => {
      o.value = String(
        Math.min(this.temporalFrames.length - 1, Math.max(0, y))
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
  getDefaultPosition() {
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
    var r, i, s, o;
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
      e ? a = ((i = t.paint) == null ? void 0 : i[`${t.type}-opacity`]) || 1 : a = this.options.performance ? 1e-21 : 0, (s = this.map) == null || s.setPaintProperty(t.id, `${t.type}-opacity`, a);
    } else
      (o = this.map) == null || o.setLayoutProperty(
        t.id,
        "visibility",
        e ? "visible" : "none"
      );
  }
}
function _e(n, ...t) {
  for (const e of t)
    for (const r in e)
      n[r] = e[r];
  return n;
}
class F extends Error {
  constructor(t, e) {
    super(e), this.message = e, this.key = t;
  }
}
class ie {
  constructor(t, e = []) {
    this.parent = t, this.bindings = {};
    for (const [r, i] of e)
      this.bindings[r] = i;
  }
  concat(t) {
    return new ie(this, t);
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
const Et = { kind: "null" }, h = { kind: "number" }, b = { kind: "string" }, g = { kind: "boolean" }, j = { kind: "color" }, Tt = { kind: "projectionDefinition" }, Q = { kind: "object" }, m = { kind: "value" }, $n = { kind: "error" }, $t = { kind: "collator" }, St = { kind: "formatted" }, At = { kind: "padding" }, ct = { kind: "resolvedImage" }, Dt = { kind: "variableAnchorOffsetCollection" };
function S(n, t) {
  return {
    kind: "array",
    itemType: n,
    N: t
  };
}
function C(n) {
  if (n.kind === "array") {
    const t = C(n.itemType);
    return typeof n.N == "number" ? `array<${t}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${t}>`;
  } else
    return n.kind;
}
const Sn = [
  Et,
  h,
  b,
  g,
  j,
  Tt,
  St,
  Q,
  S(m),
  At,
  ct,
  Dt
];
function st(n, t) {
  if (t.kind === "error")
    return null;
  if (n.kind === "array") {
    if (t.kind === "array" && (t.N === 0 && t.itemType.kind === "value" || !st(n.itemType, t.itemType)) && (typeof n.N != "number" || n.N === t.N))
      return null;
  } else {
    if (n.kind === t.kind)
      return null;
    if (n.kind === "value") {
      for (const e of Sn)
        if (!st(e, t))
          return null;
    }
  }
  return `Expected ${C(n)} but found ${C(t)} instead.`;
}
function se(n, t) {
  return t.some((e) => e.kind === n.kind);
}
function _(n, t) {
  return t.some((e) => e === "null" ? n === null : e === "array" ? Array.isArray(n) : e === "object" ? n && !Array.isArray(n) && typeof n == "object" : e === typeof n);
}
function G(n, t) {
  return n.kind === "array" && t.kind === "array" ? n.itemType.kind === t.itemType.kind && typeof n.N == "number" : n.kind === t.kind;
}
const Xe = 0.96422, Ze = 1, Ge = 0.82521, Je = 4 / 29, K = 6 / 29, Ye = 3 * K * K, An = K * K * K, Dn = Math.PI / 180, Pn = 180 / Math.PI;
function Qe(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function Ke([n, t, e, r]) {
  n = Ot(n), t = Ot(t), e = Ot(e);
  let i, s;
  const o = Ht((0.2225045 * n + 0.7168786 * t + 0.0606169 * e) / Ze);
  n === t && t === e ? i = s = o : (i = Ht((0.4360747 * n + 0.3850649 * t + 0.1430804 * e) / Xe), s = Ht((0.0139322 * n + 0.0971045 * t + 0.7141733 * e) / Ge));
  const a = 116 * o - 16;
  return [a < 0 ? 0 : a, 500 * (i - o), 200 * (o - s), r];
}
function Ot(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function Ht(n) {
  return n > An ? Math.pow(n, 1 / 3) : n / Ye + Je;
}
function tn([n, t, e, r]) {
  let i = (n + 16) / 116, s = isNaN(t) ? i : i + t / 500, o = isNaN(e) ? i : i - e / 200;
  return i = Ze * Vt(i), s = Xe * Vt(s), o = Ge * Vt(o), [
    qt(3.1338561 * s - 1.6168667 * i - 0.4906146 * o),
    // D50 -> sRGB
    qt(-0.9787684 * s + 1.9161415 * i + 0.033454 * o),
    qt(0.0719453 * s - 0.2289914 * i + 1.4052427 * o),
    r
  ];
}
function qt(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function Vt(n) {
  return n > K ? n * n * n : Ye * (n - Je);
}
function Nn(n) {
  const [t, e, r, i] = Ke(n), s = Math.sqrt(e * e + r * r);
  return [Math.round(s * 1e4) ? Qe(Math.atan2(r, e) * Pn) : NaN, s, t, i];
}
function Ln([n, t, e, r]) {
  return n = isNaN(n) ? 0 : n * Dn, tn([e, Math.cos(n) * t, Math.sin(n) * t, r]);
}
function Fn([n, t, e, r]) {
  n = Qe(n), t /= 100, e /= 100;
  function i(s) {
    const o = (s + n / 30) % 12, a = t * Math.min(e, 1 - e);
    return e - a * Math.max(-1, Math.min(o - 3, 9 - o, 1));
  }
  return [i(0), i(8), i(4), r];
}
function jn(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const t = zn[n];
  if (t) {
    const [i, s, o] = t;
    return [i / 255, s / 255, o / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const s = n.length < 6 ? 1 : 2;
    let o = 1;
    return [
      gt(n.slice(o, o += s)),
      gt(n.slice(o, o += s)),
      gt(n.slice(o, o += s)),
      gt(n.slice(o, o + s) || "ff")
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
        p,
        // ,         (optional)
        d,
        // <numeric>
        y,
        // %         (optional)
        k,
        // ,|/       (optional)
        M,
        // <numeric> (optional)
        E
        // %         (optional)
      ] = s, T = [u || " ", p || " ", k].join("");
      if (T === "  " || T === "  /" || T === ",," || T === ",,,") {
        const R = [l, f, y].join(""), pt = R === "%%%" ? 100 : R === "" ? 255 : 0;
        if (pt) {
          const Ie = [
            J(+a / pt, 0, 1),
            J(+c / pt, 0, 1),
            J(+d / pt, 0, 1),
            M ? Ee(+M, E) : 1
          ];
          if (Te(Ie))
            return Ie;
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
      p
      // %         (optional)
    ] = r, d = [o || " ", l || " ", c].join("");
    if (d === "  " || d === "  /" || d === ",," || d === ",,,") {
      const y = [
        +s,
        J(+a, 0, 100),
        J(+u, 0, 100),
        f ? Ee(+f, p) : 1
      ];
      if (Te(y))
        return Fn(y);
    }
  }
}
function gt(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function Ee(n, t) {
  return J(t ? n / 100 : n, 0, 1);
}
function J(n, t, e) {
  return Math.min(Math.max(t, n), e);
}
function Te(n) {
  return !n.some(Number.isNaN);
}
const zn = {
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
function V(n, t, e) {
  return n + e * (t - n);
}
function ot(n, t, e) {
  return n.map((r, i) => V(r, t[i], e));
}
function Bn(n) {
  return n === "rgb" || n === "hcl" || n === "lab";
}
class w {
  /**
   * @param r Red component premultiplied by `alpha` 0..1
   * @param g Green component premultiplied by `alpha` 0..1
   * @param b Blue component premultiplied by `alpha` 0..1
   * @param [alpha=1] Alpha component 0..1
   * @param [premultiplied=true] Whether the `r`, `g` and `b` values have already
   * been multiplied by alpha. If `true` nothing happens if `false` then they will
   * be multiplied automatically.
   */
  constructor(t, e, r, i = 1, s = !0) {
    this.r = t, this.g = e, this.b = r, this.a = i, s || (this.r *= i, this.g *= i, this.b *= i, i || this.overwriteGetter("rgb", [t, e, r, i]));
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
    if (t instanceof w)
      return t;
    if (typeof t != "string")
      return;
    const e = jn(t);
    if (e)
      return new w(...e, !1);
  }
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb() {
    const { r: t, g: e, b: r, a: i } = this, s = i || 1 / 0;
    return this.overwriteGetter("rgb", [t / s, e / s, r / s, i]);
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl() {
    return this.overwriteGetter("hcl", Nn(this.rgb));
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab() {
    return this.overwriteGetter("lab", Ke(this.rgb));
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
    return `rgba(${[t, e, r].map((s) => Math.round(s * 255)).join(",")},${i})`;
  }
  static interpolate(t, e, r, i = "rgb") {
    switch (i) {
      case "rgb": {
        const [s, o, a, l] = ot(t.rgb, e.rgb, r);
        return new w(s, o, a, l, !1);
      }
      case "hcl": {
        const [s, o, a, l] = t.hcl, [u, c, f, p] = e.hcl;
        let d, y;
        if (!isNaN(s) && !isNaN(u)) {
          let R = u - s;
          u > s && R > 180 ? R -= 360 : u < s && s - u > 180 && (R += 360), d = s + r * R;
        } else isNaN(s) ? isNaN(u) ? d = NaN : (d = u, (a === 1 || a === 0) && (y = c)) : (d = s, (f === 1 || f === 0) && (y = o));
        const [k, M, E, T] = Ln([
          d,
          y ?? V(o, c, r),
          V(a, f, r),
          V(l, p, r)
        ]);
        return new w(k, M, E, T, !1);
      }
      case "lab": {
        const [s, o, a, l] = tn(ot(t.lab, e.lab, r));
        return new w(s, o, a, l, !1);
      }
    }
  }
}
w.black = new w(0, 0, 0, 1);
w.white = new w(1, 1, 1, 1);
w.transparent = new w(0, 0, 0, 0);
w.red = new w(1, 0, 0, 1);
class oe {
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
class Zt {
  constructor(t, e, r, i, s) {
    this.text = t, this.image = e, this.scale = r, this.fontStack = i, this.textColor = s;
  }
}
class z {
  constructor(t) {
    this.sections = t;
  }
  static fromString(t) {
    return new z([new Zt(t, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((t) => t.text.length !== 0 || t.image && t.image.name.length !== 0);
  }
  static factory(t) {
    return t instanceof z ? t : z.fromString(t);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((t) => t.text).join("");
  }
}
class $ {
  constructor(t) {
    this.values = t.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(t) {
    if (t instanceof $)
      return t;
    if (typeof t == "number")
      return new $([t, t, t, t]);
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
      return new $(t);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, r) {
    return new $(ot(t.values, e.values, r));
  }
}
class x {
  constructor(t) {
    this.name = "ExpressionEvaluationError", this.message = t;
  }
  toJSON() {
    return this.message;
  }
}
const Rn = /* @__PURE__ */ new Set(["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]);
class D {
  constructor(t) {
    this.values = t.slice();
  }
  static parse(t) {
    if (t instanceof D)
      return t;
    if (!(!Array.isArray(t) || t.length < 1 || t.length % 2 !== 0)) {
      for (let e = 0; e < t.length; e += 2) {
        const r = t[e], i = t[e + 1];
        if (typeof r != "string" || !Rn.has(r) || !Array.isArray(i) || i.length !== 2 || typeof i[0] != "number" || typeof i[1] != "number")
          return;
      }
      return new D(t);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, r) {
    const i = t.values, s = e.values;
    if (i.length !== s.length)
      throw new x(`Cannot interpolate values of different length. from: ${t.toString()}, to: ${e.toString()}`);
    const o = [];
    for (let a = 0; a < i.length; a += 2) {
      if (i[a] !== s[a])
        throw new x(`Cannot interpolate values containing mismatched anchors. from[${a}]: ${i[a]}, to[${a}]: ${s[a]}`);
      o.push(i[a]);
      const [l, u] = i[a + 1], [c, f] = s[a + 1];
      o.push([V(l, c, r), V(u, f, r)]);
    }
    return new D(o);
  }
}
class H {
  constructor(t) {
    this.name = t.name, this.available = t.available;
  }
  toString() {
    return this.name;
  }
  static fromString(t) {
    return t ? new H({ name: t, available: !1 }) : null;
  }
}
class A {
  constructor(t, e, r) {
    this.from = t, this.to = e, this.transition = r;
  }
  static interpolate(t, e, r) {
    return new A(t, e, r);
  }
  static parse(t) {
    if (t instanceof A)
      return t;
    if (Array.isArray(t) && t.length === 3 && typeof t[0] == "string" && typeof t[1] == "string" && typeof t[2] == "number")
      return new A(t[0], t[1], t[2]);
    if (typeof t == "object" && typeof t.from == "string" && typeof t.to == "string" && typeof t.transition == "number")
      return new A(t.from, t.to, t.transition);
    if (typeof t == "string")
      return new A(t, t, 1);
  }
}
function en(n, t, e, r) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof t == "number" && t >= 0 && t <= 255 && typeof e == "number" && e >= 0 && e <= 255 ? typeof r > "u" || typeof r == "number" && r >= 0 && r <= 1 ? null : `Invalid rgba value [${[n, t, e, r].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof r == "number" ? [n, t, e, r] : [n, t, e]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function at(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof A || n instanceof w || n instanceof oe || n instanceof z || n instanceof $ || n instanceof D || n instanceof H)
    return !0;
  if (Array.isArray(n)) {
    for (const t of n)
      if (!at(t))
        return !1;
    return !0;
  } else if (typeof n == "object") {
    for (const t in n)
      if (!at(n[t]))
        return !1;
    return !0;
  } else
    return !1;
}
function I(n) {
  if (n === null)
    return Et;
  if (typeof n == "string")
    return b;
  if (typeof n == "boolean")
    return g;
  if (typeof n == "number")
    return h;
  if (n instanceof w)
    return j;
  if (n instanceof A)
    return Tt;
  if (n instanceof oe)
    return $t;
  if (n instanceof z)
    return St;
  if (n instanceof $)
    return At;
  if (n instanceof D)
    return Dt;
  if (n instanceof H)
    return ct;
  if (Array.isArray(n)) {
    const t = n.length;
    let e;
    for (const r of n) {
      const i = I(r);
      if (!e)
        e = i;
      else {
        if (e === i)
          continue;
        e = m;
        break;
      }
    }
    return S(e || m, t);
  } else
    return Q;
}
function it(n) {
  const t = typeof n;
  return n === null ? "" : t === "string" || t === "number" || t === "boolean" ? String(n) : n instanceof w || n instanceof A || n instanceof z || n instanceof $ || n instanceof D || n instanceof H ? n.toString() : JSON.stringify(n);
}
class tt {
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'literal' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (!at(t[1]))
      return e.error("invalid value");
    const r = t[1];
    let i = I(r);
    const s = e.expectedType;
    return i.kind === "array" && i.N === 0 && s && s.kind === "array" && (typeof s.N != "number" || s.N === 0) && (i = s), new tt(i, r);
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
const mt = {
  string: b,
  number: h,
  boolean: g,
  object: Q
};
class N {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    let r = 1, i;
    const s = t[0];
    if (s === "array") {
      let a;
      if (t.length > 2) {
        const u = t[1];
        if (typeof u != "string" || !(u in mt) || u === "object")
          return e.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = mt[u], r++;
      } else
        a = m;
      let l;
      if (t.length > 3) {
        if (t[2] !== null && (typeof t[2] != "number" || t[2] < 0 || t[2] !== Math.floor(t[2])))
          return e.error('The length argument to "array" must be a positive integer literal', 2);
        l = t[2], r++;
      }
      i = S(a, l);
    } else {
      if (!mt[s])
        throw new Error(`Types doesn't contain name = ${s}`);
      i = mt[s];
    }
    const o = [];
    for (; r < t.length; r++) {
      const a = e.parse(t[r], r, m);
      if (!a)
        return null;
      o.push(a);
    }
    return new N(i, o);
  }
  evaluate(t) {
    for (let e = 0; e < this.args.length; e++) {
      const r = this.args[e].evaluate(t);
      if (st(this.type, I(r))) {
        if (e === this.args.length - 1)
          throw new x(`Expected value to be of type ${C(this.type)}, but found ${C(I(r))} instead.`);
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
  "to-boolean": g,
  "to-color": j,
  "to-number": h,
  "to-string": b
};
class q {
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
    const i = $e[r], s = [];
    for (let o = 1; o < t.length; o++) {
      const a = e.parse(t[o], o, m);
      if (!a)
        return null;
      s.push(a);
    }
    return new q(i, s);
  }
  evaluate(t) {
    switch (this.type.kind) {
      case "boolean":
        return !!this.args[0].evaluate(t);
      case "color": {
        let e, r;
        for (const i of this.args) {
          if (e = i.evaluate(t), r = null, e instanceof w)
            return e;
          if (typeof e == "string") {
            const s = t.parseColor(e);
            if (s)
              return s;
          } else if (Array.isArray(e) && (e.length < 3 || e.length > 4 ? r = `Invalid rgba value ${JSON.stringify(e)}: expected an array containing either three or four numeric values.` : r = en(e[0], e[1], e[2], e[3]), !r))
            return new w(e[0] / 255, e[1] / 255, e[2] / 255, e[3]);
        }
        throw new x(r || `Could not parse color from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "padding": {
        let e;
        for (const r of this.args) {
          e = r.evaluate(t);
          const i = $.parse(e);
          if (i)
            return i;
        }
        throw new x(`Could not parse padding from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let e;
        for (const r of this.args) {
          e = r.evaluate(t);
          const i = D.parse(e);
          if (i)
            return i;
        }
        throw new x(`Could not parse variableAnchorOffsetCollection from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
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
        throw new x(`Could not convert ${JSON.stringify(e)} to number.`);
      }
      case "formatted":
        return z.fromString(it(this.args[0].evaluate(t)));
      case "resolvedImage":
        return H.fromString(it(this.args[0].evaluate(t)));
      case "projectionDefinition":
        return this.args[0].evaluate(t);
      default:
        return it(this.args[0].evaluate(t));
    }
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return this.args.every((t) => t.outputDefined());
  }
}
function On(n, t) {
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
  let t = 0;
  for (let e = 0, r = n.length, i = r - 1, s, o; e < r; i = e++)
    s = n[e], o = n[i], t += (o.x - s.x) * (s.y + o.y);
  return t;
}
function Hn(n) {
  const t = n.length;
  for (let e = 0, r; e < t; e++) {
    const i = nn(n[e]);
    if (i !== 0) {
      if (r === void 0)
        r = i < 0;
      else if (r === i < 0)
        return !0;
    }
  }
  return !1;
}
const Se = ["Unknown", "Point", "LineString", "Polygon"], qn = {
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
    return this.feature ? typeof this.feature.type == "number" ? Se[this.feature.type] : qn[this.feature.type] : null;
  }
  geometryType() {
    let t = this.feature.type;
    if (typeof t != "number" || (t = Se[this.feature.type], t === "Unknown"))
      return t;
    const e = this.geometry();
    return e.length === 1 ? t : t !== "Polygon" ? `Multi${t}` : Hn(e) ? "MultiPolygon" : "Polygon";
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
    return e || (e = this._parseColorCache[t] = w.parse(t)), e;
  }
}
class Pt {
  constructor(t, e, r = [], i, s = new ie(), o = []) {
    this.registry = t, this.path = r, this.key = r.map((a) => `[${a}]`).join(""), this.scope = s, this.errors = o, this.expectedType = i, this._isConstant = e;
  }
  /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
  parse(t, e, r, i, s = {}) {
    return e ? this.concat(e, r, i)._parse(t, s) : this._parse(t, s);
  }
  _parse(t, e) {
    (t === null || typeof t == "string" || typeof t == "boolean" || typeof t == "number") && (t = ["literal", t]);
    function r(i, s, o) {
      return o === "assert" ? new N(s, [i]) : o === "coerce" ? new q(s, [i]) : i;
    }
    if (Array.isArray(t)) {
      if (t.length === 0)
        return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
      const i = t[0];
      if (typeof i != "string")
        return this.error(`Expression name must be a string, but found ${typeof i} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
      const s = this.registry[i];
      if (s) {
        let o = s.parse(t, this);
        if (!o)
          return null;
        if (this.expectedType) {
          const a = this.expectedType, l = o.type;
          if ((a.kind === "string" || a.kind === "number" || a.kind === "boolean" || a.kind === "object" || a.kind === "array") && l.kind === "value")
            o = r(o, a, e.typeAnnotation || "assert");
          else if (a.kind === "projectionDefinition" && (l.kind === "string" || l.kind === "array"))
            o = r(o, a, e.typeAnnotation || "coerce");
          else if ((a.kind === "color" || a.kind === "formatted" || a.kind === "resolvedImage") && (l.kind === "value" || l.kind === "string"))
            o = r(o, a, e.typeAnnotation || "coerce");
          else if (a.kind === "padding" && (l.kind === "value" || l.kind === "number" || l.kind === "array"))
            o = r(o, a, e.typeAnnotation || "coerce");
          else if (a.kind === "variableAnchorOffsetCollection" && (l.kind === "value" || l.kind === "array"))
            o = r(o, a, e.typeAnnotation || "coerce");
          else if (this.checkSubtype(a, l))
            return null;
        }
        if (!(o instanceof tt) && o.type.kind !== "resolvedImage" && this._isConstant(o)) {
          const a = new rn();
          try {
            o = new tt(o.type, o.evaluate(a));
          } catch (l) {
            return this.error(l.message), null;
          }
        }
        return o;
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
    const i = typeof t == "number" ? this.path.concat(t) : this.path, s = r ? this.scope.concat(r) : this.scope;
    return new Pt(this.registry, this._isConstant, i, e || null, s, this.errors);
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
    this.errors.push(new F(r, t));
  }
  /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   * @param expected The expected type
   * @param t The actual type
   * @returns null if `t` is a subtype of `expected`; otherwise returns an error message
   */
  checkSubtype(t, e) {
    const r = st(t, e);
    return r && this.error(r), r;
  }
}
class Nt {
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
    for (let s = 1; s < t.length - 1; s += 2) {
      const o = t[s];
      if (typeof o != "string")
        return e.error(`Expected string, but found ${typeof o} instead.`, s);
      if (/[^a-zA-Z0-9_]/.test(o))
        return e.error("Variable names must contain only alphanumeric characters or '_'.", s);
      const a = e.parse(t[s + 1], s + 1);
      if (!a)
        return null;
      r.push([o, a]);
    }
    const i = e.parse(t[t.length - 1], t.length - 1, e.expectedType, r);
    return i ? new Nt(r, i) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class Lt {
  constructor(t, e) {
    this.type = e.type, this.name = t, this.boundExpression = e;
  }
  static parse(t, e) {
    if (t.length !== 2 || typeof t[1] != "string")
      return e.error("'var' expression requires exactly one string literal argument.");
    const r = t[1];
    return e.scope.has(r) ? new Lt(r, e.scope.get(r)) : e.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`, 1);
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
class ae {
  constructor(t, e, r) {
    this.type = t, this.index = e, this.input = r;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error(`Expected 2 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, h), i = e.parse(t[2], 2, S(e.expectedType || m));
    if (!r || !i)
      return null;
    const s = i.type;
    return new ae(s.itemType, r, i);
  }
  evaluate(t) {
    const e = this.index.evaluate(t), r = this.input.evaluate(t);
    if (e < 0)
      throw new x(`Array index out of bounds: ${e} < 0.`);
    if (e >= r.length)
      throw new x(`Array index out of bounds: ${e} > ${r.length - 1}.`);
    if (e !== Math.floor(e))
      throw new x(`Array index must be an integer, but found ${e} instead.`);
    return r[e];
  }
  eachChild(t) {
    t(this.index), t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class le {
  constructor(t, e) {
    this.type = g, this.needle = t, this.haystack = e;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error(`Expected 2 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, m), i = e.parse(t[2], 2, m);
    return !r || !i ? null : se(r.type, [g, b, h, Et, m]) ? new le(r, i) : e.error(`Expected first argument to be of type boolean, string, number or null, but found ${C(r.type)} instead`);
  }
  evaluate(t) {
    const e = this.needle.evaluate(t), r = this.haystack.evaluate(t);
    if (!r)
      return !1;
    if (!_(e, ["boolean", "string", "number", "null"]))
      throw new x(`Expected first argument to be of type boolean, string, number or null, but found ${C(I(e))} instead.`);
    if (!_(r, ["string", "array"]))
      throw new x(`Expected second argument to be of type array or string, but found ${C(I(r))} instead.`);
    return r.indexOf(e) >= 0;
  }
  eachChild(t) {
    t(this.needle), t(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class wt {
  constructor(t, e, r) {
    this.type = h, this.needle = t, this.haystack = e, this.fromIndex = r;
  }
  static parse(t, e) {
    if (t.length <= 2 || t.length >= 5)
      return e.error(`Expected 3 or 4 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, m), i = e.parse(t[2], 2, m);
    if (!r || !i)
      return null;
    if (!se(r.type, [g, b, h, Et, m]))
      return e.error(`Expected first argument to be of type boolean, string, number or null, but found ${C(r.type)} instead`);
    if (t.length === 4) {
      const s = e.parse(t[3], 3, h);
      return s ? new wt(r, i, s) : null;
    } else
      return new wt(r, i);
  }
  evaluate(t) {
    const e = this.needle.evaluate(t), r = this.haystack.evaluate(t);
    if (!_(e, ["boolean", "string", "number", "null"]))
      throw new x(`Expected first argument to be of type boolean, string, number or null, but found ${C(I(e))} instead.`);
    let i;
    if (this.fromIndex && (i = this.fromIndex.evaluate(t)), _(r, ["string"])) {
      const s = r.indexOf(e, i);
      return s === -1 ? -1 : [...r.slice(0, s)].length;
    } else {
      if (_(r, ["array"]))
        return r.indexOf(e, i);
      throw new x(`Expected second argument to be of type array or string, but found ${C(I(r))} instead.`);
    }
  }
  eachChild(t) {
    t(this.needle), t(this.haystack), this.fromIndex && t(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class ue {
  constructor(t, e, r, i, s, o) {
    this.inputType = t, this.type = e, this.input = r, this.cases = i, this.outputs = s, this.otherwise = o;
  }
  static parse(t, e) {
    if (t.length < 5)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if (t.length % 2 !== 1)
      return e.error("Expected an even number of arguments.");
    let r, i;
    e.expectedType && e.expectedType.kind !== "value" && (i = e.expectedType);
    const s = {}, o = [];
    for (let u = 2; u < t.length - 1; u += 2) {
      let c = t[u];
      const f = t[u + 1];
      Array.isArray(c) || (c = [c]);
      const p = e.concat(u);
      if (c.length === 0)
        return p.error("Expected at least one branch label.");
      for (const y of c) {
        if (typeof y != "number" && typeof y != "string")
          return p.error("Branch labels must be numbers or strings.");
        if (typeof y == "number" && Math.abs(y) > Number.MAX_SAFE_INTEGER)
          return p.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
        if (typeof y == "number" && Math.floor(y) !== y)
          return p.error("Numeric branch labels must be integer values.");
        if (!r)
          r = I(y);
        else if (p.checkSubtype(r, I(y)))
          return null;
        if (typeof s[String(y)] < "u")
          return p.error("Branch labels must be unique.");
        s[String(y)] = o.length;
      }
      const d = e.parse(f, u, i);
      if (!d)
        return null;
      i = i || d.type, o.push(d);
    }
    const a = e.parse(t[1], 1, m);
    if (!a)
      return null;
    const l = e.parse(t[t.length - 1], t.length - 1, i);
    return !l || a.type.kind !== "value" && e.concat(1).checkSubtype(r, a.type) ? null : new ue(r, i, a, s, o, l);
  }
  evaluate(t) {
    const e = this.input.evaluate(t);
    return (I(e) === this.inputType && this.outputs[this.cases[e]] || this.otherwise).evaluate(t);
  }
  eachChild(t) {
    t(this.input), this.outputs.forEach(t), t(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((t) => t.outputDefined()) && this.otherwise.outputDefined();
  }
}
class ce {
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
    for (let o = 1; o < t.length - 1; o += 2) {
      const a = e.parse(t[o], o, g);
      if (!a)
        return null;
      const l = e.parse(t[o + 1], o + 1, r);
      if (!l)
        return null;
      i.push([a, l]), r = r || l.type;
    }
    const s = e.parse(t[t.length - 1], t.length - 1, r);
    if (!s)
      return null;
    if (!r)
      throw new Error("Can't infer output type");
    return new ce(r, i, s);
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
class kt {
  constructor(t, e, r, i) {
    this.type = t, this.input = e, this.beginIndex = r, this.endIndex = i;
  }
  static parse(t, e) {
    if (t.length <= 2 || t.length >= 5)
      return e.error(`Expected 3 or 4 arguments, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1, m), i = e.parse(t[2], 2, h);
    if (!r || !i)
      return null;
    if (!se(r.type, [S(m), b, m]))
      return e.error(`Expected first argument to be of type array or string, but found ${C(r.type)} instead`);
    if (t.length === 4) {
      const s = e.parse(t[3], 3, h);
      return s ? new kt(r.type, r, i, s) : null;
    } else
      return new kt(r.type, r, i);
  }
  evaluate(t) {
    const e = this.input.evaluate(t), r = this.beginIndex.evaluate(t);
    let i;
    if (this.endIndex && (i = this.endIndex.evaluate(t)), _(e, ["string"]))
      return [...e].slice(r, i).join("");
    if (_(e, ["array"]))
      return e.slice(r, i);
    throw new x(`Expected first argument to be of type array or string, but found ${C(I(e))} instead.`);
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
  let r = 0, i = e, s = 0, o, a;
  for (; r <= i; )
    if (s = Math.floor((r + i) / 2), o = n[s], a = n[s + 1], o <= t) {
      if (s === e || t < a)
        return s;
      r = s + 1;
    } else if (o > t)
      i = s - 1;
    else
      throw new x("Input is not a number.");
  return 0;
}
class jt {
  constructor(t, e, r) {
    this.type = t, this.input = e, this.labels = [], this.outputs = [];
    for (const [i, s] of r)
      this.labels.push(i), this.outputs.push(s);
  }
  static parse(t, e) {
    if (t.length - 1 < 4)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if ((t.length - 1) % 2 !== 0)
      return e.error("Expected an even number of arguments.");
    const r = e.parse(t[1], 1, h);
    if (!r)
      return null;
    const i = [];
    let s = null;
    e.expectedType && e.expectedType.kind !== "value" && (s = e.expectedType);
    for (let o = 1; o < t.length; o += 2) {
      const a = o === 1 ? -1 / 0 : t[o], l = t[o + 1], u = o, c = o + 1;
      if (typeof a != "number")
        return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', u);
      if (i.length && i[i.length - 1][0] >= a)
        return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', u);
      const f = e.parse(l, c, s);
      if (!f)
        return null;
      s = s || f.type, i.push([a, f]);
    }
    return new jt(s, r, i);
  }
  evaluate(t) {
    const e = this.labels, r = this.outputs;
    if (e.length === 1)
      return r[0].evaluate(t);
    const i = this.input.evaluate(t);
    if (i <= e[0])
      return r[0].evaluate(t);
    const s = e.length;
    if (i >= e[s - 1])
      return r[s - 1].evaluate(t);
    const o = Ft(e, i);
    return r[o].evaluate(t);
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
function Vn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Wt, Ae;
function Wn() {
  if (Ae) return Wt;
  Ae = 1, Wt = n;
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
        var s = this.sampleCurveX(r) - t;
        if (Math.abs(s) < e) return r;
        var o = this.sampleCurveDerivativeX(r);
        if (Math.abs(o) < 1e-6) break;
        r = r - s / o;
      }
      var a = 0, l = 1;
      for (r = t, i = 0; i < 20 && (s = this.sampleCurveX(r), !(Math.abs(s - t) < e)); i++)
        t > s ? a = r : l = r, r = (l - a) * 0.5 + a;
      return r;
    },
    solve: function(t, e) {
      return this.sampleCurveY(this.solveCurveX(t, e));
    }
  }, Wt;
}
var Un = Wn(), _n = /* @__PURE__ */ Vn(Un);
class P {
  constructor(t, e, r, i, s) {
    this.type = t, this.operator = e, this.interpolation = r, this.input = i, this.labels = [], this.outputs = [];
    for (const [o, a] of s)
      this.labels.push(o), this.outputs.push(a);
  }
  static interpolationFactor(t, e, r, i) {
    let s = 0;
    if (t.name === "exponential")
      s = Ut(e, t.base, r, i);
    else if (t.name === "linear")
      s = Ut(e, 1, r, i);
    else if (t.name === "cubic-bezier") {
      const o = t.controlPoints;
      s = new _n(o[0], o[1], o[2], o[3]).solve(Ut(e, 1, r, i));
    }
    return s;
  }
  static parse(t, e) {
    let [r, i, s, ...o] = t;
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
    if (s = e.parse(s, 2, h), !s)
      return null;
    const a = [];
    let l = null;
    r === "interpolate-hcl" || r === "interpolate-lab" ? l = j : e.expectedType && e.expectedType.kind !== "value" && (l = e.expectedType);
    for (let u = 0; u < o.length; u += 2) {
      const c = o[u], f = o[u + 1], p = u + 3, d = u + 4;
      if (typeof c != "number")
        return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', p);
      if (a.length && a[a.length - 1][0] >= c)
        return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', p);
      const y = e.parse(f, d, l);
      if (!y)
        return null;
      l = l || y.type, a.push([c, y]);
    }
    return !G(l, h) && !G(l, Tt) && !G(l, j) && !G(l, At) && !G(l, Dt) && !G(l, S(h)) ? e.error(`Type ${C(l)} is not interpolatable.`) : new P(l, r, i, s, a);
  }
  evaluate(t) {
    const e = this.labels, r = this.outputs;
    if (e.length === 1)
      return r[0].evaluate(t);
    const i = this.input.evaluate(t);
    if (i <= e[0])
      return r[0].evaluate(t);
    const s = e.length;
    if (i >= e[s - 1])
      return r[s - 1].evaluate(t);
    const o = Ft(e, i), a = e[o], l = e[o + 1], u = P.interpolationFactor(this.interpolation, i, a, l), c = r[o].evaluate(t), f = r[o + 1].evaluate(t);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return V(c, f, u);
          case "color":
            return w.interpolate(c, f, u);
          case "padding":
            return $.interpolate(c, f, u);
          case "variableAnchorOffsetCollection":
            return D.interpolate(c, f, u);
          case "array":
            return ot(c, f, u);
          case "projectionDefinition":
            return A.interpolate(c, f, u);
        }
      case "interpolate-hcl":
        return w.interpolate(c, f, u, "hcl");
      case "interpolate-lab":
        return w.interpolate(c, f, u, "lab");
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
function Ut(n, t, e, r) {
  const i = r - e, s = n - e;
  return i === 0 ? 0 : t === 1 ? s / i : (Math.pow(t, s) - 1) / (Math.pow(t, i) - 1);
}
const Xn = {
  color: w.interpolate,
  number: V,
  padding: $.interpolate,
  variableAnchorOffsetCollection: D.interpolate,
  array: ot
};
class lt {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    let r = null;
    const i = e.expectedType;
    i && i.kind !== "value" && (r = i);
    const s = [];
    for (const a of t.slice(1)) {
      const l = e.parse(a, 1 + s.length, r, void 0, { typeAnnotation: "omit" });
      if (!l)
        return null;
      r = r || l.type, s.push(l);
    }
    if (!r)
      throw new Error("No output type");
    return i && s.some((a) => st(i, a.type)) ? new lt(m, s) : new lt(r, s);
  }
  evaluate(t) {
    let e = null, r = 0, i;
    for (const s of this.args)
      if (r++, e = s.evaluate(t), e && e instanceof H && !e.available && (i || (i = e.name), e = null, r === this.args.length && (e = i)), e !== null)
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
function De(n, t) {
  return n === "==" || n === "!=" ? t.kind === "boolean" || t.kind === "string" || t.kind === "number" || t.kind === "null" || t.kind === "value" : t.kind === "string" || t.kind === "number" || t.kind === "value";
}
function Zn(n, t, e) {
  return t === e;
}
function Gn(n, t, e) {
  return t !== e;
}
function Jn(n, t, e) {
  return t < e;
}
function Yn(n, t, e) {
  return t > e;
}
function Qn(n, t, e) {
  return t <= e;
}
function Kn(n, t, e) {
  return t >= e;
}
function sn(n, t, e, r) {
  return r.compare(t, e) === 0;
}
function tr(n, t, e, r) {
  return !sn(n, t, e, r);
}
function er(n, t, e, r) {
  return r.compare(t, e) < 0;
}
function nr(n, t, e, r) {
  return r.compare(t, e) > 0;
}
function rr(n, t, e, r) {
  return r.compare(t, e) <= 0;
}
function ir(n, t, e, r) {
  return r.compare(t, e) >= 0;
}
function et(n, t, e) {
  const r = n !== "==" && n !== "!=";
  return class on {
    constructor(s, o, a) {
      this.type = g, this.lhs = s, this.rhs = o, this.collator = a, this.hasUntypedArgument = s.type.kind === "value" || o.type.kind === "value";
    }
    static parse(s, o) {
      if (s.length !== 3 && s.length !== 4)
        return o.error("Expected two or three arguments.");
      const a = s[0];
      let l = o.parse(s[1], 1, m);
      if (!l)
        return null;
      if (!De(a, l.type))
        return o.concat(1).error(`"${a}" comparisons are not supported for type '${C(l.type)}'.`);
      let u = o.parse(s[2], 2, m);
      if (!u)
        return null;
      if (!De(a, u.type))
        return o.concat(2).error(`"${a}" comparisons are not supported for type '${C(u.type)}'.`);
      if (l.type.kind !== u.type.kind && l.type.kind !== "value" && u.type.kind !== "value")
        return o.error(`Cannot compare types '${C(l.type)}' and '${C(u.type)}'.`);
      r && (l.type.kind === "value" && u.type.kind !== "value" ? l = new N(u.type, [l]) : l.type.kind !== "value" && u.type.kind === "value" && (u = new N(l.type, [u])));
      let c = null;
      if (s.length === 4) {
        if (l.type.kind !== "string" && u.type.kind !== "string" && l.type.kind !== "value" && u.type.kind !== "value")
          return o.error("Cannot use collator to compare non-string types.");
        if (c = o.parse(s[3], 3, $t), !c)
          return null;
      }
      return new on(l, u, c);
    }
    evaluate(s) {
      const o = this.lhs.evaluate(s), a = this.rhs.evaluate(s);
      if (r && this.hasUntypedArgument) {
        const l = I(o), u = I(a);
        if (l.kind !== u.kind || !(l.kind === "string" || l.kind === "number"))
          throw new x(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${u.kind}) instead.`);
      }
      if (this.collator && !r && this.hasUntypedArgument) {
        const l = I(o), u = I(a);
        if (l.kind !== "string" || u.kind !== "string")
          return t(s, o, a);
      }
      return this.collator ? e(s, o, a, this.collator.evaluate(s)) : t(s, o, a);
    }
    eachChild(s) {
      s(this.lhs), s(this.rhs), this.collator && s(this.collator);
    }
    outputDefined() {
      return !0;
    }
  };
}
const sr = et("==", Zn, sn), or = et("!=", Gn, tr), ar = et("<", Jn, er), lr = et(">", Yn, nr), ur = et("<=", Qn, rr), cr = et(">=", Kn, ir);
class zt {
  constructor(t, e, r) {
    this.type = $t, this.locale = r, this.caseSensitive = t, this.diacriticSensitive = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error("Expected one argument.");
    const r = t[1];
    if (typeof r != "object" || Array.isArray(r))
      return e.error("Collator options argument must be an object.");
    const i = e.parse(r["case-sensitive"] === void 0 ? !1 : r["case-sensitive"], 1, g);
    if (!i)
      return null;
    const s = e.parse(r["diacritic-sensitive"] === void 0 ? !1 : r["diacritic-sensitive"], 1, g);
    if (!s)
      return null;
    let o = null;
    return r.locale && (o = e.parse(r.locale, 1, b), !o) ? null : new zt(i, s, o);
  }
  evaluate(t) {
    return new oe(this.caseSensitive.evaluate(t), this.diacriticSensitive.evaluate(t), this.locale ? this.locale.evaluate(t) : null);
  }
  eachChild(t) {
    t(this.caseSensitive), t(this.diacriticSensitive), this.locale && t(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class fe {
  constructor(t, e, r, i, s) {
    this.type = b, this.number = t, this.locale = e, this.currency = r, this.minFractionDigits = i, this.maxFractionDigits = s;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error("Expected two arguments.");
    const r = e.parse(t[1], 1, h);
    if (!r)
      return null;
    const i = t[2];
    if (typeof i != "object" || Array.isArray(i))
      return e.error("NumberFormat options argument must be an object.");
    let s = null;
    if (i.locale && (s = e.parse(i.locale, 1, b), !s))
      return null;
    let o = null;
    if (i.currency && (o = e.parse(i.currency, 1, b), !o))
      return null;
    let a = null;
    if (i["min-fraction-digits"] && (a = e.parse(i["min-fraction-digits"], 1, h), !a))
      return null;
    let l = null;
    return i["max-fraction-digits"] && (l = e.parse(i["max-fraction-digits"], 1, h), !l) ? null : new fe(r, s, o, a, l);
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
class he {
  constructor(t) {
    this.type = St, this.sections = t;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    const r = t[1];
    if (!Array.isArray(r) && typeof r == "object")
      return e.error("First argument must be an image or text section.");
    const i = [];
    let s = !1;
    for (let o = 1; o <= t.length - 1; ++o) {
      const a = t[o];
      if (s && typeof a == "object" && !Array.isArray(a)) {
        s = !1;
        let l = null;
        if (a["font-scale"] && (l = e.parse(a["font-scale"], 1, h), !l))
          return null;
        let u = null;
        if (a["text-font"] && (u = e.parse(a["text-font"], 1, S(b)), !u))
          return null;
        let c = null;
        if (a["text-color"] && (c = e.parse(a["text-color"], 1, j), !c))
          return null;
        const f = i[i.length - 1];
        f.scale = l, f.font = u, f.textColor = c;
      } else {
        const l = e.parse(t[o], 1, m);
        if (!l)
          return null;
        const u = l.type.kind;
        if (u !== "string" && u !== "value" && u !== "null" && u !== "resolvedImage")
          return e.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        s = !0, i.push({ content: l, scale: null, font: null, textColor: null });
      }
    }
    return new he(i);
  }
  evaluate(t) {
    const e = (r) => {
      const i = r.content.evaluate(t);
      return I(i) === ct ? new Zt("", i, null, null, null) : new Zt(it(i), null, r.scale ? r.scale.evaluate(t) : null, r.font ? r.font.evaluate(t).join(",") : null, r.textColor ? r.textColor.evaluate(t) : null);
    };
    return new z(this.sections.map(e));
  }
  eachChild(t) {
    for (const e of this.sections)
      t(e.content), e.scale && t(e.scale), e.font && t(e.font), e.textColor && t(e.textColor);
  }
  outputDefined() {
    return !1;
  }
}
class pe {
  constructor(t) {
    this.type = ct, this.input = t;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error("Expected two arguments.");
    const r = e.parse(t[1], 1, b);
    return r ? new pe(r) : e.error("No image name provided.");
  }
  evaluate(t) {
    const e = this.input.evaluate(t), r = H.fromString(e);
    return r && t.availableImages && (r.available = t.availableImages.indexOf(e) > -1), r;
  }
  eachChild(t) {
    t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class de {
  constructor(t) {
    this.type = h, this.input = t;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`Expected 1 argument, but found ${t.length - 1} instead.`);
    const r = e.parse(t[1], 1);
    return r ? r.type.kind !== "array" && r.type.kind !== "string" && r.type.kind !== "value" ? e.error(`Expected argument of type string or array, but found ${C(r.type)} instead.`) : new de(r) : null;
  }
  evaluate(t) {
    const e = this.input.evaluate(t);
    if (typeof e == "string")
      return [...e].length;
    if (Array.isArray(e))
      return e.length;
    throw new x(`Expected value to be of type string or array, but found ${C(I(e))} instead.`);
  }
  eachChild(t) {
    t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const B = 8192;
function fr(n, t) {
  const e = hr(n[0]), r = dr(n[1]), i = Math.pow(2, t.z);
  return [Math.round(e * i * B), Math.round(r * i * B)];
}
function ye(n, t) {
  const e = Math.pow(2, t.z), r = (n[0] / B + t.x) / e, i = (n[1] / B + t.y) / e;
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
function ft(n, t) {
  n[0] = Math.min(n[0], t[0]), n[1] = Math.min(n[1], t[1]), n[2] = Math.max(n[2], t[0]), n[3] = Math.max(n[3], t[1]);
}
function ut(n, t) {
  return !(n[0] <= t[0] || n[2] >= t[2] || n[1] <= t[1] || n[3] >= t[3]);
}
function gr(n, t, e) {
  return t[1] > n[1] != e[1] > n[1] && n[0] < (e[0] - t[0]) * (n[1] - t[1]) / (e[1] - t[1]) + t[0];
}
function mr(n, t, e) {
  const r = n[0] - t[0], i = n[1] - t[1], s = n[0] - e[0], o = n[1] - e[1];
  return r * o - s * i === 0 && r * s <= 0 && i * o <= 0;
}
function Bt(n, t, e, r) {
  const i = [t[0] - n[0], t[1] - n[1]], s = [r[0] - e[0], r[1] - e[1]];
  return kr(s, i) === 0 ? !1 : !!(Pe(n, t, e, r) && Pe(e, r, n, t));
}
function br(n, t, e) {
  for (const r of e)
    for (let i = 0; i < r.length - 1; ++i)
      if (Bt(n, t, r[i], r[i + 1]))
        return !0;
  return !1;
}
function nt(n, t, e = !1) {
  let r = !1;
  for (const i of t)
    for (let s = 0; s < i.length - 1; s++) {
      if (mr(n, i[s], i[s + 1]))
        return e;
      gr(n, i[s], i[s + 1]) && (r = !r);
    }
  return r;
}
function vr(n, t) {
  for (const e of t)
    if (nt(n, e))
      return !0;
  return !1;
}
function an(n, t) {
  for (const e of n)
    if (!nt(e, t))
      return !1;
  for (let e = 0; e < n.length - 1; ++e)
    if (br(n[e], n[e + 1], t))
      return !1;
  return !0;
}
function wr(n, t) {
  for (const e of t)
    if (an(n, e))
      return !0;
  return !1;
}
function kr(n, t) {
  return n[0] * t[1] - n[1] * t[0];
}
function Pe(n, t, e, r) {
  const i = n[0] - e[0], s = n[1] - e[1], o = t[0] - e[0], a = t[1] - e[1], l = r[0] - e[0], u = r[1] - e[1], c = i * u - l * s, f = o * u - l * a;
  return c > 0 && f < 0 || c < 0 && f > 0;
}
function ge(n, t, e) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = [];
    for (let o = 0; o < n[i].length; o++) {
      const a = fr(n[i][o], e);
      ft(t, a), s.push(a);
    }
    r.push(s);
  }
  return r;
}
function ln(n, t, e) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = ge(n[i], t, e);
    r.push(s);
  }
  return r;
}
function un(n, t, e, r) {
  if (n[0] < e[0] || n[0] > e[2]) {
    const i = r * 0.5;
    let s = n[0] - e[0] > i ? -r : e[0] - n[0] > i ? r : 0;
    s === 0 && (s = n[0] - e[2] > i ? -r : e[2] - n[0] > i ? r : 0), n[0] += s;
  }
  ft(t, n);
}
function Cr(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function Ne(n, t, e, r) {
  const i = Math.pow(2, r.z) * B, s = [r.x * B, r.y * B], o = [];
  for (const a of n)
    for (const l of a) {
      const u = [l.x + s[0], l.y + s[1]];
      un(u, t, e, i), o.push(u);
    }
  return o;
}
function Le(n, t, e, r) {
  const i = Math.pow(2, r.z) * B, s = [r.x * B, r.y * B], o = [];
  for (const a of n) {
    const l = [];
    for (const u of a) {
      const c = [u.x + s[0], u.y + s[1]];
      ft(t, c), l.push(c);
    }
    o.push(l);
  }
  if (t[2] - t[0] <= i / 2) {
    Cr(t);
    for (const a of o)
      for (const l of a)
        un(l, t, e, i);
  }
  return o;
}
function xr(n, t) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (t.type === "Polygon") {
    const s = ge(t.coordinates, r, i), o = Ne(n.geometry(), e, r, i);
    if (!ut(e, r))
      return !1;
    for (const a of o)
      if (!nt(a, s))
        return !1;
  }
  if (t.type === "MultiPolygon") {
    const s = ln(t.coordinates, r, i), o = Ne(n.geometry(), e, r, i);
    if (!ut(e, r))
      return !1;
    for (const a of o)
      if (!vr(a, s))
        return !1;
  }
  return !0;
}
function Mr(n, t) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (t.type === "Polygon") {
    const s = ge(t.coordinates, r, i), o = Le(n.geometry(), e, r, i);
    if (!ut(e, r))
      return !1;
    for (const a of o)
      if (!an(a, s))
        return !1;
  }
  if (t.type === "MultiPolygon") {
    const s = ln(t.coordinates, r, i), o = Le(n.geometry(), e, r, i);
    if (!ut(e, r))
      return !1;
    for (const a of o)
      if (!wr(a, s))
        return !1;
  }
  return !0;
}
class X {
  constructor(t, e) {
    this.type = g, this.geojson = t, this.geometries = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'within' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (at(t[1])) {
      const r = t[1];
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
    return e.error("'within' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(t) {
    if (t.geometry() != null && t.canonicalID() != null) {
      if (t.geometryDollarType() === "Point")
        return xr(t, this.geometries);
      if (t.geometryDollarType() === "LineString")
        return Mr(t, this.geometries);
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
      const s = t - 1 >> 1, o = e[s];
      if (r(i, o) >= 0) break;
      e[t] = o, t = s;
    }
    e[t] = i;
  }
  _down(t) {
    const { data: e, compare: r } = this, i = this.length >> 1, s = e[t];
    for (; t < i; ) {
      let o = (t << 1) + 1;
      const a = o + 1;
      if (a < this.length && r(e[a], e[o]) < 0 && (o = a), r(e[o], s) >= 0) break;
      e[t] = e[o], t = o;
    }
    e[t] = s;
  }
}
const Ir = 6378.137, Fe = 1 / 298.257223563, je = Fe * (2 - Fe), ze = Math.PI / 180;
class me {
  constructor(t) {
    const e = ze * Ir * 1e3, r = Math.cos(t * ze), i = 1 / (1 - je * (1 - r * r)), s = Math.sqrt(i);
    this.kx = e * s * r, this.ky = e * s * i * (1 - je);
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
    let r = 1 / 0, i, s, o, a;
    for (let l = 0; l < t.length - 1; l++) {
      let u = t[l][0], c = t[l][1], f = this.wrap(t[l + 1][0] - u) * this.kx, p = (t[l + 1][1] - c) * this.ky, d = 0;
      (f !== 0 || p !== 0) && (d = (this.wrap(e[0] - u) * this.kx * f + (e[1] - c) * this.ky * p) / (f * f + p * p), d > 1 ? (u = t[l + 1][0], c = t[l + 1][1]) : d > 0 && (u += f / this.kx * d, c += p / this.ky * d)), f = this.wrap(e[0] - u) * this.kx, p = (e[1] - c) * this.ky;
      const y = f * f + p * p;
      y < r && (r = y, i = u, s = c, o = l, a = d);
    }
    return {
      point: [i, s],
      index: o,
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
const Gt = 100, Jt = 50;
function fn(n, t) {
  return t[0] - n[0];
}
function Ct(n) {
  return n[1] - n[0] + 1;
}
function O(n, t) {
  return n[1] >= n[0] && n[1] < t;
}
function Yt(n, t) {
  if (n[0] > n[1])
    return [null, null];
  const e = Ct(n);
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
function Qt(n, t) {
  if (!O(t, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let r = t[0]; r <= t[1]; ++r)
    ft(e, n[r]);
  return e;
}
function Kt(n) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const e of n)
    for (const r of e)
      ft(t, r);
  return t;
}
function Be(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function be(n, t, e) {
  if (!Be(n) || !Be(t))
    return NaN;
  let r = 0, i = 0;
  return n[2] < t[0] && (r = t[0] - n[2]), n[0] > t[2] && (r = n[0] - t[2]), n[1] > t[3] && (i = n[1] - t[3]), n[3] < t[1] && (i = t[1] - n[3]), e.distance([0, 0], [r, i]);
}
function U(n, t, e) {
  const r = e.pointOnLine(t, n);
  return e.distance(n, r.point);
}
function ve(n, t, e, r, i) {
  const s = Math.min(U(n, [e, r], i), U(t, [e, r], i)), o = Math.min(U(e, [n, t], i), U(r, [n, t], i));
  return Math.min(s, o);
}
function Er(n, t, e, r, i) {
  if (!(O(t, n.length) && O(r, e.length)))
    return 1 / 0;
  let o = 1 / 0;
  for (let a = t[0]; a < t[1]; ++a) {
    const l = n[a], u = n[a + 1];
    for (let c = r[0]; c < r[1]; ++c) {
      const f = e[c], p = e[c + 1];
      if (Bt(l, u, f, p))
        return 0;
      o = Math.min(o, ve(l, u, f, p, i));
    }
  }
  return o;
}
function Tr(n, t, e, r, i) {
  if (!(O(t, n.length) && O(r, e.length)))
    return NaN;
  let o = 1 / 0;
  for (let a = t[0]; a <= t[1]; ++a)
    for (let l = r[0]; l <= r[1]; ++l)
      if (o = Math.min(o, i.distance(n[a], e[l])), o === 0)
        return o;
  return o;
}
function $r(n, t, e) {
  if (nt(n, t, !0))
    return 0;
  let r = 1 / 0;
  for (const i of t) {
    const s = i[0], o = i[i.length - 1];
    if (s !== o && (r = Math.min(r, U(n, [o, s], e)), r === 0))
      return r;
    const a = e.pointOnLine(i, n);
    if (r = Math.min(r, e.distance(n, a.point)), r === 0)
      return r;
  }
  return r;
}
function Sr(n, t, e, r) {
  if (!O(t, n.length))
    return NaN;
  for (let s = t[0]; s <= t[1]; ++s)
    if (nt(n[s], e, !0))
      return 0;
  let i = 1 / 0;
  for (let s = t[0]; s < t[1]; ++s) {
    const o = n[s], a = n[s + 1];
    for (const l of e)
      for (let u = 0, c = l.length, f = c - 1; u < c; f = u++) {
        const p = l[f], d = l[u];
        if (Bt(o, a, p, d))
          return 0;
        i = Math.min(i, ve(o, a, p, d, r));
      }
  }
  return i;
}
function Re(n, t) {
  for (const e of n)
    for (const r of e)
      if (nt(r, t, !0))
        return !0;
  return !1;
}
function Ar(n, t, e, r = 1 / 0) {
  const i = Kt(n), s = Kt(t);
  if (r !== 1 / 0 && be(i, s, e) >= r)
    return r;
  if (ut(i, s)) {
    if (Re(n, t))
      return 0;
  } else if (Re(t, n))
    return 0;
  let o = 1 / 0;
  for (const a of n)
    for (let l = 0, u = a.length, c = u - 1; l < u; c = l++) {
      const f = a[c], p = a[l];
      for (const d of t)
        for (let y = 0, k = d.length, M = k - 1; y < k; M = y++) {
          const E = d[M], T = d[y];
          if (Bt(f, p, E, T))
            return 0;
          o = Math.min(o, ve(f, p, E, T, e));
        }
    }
  return o;
}
function Oe(n, t, e, r, i, s) {
  if (!s)
    return;
  const o = be(Qt(r, s), i, e);
  o < t && n.push([o, s, [0, 0]]);
}
function bt(n, t, e, r, i, s, o) {
  if (!s || !o)
    return;
  const a = be(Qt(r, s), Qt(i, o), e);
  a < t && n.push([a, s, o]);
}
function xt(n, t, e, r, i = 1 / 0) {
  let s = Math.min(r.distance(n[0], e[0][0]), i);
  if (s === 0)
    return s;
  const o = new cn([[0, [0, n.length - 1], [0, 0]]], fn), a = Kt(e);
  for (; o.length > 0; ) {
    const l = o.pop();
    if (l[0] >= s)
      continue;
    const u = l[1], c = t ? Jt : Gt;
    if (Ct(u) <= c) {
      if (!O(u, n.length))
        return NaN;
      if (t) {
        const f = Sr(n, u, e, r);
        if (isNaN(f) || f === 0)
          return f;
        s = Math.min(s, f);
      } else
        for (let f = u[0]; f <= u[1]; ++f) {
          const p = $r(n[f], e, r);
          if (s = Math.min(s, p), s === 0)
            return 0;
        }
    } else {
      const f = Yt(u, t);
      Oe(o, s, r, n, a, f[0]), Oe(o, s, r, n, a, f[1]);
    }
  }
  return s;
}
function Mt(n, t, e, r, i, s = 1 / 0) {
  let o = Math.min(s, i.distance(n[0], e[0]));
  if (o === 0)
    return o;
  const a = new cn([[0, [0, n.length - 1], [0, e.length - 1]]], fn);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= o)
      continue;
    const u = l[1], c = l[2], f = t ? Jt : Gt, p = r ? Jt : Gt;
    if (Ct(u) <= f && Ct(c) <= p) {
      if (!O(u, n.length) && O(c, e.length))
        return NaN;
      let d;
      if (t && r)
        d = Er(n, u, e, c, i), o = Math.min(o, d);
      else if (t && !r) {
        const y = n.slice(u[0], u[1] + 1);
        for (let k = c[0]; k <= c[1]; ++k)
          if (d = U(e[k], y, i), o = Math.min(o, d), o === 0)
            return o;
      } else if (!t && r) {
        const y = e.slice(c[0], c[1] + 1);
        for (let k = u[0]; k <= u[1]; ++k)
          if (d = U(n[k], y, i), o = Math.min(o, d), o === 0)
            return o;
      } else
        d = Tr(n, u, e, c, i), o = Math.min(o, d);
    } else {
      const d = Yt(u, t), y = Yt(c, r);
      bt(a, o, i, n, e, d[0], y[0]), bt(a, o, i, n, e, d[0], y[1]), bt(a, o, i, n, e, d[1], y[0]), bt(a, o, i, n, e, d[1], y[1]);
    }
  }
  return o;
}
function Dr(n, t) {
  const e = n.geometry(), r = e.flat().map((o) => ye([o.x, o.y], n.canonical));
  if (e.length === 0)
    return NaN;
  const i = new me(r[0][1]);
  let s = 1 / 0;
  for (const o of t) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Mt(r, !1, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Mt(r, !1, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, xt(r, !1, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Pr(n, t) {
  const e = n.geometry(), r = e.flat().map((o) => ye([o.x, o.y], n.canonical));
  if (e.length === 0)
    return NaN;
  const i = new me(r[0][1]);
  let s = 1 / 0;
  for (const o of t) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Mt(r, !0, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Mt(r, !0, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, xt(r, !0, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Nr(n, t) {
  const e = n.geometry();
  if (e.length === 0 || e[0].length === 0)
    return NaN;
  const r = On(e).map((o) => o.map((a) => a.map((l) => ye([l.x, l.y], n.canonical)))), i = new me(r[0][0][0][1]);
  let s = 1 / 0;
  for (const o of t)
    for (const a of r) {
      switch (o.type) {
        case "Point":
          s = Math.min(s, xt([o.coordinates], !1, a, i, s));
          break;
        case "LineString":
          s = Math.min(s, xt(o.coordinates, !0, a, i, s));
          break;
        case "Polygon":
          s = Math.min(s, Ar(a, o.coordinates, i, s));
          break;
      }
      if (s === 0)
        return s;
    }
  return s;
}
function _t(n) {
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
    this.type = h, this.geojson = t, this.geometries = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'distance' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (at(t[1])) {
      const r = t[1];
      if (r.type === "FeatureCollection")
        return new Z(r, r.features.map((i) => _t(i.geometry)).flat());
      if (r.type === "Feature")
        return new Z(r, _t(r.geometry));
      if ("type" in r && "coordinates" in r)
        return new Z(r, _t(r));
    }
    return e.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(t) {
    if (t.geometry() != null && t.canonicalID() != null) {
      if (t.geometryType() === "Point")
        return Dr(t, this.geometries);
      if (t.geometryType() === "LineString")
        return Pr(t, this.geometries);
      if (t.geometryType() === "Polygon")
        return Nr(t, this.geometries);
    }
    return NaN;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const we = {
  // special forms
  "==": sr,
  "!=": or,
  ">": lr,
  "<": ar,
  ">=": cr,
  "<=": ur,
  array: N,
  at: ae,
  boolean: N,
  case: ce,
  coalesce: lt,
  collator: zt,
  format: he,
  image: pe,
  in: le,
  "index-of": wt,
  interpolate: P,
  "interpolate-hcl": P,
  "interpolate-lab": P,
  length: de,
  let: Nt,
  literal: tt,
  match: ue,
  number: N,
  "number-format": fe,
  object: N,
  slice: kt,
  step: jt,
  string: N,
  "to-boolean": q,
  "to-color": q,
  "to-number": q,
  "to-string": q,
  var: Lt,
  within: X,
  distance: Z
};
class L {
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
    const r = t[0], i = L.definitions[r];
    if (!i)
      return e.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const s = Array.isArray(i) ? i[0] : i.type, o = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads, a = o.filter(([u]) => !Array.isArray(u) || // varags
    u.length === t.length - 1);
    let l = null;
    for (const [u, c] of a) {
      l = new Pt(e.registry, It, e.path, null, e.scope);
      const f = [];
      let p = !1;
      for (let d = 1; d < t.length; d++) {
        const y = t[d], k = Array.isArray(u) ? u[d - 1] : u.type, M = l.parse(y, 1 + f.length, k);
        if (!M) {
          p = !0;
          break;
        }
        f.push(M);
      }
      if (!p) {
        if (Array.isArray(u) && u.length !== f.length) {
          l.error(`Expected ${u.length} arguments, but found ${f.length} instead.`);
          continue;
        }
        for (let d = 0; d < f.length; d++) {
          const y = Array.isArray(u) ? u[d] : u.type, k = f[d];
          l.concat(d + 1).checkSubtype(y, k.type);
        }
        if (l.errors.length === 0)
          return new L(r, s, c, f);
      }
    }
    if (a.length === 1)
      e.errors.push(...l.errors);
    else {
      const c = (a.length ? a : o).map(([p]) => Fr(p)).join(" | "), f = [];
      for (let p = 1; p < t.length; p++) {
        const d = e.parse(t[p], 1 + f.length);
        if (!d)
          return null;
        f.push(C(d.type));
      }
      e.error(`Expected arguments of type ${c}, but found (${f.join(", ")}) instead.`);
    }
    return null;
  }
  static register(t, e) {
    L.definitions = e;
    for (const r in e)
      t[r] = L;
  }
}
function He(n, [t, e, r, i]) {
  t = t.evaluate(n), e = e.evaluate(n), r = r.evaluate(n);
  const s = i ? i.evaluate(n) : 1, o = en(t, e, r, s);
  if (o)
    throw new x(o);
  return new w(t / 255, e / 255, r / 255, s, !1);
}
function qe(n, t) {
  return n in t;
}
function Xt(n, t) {
  const e = t[n];
  return typeof e > "u" ? null : e;
}
function Lr(n, t, e, r) {
  for (; e <= r; ) {
    const i = e + r >> 1;
    if (t[i] === n)
      return !0;
    t[i] > n ? r = i - 1 : e = i + 1;
  }
  return !1;
}
function W(n) {
  return { type: n };
}
L.register(we, {
  error: [
    $n,
    [b],
    (n, [t]) => {
      throw new x(t.evaluate(n));
    }
  ],
  typeof: [
    b,
    [m],
    (n, [t]) => C(I(t.evaluate(n)))
  ],
  "to-rgba": [
    S(h, 4),
    [j],
    (n, [t]) => {
      const [e, r, i, s] = t.evaluate(n).rgb;
      return [e * 255, r * 255, i * 255, s];
    }
  ],
  rgb: [
    j,
    [h, h, h],
    He
  ],
  rgba: [
    j,
    [h, h, h, h],
    He
  ],
  has: {
    type: g,
    overloads: [
      [
        [b],
        (n, [t]) => qe(t.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [t, e]) => qe(t.evaluate(n), e.evaluate(n))
      ]
    ]
  },
  get: {
    type: m,
    overloads: [
      [
        [b],
        (n, [t]) => Xt(t.evaluate(n), n.properties())
      ],
      [
        [b, Q],
        (n, [t, e]) => Xt(t.evaluate(n), e.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    m,
    [b],
    (n, [t]) => Xt(t.evaluate(n), n.featureState || {})
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
    m,
    [],
    (n) => n.id()
  ],
  zoom: [
    h,
    [],
    (n) => n.globals.zoom
  ],
  "heatmap-density": [
    h,
    [],
    (n) => n.globals.heatmapDensity || 0
  ],
  "line-progress": [
    h,
    [],
    (n) => n.globals.lineProgress || 0
  ],
  accumulated: [
    m,
    [],
    (n) => n.globals.accumulated === void 0 ? null : n.globals.accumulated
  ],
  "+": [
    h,
    W(h),
    (n, t) => {
      let e = 0;
      for (const r of t)
        e += r.evaluate(n);
      return e;
    }
  ],
  "*": [
    h,
    W(h),
    (n, t) => {
      let e = 1;
      for (const r of t)
        e *= r.evaluate(n);
      return e;
    }
  ],
  "-": {
    type: h,
    overloads: [
      [
        [h, h],
        (n, [t, e]) => t.evaluate(n) - e.evaluate(n)
      ],
      [
        [h],
        (n, [t]) => -t.evaluate(n)
      ]
    ]
  },
  "/": [
    h,
    [h, h],
    (n, [t, e]) => t.evaluate(n) / e.evaluate(n)
  ],
  "%": [
    h,
    [h, h],
    (n, [t, e]) => t.evaluate(n) % e.evaluate(n)
  ],
  ln2: [
    h,
    [],
    () => Math.LN2
  ],
  pi: [
    h,
    [],
    () => Math.PI
  ],
  e: [
    h,
    [],
    () => Math.E
  ],
  "^": [
    h,
    [h, h],
    (n, [t, e]) => Math.pow(t.evaluate(n), e.evaluate(n))
  ],
  sqrt: [
    h,
    [h],
    (n, [t]) => Math.sqrt(t.evaluate(n))
  ],
  log10: [
    h,
    [h],
    (n, [t]) => Math.log(t.evaluate(n)) / Math.LN10
  ],
  ln: [
    h,
    [h],
    (n, [t]) => Math.log(t.evaluate(n))
  ],
  log2: [
    h,
    [h],
    (n, [t]) => Math.log(t.evaluate(n)) / Math.LN2
  ],
  sin: [
    h,
    [h],
    (n, [t]) => Math.sin(t.evaluate(n))
  ],
  cos: [
    h,
    [h],
    (n, [t]) => Math.cos(t.evaluate(n))
  ],
  tan: [
    h,
    [h],
    (n, [t]) => Math.tan(t.evaluate(n))
  ],
  asin: [
    h,
    [h],
    (n, [t]) => Math.asin(t.evaluate(n))
  ],
  acos: [
    h,
    [h],
    (n, [t]) => Math.acos(t.evaluate(n))
  ],
  atan: [
    h,
    [h],
    (n, [t]) => Math.atan(t.evaluate(n))
  ],
  min: [
    h,
    W(h),
    (n, t) => Math.min(...t.map((e) => e.evaluate(n)))
  ],
  max: [
    h,
    W(h),
    (n, t) => Math.max(...t.map((e) => e.evaluate(n)))
  ],
  abs: [
    h,
    [h],
    (n, [t]) => Math.abs(t.evaluate(n))
  ],
  round: [
    h,
    [h],
    (n, [t]) => {
      const e = t.evaluate(n);
      return e < 0 ? -Math.round(-e) : Math.round(e);
    }
  ],
  floor: [
    h,
    [h],
    (n, [t]) => Math.floor(t.evaluate(n))
  ],
  ceil: [
    h,
    [h],
    (n, [t]) => Math.ceil(t.evaluate(n))
  ],
  "filter-==": [
    g,
    [b, m],
    (n, [t, e]) => n.properties()[t.value] === e.value
  ],
  "filter-id-==": [
    g,
    [m],
    (n, [t]) => n.id() === t.value
  ],
  "filter-type-==": [
    g,
    [b],
    (n, [t]) => n.geometryDollarType() === t.value
  ],
  "filter-<": [
    g,
    [b, m],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r < i;
    }
  ],
  "filter-id-<": [
    g,
    [m],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e < r;
    }
  ],
  "filter->": [
    g,
    [b, m],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r > i;
    }
  ],
  "filter-id->": [
    g,
    [m],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e > r;
    }
  ],
  "filter-<=": [
    g,
    [b, m],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r <= i;
    }
  ],
  "filter-id-<=": [
    g,
    [m],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e <= r;
    }
  ],
  "filter->=": [
    g,
    [b, m],
    (n, [t, e]) => {
      const r = n.properties()[t.value], i = e.value;
      return typeof r == typeof i && r >= i;
    }
  ],
  "filter-id->=": [
    g,
    [m],
    (n, [t]) => {
      const e = n.id(), r = t.value;
      return typeof e == typeof r && e >= r;
    }
  ],
  "filter-has": [
    g,
    [m],
    (n, [t]) => t.value in n.properties()
  ],
  "filter-has-id": [
    g,
    [],
    (n) => n.id() !== null && n.id() !== void 0
  ],
  "filter-type-in": [
    g,
    [S(b)],
    (n, [t]) => t.value.indexOf(n.geometryDollarType()) >= 0
  ],
  "filter-id-in": [
    g,
    [S(m)],
    (n, [t]) => t.value.indexOf(n.id()) >= 0
  ],
  "filter-in-small": [
    g,
    [b, S(m)],
    // assumes v is an array literal
    (n, [t, e]) => e.value.indexOf(n.properties()[t.value]) >= 0
  ],
  "filter-in-large": [
    g,
    [b, S(m)],
    // assumes v is a array literal with values sorted in ascending order and of a single type
    (n, [t, e]) => Lr(n.properties()[t.value], e.value, 0, e.value.length - 1)
  ],
  all: {
    type: g,
    overloads: [
      [
        [g, g],
        (n, [t, e]) => t.evaluate(n) && e.evaluate(n)
      ],
      [
        W(g),
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
    type: g,
    overloads: [
      [
        [g, g],
        (n, [t, e]) => t.evaluate(n) || e.evaluate(n)
      ],
      [
        W(g),
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
    g,
    [g],
    (n, [t]) => !t.evaluate(n)
  ],
  "is-supported-script": [
    g,
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
    W(m),
    (n, t) => t.map((e) => it(e.evaluate(n))).join("")
  ],
  "resolved-locale": [
    b,
    [$t],
    (n, [t]) => t.evaluate(n).resolvedLocale()
  ]
});
function Fr(n) {
  return Array.isArray(n) ? `(${n.map(C).join(", ")})` : `(${C(n.type)}...)`;
}
function It(n) {
  if (n instanceof Lt)
    return It(n.boundExpression);
  if (n instanceof L && n.name === "error")
    return !1;
  if (n instanceof zt)
    return !1;
  if (n instanceof X)
    return !1;
  if (n instanceof Z)
    return !1;
  const t = n instanceof q || n instanceof N;
  let e = !0;
  return n.eachChild((r) => {
    t ? e = e && It(r) : e = e && r instanceof tt;
  }), e ? ke(n) && xe(n, ["zoom", "heatmap-density", "line-progress", "accumulated", "is-supported-script"]) : !1;
}
function ke(n) {
  if (n instanceof L) {
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
    t && !ke(e) && (t = !1);
  }), t;
}
function Ce(n) {
  if (n instanceof L && n.name === "feature-state")
    return !1;
  let t = !0;
  return n.eachChild((e) => {
    t && !Ce(e) && (t = !1);
  }), t;
}
function xe(n, t) {
  if (n instanceof L && t.indexOf(n.name) >= 0)
    return !1;
  let e = !0;
  return n.eachChild((r) => {
    e && !xe(r, t) && (e = !1);
  }), e;
}
function te(n) {
  return { result: "success", value: n };
}
function Y(n) {
  return { result: "error", value: n };
}
function jr(n) {
  return n["property-type"] === "data-driven" || n["property-type"] === "cross-faded-data-driven";
}
function zr(n) {
  return !!n.expression && n.expression.parameters.indexOf("zoom") > -1;
}
function hn(n) {
  return !!n.expression && n.expression.interpolated;
}
function Me(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function pn(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Br(n) {
  return n;
}
function dn(n, t) {
  const e = t.type === "color", r = n.stops && typeof n.stops[0][0] == "object", i = r || n.property !== void 0, s = r || !i, o = n.type || (hn(t) ? "exponential" : "interval");
  if (e || t.type === "padding") {
    const c = e ? w.parse : $.parse;
    n = _e({}, n), n.stops && (n.stops = n.stops.map((f) => [f[0], c(f[1])])), n.default ? n.default = c(n.default) : n.default = c(t.default);
  }
  if (n.colorSpace && !Bn(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  let a, l, u;
  if (o === "exponential")
    a = Ve;
  else if (o === "interval")
    a = Or;
  else if (o === "categorical") {
    a = Rr, l = /* @__PURE__ */ Object.create(null);
    for (const c of n.stops)
      l[c[0]] = c[1];
    u = typeof n.stops[0][0];
  } else if (o === "identity")
    a = Hr;
  else
    throw new Error(`Unknown function type "${o}"`);
  if (r) {
    const c = {}, f = [];
    for (let y = 0; y < n.stops.length; y++) {
      const k = n.stops[y], M = k[0].zoom;
      c[M] === void 0 && (c[M] = {
        zoom: M,
        type: n.type,
        property: n.property,
        default: n.default,
        stops: []
      }, f.push(M)), c[M].stops.push([k[0].value, k[1]]);
    }
    const p = [];
    for (const y of f)
      p.push([c[y].zoom, dn(c[y], t)]);
    const d = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: d,
      interpolationFactor: P.interpolationFactor.bind(void 0, d),
      zoomStops: p.map((y) => y[0]),
      evaluate({ zoom: y }, k) {
        return Ve({
          stops: p,
          base: n.base
        }, t, y).evaluate(y, k);
      }
    };
  } else if (s) {
    const c = o === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: c,
      interpolationFactor: P.interpolationFactor.bind(void 0, c),
      zoomStops: n.stops.map((f) => f[0]),
      evaluate: ({ zoom: f }) => a(n, t, f, l, u)
    };
  } else
    return {
      kind: "source",
      evaluate(c, f) {
        const p = f && f.properties ? f.properties[n.property] : void 0;
        return p === void 0 ? ht(n.default, t.default) : a(n, t, p, l, u);
      }
    };
}
function ht(n, t, e) {
  if (n !== void 0)
    return n;
  if (t !== void 0)
    return t;
  if (e !== void 0)
    return e;
}
function Rr(n, t, e, r, i) {
  const s = typeof e === i ? r[e] : void 0;
  return ht(s, n.default, t.default);
}
function Or(n, t, e) {
  if (Me(e) !== "number")
    return ht(n.default, t.default);
  const r = n.stops.length;
  if (r === 1 || e <= n.stops[0][0])
    return n.stops[0][1];
  if (e >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const i = Ft(n.stops.map((s) => s[0]), e);
  return n.stops[i][1];
}
function Ve(n, t, e) {
  const r = n.base !== void 0 ? n.base : 1;
  if (Me(e) !== "number")
    return ht(n.default, t.default);
  const i = n.stops.length;
  if (i === 1 || e <= n.stops[0][0])
    return n.stops[0][1];
  if (e >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const s = Ft(n.stops.map((c) => c[0]), e), o = qr(e, r, n.stops[s][0], n.stops[s + 1][0]), a = n.stops[s][1], l = n.stops[s + 1][1], u = Xn[t.type] || Br;
  return typeof a.evaluate == "function" ? {
    evaluate(...c) {
      const f = a.evaluate.apply(void 0, c), p = l.evaluate.apply(void 0, c);
      if (!(f === void 0 || p === void 0))
        return u(f, p, o, n.colorSpace);
    }
  } : u(a, l, o, n.colorSpace);
}
function Hr(n, t, e) {
  switch (t.type) {
    case "color":
      e = w.parse(e);
      break;
    case "formatted":
      e = z.fromString(e.toString());
      break;
    case "resolvedImage":
      e = H.fromString(e.toString());
      break;
    case "padding":
      e = $.parse(e);
      break;
    default:
      Me(e) !== t.type && (t.type !== "enum" || !t.values[e]) && (e = void 0);
  }
  return ht(e, n.default, t.default);
}
function qr(n, t, e, r) {
  const i = r - e, s = n - e;
  return i === 0 ? 0 : t === 1 ? s / i : (Math.pow(t, s) - 1) / (Math.pow(t, i) - 1);
}
class yn {
  constructor(t, e) {
    this.expression = t, this._warningHistory = {}, this._evaluator = new rn(), this._defaultValue = e ? _r(e) : null, this._enumValues = e && e.type === "enum" ? e.values : null;
  }
  evaluateWithoutErrorHandling(t, e, r, i, s, o) {
    return this._evaluator.globals = t, this._evaluator.feature = e, this._evaluator.featureState = r, this._evaluator.canonical = i, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o, this.expression.evaluate(this._evaluator);
  }
  evaluate(t, e, r, i, s, o) {
    this._evaluator.globals = t, this._evaluator.feature = e || null, this._evaluator.featureState = r || null, this._evaluator.canonical = i, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o || null;
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
function gn(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in we;
}
function mn(n, t) {
  const e = new Pt(we, It, [], t ? Ur(t) : void 0), r = e.parse(n, void 0, void 0, void 0, t && t.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? te(new yn(r, t)) : Y(e.errors);
}
class ee {
  constructor(t, e) {
    this.kind = t, this._styleExpression = e, this.isStateDependent = t !== "constant" && !Ce(e.expression);
  }
  evaluateWithoutErrorHandling(t, e, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(t, e, r, i, s, o);
  }
  evaluate(t, e, r, i, s, o) {
    return this._styleExpression.evaluate(t, e, r, i, s, o);
  }
}
class ne {
  constructor(t, e, r, i) {
    this.kind = t, this.zoomStops = r, this._styleExpression = e, this.isStateDependent = t !== "camera" && !Ce(e.expression), this.interpolationType = i;
  }
  evaluateWithoutErrorHandling(t, e, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(t, e, r, i, s, o);
  }
  evaluate(t, e, r, i, s, o) {
    return this._styleExpression.evaluate(t, e, r, i, s, o);
  }
  interpolationFactor(t, e, r) {
    return this.interpolationType ? P.interpolationFactor(this.interpolationType, t, e, r) : 0;
  }
}
function Vr(n) {
  return n._styleExpression !== void 0;
}
function bn(n, t) {
  const e = mn(n, t);
  if (e.result === "error")
    return e;
  const r = e.value.expression, i = ke(r);
  if (!i && !jr(t))
    return Y([new F("", "data expressions not supported")]);
  const s = xe(r, ["zoom"]);
  if (!s && !zr(t))
    return Y([new F("", "zoom expressions not supported")]);
  const o = vt(r);
  if (!o && !s)
    return Y([new F("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
  if (o instanceof F)
    return Y([o]);
  if (o instanceof P && !hn(t))
    return Y([new F("", '"interpolate" expressions cannot be used with this property')]);
  if (!o)
    return te(i ? new ee("constant", e.value) : new ee("source", e.value));
  const a = o instanceof P ? o.interpolation : void 0;
  return te(i ? new ne("camera", e.value, o.labels, a) : new ne("composite", e.value, o.labels, a));
}
class Rt {
  constructor(t, e) {
    this._parameters = t, this._specification = e, _e(this, dn(this._parameters, this._specification));
  }
  static deserialize(t) {
    return new Rt(t._parameters, t._specification);
  }
  static serialize(t) {
    return {
      _parameters: t._parameters,
      _specification: t._specification
    };
  }
}
function Wr(n, t) {
  if (pn(n))
    return new Rt(n, t);
  if (gn(n)) {
    const e = bn(n, t);
    if (e.result === "error")
      throw new Error(e.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return e.value;
  } else {
    let e = n;
    return t.type === "color" && typeof n == "string" ? e = w.parse(n) : t.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? e = $.parse(n) : t.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? e = D.parse(n) : t.type === "projectionDefinition" && typeof n == "string" && (e = A.parse(n)), {
      kind: "constant",
      evaluate: () => e
    };
  }
}
function vt(n) {
  let t = null;
  if (n instanceof Nt)
    t = vt(n.result);
  else if (n instanceof lt) {
    for (const e of n.args)
      if (t = vt(e), t)
        break;
  } else (n instanceof jt || n instanceof P) && n.input instanceof L && n.input.name === "zoom" && (t = n);
  return t instanceof F || n.eachChild((e) => {
    const r = vt(e);
    r instanceof F ? t = r : !t && r ? t = new F("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : t && r && t !== r && (t = new F("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), t;
}
function Ur(n) {
  const t = {
    color: j,
    string: b,
    number: h,
    enum: b,
    boolean: g,
    formatted: St,
    padding: At,
    projectionDefinition: Tt,
    resolvedImage: ct,
    variableAnchorOffsetCollection: Dt
  };
  return n.type === "array" ? S(t[n.value] || m, n.length) : t[n.type];
}
function _r(n) {
  return n.type === "color" && pn(n.default) ? new w(0, 0, 0, 0) : n.type === "color" ? w.parse(n.default) || null : n.type === "padding" ? $.parse(n.default) || null : n.type === "variableAnchorOffsetCollection" ? D.parse(n.default) || null : n.type === "projectionDefinition" ? A.parse(n.default) || null : n.default === void 0 ? null : n.default;
}
function vn(n) {
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
        if (!vn(t) && typeof t != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const Xr = {
  StyleExpression: yn,
  StylePropertyFunction: Rt,
  ZoomConstantExpression: ee,
  ZoomDependentExpression: ne,
  createExpression: mn,
  createPropertyExpression: bn,
  isExpression: gn,
  isExpressionFilter: vn,
  isZoomExpression: Vr,
  normalizePropertyExpression: Wr
};
class Qr {
  constructor(t, e) {
    v(this, "map");
    v(this, "options");
    v(this, "colorSteps");
    v(this, "container");
    v(this, "outContainer");
    v(this, "titleDiv");
    v(this, "unitDiv");
    v(this, "legendItems", []);
    v(this, "propertySpec");
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
      ...e
      // Override with user-provided options
    }, this.colorSteps = this.getColorSteps();
    const { outContainer: r, innerContainer: i } = this.createContainer();
    this.outContainer = r, this.container = i, this.titleDiv = this.createTitleDiv(this.options.title), this.unitDiv = this.createUnitDiv(this.options.unit), this.container.appendChild(this.titleDiv), this.container.appendChild(this.unitDiv);
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
    t.classList.add("maplibregl-ctrl"), t.style.height = "100%", t.style.display = "flex", t.style.flexDirection = "column", t.style.alignItems = "center", t.style.backgroundColor = "transparent";
    const e = (i = this.options.position) != null && i.endsWith("left") ? "map-colorbar-left-group" : "map-colorbar-right-group", r = document.createElement("div");
    return r.classList.add(e), r.style.width = this.getWidth(), r.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`, r.style.backgroundColor = "rgba(0, 36, 71, 0.8)", r.style.display = "flex", r.style.flexDirection = "column", r.style.borderRadius = "10px", t.appendChild(r), { outContainer: t, innerContainer: r };
  }
  createTitleDiv(t) {
    const e = document.createElement("div");
    return e.innerHTML = t, e.style.marginTop = "6px", e.style.marginBottom = "8px", e.style.display = "flex", e.style.justifyContent = "center", e.style.textAlign = "center", e.style.fontSize = "11px", e.style.lineHeight = "14px", e.style.color = "white", e.style.width = this.getWidth(), e;
  }
  createUnitDiv(t) {
    const e = document.createElement("div");
    return e.classList.add("map_colorbar_unit"), e.innerHTML = `(${t})`, e.style.marginTop = "8px", e.style.width = this.getWidth(), e.style.display = "flex", e.style.justifyContent = "center", e.style.color = "white", e.style.fontSize = "12px", e.style.textAlign = "center", e;
  }
  createColorBox(t) {
    const e = document.createElement("div");
    return e.classList.add("map_colorbar_color_box"), e.style.width = "12px", e.style.backgroundColor = t, e;
  }
  createLabel(t) {
    const e = document.createElement("div");
    return e.classList.add("map_colorbar_label"), e.style.marginTop = "0px", e.style.marginLeft = "0px", e.style.marginRight = "2px", e.style.color = "white", e.style.fontSize = "9px", e.textContent = "", e;
  }
  initializeLegendItems() {
    this.colorSteps.forEach(({ speed: t, color: e }) => {
      const r = document.createElement("div");
      r.classList.add("map_colorbar_item"), r.style.display = "flex", r.style.alignItems = "center", r.style.marginBottom = "0px", r.style.marginTop = "0px", r.style.marginLeft = "10px";
      const i = this.createColorBox(e), s = this.createLabel({ speed: t, color: e });
      r.appendChild(i), r.appendChild(s), this.legendItems.push(r), this.container.insertBefore(r, this.unitDiv);
    });
  }
  calculateHeights() {
    const t = this.getHeightInPixels(), i = (this.container.getBoundingClientRect().height ? this.container.getBoundingClientRect().height : t) - this.titleDiv.offsetHeight - this.unitDiv.offsetHeight - 22, s = Math.max(Math.floor(i / this.colorSteps.length), 5), o = Math.ceil(20 * this.colorSteps.length / i);
    return { stepHeight: s, showInterval: o };
  }
  update() {
    this.updateInnerContainerStyle(this.outContainer, this.container);
    const { stepHeight: t, showInterval: e } = this.calculateHeights();
    let r = this.colorSteps.length - 1;
    [...this.legendItems].reverse().forEach((i, s) => {
      const o = i.querySelector(".map_colorbar_color_box"), a = i.querySelector(".map_colorbar_label"), l = s === 0 ? t + 3 : t;
      i.style.height = `${t}px`, o.style.height = `${l}px`;
      let u = this.colorSteps.length - 1 - s;
      const c = this.colorSteps[u].speed, f = this.colorSteps[r].speed, p = Math.abs(c - f);
      (this.getTickMinStep() == 0 && e > 0 && s % e !== 0 || p < this.getTickMinStep()) && u < r ? a.textContent = "" : (a.textContent = `- ${c.toFixed(this.options.decimal)}`, r = u, a.style.marginTop = `${t}px`);
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
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), (t = this.outContainer.parentNode) == null || t.removeChild(this.outContainer), this.map = void 0;
  }
  refresh() {
  }
  getDefaultPosition() {
    return this.options.position || "top-left";
  }
  updateInnerContainerStyle(t, e) {
    var p;
    if (!this.map)
      return;
    const r = this.map.getContainer(), i = r.offsetWidth, s = r.offsetHeight;
    t.style.height = `${s}px`;
    let o = 10, a = 10, l = Math.max(
      10,
      parseFloat(
        getComputedStyle(r).getPropertyValue("env(safe-area-inset-left)") || "0"
      )
    ), u = Math.max(
      10,
      parseFloat(
        getComputedStyle(r).getPropertyValue("env(safe-area-inset-right)") || "0"
      )
    ), c = l, f = u;
    i >= 480 && (o = 15, a = 15, c = Math.max(15, l), f = Math.max(15, u)), i >= 992 && s >= 992 && (o = 40, a = 40, c = Math.max(40, l), f = Math.max(40, u)), (p = this.options.position) != null && p.endsWith("left") ? (e.style.marginLeft = `${c}px`, e.style.marginRight = `${u}px`) : (e.style.marginLeft = `${l}px`, e.style.marginRight = `${f}px`), e.style.marginTop = `${o}px`, e.style.marginBottom = `${a}px`, e.style.alignItems = "flex-start", e.style.display = "flex", e.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;
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
    const i = [], [, , s, ...o] = e, a = ((l = this.options) == null ? void 0 : l.max) || 30;
    i.push({ speed: 0, color: s });
    for (let u = 0; u < o.length; u += 2) {
      const f = o[u] * a, p = o[u + 1];
      i.push({ speed: f, color: p });
    }
    return i.sort((u, c) => c.speed - u.speed);
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
    const i = Xr.createPropertyExpression(e, r);
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
class Kr {
  constructor(t) {
    v(this, "map");
    v(this, "options");
    v(this, "container");
    v(this, "outContainer");
    this.options = {
      position: "top-left",
      width: "146px",
      // Default width
      height: "24px",
      // Default width
      ...t
      // Override with user-provided options
    };
    const { outContainer: e, innerContainer: r } = this.createContainer();
    this.outContainer = e, this.container = r;
  }
  getWidth() {
    return this.options.width || "146px";
  }
  getHeight() {
    return this.options.height || "24px";
  }
  // Create the control's container elements
  createContainer() {
    const t = document.createElement("div");
    t.className = "maplibregl-ctrl maplibregl-ctrl-msg";
    const e = document.createElement("div");
    return e.style.width = this.getWidth(), e.style.height = this.getHeight(), e.style.backgroundColor = "rgba(0, 36, 71, 0.7)", e.style.padding = "5px 10px", e.style.borderRadius = "3px", e.style.fontFamily = "Arial, sans-serif", e.style.fontSize = "14px", this.options.innerHTML ? e.innerHTML = this.options.innerHTML : this.options.msg && (e.textContent = this.options.msg), this.options.style && Object.assign(e.style, this.options.style), t.appendChild(e), { outContainer: t, innerContainer: e };
  }
  updateInnerContainerStyle() {
    var c;
    if (!this.map)
      return;
    const t = this.map.getContainer(), e = t.offsetWidth, r = t.offsetHeight;
    let i = 10, s = 10, o = Math.max(
      10,
      parseFloat(
        getComputedStyle(t).getPropertyValue("env(safe-area-inset-left)") || "0"
      )
    ), a = Math.max(
      10,
      parseFloat(
        getComputedStyle(t).getPropertyValue("env(safe-area-inset-right)") || "0"
      )
    ), l = o, u = a;
    e >= 480 && (i = 15, s = 15, l = Math.max(15, o), u = Math.max(15, a)), e >= 992 && r >= 992 && (l = Math.max(40, o), u = Math.max(40, a)), (c = this.options.position) != null && c.endsWith("left") ? (this.container.style.marginLeft = `${l}px`, this.container.style.marginRight = `${a}px`) : (this.container.style.marginLeft = `${o}px`, this.container.style.marginRight = `${u}px`), this.container.style.marginTop = `${i}px`, this.container.style.marginBottom = `${s}px`;
  }
  update() {
    this.updateInnerContainerStyle();
  }
  onAdd(t) {
    return this.map = t, t.getContainer().appendChild(this.outContainer), this.update(), this.map.once("styledata", () => {
      this.refresh();
    }), this.map.on("resize", () => {
      this.update();
    }), this.outContainer;
  }
  onRemove() {
    var t;
    this.map && (this.map.off("resize", this.update), this.map.off("styledata", this.refresh)), (t = this.outContainer.parentNode) == null || t.removeChild(this.outContainer), this.map = void 0;
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
  getDefaultPosition() {
    return this.options.position || "top-left";
  }
}
const re = 20, We = 6, Zr = 4, Ue = 4, Gr = (n) => {
  const t = document.createElement("img");
  return t.src = `data:image/svg+xml,${encodeURIComponent(n)}`, t.style.width = `${re}px`, t.style.height = `${re}px`, t.style.color = "white", t;
};
class ti {
  constructor(t) {
    v(this, "map");
    v(this, "container");
    v(this, "outContainer");
    v(this, "options");
    v(this, "defaultActiveId");
    v(this, "activeButtonId", null);
    v(this, "buttons", /* @__PURE__ */ new Map());
    this.options = t;
    const { outContainer: e, container: r } = this.createContainer();
    this.outContainer = e, this.container = r, this.defaultActiveId = this.options.defaultActive;
  }
  // Create the outer container for the control
  createContainer() {
    const t = document.createElement("div");
    t.classList.add("maplibregl-ctrl"), t.style.height = "100%", t.style.display = "flex", t.style.flexDirection = "column", t.style.alignItems = "center", t.style.backgroundColor = "transparent";
    const e = document.createElement("div");
    return e.classList.add("maplibregl-ctrl", "maplibregl-ctrl-group"), e.style.backgroundColor = "transparent", e.style.padding = "5px", e.style.border = "transparent", e.style.boxShadow = "none", e.style.borderRadius = "4px", e.style.display = "flex", e.style.flexDirection = "column", e.style.gap = "4px", this.options.buttons.forEach((r) => {
      const i = this.createButton(r);
      e.appendChild(i), this.buttons.set(r.id, i);
    }), this.container = e, this.updateLayout(), t.appendChild(this.container), { outContainer: t, container: e };
  }
  updateInnerContainerStyle() {
    var c;
    if (!this.map)
      return;
    const t = this.map.getContainer(), e = t.offsetWidth, r = t.offsetHeight;
    this.outContainer.style.height = `${r}px`;
    let i = 10, s = 10, o = Math.max(
      10,
      parseFloat(
        getComputedStyle(t).getPropertyValue("env(safe-area-inset-left)") || "0"
      )
    ), a = Math.max(
      10,
      parseFloat(
        getComputedStyle(t).getPropertyValue("env(safe-area-inset-right)") || "0"
      )
    ), l = o, u = a;
    e >= 480 && (i = 15, s = 15, l = Math.max(15, o), u = Math.max(15, a)), r >= 992 && (i = 40, s = 40), e >= 992 && (l = Math.max(40, o), u = Math.max(40, a)), (c = this.options.position) != null && c.endsWith("left") ? (this.container.style.marginLeft = `${l}px`, this.container.style.marginRight = `${a}px`) : (this.container.style.marginLeft = `${o}px`, this.container.style.marginRight = `${u}px`), this.container.style.marginTop = `${i}px`, this.container.style.marginBottom = `${s}px`, this.container.style.alignItems = "flex-start", this.container.style.display = "flex", this.updateLayout();
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
  calculateFontSize(t, e, r = 12, i = 6) {
    const s = t - re - We * 2 - Ue, o = e.replace(/<[^>]+>/g, "").length;
    if (o === 0) return;
    let l = Math.floor(s / (o * 0.5));
    return l = Math.min(r, Math.max(i, l)), l;
  }
  // Create a single button with icon and label
  createButton(t) {
    const e = document.createElement("button");
    e.style.display = "flex", e.style.alignItems = "center", e.style.gap = `${Ue}px`, e.style.padding = `${Zr}px ${We}px`, e.style.border = "none", e.style.cursor = "pointer", e.style.borderRadius = "4px", e.style.width = "fit-content", e.style.color = "white", e.style.backgroundColor = "rgba(0, 36, 71, 0.6)";
    const r = Gr(t.svg);
    e.appendChild(r);
    const i = document.createElement("span");
    return i.textContent = t.label, i.style.fontSize = "10px", i.style.color = "inherit", e.appendChild(i), e.onclick = () => this.handleButtonClick(t), e;
  }
  // Handle button click event
  handleButtonClick(t) {
    if (this.activeButtonId === t.id && !t.repeat)
      return;
    const e = this.activeButtonId;
    if (t.repeat || (this.activeButtonId = t.id), e && e !== this.activeButtonId && this.map) {
      const r = this.options.buttons.find((i) => i.id === e);
      r && this.options.onUntoggle && this.options.onUntoggle(this, this.map, r);
    }
    this.buttons.forEach((r, i) => {
      i === this.activeButtonId ? r.style.backgroundColor = "rgba(0, 36, 71, 0.98)" : r.style.backgroundColor = "rgba(0, 36, 71, 0.6)";
    }), this.map && this.options.onToggle && this.options.onToggle(this, this.map, t);
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
    return this.container;
  }
  // Remove control from the map
  onRemove() {
    var t;
    this.map && (this.map.off("resize", this.updateInnerContainerStyle), this.map.off("styledata", this.updateInnerContainerStyle)), this.options.buttons.forEach((e) => {
      e.cleanup && e.cleanup(this, this.map);
    }), (t = this.container.parentNode) == null || t.removeChild(this.container), this.map = void 0;
  }
  // Default position of the control
  getDefaultPosition() {
    return "top-right";
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
    const s = r.querySelector("img");
    s && e.svg && (s.src = `data:image/svg+xml,${encodeURIComponent(e.svg)}`);
    const o = r.querySelector("span");
    o && e.label && (o.textContent = e.label), this.updateLayout();
  }
  // Update a all button configs
  updateButtonCallback(t) {
    t.forEach((e) => {
      const r = e.id || "", i = this.buttons.get(r), s = this.options.buttons.find((o) => o.id === r);
      !i || !s || Object.assign(s, e);
    });
  }
}
export {
  Qr as ColorBar,
  Kr as MsgCtl,
  Yr as TemporalControl,
  ti as ToggleCtl
};
//# sourceMappingURL=index.js.map
