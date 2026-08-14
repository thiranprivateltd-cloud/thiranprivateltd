'use client';
// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY

import React, { createContext, useContext, useEffect, useState } from 'react';
import { isIndependenceDay } from '@/utils/independenceDay';

const IndependenceDayContext = createContext(false);

export const useIndependenceDay = () => useContext(IndependenceDayContext);

export const IndependenceDayProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const active = isIndependenceDay();
      setIsActive(active);

      if (active) {
        document.body.classList.add('theme-independence');
        document.title = "🇮🇳 Happy Independence Day | Thiran Private Ltd";
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
          link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇮🇳</text></svg>";
        } else {
          const newLink = document.createElement('link');
          newLink.rel = 'icon';
          newLink.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇮🇳</text></svg>";
          document.head.appendChild(newLink);
        }
      } else {
        document.body.classList.remove('theme-independence');
        document.title = "Thiran Private Ltd | Smarter Steps Forward";
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
          link.href = "/favicon.ico";
        }
      }
    };

    checkDate();
    
    // Check periodically in case they leave the tab open past midnight
    const interval = setInterval(checkDate, 1000 * 60 * 60); 
    return () => clearInterval(interval);
  }, []);

  return (
    <IndependenceDayContext.Provider value={isActive}>
      {children}
    </IndependenceDayContext.Provider>
  );
};
