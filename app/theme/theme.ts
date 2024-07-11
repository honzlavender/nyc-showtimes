import { createContext } from 'react';

type Theme = {
  backgroundColor: string;
  textColor: string;
};

type Themes = {
  light: Theme;
  dark: Theme;
};

export const themes: Themes = {
  light: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
  dark: {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: themes.light,
  toggleTheme: () => {},
});
