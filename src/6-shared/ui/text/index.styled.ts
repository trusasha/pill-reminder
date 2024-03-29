import { AppTheme } from '6-shared/theme';
import { PropsWithChildren } from 'react';
import { Text, TextStyle } from 'react-native';
import styled from 'styled-components/native';

export type StyledProps = {
  color?: AppTheme['colors'][keyof AppTheme['colors']];
  fontSize?: AppTheme['fontSizes'][keyof AppTheme['fontSizes']];
  fontWeight?: TextStyle['fontWeight'];
};

export const StyledText = styled(Text)<PropsWithChildren<StyledProps>>`
  font-size: ${({ fontSize, theme }) => fontSize || theme.fontSizes.m}px;
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  color: ${({ color, theme }) => color || theme.colors.stroke};
`;
