import React, { useEffect } from 'react';
import { EventModalProps } from '../types/timeline';

/**
 * Modal component for displaying detailed event information
 */
const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div id="modal" style={{ display: 'flex' }} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          ✖
        </button>
        <div id="modal-details">
          <h2>{event.title}</h2>
          <p><strong>Category:</strong> {event.category}</p>
          <p>{event.description}</p>
          <img 
            src={event.imageURL} 
            alt={event.title} 
            style={{ width: '100%', borderRadius: '8px', marginTop: '1rem' }}
            onError={handleImageError}
          />
          <a 
            href={event.wikipediaURL} 
            className="learn-more" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}
          >
            Visit Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventModal;