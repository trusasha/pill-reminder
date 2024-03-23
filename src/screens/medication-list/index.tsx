import React from 'react';
import Text from 'components/text';
import { SpacingStyles } from 'theme';
import Styled from './index.styled';

const MedicationList = () => {
  return (
    <Styled.Container>
      <Text style={SpacingStyles.mb.m}>MEDICATION LIST</Text>
      <Text>MEDICATION LIST</Text>
    </Styled.Container>
  );
};

export default MedicationList;
