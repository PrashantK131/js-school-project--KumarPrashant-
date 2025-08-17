import { TimelineElements } from './types.js';
import { BrowserTimeout } from './browser-types.js';

/**
 * Utility functions for DOM manipulation and validation
 */

/**
 * Get a required DOM element by ID
 * @throws Error if element is not found
 */
export function getRequiredElement(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Required element with ID '${id}' not found`);
  }
  return element;
}

/**
 * Get a required element by selector
 * @throws Error if element is not found
 */
export function getRequiredElementBySelector(selector: string): HTMLElement {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Required element with selector '${selector}' not found`);
  }
  return element;
}

/**
 * Initialize and validate all required DOM elements
 * @throws Error if any required elements are missing
 */
export function initializeElements(): TimelineElements {
  try {
    const elements: TimelineElements = {
      modal: getRequiredElement('modal'),
      modalDetails: getRequiredElement('modal-details'),
      timelineLine: getRequiredElementBySelector('.timeline-line'),
      timelineSection: getRequiredElement('timeline'),
      body: document.body
    };

    // Validate that body exists
    if (!elements.body) {
      throw new Error('Document body not found');
    }

    return elements;
  } catch (error) {
    throw new Error(`Failed to initialize DOM elements: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Add event listener with type safety
 */
export function addEventListenerSafe<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void {
  element.addEventListener(type, listener, options);
}

/**
 * Debounce function to limit rapid function calls
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: BrowserTimeout | null = null;
  
  return (...args: Parameters<T>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(null, args), wait) as BrowserTimeout;
  };
}

/**
 * Check if the current environment supports the required features
 */
export function checkBrowserSupport(): boolean {
  const requiredFeatures = [
    'addEventListener' in window,
    'querySelector' in document,
    'classList' in document.createElement('div'),
    'setAttribute' in document.createElement('div')
  ];

  return requiredFeatures.every(feature => feature);
}

/**
 * Log error with context information
 */
export function logError(context: string, error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.error(`[Timeline App - ${context}]:`, errorMessage, error);
}

/**
 * Safely parse a number from string
 */
export function safeParseInt(value: string | null): number | null {
  if (value === null || value === '') {
    return null;
  }
  
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}