import { SpacingStyles, Text, theme } from '6-shared';
import moment from 'moment';
import React, { FC, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
  text: string;
  createdAt: string;
  additionalStyles?: ViewProps['style'];
}

const Notion: FC<Props> = ({ text, createdAt, additionalStyles }) => {
  return (
    <Animated.View entering={FadeIn} style={styles.row}>
      <View style={[styles.container, additionalStyles]}>
        <Text color={theme.colors.stroke} fontSize={theme.fontSizes.l} fontWeight="600">
          {text}
        </Text>
      </View>
      <Text style={SpacingStyles.ml.m}>{moment(createdAt).format('H:mm DD/MM')}</Text>
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
