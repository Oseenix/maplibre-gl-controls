import type { IControl, Map, ControlPosition } from 'maplibre-gl';
import type { Expression } from "@maplibre/maplibre-gl-style-spec";
export type Options = {
    title: string;
    unit: string;
    position?: ControlPosition;
    width?: string;
    height?: string;
    max?: number;
    decimal?: number;
    tickMinStep?: number;
    layerIds?: string[];
    style?: Partial<CSSStyleDeclaration>;
    onClick?: (event: MouseEvent, bar: ColorBar, options: Options) => void;
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
    private map;
    private options;
    private colorSteps;
    private container;
    private outContainer;
    private titleDiv;
    private unitDiv;
    private legendItems;
    private colorPickerInput;
    private nativeColorPickerInput;
    private colorPickerPopover;
    private nativeColorPickerOpen;
    private colorPickerOutsidePointerDownHandler;
    private colorPickerEscapeKeyHandler;
    private resetConfirmPopover;
    private resetConfirmOutsidePointerDownHandler;
    private resetConfirmEscapeKeyHandler;
    private pendingResetAction;
    private resetButton;
    private paletteSelect;
    private paletteTrigger;
    private paletteMenu;
    private paletteOutsidePointerDownHandler;
    private paletteEscapeKeyHandler;
    private customColors;
    private readonly confirmResetMessage;
    propertySpec: Record<string, any>;
    constructor(propertySpec: any, options: ColorBarOptions);
    private getTickMinStep;
    private getDisplaySteps;
    private getWidth;
    private getHeight;
    private createContainer;
    private createTitleDiv;
    private createUnitDiv;
    private createPaletteSelect;
    private createColorBox;
    private setPaletteSelection;
    private closePaletteMenu;
    private openPaletteMenu;
    private togglePaletteMenu;
    private createLabel;
    private initializeLegendItems;
    private resetLegendItems;
    private handleContainerClick;
    update(): void;
    onAdd(map: Map): HTMLElement;
    onRemove(): void;
    refresh(): void;
    getPosition(): ControlPosition;
    /**
     * Updates the options and refreshes the control
     * @param newOptions Partial options to update
     */
    updateOptions(newOptions: Partial<Options>): void;
    updatePalette(propertySpec: any, newOptions?: Partial<ColorBarOptions>): void;
    getOptions(): Options;
    getMap(): Map | undefined;
    updateInnerContainerStyle(outContainer: HTMLElement, container: HTMLElement): void;
    /**
     * Parses the "fill-color" property and extracts speed-to-color mappings.
     * @returns An array of speed thresholds and their corresponding colors.
     */
    getColorSteps(): ColorStep[];
    private createColorPickerInput;
    private createNativeColorPickerInput;
    private createColorPickerPopover;
    private createPickerActionButton;
    private createResetConfirmPopover;
    private getResetConfirmPopover;
    private closeResetConfirm;
    private showResetConfirm;
    private getColorPickerPopover;
    private getActivePickerSpeed;
    getDefaultColorForSpeed(speed: number): string | undefined;
    private toggleNativeColorPicker;
    private showColorPicker;
    private closeColorPicker;
    private handleColorInputChange;
    updateSingleColorUI(speed: number, color: string): void;
    resetSingleColor(speed: number): void;
    private createResetButton;
    updateResetButtonVisibility(): void;
    setCustomColors(colors: Record<string, string>): void;
    resetColors(defaultStops: [number, string][]): void;
    /**
     * Sets a property using a Mapbox style expression.
     * @param prop The property name.
     * @param value The Mapbox style expression.
     */
    setProperty(prop: string, value: Expression): void;
}
export {};
