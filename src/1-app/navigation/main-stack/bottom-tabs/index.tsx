import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from '1-app/navigation/constants/screens';
import { MedicationsList, NotesList } from '2-screens';
import { Icon, theme } from '6-shared';

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
        component={MedicationsList}
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
        component={NotesList}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
