import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const lightTheme = {
  colors: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgCard: '#ffffff',
    textPrimary: '#1a1a1a',
    textSecondary: '#6c757d',
    textAccent: '#000000',
    accent: '#e9ecef',
    accentBright: '#4a9eff',
    border: '#dee2e6',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    round: 100,
  }
};

export const darkTheme = {
  colors: {
    bgPrimary: '#121212',
    bgSecondary: '#1e1e1e',
    bgCard: '#2a2a2a',
    textPrimary: '#f5f5f5',
    textSecondary: '#a6a6a6',
    textAccent: '#ffffff',
    accent: '#3d3d3d',
    accentBright: '#4a9eff',
    border: '#3d3d3d',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    round: 100,
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
