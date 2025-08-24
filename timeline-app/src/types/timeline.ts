/**
 * Enhanced type definitions for the accessible timeline application
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

// Enhanced EventMarker props with new accessibility features
export interface EventMarkerProps {
  event: TimelineEvent;
  position: number;
  isActive: boolean;
  isFocused?: boolean;
  onActivate: () => void;
  index: number;
  totalEvents: number;
  navigationMode?: 'mouse' | 'keyboard';
}

// Enhanced EventCard props
export interface EventCardProps {
  event: TimelineEvent;
  isActive: boolean;
  onShowModal: () => void;
}

// Accessibility-related types
export interface AccessibilityFeatures {
  readonly screenReaderSupport: boolean;
  readonly keyboardNavigation: boolean;
  readonly focusManagement: boolean;
  readonly colorContrastAA: boolean;
  readonly reducedMotionSupport: boolean;
  readonly skipLinks: boolean;
  readonly liveRegions: boolean;
  readonly semanticHTML: boolean;
}

export interface KeyboardShortcuts {
  readonly navigation: {
    readonly arrowKeys: string;
    readonly homeEnd: string;
    readonly enterSpace: string;
  };
  readonly global: {
    readonly toggleTheme: string;
    readonly help: string;
    readonly closeModal: string;
  };
}

// Focus management types
export interface FocusState {
  readonly previousFocus: HTMLElement | null;
  readonly firstFocusable: HTMLElement | null;
  readonly lastFocusable: HTMLElement | null;
  readonly focusableElements: HTMLElement[];
}

// Announcement types for screen readers
export interface Announcement {
  readonly type: 'assertive' | 'polite';
  readonly message: string;
  readonly atomic?: boolean;
  readonly delay?: number;
}

// Error handling types
export interface AccessibilityError {
  readonly type: 'focus' | 'aria' | 'keyboard' | 'contrast' | 'semantic';
  readonly message: string;
  readonly element?: HTMLElement;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
}

// Theme configuration with accessibility considerations
export interface ThemeConfig {
  readonly colors: {
    readonly primary: string;
    readonly primaryDark: string;
    readonly background: string;
    readonly text: string;
    readonly textSecondary: string;
    readonly focusOutline: string;
    readonly error: string;
    readonly success: string;
    readonly warning: string;
  };
  readonly contrast: {
    readonly textBackground: number; // Contrast ratio
    readonly textSecondaryBackground: number;
    readonly primaryBackground: number;
  };
  readonly accessibility: {
    readonly focusOutlineWidth: string;
    readonly minTargetSize: string;
    readonly reducedMotion: boolean;
    readonly highContrast: boolean;
  };
}