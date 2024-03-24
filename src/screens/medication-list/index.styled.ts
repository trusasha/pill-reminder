import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Styled = {
  Container: styled(SafeAreaView)`
    background-color: ${({ theme }) => theme.colors.white};
    flex: 1;
  `,
  AddButton: styled(AnimatedTouchable)`
    background-color: ${({ theme }) => theme.colors.planeWhite};
    width: 48px;
    height: 48px;
    position: absolute;
    bottom: ${({ theme }) => theme.spacings.l}px;
    right: ${({ theme }) => theme.spacings.l}px;
    border-radius: ${({ theme }) => theme.borderRadiuses.m}px;
    border-color: ${({ theme }) => theme.colors.stroke};
    border-width: 1px;
  `,
};

export default Styled;
