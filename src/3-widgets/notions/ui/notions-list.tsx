import React, { FC, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import Notion from '5-entites/notions/ui/notion';
import { NoticeInput } from '4-features';
import { SpacingStyles, ToastService } from '6-shared';
import { notionsStorage } from '5-entites';

interface Callbacks {
  ListHeaderComponent: () => React.ReactNode;
  renderItem: ListRenderItem<Entities.Notion>;
  onAddNotion: (notion: Entities.Notion) => void;
}

interface Props {
  id: string;
  headerComponent: React.ReactNode;
}

const NotionsListWidget: FC<Props> = ({ id, headerComponent }) => {
  const [notions, setNotions] = useState<Entities.Notion[]>([]);

  const callbacks: Callbacks = useMemo(
    () => ({
      ListHeaderComponent: () => headerComponent,
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
      notionsStorage.getMedicationNotions({ id }).then(setNotions).catch(ToastService.showErrorMessage);
    }
  }, [id, callbacks]);

  return (
    <>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={callbacks.ListHeaderComponent}
        data={notions}
        renderItem={callbacks.renderItem}
        keyExtractor={item => item.id}
      />
      <NoticeInput id={id} onAddNotion={callbacks.onAddNotion} />
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
