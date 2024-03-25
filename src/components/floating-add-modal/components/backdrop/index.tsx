import React, { memo } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  isVisible: SharedValue<boolean>;
  onPress?: () => void;
};

const Backdrop: React.FC<Props> = ({ onPress, isVisible }) => {
  const animatedStyle = useAnimatedStyle(
    () => ({ opacity: withTiming(isVisible.value ? 1 : 0) }),
    [isVisible],
  );

  const animatedProps = useAnimatedProps<ViewProps>(
    () => ({ pointerEvents: isVisible.value ? 'auto' : 'none' }),
    [isVisible],
  );

  return (
    <Animated.View
      animatedProps={animatedProps}
      onTouchStart={onPress}
      style={[StyleSheet.absoluteFillObject, animatedStyle]}
    />
  );
};

export default memo(Backdrop);
