/**
 * Core data types for the timeline application
 */
export interface TimelineEvent {
    readonly year: number;
    readonly title: string;
    readonly description: string;
    readonly imageURL: string;
    readonly category: string;
    readonly wikipediaURL: string;
}
export type Theme = 'light' | 'dark';
export interface TimelineState {
    readonly events: readonly TimelineEvent[];
    readonly activeEventYear: number | null;
    readonly theme: Theme;
}
export interface TimelineElements {
    readonly modal: HTMLElement;
    readonly modalDetails: HTMLElement;
    readonly timelineLine: HTMLElement;
    readonly timelineSection: HTMLElement;
    readonly body: HTMLElement;
}
export interface DotClickHandler {
    (dot: HTMLElement, event: TimelineEvent): void;
}
export interface ModalHandler {
    (event: TimelineEvent): void;
}
//# sourceMappingURL=types.d.ts.map