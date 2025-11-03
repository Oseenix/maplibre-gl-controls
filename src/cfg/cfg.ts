/**
 * MapLibre GL Layer Config Manager Plugin
 * Provides UI controls for layer visibility...
 */
import './cfg.css';

export default class ConfigManager {
  private map: maplibregl.Map | null = null;
  private container: HTMLDivElement | null = null;
  private panel: HTMLDivElement | null = null;
  private draggedElement: HTMLElement | null = null;

  // Configuration
  private layers: Array<{
    id: string;
    name?: string;
    visible?: boolean;
    opacity?: number;
    minzoom?: number;
    maxzoom?: number;
    originalStyle?: Record<string, any>;
  }> = [];
  private position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-left';
  private collapsed: boolean = false;

  // Runtime state
  private layerConfigs: Map<
    string,
    {
      visible: boolean;
      opacity: number;
      minzoom?: number;
      maxzoom?: number;
    }
  > = new Map();

  constructor(options: {
    layers?: Array<{
      id: string;
      name?: string;
      visible?: boolean;
      opacity?: number;
      minzoom?: number;
      maxzoom?: number;
      originalStyle?: Record<string, any>;
    }>;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    collapsed?: boolean;
  } = {}) {
    this.layers = options.layers || [];
    this.position = options.position || 'top-left';
    this.collapsed = options.collapsed || false;

    // Initialize layer configurations
    this.layers.forEach((layer) => {
      this.layerConfigs.set(layer.id, {
        visible: layer.visible !== false,
        opacity: layer.opacity ?? 1.0,
        minzoom: layer.minzoom,
        maxzoom: layer.maxzoom,
      });
    });
  }

  /** Called when control is added to the map */
  public onAdd(map: maplibregl.Map): HTMLElement {
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group layer-manager';

    // Create the main panel
    this.panel = document.createElement('div');
    this.panel.className = 'layer-manager-panel';
    if (this.collapsed) {
      this.panel.style.display = 'none';
    }

    // Create header and layers section
    const header = this._createHeader();
    const layersSection = this._createLayersSection();

    this.container.appendChild(header);
    this.panel.appendChild(layersSection);
    this.container.appendChild(this.panel);

    return this.container;
  }

  /** Called when control is removed from the map */
  public onRemove(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = null;
  }

