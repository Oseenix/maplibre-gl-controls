
import type {
	IControl,
	Map,
	ControlPosition,
} from 'maplibre-gl';

import { expression } from "@maplibre/maplibre-gl-style-spec";
import type { Expression } from "@maplibre/maplibre-gl-style-spec";

import { applyContainerStyles, applyContainerPosition } from './utils/ui';

export type Options = {
  title: string;    // show title at the top of the color bar
  unit: string;     // show unit at the bottom of the color bar
	position?: ControlPosition;   // Optional position with a default top-left position
  width?: string;   // Optional width with a default 56px
  height?: string;  // Optional width with a default 272px
  max?: number;     // Optional max with a default 30
  decimal?: number; // Optional decimal with a default 1
  tickMinStep?: number; // Optional setup min step, with a default 0 not limit
  layerIds?: string[];  // Optional array of layer IDs affected by the color bar
  style?: Partial<CSSStyleDeclaration>; // Custom styles to apply, optional
  onClick?: (event: MouseEvent, bar: ColorBar, options: Options) => void; // Optional click callback with current options
};

export type ColorBarOptions = Options & {
  showResetButton?: boolean;
  palettes?: ColorBarPalette[];
  activePaletteId?: string;
  onPaletteChange?: (paletteId: string, bar: ColorBar) => void;
  onColorChange?: (speed: number, color: string, bar: ColorBar) => void;
  onReset?: (bar: ColorBar) => void;
};

export type ColorBarPalette = {
  id: string;
  label: string;
  colors?: string[];
};

interface ColorStep {
  speed: number;
  color: string;
}

export default class ColorBar implements IControl {
	private map: Map | undefined;
	private options: ColorBarOptions;

  private colorSteps: ColorStep[];
  private container: HTMLElement;
  private outContainer: HTMLElement;
  private titleDiv: HTMLElement;
  private unitDiv: HTMLElement;
  private legendItems: HTMLElement[] = [];
  private colorPickerInput: HTMLInputElement | null = null;
  private resetButton: HTMLElement | null = null;
  private paletteSelect: HTMLSelectElement | null = null;
  private customColors: Record<string, string> = {};

  propertySpec: Record<string, any>;

