import { AppTheme } from '6-shared';
import { EdgeInsets } from 'react-native-safe-area-context';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {
    insets: EdgeInsets;
  }
}
