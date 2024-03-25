import Text from 'components/text';
import React, { FC } from 'react';
import { TouchableOpacityProps, View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { theme } from 'theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props extends Omit<TouchableOpacityProps, 'disabled'> {
  label: string;
  isDisabled?: boolean;
}

const Button: FC<Props> = ({ label, isDisabled, ...rest }) => {  
  const disabledValue = useDerivedValue(() => withTiming(isDisabled ? 0.5 : 1), [isDisabled]);

  const animatedButtonStyle = useAnimatedStyle(
    () => ({
      opacity: disabledValue.value,
    }),
    [isDisabled],
  );

  return (
    <View pointerEvents={isDisabled ? 'none' : 'auto'} style={styles.buttonContainer}>
      <AnimatedTouchable {...rest} style={[styles.button, rest.style, animatedButtonStyle]}>
        <Text fontSize={theme.fontSizes.xl} color={theme.colors.planeWhite} fontWeight="600">
          {label}
        </Text>
      </AnimatedTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Button;
