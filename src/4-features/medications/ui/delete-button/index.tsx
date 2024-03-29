import { medicationsStorage } from '5-entites';
import { Button, ToastService } from '6-shared';
import { useNavigation } from '@react-navigation/native';
import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  id: string;
}

const DeleteButton: FC<Props> = ({ id }) => {
  const { goBack } = useNavigation();

  const onDelete = () =>
    medicationsStorage.deleteMedication({ id }).then(goBack).catch(ToastService.showErrorMessage);

  return (
    <View>
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

export default memo(DeleteButton);
