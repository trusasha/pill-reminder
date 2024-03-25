import React, { memo } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type ModalProps = {
  title: string;
  submitLabel: string;
  isVisible: SharedValue<boolean>;
  buttonSize: number;
  onAdd(): void;
  children?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const ModalContent: React.FC<ModalProps> = ({
  title,
  submitLabel,
  isVisible,
  buttonSize,
  onAdd,
  children,
  contentContainerStyle,
}) => {
  const rAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(isVisible.value ? 1 : 0, {
        duration: 100,
      }),
    }),
    [isVisible],
  );

  const rAnimatedProps = useAnimatedProps<ViewProps>(
    () => ({
      pointerEvents: isVisible.value ? 'auto' : 'none',
    }),
    [isVisible],
  );

  return (
    <Animated.View animatedProps={rAnimatedProps} style={[styles.container, rAnimatedStyle]}>
      <View style={[styles.modalContainerTitle, { height: buttonSize }]}>
        <Text style={styles.modalTitle}>{title}</Text>
      </View>

      <View style={[{ flex: 1 }, contentContainerStyle]}>{children}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <Text style={styles.buttonTitle}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  modalContainerTitle: {
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    height: 80,
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#111',
    margin: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
});

export default memo(ModalContent);
