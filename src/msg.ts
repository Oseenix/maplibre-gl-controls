import type {
	IControl,
	Map,
	ControlPosition,
} from 'maplibre-gl';
import { calculateContainerPosition } from './utils/ui';

// Define the options type for the MsgCtl control
type Options = {
  msg?: string; // Message to display at the top of the control, optional
  position?: ControlPosition; // Position of the control, defaults to 'top-left'
  width?: string; // Width of the control, defaults to '56px'
  height?: string; // Height of the control, defaults to '272px'
  innerHTML?: string; // Custom inner HTML content, optional
  innerClassName?: string; // Custom class name for inner container, optional
  style?: Partial<CSSStyleDeclaration>; // Custom styles to apply, optional
};

export default class MsgCtl implements IControl {
	private map: Map | undefined;
	private options: Options;

  private container: HTMLElement;

  constructor(options: Options) {
		this.options = {
	    position: "top-left",
      width: "146px",    // Default width
      height: "24px",  // Default width
      ...options,       // Override with user-provided options
    };

    this.container = this.createContainer();
  }

	private getWidth(): string {
		return this.options.width || "146px";
	}

	private getHeight(): string {
		return this.options.height || "24px";
	}

  // Create the control's container element
  private createContainer(): HTMLElement {
    // Create container with MapLibre control class
    const container = document.createElement('div');
    container.className = 'maplibregl-ctrl maplibregl-ctrl-msg';

    // Add custom inner class name if provided
    if (this.options.innerClassName) {
      container.classList.add(this.options.innerClassName);
    }

    // Apply default styles
    container.style.width = this.getWidth();
    container.style.height = this.getHeight();
	  container.style.backgroundColor = "rgba(0, 36, 71, 0.7)";
    container.style.padding = '5px 10px';
    container.style.borderRadius = '3px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '14px';

    // Set content: use innerHTML if provided, otherwise fallback to msg
    if (this.options.innerHTML) {
      container.innerHTML = this.options.innerHTML;
    } else if (this.options.msg) {
      container.textContent = this.options.msg;
    }

    // Apply custom styles if provided, merging with defaults
    if (this.options.style) {
      Object.assign(container.style, this.options.style);
    }

    return container;
  }

	updateInnerContainerStyle(): void {
    if (!this.map) {
      return;
    }
    const parentContainer = this.map.getContainer();
    const position = this.options.position || 'top-left';
    
    // Use shared utility function to calculate container position
    const { marginTop, marginBottom, marginLeft, marginRight } = 
      calculateContainerPosition(parentContainer, position);

    // Apply calculated margins to the container
    this.container.style.marginTop = `${marginTop}px`;
    this.container.style.marginBottom = `${marginBottom}px`;
    this.container.style.marginLeft = `${marginLeft}px`;
    this.container.style.marginRight = `${marginRight}px`;
  }

  public update(): void {
    this.updateInnerContainerStyle();
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
		map.getContainer().appendChild(this.container);
    this.update();

		this.map.once('styledata', () => {
			this.refresh();
		});

    this.map.on('resize', () => {
      this.update();
    });

		return this.container;
  }

  onRemove(): void {
    if (this.map) {
      this.map.off('resize', this.update);
      this.map.off('styledata', this.refresh);
    }

    this.container.parentNode?.removeChild(this.container);
		this.map = undefined;
  }

	refresh() {
	}

  // Update the control's styles dynamically
  public updateStyle(newStyle: Partial<CSSStyleDeclaration>): void {
    if (this.container) {
      Object.assign(this.container.style, newStyle);
    }
  }

  // Update the control's content dynamically, with an option to specify if it's HTML
  public updateContent(newContent: string, isHTML: boolean = false): void {
    if (this.container) {
      if (isHTML) {
        // Use innerHTML for HTML content
        this.container.innerHTML = newContent;
      } else {
        // Use textContent for plain text to avoid HTML parsing
        this.container.textContent = newContent;
      }
    }
  }

  getPosition(): ControlPosition {
    return this.options.position || 'top-left';
  };
}
