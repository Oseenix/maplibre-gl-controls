import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { ConfigManager } from '../src';

const mapContainer = document.getElementById('map');
if (!mapContainer) {
  throw new Error('Map container #map not found');
}

// Initialize the map
const map = new maplibregl.Map({
  container: mapContainer,
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors',
      },
      'usgs-imagery': {
        type: 'raster',
        tiles: [
          'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        attribution: 'USGS',
      },
      'us-states': {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
      },
      cities: {
        type: 'geojson',
        data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson',
      },
    },
    layers: [
      {
        id: 'background',
        type: 'raster',
        source: 'osm',
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: 'usgs-imagery',
        type: 'raster',
        source: 'usgs-imagery',
        minzoom: 0,
        maxzoom: 16,
        layout: {
          visibility: 'none',
        },
        paint: {
          'raster-opacity': 0.8,
        },
      },
      {
        id: 'us-states',
        type: 'fill',
        source: 'us-states',
        paint: {
          'fill-color': '#627BC1',
          'fill-opacity': 0.5,
          'fill-outline-color': '#ffffff',
        },
      },
      {
        id: 'us-states-border',
        type: 'line',
        source: 'us-states',
        paint: {
          'line-color': '#627BC1',
          'line-width': 2,
          'line-opacity': 0.8,
        },
      },
      {
        id: 'cities',
        type: 'circle',
        source: 'cities',
        paint: {
          'circle-radius': 5,
          'circle-color': '#3388ff',
          'circle-opacity': 0.8,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 1,
          'circle-stroke-opacity': 1,
        },
      },
    ],
  },
  center: [-98.5795, 39.8283],
  zoom: 3.5,
});

// Wait for the map to load
map.on('load', () => {
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
    position: 'top-left',
    collapsed: false,
    onChange: (feature, key, preCfg, curCfg) => {
      console.log(`Config changed for ${feature}.${key}:`, preCfg, '->', curCfg);
    }
  });

  // Add the layer manager to the map
  map.addControl(layerManager, 'top-left');

  console.log('Layer Manager initialized successfully!');
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl(), 'top-right');

// Add scale control
map.addControl(new maplibregl.ScaleControl(), 'bottom-left');

// Add click handler for cities
map.on('click', 'cities', (e) => {
  if (!e.features || e.features.length === 0) return;

  const feature = e.features[0];
  const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice();
  const name = feature.properties?.name;

  new maplibregl.Popup()
    .setLngLat(coordinates as [number, number])
    .setHTML(`<strong>${name || 'Unknown'}</strong>`)
    .addTo(map);
});

// Change cursor on hover
map.on('mouseenter', 'cities', () => {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'cities', () => {
  map.getCanvas().style.cursor = '';
});
