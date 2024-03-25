import Text from 'components/text';
import React, { FC } from 'react';
import { TouchableOpacityProps, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from 'theme';

interface Props extends Omit<TouchableOpacityProps, 'disabled'> {
  label: string;
  isDisabled?: boolean;
}

const Button: FC<Props> = ({ label, isDisabled, ...rest }) => (
  <TouchableOpacity {...rest} style={[styles.button, rest.style, { opacity: isDisabled ? 0.5 : 1 }]}>
    <Text fontSize={theme.fontSizes.xl} color={theme.colors.planeWhite} fontWeight="600">
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#111',
    margin: theme.spacings.s,
    borderRadius: theme.borderRadiuses.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
