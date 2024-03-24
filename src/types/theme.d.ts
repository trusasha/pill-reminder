import { EdgeInsets } from 'react-native-safe-area-context';
import { AppTheme } from 'theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {
    insets: EdgeInsets;
  }
}
