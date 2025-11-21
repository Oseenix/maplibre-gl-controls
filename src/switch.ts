import type { IControl, Map as MlMap, ControlPosition } from 'maplibre-gl';
import { createStyledButton, createSvgImage, unregisterButtonGroup, applyGlobalResponsiveLayout, registerButtonGroup, applyContainerPosition, applyContainerStyles } from './utils/ui';
import { THEME } from './utils/theme';

// Define the type for button configuration
export type TgBtnCfg = {
  id: string;
  svg: string;
  label: string;        // Button label, can be in English or Chinese
  layerIds: string[];   // Array of associated layer IDs
  repeat?: boolean;     // Repeatalbe button, do not update group choice
  setup?: (ctl: ToggleCtl, map: MlMap | undefined) => void;   // setup when map add
  cleanup?: (ctl: ToggleCtl, map: MlMap | undefined) => void; // clean up when control remove
  onToggle?: (ctl: ToggleCtl, map: MlMap) => void;
  onUntoggle?: (ctl: ToggleCtl, map: MlMap) => void;
};

export type ToggleCtlOptions = {
  buttons: TgBtnCfg[];
  defaultActive: string;    // default active button
  position?: ControlPosition;
  width?: string; // Width of the control, defaults to auto
  height?: string; // Height of the control, defaults to auto
  innerClassName?: string; // Custom class name for inner container, optional
  style?: Partial<CSSStyleDeclaration>; // Custom styles to apply, optional
  onToggle?: (ctl: ToggleCtl, map: MlMap, activeConfig: TgBtnCfg) => void;
  onUntoggle?: (ctl: ToggleCtl, map: MlMap, config: TgBtnCfg) => void;
};

type ToggleCtlEvent = 'toggle' | 'untoggle';

export default class ToggleCtl implements IControl {
  private map: MlMap | undefined;
  private container: HTMLElement;
  private options: ToggleCtlOptions;
  private defaultActiveId: string;
  private activeButtonId: string | null = null;
  private buttons: Map<string, HTMLButtonElement> = new Map();
  private instanceId: string;

  private listeners: Record<ToggleCtlEvent, Set<(ctl: ToggleCtl) => void>> = {
    toggle: new Set(),
    untoggle: new Set(),
  };

  constructor(options: ToggleCtlOptions) {
    this.options = options;
    this.instanceId = this.generateInstanceId();
    this.container = this.createContainer();
    this.defaultActiveId = this.options.defaultActive;
  }

