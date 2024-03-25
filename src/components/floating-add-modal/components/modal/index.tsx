import React, { memo } from 'react';
import type { ViewProps } from 'react-native';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { theme } from 'theme';

type ModalProps = {
  title: string;
  submitLabel: string;
  isVisible: SharedValue<boolean>;
  buttonSize: number;
  onAdd(): void;
  isAddDisabled?: boolean;
  children?: React.ReactNode;
  contentContainerStyle?: ViewProps['style'];
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ModalContent: React.FC<ModalProps> = ({
  title,
  submitLabel,
  isVisible,
  buttonSize,
  onAdd,
  isAddDisabled,
  children,
  contentContainerStyle,
}) => {
  const disabledValue = useDerivedValue(() => withTiming(isAddDisabled ? 0.5 : 1), [isAddDisabled]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(isVisible.value ? 1 : 0, {
        duration: 100,
      }),
    }),
    [isVisible],
  );

  const animatedButtonStyle = useAnimatedStyle(
    () => ({
      opacity: disabledValue.value,
    }),
    [disabledValue],
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
      <View pointerEvents={isAddDisabled ? 'none' : 'auto'} style={styles.buttonContainer}>
        <AnimatedTouchable style={[styles.button, animatedButtonStyle]} onPress={onAdd}>
          <Text style={styles.buttonTitle}>{submitLabel}</Text>
        </AnimatedTouchable>
      </View>
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
  buttonContainer: {
    height: 80,
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#111',
    margin: theme.spacings.s,
    borderRadius: theme.borderRadiuses.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
});

export default memo(ModalContent);
