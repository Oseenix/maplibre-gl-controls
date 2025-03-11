import type { IControl, Map as MlMap, ControlPosition } from 'maplibre-gl';
export type TgBtnCfg = {
    id: string;
    svg: string;
    label: string;
    layerIds: string[];
    repeat?: boolean;
    setup?: (ctl: ToggleCtl, map: MlMap | undefined) => void;
    cleanup?: (ctl: ToggleCtl) => void;
    onToggle?: (ctl: ToggleCtl, map: MlMap, layerIds: string[]) => void;
    onUntoggle?: (ctl: ToggleCtl, map: MlMap, layerIds: string[]) => void;
};
export type ToggleCtlOptions = {
    buttons: TgBtnCfg[];
    position?: ControlPosition;
    onToggle?: (ctl: ToggleCtl, map: MlMap, activeButtonId: string, layerIds: string[]) => void;
    onUntoggle?: (ctl: ToggleCtl, map: MlMap, buttonId: string, layerIds: string[]) => void;
};
export default class ToggleCtl implements IControl {
    private map;
    private container;
    private outContainer;
    private options;
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
    updateButton(buttonId: string, updates: Partial<TgBtnCfg>): void;
}
