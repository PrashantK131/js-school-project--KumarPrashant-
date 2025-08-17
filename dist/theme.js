/**
 * Theme management utilities
 */
export class ThemeManager {
    constructor(body) {
        this.body = body;
    }
    /**
     * Get the current theme
     */
    getCurrentTheme() {
        return this.body.getAttribute(ThemeManager.THEME_ATTRIBUTE) === ThemeManager.DARK_THEME_VALUE
            ? 'dark'
            : 'light';
    }
    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        if (newTheme === 'dark') {
            this.body.setAttribute(ThemeManager.THEME_ATTRIBUTE, ThemeManager.DARK_THEME_VALUE);
        }
        else {
            this.body.removeAttribute(ThemeManager.THEME_ATTRIBUTE);
        }
        return newTheme;
    }
    /**
     * Set a specific theme
     */
    setTheme(theme) {
        if (theme === 'dark') {
            this.body.setAttribute(ThemeManager.THEME_ATTRIBUTE, ThemeManager.DARK_THEME_VALUE);
        }
        else {
            this.body.removeAttribute(ThemeManager.THEME_ATTRIBUTE);
        }
    }
}
ThemeManager.THEME_ATTRIBUTE = 'data-theme';
ThemeManager.DARK_THEME_VALUE = 'dark';
//# sourceMappingURL=theme.js.map