  /** Get control position */
  public getPosition(): 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' {
    return this.position;
  }

  // ========================
  // UI Creation
  // ========================
  private _createLayersIcon(size: number = 20): string {
    return `
      <svg
        width="${size}"
        height="${size}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="vertical-align: middle; margin-right: 6px;"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    `;
  }

  private _createHeader(): HTMLDivElement {
    const header = document.createElement('div');
    header.className = 'layer-manager-header';

    const icon = document.createElement('button');
    icon.className = 'layer-manager-toggle';
    icon.innerHTML = this._createLayersIcon(20);
    icon.title = 'Toggle Layers';
    icon.onclick = () => this._togglePanel();

    header.appendChild(icon);
    return header;
  }

  private _togglePanel(): void {
    if (!this.panel) {
      return;
    }
    if (this.panel.style.display === 'none') {
      this.panel.style.display = '';
      this.collapsed = false;
    } else {
      this.panel.style.display = 'none';
      this.collapsed = true;
    }
  }

  private _createLayersSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'layer-manager-section';

    // Title bar
    const title = document.createElement('div');
    title.className = 'layer-manager-title';
    title.innerHTML = this._createLayersIcon(16) + `<span style="vertical-align: middle;">Layers</span>`;

    // Collapse button
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'layer-manager-btn-collapse';
    collapseBtn.innerHTML = '▲';
    collapseBtn.onclick = (e) => {
      const list = section.querySelector('.layer-manager-list') as HTMLElement | null;
      if (!list) return;
      if (list.style.display === 'none') {
        list.style.display = '';
        (e.target as HTMLElement).innerHTML = '▲';
      } else {
        list.style.display = 'none';
        (e.target as HTMLElement).innerHTML = '▼';
      }
    };
    title.appendChild(collapseBtn);

    section.appendChild(title);

    // Layers list
    const list = document.createElement('div');
    list.className = 'layer-manager-list';

    this.layers.forEach((layer) => {
      const layerItem = this._createLayerItem(layer);
      list.appendChild(layerItem);
    });

    section.appendChild(list);
    return section;
  }

  private _createLayerItem(layer: {
    id: string;
    name?: string;
    originalStyle?: Record<string, any>;
  }): HTMLDivElement {
    const item = document.createElement('div');
    item.className = 'layer-manager-item';
    item.dataset.layerId = layer.id;

    // Reorder controls
    const reorderControls = document.createElement('div');
    reorderControls.className = 'layer-manager-reorder-controls';

    const dragHandle = document.createElement('div');
    dragHandle.className = 'layer-manager-drag-handle';
    dragHandle.innerHTML = '⋮⋮';
    dragHandle.title = 'Drag to reorder';
    dragHandle.draggable = true;
    dragHandle.ondragstart = (e) => this._handleDragStart(e);

    const upBtn = document.createElement('button');
    upBtn.className = 'layer-manager-btn-move-up';
    upBtn.innerHTML = '▲';
    upBtn.title = 'Move up';
    upBtn.onclick = () => this._moveLayerUp(layer.id);

    const downBtn = document.createElement('button');
    downBtn.className = 'layer-manager-btn-move-down';
    downBtn.innerHTML = '▼';
    downBtn.title = 'Move down';
    downBtn.onclick = () => this._moveLayerDown(layer.id);

    reorderControls.append(dragHandle, upBtn, downBtn);

    // Visibility checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'layer-manager-checkbox';
    checkbox.checked = this.layerConfigs.get(layer.id)?.visible ?? true;
    checkbox.onchange = (e) => this._toggleLayerVisibility(layer.id, (e.target as HTMLInputElement).checked);

    const label = document.createElement('label');
    label.className = 'layer-manager-label';
    label.textContent = layer.name || layer.id;
    label.onclick = () => checkbox.click();

    // Controls (opacity, style, remove)
    const controls = document.createElement('div');
    controls.className = 'layer-manager-controls';

    // Opacity slider
    const opacityControl = document.createElement('div');
    opacityControl.className = 'layer-manager-opacity';

    const opacitySlider = document.createElement('input');
    opacitySlider.type = 'range';
    opacitySlider.min = '0';
    opacitySlider.max = '1';
    opacitySlider.step = '0.05';
    opacitySlider.value = String(this.layerConfigs.get(layer.id)?.opacity ?? 1);
    opacitySlider.className = 'layer-manager-slider';
    opacitySlider.oninput = (e) => this._updateLayerOpacity(layer.id, parseFloat((e.target as HTMLInputElement).value));

    opacityControl.appendChild(opacitySlider);

    // Style button
    const styleBtn = document.createElement('button');
    styleBtn.className = 'layer-manager-btn-style';
    styleBtn.innerHTML = '⚙';
    styleBtn.title = 'Style layer';
    styleBtn.onclick = () => this._toggleStyleEditor(layer.id);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'layer-manager-btn-remove';
    removeBtn.innerHTML = '×';
    removeBtn.title = 'Remove layer';
    removeBtn.onclick = () => this._removeLayer(layer.id);

    controls.append(opacityControl, styleBtn, removeBtn);

    // Append all
    item.append(reorderControls, checkbox, label, controls);

    // Style editor (hidden by default)
    const styleEditor = this._createStyleEditor(layer);
    item.appendChild(styleEditor);

    // Drag events on item
    item.ondragover = (e) => this._handleDragOver(e);
    item.ondrop = (e) => this._handleDrop(e);
    item.ondragend = (e) => this._handleDragEnd(e);
    item.ondragenter = (e) => this._handleDragEnter(e);
    item.ondragleave = (e) => this._handleDragLeave(e);

    return item;
  }

  private _createStyleEditor(layer: { id: string; name?: string; originalStyle?: Record<string, any> }): HTMLDivElement {
    const editor = document.createElement('div');
    editor.className = 'layer-manager-style-editor';
    editor.style.display = 'none';
    editor.dataset.layerId = layer.id;

    const mapLayer = this.map?.getLayer(layer.id) as any;
    if (!mapLayer) return editor;

    const layerType = mapLayer.type as 'fill' | 'line' | 'circle' | 'raster';
    const paint = mapLayer.paint || {};

    // Title
    const title = document.createElement('div');
    title.className = 'layer-manager-style-title';
    title.innerHTML = `<span>🎨</span> Style ${layer.name || layer.id}`;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'layer-manager-btn-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => this._toggleStyleEditor(layer.id);
    title.appendChild(closeBtn);
    editor.appendChild(title);

    // Add type-specific controls
    if (layerType === 'circle') {
      editor.appendChild(this._createColorControl('Circle Color', layer.id, 'circle-color', paint['circle-color'] || '#3388ff'));
      editor.appendChild(this._createSliderControl('Circle Radius', layer.id, 'circle-radius', paint['circle-radius'] || 5, 0, 20, 0.5));
      editor.appendChild(this._createSliderControl('Circle Opacity', layer.id, 'circle-opacity', paint['circle-opacity'] || 1, 0, 1, 0.05));
      editor.appendChild(this._createSliderControl('Circle Blur', layer.id, 'circle-blur', paint['circle-blur'] || 0, 0, 5, 0.1));
      editor.appendChild(this._createColorControl('Circle Stroke Color', layer.id, 'circle-stroke-color', paint['circle-stroke-color'] || '#ffffff'));
      editor.appendChild(this._createSliderControl('Circle Stroke Width', layer.id, 'circle-stroke-width', paint['circle-stroke-width'] || 1, 0, 5, 0.1));
      editor.appendChild(this._createSliderControl('Circle Stroke Opacity', layer.id, 'circle-stroke-opacity', paint['circle-stroke-opacity'] || 1, 0, 1, 0.05));
    } else if (layerType === 'line') {
      editor.appendChild(this._createColorControl('Line Color', layer.id, 'line-color', paint['line-color'] || '#3388ff'));
      editor.appendChild(this._createSliderControl('Line Width', layer.id, 'line-width', paint['line-width'] || 2, 0, 20, 0.5));
      editor.appendChild(this._createSliderControl('Line Opacity', layer.id, 'line-opacity', paint['line-opacity'] || 1, 0, 1, 0.05));
      editor.appendChild(this._createSliderControl('Line Blur', layer.id, 'line-blur', paint['line-blur'] || 0, 0, 5, 0.1));
    } else if (layerType === 'fill') {
      editor.appendChild(this._createColorControl('Fill Color', layer.id, 'fill-color', paint['fill-color'] || '#3388ff'));
      editor.appendChild(this._createSliderControl('Fill Opacity', layer.id, 'fill-opacity', paint['fill-opacity'] || 0.5, 0, 1, 0.05));
      editor.appendChild(this._createColorControl('Fill Outline Color', layer.id, 'fill-outline-color', paint['fill-outline-color'] || '#3388ff'));
    } else if (layerType === 'raster') {
      editor.appendChild(this._createSliderControl('Raster Opacity', layer.id, 'raster-opacity', paint['raster-opacity'] || 1, 0, 1, 0.05));
      editor.appendChild(this._createSliderControl('Raster Brightness Min', layer.id, 'raster-brightness-min', paint['raster-brightness-min'] || 0, -1, 1, 0.05));
      editor.appendChild(this._createSliderControl('Raster Brightness Max', layer.id, 'raster-brightness-max', paint['raster-brightness-max'] || 1, -1, 1, 0.05));
      editor.appendChild(this._createSliderControl('Raster Saturation', layer.id, 'raster-saturation', paint['raster-saturation'] || 0, -1, 1, 0.05));
      editor.appendChild(this._createSliderControl('Raster Contrast', layer.id, 'raster-contrast', paint['raster-contrast'] || 0, -1, 1, 0.05));
    }

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'layer-manager-style-actions';

    const applyBtn = document.createElement('button');
    applyBtn.className = 'layer-manager-btn-apply';
    applyBtn.textContent = 'Apply';
    applyBtn.onclick = () => this._applyStyles(layer.id);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'layer-manager-btn-reset';
    resetBtn.textContent = 'Reset';
    resetBtn.onclick = () => this._resetStyles(layer.id);

    const closeBtn2 = document.createElement('button');
    closeBtn2.className = 'layer-manager-btn-close-bottom';
    closeBtn2.textContent = 'Close';
    closeBtn2.onclick = () => this._toggleStyleEditor(layer.id);

    actions.append(applyBtn, resetBtn, closeBtn2);
    editor.appendChild(actions);

    return editor;
  }

  private _createColorControl(label: string, layerId: string, property: string, value: string): HTMLDivElement {
    const control = document.createElement('div');
    control.className = 'layer-manager-style-control';
    layerId = layerId;

    const labelEl = document.createElement('label');
    labelEl.textContent = label;

    const inputContainer = document.createElement('div');
    inputContainer.className = 'layer-manager-color-input';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = this._rgbToHex(value);
    colorInput.dataset.property = property;

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = this._rgbToHex(value);
    textInput.readOnly = true;

    colorInput.oninput = (e) => {
      textInput.value = (e.target as HTMLInputElement).value;
    };

    inputContainer.append(colorInput, textInput);
    control.append(labelEl, inputContainer);
    return control;
  }

  private _createSliderControl(
    label: string,
    layerId: string,
    property: string,
    value: number,
    min: number,
    max: number,
    step: number
  ): HTMLDivElement {
    const control = document.createElement('div');
    control.className = 'layer-manager-style-control';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;

    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'layer-manager-slider-input';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = String(min);
    slider.max = String(max);
    slider.step = String(step);
    slider.value = String(value);
    slider.dataset.property = property;
    slider.className = 'layer-manager-slider';

    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'layer-manager-value';
    valueDisplay.textContent = value.toFixed(2);

    slider.oninput = (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      valueDisplay.textContent = val.toFixed(2);
      this.map?.setPaintProperty(layerId, property, val); // Live update
    };

    sliderContainer.append(slider, valueDisplay);
    control.append(labelEl, sliderContainer);
    return control;
  }

  // ========================
  // Layer Operations
  // ========================

  private _toggleLayerVisibility(layerId: string, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    this.map?.setLayoutProperty(layerId, 'visibility', visibility);
    const config = this.layerConfigs.get(layerId);
    if (config) config.visible = visible;
  }

  private _updateLayerOpacity(layerId: string, opacity: number): void {
    const config = this.layerConfigs.get(layerId);
    if (config) config.opacity = opacity;

    const layer = this.map?.getLayer(layerId) as any;
    if (layer) {
      const type = layer.type as string;
      const opacityProp = `${type}-opacity`;
      this.map?.setPaintProperty(layerId, opacityProp, opacity);
    }
  }

  private _toggleStyleEditor(layerId: string): void {
    const editor = this.container?.querySelector(
      `.layer-manager-style-editor[data-layer-id="${layerId}"]`
    ) as HTMLElement | null;
    if (!editor) return;

    const isHidden = editor.style.display === 'none';
    // Close all others
    this.container
      ?.querySelectorAll('.layer-manager-style-editor')
      .forEach((e) => ((e as HTMLElement).style.display = 'none'));

    editor.style.display = isHidden ? 'block' : 'none';
  }

  private _applyStyles(layerId: string): void {
    const editor = this.container?.querySelector(
      `.layer-manager-style-editor[data-layer-id="${layerId}"]`
    );
    if (!editor) return;

    const inputs = editor.querySelectorAll('input[data-property]') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      const property = input.dataset.property!;
      const value = input.type === 'color' ? input.value : parseFloat(input.value);
      this.map?.setPaintProperty(layerId, property, value);
    });
  }

  private _resetStyles(layerId: string): void {
    const layer = this.layers.find((l) => l.id === layerId);
    if (!layer?.originalStyle) return;

    Object.entries(layer.originalStyle).forEach(([prop, val]) => {
      this.map?.setPaintProperty(layerId, prop, val);
    });

    // Rebuild editor to reflect reset values
    const item = this.container?.querySelector(`.layer-manager-item[data-layer-id="${layerId}"]`) as HTMLElement | null;
    if (!item) return;
    const oldEditor = item.querySelector('.layer-manager-style-editor') as HTMLElement;
    const wasOpen = oldEditor?.style.display === 'block';
    const newEditor = this._createStyleEditor(layer);
    if (wasOpen) newEditor.style.display = 'block';
    item.replaceChild(newEditor, oldEditor);
  }

  private _removeLayer(layerId: string): void {
    this.map?.removeLayer(layerId);
    const item = this.container?.querySelector(`.layer-manager-item[data-layer-id="${layerId}"]`);
    item?.remove();
    this.layerConfigs.delete(layerId);
    this.layers = this.layers.filter((l) => l.id !== layerId);
  }

  private _rgbToHex(color: string): string {
    if (!color) return '#000000';
    if (color.startsWith('#')) return color;
    if (color.startsWith('rgb')) {
      const match = color.match(/\d+/g);
      if (match) {
        return (
          '#' +
          match
            .slice(0, 3)
            .map((x) => {
              const hex = parseInt(x).toString(16);
              return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
        );
      }
    }
    return '#000000';
  }

  // ========================
  // Public API
  // ========================

  public addLayer(layer: {
    id: string;
    name?: string;
    visible?: boolean;
    opacity?: number;
    minzoom?: number;
    maxzoom?: number;
    originalStyle?: Record<string, any>;
  }): void {
    this.layers.push(layer);
    this.layerConfigs.set(layer.id, {
      visible: layer.visible !== false,
      opacity: layer.opacity ?? 1.0,
      minzoom: layer.minzoom,
      maxzoom: layer.maxzoom,
    });

    const list = this.container?.querySelector('.layer-manager-list');
    if (list) {
      const item = this._createLayerItem(layer);
      list.appendChild(item);
    }
  }

  public removeLayer(layerId: string): void {
    this._removeLayer(layerId);
  }

  // ========================
  // Drag & Drop Reordering
  // ========================

  private _handleDragStart(e: DragEvent): void {
    const item = (e.target as HTMLElement).closest('.layer-manager-item') as HTMLElement | null;
    if (!item) return;

    this.draggedElement = item;
    item.classList.add('dragging');
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/html', item.innerHTML);
  }

  private _handleDragOver(e: DragEvent): boolean {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
    return false;
  }

  private _handleDragEnter(e: DragEvent): void {
    const item = (e.target as HTMLElement).closest('.layer-manager-item') as HTMLElement | null;
    if (item && item !== this.draggedElement) {
      item.classList.add('drag-over');
    }
  }

  private _handleDragLeave(e: DragEvent): void {
    const item = (e.target as HTMLElement).closest('.layer-manager-item') as HTMLElement | null;
    if (item) item.classList.remove('drag-over');
  }

  private _handleDrop(e: DragEvent): boolean {
    if (e.stopPropagation) e.stopPropagation();

    const targetItem = (e.target as HTMLElement).closest('.layer-manager-item') as HTMLElement | null;
    if (!targetItem || !this.draggedElement || targetItem === this.draggedElement) return false;

    const draggedId = this.draggedElement.dataset.layerId!;
    const targetId = targetItem.dataset.layerId!;

    // Update DOM
    const list = this.container?.querySelector('.layer-manager-list');
    const allItems = Array.from(list?.querySelectorAll('.layer-manager-item') || []) as HTMLElement[];
    const draggedIndex = allItems.indexOf(this.draggedElement);
    const targetIndex = allItems.indexOf(targetItem);

    if (draggedIndex < targetIndex) {
      targetItem.parentNode!.insertBefore(this.draggedElement, targetItem.nextSibling);
    } else {
      targetItem.parentNode!.insertBefore(this.draggedElement, targetItem);
    }

    // Update internal array
    const draggedLayer = this.layers.find((l) => l.id === draggedId)!;
    this.layers = this.layers.filter((l) => l.id !== draggedId);
    const newTargetIndex = this.layers.findIndex((l) => l.id === targetId);
    this.layers.splice(draggedIndex < targetIndex ? newTargetIndex + 1 : newTargetIndex, 0, draggedLayer);

    // Update map order
    this._updateMapLayerOrder();
    targetItem.classList.remove('drag-over');
    return false;
  }

  private _handleDragEnd(e: DragEvent): void {
    const item = (e.target as HTMLElement).closest('.layer-manager-item') as HTMLElement | null;
    if (item) item.classList.remove('dragging');

    this.container?.querySelectorAll('.layer-manager-item').forEach((el) => el.classList.remove('drag-over'));
    this.draggedElement = null;
  }

  private _updateMapLayerOrder(): void {
    const items = this.container?.querySelectorAll('.layer-manager-item');
    if (!items || !this.map) return;

    const layerIds = Array.from(items)
      .map((item) => (item as HTMLElement).dataset.layerId!)
      .reverse(); // UI top = map top

    let previousLayerId: string | null = null;
    for (const layerId of layerIds) {
      try {
        if (this.map.getLayer(layerId)) {
          if (previousLayerId && this.map.getLayer(previousLayerId)) {
            this.map.moveLayer(layerId, previousLayerId); // Move above previous
          } else {
            // Move to bottom
            const allLayers = this.map.getStyle().layers;
            const firstNonManaged = allLayers.find((l) => !layerIds.includes(l.id));
            if (firstNonManaged) {
              this.map.moveLayer(layerId, firstNonManaged.id);
            }
          }
          previousLayerId = layerId;
        }
      } catch (err) {
        console.warn(`Failed to move layer ${layerId}:`, err);
      }
    }
  }

  private _moveLayerUp(layerId: string): void {
    const list = this.container?.querySelector('.layer-manager-list');
    const items = Array.from(list?.querySelectorAll('.layer-manager-item') || []) as HTMLElement[];
    const currentItem = items.find((i) => i.dataset.layerId === layerId);
    const currentIndex = items.indexOf(currentItem!);
    if (currentIndex <= 0) return;

    const prevItem = items[currentIndex - 1];
    list?.insertBefore(currentItem!, prevItem);

    const layerIndex = this.layers.findIndex((l) => l.id === layerId);
    const [layer] = this.layers.splice(layerIndex, 1);
    this.layers.splice(layerIndex - 1, 0, layer);

    this._updateMapLayerOrder();
  }

  private _moveLayerDown(layerId: string): void {
    const list = this.container?.querySelector('.layer-manager-list');
    const items = Array.from(list?.querySelectorAll('.layer-manager-item') || []) as HTMLElement[];
    const currentItem = items.find((i) => i.dataset.layerId === layerId);
    const currentIndex = items.indexOf(currentItem!);
    if (currentIndex >= items.length - 1) return;

    const nextItem = items[currentIndex + 1];
    list?.insertBefore(nextItem, currentItem!);

    const layerIndex = this.layers.findIndex((l) => l.id === layerId);
    const [layer] = this.layers.splice(layerIndex, 1);
    this.layers.splice(layerIndex + 1, 0, layer);

    this._updateMapLayerOrder();
  }
}
