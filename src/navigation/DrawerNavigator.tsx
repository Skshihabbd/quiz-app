import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerParamList } from './types';
import { ThemeContext } from '../context/ThemeContext';
import SettingsScreen from '../screens/settings/SettingsScreen';
 import ProfileScreen from '../screens/profile/ProfileScreen';
import TabNavigator from './BottomTabNavigator';
// import QuizNavigator from './QuizNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

// Icon components for menu items
const QuizIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="book" color={color} size={size} />
);

// const CategoriesIcon = ({ color, size }: { color: string; size: number }) => (
//   <Ionicons name="list" color={color} size={size} />
// );

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="document" color={color} size={size} />
);

const SettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="settings" color={color} size={size} />
);

const MemoizedQuizIcon = React.memo(QuizIcon);
// const MemoizedCategoriesIcon = React.memo(CategoriesIcon);
 const MemoizedProfileIcon = React.memo(ProfileIcon);
const MemoizedSettingsIcon = React.memo(SettingsIcon);

function DrawerContent(props: any) {
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    header: {
      backgroundColor: colors.headerBackground,
      paddingVertical: 25,
      paddingHorizontal: 15,
      marginBottom: 20,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    headerIcon: {
      fontSize: 32,
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.headerText,
    },
  });

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>📚</Text>
          <Text style={styles.headerText}>Quizy</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  const { colors } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#007bff',
        drawerInactiveTintColor: colors.secondaryText,
        drawerLabelStyle: {
          marginLeft: 1,
          fontSize: 15,
          fontWeight: '500',
        },
        drawerItemStyle: {
          borderRadius: 10,
          marginHorizontal: 12,
          marginVertical: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
        },
        drawerStyle: {
          backgroundColor: colors.background,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
      }}
    >
      {/* <Drawer.Screen
        name="Categories"
        component={QuizNavigator}
        options={{
          drawerLabel: 'Quiz Categories',
          title: 'Quiz Categories',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: props => <MemoizedCategoriesIcon {...props} />,
        }}
      /> */}
      <Drawer.Screen
        name="QuizTabs"
        component={TabNavigator}
        options={{
          drawerLabel: 'All Quizzes',
          title: 'Quiz App',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: props => <MemoizedQuizIcon {...props} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'PDF',
          title: 'Profile',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: props => <MemoizedProfileIcon {...props} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerIcon: props => <MemoizedSettingsIcon {...props} />,
        }}
      />
    </Drawer.Navigator>
  );
}
