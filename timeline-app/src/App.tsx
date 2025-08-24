import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import { timelineEvents } from './data/events';
import { TimelineEvent } from './types/timeline';
import { useTheme } from './hooks/useTheme';
import './App.css';

/* Main Application Component with comprehensive accessibility features */
const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [activeEventYear, setActiveEventYear] = useState<number | null>(null);
  const [modalEvent, setModalEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize first event as active
  useEffect(() => {
    if (timelineEvents.length > 0) {
      const sortedEvents = [...timelineEvents].sort((a, b) => a.year - b.year);
      setActiveEventYear(sortedEvents[0].year);
    }
  }, []);

  // Set up keyboard shortcuts and accessibility features
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Global keyboard shortcuts
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
        announceThemeChange();
      }

      // Escape key to close modal
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [toggleTheme, isModalOpen]);

  // Announce theme changes to screen readers
  const announceThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${newTheme} theme`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  // Handle event selection with accessibility announcements
  const handleEventSelect = (event: TimelineEvent) => {
    setActiveEventYear(event.year);
    
    // Update document title for screen readers
    document.title = `Timeline App - ${event.title} (${event.year})`;
  };

  // Handle modal opening with focus management
  const handleEventModal = (event: TimelineEvent) => {
    setModalEvent(event);
    setIsModalOpen(true);
    
    // Add class to body to prevent scrolling
    document.body.classList.add('focus-trap-active');
    
    // Update document title
    document.title = `Timeline App - ${event.title} Details`;
  };

  // Handle modal closing with focus restoration
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalEvent(null);
    
    // Remove scroll prevention class
    document.body.classList.remove('focus-trap-active');
    
    // Restore original title
    const activeEvent = timelineEvents.find(e => e.year === activeEventYear);
    document.title = activeEvent 
      ? `Timeline App - ${activeEvent.title} (${activeEvent.year})`
      : 'Timeline App';
  };

  return (
    <div className="App">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      
      <Header theme={theme} onToggleTheme={toggleTheme} />
      
      <main id="main-content" role="main">
        <div className="app-description sr-only">
          <h1>Interactive Historical Timeline</h1>
          <p>
            Navigate through key historical events in technology. 
            Use arrow keys to move between events, Enter or Space to view details.
            Press Alt+T to toggle between light and dark themes.
          </p>
        </div>

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

      {/* Live region for announcements */}
      <div 
        id="live-region" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      />

      {/* Keyboard shortcuts help (screen reader accessible) */}
      <div className="sr-only">
        <h2>Keyboard Shortcuts</h2>
        <ul>
          <li>Arrow keys: Navigate between timeline events</li>
          <li>Enter or Space: Activate selected event or open details</li>
          <li>Escape: Close modal dialog</li>
          <li>Alt + T: Toggle light/dark theme</li>
          <li>Home: Go to first event</li>
          <li>End: Go to last event</li>
        </ul>
      </div>
    </div>
  );
};

export default App;