import { Keyframe } from 'react-native-reanimated';

const counterEnteringDecrement = new Keyframe({
  0: {
    transform: [{ translateY: -20 }],
    opacity: 0,
  },
  60: {
    transform: [{ translateY: 20 / 3 }],
    opacity: 1,
  },
  100: {
    transform: [{ translateY: 0 }],
  },
});

const counterEnteringIncrement = new Keyframe({
  0: {
    transform: [{ translateY: 20 }],
    opacity: 0,
  },
  60: {
    transform: [{ translateY: -20 / 3 }],
    opacity: 1,
  },
  100: {
    transform: [{ translateY: 0 }],
  },
});

export { counterEnteringDecrement, counterEnteringIncrement };
