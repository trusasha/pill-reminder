import { theme } from '6-shared/theme';
import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

interface Props {
  initialValue: number;
  currentValue: number;
  targetValue: number;
}

const ProgressBar: FC<PropsWithChildren<Props>> = ({
  currentValue,
  initialValue,
  targetValue,
  children,
}) => {
  const progress = useDerivedValue(() => {
    const range = targetValue - initialValue;
    const progressWithinRange = currentValue - initialValue;
    return range === 0 ? 0 : progressWithinRange / range;
  }, [currentValue, initialValue, targetValue]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${Math.min(Math.max(progress.value, 0), 1) * 100}%`),
    };
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, progressStyle]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.neutral,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    height: '300%',
    backgroundColor: theme.colors.grayDivider,
  },
  content: {
    flex: 1,
    padding: 12,
  },
});

export default ProgressBar;
