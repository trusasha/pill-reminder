import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import SCREENS from '../constants/screens';
import BottomTabs from './bottom-tabs';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const MainStack = () => (
  <Stack.Navigator initialRouteName={SCREENS.TABS} screenOptions={options}>
    <Stack.Screen name={SCREENS.TABS} component={BottomTabs} />
  </Stack.Navigator>
);

export default MainStack;
