import React from 'react';
import { TimelineProps } from '../types/timeline';
import EventMarker from './EventMarker';
import EventCard from './EventCard';

/**
 * Main Timeline component that renders the timeline line with events
 */
const Timeline: React.FC<TimelineProps> = ({ 
  events, 
  activeEventYear, 
  onEventSelect, 
  onEventModal 
}) => {
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  const calculatePosition = (index: number, total: number): number => {
    if (total <= 1) return 0;
    return (index / (total - 1)) * 100;
  };

  const activateDot = (event: typeof events[0]) => {
    // Remove active class from all dots
    document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
    
    // Add active class to clicked dot
    const clickedDot = document.querySelector(`[data-year="${event.year}"]`);
    if (clickedDot) {
      clickedDot.classList.add('active');
    }

    // Hide all event cards
    document.querySelectorAll('.event-card').forEach(card => card.classList.remove('show'));

    // Show the corresponding event card
    const eventCard = document.getElementById(`event-${event.year}`);
    if (eventCard) {
      eventCard.classList.add('show');
    }

    onEventSelect(event);
  };

  return (
    <section id="timeline">
      <article className="timeline-container">
        <div className="timeline-line">
          {sortedEvents.map((event, index) => {
            const position = calculatePosition(index, sortedEvents.length);
            return (
              <EventMarker
                key={event.year}
                event={event}
                position={position}
                isActive={event.year === activeEventYear}
                onActivate={() => activateDot(event)}
              />
            );
          })}
        </div>
      </article>

      {sortedEvents.map((event) => (
        <EventCard
          key={event.year}
          event={event}
          isActive={event.year === activeEventYear}
          onShowModal={() => onEventModal(event)}
        />
      ))}
    </section>
  );
};

export default Timeline;