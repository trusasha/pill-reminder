import { NotionsListWidget } from '3-widgets';
import { DeleteButton, MedicationGeneralInfo } from '4-features';
import { SpacingStyles, RouteParams } from '6-shared';
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
      headerComponent={
        <MedicationGeneralInfo
          rightComponent={<DeleteButton id={id} />}
          additionalStyles={SpacingStyles.mb.m}
          id={id}
        />
      }
    />
  );
};

export default MedicationsDetails;
