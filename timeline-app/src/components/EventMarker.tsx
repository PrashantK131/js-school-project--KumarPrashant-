import React from 'react';
import { TimelineEvent } from '../types/timeline';

interface EventMarkerProps {
  event: TimelineEvent;
  position: number;
  isActive: boolean;
  onActivate: () => void;
  index: number;
  totalEvents: number;
}

/* Accessible Event marker component for timeline navigation and implementation of tab-like behavior with proper ARIA attributes */
const EventMarker: React.FC<EventMarkerProps> = ({ 
  event, 
  position, 
  isActive, 
  onActivate,
  index,
  totalEvents
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    
    if (['Enter', ' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'Enter':
      case ' ':
        onActivate();
        break;
      case 'ArrowLeft':
        focusMarker(index - 1);
        break;
      case 'ArrowRight':
        focusMarker(index + 1);
        break;
      case 'Home':
        // Focus first marker
        focusMarker(0);
        break;
      case 'End':
        // Focus last marker
        focusMarker(totalEvents - 1);
        break;
    }
  };

  const focusMarker = (targetIndex: number) => {
    // Ensure target index is within bounds
    if (targetIndex < 0 || targetIndex >= totalEvents) return;

    // Find and focus the target marker
    const targetMarker = document.querySelector(
      `[data-timeline-index="${targetIndex}"]`
    ) as HTMLElement;
    
    if (targetMarker) {
      targetMarker.focus();
    }
  };

  return (
    <>
      <button
        className={`timeline-dot ${isActive ? 'active' : ''}`}
        style={{ left: `${position}%` }}
        onClick={onActivate}
        onKeyDown={handleKeyDown}
        data-year={event.year}
        data-timeline-index={index}
        role="tab"
        tabIndex={isActive ? 0 : -1}
        aria-selected={isActive}
        aria-current={isActive ? 'true' : undefined}
        aria-label={`View ${event.title} from ${event.year}`}
        aria-describedby={`year-label-${event.year}`}
        aria-setsize={totalEvents}
        aria-posinset={index + 1}
        type="button"
      >
        <span className="sr-only">
          Event {index + 1} of {totalEvents}: {event.title}
        </span>
      </button>
      
      <div
        id={`year-label-${event.year}`}
        className="year"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        {event.year}
      </div>
    </>
  );
};

export default EventMarker;