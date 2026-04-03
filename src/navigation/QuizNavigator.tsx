import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuizStackParamList } from './types';
import { ThemeContext } from '../context/ThemeContext';
import CategoryListScreen from '../screens/quiz/CategoryListScreen';
import QuizsByCategoryScreen from '../screens/quiz/QuizsByCategoryScreen';
import QuizScreen from '../screens/dashboard/QuizScreen';
import ResultScreen from '../screens/dashboard/ResultScreen';

const Stack = createNativeStackNavigator<QuizStackParamList>();

export default function QuizNavigator() {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.headerText,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoryListScreen}
        options={{
          title: 'Quizy',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="QuizzesByCategory"
        component={QuizsByCategoryScreen}
        options={{
          title: 'Quizy',
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: 'Quizy',
        }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          title: 'Result',
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
