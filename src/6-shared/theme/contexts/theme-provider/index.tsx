import { AppTheme, theme as appTheme } from '6-shared/theme';
import React, { ReactNode, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

export interface ThemeContextValues {
  theme: AppTheme;
}
const ThemeContext = React.createContext({
  theme: appTheme,
});

const useTheme = () => React.useContext(ThemeContext);

function ThemeProvider({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();

  const theme = useMemo(
    () => ({
      ...appTheme,
      insets,
    }),
    [insets],
  );

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

export { ThemeContext, useTheme, ThemeProvider };
