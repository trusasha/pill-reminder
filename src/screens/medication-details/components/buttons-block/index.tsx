import { useNavigation } from '@react-navigation/native';
import Button from 'components/button';
import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import storage from 'services/storage';

interface Props {
  id: string;
}

const ButtonsBlock: FC<Props> = ({ id }) => {
  const { goBack } = useNavigation();

  const onDelete = () =>
    storage
      .deleteMedication({ id })
      .then(goBack)
      .catch(error =>
        Toast.show({ type: 'error', text1: 'Error', text2: error.message, position: 'bottom' }),
      );

  return (
    <View>
      <Button style={styles.button} icon="edit" />
      <Button style={styles.button} icon="delete" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
  },
});

export default memo(ButtonsBlock);
