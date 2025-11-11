import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ColorBar, MsgCtl } from '../src';

const map = new maplibregl.Map({
	container: 'map',
	style: {
		version: 8,
		sources: {
			OSM: {
				type: 'raster',
				tiles: [
					'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
				],
				tileSize: 256,
				attribution:
					'<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
			},
		},
		layers: [
			{
				id: 'gsi',
				type: 'raster',
				source: 'OSM',
				minzoom: 0,
				maxzoom: 17,
			},
		],
	},
	center: [139.7, 35.7],
	zoom: 10,
	minZoom: 4,
	maxZoom: 12,
});

const waveColors = {
  'fill-opacity': 1.0,
  'fill-color': [
    'step',
    ['get', 'speed'],
    '#0e00cc',
    0.03125, '#0e66cc', // 0.5
    0.06250, '#0299ff', // 1.0
    0.09375, '#66ccff', // 1.5
    0.12500, '#66e6ff', // 2.0
    0.15625, '#aaffee', // 2.5
    0.18750, '#00ffcb', // 3.0
    0.21875, '#00e6b3', // 3.5
    0.25000, '#00cc88', // 4.0
    0.28125, '#a8ff04',
    0.31250, '#feff32',
    0.34375, '#9aff00',
    0.37500, '#508000',
    0.40625, '#ffcc65',
    0.43750, '#ff9966',
    0.46875, '#ff6602',
    0.50000, '#d45a4a',
    0.53125, '#f04020',
    0.56250, '#a83838',
    0.59375, '#ffccff',
    0.62500, '#ff99ff',
    0.65625, '#ff66ff',
    0.68750, '#cc02ff',
    0.71875, '#9900cc',
    0.75000, '#402060',
    0.78125, '#c0c0c0',
    0.81250, '#999999',
    0.84375, '#666666',
    0.87500, '#333333', // 1.000, 14
  ],
};

// const colorbar = new ColorBar(wavePeriodColors, {
const colorBar = new ColorBar(waveColors, {
	title: "Wave Height",
  unit: "m",
  max: 16,
  height: '390px',
  width: '50px',
  position: "top-left",
  tickMinStep: 1,
  onClick: (event, bar, options) => {
    // Cycle through max values: 16, 48, 64
    const currentMax = options.max || 16;
    let nMax = 16;
    let nTickMinStep = 1;
    let nUnit = 'm';

    if (currentMax === 16) {
      nMax = 56;
      nTickMinStep = 2;
      nUnit = 'ft';
    } else if (currentMax === 56) {
      nMax = 16;
      nTickMinStep = 1;
      nUnit = 'm';
    } else {
      nMax = 16;
      nTickMinStep = 1;
      nUnit = 'm';
    }

    // Update the colorbar with the new max value
    bar.updateOptions({ max: nMax, tickMinStep: nTickMinStep, unit: nUnit });

    console.log(`ColorBar clicked! Max value changed from ${currentMax} to ${nMax}`);
  }
});

map.addControl(colorBar, 'top-left');

const msgHtml = `
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
`;

const msgShow = new MsgCtl({
  position: "bottom-right",
  innerHTML: msgHtml,
  innerClassName: 'rp-custom-msg-ctl',
  width: '160px',
  height: '150px',
  style: {
    color: '#fff',
    fontSize: '14px',
    padding: '4px',
    display: 'flex',         // Enable Flexbox for centering
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically
  }, 
});

map.addControl(msgShow, 'bottom-right');

// Add controls to test colorbar update functionality
const updateControls = document.createElement('div');
updateControls.style.position = 'absolute';
updateControls.style.top = '10px';
updateControls.style.right = '10px';
updateControls.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
updateControls.style.padding = '10px';
updateControls.style.borderRadius = '5px';
updateControls.style.zIndex = '1000';

// Title update control
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.value = 'Wind';
titleInput.placeholder = 'Title';
titleInput.style.marginBottom = '5px';
titleInput.style.width = '100px';

