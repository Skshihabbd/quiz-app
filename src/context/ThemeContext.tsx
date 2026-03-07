import React, { createContext, useState, ReactNode } from 'react';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: {
    background: string;
    surfaceBackground: string;
    text: string;
    secondaryText: string;
    headerBackground: string;
    headerText: string;
    border: string;
    correct: string;
    wrong: string;
    cardBackground: string;
    inputBackground: string;
  };
}

const defaultLightColors = {
  background: '#f5f5f5',
  surfaceBackground: 'white',
  text: '#333',
  secondaryText: '#666',
  headerBackground: '#007bff',
  headerText: 'white',
  border: '#eee',
  correct: '#28a745',
  wrong: '#dc3545',
  cardBackground: 'white',
  inputBackground: '#f9f9f9',
};

const defaultDarkColors = {
  background: '#1a1a1a',
  surfaceBackground: '#2a2a2a',
  text: '#ffffff',
  secondaryText: '#b0b0b0',
  headerBackground: '#004494',
  headerText: '#ffffff',
  border: '#404040',
  correct: '#4CAF50',
  wrong: '#FF5252',
  cardBackground: '#333333',
  inputBackground: '#424242',
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  colors: defaultLightColors,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(previous => !previous);
  };

  const colors = isDarkMode ? defaultDarkColors : defaultLightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
