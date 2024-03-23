import React, { FC, PropsWithChildren } from 'react';
import { TextProps } from 'react-native';
import { StyledProps, StyledText } from './index.styled';

const Text: FC<PropsWithChildren<StyledProps & TextProps>> = ({
  color,
  fontSize,
  fontWeight,
  ...rest
}) => {
  return <StyledText color={color} fontSize={fontSize} fontWeight={fontWeight} {...rest} />;
};

export default Text;
