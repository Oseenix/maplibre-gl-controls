/** Shared visual theme for MapLibre controls */
export const THEME = {
  // Color palette
  color: {
    text: 'rgba(255, 255, 255, 1.0)', // General border
    border: 'rgba(0, 36, 71, 0.4)', // General border
    borderLight: '#dee2e6',         // Light border for fields
    background: 'rgba(0, 36, 71, 0.6)', // Buttons and panel background unified
    hover: 'rgba(0, 36, 71, 0.8)',      // Hover state
	  activeBackground: 'rgba(0, 36, 71, 0.98)'
  },

  // Border radius
  radius: {
    sm: '3px',
    md: '4px',
    lg: '6px'
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px rgba(0, 36, 71, 0.05)',
    md: '0 2px 4px rgba(0, 36, 71, 0.1)'
  },

  // Font
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
    size: '10px'
  },

  // Transition
  transition: 'all 0.2s ease'
} as const;


// global set of registered containers for theme updates
const registeredContainers: Set<HTMLElement> = new Set();

/**
 * Apply theme CSS variables to a container
 */
export function applyThemeVars(container: HTMLElement) {
  container.style.setProperty('--rp-mctl-text', THEME.color.text);
  container.style.setProperty('--rp-mctl-background', THEME.color.background);
  container.style.setProperty('--rp-mctl-hover', THEME.color.hover);
  container.style.setProperty('--rp-mctl-border', THEME.color.border);
  container.style.setProperty('--rp-mctl-borderLight', THEME.color.borderLight);

  container.style.setProperty('--rp-mctl-radius-sm', THEME.radius.sm);
  container.style.setProperty('--rp-mctl-radius-md', THEME.radius.md);
  container.style.setProperty('--rp-mctl-radius-lg', THEME.radius.lg);

  container.style.setProperty('--rp-mctl-shadow-sm', THEME.shadow.sm);
  container.style.setProperty('--rp-mctl-shadow-md', THEME.shadow.md);

  container.style.setProperty('--rp-mctl-font-family', THEME.font.family);
  container.style.setProperty('--rp-mctl-font-size', THEME.font.size);
}

/**
 * Register a container to automatically receive theme updates
 */
export function registerContainer(container: HTMLElement) {
  registeredContainers.add(container);
  applyThemeVars(container);
}

export function unregisterContainer(container: HTMLElement) {
  registeredContainers.delete(container);
}

/**
 * Update the theme and reapply to all registered containers
 * @param newTheme - Partial theme updates
 */
export function updateTheme(newTheme: Partial<typeof THEME>) {
  Object.keys(newTheme).forEach((sectionKey) => {
    const section = sectionKey as keyof typeof THEME;
    Object.assign(THEME[section], newTheme[section as keyof typeof newTheme]);
  });

  registeredContainers.forEach((container) => applyThemeVars(container));
}
