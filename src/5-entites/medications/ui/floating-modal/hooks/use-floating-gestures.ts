/* eslint-disable no-param-reassign */
import { Gesture } from 'react-native-gesture-handler';
import { SharedValue, withSpring } from 'react-native-reanimated';

interface Config {
  isOpened: SharedValue<boolean>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: Readonly<SharedValue<number>>;
}

const useFloatingGestures = ({ isOpened, translateX, translateY, scale }: Config) => {
  const panGesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY }) => {
      if (!isOpened.value) return;

      translateX.value = translationX;
      translateY.value = translationY;
    })
    .onFinalize(event => {
      if (!isOpened.value) return;

      const isDraggingDown = event.translationY > 0;
      const isDraggingDownEnoughToClose = isDraggingDown && scale.value < 0.95;

      if (isDraggingDownEnoughToClose) {
        isOpened.value = false;
      }

      translateX.value = withSpring(0, {
        overshootClamping: true,
      });
      translateY.value = withSpring(0, {
        overshootClamping: true,
      });
    });

  return { panGesture };
};

export default useFloatingGestures;
