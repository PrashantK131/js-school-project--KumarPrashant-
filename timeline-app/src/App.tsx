import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import { timelineEvents } from './data/events';
import { TimelineEvent } from './types/timeline';
import { useTheme } from './hooks/useTheme';
import './App.css';

/**
 * Main Application Component
 */
const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [activeEventYear, setActiveEventYear] = useState<number | null>(null);
  const [modalEvent, setModalEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize first event as active
  useEffect(() => {
    if (timelineEvents.length > 0) {
      setActiveEventYear(timelineEvents[0].year);
    }
  }, []);

  // Expose global functions for backward compatibility
  useEffect(() => {
    (window as any).toggleTheme = toggleTheme;

    (window as any).showModal = (event: TimelineEvent) => {
      setModalEvent(event);
      setIsModalOpen(true);
    };

    (window as any).closeModal = () => {
      setIsModalOpen(false);
      setModalEvent(null);
    };

    (window as any).activateDot = (_dot: HTMLElement, event: TimelineEvent) => {
      setActiveEventYear(event.year);
    };
  }, [toggleTheme]);

  const handleEventSelect = (event: TimelineEvent) => {
    setActiveEventYear(event.year);
  };

  const handleEventModal = (event: TimelineEvent) => {
    setModalEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalEvent(null);
  };

  return (
    <div className="App">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      
      <main>
        <Timeline
          events={timelineEvents}
          activeEventYear={activeEventYear}
          onEventSelect={handleEventSelect}
          onEventModal={handleEventModal}
        />
      </main>

      <EventModal
        event={modalEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;