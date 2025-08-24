import React from 'react';
import { TimelineEvent } from '../types/timeline';

interface EventCardProps {
  event: TimelineEvent;
  isActive: boolean;
  onShowModal: () => void;
}

/* Accessible Event card component that displays event details with proper semantic structure and keyboard navigation */
const EventCard: React.FC<EventCardProps> = ({ event, isActive, onShowModal }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    
    // Announcing image error to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Image for ${event.title} could not be loaded`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onShowModal();
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <article
      className={`event-card ${isActive ? 'show' : ''}`}
      id={`event-${event.year}`}
      role="tabpanel"
      aria-labelledby={`event-title-${event.year}`}
      tabIndex={0}
    >
      <header className="event-header">
        <div className="event-year" aria-label={`Year ${event.year}`}>
          {event.year}
        </div>
        <h2 
          id={`event-title-${event.year}`}
          className="event-title"
        >
          {event.title}
        </h2>
      </header>
      
      <div className="event-content">
        <figure className="event-image" role="img" aria-labelledby={`img-caption-${event.year}`}>
          <img 
            src={event.imageURL} 
            alt={`Historical illustration for ${event.title}`}
            onError={handleImageError}
          />
          <figcaption id={`img-caption-${event.year}`} className="sr-only">
            Image related to {event.title} from {event.year}
          </figcaption>
        </figure>
        
        <div className="event-description">
          <p id={`description-${event.year}`}>
            {event.description}
          </p>
          
          <div className="event-actions">
            <a 
              href={event.wikipediaURL} 
              className="learn-more" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-describedby={`description-${event.year}`}
            >
              Learn More
              <span className="sr-only"> about {event.title} (opens in new tab)</span>
            </a>
            
            <button
              type="button"
              className="details-button"
              onClick={onShowModal}
              onKeyDown={handleKeyDown}
              aria-label={`View detailed information about ${event.title}`}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      
      <footer className="event-footer">
        <p className="event-category">
          <span className="sr-only">Category: </span>
          <span aria-label={`Category ${event.category}`}>{event.category}</span>
        </p>
      </footer>
    </article>
  );
};

export default EventCard;