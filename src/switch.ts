import type { IControl, Map as MlMap, ControlPosition } from 'maplibre-gl';

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
  onToggle?: (ctl: ToggleCtl, map: MlMap, activeConfig: TgBtnCfg) => void;
  onUntoggle?: (ctl: ToggleCtl, map: MlMap, config: TgBtnCfg) => void;
};

const iconWidth = 20;
const btnPadingX = 6;
const btnPadingY = 4;
const btnGap = 4;

// Create an SVG image element with alt text for SEO
const makeImg = (svg: string, alt: string): HTMLImageElement => {
  const img = document.createElement('img');
  img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  img.alt = alt; // Set alt text for SEO and accessibility
  img.style.width = `${iconWidth}px`;
  img.style.height = `${iconWidth}px`;
  img.style.color = 'white';
  return img;
};

export default class ToggleCtl implements IControl {
  private map: MlMap | undefined;
  private container: HTMLElement;
  private outContainer: HTMLElement;
  private options: ToggleCtlOptions;
  private defaultActiveId: string;
  private activeButtonId: string | null = null;
  private buttons: Map<string, HTMLButtonElement> = new Map();

  constructor(options: ToggleCtlOptions) {
    this.options = options;
    const { outContainer, container } = this.createContainer();
    this.outContainer = outContainer;
    this.container = container;
    this.defaultActiveId = this.options.defaultActive;
  }

  // Create the outer container for the control
  private createContainer(): { outContainer: HTMLElement; container: HTMLElement } {
    // Outer container
	  const outContainer = document.createElement("div");
	  outContainer.classList.add("maplibregl-ctrl");
	
	  // Outer container styles
	  outContainer.style.height = "100%"; // Fixed or dynamically adjustable height
	  outContainer.style.display = "flex";
	  outContainer.style.flexDirection = "column";
	  outContainer.style.alignItems = "center";
    outContainer.style.backgroundColor = "transparent";

    const container = document.createElement('div');
    container.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');
    container.style.backgroundColor = "transparent";
    container.style.padding = '5px';
    container.style.border = "transparent";
    container.style.boxShadow = "none";
    container.style.borderRadius = '4px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '4px';

    // Add buttons to the container
    this.options.buttons.forEach((buttonConfig) => {
      const button = this.createButton(buttonConfig);
      container.appendChild(button);
      this.buttons.set(buttonConfig.id, button);
    });
    this.container = container;

    this.updateLayout();
    outContainer.appendChild(this.container);

    return { outContainer, container };
  }

	updateInnerContainerStyle(): void {
    if (!this.map) {
      return;
    }
    const parentContainer = this.map.getContainer();
	  const parentWidth = parentContainer.offsetWidth;
	  const parentHeight = parentContainer.offsetHeight;

    this.outContainer.style.height = `${parentHeight}px`;

	  // Default styles
	  let marginTop = 10;
	  let marginBottom = 10;
		let defMarginLeft = Math.max(
		  0,
		  parseFloat(
		    getComputedStyle(parentContainer)
					.getPropertyValue('env(safe-area-inset-left)') || '0'
		  )
		);
    let defMarginRight = Math.max(
		  0,
		  parseFloat(
		    getComputedStyle(parentContainer)
					.getPropertyValue('env(safe-area-inset-right)') || '0'
		  )
		);
		let marginLeft = defMarginLeft;
		let marginRight = defMarginRight;
	
	  // Update styles based on parent dimensions
	  if (parentWidth >= 480) {
	    marginTop = 15;
	    marginBottom = 15;
	    marginLeft = Math.max(15, defMarginLeft);
	    marginRight = Math.max(15, defMarginRight);
	  }

	  if (parentHeight >= 992) {
	    marginTop = 40;
	    marginBottom = 40;
    }

	  if (parentWidth >= 992) {
	    marginLeft = Math.max(40, defMarginLeft);
	    marginRight = Math.max(40, defMarginRight);
    }

    if (this.options.position?.endsWith("left")) {
      this.container.style.marginLeft = `${marginLeft}px`;
      this.container.style.marginRight = `${defMarginRight}px`;
    } else {
      this.container.style.marginLeft = `${defMarginLeft}px`;
      this.container.style.marginRight = `${marginRight}px`;
		}

    // Apply styles to innerContainer
    this.container.style.marginTop = `${marginTop}px`;
    this.container.style.marginBottom = `${marginBottom}px`;
  
    this.container.style.alignItems = 'flex-start';
    this.container.style.display = 'flex'; // Ensures `align-items` works
	  // this.container.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;

    this.updateLayout()
  }

