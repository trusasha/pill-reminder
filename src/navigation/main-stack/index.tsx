import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AddMedication from 'screens/add-medication';
import MedicationDetails from 'screens/medication-details';
import { theme } from 'theme';
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

const optionsWithHeader: NativeStackNavigationOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.stroke,
};

const MainStack = () => (
  <Stack.Navigator initialRouteName={SCREENS.TABS} screenOptions={options}>
    <Stack.Screen name={SCREENS.TABS} component={BottomTabs} />
    <Stack.Screen name={SCREENS.MEDICATION_ADD} component={AddMedication} options={modalOptions} />
    <Stack.Screen
      name={SCREENS.MEDICATION_DETAILS}
      options={{ ...optionsWithHeader, headerTitle: 'Details' }}
      component={MedicationDetails}
    />
  </Stack.Navigator>
);

export default MainStack;
