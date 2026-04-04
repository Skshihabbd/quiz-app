/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { categoriesData } from '../../data/categoriesData';
import { ThemeContext } from '../../context/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import FloatingMenuButton from '../../components/FloatingMenuButton';
import { SafeAreaView } from 'react-native-safe-area-context';

// AdMob Imports
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxxxxx';

export default function QuizScreen({ route, navigation }: any) {
  // context theke 'mode' extract korar chesta korun jodi thake
  const theme = useContext(ThemeContext);
  const colors = theme.colors;
  const mode = (theme as any).mode; // TypeScript error bypass korar jonno

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const { quizId, categoryId } = route.params || {};
  const category = categoriesData.find(c => c.id === categoryId);
  const quiz = category?.quizzes.find(q => q.id === quizId);
  const question = quiz?.questions[current];

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      navigateToResult();
    }
  }, [isClosed]);

  const navigateToResult = useCallback(() => {
    navigation.navigate('Result', {
      score: score,
      total: quiz?.questions.length || 0,
      quizTitle: quiz?.title || '',
    });
  }, [navigation, score, quiz]);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === question?.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (quiz && current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      if (isLoaded) {
        show();
      } else {
        navigateToResult();
      }
    }
  };

  const handleQuit = () => {
    Alert.alert('Quit Quiz?', 'Are you sure you want to quit this quiz?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Quit',
        onPress: () => navigation.popToTop(),
        style: 'destructive',
      },
    ]);
  };

  if (!quiz || !question) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.text }}>Quiz not found</Text>
      </SafeAreaView>
    );
  }

  const dynamicStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { flex: 1, padding: 20 },
    question: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 24,
      lineHeight: 26,
    },
    optionsContainer: { gap: 12 },
    optionButton: {
      padding: 16,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
    },
    // Yekhane 'mode' chilo sekhane color directly ba ternary use kora hoyeche
    optionButtonSelected: {
      borderColor: '#007bff',
      backgroundColor: mode === 'dark' ? '#1a2e4d' : '#e7f1ff',
    },
    optionButtonCorrect: {
      borderColor: colors.correct,
      backgroundColor: mode === 'dark' ? '#1b3321' : '#d4edda',
    },
    optionButtonWrong: {
      borderColor: colors.wrong,
      backgroundColor: mode === 'dark' ? '#3d1c1e' : '#f8d7da',
    },
    optionText: { fontSize: 16, color: colors.text, fontWeight: '500' },
    optionTextSelected: { color: '#007bff' },
    optionTextCorrect: { color: colors.correct },
    optionTextWrong: { color: colors.wrong },
    feedback: {
      marginTop: 20,
      padding: 12,
      borderRadius: 8,
      borderLeftWidth: 4,
    },
    feedbackCorrect: {
      backgroundColor: mode === 'dark' ? '#1b3321' : '#d4edda',
      borderLeftColor: colors.correct,
    },
    feedbackWrong: {
      backgroundColor: mode === 'dark' ? '#3d1c1e' : '#f8d7da',
      borderLeftColor: colors.wrong,
    },
    feedbackText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: colors.text,
    },
    feedbackSubText: { fontSize: 14, marginTop: 4, color: colors.text },
    footer: {
      padding: 20,
      backgroundColor: colors.cardBackground,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    nextButton: {
      flex: 1,
      paddingVertical: 12,
      backgroundColor: '#007bff',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    quitButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#dc3545',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader
        title={`${quiz.title} - Q${current + 1}/${quiz.questions.length}`}
        onMenuPress={() => navigation.openDrawer()}
        onBackPress={handleQuit}
        showBack={true}
      />
      {/* ... Rest of the UI remains same ... */}
      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.question}>{question.question}</Text>
        <View style={dynamicStyles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                dynamicStyles.optionButton,
                selectedAnswer === index && dynamicStyles.optionButtonSelected,
                answered &&
                  index === question.correctAnswer &&
                  dynamicStyles.optionButtonCorrect,
                answered &&
                  selectedAnswer === index &&
                  index !== question.correctAnswer &&
                  dynamicStyles.optionButtonWrong,
              ]}
              onPress={() => handleAnswer(index)}
              disabled={answered}
            >
              <Text
                style={[
                  dynamicStyles.optionText,
                  selectedAnswer === index && dynamicStyles.optionTextSelected,
                  answered &&
                    index === question.correctAnswer &&
                    dynamicStyles.optionTextCorrect,
                  answered &&
                    selectedAnswer === index &&
                    index !== question.correctAnswer &&
                    dynamicStyles.optionTextWrong,
                ]}
              >
                {String.fromCharCode(65 + index)}) {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {answered && (
          <View
            style={[
              dynamicStyles.feedback,
              selectedAnswer === question.correctAnswer
                ? dynamicStyles.feedbackCorrect
                : dynamicStyles.feedbackWrong,
            ]}
          >
            <Text style={dynamicStyles.feedbackText}>
              {selectedAnswer === question.correctAnswer
                ? '✓ Correct!'
                : '✗ Incorrect!'}
            </Text>
            {selectedAnswer !== question.correctAnswer && (
              <Text style={dynamicStyles.feedbackSubText}>
                Correct answer:{' '}
                {String.fromCharCode(65 + question.correctAnswer)} -{' '}
                {question.options[question.correctAnswer]}
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={dynamicStyles.footer}>
        <TouchableOpacity style={dynamicStyles.quitButton} onPress={handleQuit}>
          <Text style={dynamicStyles.quitButtonText}>Quit</Text>
        </TouchableOpacity>
        {answered && (
          <TouchableOpacity
            style={dynamicStyles.nextButton}
            onPress={handleNext}
          >
            <Text style={dynamicStyles.nextButtonText}>
              {current + 1 === quiz.questions.length ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}
