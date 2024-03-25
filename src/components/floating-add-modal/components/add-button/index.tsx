import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'components/icon';
import { theme } from 'theme';
import Styled from './index.styled';

type Props = {
  progress: SharedValue<number>;
  buttonSize: number;
  onPress: () => void;
  additionalStyle?: ViewProps['style'];
};

const AddButton: FC<Props> = ({ progress, buttonSize, onPress, additionalStyle }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, Math.PI / 4], Extrapolation.CLAMP);

    return {
      transform: [
        {
          rotate: `${rotate}rad`,
        },
      ],
    };
  }, []);

  return (
    <Styled.AddButton onPress={onPress} buttonSize={buttonSize} style={[additionalStyle, animatedStyle]}>
      <Icon name="plus" color={theme.colors.stroke} size={24} />
    </Styled.AddButton>
  );
};

export default AddButton;
