import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

interface ColorProps {
  color: string;
}

const Styled = {
  Container: styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.planeWhite};
    border-radius: ${({ theme }) => theme.borderRadiuses.s}px;
    border-color: ${({ theme }) => theme.colors.grayDivider};
    border-width: ${StyleSheet.hairlineWidth}px;
    overflow: hidden;
    padding: ${({ theme }) => theme.spacings.m}px ${({ theme }) => theme.spacings.m}px 0
      ${({ theme }) => theme.spacings.m}px;
  `,
  Content: styled(View)`
    flex-direction: row;
    justify-content: space-between;
  `,
  Color: styled(View)<ColorProps>`
    background-color: ${({ color }) => color};
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadiuses.s}px;
    border-width: ${StyleSheet.hairlineWidth}px;
    margin-left: ${({ theme }) => theme.spacings.m}px;
  `,
  Bottom: styled(View)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.neutral};
    margin: 0 -${({ theme }) => theme.spacings.m}px 0 -${({ theme }) => theme.spacings.m}px;
    height: 48px;
  `,
};

export default Styled;
