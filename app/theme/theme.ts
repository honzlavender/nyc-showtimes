import { createContext } from 'react';

export const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#EAF6DB',
    card: 'rgb(255, 255, 255)',
    text: '#24302A',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

type Theme = {
  dark: boolean,
  colors: object
};

type Themes = {
  light: Theme;
  dark: Theme;
};

export const themes: Themes = {
  light: {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#EAF6DB',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#000000',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  },
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: themes.light,
  toggleTheme: () => {},
});
