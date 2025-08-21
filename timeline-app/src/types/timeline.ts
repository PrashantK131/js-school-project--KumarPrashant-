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

export interface TimelineProps {
  events: readonly TimelineEvent[];
  activeEventYear: number | null;
  onEventSelect: (event: TimelineEvent) => void;
  onEventModal: (event: TimelineEvent) => void;
}

export interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export interface EventModalProps {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
}