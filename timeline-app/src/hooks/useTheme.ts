import { useState, useEffect } from 'react';
import { Theme } from '../types/timeline';

/**
 * Custom hook for managing theme state and persistence
 */
export const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('timeline-theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Apply theme to document body
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }

    // Save theme preference
    localStorage.setItem('timeline-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return [theme, toggleTheme];
};