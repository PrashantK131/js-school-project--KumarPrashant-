import { timelineEvents } from './data.js';
import { ThemeManager } from './theme.js';
import { ModalManager } from './modal.js';
import { TimelineRenderer } from './renderer.js';
import { initializeElements, logError, checkBrowserSupport } from './utils.js';
/**
 * Main Timeline Application class
 */
export class TimelineApp {
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
    initialize() {
        try {
            this.setupGlobalHandlers();
            this.renderTimeline();
            this.activateFirstEvent();
            console.log('Timeline application initialized successfully');
        }
        catch (error) {
            logError('Initialize', error);
            throw error;
        }
    }
    /**
     * Set up global event handlers and expose functions to window
     */
    setupGlobalHandlers() {
        // Expose theme toggle to global scope for HTML onclick
        window.toggleTheme = () => {
            try {
                const newTheme = this.themeManager.toggleTheme();
                Object.assign(this.state, { theme: newTheme });
            }
            catch (error) {
                logError('Theme Toggle', error);
            }
        };
        // Expose modal functions to global scope
        window.showModal = (event) => {
            try {
                this.handleModalShow(event);
            }
            catch (error) {
                logError('Show Modal', error);
            }
        };
        window.closeModal = () => {
            try {
                this.modalManager.close();
            }
            catch (error) {
                logError('Close Modal', error);
            }
        };
        // Expose dot activation to global scope
        window.activateDot = (dot, event) => {
            try {
                this.handleDotClick(dot, event);
            }
            catch (error) {
                logError('Activate Dot', error);
            }
        };
    }
    /**
     * Render the complete timeline
     */
    renderTimeline() {
        const dotClickHandler = (dot, event) => {
            this.handleDotClick(dot, event);
        };
        this.timelineRenderer.renderTimeline(this.state.events, dotClickHandler);
    }
    /**
     * Handle dot click events
     */
    handleDotClick(dot, event) {
        // Update state
        Object.assign(this.state, { activeEventYear: event.year });
        // Update UI
        this.timelineRenderer.activateDot(event);
    }
    /**
     * Handle modal show events
     */
    handleModalShow(event) {
        this.modalManager.show(event);
    }
    /**
     * Activate the first event by default
     */
    activateFirstEvent() {
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
    getState() {
        return { ...this.state };
    }
}
//# sourceMappingURL=app.js.map