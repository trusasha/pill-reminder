import React, { useCallback, useEffect, useState } from 'react';
import Text from 'components/text';
import { SpacingStyles, theme } from 'theme';
import storage from 'services/storage';
import logger from 'utils/logger';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import useNavigate from 'hooks/use-navigation';
import SCREENS from 'navigation/constants/screens';
import Styled from './index.styled';
import MedicationCard from './components/medication-card';
import AddModal from './components/add-modal';

const MedicationList = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<Entities.Medication[]>([]);

  const onPress = (id: Entities.Medication['id']) => navigate(SCREENS.MEDICATION_DETAILS, { id });

  const renderItem: ListRenderItem<Entities.Medication> = ({
    item: { id, name, description, currentCount, initialCount, destinationCount, createdAt, updatedAt },
  }) => {
    return (
      <MedicationCard
        onPress={onPress}
        id={id}
        name={name}
        description={description}
        initialCount={initialCount}
        destinationCount={destinationCount}
        currentCount={currentCount}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    );
  };

  const fetchData = useCallback(() => {
    storage.getAllMedications().then(setItems).catch(logger.error);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

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
        style={styles.listContent}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
      />
      <AddModal onAddMedication={fetchData} />
    </Styled.Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    ...SpacingStyles.p.m,
  },
});

export default MedicationList;
