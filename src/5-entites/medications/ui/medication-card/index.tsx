import React, { FC, memo } from 'react';
import Text from 'components/text';
import { SpacingStyles, theme } from 'theme';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import useNavigate from 'hooks/use-navigation';
import SCREENS from '1-app/navigation/constants/screens';
import Styled from './index.styled';

interface Props extends Pick<Entities.Medication, 'id' | 'name' | 'description' | 'createdAt'> {
  footerComponent?: React.ReactNode;
}

const MedicationCardEntity: FC<Props> = ({ id, name, description, createdAt, footerComponent }) => {
  const navigate = useNavigate();

  const onPress = (itemId: Entities.Medication['id']) =>
    navigate(SCREENS.MEDICATION_DETAILS, { id: itemId });

  return (
    <Styled.Container onPress={() => onPress(id)} style={SpacingStyles.mb.m} activeOpacity={0.7}>
      <Styled.Content>
        <View style={styles.flex}>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.title} fontSize={theme.fontSizes.xl} fontWeight="600">
              {name}
            </Text>
            <Text fontSize={theme.fontSizes.m} fontWeight="600">
              Created - {moment(createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
          {Boolean(description) && (
            <Text style={SpacingStyles.mb.s} fontSize={theme.fontSizes.l} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
      </Styled.Content>
      {footerComponent}
    </Styled.Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginRight: theme.spacings.s,
  },
  row: {
    flexDirection: 'row',
    marginBottom: theme.spacings.m,
  },
});

export default memo(MedicationCardEntity);
