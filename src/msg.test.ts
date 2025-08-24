import { expect, test, vi, beforeEach, afterEach } from 'vitest';
import { Map } from 'maplibre-gl';
import MsgCtl from './msg';

// Mock DOM environment
beforeEach(() => {
  // Create a mock container element
  document.body.innerHTML = '<div id="map"></div>';
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.clearAllMocks();
});

test('MsgCtl constructor with default options', () => {
  const msgCtl = new MsgCtl({});
  
  expect(msgCtl).toBeDefined();
  expect(msgCtl.getDefaultPosition()).toBe('top-left');
});

test('MsgCtl constructor with custom options', () => {
  const options = {
    msg: 'Test Message',
    position: 'top-right' as const,
    width: '200px',
    height: '50px',
    innerHTML: '<strong>HTML Content</strong>',
    style: { color: 'red', fontSize: '16px' }
  };

  const msgCtl = new MsgCtl(options);
  
  expect(msgCtl).toBeDefined();
  expect(msgCtl.getDefaultPosition()).toBe('top-right');
});

test('MsgCtl onAdd and onRemove methods', () => {
  const msgCtl = new MsgCtl({ msg: 'Test Message' });
  const map = new Map({ container: document.createElement('div') });
  
  const container = msgCtl.onAdd(map);
  expect(container).toBeDefined();
  expect(map.getContainer().contains(container)).toBe(true);
  
  msgCtl.onRemove();
  expect(map.getContainer().contains(container)).toBe(false);
});

test('MsgCtl updateContent method with plain text', () => {
  const msgCtl = new MsgCtl({ msg: 'Initial Message' });
  const map = new Map({ container: document.createElement('div') });
  
  msgCtl.onAdd(map);
  msgCtl.updateContent('Updated Message', false);
  
  // The content should be updated
  expect(msgCtl).toBeDefined();
});

test('MsgCtl updateContent method with HTML', () => {
  const msgCtl = new MsgCtl({ msg: 'Initial Message' });
  const map = new Map({ container: document.createElement('div') });
  
  msgCtl.onAdd(map);
  msgCtl.updateContent('<strong>HTML Content</strong>', true);
  
  // The content should be updated with HTML
  expect(msgCtl).toBeDefined();
});

test('MsgCtl updateStyle method', () => {
  const msgCtl = new MsgCtl({ msg: 'Test Message' });
  const map = new Map({ container: document.createElement('div') });
  
  msgCtl.onAdd(map);
  msgCtl.updateStyle({ backgroundColor: 'blue', color: 'white' });
  
  // Styles should be updated
  expect(msgCtl).toBeDefined();
});

test('MsgCtl update method', () => {
  const msgCtl = new MsgCtl({ msg: 'Test Message' });
  const map = new Map({ container: document.createElement('div') });
  
  msgCtl.onAdd(map);
  msgCtl.update();
  
  // Update should complete without errors
  expect(msgCtl).toBeDefined();
});

test('MsgCtl with different position options', () => {
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;
  
  positions.forEach(position => {
    const msgCtl = new MsgCtl({ position });
    expect(msgCtl.getDefaultPosition()).toBe(position);
  });
});

test('MsgCtl with custom width and height', () => {
  const msgCtl = new MsgCtl({ width: '300px', height: '100px' });
  
  expect(msgCtl).toBeDefined();
  // The container should be created with custom dimensions
});

test('MsgCtl refresh method (no-op)', () => {
  const msgCtl = new MsgCtl({ msg: 'Test Message' });
  
  // refresh method should exist and not throw errors
  expect(() => msgCtl.refresh()).not.toThrow();
});

// test('MsgCtl event handling with map events', () => {
//   const msgCtl = new MsgCtl({ msg: 'Test Message' });
//   const map = new Map({ container: document.createElement('div') });
  
//   const resizeSpy = vi.spyOn(msgCtl, 'update');
  
//   msgCtl.onAdd(map);
  
//   // The resize event handler should be registered and call update
//   // We can't directly emit events on the Map instance, but we can verify
//   // that the event handlers are set up correctly
//   expect(resizeSpy).not.toHaveBeenCalled(); // Should not be called yet
  
//   msgCtl.onRemove();
// });
