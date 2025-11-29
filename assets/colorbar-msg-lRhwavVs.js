import{m as v}from"./maplibre-gl-BYDgI10c.js";import{C,M as b}from"./msg-CzNYUrd7.js";import"./ui-BYb2tV79.js";const g=new v.Map({container:"map",style:{version:8,sources:{OSM:{type:"raster",tiles:["https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"],tileSize:256,attribution:'<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>'}},layers:[{id:"gsi",type:"raster",source:"OSM",minzoom:0,maxzoom:17}]},center:[139.7,35.7],zoom:10,minZoom:4,maxZoom:12}),M={"fill-opacity":1,"fill-color":["step",["get","speed"],"#0e00cc",.03125,"#0e66cc",.0625,"#0299ff",.09375,"#66ccff",.125,"#66e6ff",.15625,"#aaffee",.1875,"#00ffcb",.21875,"#00e6b3",.25,"#00cc88",.28125,"#a8ff04",.3125,"#feff32",.34375,"#9aff00",.375,"#508000",.40625,"#ffcc65",.4375,"#ff9966",.46875,"#ff6602",.5,"#d45a4a",.53125,"#f04020",.5625,"#a83838",.59375,"#ffccff",.625,"#ff99ff",.65625,"#ff66ff",.6875,"#cc02ff",.71875,"#9900cc",.75,"#402060",.78125,"#c0c0c0",.8125,"#999999",.84375,"#666666",.875,"#333333"]},p=new C(M,{title:"Wave Height",unit:"m",max:16,height:"390px",width:"50px",position:"top-left",tickMinStep:1,onClick:(a,y,h)=>{const u=h.max||16;let d=16,f=1,x="m";u===16?(d=56,f=2,x="ft"):(d=16,f=1,x="m"),y.updateOptions({max:d,tickMinStep:f,unit:x}),console.log(`ColorBar clicked! Max value changed from ${u} to ${d}`)}});g.addControl(p,"top-left");const w=`
<div style="display:flex;align-items:center;gap:1px;">
    <div>
      <div style="font-weight:600;">Piha Beach</div>
      <hr style="border: none; border-top: 1px solid #666; margin: 4px 0;" />
      <div style="font-size:12px; color:#fff; margin-bottom: 4px;">
        Nov 11, 2025 14:30
      </div>
      <hr style="border: none; border-top: 1px solid #666; margin: 4px 0;" />
      <div style="display: grid; grid-template-columns: max-content 1fr; gap: 4px 8px; font-size:12px; color:#fff;">
        <div>Surf Quality:</div>
        <div style="display:flex;align-items:center;gap:4px;">
          Good <div style="width:10px;height:10px;border-radius:50%;background:#4caf50;"></div>
        </div>

        <div>Breaking Wave:</div>
        <div>1.8 m</div>

        <div>Wind Speed:</div>
        <div>14 km/h</div>

        <div>Wind Direction:</div>
        <div style="display:flex;align-items:center;gap:4px;">
          <div>225.0&deg;</div>
          <svg
            viewBox="0 0 18 28"
            height="0.75rem"
            xmlns="http://www.w3.org/2000/svg"
            style="transform: rotate(225deg); transition: transform 0.3s ease;"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.6025 17.5707C17.9909 17.0787 17.6415 16.3564 17.0152 16.3564H11.7168V0.929626C11.7168 0.515804 11.3817 0.180664 10.9679 0.180664H7.4901C7.07552 0.180664 6.73901 0.51709 6.73901 0.931641V16.3564H1.44408C0.817131 16.3564 0.465937 17.08 0.854134 17.5717L8.63969 27.4321C8.93977 27.8121 9.51647 27.8116 9.81696 27.4311L17.6025 17.5707Z"
              fill="#2c75bd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
`,B=new b({position:"bottom-right",innerHTML:w,innerClassName:"rp-custom-msg-ctl",width:"160px",height:"150px",style:{color:"#fff",fontSize:"14px",padding:"4px",display:"flex",justifyContent:"center",alignItems:"center"}});g.addControl(B,"bottom-right");const e=document.createElement("div");e.style.position="absolute";e.style.top="10px";e.style.right="10px";e.style.backgroundColor="rgba(255, 255, 255, 0.8)";e.style.padding="10px";e.style.borderRadius="5px";e.style.zIndex="1000";const i=document.createElement("input");i.type="text";i.value="Wind";i.placeholder="Title";i.style.marginBottom="5px";i.style.width="100px";const s=document.createElement("button");s.textContent="Update Title";s.style.marginLeft="5px";s.style.marginBottom="5px";s.onclick=()=>{p.updateOptions({title:i.value})};const o=document.createElement("input");o.type="text";o.value="m/s";o.placeholder="Unit";o.style.marginBottom="5px";o.style.width="100px";const r=document.createElement("button");r.textContent="Update Unit";r.style.marginLeft="5px";r.style.marginBottom="5px";r.onclick=()=>{p.updateOptions({unit:o.value})};const l=document.createElement("input");l.type="number";l.value="16";l.placeholder="Max";l.style.marginBottom="5px";l.style.width="100px";const c=document.createElement("button");c.textContent="Update Max";c.style.marginLeft="5px";c.style.marginBottom="5px";c.onclick=()=>{p.updateOptions({max:parseFloat(l.value)})};const t=document.createElement("input");t.type="number";t.value="1";t.placeholder="Decimal";t.min="0";t.max="5";t.style.marginBottom="5px";t.style.width="100px";const m=document.createElement("button");m.textContent="Update Decimal";m.style.marginLeft="5px";m.style.marginBottom="5px";m.onclick=()=>{p.updateOptions({decimal:parseInt(t.value)})};const n=document.createElement("button");n.textContent="Hide Msg";n.style.marginLeft="5px";n.style.marginBottom="5px";n.onclick=()=>{const a=document.querySelector(".maplibregl-ctrl-msg");a&&(a.style.display!=="none"?(a.style.display="none",n.textContent="Show Msg"):(a.style.display="block",n.textContent="Hide Msg"))};e.appendChild(document.createTextNode("Title: "));e.appendChild(i);e.appendChild(s);e.appendChild(document.createElement("br"));e.appendChild(document.createTextNode("Unit: "));e.appendChild(o);e.appendChild(r);e.appendChild(document.createElement("br"));e.appendChild(document.createTextNode("Max: "));e.appendChild(l);e.appendChild(c);e.appendChild(document.createElement("br"));e.appendChild(document.createTextNode("Decimal: "));e.appendChild(t);e.appendChild(m);e.appendChild(document.createElement("br"));e.appendChild(document.createTextNode("Msg Control: "));e.appendChild(n);g.getContainer().appendChild(e);
