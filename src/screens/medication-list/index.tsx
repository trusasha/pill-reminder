import React, { useEffect } from 'react';
import Text from 'components/text';
import { SpacingStyles } from 'theme';
import storage from 'services/storage';
import logger from 'utils/logger';
import { Button } from 'react-native';
import Styled from './index.styled';

const MedicationList = () => {
  logger.log(storage.isReady);

  useEffect(() => {
    storage.getAllMedications().then(data => {
      logger.deep('DB: ', data);
    });
  }, []);

  return (
    <Styled.Container>
      <Text style={SpacingStyles.mb.m}>MEDICATION LIST</Text>
      <Text>MEDICATION LIST</Text>
      <Button
        title="ADD"
        onPress={() =>
          storage
            .addMedication({
              name: 'Test name',
              description: 'test description',
              color: 'red',
              destinationCount: 10,
              initialCount: 0,
              currentCount: 0,
            })
            .then(logger.deep)
            .catch(logger.error)
        }
      />
    </Styled.Container>
  );
};

export default MedicationList;
