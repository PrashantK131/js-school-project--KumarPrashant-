import React from 'react';
import { TimelineEvent } from '../types/timeline';

interface EventCardProps {
  event: TimelineEvent;
  isActive: boolean;
  onShowModal: () => void;
}

/**
 * Event card component that displays event details
 */
const EventCard: React.FC<EventCardProps> = ({ event, isActive }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <article
      className={`event-card ${isActive ? 'show' : ''}`}
      id={`event-${event.year}`}
    >
      <header className="event-header">
        <div className="event-year">{event.year}</div>
        <h2 className="event-title">{event.title}</h2>
      </header>
      <div className="event-content">
        <figure className="event-image">
          <img 
            src={event.imageURL} 
            alt={event.title}
            onError={handleImageError}
          />
        </figure>
        <div className="event-description">
          <p>{event.description}</p>
          <a href={event.wikipediaURL} className="learn-more" target="_blank" rel="noopener noreferrer"> Learn More </a>
        </div>
      </div>
    </article>
  );
};

export default EventCard;