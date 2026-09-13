'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('thiran_theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('thiran_theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
