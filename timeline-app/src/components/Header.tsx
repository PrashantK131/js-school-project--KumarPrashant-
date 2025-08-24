import React from 'react';
import { HeaderProps } from '../types/timeline';

/* Accessible Header component with logo and theme toggle */
const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleTheme();
    }
  };

  return (
    <header role="banner">
      <div className="logo" role="img" aria-label="Timeline application logo">
        📅 Timeline
      </div>
      
      <nav role="navigation" aria-label="Theme settings">
        <button 
          className="theme-toggle" 
          onClick={onToggleTheme}
          onKeyDown={handleKeyDown}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          aria-describedby="theme-description"
          title={`Currently using ${theme} theme. Click to switch to ${theme === 'light' ? 'dark' : 'light'} theme.`}
          type="button"
        >
          <span className="sr-only">
            Theme toggle button. Current theme: {theme}. 
            {theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          </span>
        </button>
        
        <div id="theme-description" className="sr-only">
          Theme toggle switch. Use this to switch between light and dark visual themes. 
          You can also press Alt+T anywhere on the page to toggle themes.
        </div>
      </nav>
    </header>
  );
};

export default Header;