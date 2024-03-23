import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MainStack from 'navigation/main-stack';
import { ThemeProvider } from 'theme';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <MainStack />
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
