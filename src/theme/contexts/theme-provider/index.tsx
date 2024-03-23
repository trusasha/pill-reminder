import React, { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { AppTheme, theme } from 'theme';

export interface ThemeContextValues {
  theme: AppTheme;
}
const ThemeContext = React.createContext({
  theme,
});

const useTheme = () => React.useContext(ThemeContext);

function ThemeProvider({ children }: { children: ReactNode }) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

export { ThemeContext, useTheme, ThemeProvider };
