import { theme } from '6-shared/theme';
import React, { FC } from 'react';
import { TouchableOpacityProps, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../text';
import Icon from '../icon';

interface Props extends Omit<TouchableOpacityProps, 'disabled'> {
  label?: string;
  icon?: string;
  isDisabled?: boolean;
  iconSize?: number;
  type?: 'primary' | 'danger';
}

const Button: FC<Props> = ({ label, icon, isDisabled, iconSize = 24, type = 'primary', ...rest }) => {
  const containerStyle = getContainerStylesByType(type);

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      style={[styles.button, containerStyle, rest.style, { opacity: isDisabled ? 0.5 : 1 }]}
    >
      {Boolean(label) && (
        <Text fontSize={theme.fontSizes.xl} color={theme.colors.planeWhite} fontWeight="600">
          {label}
        </Text>
      )}
      {icon && <Icon name={icon} size={iconSize} color={theme.colors.white} />}
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
