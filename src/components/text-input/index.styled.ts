import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Styled = {
  Input: styled(AnimatedTextInput)`
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacings.m}px;
    border-radius: ${({ theme }) => theme.borderRadiuses.s}px;
    border-width: 1px;
  `,
};

export default Styled;
