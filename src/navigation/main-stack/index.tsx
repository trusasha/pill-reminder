import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AddMedication from 'screens/add-medication';
import SCREENS from '../constants/screens';
import BottomTabs from './bottom-tabs';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
};

const modalOptions: NativeStackNavigationOptions = {
  headerShown: false,
  presentation: 'transparentModal',
};

const MainStack = () => (
  <Stack.Navigator initialRouteName={SCREENS.TABS} screenOptions={options}>
    <Stack.Screen name={SCREENS.TABS} component={BottomTabs} />
    <Stack.Screen name={SCREENS.MEDICATION_ADD} component={AddMedication} options={modalOptions} />
  </Stack.Navigator>
);

export default MainStack;
