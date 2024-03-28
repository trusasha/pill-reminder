import React, { useCallback, useState } from 'react';
import { SectionList, SectionListProps } from 'react-native';
import storage from 'services/storage';
import { SpacingStyles, theme } from 'theme';
import Text from 'components/text';
import ToastService from 'services/toast';
import Notion from 'components/notion';
import { useFocusEffect } from '@react-navigation/native';
import Styled from './index.styled';

const renderItem: SectionListProps<Entities.Notion>['renderItem'] = ({ item }) => (
  <Notion additionalStyles={SpacingStyles.mb.m} text={item.text} createdAt={item.createdAt} />
);

const renderSectionHeader: SectionListProps<Entities.Notion>['renderSectionHeader'] = ({
  section: { title },
}) => (
  <Text
    fontSize={theme.fontSizes.xxl}
    color={theme.colors.stroke}
    fontWeight="700"
    style={SpacingStyles.mb.xl}
  >
    {title}
  </Text>
);

const ListHeaderComponent = (
  <Text fontSize={theme.fontSizes.xxl} fontWeight="700" style={SpacingStyles.mb.xxl}>
    MEDICATION LIST
  </Text>
);

const MedicationNotes = () => {
  const [sections, setSections] = useState<Entities.NoticeSection[]>([]);

  useFocusEffect(
    useCallback(() => {
      storage.getMedicationSectionNotices().then(setSections).catch(ToastService.showErrorMessage);
    }, []),
  );

  return (
    <Styled.Container edges={['top']}>
      <SectionList
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={SpacingStyles.pv.m}
        ListHeaderComponent={ListHeaderComponent}
        style={SpacingStyles.p.m}
        renderItem={renderItem}
        keyExtractor={item => item.createdAt}
      />
    </Styled.Container>
  );
};

export default MedicationNotes;
