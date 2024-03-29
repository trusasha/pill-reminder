import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainerProps } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const usePersistedNavigationState = () => {
  const [isReady, setIsReady] = useState(Platform.OS === 'web');
  const [initialState, setInitialState] = useState();

  const onStateChange: NavigationContainerProps['onStateChange'] = state =>
    AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  return { isReady, initialState, onStateChange };
};

export default usePersistedNavigationState;
