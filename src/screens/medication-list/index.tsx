import React, { useEffect, useState } from 'react';
import Text from 'components/text';
import { SpacingStyles, theme } from 'theme';
import storage from 'services/storage';
import logger from 'utils/logger';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import SCREENS from 'navigation/constants/screens';
import useNavigate from 'hooks/use-navigation';
import Styled from './index.styled';
import MedicationCard from './components/medication-card';

const MedicationList = () => {
  logger.log(storage.isReady);

  const navigate = useNavigate();

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
      <Styled.AddButton
        onPress={() => navigate(SCREENS.MEDICATION_ADD)}
        sharedTransitionTag="add-medication-button"
      />
    </Styled.Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    ...SpacingStyles.p.m,
  },
});

export default MedicationList;
