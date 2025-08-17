/**
 * Modal management for displaying event details
 */
export class ModalManager {
    constructor(modal, modalDetails) {
        this.modal = modal;
        this.modalDetails = modalDetails;
        this.initializeEventListeners();
    }
    /**
     * Show the modal with event details
     */
    show(event) {
        this.modalDetails.innerHTML = this.createModalContent(event);
        this.modal.style.display = 'flex';
    }
    /**
     * Hide the modal
     */
    close() {
        this.modal.style.display = 'none';
    }
    /**
     * Initialize event listeners for modal interactions
     */
    initializeEventListeners() {
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }
    /**
     * Create the HTML content for the modal
     */
    createModalContent(event) {
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
    createImageElement(event) {
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
    createWikipediaLink(url) {
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
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
//# sourceMappingURL=modal.js.map