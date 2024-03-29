import React, { FC, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import Notion from '5-entites/notions/ui/notion';
import { DeleteButton, MedicationGeneralInfo, NoticeInput } from '4-features';
import { medicationsStorage, notionsStorage } from '5-entites';
import { SpacingStyles, ToastService } from '6-shared';
import EditModal from '4-features/medications/ui/edit-modal';

interface Callbacks {
  renderItem: ListRenderItem<Entities.Notion>;
  onAddNotion: (notion: Entities.Notion) => void;
}

interface Props {
  id: string;
  headerComponent: React.ReactNode;
}

const NotionsListWidget: FC<Props> = ({ id, headerComponent }) => {
  const [notions, setNotions] = useState<Entities.Notion[]>([]);
  const [medication, setMedication] = useState<Entities.Medication | null>(null);

  const callbacks: Callbacks = useMemo(
    () => ({
      renderItem: ({ item }) => {
        return (
          <Notion additionalStyles={SpacingStyles.mb.s} text={item.text} createdAt={item.createdAt} />
        );
      },
      onAddNotion: (notion: Entities.Notion) => setNotions(state => [notion, ...state]),
    }),
    [id, headerComponent],
  );

  useEffect(() => {
    if (id) {
      medicationsStorage.getMedication({ id }).then(setMedication).catch(ToastService.showErrorMessage);
      notionsStorage.getMedicationNotions({ id }).then(setNotions).catch(ToastService.showErrorMessage);
    }
  }, [id, callbacks]);

  return (
    <>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={() =>
          medication && (
            <MedicationGeneralInfo
              rightComponent={<DeleteButton id={id} />}
              additionalStyles={SpacingStyles.mb.m}
              medication={medication}
            />
          )
        }
        data={notions}
        renderItem={callbacks.renderItem}
        keyExtractor={item => item.id}
      />
      {medication && (
        <>
          <EditModal medication={medication} onSubmit={setMedication} />
          <NoticeInput id={id} onAddNotion={callbacks.onAddNotion} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
});

export default NotionsListWidget;
