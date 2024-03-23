import { borderRadiuses } from './constants/border-radiuses';
import { colors } from './constants/colors';
import { fontSizes } from './constants/font-sizes';
import { spacings, SpacingStyles } from './constants/spacings';
import { ThemeProvider } from './contexts/theme-provider';

const theme = {
  colors,
  spacings,
  fontSizes,
  borderRadiuses,
};

type AppTheme = typeof theme;

export type { AppTheme };
export { theme, SpacingStyles, ThemeProvider };
