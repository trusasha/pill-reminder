import Button from 'components/button';
import CountInput from 'components/count-input';
import FloatingAddModal, { FloatingModalMethods } from '5-entites/medications/ui/floating-modal';
import TextInput from 'components/text-input';
import React, { FC, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import storage from 'services/storage';
import { SpacingStyles, theme } from 'theme';

interface Props {
  medication: Entities.Medication;
  onSubmit: (medication: Entities.Medication) => void;
}

const MODAL_OFFSET = { x: 0, y: 125 };

const EditModal: FC<Props> = ({ medication, onSubmit }) => {
  const floatingModalRef = useRef<FloatingModalMethods>(null);

  const [name, setName] = useState(medication.name);
  const [description, setDescription] = useState(medication.description);

  const [currentCount, setCurrentCount] = useState(medication.currentCount);
  const [destinationCount, setDestinationCount] = useState(medication.destinationCount);

  const onEdit = () =>
    storage
      .updateMedication({
        id: medication.id,
        name,
        description,
        currentCount,
        destinationCount,
      })
      .then(data => {
        onSubmit(data);

        floatingModalRef.current?.close();
      })
      .catch(error =>
        Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom' }),
      );

  const isAddDisabled = !name || !destinationCount || currentCount > destinationCount;

  return (
    <FloatingAddModal
      ref={floatingModalRef}
      title="Edit medication"
      contentContainerStyle={styles.content}
      offset={MODAL_OFFSET}
      buttonSize={64}
      icon="edit"
      content={
        <>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <TextInput
              placeholder="Enter a medication name..."
              label="Name"
              value={name}
              onChangeText={setName}
              style={SpacingStyles.mb.m}
            />
            <TextInput
              placeholder="Enter a medication description..."
              label="Description"
              value={description}
              onChangeText={setDescription}
              style={SpacingStyles.mb.m}
            />
            <CountInput
              style={SpacingStyles.mb.m}
              count={currentCount}
              setCount={setCurrentCount}
              label="Current count"
            />
            <CountInput
              style={SpacingStyles.mb.m}
              count={destinationCount}
              setCount={setDestinationCount}
              label="Destination count"
            />
          </ScrollView>
          <Button style={styles.button} label="Submit" onPress={onEdit} isDisabled={isAddDisabled} />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme.spacings.m,
  },
  button: {
    marginHorizontal: -8,
  },
});

export default EditModal;
