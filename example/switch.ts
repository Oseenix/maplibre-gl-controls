import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ToggleCtl, TgBtnCfg, ConfigManager } from '../src';

// const map = new maplibregl.Map({
// 	container: 'map',
// 	style: {
// 		version: 8,
// 		sources: {
// 			OSM: {
// 				type: 'raster',
// 				tiles: [
// 					'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{极y}.jpg',
// 				],
// 				tileSize: 256,
// 				attribution:
// 					'<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
// 			},
// 		},
// 		layers: [
// 			{
// 				id: 'gsi',
// 				type: 'raster',
// 				source: 'OSM',
// 				minzoom: 0,
// 				maxzoom: 17,
// 			},
// 		],
// 	},
// 	center: [139.7, 35.7],
// 	zoom: 10,
// 	minZoom: 4,
// 	maxZoom: 12,
// });

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

export const wave_icon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-ripple"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" /><path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" /><path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" /></svg>'

export const wind_icon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-wind"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" /><path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" /><path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" /></svg>'

export const max_icon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-maximize"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 4l4 0l0 4" /><path d="M14 10l6 -6" /><path d="M8 20l-4 0l0 -4" /><path d="M4 20l6 -6" /><path d="M16 20l4 0l0 -4" /><path d="M14 14l6 6" /><path d="M8 4l-4 0l0 4" /><path d="M4 4l6 6" /></svg>'

export const restore_icon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-minimize"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 9l4 0l0 -4" /><path d="M3 极l6 6" /><path d="M5 15l4 0l0 4" /><path d="M3 21l6 -6" /><path d="M19 9l-4 0l0 -4" /><path d="M15 9l6 -极" /><path d="M19 15l-4 极l0 4" /><path d="M15 15l6 6" /></svg>'

let isFullscreen = false;

const fullscreenHandler = (toggleCtl: ToggleCtl) => {
  isFullscreen = !!document.fullscreenElement;
  toggleCtl.updateButton('fullscreen', {
    svg: isFullscreen ? restore_icon : max_icon,
    label: isFullscreen ? 'Normal' : 'Fullscreen'
  });
};

// Initialize the Layer Manager
const layerManager = new ConfigManager({
  feature: 'wave',
  featureConfigs: {
    wave: {
      pressure: {
        type: 'toggle',
        value: false,
        label: 'Pressure Isobar'
      },
      direction: {
        type: 'select',
        value: 'Particle',
        options: ['Particle', 'Arrow', 'None'],
        labels: ['Particle', 'Arrow', 'None'],
        label: 'Direction Indicator'
      }
    },
    wind: {
      pressure: {
        type: 'toggle',
        value: true,
        label: 'Pressure Isobar'
      },
      direction: {
        type: 'select',
        value: 'Particle',
        options: ['Particle', 'Arrow', 'None'],
        labels: ['Particle', 'Arrow', 'None'],
        label: 'Direction Indicator'
      }
    },
    wave_period: {
      pressure: {
        type: 'toggle',
        value: false,
        label: 'Pressure Isobar'
      },
      direction: {
        type: 'select',
        value: 'Particle',
        options: ['Particle', 'Arrow', 'None'],
        labels: ['Particle', 'Arrow', 'None'],
        label: 'Direction Indicator'
      }
    }
  },
  position: 'bottom-right',
  style: {
    marginBottom: '10px',
  },
  collapsed: false,
  onChange: (feature, key, preCfg, curCfg) => {
    console.log(`Config changed for ${feature}.${key}:`, preCfg, '->', curCfg);
  }
});

const layerToggleControl = new ToggleCtl({
  buttons: [
    {
      id: 'wave',
      svg: wave_icon, // Road icon SVG
      label: 'Wave Height',
      layerIds: ['roads-layer', 'highways-layer']
    },
    {
      id: 'wind',
      svg: wind_icon, // Building icon SVG
      label: 'Wind Speed',
      layerIds: ['buildings-layer']
    },
    {
      id: 'fullscreen',
      svg: max_icon, // Road icon SVG
      label: 'Fullscreen',
      layerIds: ['roads-layer', 'highways-layer'],
      repeat: true,
      setup: (ctl: ToggleCtl, map: maplibregl.Map | undefined) => {
        document.addEventListener('fullscreenchange', () => fullscreenHandler(ctl));
      },
      cleanup: (ctl: ToggleCtl, map: maplibregl.Map | undefined) => {
        document.removeEventListener('fullscreenchange', () => fullscreenHandler(ctl));
      }
    }
  ],
  defaultActive: 'wave',
  position: 'top-right',
  onToggle: (ctl: ToggleCtl, map: maplibregl.Map,
             config: TgBtnCfg) => {;
    const activeButtonId = config.id;
    const layerIds = config.layerIds;
    console.log(`Switch to ${activeButtonId} with layers:`, layerIds);

    if (activeButtonId === 'fullscreen') {
      const mapContainer = map.getContainer();
      if (!isFullscreen) {
        if (mapContainer.requestFullscreen) {
          mapContainer.requestFullscreen();
          isFullscreen = true;
          ctl.updateButton('fullscreen', { svg: restore_icon, label: 'Normal' });
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          isFullscreen = false;
          ctl.updateButton('fullscreen', { svg: max_icon, label: 'Fullscreen' });
        }
      }
    } else {
      layerManager.updateFeature(activeButtonId);
    }
  }
});

map.addControl(layerToggleControl);

// Add the layer manager to the map
// map.addControl(layerManager, 'bottom-left');
map.addControl(layerManager, 'bottom-right');

console.log('Layer Manager initialized successfully!');