import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MainStack from 'navigation/main-stack';
import { ThemeProvider } from 'theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
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
