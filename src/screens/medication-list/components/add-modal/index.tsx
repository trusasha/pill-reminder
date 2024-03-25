import Button from 'components/button';
import CountInput from 'components/count-input';
import FloatingAddModal, { FloatingModalMethods } from 'components/floating-add-modal';
import TextInput from 'components/text-input';
import React, { FC, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import storage from 'services/storage';
import { SpacingStyles, theme } from 'theme';

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
    storage
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
      .catch(error =>
        Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom' }),
      );

  const isAddDisabled = !name || !destinationCount;

  return (
    <FloatingAddModal
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
