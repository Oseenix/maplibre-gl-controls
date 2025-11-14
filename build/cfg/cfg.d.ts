/**
 * MapLibre GL Layer Config Manager Plugin
 * Provides UI controls for layer visibility...
 */
import type { IControl, ControlPosition } from 'maplibre-gl';
import { ControlGroup, LayerConfig } from './cfg-type';
import './cfg.css';
export default class ConfigManager implements IControl {
    private map;
    private container;
    private panel;
    private buttons;
    private feature;
    private position;
    private collapsed;
    private userStyle;
    private featureConfigGroups;
    private layerConfigs;
    private onChange;
    constructor(options?: {
        feature?: string;
        featureConfigs?: Record<string, ControlGroup>;
        onChange?: (feature: string, key: string, preCfg: LayerConfig, curValue: LayerConfig) => void;
        position?: ControlPosition;
        collapsed?: boolean;
        style?: Partial<CSSStyleDeclaration>;
    });
    /** Called when control is added to the map */
    onAdd(map: maplibregl.Map): HTMLElement;
    /** Called when control is removed from the map */
    onRemove(): void;
    /**
     * Update container positioning based on map dimensions and safe area insets
     */
    private _updateContainerPosition;
    /** Get control position */
    getPosition(): ControlPosition;
    private _createLayersIcon;
    private _createHeader;
    private _togglePanel;
    private _createLayersSection;
    /** Create toggle (checkbox) item */
    private _createToggleItem;
    /** Create select (dropdown or single choice) item */
    private _createSelectUI;
    /** Create a single layer config item */
    private _createLayerItem;
    private _updateButtonLayout;
    /**
     * Refresh the UI to reflect current feature and layer configurations
     */
    private _refreshUI;
    /**
     * Update the current feature and refresh the UI
     * @param feature - The new feature name
     * @param featureConfigs - Optional new feature configurations
     */
    updateFeature(feature: string, featureConfigs?: Record<string, ControlGroup>): void;
}
