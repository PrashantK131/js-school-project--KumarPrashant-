import { TimelineEvent, TimelineState, DotClickHandler, ModalHandler } from './types.js';
import { timelineEvents } from './data.js';
import { ThemeManager } from './theme.js';
import { ModalManager } from './modal.js';
import { TimelineRenderer } from './renderer.js';
import { initializeElements, logError, checkBrowserSupport } from './utils.js';

/**
 * Main Timeline Application class
 */
export class TimelineApp {
  private readonly state: TimelineState;
  private readonly themeManager: ThemeManager;
  private readonly modalManager: ModalManager;
  private readonly timelineRenderer: TimelineRenderer;

  constructor() {
    // Check browser support
    if (!checkBrowserSupport()) {
      throw new Error('Browser does not support required features');
    }

    // Initialize DOM elements
    const elements = initializeElements();

    // Initialize state
    this.state = {
      events: timelineEvents,
      activeEventYear: null,
      theme: 'light'
    };

    // Initialize managers
    this.themeManager = new ThemeManager(elements.body);
    this.modalManager = new ModalManager(elements.modal, elements.modalDetails);
    this.timelineRenderer = new TimelineRenderer(elements.timelineLine, elements.timelineSection);

    // Set initial theme
    this.state = {
      ...this.state,
      theme: this.themeManager.getCurrentTheme()
    };
  }

  /**
   * Initialize the application
   */
  public initialize(): void {
    try {
      this.setupGlobalHandlers();
      this.renderTimeline();
      this.activateFirstEvent();
      
      console.log('Timeline application initialized successfully');
    } catch (error) {
      logError('Initialize', error);
      throw error;
    }
  }

  /**
   * Set up global event handlers and expose functions to window
   */
  private setupGlobalHandlers(): void {
    // Expose theme toggle to global scope for HTML onclick
    (window as any).toggleTheme = () => {
      try {
        const newTheme = this.themeManager.toggleTheme();
        Object.assign(this.state, { theme: newTheme });
      } catch (error) {
        logError('Theme Toggle', error);
      }
    };

    // Expose modal functions to global scope
    (window as any).showModal = (event: TimelineEvent) => {
      try {
        this.handleModalShow(event);
      } catch (error) {
        logError('Show Modal', error);
      }
    };

    (window as any).closeModal = () => {
      try {
        this.modalManager.close();
      } catch (error) {
        logError('Close Modal', error);
      }
    };

    // Expose dot activation to global scope
    (window as any).activateDot = (dot: HTMLElement, event: TimelineEvent) => {
      try {
        this.handleDotClick(dot, event);
      } catch (error) {
        logError('Activate Dot', error);
      }
    };
  }

  /**
   * Render the complete timeline
   */
  private renderTimeline(): void {
    const dotClickHandler: DotClickHandler = (dot, event) => {
      this.handleDotClick(dot, event);
    };

    this.timelineRenderer.renderTimeline(this.state.events, dotClickHandler);
  }

  /**
   * Handle dot click events
   */
  private handleDotClick(dot: HTMLElement, event: TimelineEvent): void {
    // Update state
    Object.assign(this.state, { activeEventYear: event.year });
    
    // Update UI
    this.timelineRenderer.activateDot(event);
  }

  /**
   * Handle modal show events
   */
  private handleModalShow(event: TimelineEvent): void {
    this.modalManager.show(event);
  }

  /**
   * Activate the first event by default
   */
  private activateFirstEvent(): void {
    if (this.state.events.length > 0) {
      const firstEvent = this.state.events[0];
      if (firstEvent) {
        const firstDot = document.querySelector('.timeline-dot');
        if (firstDot instanceof HTMLElement) {
          this.handleDotClick(firstDot, firstEvent);
        }
      }
    }
  }

  /**
   * Get current application state (for debugging)
   */
  public getState(): Readonly<TimelineState> {
    return { ...this.state };
  }
}