import { useRoute } from '@react-navigation/native';
import Text from 'components/text';
import { RouteParams } from 'navigation/constants/screen-params';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import storage from 'services/storage';

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
    <SafeAreaView>
      {details && (
        <Animated.View>
          <Text>{details.name}</Text>
          <Text>{details.description}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default MedicationDetails;
