import React, { useCallback, useState } from 'react';
import Text from 'components/text';
import { SpacingStyles, theme } from 'theme';
import storage from 'services/storage';
import logger from 'utils/logger';
import { FlatList, ListRenderItem } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Styled from './index.styled';
import MedicationCard from './components/medication-card';
import AddModal from './components/add-modal';

const MedicationList = () => {
  const [items, setItems] = useState<Entities.Medication[]>([]);

  const renderItem: ListRenderItem<Entities.Medication> = useCallback(
    ({
      item: {
        id,
        name,
        description,
        currentCount,
        initialCount,
        destinationCount,
        createdAt,
        updatedAt,
      },
    }) => (
      <MedicationCard
        id={id}
        name={name}
        description={description}
        initialCount={initialCount}
        destinationCount={destinationCount}
        currentCount={currentCount}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    ),
    [],
  );

  const fetchData = useCallback(() => {
    storage.getAllMedications().then(setItems).catch(logger.error);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return (
    <Styled.Container edges={['top']}>
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
      <AddModal onAddMedication={fetchData} />
    </Styled.Container>
  );
};

export default MedicationList;
