import React, { FC } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { IconProps } from 'react-native-vector-icons/Icon';

const Icon: FC<IconProps> = ({ ...rest }) => <AntDesign {...rest} />;

export default Icon;
