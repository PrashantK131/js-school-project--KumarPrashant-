import { Theme } from './types.js';
/**
 * Theme management utilities
 */
export declare class ThemeManager {
    private static readonly THEME_ATTRIBUTE;
    private static readonly DARK_THEME_VALUE;
    private readonly body;
    constructor(body: HTMLElement);
    /**
     * Get the current theme
     */
    getCurrentTheme(): Theme;
    /**
     * Toggle between light and dark themes
     */
    toggleTheme(): Theme;
    /**
     * Set a specific theme
     */
    setTheme(theme: Theme): void;
}
//# sourceMappingURL=theme.d.ts.map