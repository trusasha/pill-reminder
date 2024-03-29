import { useRoute } from '@react-navigation/native';
import { RouteParams } from '1-app/navigation/constants/screen-params';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, ListRenderItem, StyleSheet } from 'react-native';
import storage from 'services/storage';
import { SpacingStyles } from 'theme';
import ToastService from 'services/toast';
import Notion from '5-entites/notions/ui/notion';
import Footer from './components/footer';
import EditModal from './components/edit-modal';
import Header from './components/header';

interface Callbacks {
  renderItem: ListRenderItem<Entities.Notion>;
  onAddNotion: (notion: Entities.Notion) => void;
}

const MedicationDetails = () => {
  const { params } = useRoute<RouteParams<'MEDICATION_DETAILS'>>();

  const [details, setDetails] = useState<Entities.Medication | null>(null);
  const [notions, setNotions] = useState<Entities.Notion[]>([]);

  const id = params?.id;

  const callbacks: Callbacks = useMemo(
    () => ({
      renderItem: ({ item }) => {
        return (
          <Notion additionalStyles={SpacingStyles.mb.s} text={item.text} createdAt={item.createdAt} />
        );
      },
      onAddNotion: (notion: Entities.Notion) => setNotions(state => [notion, ...state]),
    }),
    [id],
  );

  useEffect(() => {
    if (id) {
      storage.getMedication({ id }).then(setDetails).catch(ToastService.showErrorMessage);
      storage.getMedicationNotions({ id }).then(setNotions).catch(ToastService.showErrorMessage);
    }
  }, [id, callbacks]);

  return (
    <>
      {details && (
        <FlatList
          contentContainerStyle={styles.scrollContent}
          ListHeaderComponent={
            details && (
              <Header
                id={details.id}
                name={details.name}
                description={details.description}
                createdAt={details.createdAt}
                currentCount={details.currentCount}
                destinationCount={details.destinationCount}
                additionalStyles={styles.header}
              />
            )
          }
          data={notions}
          renderItem={callbacks.renderItem}
          keyExtractor={({ id }) => id}
        />
      )}
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
        <Footer onAddNotion={callbacks.onAddNotion} id={id} />
      </KeyboardAvoidingView>
      {details && <EditModal medication={details} onSubmit={setDetails} />}
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

export default MedicationDetails;