  constructor(propertySpec: any, options: ColorBarOptions) {
    if (!propertySpec) {
      this.propertySpec = {
        "fill-color": {
          default: [
            "step",
            ["get", "speed"],
            "#ff3f00", // Default color for speed < 0.10
            0.10, "#ff7e00",
            0.15, "#ffbe00",
            0.20, "#fffd00",
            0.25, "#c0ff00",
            0.30, "#81ff00",
            0.35, "#41ff00",
            0.40, "#02ff00",
            0.45, "#00ff3d",
            0.50, "#00ff7c",
            0.55, "#00ffbc",
            0.60, "#00fffb",
            0.65, "#00c2ff",
            0.70, "#0083ff",
            0.75, "#0043ff",
            0.80, "#0004ff",
            0.85, "#3b00ff",
            0.90, "#7a00ff",
            0.95, "#ba00ff",
            0.98, "#f900ff",
            1.00, "#f900ff",
          ],
          doc: "The color of each pixel of this layer",
          expression: {
            interpolated: true,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "fill-opacity": {
          type: "number",
          default: 0.5,
          minimum: 0,
          maximum: 1,
          transition: true,
          expression: {
            interpolated: true,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      };
    } else {
      this.propertySpec = propertySpec;
    }

		this.options = {
	    position: "top-left",
      width: "50px",    // Default width
      height: "272px",  // Default width
      max: 30,          // Default max
      decimal: 1,       // Default max
      tickMinStep: 0,   // Default tick value
      ...options,       // Override with user-provided options
    };

    this.colorSteps = this.getColorSteps();

    const { outContainer, innerContainer } = this.createContainer();
    this.outContainer = outContainer;
    this.container = innerContainer;
    this.titleDiv = this.createTitleDiv(this.options.title);
    this.unitDiv = this.createUnitDiv(this.options.unit);

    this.container.appendChild(this.titleDiv);
    this.paletteSelect = this.createPaletteSelect();
    if (this.paletteSelect) {
      this.container.appendChild(this.paletteSelect);
    }
    this.container.appendChild(this.unitDiv);

    // Add reset button
    this.resetButton = this.createResetButton();
    this.container.appendChild(this.resetButton);

    // Initialize color picker input
    this.colorPickerInput = this.createColorPickerInput();

    // Add click event listener to container - handle color box clicks and delegate others
    this.container.addEventListener('click', this.handleContainerClick);

    // Apply custom styles if provided, merging with defaults
    if (this.options.style) {
      Object.assign(this.container.style, this.options.style);
    }
  }

  private getTickMinStep(): number {
    return this.options.tickMinStep || 0;
  }

  private getDisplaySteps(): ColorStep[] {
    return [...this.colorSteps].reverse();
  }

	private getWidth(): string {
		return this.options.width || "52px";
	}

	private getHeight(): string {
		return this.options.height || "272px";
	}

  private getHeightInPixels(): number {
    const heightExpression = this.getHeight();
    if (heightExpression.endsWith('px')) {
      return parseFloat(heightExpression);
    }

    if (heightExpression.endsWith('%')) {
      const parentHeight = this.outContainer.offsetHeight;
      const percentage = parseFloat(heightExpression) / 100;
      return parentHeight * percentage;
    }

    return 272;
  }

  private createContainer(): { outContainer: HTMLElement; innerContainer: HTMLElement } {
	  // Outer container - use shared utility for consistent styling
	  const outContainer = document.createElement("div");
	  applyContainerStyles(outContainer, {
	    classNames: ['maplibregl-ctrl']
	  });
	  
	  // Override specific styles for colorbar
	  outContainer.style.height = "100%";
	  outContainer.style.display = "flex";
	  outContainer.style.flexDirection = "column";
	  outContainer.style.alignItems = "center";
    outContainer.style.backgroundColor = "transparent";
	  outContainer.style.pointerEvents = "none"; // Allow clicks to pass through to map
	  outContainer.style.margin = "0"; // Set margin to 0, let innerContainer control its own margin

	  // Inner container
    const group = this.options.position?.endsWith("left")
     ? "map-colorbar-left-group"
     : "map-colorbar-right-group";
	  const innerContainer = document.createElement("div");
	  innerContainer.classList.add(group);
	  innerContainer.classList.add("rp-colorBar"); // Add CSS class for responsive styling
	
	  // Inner container styles
	  innerContainer.style.width = this.getWidth();
	  innerContainer.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;
	  innerContainer.style.backgroundColor = "rgba(0, 36, 71, 0.8)";
	  innerContainer.style.display = "flex";
	  innerContainer.style.flexDirection = "column";
		innerContainer.style.borderRadius = "10px";
    innerContainer.style.pointerEvents = "auto"; // Ensure colorbar is interactive
	
	  // Add inner container to outer container
	  outContainer.appendChild(innerContainer);
	
	  // Return the inner container for further manipulation
	  return { outContainer, innerContainer };
	}

  private createTitleDiv(title: string): HTMLElement {
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("map_colorbar_title");
    titleDiv.innerHTML = title;
    titleDiv.style.marginTop = "6px";
    titleDiv.style.marginBottom = "8px";
    titleDiv.style.display = "flex";
		titleDiv.style.justifyContent = "center"; 
		titleDiv.style.textAlign = "center";
    titleDiv.style.fontSize = "11px";
		titleDiv.style.lineHeight = "14px";
    titleDiv.style.color = "white";
	  titleDiv.style.width = this.getWidth();
    return titleDiv;
  }

  private createUnitDiv(unit: string): HTMLElement {
    const unitDiv = document.createElement("div");
    unitDiv.classList.add("map_colorbar_unit");
    unitDiv.innerHTML = `(${unit})`;
    unitDiv.style.marginTop = "8px";
	  unitDiv.style.width = this.getWidth(); // Fixed or dynamically adjustable width
    unitDiv.style.display = "flex";
		unitDiv.style.justifyContent = "center"; 
    unitDiv.style.color = "white";
    unitDiv.style.fontSize = "12px";
		unitDiv.style.textAlign = "center";
    return unitDiv;
  }

  private createPaletteSelect(): HTMLSelectElement | null {
    if (!this.options.palettes || this.options.palettes.length <= 1) {
      return null;
    }

    const select = document.createElement("select");
    select.classList.add("map_colorbar_palette_select");
    select.style.cssText = `
      margin: 0 4px 6px 4px;
      width: calc(100% - 8px);
      height: 20px;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 4px;
      background: rgba(0, 18, 38, 0.82);
      color: white;
      font-size: 10px;
      outline: none;
      cursor: pointer;
    `;

    this.options.palettes.forEach((palette) => {
      const option = document.createElement("option");
      option.value = palette.id;
      option.textContent = palette.label;
      select.appendChild(option);
    });

    if (this.options.activePaletteId) {
      select.value = this.options.activePaletteId;
    }

    select.addEventListener("click", (event) => event.stopPropagation());
    select.addEventListener("change", (event) => {
      event.stopPropagation();
      if (this.options.onPaletteChange) {
        this.options.onPaletteChange(select.value, this);
      }
    });

    return select;
  }

  private createColorBox(color: string, speed: number): HTMLElement {
    const colorBox = document.createElement("div");
    colorBox.classList.add("map_colorbar_color_box");
    colorBox.style.width = "12px";
    colorBox.style.backgroundColor = color;
    colorBox.dataset.speed = speed.toString();
    return colorBox;
  }

  private createLabel(_step: ColorStep): HTMLElement {
    const label = document.createElement("div");
    label.classList.add("map_colorbar_label");
    label.style.marginTop = "0px";
    label.style.marginLeft = "0px";
    label.style.marginRight = "2px";
    label.style.color = "white";
    label.style.fontSize = "9px";
    label.textContent = "";
    return label;
  }

  private initializeLegendItems(): void {
    this.getDisplaySteps().forEach(({ speed, color }) => {
      const legendItem = document.createElement("div");
      legendItem.classList.add("map_colorbar_item");
      legendItem.style.display = "flex";
      legendItem.style.alignItems = "center";
      legendItem.style.marginBottom = "0px";
      legendItem.style.marginTop = "0px";
      legendItem.style.marginLeft = "10px";

      const colorBox = this.createColorBox(color, speed);
      const label = this.createLabel({speed, color});

      legendItem.appendChild(colorBox);
      legendItem.appendChild(label);
      this.legendItems.push(legendItem);
      this.container.insertBefore(legendItem, this.unitDiv); // 插入 unitDiv 之前
    });
  }

  private resetLegendItems(): void {
    this.legendItems.forEach(item => item.remove());
    this.legendItems = [];
    this.initializeLegendItems();
  }

  private calculateHeights(): { stepHeight: number } {
    const h = this.getHeightInPixels();
    const containerHeight = (this.container.getBoundingClientRect().height
                               ? this.container.getBoundingClientRect().height
                               : h);
    const totalMargin = 6 + 8 + 8;
    const stepsHeight = (containerHeight - this.titleDiv.offsetHeight
                        - this.unitDiv.offsetHeight - totalMargin);

    const stepHeight = Math.max(Math.floor(stepsHeight / this.colorSteps.length), 5);

    return { stepHeight };
  }

  // Handler for container click events
  private handleContainerClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    // Check if clicked on color box
    if (target.matches('.map_colorbar_color_box')) {
      event.stopPropagation();
      const speedStr = target.dataset.speed;
      if (speedStr) {
        this.showColorPicker(parseFloat(speedStr), event.clientX, event.clientY);
      }
      return;
    }

    // Other clicks -> call original onClick
    if (this.options.onClick) {
      this.options.onClick(event, this, this.options);
    }
  };

  public update(): void {
    this.updateInnerContainerStyle(this.outContainer, this.container);
    const { stepHeight } = this.calculateHeights();
    const displaySteps = this.getDisplaySteps();
    let lastLabeledValue: number | null = null;

    this.legendItems.forEach((legendItem, index) => {
      const colorBox = legendItem.querySelector(".map_colorbar_color_box") as HTMLElement;
      const label = legendItem.querySelector(".map_colorbar_label") as HTMLElement;
      const currentStep = displaySteps[index];

      if (!currentStep) {
        label.textContent = "";
        return;
      }

      const height = index === 0 ? stepHeight + 3 : stepHeight;
      legendItem.style.height = `${stepHeight}px`;
      colorBox.style.height = `${height}px`;
      label.style.marginTop = `${stepHeight}px`;

      const currentVal = currentStep.speed;
      const followsTwoStepRule = index % 2 === 0;
      const clearsTickMinStep = lastLabeledValue === null
        || Math.abs(lastLabeledValue - currentVal) >= this.getTickMinStep();

      if (followsTwoStepRule && clearsTickMinStep) {
        label.textContent = `- ${currentVal.toFixed(this.options.decimal)}`;
        lastLabeledValue = currentVal;
        return;
      }

      label.textContent = "";
    });
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
		map.getContainer().appendChild(this.outContainer);

    this.initializeLegendItems();
    this.update();

		this.map.once('styledata', () => {
			this.refresh();
		});

    this.map.on('resize', () => {
      this.update();
    });

		return this.outContainer;
  }

  onRemove(): void {
    if (this.map) {
      this.map.off('resize', this.update);
      this.map.off('styledata', this.refresh);
    }
    // this.container.parentNode?.removeChild(this.container);
    this.outContainer.parentNode?.removeChild(this.outContainer);

    // Cleanup color picker input
    if (this.colorPickerInput && this.colorPickerInput.parentNode) {
      this.colorPickerInput.parentNode.removeChild(this.colorPickerInput);
    }

		this.map = undefined;
  }

	refresh() {
	}

  getPosition(): ControlPosition {
    return this.options.position || 'top-left';
  };

  /**
   * Updates the options and refreshes the control
   * @param newOptions Partial options to update
   */
  public updateOptions(newOptions: Partial<Options>): void {
    // Store original options before updating
    const originalOptions = { ...this.options };
    
    // Update the options
    this.options = { ...this.options, ...newOptions };
    
    // Adjust tickMinStep proportionally if max changed but tickMinStep wasn't explicitly set
    if (newOptions.max !== undefined && newOptions.tickMinStep === undefined) {
    }

    // Update title if changed
    if (newOptions.title !== undefined) {
      this.titleDiv.innerHTML = newOptions.title;
    }

    // Update unit if changed
    if (newOptions.unit !== undefined) {
      this.unitDiv.innerHTML = `(${newOptions.unit})`;
    }

    if ((newOptions as Partial<ColorBarOptions>).activePaletteId !== undefined && this.paletteSelect) {
      this.paletteSelect.value = (newOptions as Partial<ColorBarOptions>).activePaletteId!;
    }

    // Update container dimensions if changed
    if (newOptions.width !== undefined || newOptions.height !== undefined) {
      this.container.style.width = this.getWidth();
      this.container.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;
    }

    // Recalculate color steps if max changed
    if (newOptions.max !== undefined) {
      if (newOptions.tickMinStep === undefined) {
        const originalTickMinStep = originalOptions.tickMinStep ?? 0;
        const originalMax = originalOptions.max ?? 30;
        this.options.tickMinStep = originalTickMinStep * newOptions.max / originalMax;
      }

      this.colorSteps = this.getColorSteps();
      this.resetLegendItems();
    }

    // Update click event listener if onClick changed
    if (newOptions.onClick !== undefined) {
      // Remove existing click listener
      this.container.removeEventListener('click', this.handleContainerClick);
    }

    // Refresh the control
    this.update();
  }

  public updatePalette(propertySpec: any, newOptions: Partial<ColorBarOptions> = {}): void {
    this.propertySpec = propertySpec;
    this.customColors = {};
    this.options = { ...this.options, ...newOptions };
    this.colorSteps = this.getColorSteps();

    if (newOptions.title !== undefined) {
      this.titleDiv.innerHTML = newOptions.title;
    }
    if (newOptions.unit !== undefined) {
      this.unitDiv.innerHTML = `(${newOptions.unit})`;
    }
    if (this.paletteSelect && newOptions.activePaletteId) {
      this.paletteSelect.value = newOptions.activePaletteId;
    }

    this.resetLegendItems();
    this.updateResetButtonVisibility();
    this.update();
  }

  public getOptions(): Options {
    return this.options;
  }

  public getMap(): Map | undefined {
    return this.map;
  }

	updateInnerContainerStyle(outContainer: HTMLElement, container: HTMLElement): void {
    if (!this.map) {
      return;
    }
    const parentContainer = this.map.getContainer();
	  const parentHeight = parentContainer.offsetHeight;

    outContainer.style.height = `${parentHeight}px`;

    // Use shared utility for consistent container positioning
    applyContainerPosition(container, parentContainer,
      this.options.position || 'top-left',
      this.options?.style);

    // Apply specific styles to innerContainer
    container.style.alignItems = 'flex-start';
    container.style.display = 'flex'; // Ensures `align-items` works
	  container.style.height = `calc(min((100% - 50px), ${this.getHeight()}))`;
  }

  /**
   * Parses the "fill-color" property and extracts speed-to-color mappings.
   * @returns An array of speed thresholds and their corresponding colors.
   */
  getColorSteps(): ColorStep[] {
    const colorSpec = this.propertySpec["fill-color"];
    if (!colorSpec) {
      throw new Error("Missing 'fill-color' specification.");
    }
  
    const colorSteps = colorSpec.default || colorSpec;
    const stepType = colorSteps[0];
  
    if (stepType !== "step") {
      throw new Error("Only 'step' expressions are supported.");
    }
  
    const steps: ColorStep[] = [];
    const [, , defaultColor, ...pairs] = colorSteps;
  
    const maxSpeed: number = this.options?.max || 30;
  
    // Add default color for speed < first threshold
    steps.push({ speed: 0, color: defaultColor });
  
    // Extract speed thresholds and colors
    for (let i = 0; i < pairs.length; i += 2) {
      const speed = pairs[i] as number;
      const absSpeed = speed * maxSpeed;
      const color = pairs[i + 1] as string;
      steps.push({ speed: absSpeed, color });
    }
  
    // Keep internal steps in ascending order and only reverse at render time.
    return steps.sort((a, b) => a.speed - b.speed);
  }

  // Create the hidden color picker input element
  private createColorPickerInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'color';
    input.style.cssText = `
      position: fixed;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
      z-index: -9999;
    `;
    document.body.appendChild(input);
    return input;
  }

  // Show the color picker at the specified position
  private showColorPicker(speed: number, x: number, y: number): void {
    if (!this.colorPickerInput) {
      this.colorPickerInput = this.createColorPickerInput();
    }

    const input = this.colorPickerInput;
    const colorStep = this.colorSteps.find(s => s.speed === speed);

    input.value = colorStep?.color || '#ffffff';
    input.style.left = `${x}px`;
    input.style.top = `${y}px`;
    input.style.opacity = '1';
    input.style.width = '40px';
    input.style.height = '40px';
    input.style.pointerEvents = 'auto';
    input.style.zIndex = '9999';
    input.dataset.speed = speed.toString();
    input.focus();

    // Remove old listeners to prevent duplicates
    input.removeEventListener('input', this.handleColorInputChange);
    input.removeEventListener('change', this.handleColorInputChange);
    input.addEventListener('input', this.handleColorInputChange);
  }

  // Handle color input changes
  private handleColorInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const speedStr = input.dataset.speed;

    if (!speedStr) return;

    const speed = parseFloat(speedStr);
    const color = input.value;

    // Hide picker
    input.style.opacity = '0';
    input.style.width = '0';
    input.style.height = '0';
    input.style.pointerEvents = 'none';

    // Update internal state
    this.customColors[speedStr] = color;
    this.updateSingleColorUI(speed, color);
    this.updateResetButtonVisibility();

    // Callback
    if (this.options.onColorChange) {
      this.options.onColorChange(speed, color, this);
    }
  };

  // Update a single color box UI
  public updateSingleColorUI(speed: number, color: string): void {
    const legendItem = this.legendItems.find(item => {
      const colorBox = item.querySelector('.map_colorbar_color_box') as HTMLElement;
      return colorBox && parseFloat(colorBox.dataset.speed || '0') === speed;
    });

    if (legendItem) {
      const colorBox = legendItem.querySelector('.map_colorbar_color_box') as HTMLElement;
      if (colorBox) {
        colorBox.style.backgroundColor = color;
      }
    }
  }

  // Create the reset button
  private createResetButton(): HTMLElement {
    const button = document.createElement('div');
    button.classList.add('map_colorbar_reset');
    button.innerHTML = 'restore';
    button.style.cssText = `
      width: 100%;
      display: none;
      justify-content: center;
      color: white;
      font-size: 10px;
      text-align: center;
      cursor: pointer;
      text-decoration: underline;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.color = '#87ceeb';
    });
    button.addEventListener('mouseleave', () => {
      button.style.color = 'white';
    });
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.options.onReset) {
        this.options.onReset(this);
      }
    });

    return button;
  }

  // Update reset button visibility
  public updateResetButtonVisibility(): void {
    if (!this.resetButton) return;
    const hasCustom = Object.keys(this.customColors).length > 0;
    this.resetButton.style.display = hasCustom ? 'flex' : 'none';
  }

  // Set custom colors directly (e.g., from localStorage restoration)
  public setCustomColors(colors: Record<string, string>): void {
    this.customColors = { ...colors };
    this.updateResetButtonVisibility();
  }

  // Reset colors to default
  public resetColors(defaultStops: [number, string][]): void {
    this.customColors = {};
    this.getDisplaySteps().forEach(({ speed, color }) => {
      const restoredColor = defaultStops.find(([stopSpeed]) => stopSpeed === speed)?.[1] ?? color;
      this.updateSingleColorUI(speed, restoredColor);
    });
    this.updateResetButtonVisibility();
    this.update();
  }

  /**
   * Sets a property using a Mapbox style expression.
   * @param prop The property name.
   * @param value The Mapbox style expression.
   */
  setProperty(prop: string, value: Expression) {
    const spec = this.propertySpec[prop];
    if (!spec) {
      throw new Error(`Property "${prop}" is not defined in the specification.`);
    }

    const expr = expression.createPropertyExpression(value, spec);
    if (expr.result === "success") {
      switch (expr.value.kind) {
        case "camera":
        case "composite":
          // Example: handle zoom-dependent properties
          console.log(`Camera/composite expression set for property "${prop}"`);
          break;
        default:
          // Example: handle constant or other property types
          console.log(`Property "${prop}" set with value`, expr.value);
          break;
      }
    } else {
      throw new Error(`Invalid expression for property "${prop}": ${expr.value}`);
    }
  }
}