const updateTitleBtn = document.createElement('button');
updateTitleBtn.textContent = 'Update Title';
updateTitleBtn.style.marginLeft = '5px';
updateTitleBtn.style.marginBottom = '5px';
updateTitleBtn.onclick = () => {
  colorBar.updateOptions({ title: titleInput.value });
};

// Unit update control  
const unitInput = document.createElement('input');
unitInput.type = 'text';
unitInput.value = 'm/s';
unitInput.placeholder = 'Unit';
unitInput.style.marginBottom = '5px';
unitInput.style.width = '100px';

const updateUnitBtn = document.createElement('button');
updateUnitBtn.textContent = 'Update Unit';
updateUnitBtn.style.marginLeft = '5px';
updateUnitBtn.style.marginBottom = '5px';
updateUnitBtn.onclick = () => {
  colorBar.updateOptions({ unit: unitInput.value });
};

// Max value update control
const maxInput = document.createElement('input');
maxInput.type = 'number';
maxInput.value = '16';
maxInput.placeholder = 'Max';
maxInput.style.marginBottom = '5px';
maxInput.style.width = '100px';

const updateMaxBtn = document.createElement('button');
updateMaxBtn.textContent = 'Update Max';
updateMaxBtn.style.marginLeft = '5px';
updateMaxBtn.style.marginBottom = '5px';
updateMaxBtn.onclick = () => {
  colorBar.updateOptions({ max: parseFloat(maxInput.value) });
};

// Decimal precision update control
const decimalInput = document.createElement('input');
decimalInput.type = 'number';
decimalInput.value = '1';
decimalInput.placeholder = 'Decimal';
decimalInput.min = '0';
decimalInput.max = '5';
decimalInput.style.marginBottom = '5px';
decimalInput.style.width = '100px';

const updateDecimalBtn = document.createElement('button');
updateDecimalBtn.textContent = 'Update Decimal';
updateDecimalBtn.style.marginLeft = '5px';
updateDecimalBtn.style.marginBottom = '5px';
updateDecimalBtn.onclick = () => {
  colorBar.updateOptions({ decimal: parseInt(decimalInput.value) });
};

// MsgShow toggle control
const toggleMsgShowBtn = document.createElement('button');
toggleMsgShowBtn.textContent = 'Hide Msg';
toggleMsgShowBtn.style.marginLeft = '5px';
toggleMsgShowBtn.style.marginBottom = '5px';
toggleMsgShowBtn.onclick = () => {
  // Access the container through the map's DOM since MsgCtl doesn't expose container directly
  const msgContainer = document.querySelector('.maplibregl-ctrl-msg') as HTMLElement;
  if (msgContainer) {
    const isVisible = msgContainer.style.display !== 'none';
    if (isVisible) {
      msgContainer.style.display = 'none';
      toggleMsgShowBtn.textContent = 'Show Msg';
    } else {
      msgContainer.style.display = 'block';
      toggleMsgShowBtn.textContent = 'Hide Msg';
    }
  }
};

// Add all controls to the container
updateControls.appendChild(document.createTextNode('Title: '));
updateControls.appendChild(titleInput);
updateControls.appendChild(updateTitleBtn);
updateControls.appendChild(document.createElement('br'));

updateControls.appendChild(document.createTextNode('Unit: '));
updateControls.appendChild(unitInput);
updateControls.appendChild(updateUnitBtn);
updateControls.appendChild(document.createElement('br'));

updateControls.appendChild(document.createTextNode('Max: '));
updateControls.appendChild(maxInput);
updateControls.appendChild(updateMaxBtn);
updateControls.appendChild(document.createElement('br'));

updateControls.appendChild(document.createTextNode('Decimal: '));
updateControls.appendChild(decimalInput);
updateControls.appendChild(updateDecimalBtn);
updateControls.appendChild(document.createElement('br'));

updateControls.appendChild(document.createTextNode('Msg Control: '));
updateControls.appendChild(toggleMsgShowBtn);

// Add the controls container to the map
map.getContainer().appendChild(updateControls);
