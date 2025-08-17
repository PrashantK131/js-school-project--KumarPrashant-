import { TimelineState } from './types.js';
/**
 * Main Timeline Application class
 */
export declare class TimelineApp {
    private readonly state;
    private readonly themeManager;
    private readonly modalManager;
    private readonly timelineRenderer;
    constructor();
    /**
     * Initialize the application
     */
    initialize(): void;
    /**
     * Set up global event handlers and expose functions to window
     */
    private setupGlobalHandlers;
    /**
     * Render the complete timeline
     */
    private renderTimeline;
    /**
     * Handle dot click events
     */
    private handleDotClick;
    /**
     * Handle modal show events
     */
    private handleModalShow;
    /**
     * Activate the first event by default
     */
    private activateFirstEvent;
    /**
     * Get current application state (for debugging)
     */
    getState(): Readonly<TimelineState>;
}
//# sourceMappingURL=app.d.ts.map