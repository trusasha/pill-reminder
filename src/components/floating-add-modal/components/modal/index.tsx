import React, { memo } from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { theme } from 'theme';

type ModalProps = {
  title: string;
  isVisible: SharedValue<boolean>;
  buttonSize: number;
  children?: React.ReactNode;
  contentContainerStyle?: ViewProps['style'];
};

const ModalContent: React.FC<ModalProps> = ({
  title,
  isVisible,
  buttonSize,
  children,
  contentContainerStyle,
}) => {
  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(isVisible.value ? 1 : 0, {
        duration: 100,
      }),
    }),
    [isVisible],
  );

  const animatedProps = useAnimatedProps<ViewProps>(
    () => ({
      pointerEvents: isVisible.value ? 'auto' : 'none',
    }),
    [isVisible],
  );

  return (
    <Animated.View animatedProps={animatedProps} style={[styles.container, animatedStyle]}>
      <View style={[styles.modalContainerTitle, { height: buttonSize }]}>
        <Text style={styles.modalTitle}>{title}</Text>
      </View>
      <View style={[styles.flex, contentContainerStyle]}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  flex: {
    flex: 1,
  },
  modalContainerTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
  },
});

export default memo(ModalContent);
