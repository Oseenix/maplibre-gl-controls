/**
 * Shared UI utilities for MapLibre GL controls
 */
import { ControlPosition } from 'maplibre-gl';
import { THEME } from './theme';

// Container styling constants
export const CONTAINER_STYLE = {
  backgroundColor: 'transparent',
  padding: '5px',
  border: 'transparent',
  boxShadow: 'none',
  borderRadius: THEME.radius.md,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontFamily: THEME.font.family,
  fontSize: THEME.font.size,
  color: THEME.color.text,
} as const;

/**
 * Apply common container styles to a control element
 * @param container - The container element to style
 * @param options - Styling options
 */
export function applyContainerStyles(
  container: HTMLElement, 
  options: {
    classNames?: string[];
  } = {}
): void {
  // Apply base styles
  Object.assign(container.style, CONTAINER_STYLE);
  
  // Add maplibre control classes based on options
  container.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');

  if (options.classNames) {
    options.classNames.forEach(className => container.classList.add(className));
  }
}

// Button styling constants
export const BUTTON_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 6px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: THEME.radius.md,
  width: 'fit-content',
  color: THEME.color.text,
  backgroundColor: THEME.color.background,
  fontSize: THEME.font.size,
} as const;

// Responsive layout constants
export const RESPONSIVE_CONSTANTS = {
  iconWidth: 20,
  btnPaddingX: 6,
  btnPaddingY: 4,
  btnGap: 4,
  smallScreenThreshold: 768,
  minFontSize: 6,
  maxFontSize: 13,
  scalingFactor: 0.5
} as const;


/** Global map to track all button groups by position */
const globalButtonGroups = new Map<ControlPosition, Map<string, HTMLButtonElement>>();

export function registerButtonGroup(position: ControlPosition, buttons: Map<string, HTMLButtonElement>): void {
  if (!globalButtonGroups.has(position)) {
    globalButtonGroups.set(position, new Map());
  }
  const groupSet = globalButtonGroups.get(position);
  buttons.forEach((btn, id) => {
    groupSet?.set(id, btn);
  });
}

export function unregisterButtonGroup(position: ControlPosition, buttons: Map<string, HTMLButtonElement>): void {
  const groupSet = globalButtonGroups.get(position);
  if (!groupSet) return;

  Object.entries(buttons).forEach(([id]) => {
    groupSet.delete(id);
  });

  if (groupSet.size === 0) {
    globalButtonGroups.delete(position);
  }
}

/**
 * Create a styled button with icon and label
 * @param options - Button configuration
 * @returns HTMLButtonElement
 */
export function createStyledButton(options: {
  icon?: string | HTMLElement;
  label: string;
  title?: string;
  onClick?: (event: MouseEvent) => void;
  className?: string;
  backgroundColor?: string;
}): HTMLButtonElement {
  const button = document.createElement('button');
  
  // Apply base styles
  Object.assign(button.style, BUTTON_STYLE);
  
  // Apply custom background color if provided
  if (options.backgroundColor) {
    button.style.backgroundColor = options.backgroundColor;
  }
  
  // Add custom class if provided
  if (options.className) {
    button.className = options.className;
  }
  
  // Set title for accessibility
  if (options.title) {
    button.title = options.title;
  }
  
  // Add click handler
  if (options.onClick) {
    button.onclick = options.onClick;
  }
  
  // Add icon if provided
  if (options.icon) {
    if (typeof options.icon === 'string') {
      const iconContainer = document.createElement('div');
      iconContainer.innerHTML = options.icon;
      button.appendChild(iconContainer);
    } else {
      button.appendChild(options.icon);
    }
  }
  
  // Add label
  const label = document.createElement('span');
  label.textContent = options.label;
  label.style.fontSize = THEME.font.size;
  label.style.color = 'inherit';
  button.appendChild(label);
  
  return button;
}

/**
 * Create an SVG image element with alt text for SEO
 * @param svg - SVG string
 * @param alt - Alt text for accessibility
 * @param width - Icon width (default: 20)
 * @returns HTMLImageElement
 */
export function createSvgImage(svg: string, alt: string, width: number = 20): HTMLImageElement {
  const img = document.createElement('img');
  img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  img.alt = alt;
  img.style.width = `${width}px`;
  img.style.height = `${width}px`;
  img.style.color = 'white';
  return img;
}

/**
 * Format a string by replacing underscores with spaces and capitalizing each word
 * @param str - The string to format (e.g., "hello_world")
 * @returns The formatted string (e.g., "Hello World")
 */
