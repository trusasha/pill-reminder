import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { theme } from 'theme';

interface Props {
  currentValue: number;
  targetValue: number;
}

const ProgressBar: FC<PropsWithChildren<Props>> = ({ currentValue, targetValue, children }) => {
  const progress = useDerivedValue(() => {
    return currentValue / targetValue;
  }, [currentValue, targetValue]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress.value * 100}%`),
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
