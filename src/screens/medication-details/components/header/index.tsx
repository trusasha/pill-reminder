import Text from 'components/text';
import moment from 'moment';
import React, { FC, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from 'theme';
import ButtonsBlock from '../buttons-block';

interface Props {
  additionalStyles?: ViewProps['style'];
}

const Header: FC<
  Props &
    Pick<
      Entities.Medication,
      'name' | 'description' | 'currentCount' | 'destinationCount' | 'createdAt' | 'id'
    >
> = ({ name, description, currentCount, destinationCount, createdAt, id, additionalStyles }) => {
  return (
    <Animated.View style={[styles.header, additionalStyles]} entering={FadeIn}>
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.text}>Added: {moment(createdAt).format('DD/MM/YYYY')}</Text>
        <Text style={styles.text}>Current count: {currentCount}</Text>
        <Text style={styles.text}>Target count: {destinationCount}</Text>
      </View>
      <ButtonsBlock id={id} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  header: {
    flex: 1,
    backgroundColor: theme.colors.planeWhite,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.stroke,
    fontSize: 38,
    marginBottom: 12,
    fontWeight: '600',
  },
  description: {
    color: theme.colors.stroke,
    fontSize: 20,
    marginBottom: 40,
    fontWeight: '500',
  },
  text: {
    color: theme.colors.stroke,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '400',
  },
});

export default memo(Header);
