import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  buttonSize: number;
}

const Styled = {
  AddButton: styled(AnimatedTouchable)<Props>`
    align-items: center;
    justify-content: center;
    height: ${({ buttonSize }) => buttonSize}px;
    width: ${({ buttonSize }) => buttonSize}px;
  `,
};

export default Styled;
