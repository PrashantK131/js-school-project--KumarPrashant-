/**
 * Browser-specific type definitions and polyfills
 */
// Environment detection utilities
export const Environment = {
    isDevelopment() {
        return typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.port !== '');
    },
    isProduction() {
        return !this.isDevelopment();
    },
    supportsModules() {
        const script = document.createElement('script');
        return 'noModule' in script;
    }
};
//# sourceMappingURL=browser-types.js.map