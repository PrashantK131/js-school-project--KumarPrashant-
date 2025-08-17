/**
 * Browser-specific type definitions and polyfills
 */

// Extend Window interface for our global functions
declare global {
  interface Window {
    toggleTheme?: () => void;
    showModal?: (event: any) => void;
    closeModal?: () => void;
    activateDot?: (dot: HTMLElement, event: any) => void;
    timelineApp?: any;
  }
}

// Browser-compatible timeout type
export type BrowserTimeout = number;

// Environment detection utilities
export const Environment = {
  isDevelopment(): boolean {
    return typeof window !== 'undefined' && 
           (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' ||
            window.location.port !== '');
  },

  isProduction(): boolean {
    return !this.isDevelopment();
  },

  supportsModules(): boolean {
    const script = document.createElement('script');
    return 'noModule' in script;
  }
};

export {}; // Ensure this file is treated as a module