import { FloatingModal, FloatingModalMethods, medicationsStorage } from '5-entites';
import { Button, CountInput, SpacingStyles, TextInput, ToastService, theme } from '6-shared';
import React, { FC, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  onAddMedication(): void;
}

const AddModal: FC<Props> = ({ onAddMedication }) => {
  const floatingModalRef = useRef<FloatingModalMethods>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [currentCount, setCurrentCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);

  const onAdd = () =>
    medicationsStorage
      .addMedication({
        name,
        description,
        initialCount: currentCount,
        currentCount,
        destinationCount,
      })
      .then(() => {
        setName('');
        setDescription('');
        setCurrentCount(0);
        setDestinationCount(0);

        floatingModalRef.current?.close();

        onAddMedication();
      })
      .catch(ToastService.showErrorMessage);

  const isAddDisabled = !name || !destinationCount || currentCount > destinationCount;

  return (
    <FloatingModal
      ref={floatingModalRef}
      title="New medication"
      contentContainerStyle={styles.content}
      buttonSize={64}
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
          <Button style={styles.button} label="Add" onPress={onAdd} isDisabled={isAddDisabled} />
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

export default AddModal;
