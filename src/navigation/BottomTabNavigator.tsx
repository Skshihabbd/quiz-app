import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabParamList } from './types';
import QuizNavigator from './QuizNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const tabIconName = (routeName: string, focused: boolean): string => {
  switch (routeName) {
    case 'Quiz':
      return focused ? 'list-circle' : 'list-circle-outline';
    case 'Settings':
      return focused ? 'settings' : 'settings-outline';
    default:
      return 'ellipse';
  }
};

const TabBarIcon = React.memo(
  ({ name, color, size }: { name: string; color: string; size: number }) => (
    <Ionicons name={name} size={size} color={color} />
  ),
);

TabBarIcon.displayName = 'TabBarIcon';

const MemoizedTabBarIcon = React.memo(TabBarIcon);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => (
          <MemoizedTabBarIcon
            name={tabIconName(route.name, focused)}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Quiz"
        component={QuizNavigator}
        options={{ title: 'Quizy' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Quizy', headerShown: true }}
      />
    </Tab.Navigator>
  );
}