  /**
   * Generate a unique instance ID for this control
   * @returns Unique identifier string
   */
  private generateInstanceId(): string {
    return `togglectl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  on(event: ToggleCtlEvent, callback: (ctl: ToggleCtl) => void) {
    this.listeners[event].add(callback);
  }

  off(event: ToggleCtlEvent, callback: (ctl: ToggleCtl) => void) {
    this.listeners[event].delete(callback);
  }

  private emit(event: ToggleCtlEvent) {
    for (const cb of this.listeners[event]) {
      try {
        cb(this);
      } catch (err) {
        console.error(`[ToggleCtl] error in ${event} listener`, err);
      }
    }
  }

  // Create the container for the control
  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = this.instanceId;
    
    // Apply common container styles
    applyContainerStyles(container);

    // Add custom inner class name if provided
    if (this.options.innerClassName) {
      container.classList.add(this.options.innerClassName);
    }

    // Apply width and height if provided
    if (this.options.width) {
      container.style.width = this.options.width;
    }
    if (this.options.height) {
      container.style.height = this.options.height;
    }

    // Apply custom styles if provided, merging with defaults
    if (this.options.style) {
      Object.assign(container.style, this.options.style);
    }

    // Add buttons to the container
    this.options.buttons.forEach((buttonConfig) => {
      const button = this.createButton(buttonConfig);
      container.appendChild(button);
      this.buttons.set(buttonConfig.id, button);
    });

    this.updateLayout();
    return container;
  }

	updateInnerContainerStyle(): void {
    if (!this.map) {
      return;
    }
    const parentContainer = this.map.getContainer();
    const position = this.getPosition();

    // Use shared utility function to apply container position
    applyContainerPosition(this.container, parentContainer, position, this.options.style);
  
    this.container.style.alignItems = 'flex-start';
    this.container.style.display = 'flex'; // Ensures `align-items` works

    this.updateLayout()
  }

  // Responsive design handling
  private updateLayout() {
    if (!this.map) {
      return;
    }
    const mapContainer = this.map.getContainer();
    const containerWidth = mapContainer.clientWidth;
    
    // Use shared responsive layout utility
    // applyResponsiveLayout(Array.from(this.buttons.values()), containerWidth);
    applyGlobalResponsiveLayout(this.getPosition(), containerWidth);
  }

  // Create a single button with icon and label
  private createButton(config: TgBtnCfg): HTMLButtonElement {
    const button = createStyledButton({
      icon: createSvgImage(config.svg, config.label),
      label: config.label,
      // title: config.label,
      onClick: () => this.handleButtonClick(config)
    });

    return button;
  }

  // Handle button click event
  private handleButtonClick(config: TgBtnCfg) {
    // console.log("HandleButton:", config.id, this.activeButtonId);
    if (this.activeButtonId === config.id && !config.repeat) {
      return;
    }

    const previousButtonId = this.activeButtonId;

    if (!config.repeat) {
      this.activeButtonId = config.id;
    }

    if (previousButtonId && previousButtonId !== this.activeButtonId && this.map) {
      const previousConfig = this.options.buttons.find(b => b.id === previousButtonId);
      if (previousConfig) {
        // Call global onUntoggle first
        if (this.options.onUntoggle) {
          this.options.onUntoggle(this, this.map, previousConfig);
          this.emit('untoggle');
        }
      }
    }

    // Update button styles
    this.buttons.forEach((btn, id) => {
      if (id === this.activeButtonId) {
	      btn.style.backgroundColor = THEME.color.activeBackground;
      } else {
	      btn.style.backgroundColor = THEME.color.background;
      }
    });

    if (this.map) {
      // Execute callback if provided
      if (this.options.onToggle) {
        this.options.onToggle(this, this.map, config);
        this.emit('toggle');
      }
    }
  }

  // Add control to the map
  onAdd(map: MlMap): HTMLElement {
    this.map = map;

    this.map.on('resize', () => {
      this.updateInnerContainerStyle();
    });

    this.map.on('styledata', () => {
      this.updateInnerContainerStyle();
    });

    // Execute setup for each button
    this.options.buttons.forEach((buttonConfig) => {
      if (buttonConfig.setup) {
        buttonConfig.setup(this, this.map);
      }
    });

    // Activate the first button by default
    if (this.options.buttons.length > 0 && !this.activeButtonId) {
      const config = this.options.buttons.find(b => b.id === this.defaultActiveId);
      this.handleButtonClick(config || this.options.buttons[0]);
    }
    registerButtonGroup(this.getPosition(), this.buttons);

    return this.container;
  }

  // Remove control from the map
  onRemove() {
    unregisterButtonGroup(this.getPosition(), this.buttons);
    if (this.map) {
      this.map.off('resize', this.updateInnerContainerStyle);
      this.map.off('styledata', this.updateInnerContainerStyle);
    }
    // Execute cleanup for each button
    this.options.buttons.forEach((buttonConfig) => {
      if (buttonConfig.cleanup) {
        buttonConfig.cleanup(this, this.map);
      }
    });
    this.container.parentNode?.removeChild(this.container);
    this.map = undefined;
  }

  // Default position of the control
  getPosition(): ControlPosition {
    return this.options?.position || 'top-right';
  }

  /**
   * Get the unique instance ID for this control
   * @returns Unique identifier string
   */
  public getInstanceId(): string {
    return this.instanceId;
  }

  // Public method to programmatically switch to a specific button
  public setActiveButton(buttonId: string) {
    const config = this.options.buttons.find(b => b.id === buttonId);
    if (config) {
      this.handleButtonClick(config);
    }
  }

  public getActiveButton() {
    const buttonId = this.activeButtonId || this.defaultActiveId;
    const config = this.options.buttons.find(b => b.id === buttonId);

    if (!config) {
      return this.options.buttons[0];
    }

    return config;
  }
 
  // New method to update a specific button
  public updateButton(buttonId: string, updates: Partial<TgBtnCfg>) {
    const button = this.buttons.get(buttonId);
    const config = this.options.buttons.find(b => b.id === buttonId);

    if (!button || !config) {
      return;
    }

    // Update config
    Object.assign(config, updates);

    // Update button DOM
    const icon = button.querySelector('img');
    if (icon) {
      if (updates.svg) {
        icon.src = `data:image/svg+xml,${encodeURIComponent(updates.svg)}`;
      }
      if (updates.label) {
        icon.alt = updates.label; // Update alt text when label changes
      }
    }
    const label = button.querySelector('span');
    if (label && updates.label) {
      label.textContent = updates.label;
    }

    // Recalculate layout if needed
    this.updateLayout();
  }

  // Update a all button configs
  public updateButtonCallback(btnCfgs: Partial<TgBtnCfg>[]) {
    btnCfgs.forEach((updates) => {
      const buttonId = updates.id || '';
      const button = this.buttons.get(buttonId);
      const config = this.options.buttons.find(b => b.id === buttonId);

      if (!button || !config) {
        return;
      }

      // Update config
      Object.assign(config, updates);
    })
  }

  // Update the control's styles dynamically
  public updateStyle(newStyle: Partial<CSSStyleDeclaration>): void {
    if (this.container) {
      Object.assign(this.container.style, newStyle);
    }
  }
}
