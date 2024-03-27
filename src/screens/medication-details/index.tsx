import { useRoute } from '@react-navigation/native';
import Text from 'components/text';
import moment from 'moment';
import { RouteParams } from 'navigation/constants/screen-params';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import storage from 'services/storage';
import { theme } from 'theme';
import Footer from './components/footer';
import ButtonsBlock from './components/buttons-block';

const MedicationDetails = () => {
  const { params } = useRoute<RouteParams<'MEDICATION_DETAILS'>>();

  const [details, setDetails] = useState<Entities.Medication | null>(null);

  const id = params?.id;

  useEffect(() => {
    if (id) {
      storage
        .getMedication({ id })
        .then(setDetails)
        .catch(error =>
          Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom' }),
        );
    }
  }, [id]);

  return (
    <>
      {details && (
        <Animated.View style={styles.content} entering={FadeIn}>
          <View>
            <Text style={styles.title}>{details.name}</Text>
            <Text style={styles.description}>{details.description}</Text>
            <Text style={styles.text}>Added: {moment(details.createdAt).format('DD/MM/YYYY')}</Text>
            <Text style={styles.text}>Current count: {details.currentCount}</Text>
            <Text style={styles.text}>Target count: {details.destinationCount}</Text>
          </View>
          <ButtonsBlock id={id} />
        </Animated.View>
      )}
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
        <Footer id={id} />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    flex: 1,
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
  row: {
    flexDirection: 'row',
  },
});

export default MedicationDetails;
