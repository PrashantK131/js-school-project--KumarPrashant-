import React from 'react';
import { HeaderProps } from '../types/timeline';

/**
 * Header component with logo and theme toggle
 */
const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header>
      <div className="logo">📅 Timeline</div>
      <button 
        className="theme-toggle" 
        onClick={onToggleTheme} 
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      />
    </header>
  );
};

export default Header;