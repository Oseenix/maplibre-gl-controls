
export interface BaseConfig<T = any> {
  value: T;
  label?: string;
  enabled?: boolean;
}

export interface RangeConfig extends BaseConfig<number | Date> {
  type: 'range';
  min: number | Date;
  max: number | Date;
  step?: number;
}

export interface ToggleConfig extends BaseConfig<boolean> {
  type: 'toggle';
  label?: string;
}

export interface SelectConfig<T = string> extends BaseConfig<T> {
  type: 'select';
  mode?: 'dropdown' | 'buttons';
  options: T[];
  labels?: string[];
}

export type LayerConfig =
  | RangeConfig
  | ToggleConfig
  | SelectConfig;

export type ControlGroup = Record<string, LayerConfig>;
