import React, { useEffect, useRef } from 'react';
import { EventModalProps } from '../types/timeline';

/* Accessible Modal component for displaying detailed event information and using native <dialog> element with proper focus management */
const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && event) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      dialog.showModal();
      
      document.body.style.overflow = 'hidden';
      
      setupFocusTrap();
      
      const firstFocusable = focusableElementsRef.current[0];
      if (firstFocusable) {
        firstFocusable.focus();
      }
    } else if (!isOpen) {
      dialog.close();
      document.body.style.overflow = 'unset';
      
      // Restore focus to the element that opened the modal
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, event]);

  const setupFocusTrap = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Get all focusable elements within the modal
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    focusableElementsRef.current = Array.from(
      dialog.querySelectorAll(focusableSelectors.join(','))
    ) as HTMLElement[];
  };

  // Handle keyboard navigation within modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      trapFocus(e);
    }
  };

  // Focus trap implementation
  const trapFocus = (e: React.KeyboardEvent) => {
    const focusableElements = focusableElementsRef.current;
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab: focus previous element
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: focus next element
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Handle backdrop click (click outside modal content)
  const handleDialogClick = (e: React.MouseEvent) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Close if clicking on the dialog backdrop (not the content)
    const rect = dialog.getBoundingClientRect();
    const clickedOnBackdrop = (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    );

    if (clickedOnBackdrop) {
      onClose();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  if (!event) return null;

  return (
    <dialog
      ref={dialogRef}
      className="event-modal"
      onKeyDown={handleKeyDown}
      onClick={handleDialogClick}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {event.title}
          </h2>
          <button 
            className="modal-close" 
            onClick={onClose} 
            aria-label={`Close ${event.title} details`}
            type="button"
          >
            <span aria-hidden="true">✖</span>
          </button>
        </header>
        
        <div id="modal-description" className="modal-body">
          <div className="modal-meta">
            <p><strong>Year:</strong> {event.year}</p>
            <p><strong>Category:</strong> {event.category}</p>
          </div>
          
          <p className="modal-description-text">{event.description}</p>
          
          <div className="modal-image-container">
            <img 
              src={event.imageURL} 
              alt={`Illustration for ${event.title}`}
              className="modal-image"
              onError={handleImageError}
            />
          </div>
          
          <div className="modal-actions">
            <a 
              href={event.wikipediaURL} 
              className="learn-more-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-describedby="external-link-description"
            >
              Learn More on Wikipedia
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Screen reader only description for external links */}
      <div id="external-link-description" className="sr-only">
        External links will open in a new browser tab
      </div>
    </dialog>
  );
};

export default EventModal;