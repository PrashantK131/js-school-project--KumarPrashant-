import { TimelineEvent, DotClickHandler } from './types.js';

/**
 * Timeline rendering utilities
 */
export class TimelineRenderer {
  private readonly timelineLine: HTMLElement;
  private readonly timelineSection: HTMLElement;

  constructor(timelineLine: HTMLElement, timelineSection: HTMLElement) {
    this.timelineLine = timelineLine;
    this.timelineSection = timelineSection;
  }

  /**
   * Render the complete timeline with dots, years, and event cards
   */
  renderTimeline(events: readonly TimelineEvent[], dotClickHandler: DotClickHandler): void {
    // Clear existing content
    this.clearTimeline();
    
    // Sort events by year
    const sortedEvents = [...events].sort((a, b) => a.year - b.year);
    
    // Render timeline elements
    sortedEvents.forEach((event, index) => {
      const position = this.calculateDotPosition(index, sortedEvents.length);
      
      this.renderTimelineDot(event, position, dotClickHandler);
      this.renderYearLabel(event, position, dotClickHandler);
      this.renderEventCard(event);
    });
  }

  /**
   * Activate a specific timeline dot and show its corresponding event card
   */
  activateDot(activeEvent: TimelineEvent): void {
    // Remove active class from all dots
    this.timelineLine.querySelectorAll('.timeline-dot').forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Add active class to the target dot
    const targetDot = this.timelineLine.querySelector(`[data-year="${activeEvent.year}"]`);
    if (targetDot instanceof HTMLElement) {
      targetDot.classList.add('active');
    }
    
    // Hide all event cards
    this.timelineSection.querySelectorAll('.event-card').forEach(card => {
      card.classList.remove('show');
    });
    
    // Show the target event card
    const targetCard = this.timelineSection.querySelector(`#event-${activeEvent.year}`);
    if (targetCard instanceof HTMLElement) {
      targetCard.classList.add('show');
    }
  }

  /**
   * Clear all timeline content
   */
  private clearTimeline(): void {
    // Clear timeline dots and years
    const dotsAndYears = this.timelineLine.querySelectorAll('.timeline-dot, .year');
    dotsAndYears.forEach(element => element.remove());
    
    // Clear event cards
    const eventCards = this.timelineSection.querySelectorAll('.event-card');
    eventCards.forEach(card => card.remove());
  }

  /**
   * Calculate the position percentage for a dot on the timeline
   */
  private calculateDotPosition(index: number, totalEvents: number): number {
    if (totalEvents <= 1) return 0;
    return (index / (totalEvents - 1)) * 100;
  }

  /**
   * Render a timeline dot
   */
  private renderTimelineDot(event: TimelineEvent, position: number, clickHandler: DotClickHandler): void {
    const dot = document.createElement('div');
    dot.classList.add('timeline-dot');
    dot.style.left = `${position}%`;
    dot.setAttribute('data-year', event.year.toString());
    dot.onclick = () => clickHandler(dot, event);
    
    this.timelineLine.appendChild(dot);
  }

  /**
   * Render a year label
   */
  private renderYearLabel(event: TimelineEvent, position: number, clickHandler: DotClickHandler): void {
    const yearLabel = document.createElement('div');
    yearLabel.classList.add('year');
    yearLabel.style.left = `${position}%`;
    yearLabel.textContent = event.year.toString();
    
    // Find the corresponding dot for the click handler
    const dot = this.timelineLine.querySelector(`[data-year="${event.year}"]`);
    if (dot instanceof HTMLElement) {
      yearLabel.onclick = () => clickHandler(dot, event);
    }
    
    this.timelineLine.appendChild(yearLabel);
  }

  /**
   * Render an event card
   */
  private renderEventCard(event: TimelineEvent): void {
    const eventCard = document.createElement('article');
    eventCard.classList.add('event-card');
    eventCard.id = `event-${event.year}`;
    eventCard.innerHTML = this.createEventCardContent(event);
    
    this.timelineSection.appendChild(eventCard);
  }

  /**
   * Create the HTML content for an event card
   */
  private createEventCardContent(event: TimelineEvent): string {
    const imageElement = this.createEventImage(event);
    const wikipediaLink = this.createWikipediaLink(event.wikipediaURL);
    
    return `
      <header class="event-header">
        <div class="event-year">${event.year}</div>
        <h2 class="event-title">${this.escapeHtml(event.title)}</h2>
      </header>
      <div class="event-content">
        ${imageElement}
        <div class="event-description">
          <p>${this.escapeHtml(event.description)}</p>
          ${wikipediaLink}
        </div>
      </div>
    `;
  }

  /**
   * Create event image element
   */
  private createEventImage(event: TimelineEvent): string {
    return `
      <figure class="event-image">
        <img 
          src="${this.escapeHtml(event.imageURL)}" 
          alt="${this.escapeHtml(event.title)}" 
          onerror="this.style.display='none'"
        />
      </figure>
    `;
  }

  /**
   * Create Wikipedia link element
   */
  private createWikipediaLink(url: string): string {
    return `
      <a 
        href="${this.escapeHtml(url)}" 
        class="learn-more" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Learn More
      </a>
    `;
  }

  /**
   * Escape HTML to prevent XSS
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}