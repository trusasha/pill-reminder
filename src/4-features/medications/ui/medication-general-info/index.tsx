import { medicationsStorage } from '5-entites';
import { Text, ToastService, theme } from '6-shared';
import moment from 'moment';
import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
  rightComponent?: React.ReactNode;
  additionalStyles?: ViewProps['style'];
}

const MedicationGeneralInfo: FC<Props & Pick<Entities.Medication, 'id'>> = ({
  id,
  rightComponent,
  additionalStyles,
}) => {
  const [medication, setMedication] = useState<Entities.Medication | null>(null);

  useEffect(() => {
    if (id) {
      medicationsStorage.getMedication({ id }).then(setMedication).catch(ToastService.showErrorMessage);
    }
  }, [id]);

  if (!medication) {
    return null;
  }

  return (
    <Animated.View style={[styles.header, additionalStyles]} entering={FadeIn}>
      <View style={styles.info}>
        <Text style={styles.title}>{medication.name}</Text>
        <Text style={styles.description}>{medication.description}</Text>
        <Text style={styles.text}>Added: {moment(medication.createdAt).format('DD/MM/YYYY')}</Text>
        <Text style={styles.text}>Current count: {medication.currentCount}</Text>
        <Text style={styles.text}>Target count: {medication.destinationCount}</Text>
      </View>
      {rightComponent}
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

export default memo(MedicationGeneralInfo);
