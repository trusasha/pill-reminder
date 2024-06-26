import React, { FC, memo } from 'react';
import { TextInputProps } from 'react-native';
import { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SpacingStyles, theme } from '6-shared/theme';
import Styled from './index.styled';
import Text from '../text';

interface Props extends TextInputProps {
  label?: string;
}

const TextInput: FC<Props> = ({ label, ...rest }) => {
  const animatedColor = useSharedValue(0);

  const onFocus = () => {
    animatedColor.value = withTiming(1);
  };

  const onBlur = () => {
    animatedColor.value = withTiming(0);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      animatedColor.value,
      [0, 1],
      [theme.colors.neutral, theme.colors.stroke],
    ),
  }));

  return (
    <>
      {Boolean(label) && (
        <Text style={SpacingStyles.mb.xs} fontSize={theme.fontSizes.l} fontWeight="600">
          {label}
        </Text>
      )}
      <Styled.Input {...rest} style={[animatedStyles, rest.style]} onFocus={onFocus} onBlur={onBlur} />
    </>
  );
};

export default memo(TextInput);
