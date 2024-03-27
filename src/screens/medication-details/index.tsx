import { useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/button';
import Text from 'components/text';
import { RouteParams } from 'navigation/constants/screen-params';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import storage from 'services/storage';
import { theme } from 'theme';

const MedicationDetails = () => {
  const { goBack } = useNavigation();
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

  const onDelete = () =>
    storage
      .deleteMedication({ id })
      .then(goBack)
      .catch(error =>
        Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom' }),
      );

  return (
    <>
      {details && (
        <Animated.View style={styles.content} entering={FadeIn}>
          <Text style={styles.title}>{details.name}</Text>
          <Text>{details.description}</Text>
        </Animated.View>
      )}
      <SafeAreaView style={styles.footer} edges={['bottom']}>
        <Button label="Edit" />
        <Button label="Delete" type="danger" onPress={onDelete} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    flex: 1,
  },
  title: {
    color: theme.colors.stroke,
    fontSize: 38,
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: theme.colors.planeWhite,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grayDivider,
  },
});

export default MedicationDetails;
