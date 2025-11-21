/**
 * MapLibre GL Layer Config Manager Plugin
 * Provides UI controls for layer visibility...
 */

import type {
	IControl,
	ControlPosition,
} from 'maplibre-gl';

import { ControlGroup, LayerConfig, SelectConfig } from './cfg-type';

export type ConfigManagerOptions = {
  btnLabel?: string;
  feature?: string;
  featureConfigs?: Record<string, ControlGroup>;
  onChange?: (
    feature: string, key: string,
    preCfg: LayerConfig, curValue: LayerConfig) => void;
  position?: ControlPosition;
  collapsed?: boolean;
  style?: Partial<CSSStyleDeclaration>;
};
import { createStyledButton, formatLabel, applyContainerPosition, registerButtonGroup, unregisterButtonGroup, applyGlobalResponsiveLayout, applyContainerStyles } from '../utils/ui';
import './cfg.css';
import { registerContainer, unregisterContainer } from '../utils/theme';

export default class ConfigManager implements IControl {
  private map: maplibregl.Map | null = null;
  private container: HTMLDivElement | null = null;
  private panel: HTMLDivElement | null = null;
  private buttons: Map<string, HTMLButtonElement> = new Map();

  private btnLabel: string = 'Settings';
  private feature: string = 'wave';
  private position: ControlPosition;
  private collapsed: boolean = false;
  private userStyle: Partial<CSSStyleDeclaration> | undefined;

  // Runtime state
  private featureConfigGroups: Record<string, ControlGroup>;
  private layerConfigs: ControlGroup;
  private onChange: (
    feature: string, key: string,
    preCfg: LayerConfig, curCfg: LayerConfig) => void;

  constructor(options: ConfigManagerOptions = {}) {
    this.position = options.position || 'top-right';
    this.collapsed = options.collapsed || true;
    this.featureConfigGroups = options.featureConfigs || {};
    this.feature = options.feature || 'wave';
    this.btnLabel = options.btnLabel || 'Settings';
    this.layerConfigs = this.featureConfigGroups[this.feature] || {};
    this.onChange = options.onChange || ((feature, key, preCfg, curCfg) => {
      console.log('Layer config changed:', feature, key, preCfg, curCfg);
    });
    if (options.style) {
      this.userStyle = options.style;
    }
  }

  /** Called when control is added to the map */
  public onAdd(map: maplibregl.Map): HTMLElement {
    this.map = map;
    this.container = document.createElement('div');
    
    // Apply common container styles with additional layer-manager class
    applyContainerStyles(this.container, { classNames: ['layer-manager'] });

    // Add position-specific class for styling
    if (this.position?.startsWith('bottom')) {
      this.container.classList.add('bottom');
    } else if (this.position?.startsWith('top')) {
      this.container.classList.add('top');
    }
        // Apply custom styles if provided, merging with defaults
    if (this.userStyle) {
      Object.assign(this.container.style, this.userStyle);
    }

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
    registerContainer(this.container);

    registerButtonGroup(this.getPosition(), this.buttons);

    // Apply initial container positioning
    // this._updateContainerPosition();

    // Listen for map resize events to update positioning
    this.map.on('resize', () => {
      this._updateContainerPosition();
    });

    this.map.on('styledata', () => {
      this._updateContainerPosition();
    });

    return this.container;
  }

  /** Called when control is removed from the map */
  public onRemove(): void {
    if (this.map) {
      this.map.off('resize', this._updateContainerPosition);
      this.map.off('styledata', this._updateContainerPosition);
    }
    unregisterButtonGroup(this.getPosition(), this.buttons);
    this.container && unregisterContainer(this.container);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = null;
  }

  /**
   * Update container positioning based on map dimensions and safe area insets
   */
  private _updateContainerPosition(): void {
    if (!this.map || !this.container) {
      return;
    }
    
    const mapContainer = this.map.getContainer();
    const position = this.getPosition();
    
    // Use shared utility function to apply container position
    applyContainerPosition(this.container, mapContainer, position, this.userStyle);

    this._updateButtonLayout();
  }

  /** Get control position */
  public getPosition(): ControlPosition {
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

    if (this.position?.includes('left')) {
      header.classList.add('left');
    } else {
      header.classList.add('right');
    }

    const button = createStyledButton({
      icon: this._createLayersIcon(20),
      label: this.btnLabel,
      title: `${this.feature} Layers Settings`,
      onClick: () => this._togglePanel(),
      className: 'layer-manager-toggle'
    });
    this.buttons.set('layer-manager-toggle', button);

    header.appendChild(button);
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
    title.innerHTML = `<span style="vertical-align: middle;">${formatLabel(this.feature)} Layers</span>`;

    section.appendChild(title);

    // Layers list
    const list = document.createElement('div');
    list.className = 'layer-manager-list';

    Object.entries(this.layerConfigs).forEach(([key, layer]) => {
      const layerItem = this._createLayerItem(key, layer);
      list.appendChild(layerItem);
    });


    section.appendChild(list);
    return section;
  }

