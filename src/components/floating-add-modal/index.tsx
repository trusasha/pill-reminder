import React, { FC } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { theme } from 'theme';
import Modal from './components/modal';
import AddButton from './components/add-button';
import useAnimatedPositionStyles from './hooks/use-animated-position-styles';
import Backdrop from './components/backdrop';
import useFloatingGestures from './hooks/use-floating-gestures';
import useFloatingSharedValues from './hooks/use-floating-shared-values';

interface Props {
  title: string;
  submitLabel: string;
  buttonSize: number;
  content: React.ReactNode;
  onAdd(): void;
}

const FloatingAddModal: FC<Props> = ({ title, submitLabel, buttonSize, content, onAdd }) => {
  const screenSize = useWindowDimensions();

  const { isOpened, isModalVisible, translateX, translateY, scale, progress } = useFloatingSharedValues({
    screenSize,
  });

  const { positionStyles } = useAnimatedPositionStyles({
    progress,
    translateX,
    translateY,
    buttonSize,
    scale,
    screenSize,
  });

  const { panGesture } = useFloatingGestures({ isOpened, translateX, translateY, scale });

  return (
    <>
      <Backdrop
        isVisible={isModalVisible}
        onPress={() => {
          isOpened.value = !isOpened.value;
        }}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.floatingModal, positionStyles]}>
          <Modal
            title={title}
            submitLabel={submitLabel}
            onAdd={onAdd}
            buttonSize={buttonSize}
            isVisible={isModalVisible}
          >
            {content}
          </Modal>
          <AddButton
            buttonSize={buttonSize}
            progress={progress}
            onPress={() => {
              isOpened.value = !isOpened.value;
            }}
          />
          <Animated.View />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  floatingModal: {
    backgroundColor: theme.colors.planeWhite,
    position: 'absolute',
    shadowColor: theme.colors.stroke,
    shadowRadius: 150,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    elevation: 7,
  },
});

export default FloatingAddModal;
