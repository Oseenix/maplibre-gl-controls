import type { IControl, Map as MlMap, ControlPosition } from 'maplibre-gl';
export type TgBtnCfg = {
    id: string;
    svg: string;
    label: string;
    layerIds: string[];
    repeat?: boolean;
    setup?: (ctl: ToggleCtl, map: MlMap | undefined) => void;
    cleanup?: (ctl: ToggleCtl, map: MlMap | undefined) => void;
    onToggle?: (ctl: ToggleCtl, map: MlMap) => void;
    onUntoggle?: (ctl: ToggleCtl, map: MlMap) => void;
};
export type ToggleCtlOptions = {
    buttons: TgBtnCfg[];
    defaultActive: string;
    position?: ControlPosition;
    width?: string;
    height?: string;
    innerClassName?: string;
    style?: Partial<CSSStyleDeclaration>;
    onToggle?: (ctl: ToggleCtl, map: MlMap, activeConfig: TgBtnCfg) => void;
    onUntoggle?: (ctl: ToggleCtl, map: MlMap, config: TgBtnCfg) => void;
};
type ToggleCtlEvent = 'toggle' | 'untoggle';
export default class ToggleCtl implements IControl {
    private map;
    private container;
    private options;
    private defaultActiveId;
    private activeButtonId;
    private buttons;
    private instanceId;
    private listeners;
    constructor(options: ToggleCtlOptions);
    /**
     * Generate a unique instance ID for this control
     * @returns Unique identifier string
     */
    private generateInstanceId;
    on(event: ToggleCtlEvent, callback: (ctl: ToggleCtl) => void): void;
    off(event: ToggleCtlEvent, callback: (ctl: ToggleCtl) => void): void;
    private emit;
    private createContainer;
    updateInnerContainerStyle(): void;
    private updateLayout;
    private createButton;
    private handleButtonClick;
    onAdd(map: MlMap): HTMLElement;
    onRemove(): void;
    getPosition(): ControlPosition;
    /**
     * Get the unique instance ID for this control
     * @returns Unique identifier string
     */
    getInstanceId(): string;
    setActiveButton(buttonId: string): void;
    getActiveButton(): TgBtnCfg;
    updateButton(buttonId: string, updates: Partial<TgBtnCfg>): void;
    updateButtonCallback(btnCfgs: Partial<TgBtnCfg>[]): void;
    updateStyle(newStyle: Partial<CSSStyleDeclaration>): void;
}
export {};
