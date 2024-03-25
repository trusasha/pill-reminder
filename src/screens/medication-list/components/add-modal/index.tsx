import CountInput from 'components/count-input';
import FloatingAddModal, { FloatingModalMethods } from 'components/floating-add-modal';
import TextInput from 'components/text-input';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import storage from 'services/storage';
import { SpacingStyles, theme } from 'theme';

const AddModal = () => {
  const floatingModalRef = useRef<FloatingModalMethods>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [currentCount, setCurrentCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);

  const onAdd = useCallback(() => {
    storage
      .addMedication({
        name,
        description,
        initialCount: currentCount,
        currentCount,
        destinationCount,
      })
      .then(floatingModalRef.current?.close)
      .catch(error =>
        Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom' }),
      );
  }, []);

  return (
    <FloatingAddModal
      ref={floatingModalRef}
      title="New medication"
      submitLabel="Add"
      onAdd={onAdd}
      isAddDisabled={!name || !destinationCount}
      contentContainerStyle={styles.content}
      buttonSize={64}
      content={
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
      }
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme.spacings.m,
  },
});

export default AddModal;
