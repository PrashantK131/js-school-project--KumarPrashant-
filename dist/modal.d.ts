import { TimelineEvent } from './types.js';
/**
 * Modal management for displaying event details
 */
export declare class ModalManager {
    private readonly modal;
    private readonly modalDetails;
    constructor(modal: HTMLElement, modalDetails: HTMLElement);
    /**
     * Show the modal with event details
     */
    show(event: TimelineEvent): void;
    /**
     * Hide the modal
     */
    close(): void;
    /**
     * Initialize event listeners for modal interactions
     */
    private initializeEventListeners;
    /**
     * Create the HTML content for the modal
     */
    private createModalContent;
    /**
     * Create image element with error handling
     */
    private createImageElement;
    /**
     * Create Wikipedia link element
     */
    private createWikipediaLink;
    /**
     * Escape HTML to prevent XSS
     */
    private escapeHtml;
}
//# sourceMappingURL=modal.d.ts.map