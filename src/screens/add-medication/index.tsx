import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import Styled from './index.styled';

const AddMedication = () => {
  const { goBack } = useNavigation();

  return (
    <Styled.Container>
      <Styled.ModalContainer sharedTransitionTag="add-medication-button" />
      <Styled.Backdrop onPress={goBack}>
        <BlurView intensity={25} style={styles.flex} />
      </Styled.Backdrop>
    </Styled.Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default AddMedication;
