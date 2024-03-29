import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { Icon, theme } from '6-shared';
import Styled from './index.styled';

type Props = {
  buttonSize: number;
  onPress: () => void;
  additionalStyle?: ViewProps['style'];
  icon?: string;
};

const AddButton: FC<Props> = ({ buttonSize, onPress, additionalStyle, icon = 'plus' }) => {
  return (
    <Styled.AddButton onPress={onPress} buttonSize={buttonSize} style={additionalStyle}>
      <Icon name={icon} color={theme.colors.stroke} size={24} />
    </Styled.AddButton>
  );
};

export default AddButton;
