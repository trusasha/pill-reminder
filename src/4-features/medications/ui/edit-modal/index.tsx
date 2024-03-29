import { FloatingModal, FloatingModalMethods, medicationsStorage } from '5-entites';
import { Button, CountInput, SpacingStyles, TextInput, ToastService, theme } from '6-shared';
import React, { FC, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
    medicationsStorage
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
      .catch(ToastService.showErrorMessage);

  const isAddDisabled = !name || !destinationCount || currentCount > destinationCount;

  return (
    <FloatingModal
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
