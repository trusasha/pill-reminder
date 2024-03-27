import { useRoute } from '@react-navigation/native';
import Text from 'components/text';
import moment from 'moment';
import { RouteParams } from 'navigation/constants/screen-params';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, ListRenderItem, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import storage from 'services/storage';
import { SpacingStyles, theme } from 'theme';
import ToastService from 'services/toast';
import Notion from 'components/notion';
import Footer from './components/footer';
import ButtonsBlock from './components/buttons-block';
import EditModal from './components/edit-modal';

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
            <Animated.View style={styles.header} entering={FadeIn}>
              <View style={styles.info}>
                <Text style={styles.title}>{details.name}</Text>
                <Text style={styles.description}>{details.description}</Text>
                <Text style={styles.text}>Added: {moment(details.createdAt).format('DD/MM/YYYY')}</Text>
                <Text style={styles.text}>Current count: {details.currentCount}</Text>
                <Text style={styles.text}>Target count: {details.destinationCount}</Text>
              </View>
              <ButtonsBlock id={id} />
            </Animated.View>
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
    marginBottom: 30,
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
  row: {
    flexDirection: 'row',
  },
});

export default MedicationDetails;