export function formatLabel(str: string): string {
  return str
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

/**
 * Calculate optimal font size based on button width and text length
 * @param btnWidth - Total button width in pixels
 * @param text - Button label text
 * @param maxFontSize - Maximum font size (default: 12)
 * @param minFontSize - Minimum font size (default: 6)
 * @returns Calculated font size
 */
export function calculateFontSize(
  btnWidth: number, 
  text: string, 
  maxFontSize: number = RESPONSIVE_CONSTANTS.maxFontSize, 
  minFontSize: number = RESPONSIVE_CONSTANTS.minFontSize
): number {
  const { iconWidth, btnPaddingX, btnGap, scalingFactor } = RESPONSIVE_CONSTANTS;
  
  // Calculate available width for text
  const widthPx = btnWidth - iconWidth - btnPaddingX * 2 - btnGap;
  
  // Count characters (strip HTML tags to count plain text)
  const charCount = text.replace(/<[^>]+>/g, '').length;
  if (charCount === 0) return minFontSize; // Avoid division by zero

  // Calculate font size based on available width and character count
  let fontSize = Math.floor(widthPx / (charCount * scalingFactor));

  // Clamp font size between min and max
  fontSize = Math.min(maxFontSize, Math.max(minFontSize, fontSize));

  return fontSize;
}

/**
 * Apply consistent responsive layout to all button groups at a given position.
 * Ensures synchronized width and font size across groups.
 */
export function applyGlobalResponsiveLayout(position: ControlPosition, containerWidth: number): void {
  const groups = globalButtonGroups.get(position);
  if (!groups || groups.size === 0) return;

  const allButtons = Array.from(groups.values());
  const { smallScreenThreshold } = RESPONSIVE_CONSTANTS;
  const isSmallScreen = containerWidth < smallScreenThreshold;

  // Reset label visibility for width measurement
  allButtons.forEach((btn) => {
    const label = btn.querySelector('span');
    if (label) label.style.display = isSmallScreen ? 'none' : 'inline';
    btn.style.width = 'fit-content';
  });

  // Determine max button width among all groups
  const maxWidth = Math.max(...allButtons.map(btn => btn.offsetWidth));
  const targetWidth = isSmallScreen ? '34px' : `${maxWidth}px`;

  // Apply consistent width to all buttons
  allButtons.forEach(btn => {
    btn.style.width = targetWidth;
  });

  // Adjust font size only for large screens
  if (!isSmallScreen) {
    const labels = allButtons.map(btn => {
      const label = btn.querySelector('span');
      if (!label || !label.textContent) return null;
      return [label, calculateFontSize(maxWidth, label.textContent)] as const;
    }).filter((item): item is readonly [HTMLElement, number] => !!item);

    const smallestFontSize = Math.max(
      RESPONSIVE_CONSTANTS.minFontSize,
      Math.min(...labels.map(([, fontSize]) => fontSize))
    );

    labels.forEach(([label]) => {
      label.style.fontSize = `${smallestFontSize}px`;
    });
  }
}

/**
 * Calculate container positioning based on map dimensions and safe area insets
 * @param mapContainer - The map container element
 * @param position - Control position (top-left, top-right, etc.)
 * @returns Object containing calculated margins
 */
export function calculateContainerPosition(
  mapContainer: HTMLElement,
  position: ControlPosition
): { marginTop: number; marginBottom: number; marginLeft: number; marginRight: number } {
  const parentWidth = mapContainer.offsetWidth;
  const parentHeight = mapContainer.offsetHeight;

  // Default styles
  let marginTop = 10;
  let marginBottom = 10;
  let defMarginLeft = Math.max(
    0,
    parseFloat(
      getComputedStyle(mapContainer)
        .getPropertyValue('env(safe-area-inset-left)') || '0'
    )
  );
  let defMarginRight = Math.max(
    0,
    parseFloat(
      getComputedStyle(mapContainer)
        .getPropertyValue('env(safe-area-inset-right)') || '0'
    )
  );
  let marginLeft = defMarginLeft;
  let marginRight = defMarginRight;

  // Update styles based on parent dimensions
  if (parentWidth >= 480) {
    marginTop = 15;
    marginBottom = 15;
    marginLeft = Math.max(15, defMarginLeft);
    marginRight = Math.max(15, defMarginRight);
  }

  if (parentHeight >= 992) {
    marginTop = 40;
    marginBottom = 40;
  }

  if (parentWidth >= 992) {
    marginLeft = Math.max(40, defMarginLeft);
    marginRight = Math.max(40, defMarginRight);
  }

  if (position?.endsWith("left")) {
    marginLeft = marginLeft;
    marginRight = defMarginRight;
  } else {
    marginLeft = defMarginLeft;
    marginRight = marginRight;
  }

  return { marginTop, marginBottom, marginLeft, marginRight };
}

/**
 * Apply responsive layout to button group
 * @param buttons - Array of button elements
 * @param containerWidth - Container width for responsive breakpoint
 */
export function applyResponsiveLayout(
  buttons: HTMLButtonElement[], 
  containerWidth: number
): void {
  const { smallScreenThreshold } = RESPONSIVE_CONSTANTS;
  const isSmallScreen = containerWidth < smallScreenThreshold;

  // Hide/show labels and set button widths
  buttons.forEach((btn) => {
    const label = btn.querySelector('span');
    if (label) {
      label.style.display = isSmallScreen ? 'none' : 'inline';
    }
    btn.style.width = 'fit-content';
  });

  // Recalculate max width when labels are toggled
  const maxWidth = Math.max(...buttons.map(btn => btn.offsetWidth));
  const targetWidth = isSmallScreen ? '34px' : `${maxWidth}px`;

  // Apply consistent width to all buttons
  buttons.forEach(btn => {
    btn.style.width = targetWidth;
  });

  // Calculate and apply font sizes for labels (only on large screens)
  if (!isSmallScreen) {
    const labels = buttons.map(btn => {
      const label = btn.querySelector('span');
      if (!label || !label.textContent) return null;
      return [label, calculateFontSize(maxWidth, label.textContent)] as const;
    }).filter((item): item is readonly [HTMLElement, number] => !!item);

    // Apply minimum font size across all labels
    const smallestFontSize = Math.max(
      RESPONSIVE_CONSTANTS.minFontSize, 
      Math.min(...labels.map(([, fontSize]) => fontSize))
    );
    
    labels.forEach(([label]) => {
      label.style.fontSize = `${smallestFontSize}px`;
    });
  }
}
