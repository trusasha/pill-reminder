import Text from 'components/text';
import moment from 'moment';
import React, { FC, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { SpacingStyles, theme } from 'theme';

interface Props {
  text: string;
  createdAt: string;
  additionalStyles?: ViewProps['style'];
}

const Notion: FC<Props> = ({ text, createdAt, additionalStyles }) => {
  return (
    <Animated.View entering={FadeIn} layout={LinearTransition} style={styles.row}>
      <View style={[styles.container, additionalStyles]}>
        <Text color={theme.colors.stroke} fontSize={theme.fontSizes.l} fontWeight="600">
          {text}
        </Text>
      </View>
      <Text style={SpacingStyles.ml.m}>{moment(createdAt).format('mm:hh DD/MM')}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.planeWhite,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default memo(Notion);
