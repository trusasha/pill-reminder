import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MainStack from 'navigation/main-stack';
import { ThemeProvider } from 'theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ThemeProvider>
          <MainStack />
        </ThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
