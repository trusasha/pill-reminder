import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from 'navigation/constants/screens';
import MedicationList from 'screens/medication-list';
import MedicationNotes from 'screens/medication-notes';
import Icon from 'components/icon';
import { theme } from 'theme';

const Tab = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
  headerShown: false,
};

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName={SCREENS.MEDICATION_LIST} screenOptions={options}>
      <Tab.Screen
        name={SCREENS.MEDICATION_LIST}
        options={{
          title: 'Medications',
          tabBarActiveTintColor: theme.colors.stroke,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="folderopen"
              size={24}
              color={focused ? theme.colors.stroke : theme.colors.blackLight}
            />
          ),
        }}
        component={MedicationList}
      />
      <Tab.Screen
        name={SCREENS.MEDICATION_NOTICES}
        options={{
          title: 'Notions',
          tabBarActiveTintColor: theme.colors.stroke,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="bars"
              size={24}
              color={focused ? theme.colors.stroke : theme.colors.blackLight}
            />
          ),
        }}
        component={MedicationNotes}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
