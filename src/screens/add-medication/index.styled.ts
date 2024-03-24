import { Dimensions, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Styled = {
  Container: styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  Backdrop: styled(AnimatedPressable)`
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.stroke}50;
    z-index: -1;
  `,
  ModalContainer: styled(Animated.View)`
    width: ${SCREEN_WIDTH - 16 * 2}px;
    height: ${SCREEN_HEIGHT / 2}px;
    background-color: ${({ theme }) => theme.colors.planeWhite};
    border-color: ${({ theme }) => theme.colors.stroke};
    border-width: 1px;
    border-radius: ${({ theme }) => theme.borderRadiuses.m}px;
  `,
};

export default Styled;
