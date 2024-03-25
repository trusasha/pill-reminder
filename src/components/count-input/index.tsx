import Text from 'components/text';
import React, { FC, memo, useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { SpacingStyles, theme } from 'theme';
import { counterEnteringDecrement, counterEnteringIncrement } from './animation';

interface Props {
  count: number;
  setCount(count: number): void;
  label?: string;
  style?: ViewProps['style'];
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CountInput: FC<Props> = ({ label, count, setCount, style }) => {
  const isMounted = useRef(false);
  const isIncremented = useRef(false);

  const onIncrement = useCallback(() => {
    isIncremented.current = true;

    setCount(count + 1);
  }, [count]);

  const onDecrement = useCallback(() => {
    isIncremented.current = false;

    setCount(count > 0 ? count - 1 : count);
  }, [count]);

  const renderNumber = useCallback((value: string, index: number) => {
    const mountedEntering = isIncremented.current ? counterEnteringIncrement : counterEnteringDecrement;
    const entering = (isMounted.current ? mountedEntering : FadeIn).duration(400);

    isMounted.current = true;

    return (
      <Animated.Text
        entering={entering}
        exiting={FadeOut.duration(150)}
        layout={LinearTransition}
        style={styles.text}
        key={`${index}-${value}`}
      >
        {value}
      </Animated.Text>
    );
  }, []);

  return (
    <>
      {label && (
        <Text style={SpacingStyles.mb.xs} fontSize={theme.fontSizes.l} fontWeight="600">
          {label}
        </Text>
      )}
      <View style={[styles.row, style]}>
        <AnimatedTouchable style={styles.button} onPress={onDecrement}>
          <Text fontSize={theme.fontSizes.xl} fontWeight="500">
            -
          </Text>
        </AnimatedTouchable>
        <View style={styles.countContainer}>{count.toString().split('').map(renderNumber)}</View>
        <AnimatedTouchable style={styles.button} onPress={onIncrement}>
          <Text fontSize={theme.fontSizes.xl} fontWeight="500">
            +
          </Text>
        </AnimatedTouchable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.grayDivider,
    width: 48,
    height: 48,
    borderRadius: theme.borderRadiuses.s,
    backgroundColor: theme.colors.neutral,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(CountInput);
