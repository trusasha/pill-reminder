import { AddModal, MedicationCard } from '4-features';
import { medicationsStorage } from '5-entites';
import { SpacingStyles, Text, logger, theme } from '6-shared';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MedicationsListWidget = () => {
  const [items, setItems] = useState<Entities.Medication[]>([]);

  const getMedications = useCallback(() => {
    medicationsStorage.getAllMedications().then(setItems).catch(logger.error);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getMedications();
    }, [getMedications]),
  );

  const renderItem: ListRenderItem<Entities.Medication> = useCallback(
    ({ item: { id, name, description, currentCount, initialCount, destinationCount, createdAt } }) => (
      <MedicationCard
        id={id}
        name={name}
        description={description}
        currentCount={currentCount}
        initialCount={initialCount}
        destinationCount={destinationCount}
        createdAt={createdAt}
      />
    ),
    [],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.flex}>
      <FlatList
        data={items}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={SpacingStyles.pv.m}
        ListHeaderComponent={
          <Text fontSize={theme.fontSizes.xxl} fontWeight="700" style={SpacingStyles.mb.xxl}>
            MEDICATION LIST
          </Text>
        }
        style={SpacingStyles.p.m}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
      />
      <AddModal onAddMedication={getMedications} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default MedicationsListWidget;
