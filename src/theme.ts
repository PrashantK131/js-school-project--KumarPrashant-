import { Theme } from './types.js';

/**
 * Theme management utilities
 */
export class ThemeManager {
  private static readonly THEME_ATTRIBUTE = 'data-theme';
  private static readonly DARK_THEME_VALUE = 'dark';

  private readonly body: HTMLElement;

  constructor(body: HTMLElement) {
    this.body = body;
  }

  /**
   * Get the current theme
   */
  getCurrentTheme(): Theme {
    return this.body.getAttribute(ThemeManager.THEME_ATTRIBUTE) === ThemeManager.DARK_THEME_VALUE 
      ? 'dark' 
      : 'light';
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): Theme {
    const currentTheme = this.getCurrentTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      this.body.setAttribute(ThemeManager.THEME_ATTRIBUTE, ThemeManager.DARK_THEME_VALUE);
    } else {
      this.body.removeAttribute(ThemeManager.THEME_ATTRIBUTE);
    }
    
    return newTheme;
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    if (theme === 'dark') {
      this.body.setAttribute(ThemeManager.THEME_ATTRIBUTE, ThemeManager.DARK_THEME_VALUE);
    } else {
      this.body.removeAttribute(ThemeManager.THEME_ATTRIBUTE);
    }
  }
}