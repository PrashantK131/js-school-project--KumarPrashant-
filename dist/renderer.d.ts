import { TimelineEvent, DotClickHandler } from './types.js';
/**
 * Timeline rendering utilities
 */
export declare class TimelineRenderer {
    private readonly timelineLine;
    private readonly timelineSection;
    constructor(timelineLine: HTMLElement, timelineSection: HTMLElement);
    /**
     * Render the complete timeline with dots, years, and event cards
     */
    renderTimeline(events: readonly TimelineEvent[], dotClickHandler: DotClickHandler): void;
    /**
     * Activate a specific timeline dot and show its corresponding event card
     */
    activateDot(activeEvent: TimelineEvent): void;
    /**
     * Clear all timeline content
     */
    private clearTimeline;
    /**
     * Calculate the position percentage for a dot on the timeline
     */
    private calculateDotPosition;
    /**
     * Render a timeline dot
     */
    private renderTimelineDot;
    /**
     * Render a year label
     */
    private renderYearLabel;
    /**
     * Render an event card
     */
    private renderEventCard;
    /**
     * Create the HTML content for an event card
     */
    private createEventCardContent;
    /**
     * Create event image element
     */
    private createEventImage;
    /**
     * Create Wikipedia link element
     */
    private createWikipediaLink;
    /**
     * Escape HTML to prevent XSS
     */
    private escapeHtml;
}
//# sourceMappingURL=renderer.d.ts.map