  /** Create toggle (checkbox) item */
  private _createToggleItem(key: string, layer: LayerConfig): HTMLElement[] {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'layer-manager-checkbox';
    checkbox.checked = !!layer.value;

    checkbox.onchange = (e) => {
      const preCfg = { ...layer };
      layer.value = (e.target as HTMLInputElement).checked;
      this.onChange(this.feature, key, preCfg, layer);
    };

    const label = document.createElement('label');
    label.className = 'layer-manager-label';
    label.textContent = layer.label || 'Unnamed Layer';
    label.onclick = () => checkbox.click();

    return [checkbox, label];
  }

  /** Create select (dropdown or single choice) item */
  private _createSelectUI<T extends string>(key: string, cfg: SelectConfig<T>): HTMLElement[] {
    const mode = cfg?.mode ?? 'buttons';
    let control: HTMLElement;

    if (mode === 'dropdown') {
      const select = document.createElement('select');
      select.className = 'layer-manager-select';
      cfg.options.forEach((opt, idx) => {
        const option = document.createElement('option');
        option.value = String(opt);
        option.textContent = cfg.labels?.[idx] ?? String(opt);
        if (opt === cfg.value) option.selected = true;
        select.appendChild(option);
      });

      select.onchange = (e) => {
        const prev = { ...cfg };
        cfg.value = (e.target as HTMLSelectElement).value as T;
        this.onChange(this.feature, key, prev, cfg);
      };

      control = select;
    } else {
      const group = document.createElement('div');
      group.className = 'layer-manager-radio-group';
      cfg.options.forEach((opt, idx) => {
        const radioLabel = document.createElement('label');
        radioLabel.className = 'layer-manager-radio-label';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = key;
        radio.value = String(opt);
        radio.checked = opt === cfg.value;

        radio.onchange = (e) => {
          const prev = { ...cfg };
          cfg.value = (e.target as HTMLInputElement).value as T;
          this.onChange(this.feature, key, prev, cfg);
        };

        const span = document.createElement('span');
        span.textContent = cfg.labels?.[idx] ?? String(opt);
        radioLabel.append(radio, span);
        group.appendChild(radioLabel);
      });

      control = group;
    }

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'layer-manager-fieldset';

    const legend = document.createElement('legend');
    legend.className = 'layer-manager-legend';
    legend.textContent = cfg.label || key;

    fieldset.append(legend, control);
    return [fieldset];
  }

  /** Create a single layer config item */
  private _createLayerItem(key: string, layer: LayerConfig): HTMLDivElement {
    const item = document.createElement('div');
    item.className = 'layer-manager-item';

    if (layer.type === 'toggle') {
      item.append(...this._createToggleItem(key, layer));
    } else if (layer.type === 'select') {
      item.append(...this._createSelectUI(key, layer));
    } else {
      const label = document.createElement('div');
      label.textContent = `Unsupported type: ${layer.type}`;
      item.append(label);
    }

    return item;
  }

  private _updateButtonLayout(): void {
    if (!this.map || !this.container) return;

    const mapContainer = this.map.getContainer();
    const containerWidth = mapContainer ? mapContainer.clientWidth : -1;
    applyGlobalResponsiveLayout(this.getPosition(), containerWidth);
  }

  /**
   * Refresh the UI to reflect current feature and layer configurations
   */
  private _refreshUI(): void {
    if (!this.container || !this.panel) return;

    // Update toggle button title with current feature
    const toggleButton = this.buttons.get('layer-manager-toggle');
    if (toggleButton) {
      toggleButton.title = `${this.feature} Layers Settings`;
    }

    // Remove existing layers section
    const oldSection = this.panel.querySelector('.layer-manager-section');
    if (oldSection) {
      oldSection.remove();
    }

    // Create new layers section with current feature
    const newSection = this._createLayersSection();
    this.panel.appendChild(newSection);

    this._updateButtonLayout();
  }

  // ========================
  // Public API
  // ========================

  /**
   * Update the current feature and refresh the UI
   * @param feature - The new feature name
   * @param featureConfigs - Optional new feature configurations
   */
  public updateFeature(feature: string, featureConfigs?: Record<string, ControlGroup>): void {
    this.feature = feature;
    
    if (featureConfigs) {
      this.featureConfigGroups = featureConfigs;
    }
    
    this.layerConfigs = this.featureConfigGroups[this.feature] || {};
    
    // Refresh the UI
    this._refreshUI();
  }
}
