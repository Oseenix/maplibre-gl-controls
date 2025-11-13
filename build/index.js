(function(){"use strict";try{if(typeof document<"u"){var r=document.createElement("style");r.appendChild(document.createTextNode('.layer-manager{font-family:var(--rp-mctl-font-family);color:var(--rp-mctl-text, #333);border:1px solid var(--rp-mctl-border, #ddd)}.layer-manager:has(.layer-manager-panel:not([style*="display: none"])){max-width:300px;min-width:180px}.layer-manager:has(.layer-manager-panel[style*="display: none"]){width:auto;min-width:auto}.layer-manager-toggle svg{display:block;width:20px;height:20px;color:currentColor}.layer-manager-title{background:var(--rp-mctl-background, white);display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:4px;font-weight:100;margin-bottom:8px}.layer-manager-header{display:flex;align-items:center}.layer-manager-header.left{justify-content:flex-start}.layer-manager-header.right{justify-content:flex-end}.layer-manager-panel{background:var(--rp-mctl-background, white);max-height:calc(100vh - 120px);overflow-y:auto;padding:10px}.layer-manager-section{background:var(--rp-mctl-background, white);border-radius:var(--rp-mctl-radius-sm, 4px);padding:6px 8px}.layer-manager-title{display:flex;align-items:center;justify-content:space-between;padding:8px;background:var(--rp-mctl-background, #f8f9fa);border-radius:var(--rp-mctl-radius-sm, 4px);font-weight:600;margin-bottom:8px;color:var(--rp-mctl-text, #333)}.layer-manager-title span{margin-right:6px}.layer-manager-list{display:flex;flex-direction:column;gap:6px}.layer-manager-item{background:var(--rp-mctl-background, white);border:1px solid var(--rp-mctl-borderLight, #e0e0e0);border-radius:var(--rp-mctl-radius-sm, 4px);padding:10px;transition:all .2s;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto auto;gap:8px;align-items:center}.layer-manager-item:hover{box-shadow:var(--rp-mctl-shadow-sm, 0 2px 4px rgba(0, 0, 0, .1))}.layer-manager-checkbox{cursor:pointer;width:16px;height:16px;flex-shrink:0;grid-column:2;grid-row:1}.layer-manager-label{cursor:pointer;-webkit-user-select:none;user-select:none;font-weight:500;color:var(--rp-mctl-text, #333);min-width:0;grid-column:3;grid-row:1}.layer-manager-fieldset{border:1px solid var(--rp-mctl-borderLight, #ccc);border-radius:var(--rp-mctl-radius-md, 6px);padding:8px 12px 10px;margin:6px 0;position:relative}.layer-manager-legend{font-weight:300;color:var(--rp-mctl-text, #333);padding:0 6px}.layer-manager-select,.layer-manager-radio-group{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}.layer-manager-radio-label{display:flex;align-items:center;gap:10px;color:var(--rp-mctl-text, #333)}.layer-manager-value{min-width:45px;text-align:right;font-family:monospace;color:var(--rp-mctl-text, #666);background:var(--rp-mctl-buttonBackground, white);padding:4px 8px;border-radius:var(--rp-mctl-radius-sm, 3px);border:1px solid var(--rp-mctl-borderLight, #dee2e6)}.layer-manager-panel::-webkit-scrollbar{width:8px}.layer-manager-panel::-webkit-scrollbar-track{background:var(--rp-mctl-borderLight, #f1f1f1);border-radius:var(--rp-mctl-radius-sm, 4px)}.layer-manager-panel::-webkit-scrollbar-thumb{background:var(--rp-mctl-border, #c1c1c1);border-radius:var(--rp-mctl-radius-sm, 4px)}.layer-manager-panel::-webkit-scrollbar-thumb:hover{background:var(--rp-mctl-buttonHover, #a1a1a1)}@media (max-width: 600px){.layer-manager{max-width:280px;min-width:250px}}')),document.head.appendChild(r)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
var Tn = Object.defineProperty;
var Sn = (n, e, t) => e in n ? Tn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => Sn(n, typeof e != "symbol" ? e + "" : e, t);
const $n = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>', Pn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>', Nn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>', Ln = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-backward</title><path d="M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12" /></svg>', An = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>skip-forward</title><path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" /></svg>', me = "rgb(204, 204, 204)", se = (n) => {
  const e = document.createElement("img");
  return e.src = `data:image/svg+xml,${encodeURIComponent(n)}`, e.style.width = "24px", e.style.height = "24px", e;
};
let be;
const Dn = ({
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
    u.style.backgroundColor = H ? me : "";
  }, l = () => u.style.backgroundColor === me, u = document.createElement("button");
  u.appendChild(se(Nn)), u.style.border = "0", u.style.borderRadius = "0", u.style.marginRight = "16px", u.style.height = "24px", u.style.borderRadius = "4px", u.onclick = () => a(!l()), o.appendChild(u);
  const c = () => (s.value = String(Math.max(0, Number(s.value) - 1)), t(), Number(s.min) < Number(s.value)), f = () => {
    if (u.style.backgroundColor !== "" && Number(s.value) == Number(s.max))
      for (; c(); )
        ;
    else
      s.value = String(
        Math.min(Number(s.max), Number(s.value) + 1)
      );
    return t(), Number(s.value) < Number(s.max);
  }, p = document.createElement("button");
  p.appendChild(se(Ln)), p.onclick = c, p.style.border = "0", p.style.height = "24px", p.style.borderRadius = "4px";
  const d = () => {
    be !== void 0 && (clearInterval(be), be = void 0, y.onclick = null, T.style.backgroundColor = "");
  }, y = document.createElement("button");
  y.appendChild(se($n)), y.style.border = "0", y.style.height = "24px", y.style.borderRadius = "4px", y.onclick = d;
  const C = () => T.style.backgroundColor === me, E = () => {
    C() || (T.style.backgroundColor = me, be = setInterval(() => {
      f();
    }, e));
  }, T = document.createElement("button");
  T.appendChild(se(Pn)), T.style.border = "0", T.style.height = "24px", T.style.borderRadius = "4px", T.onclick = E;
  const S = document.createElement("button");
  return S.appendChild(se(An)), S.style.border = "0", S.style.height = "24px", S.style.borderRadius = "4px", S.onclick = f, o.appendChild(p), o.appendChild(y), o.appendChild(T), o.appendChild(S), r.appendChild(o), {
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
class ci {
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
      isLoopEnabled: p,
      setLoopEnabled: d
    } = Dn(r);
    this.container = i, this.containerTitle = s, this.temporalSlider = o, this.next = a, this.prev = l, this.play = u, this.pause = c, this.isPlaying = f, this.isLoopEnabled = p, this.setLoopEnabled = d, this.goto = (y) => {
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
class ot {
  constructor(e, t = []) {
    this.parent = e, this.bindings = {};
    for (const [r, i] of t)
      this.bindings[r] = i;
  }
  concat(e) {
    return new ot(this, e);
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
const $e = { kind: "null" }, h = { kind: "number" }, v = { kind: "string" }, m = { kind: "boolean" }, z = { kind: "color" }, Pe = { kind: "projectionDefinition" }, K = { kind: "object" }, b = { kind: "value" }, Fn = { kind: "error" }, Ne = { kind: "collator" }, Le = { kind: "formatted" }, Ae = { kind: "padding" }, pe = { kind: "resolvedImage" }, De = { kind: "variableAnchorOffsetCollection" };
function P(n, e) {
  return {
    kind: "array",
    itemType: n,
    N: e
  };
}
function k(n) {
  if (n.kind === "array") {
    const e = k(n.itemType);
    return typeof n.N == "number" ? `array<${e}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${e}>`;
  } else
    return n.kind;
}
const Bn = [
  $e,
  h,
  v,
  m,
  z,
  Pe,
  Le,
  K,
  P(b),
  Ae,
  pe,
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
  return `Expected ${k(n)} but found ${k(e)} instead.`;
}
function at(n, e) {
  return e.some((t) => t.kind === n.kind);
}
function G(n, e) {
  return e.some((t) => t === "null" ? n === null : t === "array" ? Array.isArray(n) : t === "object" ? n && !Array.isArray(n) && typeof n == "object" : t === typeof n);
}
function J(n, e) {
  return n.kind === "array" && e.kind === "array" ? n.itemType.kind === e.itemType.kind && typeof n.N == "number" : n.kind === e.kind;
}
const Xt = 0.96422, Zt = 1, Jt = 0.82521, Yt = 4 / 29, ee = 6 / 29, Qt = 3 * ee * ee, zn = ee * ee * ee, jn = Math.PI / 180, Rn = 180 / Math.PI;
function Kt(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function en([n, e, t, r]) {
  n = qe(n), e = qe(e), t = qe(t);
  let i, s;
  const o = Ue((0.2225045 * n + 0.7168786 * e + 0.0606169 * t) / Zt);
  n === e && e === t ? i = s = o : (i = Ue((0.4360747 * n + 0.3850649 * e + 0.1430804 * t) / Xt), s = Ue((0.0139322 * n + 0.0971045 * e + 0.7141733 * t) / Jt));
  const a = 116 * o - 16;
  return [a < 0 ? 0 : a, 500 * (i - o), 200 * (o - s), r];
}
function qe(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function Ue(n) {
  return n > zn ? Math.pow(n, 1 / 3) : n / Qt + Yt;
}
function tn([n, e, t, r]) {
  let i = (n + 16) / 116, s = isNaN(e) ? i : i + e / 500, o = isNaN(t) ? i : i - t / 200;
  return i = Zt * We(i), s = Xt * We(s), o = Jt * We(o), [
    Ve(3.1338561 * s - 1.6168667 * i - 0.4906146 * o),
    // D50 -> sRGB
    Ve(-0.9787684 * s + 1.9161415 * i + 0.033454 * o),
    Ve(0.0719453 * s - 0.2289914 * i + 1.4052427 * o),
    r
  ];
}
function Ve(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function We(n) {
  return n > ee ? n * n * n : Qt * (n - Yt);
}
function Hn(n) {
  const [e, t, r, i] = en(n), s = Math.sqrt(t * t + r * r);
  return [Math.round(s * 1e4) ? Kt(Math.atan2(r, t) * Rn) : NaN, s, e, i];
}
function _n([n, e, t, r]) {
  return n = isNaN(n) ? 0 : n * jn, tn([t, Math.cos(n) * e, Math.sin(n) * e, r]);
}
function On([n, e, t, r]) {
  n = Kt(n), e /= 100, t /= 100;
  function i(s) {
    const o = (s + n / 30) % 12, a = e * Math.min(t, 1 - t);
    return t - a * Math.max(-1, Math.min(o - 3, 9 - o, 1));
  }
  return [i(0), i(8), i(4), r];
}
function qn(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const e = Un[n];
  if (e) {
    const [i, s, o] = e;
    return [i / 255, s / 255, o / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const s = n.length < 6 ? 1 : 2;
    let o = 1;
    return [
      ve(n.slice(o, o += s)),
      ve(n.slice(o, o += s)),
      ve(n.slice(o, o += s)),
      ve(n.slice(o, o + s) || "ff")
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
        C,
        // ,|/       (optional)
        E,
        // <numeric> (optional)
        T
        // %         (optional)
      ] = s, S = [u || " ", p || " ", C].join("");
      if (S === "  " || S === "  /" || S === ",," || S === ",,,") {
        const H = [l, f, y].join(""), ge = H === "%%%" ? 100 : H === "" ? 255 : 0;
        if (ge) {
          const St = [
            Y(+a / ge, 0, 1),
            Y(+c / ge, 0, 1),
            Y(+d / ge, 0, 1),
            E ? $t(+E, T) : 1
          ];
          if (Pt(St))
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
        Y(+a, 0, 100),
        Y(+u, 0, 100),
        f ? $t(+f, p) : 1
      ];
      if (Pt(y))
        return On(y);
    }
  }
}
function ve(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function $t(n, e) {
  return Y(e ? n / 100 : n, 0, 1);
}
function Y(n, e, t) {
  return Math.min(Math.max(e, n), t);
}
function Pt(n) {
  return !n.some(Number.isNaN);
}
const Un = {
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
function U(n, e, t) {
  return n + t * (e - n);
}
function ue(n, e, t) {
  return n.map((r, i) => U(r, e[i], t));
}
function Vn(n) {
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
    if (e instanceof w)
      return e;
    if (typeof e != "string")
      return;
    const t = qn(e);
    if (t)
      return new w(...t, !1);
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
    return this.overwriteGetter("hcl", Hn(this.rgb));
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
        const [s, o, a, l] = ue(e.rgb, t.rgb, r);
        return new w(s, o, a, l, !1);
      }
      case "hcl": {
        const [s, o, a, l] = e.hcl, [u, c, f, p] = t.hcl;
        let d, y;
        if (!isNaN(s) && !isNaN(u)) {
          let H = u - s;
          u > s && H > 180 ? H -= 360 : u < s && s - u > 180 && (H += 360), d = s + r * H;
        } else isNaN(s) ? isNaN(u) ? d = NaN : (d = u, (a === 1 || a === 0) && (y = c)) : (d = s, (f === 1 || f === 0) && (y = o));
        const [C, E, T, S] = _n([
          d,
          y ?? U(o, c, r),
          U(a, f, r),
          U(l, p, r)
        ]);
        return new w(C, E, T, S, !1);
      }
      case "lab": {
        const [s, o, a, l] = tn(ue(e.lab, t.lab, r));
        return new w(s, o, a, l, !1);
      }
    }
  }
}
w.black = new w(0, 0, 0, 1);
w.white = new w(1, 1, 1, 1);
w.transparent = new w(0, 0, 0, 0);
w.red = new w(1, 0, 0, 1);
class lt {
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
  constructor(e, t, r, i, s) {
    this.text = e, this.image = t, this.scale = r, this.fontStack = i, this.textColor = s;
  }
}
class j {
  constructor(e) {
    this.sections = e;
  }
  static fromString(e) {
    return new j([new Ye(e, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((e) => e.text.length !== 0 || e.image && e.image.name.length !== 0);
  }
  static factory(e) {
    return e instanceof j ? e : j.fromString(e);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((e) => e.text).join("");
  }
}
class $ {
  constructor(e) {
    this.values = e.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(e) {
    if (e instanceof $)
      return e;
    if (typeof e == "number")
      return new $([e, e, e, e]);
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
      return new $(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, r) {
    return new $(ue(e.values, t.values, r));
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
const Wn = /* @__PURE__ */ new Set(["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]);
class L {
  constructor(e) {
    this.values = e.slice();
  }
  static parse(e) {
    if (e instanceof L)
      return e;
    if (!(!Array.isArray(e) || e.length < 1 || e.length % 2 !== 0)) {
      for (let t = 0; t < e.length; t += 2) {
        const r = e[t], i = e[t + 1];
        if (typeof r != "string" || !Wn.has(r) || !Array.isArray(i) || i.length !== 2 || typeof i[0] != "number" || typeof i[1] != "number")
          return;
      }
      return new L(e);
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
      o.push([U(l, c, r), U(u, f, r)]);
    }
    return new L(o);
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
function nn(n, e, t, r) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof e == "number" && e >= 0 && e <= 255 && typeof t == "number" && t >= 0 && t <= 255 ? typeof r > "u" || typeof r == "number" && r >= 0 && r <= 1 ? null : `Invalid rgba value [${[n, e, t, r].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof r == "number" ? [n, e, t, r] : [n, e, t]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function ce(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof N || n instanceof w || n instanceof lt || n instanceof j || n instanceof $ || n instanceof L || n instanceof O)
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
function I(n) {
  if (n === null)
    return $e;
  if (typeof n == "string")
    return v;
  if (typeof n == "boolean")
    return m;
  if (typeof n == "number")
    return h;
  if (n instanceof w)
    return z;
  if (n instanceof N)
    return Pe;
  if (n instanceof lt)
    return Ne;
  if (n instanceof j)
    return Le;
  if (n instanceof $)
    return Ae;
  if (n instanceof L)
    return De;
  if (n instanceof O)
    return pe;
  if (Array.isArray(n)) {
    const e = n.length;
    let t;
    for (const r of n) {
      const i = I(r);
      if (!t)
        t = i;
      else {
        if (t === i)
          continue;
        t = b;
        break;
      }
    }
    return P(t || b, e);
  } else
    return K;
}
function oe(n) {
  const e = typeof n;
  return n === null ? "" : e === "string" || e === "number" || e === "boolean" ? String(n) : n instanceof w || n instanceof N || n instanceof j || n instanceof $ || n instanceof L || n instanceof O ? n.toString() : JSON.stringify(n);
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
    let i = I(r);
    const s = t.expectedType;
    return i.kind === "array" && i.N === 0 && s && s.kind === "array" && (typeof s.N != "number" || s.N === 0) && (i = s), new ne(i, r);
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
const we = {
  string: v,
  number: h,
  boolean: m,
  object: K
};
class D {
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
        if (typeof u != "string" || !(u in we) || u === "object")
          return t.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = we[u], r++;
      } else
        a = b;
      let l;
      if (e.length > 3) {
        if (e[2] !== null && (typeof e[2] != "number" || e[2] < 0 || e[2] !== Math.floor(e[2])))
          return t.error('The length argument to "array" must be a positive integer literal', 2);
        l = e[2], r++;
      }
      i = P(a, l);
    } else {
      if (!we[s])
        throw new Error(`Types doesn't contain name = ${s}`);
      i = we[s];
    }
    const o = [];
    for (; r < e.length; r++) {
      const a = t.parse(e[r], r, b);
      if (!a)
        return null;
      o.push(a);
    }
    return new D(i, o);
  }
  evaluate(e) {
    for (let t = 0; t < this.args.length; t++) {
      const r = this.args[t].evaluate(e);
      if (le(this.type, I(r))) {
        if (t === this.args.length - 1)
          throw new M(`Expected value to be of type ${k(this.type)}, but found ${k(I(r))} instead.`);
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
const Nt = {
  "to-boolean": m,
  "to-color": z,
  "to-number": h,
  "to-string": v
};
class q {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const r = e[0];
    if (!Nt[r])
      throw new Error(`Can't parse ${r} as it is not part of the known types`);
    if ((r === "to-boolean" || r === "to-string") && e.length !== 2)
      return t.error("Expected one argument.");
    const i = Nt[r], s = [];
    for (let o = 1; o < e.length; o++) {
      const a = t.parse(e[o], o, b);
      if (!a)
        return null;
      s.push(a);
    }
    return new q(i, s);
  }
  evaluate(e) {
    switch (this.type.kind) {
      case "boolean":
        return !!this.args[0].evaluate(e);
      case "color": {
        let t, r;
        for (const i of this.args) {
          if (t = i.evaluate(e), r = null, t instanceof w)
            return t;
          if (typeof t == "string") {
            const s = e.parseColor(t);
            if (s)
              return s;
          } else if (Array.isArray(t) && (t.length < 3 || t.length > 4 ? r = `Invalid rgba value ${JSON.stringify(t)}: expected an array containing either three or four numeric values.` : r = nn(t[0], t[1], t[2], t[3]), !r))
            return new w(t[0] / 255, t[1] / 255, t[2] / 255, t[3]);
        }
        throw new M(r || `Could not parse color from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "padding": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = $.parse(t);
          if (i)
            return i;
        }
        throw new M(`Could not parse padding from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let t;
        for (const r of this.args) {
          t = r.evaluate(e);
          const i = L.parse(t);
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
        return j.fromString(oe(this.args[0].evaluate(e)));
      case "resolvedImage":
        return O.fromString(oe(this.args[0].evaluate(e)));
      case "projectionDefinition":
        return this.args[0].evaluate(e);
      default:
        return oe(this.args[0].evaluate(e));
    }
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
function Gn(n, e) {
  if (n.length <= 1)
    return [n];
  const r = [];
  let i, s;
  for (const o of n) {
    const a = rn(o);
    a !== 0 && (o.area = Math.abs(a), s === void 0 && (s = a < 0), s === a < 0 ? (i && r.push(i), i = [o]) : i.push(o));
  }
  return i && r.push(i), r;
}
function rn(n) {
  let e = 0;
  for (let t = 0, r = n.length, i = r - 1, s, o; t < r; i = t++)
    s = n[t], o = n[i], e += (o.x - s.x) * (s.y + o.y);
  return e;
}
function Xn(n) {
  const e = n.length;
  for (let t = 0, r; t < e; t++) {
    const i = rn(n[t]);
    if (i !== 0) {
      if (r === void 0)
        r = i < 0;
      else if (r === i < 0)
        return !0;
    }
  }
  return !1;
}
const Lt = ["Unknown", "Point", "LineString", "Polygon"], Zn = {
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
    return this.feature ? typeof this.feature.type == "number" ? Lt[this.feature.type] : Zn[this.feature.type] : null;
  }
  geometryType() {
    let e = this.feature.type;
    if (typeof e != "number" || (e = Lt[this.feature.type], e === "Unknown"))
      return e;
    const t = this.geometry();
    return t.length === 1 ? e : e !== "Polygon" ? `Multi${e}` : Xn(t) ? "MultiPolygon" : "Polygon";
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
    return t || (t = this._parseColorCache[e] = w.parse(e)), t;
  }
}
class Fe {
  constructor(e, t, r = [], i, s = new ot(), o = []) {
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
      return o === "assert" ? new D(s, [i]) : o === "coerce" ? new q(s, [i]) : i;
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
        if (!(o instanceof ne) && o.type.kind !== "resolvedImage" && this._isConstant(o)) {
          const a = new sn();
          try {
            o = new ne(o.type, o.evaluate(a));
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
    return new Fe(this.registry, this._isConstant, i, t || null, s, this.errors);
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
    return i ? new Be(r, i) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class ze {
  constructor(e, t) {
    this.type = t.type, this.name = e, this.boundExpression = t;
  }
  static parse(e, t) {
    if (e.length !== 2 || typeof e[1] != "string")
      return t.error("'var' expression requires exactly one string literal argument.");
    const r = e[1];
    return t.scope.has(r) ? new ze(r, t.scope.get(r)) : t.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`, 1);
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
class ut {
  constructor(e, t, r) {
    this.type = e, this.index = t, this.input = r;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, h), i = t.parse(e[2], 2, P(t.expectedType || b));
    if (!r || !i)
      return null;
    const s = i.type;
    return new ut(s.itemType, r, i);
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
class ct {
  constructor(e, t) {
    this.type = m, this.needle = e, this.haystack = t;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, b), i = t.parse(e[2], 2, b);
    return !r || !i ? null : at(r.type, [m, v, h, $e, b]) ? new ct(r, i) : t.error(`Expected first argument to be of type boolean, string, number or null, but found ${k(r.type)} instead`);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!r)
      return !1;
    if (!G(t, ["boolean", "string", "number", "null"]))
      throw new M(`Expected first argument to be of type boolean, string, number or null, but found ${k(I(t))} instead.`);
    if (!G(r, ["string", "array"]))
      throw new M(`Expected second argument to be of type array or string, but found ${k(I(r))} instead.`);
    return r.indexOf(t) >= 0;
  }
  eachChild(e) {
    e(this.needle), e(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class xe {
  constructor(e, t, r) {
    this.type = h, this.needle = e, this.haystack = t, this.fromIndex = r;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, b), i = t.parse(e[2], 2, b);
    if (!r || !i)
      return null;
    if (!at(r.type, [m, v, h, $e, b]))
      return t.error(`Expected first argument to be of type boolean, string, number or null, but found ${k(r.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, h);
      return s ? new xe(r, i, s) : null;
    } else
      return new xe(r, i);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), r = this.haystack.evaluate(e);
    if (!G(t, ["boolean", "string", "number", "null"]))
      throw new M(`Expected first argument to be of type boolean, string, number or null, but found ${k(I(t))} instead.`);
    let i;
    if (this.fromIndex && (i = this.fromIndex.evaluate(e)), G(r, ["string"])) {
      const s = r.indexOf(t, i);
      return s === -1 ? -1 : [...r.slice(0, s)].length;
    } else {
      if (G(r, ["array"]))
        return r.indexOf(t, i);
      throw new M(`Expected second argument to be of type array or string, but found ${k(I(r))} instead.`);
    }
  }
  eachChild(e) {
    e(this.needle), e(this.haystack), this.fromIndex && e(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class ft {
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
      const p = t.concat(u);
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
      const d = t.parse(f, u, i);
      if (!d)
        return null;
      i = i || d.type, o.push(d);
    }
    const a = t.parse(e[1], 1, b);
    if (!a)
      return null;
    const l = t.parse(e[e.length - 1], e.length - 1, i);
    return !l || a.type.kind !== "value" && t.concat(1).checkSubtype(r, a.type) ? null : new ft(r, i, a, s, o, l);
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    return (I(t) === this.inputType && this.outputs[this.cases[t]] || this.otherwise).evaluate(e);
  }
  eachChild(e) {
    e(this.input), this.outputs.forEach(e), e(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined()) && this.otherwise.outputDefined();
  }
}
class ht {
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
    return new ht(r, i, s);
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
class Me {
  constructor(e, t, r, i) {
    this.type = e, this.input = t, this.beginIndex = r, this.endIndex = i;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 3 or 4 arguments, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1, b), i = t.parse(e[2], 2, h);
    if (!r || !i)
      return null;
    if (!at(r.type, [P(b), v, b]))
      return t.error(`Expected first argument to be of type array or string, but found ${k(r.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, h);
      return s ? new Me(r.type, r, i, s) : null;
    } else
      return new Me(r.type, r, i);
  }
  evaluate(e) {
    const t = this.input.evaluate(e), r = this.beginIndex.evaluate(e);
    let i;
    if (this.endIndex && (i = this.endIndex.evaluate(e)), G(t, ["string"]))
      return [...t].slice(r, i).join("");
    if (G(t, ["array"]))
      return t.slice(r, i);
    throw new M(`Expected first argument to be of type array or string, but found ${k(I(t))} instead.`);
  }
  eachChild(e) {
    e(this.input), e(this.beginIndex), this.endIndex && e(this.endIndex);
  }
  outputDefined() {
    return !1;
  }
}
function je(n, e) {
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
class Re {
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
    const r = t.parse(e[1], 1, h);
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
    return new Re(s, r, i);
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
    const o = je(t, i);
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
function Jn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Ge, At;
function Yn() {
  if (At) return Ge;
  At = 1, Ge = n;
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
  }, Ge;
}
var Qn = Yn(), Kn = /* @__PURE__ */ Jn(Qn);
class A {
  constructor(e, t, r, i, s) {
    this.type = e, this.operator = t, this.interpolation = r, this.input = i, this.labels = [], this.outputs = [];
    for (const [o, a] of s)
      this.labels.push(o), this.outputs.push(a);
  }
  static interpolationFactor(e, t, r, i) {
    let s = 0;
    if (e.name === "exponential")
      s = Xe(t, e.base, r, i);
    else if (e.name === "linear")
      s = Xe(t, 1, r, i);
    else if (e.name === "cubic-bezier") {
      const o = e.controlPoints;
      s = new Kn(o[0], o[1], o[2], o[3]).solve(Xe(t, 1, r, i));
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
    if (s = t.parse(s, 2, h), !s)
      return null;
    const a = [];
    let l = null;
    r === "interpolate-hcl" || r === "interpolate-lab" ? l = z : t.expectedType && t.expectedType.kind !== "value" && (l = t.expectedType);
    for (let u = 0; u < o.length; u += 2) {
      const c = o[u], f = o[u + 1], p = u + 3, d = u + 4;
      if (typeof c != "number")
        return t.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', p);
      if (a.length && a[a.length - 1][0] >= c)
        return t.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', p);
      const y = t.parse(f, d, l);
      if (!y)
        return null;
      l = l || y.type, a.push([c, y]);
    }
    return !J(l, h) && !J(l, Pe) && !J(l, z) && !J(l, Ae) && !J(l, De) && !J(l, P(h)) ? t.error(`Type ${k(l)} is not interpolatable.`) : new A(l, r, i, s, a);
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
    const o = je(t, i), a = t[o], l = t[o + 1], u = A.interpolationFactor(this.interpolation, i, a, l), c = r[o].evaluate(e), f = r[o + 1].evaluate(e);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return U(c, f, u);
          case "color":
            return w.interpolate(c, f, u);
          case "padding":
            return $.interpolate(c, f, u);
          case "variableAnchorOffsetCollection":
            return L.interpolate(c, f, u);
          case "array":
            return ue(c, f, u);
          case "projectionDefinition":
            return N.interpolate(c, f, u);
        }
      case "interpolate-hcl":
        return w.interpolate(c, f, u, "hcl");
      case "interpolate-lab":
        return w.interpolate(c, f, u, "lab");
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
  const i = r - t, s = n - t;
  return i === 0 ? 0 : e === 1 ? s / i : (Math.pow(e, s) - 1) / (Math.pow(e, i) - 1);
}
const er = {
  color: w.interpolate,
  number: U,
  padding: $.interpolate,
  variableAnchorOffsetCollection: L.interpolate,
  array: ue
};
class fe {
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
    return i && s.some((a) => le(i, a.type)) ? new fe(b, s) : new fe(r, s);
  }
  evaluate(e) {
    let t = null, r = 0, i;
    for (const s of this.args)
      if (r++, t = s.evaluate(e), t && t instanceof O && !t.available && (i || (i = t.name), t = null, r === this.args.length && (t = i)), t !== null)
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
function Dt(n, e) {
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
function sr(n, e, t) {
  return e <= t;
}
function or(n, e, t) {
  return e >= t;
}
function on(n, e, t, r) {
  return r.compare(e, t) === 0;
}
function ar(n, e, t, r) {
  return !on(n, e, t, r);
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
function fr(n, e, t, r) {
  return r.compare(e, t) >= 0;
}
function re(n, e, t) {
  const r = n !== "==" && n !== "!=";
  return class an {
    constructor(s, o, a) {
      this.type = m, this.lhs = s, this.rhs = o, this.collator = a, this.hasUntypedArgument = s.type.kind === "value" || o.type.kind === "value";
    }
    static parse(s, o) {
      if (s.length !== 3 && s.length !== 4)
        return o.error("Expected two or three arguments.");
      const a = s[0];
      let l = o.parse(s[1], 1, b);
      if (!l)
        return null;
      if (!Dt(a, l.type))
        return o.concat(1).error(`"${a}" comparisons are not supported for type '${k(l.type)}'.`);
      let u = o.parse(s[2], 2, b);
      if (!u)
        return null;
      if (!Dt(a, u.type))
        return o.concat(2).error(`"${a}" comparisons are not supported for type '${k(u.type)}'.`);
      if (l.type.kind !== u.type.kind && l.type.kind !== "value" && u.type.kind !== "value")
        return o.error(`Cannot compare types '${k(l.type)}' and '${k(u.type)}'.`);
      r && (l.type.kind === "value" && u.type.kind !== "value" ? l = new D(u.type, [l]) : l.type.kind !== "value" && u.type.kind === "value" && (u = new D(l.type, [u])));
      let c = null;
      if (s.length === 4) {
        if (l.type.kind !== "string" && u.type.kind !== "string" && l.type.kind !== "value" && u.type.kind !== "value")
          return o.error("Cannot use collator to compare non-string types.");
        if (c = o.parse(s[3], 3, Ne), !c)
          return null;
      }
      return new an(l, u, c);
    }
    evaluate(s) {
      const o = this.lhs.evaluate(s), a = this.rhs.evaluate(s);
      if (r && this.hasUntypedArgument) {
        const l = I(o), u = I(a);
        if (l.kind !== u.kind || !(l.kind === "string" || l.kind === "number"))
          throw new M(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${u.kind}) instead.`);
      }
      if (this.collator && !r && this.hasUntypedArgument) {
        const l = I(o), u = I(a);
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
const hr = re("==", tr, on), pr = re("!=", nr, ar), dr = re("<", rr, lr), yr = re(">", ir, ur), gr = re("<=", sr, cr), mr = re(">=", or, fr);
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
    const s = t.parse(r["diacritic-sensitive"] === void 0 ? !1 : r["diacritic-sensitive"], 1, m);
    if (!s)
      return null;
    let o = null;
    return r.locale && (o = t.parse(r.locale, 1, v), !o) ? null : new He(i, s, o);
  }
  evaluate(e) {
    return new lt(this.caseSensitive.evaluate(e), this.diacriticSensitive.evaluate(e), this.locale ? this.locale.evaluate(e) : null);
  }
  eachChild(e) {
    e(this.caseSensitive), e(this.diacriticSensitive), this.locale && e(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class pt {
  constructor(e, t, r, i, s) {
    this.type = v, this.number = e, this.locale = t, this.currency = r, this.minFractionDigits = i, this.maxFractionDigits = s;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error("Expected two arguments.");
    const r = t.parse(e[1], 1, h);
    if (!r)
      return null;
    const i = e[2];
    if (typeof i != "object" || Array.isArray(i))
      return t.error("NumberFormat options argument must be an object.");
    let s = null;
    if (i.locale && (s = t.parse(i.locale, 1, v), !s))
      return null;
    let o = null;
    if (i.currency && (o = t.parse(i.currency, 1, v), !o))
      return null;
    let a = null;
    if (i["min-fraction-digits"] && (a = t.parse(i["min-fraction-digits"], 1, h), !a))
      return null;
    let l = null;
    return i["max-fraction-digits"] && (l = t.parse(i["max-fraction-digits"], 1, h), !l) ? null : new pt(r, s, o, a, l);
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
class dt {
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
        if (a["font-scale"] && (l = t.parse(a["font-scale"], 1, h), !l))
          return null;
        let u = null;
        if (a["text-font"] && (u = t.parse(a["text-font"], 1, P(v)), !u))
          return null;
        let c = null;
        if (a["text-color"] && (c = t.parse(a["text-color"], 1, z), !c))
          return null;
        const f = i[i.length - 1];
        f.scale = l, f.font = u, f.textColor = c;
      } else {
        const l = t.parse(e[o], 1, b);
        if (!l)
          return null;
        const u = l.type.kind;
        if (u !== "string" && u !== "value" && u !== "null" && u !== "resolvedImage")
          return t.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        s = !0, i.push({ content: l, scale: null, font: null, textColor: null });
      }
    }
    return new dt(i);
  }
  evaluate(e) {
    const t = (r) => {
      const i = r.content.evaluate(e);
      return I(i) === pe ? new Ye("", i, null, null, null) : new Ye(oe(i), null, r.scale ? r.scale.evaluate(e) : null, r.font ? r.font.evaluate(e).join(",") : null, r.textColor ? r.textColor.evaluate(e) : null);
    };
    return new j(this.sections.map(t));
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
    this.type = pe, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected two arguments.");
    const r = t.parse(e[1], 1, v);
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
class gt {
  constructor(e) {
    this.type = h, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`Expected 1 argument, but found ${e.length - 1} instead.`);
    const r = t.parse(e[1], 1);
    return r ? r.type.kind !== "array" && r.type.kind !== "string" && r.type.kind !== "value" ? t.error(`Expected argument of type string or array, but found ${k(r.type)} instead.`) : new gt(r) : null;
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    if (typeof t == "string")
      return [...t].length;
    if (Array.isArray(t))
      return t.length;
    throw new M(`Expected value to be of type string or array, but found ${k(I(t))} instead.`);
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const R = 8192;
function br(n, e) {
  const t = vr(n[0]), r = Cr(n[1]), i = Math.pow(2, e.z);
  return [Math.round(t * i * R), Math.round(r * i * R)];
}
function mt(n, e) {
  const t = Math.pow(2, e.z), r = (n[0] / R + e.x) / t, i = (n[1] / R + e.y) / t;
  return [wr(r), kr(i)];
}
function vr(n) {
  return (180 + n) / 360;
}
function wr(n) {
  return n * 360 - 180;
}
function Cr(n) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + n * Math.PI / 360))) / 360;
}
function kr(n) {
  return 360 / Math.PI * Math.atan(Math.exp((180 - n * 360) * Math.PI / 180)) - 90;
}
function de(n, e) {
  n[0] = Math.min(n[0], e[0]), n[1] = Math.min(n[1], e[1]), n[2] = Math.max(n[2], e[0]), n[3] = Math.max(n[3], e[1]);
}
function he(n, e) {
  return !(n[0] <= e[0] || n[2] >= e[2] || n[1] <= e[1] || n[3] >= e[3]);
}
function xr(n, e, t) {
  return e[1] > n[1] != t[1] > n[1] && n[0] < (t[0] - e[0]) * (n[1] - e[1]) / (t[1] - e[1]) + e[0];
}
function Mr(n, e, t) {
  const r = n[0] - e[0], i = n[1] - e[1], s = n[0] - t[0], o = n[1] - t[1];
  return r * o - s * i === 0 && r * s <= 0 && i * o <= 0;
}
function _e(n, e, t, r) {
  const i = [e[0] - n[0], e[1] - n[1]], s = [r[0] - t[0], r[1] - t[1]];
  return Sr(s, i) === 0 ? !1 : !!(Ft(n, e, t, r) && Ft(t, r, n, e));
}
function Er(n, e, t) {
  for (const r of t)
    for (let i = 0; i < r.length - 1; ++i)
      if (_e(n, e, r[i], r[i + 1]))
        return !0;
  return !1;
}
function ie(n, e, t = !1) {
  let r = !1;
  for (const i of e)
    for (let s = 0; s < i.length - 1; s++) {
      if (Mr(n, i[s], i[s + 1]))
        return t;
      xr(n, i[s], i[s + 1]) && (r = !r);
    }
  return r;
}
function Ir(n, e) {
  for (const t of e)
    if (ie(n, t))
      return !0;
  return !1;
}
function ln(n, e) {
  for (const t of n)
    if (!ie(t, e))
      return !1;
  for (let t = 0; t < n.length - 1; ++t)
    if (Er(n[t], n[t + 1], e))
      return !1;
  return !0;
}
function Tr(n, e) {
  for (const t of e)
    if (ln(n, t))
      return !0;
  return !1;
}
function Sr(n, e) {
  return n[0] * e[1] - n[1] * e[0];
}
function Ft(n, e, t, r) {
  const i = n[0] - t[0], s = n[1] - t[1], o = e[0] - t[0], a = e[1] - t[1], l = r[0] - t[0], u = r[1] - t[1], c = i * u - l * s, f = o * u - l * a;
  return c > 0 && f < 0 || c < 0 && f > 0;
}
function bt(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = [];
    for (let o = 0; o < n[i].length; o++) {
      const a = br(n[i][o], t);
      de(e, a), s.push(a);
    }
    r.push(s);
  }
  return r;
}
function un(n, e, t) {
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const s = bt(n[i], e, t);
    r.push(s);
  }
  return r;
}
function cn(n, e, t, r) {
  if (n[0] < t[0] || n[0] > t[2]) {
    const i = r * 0.5;
    let s = n[0] - t[0] > i ? -r : t[0] - n[0] > i ? r : 0;
    s === 0 && (s = n[0] - t[2] > i ? -r : t[2] - n[0] > i ? r : 0), n[0] += s;
  }
  de(e, n);
}
function $r(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function Bt(n, e, t, r) {
  const i = Math.pow(2, r.z) * R, s = [r.x * R, r.y * R], o = [];
  for (const a of n)
    for (const l of a) {
      const u = [l.x + s[0], l.y + s[1]];
      cn(u, e, t, i), o.push(u);
    }
  return o;
}
function zt(n, e, t, r) {
  const i = Math.pow(2, r.z) * R, s = [r.x * R, r.y * R], o = [];
  for (const a of n) {
    const l = [];
    for (const u of a) {
      const c = [u.x + s[0], u.y + s[1]];
      de(e, c), l.push(c);
    }
    o.push(l);
  }
  if (e[2] - e[0] <= i / 2) {
    $r(e);
    for (const a of o)
      for (const l of a)
        cn(l, e, t, i);
  }
  return o;
}
function Pr(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const s = bt(e.coordinates, r, i), o = Bt(n.geometry(), t, r, i);
    if (!he(t, r))
      return !1;
    for (const a of o)
      if (!ie(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = un(e.coordinates, r, i), o = Bt(n.geometry(), t, r, i);
    if (!he(t, r))
      return !1;
    for (const a of o)
      if (!Ir(a, s))
        return !1;
  }
  return !0;
}
function Nr(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = n.canonicalID();
  if (e.type === "Polygon") {
    const s = bt(e.coordinates, r, i), o = zt(n.geometry(), t, r, i);
    if (!he(t, r))
      return !1;
    for (const a of o)
      if (!ln(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = un(e.coordinates, r, i), o = zt(n.geometry(), t, r, i);
    if (!he(t, r))
      return !1;
    for (const a of o)
      if (!Tr(a, s))
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
    if (ce(e[1])) {
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
        return Pr(e, this.geometries);
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
class fn {
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
const Lr = 6378.137, jt = 1 / 298.257223563, Rt = jt * (2 - jt), Ht = Math.PI / 180;
class vt {
  constructor(e) {
    const t = Ht * Lr * 1e3, r = Math.cos(e * Ht), i = 1 / (1 - Rt * (1 - r * r)), s = Math.sqrt(i);
    this.kx = t * s * r, this.ky = t * s * i * (1 - Rt);
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
      let u = e[l][0], c = e[l][1], f = this.wrap(e[l + 1][0] - u) * this.kx, p = (e[l + 1][1] - c) * this.ky, d = 0;
      (f !== 0 || p !== 0) && (d = (this.wrap(t[0] - u) * this.kx * f + (t[1] - c) * this.ky * p) / (f * f + p * p), d > 1 ? (u = e[l + 1][0], c = e[l + 1][1]) : d > 0 && (u += f / this.kx * d, c += p / this.ky * d)), f = this.wrap(t[0] - u) * this.kx, p = (t[1] - c) * this.ky;
      const y = f * f + p * p;
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
const Qe = 100, Ke = 50;
function hn(n, e) {
  return e[0] - n[0];
}
function Ee(n) {
  return n[1] - n[0] + 1;
}
function _(n, e) {
  return n[1] >= n[0] && n[1] < e;
}
function et(n, e) {
  if (n[0] > n[1])
    return [null, null];
  const t = Ee(n);
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
function tt(n, e) {
  if (!_(e, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let r = e[0]; r <= e[1]; ++r)
    de(t, n[r]);
  return t;
}
function nt(n) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const t of n)
    for (const r of t)
      de(e, r);
  return e;
}
function _t(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function wt(n, e, t) {
  if (!_t(n) || !_t(e))
    return NaN;
  let r = 0, i = 0;
  return n[2] < e[0] && (r = e[0] - n[2]), n[0] > e[2] && (r = n[0] - e[2]), n[1] > e[3] && (i = n[1] - e[3]), n[3] < e[1] && (i = e[1] - n[3]), t.distance([0, 0], [r, i]);
}
function W(n, e, t) {
  const r = t.pointOnLine(e, n);
  return t.distance(n, r.point);
}
function Ct(n, e, t, r, i) {
  const s = Math.min(W(n, [t, r], i), W(e, [t, r], i)), o = Math.min(W(t, [n, e], i), W(r, [n, e], i));
  return Math.min(s, o);
}
function Ar(n, e, t, r, i) {
  if (!(_(e, n.length) && _(r, t.length)))
    return 1 / 0;
  let o = 1 / 0;
  for (let a = e[0]; a < e[1]; ++a) {
    const l = n[a], u = n[a + 1];
    for (let c = r[0]; c < r[1]; ++c) {
      const f = t[c], p = t[c + 1];
      if (_e(l, u, f, p))
        return 0;
      o = Math.min(o, Ct(l, u, f, p, i));
    }
  }
  return o;
}
function Dr(n, e, t, r, i) {
  if (!(_(e, n.length) && _(r, t.length)))
    return NaN;
  let o = 1 / 0;
  for (let a = e[0]; a <= e[1]; ++a)
    for (let l = r[0]; l <= r[1]; ++l)
      if (o = Math.min(o, i.distance(n[a], t[l])), o === 0)
        return o;
  return o;
}
function Fr(n, e, t) {
  if (ie(n, e, !0))
    return 0;
  let r = 1 / 0;
  for (const i of e) {
    const s = i[0], o = i[i.length - 1];
    if (s !== o && (r = Math.min(r, W(n, [o, s], t)), r === 0))
      return r;
    const a = t.pointOnLine(i, n);
    if (r = Math.min(r, t.distance(n, a.point)), r === 0)
      return r;
  }
  return r;
}
function Br(n, e, t, r) {
  if (!_(e, n.length))
    return NaN;
  for (let s = e[0]; s <= e[1]; ++s)
    if (ie(n[s], t, !0))
      return 0;
  let i = 1 / 0;
  for (let s = e[0]; s < e[1]; ++s) {
    const o = n[s], a = n[s + 1];
    for (const l of t)
      for (let u = 0, c = l.length, f = c - 1; u < c; f = u++) {
        const p = l[f], d = l[u];
        if (_e(o, a, p, d))
          return 0;
        i = Math.min(i, Ct(o, a, p, d, r));
      }
  }
  return i;
}
function Ot(n, e) {
  for (const t of n)
    for (const r of t)
      if (ie(r, e, !0))
        return !0;
  return !1;
}
function zr(n, e, t, r = 1 / 0) {
  const i = nt(n), s = nt(e);
  if (r !== 1 / 0 && wt(i, s, t) >= r)
    return r;
  if (he(i, s)) {
    if (Ot(n, e))
      return 0;
  } else if (Ot(e, n))
    return 0;
  let o = 1 / 0;
  for (const a of n)
    for (let l = 0, u = a.length, c = u - 1; l < u; c = l++) {
      const f = a[c], p = a[l];
      for (const d of e)
        for (let y = 0, C = d.length, E = C - 1; y < C; E = y++) {
          const T = d[E], S = d[y];
          if (_e(f, p, T, S))
            return 0;
          o = Math.min(o, Ct(f, p, T, S, t));
        }
    }
  return o;
}
function qt(n, e, t, r, i, s) {
  if (!s)
    return;
  const o = wt(tt(r, s), i, t);
  o < e && n.push([o, s, [0, 0]]);
}
function Ce(n, e, t, r, i, s, o) {
  if (!s || !o)
    return;
  const a = wt(tt(r, s), tt(i, o), t);
  a < e && n.push([a, s, o]);
}
function Ie(n, e, t, r, i = 1 / 0) {
  let s = Math.min(r.distance(n[0], t[0][0]), i);
  if (s === 0)
    return s;
  const o = new fn([[0, [0, n.length - 1], [0, 0]]], hn), a = nt(t);
  for (; o.length > 0; ) {
    const l = o.pop();
    if (l[0] >= s)
      continue;
    const u = l[1], c = e ? Ke : Qe;
    if (Ee(u) <= c) {
      if (!_(u, n.length))
        return NaN;
      if (e) {
        const f = Br(n, u, t, r);
        if (isNaN(f) || f === 0)
          return f;
        s = Math.min(s, f);
      } else
        for (let f = u[0]; f <= u[1]; ++f) {
          const p = Fr(n[f], t, r);
          if (s = Math.min(s, p), s === 0)
            return 0;
        }
    } else {
      const f = et(u, e);
      qt(o, s, r, n, a, f[0]), qt(o, s, r, n, a, f[1]);
    }
  }
  return s;
}
function Te(n, e, t, r, i, s = 1 / 0) {
  let o = Math.min(s, i.distance(n[0], t[0]));
  if (o === 0)
    return o;
  const a = new fn([[0, [0, n.length - 1], [0, t.length - 1]]], hn);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= o)
      continue;
    const u = l[1], c = l[2], f = e ? Ke : Qe, p = r ? Ke : Qe;
    if (Ee(u) <= f && Ee(c) <= p) {
      if (!_(u, n.length) && _(c, t.length))
        return NaN;
      let d;
      if (e && r)
        d = Ar(n, u, t, c, i), o = Math.min(o, d);
      else if (e && !r) {
        const y = n.slice(u[0], u[1] + 1);
        for (let C = c[0]; C <= c[1]; ++C)
          if (d = W(t[C], y, i), o = Math.min(o, d), o === 0)
            return o;
      } else if (!e && r) {
        const y = t.slice(c[0], c[1] + 1);
        for (let C = u[0]; C <= u[1]; ++C)
          if (d = W(n[C], y, i), o = Math.min(o, d), o === 0)
            return o;
      } else
        d = Dr(n, u, t, c, i), o = Math.min(o, d);
    } else {
      const d = et(u, e), y = et(c, r);
      Ce(a, o, i, n, t, d[0], y[0]), Ce(a, o, i, n, t, d[0], y[1]), Ce(a, o, i, n, t, d[1], y[0]), Ce(a, o, i, n, t, d[1], y[1]);
    }
  }
  return o;
}
function jr(n, e) {
  const t = n.geometry(), r = t.flat().map((o) => mt([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new vt(r[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Te(r, !1, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Te(r, !1, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, Ie(r, !1, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Rr(n, e) {
  const t = n.geometry(), r = t.flat().map((o) => mt([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const i = new vt(r[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Te(r, !0, [o.coordinates], !1, i, s));
        break;
      case "LineString":
        s = Math.min(s, Te(r, !0, o.coordinates, !0, i, s));
        break;
      case "Polygon":
        s = Math.min(s, Ie(r, !0, o.coordinates, i, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Hr(n, e) {
  const t = n.geometry();
  if (t.length === 0 || t[0].length === 0)
    return NaN;
  const r = Gn(t).map((o) => o.map((a) => a.map((l) => mt([l.x, l.y], n.canonical)))), i = new vt(r[0][0][0][1]);
  let s = 1 / 0;
  for (const o of e)
    for (const a of r) {
      switch (o.type) {
        case "Point":
          s = Math.min(s, Ie([o.coordinates], !1, a, i, s));
          break;
        case "LineString":
          s = Math.min(s, Ie(o.coordinates, !0, a, i, s));
          break;
        case "Polygon":
          s = Math.min(s, zr(a, o.coordinates, i, s));
          break;
      }
      if (s === 0)
        return s;
    }
  return s;
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
class Z {
  constructor(e, t) {
    this.type = h, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'distance' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (ce(e[1])) {
      const r = e[1];
      if (r.type === "FeatureCollection")
        return new Z(r, r.features.map((i) => Ze(i.geometry)).flat());
      if (r.type === "Feature")
        return new Z(r, Ze(r.geometry));
      if ("type" in r && "coordinates" in r)
        return new Z(r, Ze(r));
    }
    return t.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryType() === "Point")
        return jr(e, this.geometries);
      if (e.geometryType() === "LineString")
        return Rr(e, this.geometries);
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
const kt = {
  // special forms
  "==": hr,
  "!=": pr,
  ">": yr,
  "<": dr,
  ">=": mr,
  "<=": gr,
  array: D,
  at: ut,
  boolean: D,
  case: ht,
  coalesce: fe,
  collator: He,
  format: dt,
  image: yt,
  in: ct,
  "index-of": xe,
  interpolate: A,
  "interpolate-hcl": A,
  "interpolate-lab": A,
  length: gt,
  let: Be,
  literal: ne,
  match: ft,
  number: D,
  "number-format": pt,
  object: D,
  slice: Me,
  step: Re,
  string: D,
  "to-boolean": q,
  "to-color": q,
  "to-number": q,
  "to-string": q,
  var: ze,
  within: X,
  distance: Z
};
class F {
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
    const r = e[0], i = F.definitions[r];
    if (!i)
      return t.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const s = Array.isArray(i) ? i[0] : i.type, o = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads, a = o.filter(([u]) => !Array.isArray(u) || // varags
    u.length === e.length - 1);
    let l = null;
    for (const [u, c] of a) {
      l = new Fe(t.registry, Se, t.path, null, t.scope);
      const f = [];
      let p = !1;
      for (let d = 1; d < e.length; d++) {
        const y = e[d], C = Array.isArray(u) ? u[d - 1] : u.type, E = l.parse(y, 1 + f.length, C);
        if (!E) {
          p = !0;
          break;
        }
        f.push(E);
      }
      if (!p) {
        if (Array.isArray(u) && u.length !== f.length) {
          l.error(`Expected ${u.length} arguments, but found ${f.length} instead.`);
          continue;
        }
        for (let d = 0; d < f.length; d++) {
          const y = Array.isArray(u) ? u[d] : u.type, C = f[d];
          l.concat(d + 1).checkSubtype(y, C.type);
        }
        if (l.errors.length === 0)
          return new F(r, s, c, f);
      }
    }
    if (a.length === 1)
      t.errors.push(...l.errors);
    else {
      const c = (a.length ? a : o).map(([p]) => Or(p)).join(" | "), f = [];
      for (let p = 1; p < e.length; p++) {
        const d = t.parse(e[p], 1 + f.length);
        if (!d)
          return null;
        f.push(k(d.type));
      }
      t.error(`Expected arguments of type ${c}, but found (${f.join(", ")}) instead.`);
    }
    return null;
  }
  static register(e, t) {
    F.definitions = t;
    for (const r in t)
      e[r] = F;
  }
}
function Ut(n, [e, t, r, i]) {
  e = e.evaluate(n), t = t.evaluate(n), r = r.evaluate(n);
  const s = i ? i.evaluate(n) : 1, o = nn(e, t, r, s);
  if (o)
    throw new M(o);
  return new w(e / 255, t / 255, r / 255, s, !1);
}
function Vt(n, e) {
  return n in e;
}
function Je(n, e) {
  const t = e[n];
  return typeof t > "u" ? null : t;
}
function _r(n, e, t, r) {
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
F.register(kt, {
  error: [
    Fn,
    [v],
    (n, [e]) => {
      throw new M(e.evaluate(n));
    }
  ],
  typeof: [
    v,
    [b],
    (n, [e]) => k(I(e.evaluate(n)))
  ],
  "to-rgba": [
    P(h, 4),
    [z],
    (n, [e]) => {
      const [t, r, i, s] = e.evaluate(n).rgb;
      return [t * 255, r * 255, i * 255, s];
    }
  ],
  rgb: [
    z,
    [h, h, h],
    Ut
  ],
  rgba: [
    z,
    [h, h, h, h],
    Ut
  ],
  has: {
    type: m,
    overloads: [
      [
        [v],
        (n, [e]) => Vt(e.evaluate(n), n.properties())
      ],
      [
        [v, K],
        (n, [e, t]) => Vt(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  get: {
    type: b,
    overloads: [
      [
        [v],
        (n, [e]) => Je(e.evaluate(n), n.properties())
      ],
      [
        [v, K],
        (n, [e, t]) => Je(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    b,
    [v],
    (n, [e]) => Je(e.evaluate(n), n.featureState || {})
  ],
  properties: [
    K,
    [],
    (n) => n.properties()
  ],
  "geometry-type": [
    v,
    [],
    (n) => n.geometryType()
  ],
  id: [
    b,
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
    b,
    [],
    (n) => n.globals.accumulated === void 0 ? null : n.globals.accumulated
  ],
  "+": [
    h,
    V(h),
    (n, e) => {
      let t = 0;
      for (const r of e)
        t += r.evaluate(n);
      return t;
    }
  ],
  "*": [
    h,
    V(h),
    (n, e) => {
      let t = 1;
      for (const r of e)
        t *= r.evaluate(n);
      return t;
    }
  ],
  "-": {
    type: h,
    overloads: [
      [
        [h, h],
        (n, [e, t]) => e.evaluate(n) - t.evaluate(n)
      ],
      [
        [h],
        (n, [e]) => -e.evaluate(n)
      ]
    ]
  },
  "/": [
    h,
    [h, h],
    (n, [e, t]) => e.evaluate(n) / t.evaluate(n)
  ],
  "%": [
    h,
    [h, h],
    (n, [e, t]) => e.evaluate(n) % t.evaluate(n)
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
    (n, [e, t]) => Math.pow(e.evaluate(n), t.evaluate(n))
  ],
  sqrt: [
    h,
    [h],
    (n, [e]) => Math.sqrt(e.evaluate(n))
  ],
  log10: [
    h,
    [h],
    (n, [e]) => Math.log(e.evaluate(n)) / Math.LN10
  ],
  ln: [
    h,
    [h],
    (n, [e]) => Math.log(e.evaluate(n))
  ],
  log2: [
    h,
    [h],
    (n, [e]) => Math.log(e.evaluate(n)) / Math.LN2
  ],
  sin: [
    h,
    [h],
    (n, [e]) => Math.sin(e.evaluate(n))
  ],
  cos: [
    h,
    [h],
    (n, [e]) => Math.cos(e.evaluate(n))
  ],
  tan: [
    h,
    [h],
    (n, [e]) => Math.tan(e.evaluate(n))
  ],
  asin: [
    h,
    [h],
    (n, [e]) => Math.asin(e.evaluate(n))
  ],
  acos: [
    h,
    [h],
    (n, [e]) => Math.acos(e.evaluate(n))
  ],
  atan: [
    h,
    [h],
    (n, [e]) => Math.atan(e.evaluate(n))
  ],
  min: [
    h,
    V(h),
    (n, e) => Math.min(...e.map((t) => t.evaluate(n)))
  ],
  max: [
    h,
    V(h),
    (n, e) => Math.max(...e.map((t) => t.evaluate(n)))
  ],
  abs: [
    h,
    [h],
    (n, [e]) => Math.abs(e.evaluate(n))
  ],
  round: [
    h,
    [h],
    (n, [e]) => {
      const t = e.evaluate(n);
      return t < 0 ? -Math.round(-t) : Math.round(t);
    }
  ],
  floor: [
    h,
    [h],
    (n, [e]) => Math.floor(e.evaluate(n))
  ],
  ceil: [
    h,
    [h],
    (n, [e]) => Math.ceil(e.evaluate(n))
  ],
  "filter-==": [
    m,
    [v, b],
    (n, [e, t]) => n.properties()[e.value] === t.value
  ],
  "filter-id-==": [
    m,
    [b],
    (n, [e]) => n.id() === e.value
  ],
  "filter-type-==": [
    m,
    [v],
    (n, [e]) => n.geometryDollarType() === e.value
  ],
  "filter-<": [
    m,
    [v, b],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r < i;
    }
  ],
  "filter-id-<": [
    m,
    [b],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t < r;
    }
  ],
  "filter->": [
    m,
    [v, b],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r > i;
    }
  ],
  "filter-id->": [
    m,
    [b],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t > r;
    }
  ],
  "filter-<=": [
    m,
    [v, b],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r <= i;
    }
  ],
  "filter-id-<=": [
    m,
    [b],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t <= r;
    }
  ],
  "filter->=": [
    m,
    [v, b],
    (n, [e, t]) => {
      const r = n.properties()[e.value], i = t.value;
      return typeof r == typeof i && r >= i;
    }
  ],
  "filter-id->=": [
    m,
    [b],
    (n, [e]) => {
      const t = n.id(), r = e.value;
      return typeof t == typeof r && t >= r;
    }
  ],
  "filter-has": [
    m,
    [b],
    (n, [e]) => e.value in n.properties()
  ],
  "filter-has-id": [
    m,
    [],
    (n) => n.id() !== null && n.id() !== void 0
  ],
  "filter-type-in": [
    m,
    [P(v)],
    (n, [e]) => e.value.indexOf(n.geometryDollarType()) >= 0
  ],
  "filter-id-in": [
    m,
    [P(b)],
    (n, [e]) => e.value.indexOf(n.id()) >= 0
  ],
  "filter-in-small": [
    m,
    [v, P(b)],
    // assumes v is an array literal
    (n, [e, t]) => t.value.indexOf(n.properties()[e.value]) >= 0
  ],
  "filter-in-large": [
    m,
    [v, P(b)],
    // assumes v is a array literal with values sorted in ascending order and of a single type
    (n, [e, t]) => _r(n.properties()[e.value], t.value, 0, t.value.length - 1)
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
    [v],
    // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
    (n, [e]) => {
      const t = n.globals && n.globals.isSupportedScript;
      return t ? t(e.evaluate(n)) : !0;
    }
  ],
  upcase: [
    v,
    [v],
    (n, [e]) => e.evaluate(n).toUpperCase()
  ],
  downcase: [
    v,
    [v],
    (n, [e]) => e.evaluate(n).toLowerCase()
  ],
  concat: [
    v,
    V(b),
    (n, e) => e.map((t) => oe(t.evaluate(n))).join("")
  ],
  "resolved-locale": [
    v,
    [Ne],
    (n, [e]) => e.evaluate(n).resolvedLocale()
  ]
});
function Or(n) {
  return Array.isArray(n) ? `(${n.map(k).join(", ")})` : `(${k(n.type)}...)`;
}
function Se(n) {
  if (n instanceof ze)
    return Se(n.boundExpression);
  if (n instanceof F && n.name === "error")
    return !1;
  if (n instanceof He)
    return !1;
  if (n instanceof X)
    return !1;
  if (n instanceof Z)
    return !1;
  const e = n instanceof q || n instanceof D;
  let t = !0;
  return n.eachChild((r) => {
    e ? t = t && Se(r) : t = t && r instanceof ne;
  }), t ? xt(n) && Et(n, ["zoom", "heatmap-density", "line-progress", "accumulated", "is-supported-script"]) : !1;
}
function xt(n) {
  if (n instanceof F) {
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
    e && !xt(t) && (e = !1);
  }), e;
}
function Mt(n) {
  if (n instanceof F && n.name === "feature-state")
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !Mt(t) && (e = !1);
  }), e;
}
function Et(n, e) {
  if (n instanceof F && e.indexOf(n.name) >= 0)
    return !1;
  let t = !0;
  return n.eachChild((r) => {
    t && !Et(r, e) && (t = !1);
  }), t;
}
function rt(n) {
  return { result: "success", value: n };
}
function Q(n) {
  return { result: "error", value: n };
}
function qr(n) {
  return n["property-type"] === "data-driven" || n["property-type"] === "cross-faded-data-driven";
}
function Ur(n) {
  return !!n.expression && n.expression.parameters.indexOf("zoom") > -1;
}
function pn(n) {
  return !!n.expression && n.expression.interpolated;
}
function It(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function dn(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Vr(n) {
  return n;
}
function yn(n, e) {
  const t = e.type === "color", r = n.stops && typeof n.stops[0][0] == "object", i = r || n.property !== void 0, s = r || !i, o = n.type || (pn(e) ? "exponential" : "interval");
  if (t || e.type === "padding") {
    const c = t ? w.parse : $.parse;
    n = Gt({}, n), n.stops && (n.stops = n.stops.map((f) => [f[0], c(f[1])])), n.default ? n.default = c(n.default) : n.default = c(e.default);
  }
  if (n.colorSpace && !Vn(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  let a, l, u;
  if (o === "exponential")
    a = Wt;
  else if (o === "interval")
    a = Gr;
  else if (o === "categorical") {
    a = Wr, l = /* @__PURE__ */ Object.create(null);
    for (const c of n.stops)
      l[c[0]] = c[1];
    u = typeof n.stops[0][0];
  } else if (o === "identity")
    a = Xr;
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
    const p = [];
    for (const y of f)
      p.push([c[y].zoom, yn(c[y], e)]);
    const d = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: d,
      interpolationFactor: A.interpolationFactor.bind(void 0, d),
      zoomStops: p.map((y) => y[0]),
      evaluate({ zoom: y }, C) {
        return Wt({
          stops: p,
          base: n.base
        }, e, y).evaluate(y, C);
      }
    };
  } else if (s) {
    const c = o === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: c,
      interpolationFactor: A.interpolationFactor.bind(void 0, c),
      zoomStops: n.stops.map((f) => f[0]),
      evaluate: ({ zoom: f }) => a(n, e, f, l, u)
    };
  } else
    return {
      kind: "source",
      evaluate(c, f) {
        const p = f && f.properties ? f.properties[n.property] : void 0;
        return p === void 0 ? ye(n.default, e.default) : a(n, e, p, l, u);
      }
    };
}
function ye(n, e, t) {
  if (n !== void 0)
    return n;
  if (e !== void 0)
    return e;
  if (t !== void 0)
    return t;
}
function Wr(n, e, t, r, i) {
  const s = typeof t === i ? r[t] : void 0;
  return ye(s, n.default, e.default);
}
function Gr(n, e, t) {
  if (It(t) !== "number")
    return ye(n.default, e.default);
  const r = n.stops.length;
  if (r === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const i = je(n.stops.map((s) => s[0]), t);
  return n.stops[i][1];
}
function Wt(n, e, t) {
  const r = n.base !== void 0 ? n.base : 1;
  if (It(t) !== "number")
    return ye(n.default, e.default);
  const i = n.stops.length;
  if (i === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const s = je(n.stops.map((c) => c[0]), t), o = Zr(t, r, n.stops[s][0], n.stops[s + 1][0]), a = n.stops[s][1], l = n.stops[s + 1][1], u = er[e.type] || Vr;
  return typeof a.evaluate == "function" ? {
    evaluate(...c) {
      const f = a.evaluate.apply(void 0, c), p = l.evaluate.apply(void 0, c);
      if (!(f === void 0 || p === void 0))
        return u(f, p, o, n.colorSpace);
    }
  } : u(a, l, o, n.colorSpace);
}
function Xr(n, e, t) {
  switch (e.type) {
    case "color":
      t = w.parse(t);
      break;
    case "formatted":
      t = j.fromString(t.toString());
      break;
    case "resolvedImage":
      t = O.fromString(t.toString());
      break;
    case "padding":
      t = $.parse(t);
      break;
    default:
      It(t) !== e.type && (e.type !== "enum" || !e.values[t]) && (t = void 0);
  }
  return ye(t, n.default, e.default);
}
function Zr(n, e, t, r) {
  const i = r - t, s = n - t;
  return i === 0 ? 0 : e === 1 ? s / i : (Math.pow(e, s) - 1) / (Math.pow(e, i) - 1);
}
class gn {
  constructor(e, t) {
    this.expression = e, this._warningHistory = {}, this._evaluator = new sn(), this._defaultValue = t ? Kr(t) : null, this._enumValues = t && t.type === "enum" ? t.values : null;
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
function mn(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in kt;
}
function bn(n, e) {
  const t = new Fe(kt, Se, [], e ? Qr(e) : void 0), r = t.parse(n, void 0, void 0, void 0, e && e.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? rt(new gn(r, e)) : Q(t.errors);
}
class it {
  constructor(e, t) {
    this.kind = e, this._styleExpression = t, this.isStateDependent = e !== "constant" && !Mt(t.expression);
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, s, o);
  }
  evaluate(e, t, r, i, s, o) {
    return this._styleExpression.evaluate(e, t, r, i, s, o);
  }
}
class st {
  constructor(e, t, r, i) {
    this.kind = e, this.zoomStops = r, this._styleExpression = t, this.isStateDependent = e !== "camera" && !Mt(t.expression), this.interpolationType = i;
  }
  evaluateWithoutErrorHandling(e, t, r, i, s, o) {
    return this._styleExpression.evaluateWithoutErrorHandling(e, t, r, i, s, o);
  }
  evaluate(e, t, r, i, s, o) {
    return this._styleExpression.evaluate(e, t, r, i, s, o);
  }
  interpolationFactor(e, t, r) {
    return this.interpolationType ? A.interpolationFactor(this.interpolationType, e, t, r) : 0;
  }
}
function Jr(n) {
  return n._styleExpression !== void 0;
}
function vn(n, e) {
  const t = bn(n, e);
  if (t.result === "error")
    return t;
  const r = t.value.expression, i = xt(r);
  if (!i && !qr(e))
    return Q([new B("", "data expressions not supported")]);
  const s = Et(r, ["zoom"]);
  if (!s && !Ur(e))
    return Q([new B("", "zoom expressions not supported")]);
  const o = ke(r);
  if (!o && !s)
    return Q([new B("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
  if (o instanceof B)
    return Q([o]);
  if (o instanceof A && !pn(e))
    return Q([new B("", '"interpolate" expressions cannot be used with this property')]);
  if (!o)
    return rt(i ? new it("constant", t.value) : new it("source", t.value));
  const a = o instanceof A ? o.interpolation : void 0;
  return rt(i ? new st("camera", t.value, o.labels, a) : new st("composite", t.value, o.labels, a));
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
function Yr(n, e) {
  if (dn(n))
    return new Oe(n, e);
  if (mn(n)) {
    const t = vn(n, e);
    if (t.result === "error")
      throw new Error(t.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return t.value;
  } else {
    let t = n;
    return e.type === "color" && typeof n == "string" ? t = w.parse(n) : e.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? t = $.parse(n) : e.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? t = L.parse(n) : e.type === "projectionDefinition" && typeof n == "string" && (t = N.parse(n)), {
      kind: "constant",
      evaluate: () => t
    };
  }
}
function ke(n) {
  let e = null;
  if (n instanceof Be)
    e = ke(n.result);
  else if (n instanceof fe) {
    for (const t of n.args)
      if (e = ke(t), e)
        break;
  } else (n instanceof Re || n instanceof A) && n.input instanceof F && n.input.name === "zoom" && (e = n);
  return e instanceof B || n.eachChild((t) => {
    const r = ke(t);
    r instanceof B ? e = r : !e && r ? e = new B("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : e && r && e !== r && (e = new B("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), e;
}
function Qr(n) {
  const e = {
    color: z,
    string: v,
    number: h,
    enum: v,
    boolean: m,
    formatted: Le,
    padding: Ae,
    projectionDefinition: Pe,
    resolvedImage: pe,
    variableAnchorOffsetCollection: De
  };
  return n.type === "array" ? P(e[n.value] || b, n.length) : e[n.type];
}
function Kr(n) {
  return n.type === "color" && dn(n.default) ? new w(0, 0, 0, 0) : n.type === "color" ? w.parse(n.default) || null : n.type === "padding" ? $.parse(n.default) || null : n.type === "variableAnchorOffsetCollection" ? L.parse(n.default) || null : n.type === "projectionDefinition" ? N.parse(n.default) || null : n.default === void 0 ? null : n.default;
}
function wn(n) {
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
        if (!wn(e) && typeof e != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const ei = {
  StyleExpression: gn,
  StylePropertyFunction: Oe,
  ZoomConstantExpression: it,
  ZoomDependentExpression: st,
  createExpression: bn,
  createPropertyExpression: vn,
  isExpression: mn,
  isExpressionFilter: wn,
  isZoomExpression: Jr,
  normalizePropertyExpression: Yr
};
class fi {
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
      const c = this.colorSteps[u].speed, f = this.colorSteps[r].speed, p = Math.abs(c - f);
      (this.getTickMinStep() == 0 && t > 0 && s % t !== 0 || p < this.getTickMinStep()) && u < r ? a.textContent = "" : (a.textContent = `- ${c.toFixed(this.options.decimal)}`, r = u, a.style.marginTop = `${e}px`);
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
  getPosition() {
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
    var p;
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
    i >= 480 && (o = 15, a = 15, c = Math.max(15, l), f = Math.max(15, u)), i >= 992 && s >= 992 && (o = 40, a = 40, c = Math.max(40, l), f = Math.max(40, u)), (p = this.options.position) != null && p.endsWith("left") ? (t.style.marginLeft = `${c}px`, t.style.marginRight = `${u}px`) : (t.style.marginLeft = `${l}px`, t.style.marginRight = `${f}px`), t.style.marginTop = `${o}px`, t.style.marginBottom = `${a}px`, t.style.alignItems = "flex-start", t.style.display = "flex", t.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;
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
const x = {
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
    size: "10px"
  },
  // Transition
  transition: "all 0.2s ease"
}, Cn = /* @__PURE__ */ new Set();
function ti(n) {
  n.style.setProperty("--rp-mctl-text", x.color.text), n.style.setProperty("--rp-mctl-background", x.color.background), n.style.setProperty("--rp-mctl-hover", x.color.hover), n.style.setProperty("--rp-mctl-border", x.color.border), n.style.setProperty("--rp-mctl-borderLight", x.color.borderLight), n.style.setProperty("--rp-mctl-radius-sm", x.radius.sm), n.style.setProperty("--rp-mctl-radius-md", x.radius.md), n.style.setProperty("--rp-mctl-radius-lg", x.radius.lg), n.style.setProperty("--rp-mctl-shadow-sm", x.shadow.sm), n.style.setProperty("--rp-mctl-shadow-md", x.shadow.md), n.style.setProperty("--rp-mctl-font-family", x.font.family), n.style.setProperty("--rp-mctl-font-size", x.font.size);
}
function ni(n) {
  Cn.add(n), ti(n);
}
function ri(n) {
  Cn.delete(n);
}
const ii = {
  backgroundColor: "transparent",
  padding: "5px",
  border: "transparent",
  boxShadow: "none",
  borderRadius: x.radius.md,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontFamily: x.font.family,
  fontSize: x.font.size,
  color: x.color.text
};
function kn(n, e = {}) {
  Object.assign(n.style, ii), n.classList.add("maplibregl-ctrl", "maplibregl-ctrl-group"), e.classNames && e.classNames.forEach((t) => n.classList.add(t));
}
const si = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 6px",
  border: "none",
  cursor: "pointer",
  borderRadius: x.radius.md,
  width: "fit-content",
  color: x.color.text,
  backgroundColor: x.color.background,
  fontSize: x.font.size
}, ae = {
  iconWidth: 20,
  btnPaddingX: 6,
  btnPaddingY: 4,
  btnGap: 4,
  smallScreenThreshold: 768,
  minFontSize: 6,
  maxFontSize: 13,
  scalingFactor: 0.5
}, te = /* @__PURE__ */ new Map();
function xn(n, e) {
  te.has(n) || te.set(n, /* @__PURE__ */ new Map());
  const t = te.get(n);
  e.forEach((r, i) => {
    t == null || t.set(i, r);
  });
}
function Mn(n, e) {
  const t = te.get(n);
  t && (Object.entries(e).forEach(([r]) => {
    t.delete(r);
  }), t.size === 0 && te.delete(n));
}
function En(n) {
  const e = document.createElement("button");
  if (Object.assign(e.style, si), n.backgroundColor && (e.style.backgroundColor = n.backgroundColor), n.className && (e.className = n.className), n.title && (e.title = n.title), n.onClick && (e.onclick = n.onClick), n.icon)
    if (typeof n.icon == "string") {
      const r = document.createElement("div");
      r.innerHTML = n.icon, e.appendChild(r);
    } else
      e.appendChild(n.icon);
  const t = document.createElement("span");
  return t.textContent = n.label, t.style.fontSize = x.font.size, t.style.color = "inherit", e.appendChild(t), e;
}
function oi(n, e, t = 20) {
  const r = document.createElement("img");
  return r.src = `data:image/svg+xml,${encodeURIComponent(n)}`, r.alt = e, r.style.width = `${t}px`, r.style.height = `${t}px`, r.style.color = "white", r;
}
function ai(n) {
  return n.split("_").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
function li(n, e, t = ae.maxFontSize, r = ae.minFontSize) {
  const { iconWidth: i, btnPaddingX: s, btnGap: o, scalingFactor: a } = ae, l = n - i - s * 2 - o, u = e.replace(/<[^>]+>/g, "").length;
  if (u === 0) return r;
  let c = Math.floor(l / (u * a));
  return c = Math.min(t, Math.max(r, c)), c;
}
function In(n, e) {
  const t = te.get(n);
  if (!t || t.size === 0) return;
  const r = Array.from(t.values()), { smallScreenThreshold: i } = ae, s = e < i;
  r.forEach((l) => {
    const u = l.querySelector("span");
    u && (u.style.display = s ? "none" : "inline"), l.style.width = "fit-content";
  });
  const o = Math.max(...r.map((l) => l.offsetWidth)), a = s ? "34px" : `${o}px`;
  if (r.forEach((l) => {
    l.style.width = a;
  }), !s) {
    const l = r.map((c) => {
      const f = c.querySelector("span");
      return !f || !f.textContent ? null : [f, li(o, f.textContent)];
    }).filter((c) => !!c), u = Math.max(
      ae.minFontSize,
      Math.min(...l.map(([, c]) => c))
    );
    l.forEach(([c]) => {
      c.style.fontSize = `${u}px`;
    });
  }
}
function Tt(n, e) {
  const t = n.offsetWidth, r = n.offsetHeight;
  let i = 10, s = 10, o = Math.max(
    0,
    parseFloat(
      getComputedStyle(n).getPropertyValue("env(safe-area-inset-left)") || "0"
    )
  ), a = Math.max(
    0,
    parseFloat(
      getComputedStyle(n).getPropertyValue("env(safe-area-inset-right)") || "0"
    )
  ), l = o, u = a;
  return t >= 480 && (i = 15, s = 15, l = Math.max(15, o), u = Math.max(15, a)), r >= 992 && (i = 40, s = 40), t >= 992 && (l = Math.max(40, o), u = Math.max(40, a)), e != null && e.endsWith("left") ? (l = l, u = a) : (l = o, u = u), { marginTop: i, marginBottom: s, marginLeft: l, marginRight: u };
}
class hi {
  constructor(e) {
    g(this, "map");
    g(this, "options");
    g(this, "container");
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
    const e = this.map.getContainer(), t = this.options.position || "top-left", { marginTop: r, marginBottom: i, marginLeft: s, marginRight: o } = Tt(e, t);
    this.container.style.marginTop = `${r}px`, this.container.style.marginBottom = `${i}px`, this.container.style.marginLeft = `${s}px`, this.container.style.marginRight = `${o}px`;
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
class pi {
  constructor(e) {
    g(this, "map");
    g(this, "container");
    g(this, "options");
    g(this, "defaultActiveId");
    g(this, "activeButtonId", null);
    g(this, "buttons", /* @__PURE__ */ new Map());
    g(this, "instanceId");
    g(this, "listeners", {
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
    return e.id = this.instanceId, kn(e), this.options.buttons.forEach((t) => {
      const r = this.createButton(t);
      e.appendChild(r), this.buttons.set(t.id, r);
    }), this.updateLayout(), e;
  }
  updateInnerContainerStyle() {
    if (!this.map)
      return;
    const e = this.map.getContainer(), { marginTop: t, marginBottom: r, marginLeft: i, marginRight: s } = Tt(
      e,
      this.getPosition()
    );
    this.container.style.marginTop = `${t}px`, this.container.style.marginBottom = `${r}px`, this.container.style.marginLeft = `${i}px`, this.container.style.marginRight = `${s}px`, this.container.style.alignItems = "flex-start", this.container.style.display = "flex", this.updateLayout();
  }
  // Responsive design handling
  updateLayout() {
    if (!this.map)
      return;
    const t = this.map.getContainer().clientWidth;
    In(this.getPosition(), t);
  }
  // Create a single button with icon and label
  createButton(e) {
    return En({
      icon: oi(e.svg, e.label),
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
      i === this.activeButtonId ? r.style.backgroundColor = x.color.activeBackground : r.style.backgroundColor = x.color.background;
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
    return xn(this.getPosition(), this.buttons), this.container;
  }
  // Remove control from the map
  onRemove() {
    var e;
    Mn(this.getPosition(), this.buttons), this.map && (this.map.off("resize", this.updateInnerContainerStyle), this.map.off("styledata", this.updateInnerContainerStyle)), this.options.buttons.forEach((t) => {
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
class di {
  constructor(e = {}) {
    g(this, "map", null);
    g(this, "container", null);
    g(this, "panel", null);
    g(this, "buttons", /* @__PURE__ */ new Map());
    g(this, "feature", "wave");
    g(this, "position");
    g(this, "collapsed", !1);
    // Runtime state
    g(this, "featureConfigGroups");
    g(this, "layerConfigs");
    g(this, "onChange");
    this.position = e.position || "top-right", this.collapsed = e.collapsed || !0, this.featureConfigGroups = e.featureConfigs || {}, this.feature = e.feature || "wave", this.layerConfigs = this.featureConfigGroups[this.feature] || {}, this.onChange = e.onChange || ((t, r, i, s) => {
      console.log("Layer config changed:", t, r, i, s);
    });
  }
  /** Called when control is added to the map */
  onAdd(e) {
    this.map = e, this.container = document.createElement("div"), kn(this.container, { classNames: ["layer-manager"] }), this.panel = document.createElement("div"), this.panel.className = "layer-manager-panel", this.collapsed && (this.panel.style.display = "none");
    const t = this._createHeader(), r = this._createLayersSection();
    return this.container.appendChild(t), this.panel.appendChild(r), this.container.appendChild(this.panel), ni(this.container), xn(this.getPosition(), this.buttons), this.map.on("resize", () => {
      this._updateContainerPosition();
    }), this.map.on("styledata", () => {
      this._updateContainerPosition();
    }), this.container;
  }
  /** Called when control is removed from the map */
  onRemove() {
    this.map && (this.map.off("resize", this._updateContainerPosition), this.map.off("styledata", this._updateContainerPosition)), Mn(this.getPosition(), this.buttons), this.container && ri(this.container), this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container), this.map = null;
  }
  /**
   * Update container positioning based on map dimensions and safe area insets
   */
  _updateContainerPosition() {
    if (!this.map || !this.container)
      return;
    const e = this.map.getContainer(), { marginTop: t, marginBottom: r, marginLeft: i, marginRight: s } = Tt(
      e,
      this.getPosition()
    );
    this.container.style.marginTop = `${t}px`, this.container.style.marginBottom = `${r}px`, this.container.style.marginLeft = `${i}px`, this.container.style.marginRight = `${s}px`, this._updateButtonLayout();
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
    const t = En({
      icon: this._createLayersIcon(20),
      label: "Layers Setting",
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
    return r.className = "layer-manager-list", Object.entries(this.layerConfigs).forEach(([i, s]) => {
      const o = this._createLayerItem(i, s);
      r.appendChild(o);
    }), e.appendChild(r), e;
  }
  /** Create toggle (checkbox) item */
  _createToggleItem(e, t) {
    const r = document.createElement("input");
    r.type = "checkbox", r.className = "layer-manager-checkbox", r.checked = !!t.value, r.onchange = (s) => {
      const o = { ...t };
      t.value = s.target.checked, this.onChange(this.feature, e, o, t);
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
        var f;
        const c = document.createElement("option");
        c.value = String(l), c.textContent = ((f = t.labels) == null ? void 0 : f[u]) ?? String(l), l === t.value && (c.selected = !0), a.appendChild(c);
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
        const f = document.createElement("input");
        f.type = "radio", f.name = e, f.value = String(l), f.checked = l === t.value, f.onchange = (y) => {
          const C = { ...t };
          t.value = y.target.value, this.onChange(this.feature, e, C, t);
        };
        const p = document.createElement("span");
        p.textContent = ((d = t.labels) == null ? void 0 : d[u]) ?? String(l), c.append(f, p), a.appendChild(c);
      }), i = a;
    }
    const s = document.createElement("fieldset");
    s.className = "layer-manager-fieldset";
    const o = document.createElement("legend");
    return o.className = "layer-manager-legend", o.textContent = t.label || e, s.append(o, i), [s];
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
    In(this.getPosition(), t);
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
  fi as ColorBar,
  di as ConfigManager,
  hi as MsgCtl,
  ci as TemporalControl,
  pi as ToggleCtl
};
//# sourceMappingURL=index.js.map
