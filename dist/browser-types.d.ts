/**
 * Browser-specific type definitions and polyfills
 */
declare global {
    interface Window {
        toggleTheme?: () => void;
        showModal?: (event: any) => void;
        closeModal?: () => void;
        activateDot?: (dot: HTMLElement, event: any) => void;
        timelineApp?: any;
    }
}
export type BrowserTimeout = number;
export declare const Environment: {
    isDevelopment(): boolean;
    isProduction(): boolean;
    supportsModules(): boolean;
};
export {};
//# sourceMappingURL=browser-types.d.ts.map