  // Responsive design handling
  private updateLayout() {
    if (!this.map) {
      return;
    }
    const mapContainer = this.map.getContainer();
    const containerWidth = mapContainer.clientWidth;
    const isSmallScreen = containerWidth < 768;     // Adjust threshold as needed

    this.buttons.forEach((btn) => {
      const label = btn.querySelector('span');
      if (label) {
        label.style.display = isSmallScreen ? 'none' : 'inline';
      }
      btn.style.width = 'fit-content'
    });

    // Recalculate max width when labels are toggled
    const buttonElements = Array.from(this.buttons.values());
    const maxWidth = Math.max(...buttonElements.map(btn => btn.offsetWidth));

    const targetWidth = isSmallScreen ? '34px' : `${maxWidth}px`;
    const minFontSize = 12;

    const labels = buttonElements.map(btn => {
      btn.style.width = targetWidth;

      if (isSmallScreen) return null;

      const label = btn.querySelector('span');
      if (!label || !label.textContent) return null;

      return [label, this.calculateFontSize(maxWidth, label.textContent)] as const;
      // return { element: label, fontSize: this.calculateFontSize(maxWdth - iconWidth, label.textContent) };
    }).filter((item): item is readonly [HTMLElement, number] => !!item);

    // Apply minimum font size across all labels
    const smallestFontSize = Math.min(minFontSize, ...labels.map(([, fontSize]) => fontSize));
    labels.forEach(([label]) => {
      label.style.fontSize = `${smallestFontSize}px`;
    });
  };

  // Function to calculate font size based on width and character count
  private calculateFontSize(btnWidth: number, text: string, maxFontSize: number = 12, minFontSize: number = 6) {
    const widthPx = btnWidth - iconWidth - btnPadingX * 2 - btnGap; // Adjusted width for text
    const charCount = text.replace(/<[^>]+>/g, '').length; // Strip HTML tags to count plain text
    if (charCount === 0) return; // Avoid division by zero

    // Scaling factor: approximate character width-to-height ratio (adjust as needed)
    const scalingFactor = 0.5; // 0.5–0.7 works for most fonts
    let fontSize = Math.floor(widthPx / (charCount * scalingFactor));

    // Clamp font size between min and max
    fontSize = Math.min(maxFontSize, Math.max(minFontSize, fontSize));

    return fontSize;
  }

  // Create a single button with icon and label
  private createButton(config: TgBtnCfg): HTMLButtonElement {
    const button = document.createElement('button');
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.gap = `${btnGap}px`;
    button.style.padding = `${btnPadingY}px ${btnPadingX}px`;
    button.style.border = 'none';
    // button.style.backgroundColor = 'transparent';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '4px';
    button.style.width = 'fit-content'
    button.style.color = 'white'
	  button.style.backgroundColor = "rgba(0, 36, 71, 0.6)";

    // Add icon with alt text for SEO
    const icon = makeImg(config.svg, config.label);
    button.appendChild(icon);

    // Add label (can be English or Chinese)
    const label = document.createElement('span');
    label.textContent = config.label; // e.g., "Roads"
    label.style.fontSize = '10px';
    label.style.color = 'inherit';
    button.appendChild(label);

    // Handle button click
    button.onclick = () => this.handleButtonClick(config);

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
        }
      }
    }

    // Update button styles
    this.buttons.forEach((btn, id) => {
      if (id === this.activeButtonId) {
	      btn.style.backgroundColor = "rgba(0, 36, 71, 0.98)";
      } else {
	      btn.style.backgroundColor = "rgba(0, 36, 71, 0.6)";
      }
    });

    if (this.map) {
      // Execute callback if provided
      if (this.options.onToggle) {
        this.options.onToggle(this, this.map, config);
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

    return this.container;
  }

  // Remove control from the map
  onRemove() {
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
  getDefaultPosition(): ControlPosition {
    return 'top-right';
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
}
