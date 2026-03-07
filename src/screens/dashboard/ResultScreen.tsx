import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import FloatingMenuButton from '../../components/FloatingMenuButton';

export default function ResultScreen({ route, navigation }: any) {
  const { colors } = useContext(ThemeContext);
  const { score, total, quizTitle } = route.params;
  const percentage = Math.round((score / total) * 100);

  let resultMessage = '';
  let resultColor = '#dc3545';
  let resultIcon = 'close-circle';

  if (percentage === 100) {
    resultMessage = 'Perfect! Outstanding!';
    resultColor = '#28a745';
    resultIcon = 'checkmark-circle';
  } else if (percentage >= 80) {
    resultMessage = 'Excellent! Great Job!';
    resultColor = '#28a745';
    resultIcon = 'checkmark-circle';
  } else if (percentage >= 60) {
    resultMessage = 'Good! Keep it up!';
    resultColor = '#ffc107';
    resultIcon = 'alert-circle';
  } else if (percentage >= 40) {
    resultMessage = 'Fair! Try again!';
    resultColor = '#fd7e14';
    resultIcon = 'alert-circle';
  } else {
    resultMessage = 'Needs improvement. Practice more!';
    resultColor = '#dc3545';
    resultIcon = 'close-circle';
  }

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
    },
    scoreCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    icon: {
      marginBottom: 20,
    },
    quizTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 30,
      textAlign: 'center',
    },
    scoreBox: {
      marginBottom: 20,
      alignItems: 'center',
    },
    scoreLabel: {
      fontSize: 14,
      color: colors.secondaryText,
      marginBottom: 8,
    },
    score: {
      fontSize: 48,
      fontWeight: 'bold',
    },
    percentageBox: {
      marginBottom: 20,
    },
    percentageText: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    message: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 30,
      textAlign: 'center',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    stat: {
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 8,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 4,
    },
    buttonContainer: {
      gap: 12,
      marginTop: 20,
    },
    secondaryButton: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      backgroundColor: '#007bff',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader
        title="Quiz Complete"
        onMenuPress={() => navigation.openDrawer()}
        onBackPress={() => navigation.popToTop()}
        showBack={true}
      />
      <View style={dynamicStyles.content}>
        <View style={dynamicStyles.scoreCard}>
          <Ionicons
            name={resultIcon}
            size={80}
            color={resultColor}
            style={dynamicStyles.icon}
          />

          <Text style={dynamicStyles.quizTitle}>{quizTitle}</Text>

          <View style={dynamicStyles.scoreBox}>
            <Text style={dynamicStyles.scoreLabel}>Your Score</Text>
            <Text style={[dynamicStyles.score, { color: resultColor }]}>
              {score}/{total}
            </Text>
          </View>

          <View style={dynamicStyles.percentageBox}>
            <Text
              style={[dynamicStyles.percentageText, { color: resultColor }]}
            >
              {percentage}%
            </Text>
          </View>

          <Text style={dynamicStyles.message}>{resultMessage}</Text>

          <View style={dynamicStyles.statsContainer}>
            <View style={dynamicStyles.stat}>
              <Ionicons name="checkmark-circle" size={24} color="#28a745" />
              <Text style={dynamicStyles.statLabel}>Correct</Text>
              <Text style={dynamicStyles.statValue}>{score}</Text>
            </View>

            <View style={dynamicStyles.stat}>
              <Ionicons name="close-circle" size={24} color="#dc3545" />
              <Text style={dynamicStyles.statLabel}>Wrong</Text>
              <Text style={dynamicStyles.statValue}>{total - score}</Text>
            </View>

            <View style={dynamicStyles.stat}>
              <Ionicons name="help-circle" size={24} color="#007bff" />
              <Text style={dynamicStyles.statLabel}>Total</Text>
              <Text style={dynamicStyles.statValue}>{total}</Text>
            </View>
          </View>
        </View>

        <View style={dynamicStyles.buttonContainer}>
          <TouchableOpacity
            style={dynamicStyles.secondaryButton}
            onPress={() => navigation.popToTop()}
          >
            <Text style={dynamicStyles.secondaryButtonText}>
              Back to Quizzes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}
