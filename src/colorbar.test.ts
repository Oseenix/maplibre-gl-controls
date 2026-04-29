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

function getPickerPopover(): HTMLElement | null {
  return document.body.querySelector('.map_colorbar_picker_popover');
}

function getResetConfirmPopover(): HTMLElement | null {
  return document.body.querySelector('.map_colorbar_reset_confirm');
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

test('swatch picker renders reset-current and restore-current-mode actions', async () => {
  let resetCurrentSpeed: number | null = null;
  let restoreCount = 0;

  const waveHeight = new ColorBar(waveColors, {
    title: 'Wave Height',
    unit: 'm',
    max: 10,
    palettes: [
      { id: 'wave-classic', label: 'Classic' },
      { id: 'wave-alt', label: 'Alt' },
    ],
    activePaletteId: 'wave-classic',
    onResetColor: (speed: number) => {
      resetCurrentSpeed = speed;
    },
    onReset: () => {
      restoreCount += 1;
    },
  });

  const waveMap = new Map({ container: document.createElement('div') });
  waveMap.addControl(waveHeight);

  expect(
    (waveHeight as any).container.querySelector('option[value="__restore_defaults__"]')
  ).toBeNull();

  const swatch = (waveHeight as any).container.querySelector(
    '.map_colorbar_color_box'
  ) as HTMLElement;
  swatch.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  const popover = getPickerPopover();
  expect(popover).not.toBeNull();
  expect(popover?.textContent).toContain('Reset');
  expect(popover?.textContent).toContain('Restore');
  expect(popover?.querySelector('.map_colorbar_picker_input')).not.toBeNull();

  const resetCurrentButton = popover?.querySelector(
    '.map_colorbar_picker_reset_current'
  ) as HTMLButtonElement;
  resetCurrentButton.click();
  expect(resetCurrentSpeed).toBe(7.5);

  swatch.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  const restoreModeButton = getPickerPopover()?.querySelector(
    '.map_colorbar_picker_restore_mode'
  ) as HTMLButtonElement;
  restoreModeButton.click();
  expect(restoreCount).toBe(0);
  const confirmButton = getResetConfirmPopover()?.querySelector(
    '.map_colorbar_reset_confirm_accept'
  ) as HTMLButtonElement;
  confirmButton.click();
  expect(restoreCount).toBe(1);
});

test('restore actions require confirmation before resetting', async () => {
  let restoreCount = 0;

  const colorbar = new ColorBar(waveColors, {
    title: 'Wave Height',
    unit: 'm',
    max: 10,
    onReset: () => {
      restoreCount += 1;
    },
  });

  const map = new Map({ container: document.createElement('div') });
  map.addControl(colorbar);
  colorbar.setCustomColors({ '5': '#000000' });

  const container = (colorbar as any).container as HTMLElement;
  const restoreButton = container.querySelector('.map_colorbar_reset') as HTMLElement;
  restoreButton.click();
  expect(getResetConfirmPopover()).not.toBeNull();
  expect(restoreCount).toBe(0);

  const cancelButton = getResetConfirmPopover()?.querySelector(
    '.map_colorbar_reset_confirm_cancel'
  ) as HTMLButtonElement;
  cancelButton.click();
  expect(restoreCount).toBe(0);

  restoreButton.click();
  const confirmButton = getResetConfirmPopover()?.querySelector(
    '.map_colorbar_reset_confirm_accept'
  ) as HTMLButtonElement;
  confirmButton.click();
  expect(restoreCount).toBe(1);
});

test('resetSingleColor restores the default swatch color and clears custom state', async () => {
  const colorbar = new ColorBar(waveColors, {
    title: 'Wind Speed',
    unit: 'm/s',
    max: 10,
  });

  const map = new Map({ container: document.createElement('div') });
  map.addControl(colorbar);

  colorbar.setCustomColors({ '5': '#000000' });
  colorbar.updateSingleColorUI(5, '#000000');
  colorbar.resetSingleColor(5);

  const swatch = Array.from(
    ((colorbar as any).container as HTMLElement).querySelectorAll('.map_colorbar_color_box')
  ).find((node) => (node as HTMLElement).dataset.speed === '5') as HTMLElement;

  expect(swatch.style.backgroundColor).toBe('rgb(78, 233, 242)');
  expect((colorbar as any).customColors['5']).toBeUndefined();
});
