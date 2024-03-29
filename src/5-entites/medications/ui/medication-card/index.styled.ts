import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const Styled = {
  Container: styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.planeWhite};
    border-radius: ${({ theme }) => theme.borderRadiuses.s}px;
    border-color: ${({ theme }) => theme.colors.grayDivider};
    border-width: ${StyleSheet.hairlineWidth}px;
    overflow: hidden;
  `,
  Content: styled(View)`
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacings.m}px ${({ theme }) => theme.spacings.m}px 0
      ${({ theme }) => theme.spacings.m}px;
  `,
};

export default Styled;
