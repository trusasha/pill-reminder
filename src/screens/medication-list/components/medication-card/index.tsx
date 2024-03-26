import React, { FC, useState } from 'react';
import Text from 'components/text';
import { SpacingStyles, theme } from 'theme';
import { StyleSheet, View } from 'react-native';
import CountInput from 'components/count-input';
import storage from 'services/storage';
import logger from 'utils/logger';
import moment from 'moment';
import Styled from './index.styled';
import ProgressBar from './components';

interface Props extends Entities.Medication {
  onPress: (id: Entities.Medication['id']) => void;
}

const MedicationCard: FC<Props> = ({
  onPress,
  id,
  name,
  description,
  destinationCount,
  currentCount,
  createdAt,
}) => {
  const [count, setCount] = useState(currentCount);

  return (
    <Styled.Container onPress={() => onPress(id)} style={SpacingStyles.mb.m} activeOpacity={0.7}>
      <Styled.Content>
        <View style={styles.flex}>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.title} fontSize={theme.fontSizes.xl} fontWeight="600">
              {name}
            </Text>
            <Text fontSize={theme.fontSizes.m} fontWeight="600">
              Created - {moment(createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
          {Boolean(description) && (
            <Text style={SpacingStyles.mb.s} fontSize={theme.fontSizes.l} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
      </Styled.Content>
      <ProgressBar currentValue={count} targetValue={destinationCount}>
        <CountInput
          count={count}
          setCount={value => {
            setCount(state => {
              if (state > value) {
                storage.decrementMedication({ id }).catch(logger.error);
              } else {
                if (state === destinationCount) {
                  return state;
                }

                storage.incrementMedication({ id }).catch(logger.error);
              }

              return value;
            });
          }}
        />
      </ProgressBar>
    </Styled.Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginRight: theme.spacings.s,
  },
  row: {
    flexDirection: 'row',
    marginBottom: theme.spacings.m,
  },
});

export default MedicationCard;
