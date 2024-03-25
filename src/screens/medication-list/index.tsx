import React, { useEffect, useState } from 'react';
import Text from 'components/text';
import { SpacingStyles, theme } from 'theme';
import storage from 'services/storage';
import logger from 'utils/logger';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import Styled from './index.styled';
import MedicationCard from './components/medication-card';
import AddModal from './components/add-modal';

const MedicationList = () => {
  logger.log(storage.isReady);

  const [items, setItems] = useState<Entities.Medication[]>([]);

  const renderItem: ListRenderItem<Entities.Medication> = ({
    item: {
      id,
      name,
      description,
      color,
      currentCount,
      initialCount,
      destinationCount,
      createdAt,
      updatedAt,
    },
  }) => {
    return (
      <MedicationCard
        id={id}
        name={name}
        description={description}
        color={color}
        initialCount={initialCount}
        destinationCount={destinationCount}
        currentCount={currentCount}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    );
  };

  useEffect(() => {
    storage.getAllMedications().then(setItems).catch(logger.error);
  }, []);

  return (
    <Styled.Container>
      <FlatList
        data={items}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text fontSize={theme.fontSizes.xxl} fontWeight="700" style={SpacingStyles.mb.xxl}>
            MEDICATION LIST
          </Text>
        }
        style={styles.listContent}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
      />
      <AddModal />
    </Styled.Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    ...SpacingStyles.p.m,
  },
});

export default MedicationList;
