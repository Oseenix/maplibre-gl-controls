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

const msgShow = new MsgCtl({
  position: "bottom-right",
  innerHTML: '<strong>Local Model</strong>',
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
updateMaxBtn.style.marginBottom = '5px';
updateDecimalBtn.onclick = () => {
  colorBar.updateOptions({ decimal: parseInt(decimalInput.value) });
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

// Add the controls container to the map
map.getContainer().appendChild(updateControls);
