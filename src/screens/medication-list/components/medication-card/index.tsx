import React, { FC } from 'react';
import Text from 'components/text';
import { SpacingStyles, theme } from 'theme';
import { View } from 'react-native';
import Styled from './index.styled';

const MedicationCard: FC<Entities.Medication> = ({
  name,
  description,
  destinationCount,
  currentCount,
  initialCount,
  createdAt,
  updatedAt,
}) => {
  return (
    <Styled.Container activeOpacity={0.7}>
      <Styled.Content>
        <View>
          <Text style={SpacingStyles.mb.m} fontSize={theme.fontSizes.xl} fontWeight="600">
            {name}
          </Text>
          {Boolean(description) && (
            <Text style={SpacingStyles.mb.s} fontSize={theme.fontSizes.l} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
      </Styled.Content>
      <Styled.Bottom />
    </Styled.Container>
  );
};

export default MedicationCard;
