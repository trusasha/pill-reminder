import FloatingAddModal from 'components/floating-add-modal';
import TextInput from 'components/text-input';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SpacingStyles, theme } from 'theme';

// initialCount: number;
// destinationCount: number;
// currentCount: number;

const AddModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <FloatingAddModal
      title="New medication"
      submitLabel="Add"
      onAdd={() => {}}
      contentContainerStyle={styles.content}
      buttonSize={64}
      content={
        <>
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
          />
        </>
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
