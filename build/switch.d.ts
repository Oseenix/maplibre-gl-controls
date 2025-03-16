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
    onToggle?: (ctl: ToggleCtl, map: MlMap, activeConfig: TgBtnCfg) => void;
    onUntoggle?: (ctl: ToggleCtl, map: MlMap, config: TgBtnCfg) => void;
};
export default class ToggleCtl implements IControl {
    private map;
    private container;
    private outContainer;
    private options;
    private defaultActiveId;
    private activeButtonId;
    private buttons;
    constructor(options: ToggleCtlOptions);
    private createContainer;
    updateInnerContainerStyle(): void;
    private updateLayout;
    private createButton;
    private handleButtonClick;
    onAdd(map: MlMap): HTMLElement;
    onRemove(): void;
    getDefaultPosition(): ControlPosition;
    setActiveButton(buttonId: string): void;
    getActiveButton(): TgBtnCfg;
    updateButton(buttonId: string, updates: Partial<TgBtnCfg>): void;
    updateButtonCallback(btnCfgs: Partial<TgBtnCfg>[]): void;
}
