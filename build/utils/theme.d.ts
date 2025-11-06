/** Shared visual theme for MapLibre controls */
export declare const THEME: {
    readonly color: {
        readonly text: "rgba(255, 255, 255, 1.0)";
        readonly border: "rgba(0, 36, 71, 0.4)";
        readonly borderLight: "#dee2e6";
        readonly background: "rgba(0, 36, 71, 0.6)";
        readonly hover: "rgba(0, 36, 71, 0.8)";
        readonly activeBackground: "rgba(0, 36, 71, 0.98)";
    };
    readonly radius: {
        readonly sm: "3px";
        readonly md: "4px";
        readonly lg: "6px";
    };
    readonly shadow: {
        readonly sm: "0 1px 2px rgba(0, 36, 71, 0.05)";
        readonly md: "0 2px 4px rgba(0, 36, 71, 0.1)";
    };
    readonly font: {
        readonly family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif";
        readonly size: "10px";
    };
    readonly transition: "all 0.2s ease";
};
/**
 * Apply theme CSS variables to a container
 */
export declare function applyThemeVars(container: HTMLElement): void;
/**
 * Register a container to automatically receive theme updates
 */
export declare function registerContainer(container: HTMLElement): void;
export declare function unregisterContainer(container: HTMLElement): void;
/**
 * Update the theme and reapply to all registered containers
 * @param newTheme - Partial theme updates
 */
export declare function updateTheme(newTheme: Partial<typeof THEME>): void;
