import { RouteParams } from '1-app/navigation/constants/screen-params';
import { NotionsListWidget } from '3-widgets';
import { MedicationGeneralInfo } from '4-features';
import { SpacingStyles } from '6-shared';
import { useRoute } from '@react-navigation/native';
import React from 'react';

const MedicationsDetails = () => {
  const { params } = useRoute<RouteParams<'MEDICATION_DETAILS'>>();

  const id = params?.id;

  if (!id) {
    return null;
  }

  return (
    <NotionsListWidget
      id={id}
      headerComponent={<MedicationGeneralInfo additionalStyles={SpacingStyles.mb.m} id={id} />}
    />
  );
};

export default MedicationsDetails;
