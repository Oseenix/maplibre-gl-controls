/**
 * Shared UI utilities for MapLibre GL controls
 */
import { ControlPosition } from 'maplibre-gl';
export declare const CONTAINER_STYLE: {
    readonly backgroundColor: "transparent";
    readonly padding: "5px";
    readonly border: "transparent";
    readonly boxShadow: "none";
    readonly borderRadius: "4px";
    readonly display: "flex";
    readonly flexDirection: "column";
    readonly gap: "4px";
    readonly fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif";
    readonly fontSize: "11px";
    readonly color: "rgba(255, 255, 255, 1.0)";
};
/**
 * Apply common container styles to a control element
 * @param container - The container element to style
 * @param options - Styling options
 */
export declare function applyContainerStyles(container: HTMLElement, options?: {
    classNames?: string[];
}): void;
export declare const BUTTON_STYLE: {
    readonly display: "flex";
    readonly alignItems: "center";
    readonly gap: "4px";
    readonly padding: "4px 6px";
    readonly border: "none";
    readonly cursor: "pointer";
    readonly borderRadius: "4px";
    readonly width: "fit-content";
    readonly color: "rgba(255, 255, 255, 1.0)";
    readonly backgroundColor: "rgba(0, 36, 71, 0.6)";
    readonly fontSize: "11px";
    readonly whiteSpace: "nowrap";
};
export declare const RESPONSIVE_CONSTANTS: {
    readonly iconWidth: 20;
    readonly btnPaddingX: 6;
    readonly btnPaddingY: 4;
    readonly btnGap: 4;
    readonly smallScreenThreshold: 768;
    readonly minFontSize: 10;
    readonly maxFontSize: 16;
    readonly scalingFactor: 0.5;
};
export declare function registerButtonGroup(position: ControlPosition, buttons: Map<string, HTMLButtonElement>): void;
export declare function unregisterButtonGroup(position: ControlPosition, buttons: Map<string, HTMLButtonElement>): void;
/**
 * Create a styled button with icon and label
 * @param options - Button configuration
 * @returns HTMLButtonElement
 */
export declare function createStyledButton(options: {
    icon?: string | HTMLElement;
    label: string;
    title?: string;
    onClick?: (event: MouseEvent) => void;
    className?: string;
    backgroundColor?: string;
}): HTMLButtonElement;
/**
 * Create an SVG image element with alt text for SEO
 * @param svg - SVG string
 * @param alt - Alt text for accessibility
 * @param width - Icon width (default: 20)
 * @returns HTMLImageElement
 */
export declare function createSvgImage(svg: string, alt: string, width?: number): HTMLImageElement;
/**
 * Format a string by replacing underscores with spaces and capitalizing each word
 * @param str - The string to format (e.g., "hello_world")
 * @returns The formatted string (e.g., "Hello World")
 */
export declare function formatLabel(str: string): string;
/**
 * Calculate optimal font size based on button width and text length
 * @param btnWidth - Total button width in pixels
 * @param text - Button label text
 * @param maxFontSize - Maximum font size (default: 12)
 * @param minFontSize - Minimum font size (default: 6)
 * @returns Calculated font size
 */
export declare function calculateFontSize(btnWidth: number, text: string, maxFontSize?: number, minFontSize?: number): number;
/**
 * Apply consistent responsive layout to all button groups at a given position.
 * Ensures synchronized width and font size across groups.
 */
export declare function applyGlobalResponsiveLayout(position: ControlPosition, containerWidth: number): void;
/**
 * Calculate container positioning based on map dimensions and safe area insets
 * @param mapContainer - The map container element
 * @param position - Control position (top-left, top-right, etc.)
 * @param userStyle - Optional user-defined styles to check for margin settings
 * @returns Object containing calculated margins (null values indicate user has set that margin)
 */
export declare function calculateContainerPosition(mapContainer: HTMLElement, position: ControlPosition, userStyle?: Partial<CSSStyleDeclaration>): {
    marginTop: number | null;
    marginBottom: number | null;
    marginLeft: number | null;
    marginRight: number | null;
};
/**
 * Apply calculated container position to an element
 * @param element - The element to apply positioning to
 * @param mapContainer - The map container element
 * @param position - Control position (top-left, top-right, etc.)
 * @param userStyle - Optional user-defined styles to check for margin settings
 */
export declare function applyContainerPosition(element: HTMLElement, mapContainer: HTMLElement, position: ControlPosition, userStyle?: Partial<CSSStyleDeclaration>): void;
/**
 * Apply responsive layout to button group
 * @param buttons - Array of button elements
 * @param containerWidth - Container width for responsive breakpoint
 */
export declare function applyResponsiveLayout(buttons: HTMLButtonElement[], containerWidth: number): void;
