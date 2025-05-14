import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;