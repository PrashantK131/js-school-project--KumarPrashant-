import { TimelineEvent } from './types.js';

/**
 * Modal management for displaying event details
 */
export class ModalManager {
  private readonly modal: HTMLElement;
  private readonly modalDetails: HTMLElement;

  constructor(modal: HTMLElement, modalDetails: HTMLElement) {
    this.modal = modal;
    this.modalDetails = modalDetails;
    this.initializeEventListeners();
  }

  /**
   * Show the modal with event details
   */
  show(event: TimelineEvent): void {
    this.modalDetails.innerHTML = this.createModalContent(event);
    this.modal.style.display = 'flex';
  }

  /**
   * Hide the modal
   */
  close(): void {
    this.modal.style.display = 'none';
  }

  /**
   * Initialize event listeners for modal interactions
   */
  private initializeEventListeners(): void {
    this.modal.addEventListener('click', (e: Event) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  /**
   * Create the HTML content for the modal
   */
  private createModalContent(event: TimelineEvent): string {
    const imageElement = this.createImageElement(event);
    const wikipediaLink = this.createWikipediaLink(event.wikipediaURL);
    
    return `
      <h2>${this.escapeHtml(event.title)}</h2>
      <p><strong>Category:</strong> ${this.escapeHtml(event.category)}</p>
      <p>${this.escapeHtml(event.description)}</p>
      ${imageElement}
      ${wikipediaLink}
    `;
  }

  /**
   * Create image element with error handling
   */
  private createImageElement(event: TimelineEvent): string {
    return `
      <img 
        src="${this.escapeHtml(event.imageURL)}" 
        alt="${this.escapeHtml(event.title)}" 
        style="width: 100%; border-radius: 8px; margin-top: 1rem;" 
        onerror="this.style.display='none'"
      />
    `;
  }

  /**
   * Create Wikipedia link element
   */
  private createWikipediaLink(url: string): string {
    return `
      <a 
        href="${this.escapeHtml(url)}" 
        class="learn-more" 
        target="_blank" 
        rel="noopener noreferrer" 
        style="display:block; margin-top:1rem; text-align: center;"
      >
        Visit Wikipedia
      </a>
    `;
  }

  /**
   * Escape HTML to prevent XSS
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}