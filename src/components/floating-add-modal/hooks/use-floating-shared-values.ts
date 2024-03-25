import { ScaledSize } from 'react-native';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

interface Config {
  screenSize: ScaledSize;
}

const useFloatingSharedValues = ({
  screenSize: { width: screenWidth, height: screenHeight },
}: Config) => {
  const isOpened = useSharedValue(false);

  const progress = useDerivedValue(() => withTiming(isOpened.value ? 1 : 0), []);
  const isModalVisible = useDerivedValue(() => progress.value === 1, []);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const maxDistance = Math.sqrt(screenWidth ** 2 + screenHeight ** 2);
  const scale = useDerivedValue(() => {
    const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
    const normalizedDistance = distance / maxDistance;
    return 1 - normalizedDistance;
  }, [maxDistance]);

  return { isModalVisible, isOpened, progress, translateX, translateY, scale };
};

export default useFloatingSharedValues;
