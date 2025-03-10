import type { IControl, Map as MlMap, ControlPosition } from 'maplibre-gl';
export type TgBtnCfg = {
    id: string;
    svg: string;
    label: string;
    layerIds: string[];
};
export type ToggleCtlOptions = {
    buttons: TgBtnCfg[];
    position?: ControlPosition;
    onToggle?: (map: MlMap, activeButtonId: string, layerIds: string[]) => void;
};
export default class ToggleCtl implements IControl {
    private map;
    private container;
    private options;
    private activeButtonId;
    private buttons;
    constructor(options: ToggleCtlOptions);
    private createContainer;
    private updateLayout;
    private createButton;
    private handleButtonClick;
    onAdd(map: MlMap): HTMLElement;
    onRemove(): void;
    getDefaultPosition(): ControlPosition;
    setActiveButton(buttonId: string): void;
}
