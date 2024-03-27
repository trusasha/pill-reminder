import Text from 'components/text';
import React, { FC } from 'react';
import { TouchableOpacityProps, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from 'theme';

interface Props extends Omit<TouchableOpacityProps, 'disabled'> {
  label: string;
  isDisabled?: boolean;
  type?: 'primary' | 'danger';
}

const Button: FC<Props> = ({ label, isDisabled, type = 'primary', ...rest }) => {
  const containerStyle = getContainerStylesByType(type);

  return (
    <TouchableOpacity
      {...rest}
      style={[styles.button, containerStyle, rest.style, { opacity: isDisabled ? 0.5 : 1 }]}
    >
      <Text fontSize={theme.fontSizes.xl} color={theme.colors.planeWhite} fontWeight="600">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const getContainerStylesByType = (type: Props['type']) => {
  switch (type) {
    case 'primary':
      return styles.primary;
    case 'danger':
      return styles.dangerContainer;
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#111',
    margin: theme.spacings.s,
    borderRadius: theme.borderRadiuses.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#111',
  },
  dangerContainer: {
    backgroundColor: '#DE2B2B',
  },
});

export default Button;
