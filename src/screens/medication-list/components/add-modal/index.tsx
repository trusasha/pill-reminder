import FloatingAddModal from 'components/floating-add-modal';
import Text from 'components/text';
import React from 'react';

const AddModal = () => {
  return (
    <FloatingAddModal
      title="New medication"
      submitLabel="Add"
      onAdd={() => {}}
      buttonSize={64}
      content={<Text>Ass</Text>}
    />
  );
};

export default AddModal;
