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
    onClick?: (event: MouseEvent, bar: ColorBar, options: Options) => void;
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
    propertySpec: Record<string, any>;
    constructor(propertySpec: any, options: Options);
    private getTickMinStep;
    private getWidth;
    private getHeight;
    private getHeightInPixels;
    private createContainer;
    private createTitleDiv;
    private createUnitDiv;
    private createColorBox;
    private createLabel;
    private initializeLegendItems;
    private calculateHeights;
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
    getOptions(): Options;
    getMap(): Map | undefined;
    updateInnerContainerStyle(outContainer: HTMLElement, container: HTMLElement): void;
    /**
     * Parses the "fill-color" property and extracts speed-to-color mappings.
     * @returns An array of speed thresholds and their corresponding colors.
     */
    getColorSteps(): ColorStep[];
    /**
     * Sets a property using a Mapbox style expression.
     * @param prop The property name.
     * @param value The Mapbox style expression.
     */
    setProperty(prop: string, value: Expression): void;
}
export {};
