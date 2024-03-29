import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MainStack from '1-app/navigation/main-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from '6-shared';
import { usePersistedNavigationState } from '1-app';

function App(): React.JSX.Element {
  const { isReady, initialState, onStateChange } = usePersistedNavigationState();

  if (!isReady) {
    return <View />;
  }

  return (
    <NavigationContainer initialState={initialState} onStateChange={onStateChange}>
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
