import React from 'react';
import { TimelineEvent } from '../types/timeline';

interface EventMarkerProps {
  event: TimelineEvent;
  position: number;
  isActive: boolean;
  onActivate: () => void;
}

/**
 * Event marker component for timeline dots and year labels
 */
const EventMarker: React.FC<EventMarkerProps> = ({ 
  event, 
  position, 
  isActive, 
  onActivate 
}) => {
  return (
    <>
      <div
        className={`timeline-dot ${isActive ? 'active' : ''}`}
        style={{ left: `${position}%` }}
        onClick={onActivate}
        data-year={event.year}
        role="button"
        tabIndex={0}
        aria-label={`View ${event.title} from ${event.year}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onActivate();
          }
        }}
      />
      <div
        className="year"
        style={{ left: `${position}%` }}
        onClick={onActivate}
        role="button"
        tabIndex={0}
        aria-label={`Year ${event.year}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onActivate();
          }
        }}
      >
        {event.year}
      </div>
    </>
  );
};

export default EventMarker;