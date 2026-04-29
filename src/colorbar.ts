
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
  onResetColor?: (speed: number, bar: ColorBar) => void;
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
  private nativeColorPickerInput: HTMLInputElement | null = null;
  private colorPickerPopover: HTMLElement | null = null;
  private nativeColorPickerOpen = false;
  private colorPickerOutsidePointerDownHandler: ((event: PointerEvent) => void) | null = null;
  private colorPickerEscapeKeyHandler: ((event: KeyboardEvent) => void) | null = null;
  private resetConfirmPopover: HTMLElement | null = null;
  private resetConfirmOutsidePointerDownHandler: ((event: PointerEvent) => void) | null = null;
  private resetConfirmEscapeKeyHandler: ((event: KeyboardEvent) => void) | null = null;
  private pendingResetAction: (() => void) | null = null;
  private resetButton: HTMLElement | null = null;
  private paletteSelect: HTMLElement | null = null;
  private paletteTrigger: HTMLButtonElement | null = null;
  private paletteMenu: HTMLElement | null = null;
  private paletteOutsidePointerDownHandler: ((event: PointerEvent) => void) | null = null;
  private paletteEscapeKeyHandler: ((event: KeyboardEvent) => void) | null = null;
  private customColors: Record<string, string> = {};
  private readonly confirmResetMessage = 'Restore default colors?';

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

  private createPaletteSelect(): HTMLElement | null {
    if (!this.options.palettes || this.options.palettes.length <= 1) {
      return null;
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("map_colorbar_palette_select");
    wrapper.style.cssText = `
      margin: 0 4px 6px 4px;
      width: calc(100% - 8px);
      position: relative;
      box-sizing: border-box;
    `;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.classList.add('map_colorbar_palette_trigger');
    trigger.style.cssText = `
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 0 7px;
      border-radius: 999px;
      color: rgba(255, 255, 255, 0.92);
      font-size: 10px;
      line-height: 20px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: left;
      backdrop-filter: blur(4px);
    `;

    const label = document.createElement('span');
    label.classList.add('map_colorbar_palette_trigger_label');
    label.style.cssText = `
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;

    const caret = document.createElement('span');
    caret.classList.add('map_colorbar_palette_trigger_caret');
    caret.setAttribute('aria-hidden', 'true');
    caret.style.cssText = `
      width: 6px;
      height: 6px;
      border-top: 1px solid rgba(255, 255, 255, 0.68);
      border-right: 1px solid rgba(255, 255, 255, 0.68);
      transform: rotate(45deg) translateY(-1px);
      flex-shrink: 0;
      opacity: 0.8;
    `;

    const menu = document.createElement('div');
    menu.classList.add('map_colorbar_palette_menu');
    menu.style.cssText = `
      position: absolute;
      top: auto;
      left: 100%;
      bottom:0;
      right: 0;
      display: none;
      width:74px;
      flex-direction: column;
      gap: 2px;
      padding: 4px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      background: rgba(0, 36, 71, 0.94);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
      z-index: 3;
      backdrop-filter: blur(8px);
    `;

    this.options.palettes.forEach((palette) => {
      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.classList.add('map_colorbar_palette_option');
      optionButton.dataset.paletteId = palette.id;
      optionButton.textContent = palette.label;
      optionButton.style.cssText = `
        width: 100%;
        padding: 0 7px;
        border: 0;
        border-radius: 7px;
        height:22px;
        background: transparent;
        color: rgba(255, 255, 255, 0.88);
        font-size: 10px;
        line-height: 22px;
        text-align: left;
        cursor: pointer;
      `;
      optionButton.addEventListener('mouseenter', () => {
        optionButton.style.background = 'rgba(255, 255, 255, 0.08)';
      });
      optionButton.addEventListener('mouseleave', () => {
        const isActive = optionButton.dataset.active === 'true';
        optionButton.style.background = isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent';
      });
      optionButton.addEventListener('click', (event) => {
        event.stopPropagation();
        this.setPaletteSelection(palette.id);
        this.closePaletteMenu();
        if (this.options.onPaletteChange) {
          this.options.onPaletteChange(palette.id, this);
        }
      });
      menu.appendChild(optionButton);
    });

    trigger.appendChild(label);
    trigger.appendChild(caret);
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      this.togglePaletteMenu();
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);

    this.paletteTrigger = trigger;
    this.paletteMenu = menu;
    this.setPaletteSelection(this.options.activePaletteId || this.options.palettes[0].id);

    return wrapper;
  }

  private createColorBox(color: string, speed: number): HTMLElement {
    const colorBox = document.createElement("div");
    colorBox.classList.add("map_colorbar_color_box");
    colorBox.style.width = "12px";
    colorBox.style.backgroundColor = color;
    colorBox.dataset.speed = speed.toString();
    return colorBox;
  }

  private setPaletteSelection(paletteId: string): void {
    if (!this.options.palettes || this.options.palettes.length === 0) {
      return;
    }

    const palette = this.options.palettes.find((item) => item.id === paletteId) || this.options.palettes[0];
    if (this.paletteSelect) {
      this.paletteSelect.dataset.value = palette.id;
    }

    if (this.paletteTrigger) {
      const label = this.paletteTrigger.querySelector('.map_colorbar_palette_trigger_label');
      if (label) {
        label.textContent = palette.label;
      }
    }

    if (this.paletteMenu) {
      Array.from(this.paletteMenu.querySelectorAll('.map_colorbar_palette_option')).forEach((node) => {
        const option = node as HTMLButtonElement;
        const isActive = option.dataset.paletteId === palette.id;
        option.dataset.active = isActive ? 'true' : 'false';
        option.style.background = isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent';
        option.style.color = isActive ? 'white' : 'rgba(255, 255, 255, 0.88)';
      });
    }
  }

  private closePaletteMenu = (): void => {
    if (this.paletteMenu) {
      this.paletteMenu.style.display = 'none';
    }
    if (this.paletteTrigger) {
      this.paletteTrigger.setAttribute('aria-expanded', 'false');
    }
    if (this.paletteOutsidePointerDownHandler) {
      document.removeEventListener('pointerdown', this.paletteOutsidePointerDownHandler, true);
      this.paletteOutsidePointerDownHandler = null;
    }
    if (this.paletteEscapeKeyHandler) {
      document.removeEventListener('keydown', this.paletteEscapeKeyHandler, true);
      this.paletteEscapeKeyHandler = null;
    }
  };

  private openPaletteMenu(): void {
    if (!this.paletteSelect || !this.paletteMenu) {
      return;
    }

    this.closePaletteMenu();
    this.paletteMenu.style.display = 'flex';
    if (this.paletteTrigger) {
      this.paletteTrigger.setAttribute('aria-expanded', 'true');
    }
    this.paletteOutsidePointerDownHandler = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !this.paletteSelect?.contains(event.target)
      ) {
        this.closePaletteMenu();
      }
    };
    this.paletteEscapeKeyHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        this.closePaletteMenu();
      }
    };
    document.addEventListener('pointerdown', this.paletteOutsidePointerDownHandler, true);
    document.addEventListener('keydown', this.paletteEscapeKeyHandler, true);
  }

  private togglePaletteMenu(): void {
    if (this.paletteMenu?.style.display === 'flex') {
      this.closePaletteMenu();
      return;
    }

    this.openPaletteMenu();
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

  // Handler for container click events
  private handleContainerClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    // Check if clicked on color box
    if (target.matches('.map_colorbar_color_box')) {
      event.stopPropagation();
      const speedStr = target.dataset.speed;
      if (speedStr) {
        this.showColorPicker(parseFloat(speedStr), target);
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
    const displaySteps = this.getDisplaySteps();
    let lastLabeledValue: number | null = null;
    const fixedStepHeight = 9;

    this.legendItems.forEach((legendItem, index) => {
      const colorBox = legendItem.querySelector(".map_colorbar_color_box") as HTMLElement;
      const label = legendItem.querySelector(".map_colorbar_label") as HTMLElement;
      const currentStep = displaySteps[index];

      if (!currentStep) {
        label.textContent = "";
        return;
      }

      legendItem.style.height = `${fixedStepHeight}px`;
      colorBox.style.height = `${fixedStepHeight}px`;
      label.style.marginTop = `${fixedStepHeight}px`;

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
    this.closeColorPicker();
    this.closeResetConfirm();
    this.closePaletteMenu();
    // this.container.parentNode?.removeChild(this.container);
    this.outContainer.parentNode?.removeChild(this.outContainer);

    // Cleanup color picker input
    if (this.colorPickerInput && this.colorPickerInput.parentNode) {
      this.colorPickerInput.parentNode.removeChild(this.colorPickerInput);
    }
    if (this.colorPickerPopover && this.colorPickerPopover.parentNode) {
      this.colorPickerPopover.parentNode.removeChild(this.colorPickerPopover);
    }
    if (this.nativeColorPickerInput && this.nativeColorPickerInput.parentNode) {
      this.nativeColorPickerInput.parentNode.removeChild(this.nativeColorPickerInput);
    }
    if (this.resetConfirmPopover && this.resetConfirmPopover.parentNode) {
      this.resetConfirmPopover.parentNode.removeChild(this.resetConfirmPopover);
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
      this.setPaletteSelection((newOptions as Partial<ColorBarOptions>).activePaletteId!);
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
      this.setPaletteSelection(newOptions.activePaletteId);
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

  private createColorPickerInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'color';
    input.classList.add('map_colorbar_picker_input');
    input.style.cssText = `
      display: block;
      width: 100%;
      height: 26px;
      padding: 0;
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      box-sizing: border-box;
      overflow: hidden;
    `;
    input.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    input.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.toggleNativeColorPicker();
    });
    return input;
  }

  private createNativeColorPickerInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'color';
    input.classList.add('map_colorbar_picker_native_input');
    input.style.cssText = `
      position: fixed;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(input);
    return input;
  }

  private createColorPickerPopover(): HTMLElement {
    const popover = document.createElement('div');
    popover.classList.add('map_colorbar_picker_popover');
    popover.style.cssText = `
      position: fixed;
      display: none;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      border-radius: 8px;
      background: rgba(0, 36, 71, 0.92);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
      z-index: 9998;
      pointer-events: auto;
    `;

    if (!this.colorPickerInput) {
      this.colorPickerInput = this.createColorPickerInput();
    }
    if (!this.nativeColorPickerInput) {
      this.nativeColorPickerInput = this.createNativeColorPickerInput();
    }

    popover.appendChild(this.colorPickerInput);

    const actionBar = document.createElement('div');
    actionBar.classList.add('map_colorbar_picker_actions');
    actionBar.style.cssText = `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 6px;
      width: 100%;
    `;

    const resetCurrentColorButton = this.createPickerActionButton('Reset');
    resetCurrentColorButton.classList.add('map_colorbar_picker_reset_current');
    resetCurrentColorButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const speed = this.getActivePickerSpeed();
      if (speed === null) {
        return;
      }

      if (this.options.onResetColor) {
        this.options.onResetColor(speed, this);
      }
      const defaultColor = this.getDefaultColorForSpeed(speed);
      this.resetSingleColor(speed);
      if (defaultColor && this.colorPickerInput) {
        this.colorPickerInput.value = defaultColor;
      }
      if (defaultColor && this.nativeColorPickerInput) {
        this.nativeColorPickerInput.value = defaultColor;
      }
      this.closeColorPicker();
    });

    const restoreModeButton = this.createPickerActionButton('Restore');
    restoreModeButton.classList.add('map_colorbar_picker_restore_mode');
    restoreModeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.showResetConfirm(restoreModeButton, () => {
        if (this.options.onReset) {
          this.options.onReset(this);
        }
        this.closeColorPicker();
      });
    });
    actionBar.appendChild(restoreModeButton);
    actionBar.appendChild(resetCurrentColorButton);
    popover.appendChild(actionBar);
    document.body.appendChild(popover);

    return popover;
  }

  private createPickerActionButton(label: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.style.cssText = `
      appearance: none;
      color: white;
      font-size: 10px;
      line-height: 14px;
      padding: 4px;
      flex: 1;
      cursor: pointer;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(255, 255, 255, 0.08)';
    });

    return button;
  }

  private createResetConfirmPopover(): HTMLElement {
    const popover = document.createElement('div');
    popover.classList.add('map_colorbar_reset_confirm');
    popover.style.cssText = `
      position: fixed;
      display: none;
      flex-direction: column;
      gap: 8px;
      min-width: 136px;
      padding: 10px;
      border-radius: 10px;
      background: rgba(0, 36, 71, 0.96);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
      z-index: 9999;
      pointer-events: auto;
    `;

    const message = document.createElement('div');
    message.classList.add('map_colorbar_reset_confirm_message');
    message.textContent = this.confirmResetMessage;
    message.style.cssText = `
      color: white;
      font-size: 10px;
      line-height: 14px;
      text-align: center;
    `;

    const actions = document.createElement('div');
    actions.classList.add('map_colorbar_reset_confirm_actions');
    actions.style.cssText = `
      display: flex;
      gap: 6px;
    `;

    const cancelButton = this.createPickerActionButton('Cancel');
    cancelButton.classList.add('map_colorbar_reset_confirm_cancel');
    cancelButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.closeResetConfirm();
    });

    const confirmButton = this.createPickerActionButton('Restore');
    confirmButton.classList.add('map_colorbar_reset_confirm_accept');
    confirmButton.style.background = 'rgba(255, 255, 255, 0.12)';
    confirmButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const action = this.pendingResetAction;
      this.closeResetConfirm();
      action?.();
    });

    actions.appendChild(cancelButton);
    actions.appendChild(confirmButton);
    popover.appendChild(message);
    popover.appendChild(actions);
    document.body.appendChild(popover);

    return popover;
  }

  private getResetConfirmPopover(): HTMLElement {
    if (!this.resetConfirmPopover) {
      this.resetConfirmPopover = this.createResetConfirmPopover();
    }

    return this.resetConfirmPopover;
  }

  private closeResetConfirm = (): void => {
    this.pendingResetAction = null;
    if (this.resetConfirmPopover) {
      this.resetConfirmPopover.style.display = 'none';
    }
    if (this.resetConfirmOutsidePointerDownHandler) {
      document.removeEventListener('pointerdown', this.resetConfirmOutsidePointerDownHandler, true);
      this.resetConfirmOutsidePointerDownHandler = null;
    }
    if (this.resetConfirmEscapeKeyHandler) {
      document.removeEventListener('keydown', this.resetConfirmEscapeKeyHandler, true);
      this.resetConfirmEscapeKeyHandler = null;
    }
  };

  private showResetConfirm(anchor: HTMLElement, onConfirm: () => void): void {
    const popover = this.getResetConfirmPopover();
    const anchorRect = anchor.getBoundingClientRect();

    this.closeResetConfirm();
    this.pendingResetAction = onConfirm;
    popover.style.display = 'flex';

    const margin = 8;
    const width = popover.offsetWidth;
    const height = popover.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = anchorRect.right + margin;
    if (left + width > viewportWidth - margin) {
      left = Math.max(margin, anchorRect.left - width - margin);
    }

    let top = anchorRect.top + (anchorRect.height - height) / 2;
    if (top + height > viewportHeight - margin) {
      top = viewportHeight - height - margin;
    }
    if (top < margin) {
      top = margin;
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;

    this.resetConfirmOutsidePointerDownHandler = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !popover.contains(event.target)
      ) {
        this.closeResetConfirm();
      }
    };
    this.resetConfirmEscapeKeyHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        this.closeResetConfirm();
      }
    };

    document.addEventListener('pointerdown', this.resetConfirmOutsidePointerDownHandler, true);
    document.addEventListener('keydown', this.resetConfirmEscapeKeyHandler, true);
  }

  private getColorPickerPopover(): HTMLElement {
    if (!this.colorPickerPopover) {
      this.colorPickerPopover = this.createColorPickerPopover();
    }

    return this.colorPickerPopover;
  }

  private getActivePickerSpeed(): number | null {
    if (!this.colorPickerInput) {
      return null;
    }

    const speedStr = this.colorPickerInput.dataset.speed;
    if (!speedStr) {
      return null;
    }

    const speed = parseFloat(speedStr);
    return Number.isFinite(speed) ? speed : null;
  }

  public getDefaultColorForSpeed(speed: number): string | undefined {
    return this.colorSteps.find((step) => step.speed === speed)?.color;
  }

  private toggleNativeColorPicker(): void {
    const visibleInput = this.colorPickerInput;
    const nativeInput = this.nativeColorPickerInput;
    const popover = this.colorPickerPopover;
    if (!visibleInput || !nativeInput || !popover) {
      return;
    }

    if (this.nativeColorPickerOpen) {
      const speedStr = nativeInput.dataset.speed;
      const currentValue = nativeInput.value;
      nativeInput.remove();
      this.nativeColorPickerInput = this.createNativeColorPickerInput();
      if (speedStr) {
        this.nativeColorPickerInput.dataset.speed = speedStr;
      }
      this.nativeColorPickerInput.value = currentValue;
      this.nativeColorPickerInput.style.left = nativeInput.style.left;
      this.nativeColorPickerInput.style.top = nativeInput.style.top;
      this.nativeColorPickerInput.style.zIndex = '-1';
      this.nativeColorPickerInput.removeEventListener('input', this.handleColorInputChange);
      this.nativeColorPickerInput.removeEventListener('change', this.handleColorInputChange);
      this.nativeColorPickerInput.addEventListener('input', this.handleColorInputChange);
      this.nativeColorPickerInput.addEventListener('change', this.handleColorInputChange);
      this.nativeColorPickerOpen = false;
      visibleInput.focus({ preventScroll: true });
      return;
    }

    nativeInput.style.left = `${popover.offsetLeft + popover.offsetWidth + 12}px`;
    nativeInput.style.top = `${popover.offsetTop + 8}px`;
    nativeInput.style.zIndex = '9999';
    nativeInput.removeEventListener('input', this.handleColorInputChange);
    nativeInput.removeEventListener('change', this.handleColorInputChange);
    nativeInput.addEventListener('input', this.handleColorInputChange);
    nativeInput.addEventListener('change', this.handleColorInputChange);
    this.nativeColorPickerOpen = true;

    const anyInput = nativeInput as HTMLInputElement & { showPicker?: () => void };
    try {
      if (typeof anyInput.showPicker === 'function') {
        anyInput.showPicker();
      } else {
        nativeInput.click();
      }
    } catch {
      nativeInput.click();
    }
  }

  // Show the color picker at the specified position
  private showColorPicker(speed: number, swatch: HTMLElement): void {
    this.closeColorPicker();
    this.closeResetConfirm();

    const popover = this.getColorPickerPopover();
    const input = this.colorPickerInput;
    const nativeInput = this.nativeColorPickerInput;
    if (!input || !nativeInput) {
      return;
    }

    const colorStep = this.colorSteps.find(s => s.speed === speed);
    const swatchRect = swatch.getBoundingClientRect();
    const popoverTop = swatchRect.top + (swatchRect.height / 2) - 28;
    const popoverLeft = swatchRect.right + 8;

    input.value = this.customColors[String(speed)] || colorStep?.color || '#ffffff';
    input.dataset.speed = speed.toString();
    popover.style.left = `${popoverLeft}px`;
    popover.style.top = `${popoverTop}px`;
    popover.style.display = 'flex';
    nativeInput.value = input.value;
    nativeInput.dataset.speed = speed.toString();
    nativeInput.style.left = `${popoverLeft + popover.offsetWidth + 12}px`;
    nativeInput.style.top = `${popoverTop + 8}px`;
    nativeInput.style.zIndex = '-1';
    this.nativeColorPickerOpen = false;

    this.colorPickerOutsidePointerDownHandler = (event: PointerEvent): void => {
      const resetConfirmPopover = this.resetConfirmPopover;
      if (
        event.target instanceof Node &&
        !popover.contains(event.target) &&
        !(resetConfirmPopover && resetConfirmPopover.contains(event.target))
      ) {
        this.closeColorPicker();
      }
    };
    this.colorPickerEscapeKeyHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        this.closeColorPicker();
      }
    };
    document.addEventListener('pointerdown', this.colorPickerOutsidePointerDownHandler, true);
    document.addEventListener('keydown', this.colorPickerEscapeKeyHandler, true);

    input.focus({ preventScroll: true });
  }

  private closeColorPicker = (): void => {
    this.closeResetConfirm();
    if (!this.colorPickerInput) return;

    const input = this.colorPickerInput;
    input.removeAttribute('data-picker-open');
    input.removeAttribute('data-speed');
    if (this.nativeColorPickerInput) {
      this.nativeColorPickerInput.removeAttribute('data-speed');
      this.nativeColorPickerInput.style.zIndex = '-1';
    }
    this.nativeColorPickerOpen = false;
    if (this.colorPickerPopover) {
      this.colorPickerPopover.style.display = 'none';
    }
    if (this.colorPickerOutsidePointerDownHandler) {
      document.removeEventListener('pointerdown', this.colorPickerOutsidePointerDownHandler, true);
      this.colorPickerOutsidePointerDownHandler = null;
    }
    if (this.colorPickerEscapeKeyHandler) {
      document.removeEventListener('keydown', this.colorPickerEscapeKeyHandler, true);
      this.colorPickerEscapeKeyHandler = null;
    }
  };

  // Handle color input changes
  private handleColorInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const speedStr = input.dataset.speed;

    if (!speedStr) return;

    const speed = parseFloat(speedStr);
    const color = input.value;

    // Update internal state
    this.customColors[speedStr] = color;
    if (this.colorPickerInput) {
      this.colorPickerInput.value = color;
    }
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

  public resetSingleColor(speed: number): void {
    delete this.customColors[String(speed)];
    const defaultColor = this.getDefaultColorForSpeed(speed);
    if (defaultColor) {
      this.updateSingleColorUI(speed, defaultColor);
    }
    this.updateResetButtonVisibility();
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
      this.showResetConfirm(button, () => {
        if (this.options.onReset) {
          this.options.onReset(this);
        }
      });
    });

    return button;
  }

  // Update reset button visibility
  public updateResetButtonVisibility(): void {
    if (!this.resetButton) return;
    this.resetButton.style.display = 'none';
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
