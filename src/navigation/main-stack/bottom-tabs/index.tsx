import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from 'navigation/constants/screens';
import MedicationList from 'screens/medication-list';
import MedicationNotes from 'screens/medication-notes';

const Tab = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
  headerShown: false,
};

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName={SCREENS.TABS.MEDICATION_LIST} screenOptions={options}>
      <Tab.Screen name={SCREENS.TABS.MEDICATION_LIST} component={MedicationList} />
      <Tab.Screen name={SCREENS.TABS.MEDICATION_NOTICES} component={MedicationNotes} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
