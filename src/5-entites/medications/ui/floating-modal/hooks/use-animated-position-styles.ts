import { ScaledSize } from 'react-native';
import { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface Config {
  buttonSize: number;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  progress: SharedValue<number>;
  scale: Readonly<SharedValue<number>>;
  screenSize: ScaledSize;
  offset?: { x: number; y: number };
}

const useAnimatedPositionStyles = ({
  buttonSize,
  translateX,
  translateY,
  progress,
  scale,
  screenSize: { width: screenWidth, height: screenHeight },
  offset,
}: Config) => {
  const positionStyles = useAnimatedStyle(() => {
    const width = interpolate(
      progress.value,
      [0, 1],
      [buttonSize, screenWidth * 0.9],
      Extrapolation.CLAMP,
    );
    const height = interpolate(progress.value, [0, 1], [buttonSize, 480], Extrapolation.CLAMP);
    const rightDistance = interpolate(
      progress.value,
      [0, 1],
      [buttonSize / 2 + (offset?.x || 0), screenWidth * 0.05],
      Extrapolation.CLAMP,
    );
    const bottomDistance = interpolate(
      progress.value,
      [0, 1],
      [buttonSize / 2 + (offset?.y || 0), screenHeight / 2 - height / 2],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(progress.value, [0, 1], [32, 15], Extrapolation.CLAMP);

    return {
      width,
      height,
      bottom: bottomDistance,
      right: rightDistance,
      borderRadius,
      transform: [
        {
          scale: scale.value,
        },
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  }, [screenWidth, screenHeight]);

  return { positionStyles };
};

export default useAnimatedPositionStyles;
