import { expect, test } from 'vitest';

import { ColorBar } from './index.ts';
import { Map } from 'maplibre-gl';

test('unittest', async () => {
  const waveColors = {
    'fill-color': [
      'step',
      ['get', 'speed'],
      '#deffff',
      0.0625, '#94f6f9',
      0.1250, '#4ee9f2',
      0.1875, '#9BCDFD',
    ],
  };

  const colorbar = new ColorBar(waveColors, {
    title: "Wind Speed",
    unit: "m/s",
    max: 32,
  });
  
  expect(colorbar).toBeDefined();

  const map = new Map({ container: document.createElement('div') });
  expect(map.hasControl(colorbar)).toBe(false);
  map.addControl(colorbar);
  expect(map.hasControl(colorbar)).toBe(true);
  map.removeControl(colorbar);
  expect(map.hasControl(colorbar)).toBe(false);
});

test('updateOptions method', async () => {
  const waveColors = {
    'fill-color': [
      'step',
      ['get', 'speed'],
      '#deffff',
      0.0625, '#94f6f9',
      0.1250, '#4ee9f2',
    ],
  };

  const colorbar = new ColorBar(waveColors, {
    title: "Wind Speed",
    unit: "m/s",
    max: 32,
    tickMinStep: 2,
  });

  // Test updating options
  colorbar.updateOptions({
    title: "Wave Height",
    unit: "m",
    max: 16,
    tickMinStep: 1,
  });

  expect(colorbar).toBeDefined();
});

test('getColorSteps method', async () => {
  const waveColors = {
    'fill-color': [
      'step',
      ['get', 'speed'],
      '#deffff',
      0.0625, '#94f6f9',
      0.1250, '#4ee9f2',
    ],
  };

  const colorbar = new ColorBar(waveColors, {
    title: "Test",
    unit: "units",
    max: 10,
  });

  const colorSteps = colorbar.getColorSteps();
  expect(colorSteps).toBeDefined();
  expect(Array.isArray(colorSteps)).toBe(true);
  expect(colorSteps.length).toBeGreaterThan(0);
});
