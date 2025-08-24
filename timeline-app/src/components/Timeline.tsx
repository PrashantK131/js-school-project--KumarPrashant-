import React, { useRef, useEffect } from 'react';
import { TimelineProps } from '../types/timeline';
import EventMarker from './EventMarker';
import EventCard from './EventCard';

/* Accessible Timeline component that implements proper keyboard navigation and screen reader support using tablist/tab pattern */
const Timeline: React.FC<TimelineProps> = ({ 
  events, 
  activeEventYear, 
  onEventSelect, 
  onEventModal 
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);
  const activeIndex = sortedEvents.findIndex(event => event.year === activeEventYear);

  const calculatePosition = (index: number, total: number): number => {
    if (total <= 1) return 0;
    return (index / (total - 1)) * 100;
  };

  const activateEvent = (event: typeof events[0]) => {
    onEventSelect(event);
    
    // Announce the change to screen readers
    announceEventChange(event);
  };

  const announceEventChange = (event: typeof events[0]) => {
    // Create a live region announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Selected ${event.title} from ${event.year}`;
    
    document.body.appendChild(announcement);
    
    // Remove the announcement after a delay
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  // Handle keyboard navigation at the timeline level
  const handleTimelineKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = activeIndex;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          activateEvent(sortedEvents[currentIndex - 1]);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < sortedEvents.length - 1) {
          activateEvent(sortedEvents[currentIndex + 1]);
        }
        break;
      case 'Home':
        e.preventDefault();
        activateEvent(sortedEvents[0]);
        break;
      case 'End':
        e.preventDefault();
        activateEvent(sortedEvents[sortedEvents.length - 1]);
        break;
    }
  };

  // Ensure active marker is focusable when timeline receives focus
  useEffect(() => {
    const activeMarker = document.querySelector(
      `[data-timeline-index="${activeIndex}"]`
    ) as HTMLElement;
    
    if (activeMarker && document.activeElement?.closest('.timeline-container')) {
      activeMarker.focus();
    }
  }, [activeIndex]);

  return (
    <section id="timeline" aria-label="Historical Timeline">
      <div className="timeline-instructions">
        <p className="sr-only">
          Navigate through historical events using the arrow keys, home, or end keys. 
          Press Enter or Space to view details for the selected event.
        </p>
      </div>

      <article className="timeline-container" ref={timelineRef}>
        <div 
          className="timeline-line"
          role="tablist"
          aria-label="Timeline Events"
          aria-orientation="horizontal"
          onKeyDown={handleTimelineKeyDown}
        >
          {sortedEvents.map((event, index) => {
            const position = calculatePosition(index, sortedEvents.length);
            return (
              <EventMarker
                key={event.year}
                event={event}
                position={position}
                isActive={event.year === activeEventYear}
                onActivate={() => activateEvent(event)}
                index={index}
                totalEvents={sortedEvents.length}
              />
            );
          })}
        </div>
      </article>

      {/* Event Cards - only show active one */}
      <div className="event-cards-container" role="tabpanel" aria-live="polite">
        {sortedEvents.map((event) => (
          <EventCard
            key={event.year}
            event={event}
            isActive={event.year === activeEventYear}
            onShowModal={() => onEventModal(event)}
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;