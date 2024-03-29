import { notionsStorage } from '5-entites';
import { Button, TextInput, ToastService, theme } from '6-shared';
import React, { FC, memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  id: string;
  onAddNotion: (notion: Entities.Notion) => void;
}

const NoticeInput: FC<Props> = ({ id, onAddNotion }) => {
  const [comment, setComment] = useState('');

  const onSend = () => {
    notionsStorage
      .addNotion({
        medicationId: id,
        text: comment,
      })
      .then(data => {
        setComment('');

        onAddNotion(data);
      })
      .catch(ToastService.showErrorMessage);
  };

  return (
    <SafeAreaView style={styles.footer} edges={['bottom']}>
      <View style={styles.buttonRow}>
        <TextInput
          style={styles.input}
          placeholder="Your notion..."
          value={comment}
          onChangeText={setComment}
        />
        <View>
          <Button style={styles.button} iconSize={18} icon="addfile" onPress={onSend} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: theme.colors.planeWhite,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grayDivider,
  },
  input: {
    marginHorizontal: 8,
    height: 48,
    flex: 1,
  },
  button: {
    width: 48,
    height: 48,
  },
  buttonRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default memo(NoticeInput);
