import { TimelineElements } from './types.js';
/**
 * Utility functions for DOM manipulation and validation
 */
/**
 * Get a required DOM element by ID
 * @throws Error if element is not found
 */
export declare function getRequiredElement(id: string): HTMLElement;
/**
 * Get a required element by selector
 * @throws Error if element is not found
 */
export declare function getRequiredElementBySelector(selector: string): HTMLElement;
/**
 * Initialize and validate all required DOM elements
 * @throws Error if any required elements are missing
 */
export declare function initializeElements(): TimelineElements;
/**
 * Add event listener with type safety
 */
export declare function addEventListenerSafe<K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
/**
 * Debounce function to limit rapid function calls
 */
export declare function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Check if the current environment supports the required features
 */
export declare function checkBrowserSupport(): boolean;
/**
 * Log error with context information
 */
export declare function logError(context: string, error: unknown): void;
/**
 * Safely parse a number from string
 */
export declare function safeParseInt(value: string | null): number | null;
//# sourceMappingURL=utils.d.ts.map