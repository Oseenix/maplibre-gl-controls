![GitHub Release](https://badge.fury.io/js/maplibre-gl-temporal-control.svg)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/mug-jp/maplibre-gl-temporal-control/test.yml?label=test)
[![codecov](https://codecov.io/gh/mug-jp/maplibre-gl-temporal-control/graph/badge.svg?token=Jy2oiwr0KV)](https://codecov.io/gh/mug-jp/maplibre-gl-temporal-control)

# maplibre-gl-controls

<img src='./imgs/anime.gif'>

A collection of useful controls for MapLibre GL JS including temporal controls, color bars, message displays, and toggle buttons.

## Available Controls

- **TemporalControl**: Time-based layer animation control
- **ColorBar**: Color scale legend for data visualization
- **MsgCtl**: Message display control for showing information
- **ToggleCtl**: Toggle button group for layer switching and actions

## Installation

For local development or using the extended controls, clone this repository:

```sh
git clone https://github.com/Oseenix/maplibre-gl-controls.git
cd maplibre-gl-controls
pnpm install
```

## Usage

### TemporalControl

The TemporalControl allows you to create time-based animations of map layers.

```typescript
import { TemporalControl } from 'maplibre-gl-controls';

const map = new maplibregl.Map(mapOptions);

// Add layers to the map
map.addLayer(anyLayer1_1);
map.addLayer(anyLayer1_2);
map.addLayer(anyLayer2_1);
map.addLayer(anyLayer2_2);
// add more layers...

const temporalFrames = [
    {
        title: 'frame1', // shown on control panel
        layers: [anyLayer1_1, anyLayer1_2] // layers to show in this frame
    },
    {
        title: 'frame2',
        layers: [anyLayer2_1, anyLayer2_2]
    },
    {
        title: 'frame3',
        layers: [anyLayer3_1, anyLayer3_2]
    },
    // add more frames...
];

const temporalControl = new TemporalControl(temporalFrames, {
    interval: 100, // duration a frame is shown, in milliseconds
    position: 'top-left',
    performance: true // set when rendering is too slow
});
map.addControl(temporalControl);

// Programmatic control
temporalControl.prev();
temporalControl.next();
temporalControl.play();
temporalControl.pause();
temporalControl.isPlaying();
temporalControl.isLoopEnabled();
temporalControl.setLoopEnabled(true);
temporalControl.goto(5);
```

### ColorBar

The ColorBar control displays a color scale legend for data visualization.

```typescript
import { ColorBar } from 'maplibre-gl-controls';

const waveColors = {
  'fill-color': [
    'step',
    ['get', 'speed'],
    '#deffff',
    0.0625, '#94f6f9',
    0.1250, '#4ee9f2',
    0.1875, '#9BCDFD',
    // ... more color steps
  ],
};

const colorbar = new ColorBar(waveColors, {
  title: "Wind Speed",
  unit: "m/s",
  max: 32,
  position: "top-left",
  tickMinStep: 2,
  decimal: 1,
  onClick: (event, options) => {
    console.log('ColorBar clicked with options:', options);
  }
});
map.addControl(colorbar);

// Update options dynamically
colorbar.updateOptions({
  title: "Wave Height",
  unit: "m",
  max: 16
});
```

### MsgCtl

The MsgCtl displays messages or information on the map.

```typescript
import { MsgCtl } from 'maplibre-gl-controls';

const msgControl = new MsgCtl({
  msg: "Local Model", // Simple text message
  position: "bottom-right",
  width: "120px",
  height: "24px",
  style: {
    color: '#fff',
    fontSize: '14px',
    padding: '4px',
    backgroundColor: 'rgba(0, 36, 71, 0.8)'
  }
});

// Or with HTML content
const htmlMsgControl = new MsgCtl({
  innerHTML: '<strong>Local Model</strong><br><small>Updated: 2024</small>',
  position: "top-right",
  style: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
map.addControl(htmlMsgControl);

// Update content dynamically
msgControl.updateContent("New Message", false); // text
msgControl.updateContent("<strong>HTML</strong> content", true); // HTML

// Update styles
msgControl.updateStyle({
  backgroundColor: 'rgba(255, 0, 0, 0.7)',
  fontSize: '16px'
});
```

### ToggleCtl

The ToggleCtl provides a group of toggle buttons for layer switching and actions.

```typescript
import { ToggleCtl, TgBtnCfg } from 'maplibre-gl-controls';

const waveIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1"><path d="M3 7c3 -2 6 -2 9 0s6 2 9 0"/></svg>';
const windIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1"><path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24"/></svg>';

const toggleControl = new ToggleCtl({
  buttons: [
    {
      id: 'wave',
      svg: waveIcon,
      label: 'Wave Height',
      layerIds: ['wave-layer'],
      onToggle: (ctl, map, config) => {
        map.setLayoutProperty('wave-layer', 'visibility', 'visible');
        map.setLayoutProperty('wind-layer', 'visibility', 'none');
      },
      onUntoggle: (ctl, map, config) => {
        map.setLayoutProperty('wave-layer', 'visibility', 'none');
      }
    },
    {
      id: 'wind',
      svg: windIcon,
      label: 'Wind Speed',
      layerIds: ['wind-layer'],
      onToggle: (ctl, map, config) => {
        map.setLayoutProperty('wind-layer', 'visibility', 'visible');
        map.setLayoutProperty('wave-layer', 'visibility', 'none');
      }
    }
  ],
  defaultActive: 'wave',
  position: 'top-right',
  onToggle: (ctl, map, config) => {
    console.log(`Switched to ${config.label}`);
  }
});
map.addControl(toggleControl);

// Programmatic control
toggleControl.setActiveButton('wind');
const activeButton = toggleControl.getActiveButton();

// Update button dynamically
toggleControl.updateButton('wave', {
  label: 'Ocean Waves',
  svg: updatedWaveIcon
});
```

### Via CDN

```html
<script type="module">
    import { TemporalControl, ColorBar, MsgCtl, ToggleCtl } from 'https://www.unpkg.com/maplibre-gl-controls@latest/build/index.js';
    
    // Use the controls as shown above
    const temporalControl = new TemporalControl(temporalFrames);
    map.addControl(temporalControl);
</script>
```

## Examples

- RasterTiles: <https://mug-jp.github.io/maplibre-gl-temporal-control/raster.html>
- VectorTiles: <https://mug-jp.github.io/maplibre-gl-temporal-control/vector.html>
- Controls Demo: <https://mug-jp.github.io/maplibre-gl-temporal-control/controls.html>

## Tips

- **TemporalControl**: Layers set in frames must be added to the map first
- **ColorBar**: Use `tickMinStep` to control label density on the color scale
- **MsgCtl**: Supports both plain text and HTML content with custom styling
- **ToggleCtl**: Buttons can trigger custom actions beyond layer visibility

## API Reference

### TemporalControl Options
- `interval`: Duration per frame in milliseconds (default: 500)
- `position`: Control position (default: 'bottom-left')
- `performance`: Optimize rendering for large datasets (default: false)

### ColorBar Options
- `title`: Title displayed at the top
- `unit`: Unit displayed at the bottom
- `max`: Maximum value for scaling
- `decimal`: Decimal places for labels
- `tickMinStep`: Minimum step between labels
- `onClick`: Click event handler

### MsgCtl Options
- `msg`: Text message content
- `innerHTML`: HTML content (overrides msg)
- `width`, `height`: Control dimensions
- `style`: Custom CSS styles

### ToggleCtl Options
- `buttons`: Array of button configurations
- `defaultActive`: ID of default active button
- `onToggle`: Global toggle callback
- `onUntoggle`: Global untoggle callback

## Development

```sh
pnpm install
pnpm run dev
pnpm test
```
