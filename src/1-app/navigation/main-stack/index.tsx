import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { theme } from 'theme';
import { MedicationsDetails } from '2-screens';
import SCREENS from '../constants/screens';
import BottomTabs from './bottom-tabs';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
};

const optionsWithHeader: NativeStackNavigationOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.stroke,
};

const MainStack = () => (
  <Stack.Navigator initialRouteName={SCREENS.TABS} screenOptions={options}>
    <Stack.Screen name={SCREENS.TABS} component={BottomTabs} />
    <Stack.Screen
      name={SCREENS.MEDICATION_DETAILS}
      options={{ ...optionsWithHeader, headerTitle: 'Details' }}
      component={MedicationsDetails}
    />
  </Stack.Navigator>
);

export default MainStack;
