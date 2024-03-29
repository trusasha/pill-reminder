import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import MainStack from '1-app/navigation/main-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Linking, Platform, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '6-shared';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

function App(): React.JSX.Element {
  const [isReady, setIsReady] = useState(Platform.OS === 'web'); // Don't persist state on web since it's based on URL
  const [initialState, setInitialState] = useState();

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

  if (!isReady) {
    return <View />;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
    >
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.flex}>
          <ThemeProvider>
            <MainStack />
            <Toast />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
