import { expect, test } from 'vitest';

import { ColorBar } from './index.ts';
import { Map } from 'maplibre-gl';

const waveColors = {
  'fill-color': [
    'step',
    ['get', 'speed'],
    '#deffff',
    0.25, '#94f6f9',
    0.5, '#4ee9f2',
    0.75, '#9BCDFD',
  ],
};

function getLegendSpeeds(colorbar: ColorBar): string[] {
  const container = (colorbar as any).container as HTMLElement;
  return Array.from(container.querySelectorAll('.map_colorbar_color_box')).map(
    (node) => (node as HTMLElement).dataset.speed || ''
  );
}

function getLegendLabels(colorbar: ColorBar): string[] {
  const container = (colorbar as any).container as HTMLElement;
  return Array.from(container.querySelectorAll('.map_colorbar_label')).map(
    (node) => (node as HTMLElement).textContent || ''
  );
}

test('unittest', async () => {
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
  const colorbar = new ColorBar(waveColors, {
    title: "Test",
    unit: "units",
    max: 10,
  });

  const colorSteps = colorbar.getColorSteps();
  expect(colorSteps).toBeDefined();
  expect(Array.isArray(colorSteps)).toBe(true);
  expect(colorSteps.length).toBeGreaterThan(0);
  expect(colorSteps.map((step) => step.speed)).toEqual([0, 2.5, 5, 7.5]);
});

test('legend renders from large to small and labels every two boxes', async () => {
  const colorbar = new ColorBar(waveColors, {
    title: "Test",
    unit: "units",
    max: 10,
    decimal: 1,
    tickMinStep: 1,
  });

  const map = new Map({ container: document.createElement('div') });
  map.addControl(colorbar);

  expect(getLegendSpeeds(colorbar)).toEqual(['7.5', '5', '2.5', '0']);
  expect(getLegendLabels(colorbar)).toEqual(['- 7.5', '', '- 2.5', '']);
});

test('updatePalette clears restore state and preserves descending legend order', async () => {
  const colorbar = new ColorBar(waveColors, {
    title: "Test",
    unit: "units",
    max: 10,
    activePaletteId: 'wave-classic',
  });

  const map = new Map({ container: document.createElement('div') });
  map.addControl(colorbar);

  colorbar.setCustomColors({ '5': '#ffffff' });

  const container = (colorbar as any).container as HTMLElement;
  const resetButton = container.querySelector('.map_colorbar_reset') as HTMLElement;
  expect(resetButton.style.display).toBe('flex');

  colorbar.updatePalette(waveColors, {
    title: 'Test',
    unit: 'units',
    max: 10,
    activePaletteId: 'wave-classic',
  });

  expect(resetButton.style.display).toBe('none');
  expect(getLegendSpeeds(colorbar)).toEqual(['7.5', '5', '2.5', '0']);
});
