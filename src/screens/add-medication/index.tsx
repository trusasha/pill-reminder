import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'components/icon';
import { SpacingStyles, theme } from 'theme';
import Text from 'components/text';
import Styled from './index.styled';

const AddMedication = () => {
  const { goBack } = useNavigation();

  const contentOpacity = useSharedValue(0);

  const contentStyles = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const onBack = () => {
    contentOpacity.value = withTiming(0, undefined, () => {
      'worklet';

      runOnJS(goBack)();
    });
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     contentOpacity.value = withTiming(1);
  //   }, 500);
  // }, []);

  return (
    <Styled.Container>
      <Styled.ModalContainer sharedTransitionTag="add-medication-button">
        <Styled.IconContainer onPress={onBack} sharedTransitionTag="add-medication-icon">
          <Icon name="plus" color={theme.colors.stroke} size={24} />
        </Styled.IconContainer>
        <Animated.View style={contentStyles}>
          <Text fontSize={theme.fontSizes.xl} fontWeight="600" style={SpacingStyles.mb.m}>
            Add medication
          </Text>
        </Animated.View>
      </Styled.ModalContainer>
      <Styled.Backdrop onPress={onBack}>
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
