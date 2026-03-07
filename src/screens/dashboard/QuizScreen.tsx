import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { categoriesData } from '../../data/categoriesData';
import { ThemeContext } from '../../context/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import FloatingMenuButton from '../../components/FloatingMenuButton';

export default function QuizScreen({ route, navigation }: any) {
  const { colors } = useContext(ThemeContext);
  const { quizId, categoryId } = route.params;
  const category = categoriesData.find(c => c.id === categoryId);
  const quiz = category?.quizzes.find(q => q.id === quizId);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const question = quiz?.questions[current];

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      backgroundColor: colors.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    quizTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    progressContainer: {
      gap: 8,
    },
    progressText: {
      fontSize: 12,
      color: colors.secondaryText,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
    },
    question: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 24,
      lineHeight: 26,
    },
    optionsContainer: {
      gap: 12,
    },
    optionButton: {
      padding: 16,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
    },
    optionButtonSelected: {
      borderColor: '#007bff',
      backgroundColor: '#e7f1ff',
    },
    optionButtonCorrect: {
      borderColor: colors.correct,
      backgroundColor: '#d4edda',
    },
    optionButtonWrong: {
      borderColor: colors.wrong,
      backgroundColor: '#f8d7da',
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    optionTextSelected: {
      color: '#007bff',
    },
    optionTextCorrect: {
      color: colors.correct,
    },
    optionTextWrong: {
      color: colors.wrong,
    },
    feedback: {
      marginTop: 20,
      padding: 12,
      borderRadius: 8,
      borderLeftWidth: 4,
    },
    feedbackCorrect: {
      backgroundColor: '#d4edda',
      borderLeftColor: colors.correct,
    },
    feedbackWrong: {
      backgroundColor: '#f8d7da',
      borderLeftColor: colors.wrong,
    },
    feedbackText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: colors.text,
    },
    feedbackSubText: {
      fontSize: 14,
      marginTop: 4,
      color: colors.text,
    },
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
      paddingHorizontal: 20,
      backgroundColor: '#007bff',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    quitButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#dc3545',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const handleAnswer = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === question?.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < quiz!.questions.length) {
      setCurrent(current + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      navigation.navigate('Result', {
        score: score + (selectedAnswer === question?.correctAnswer ? 1 : 0),
        total: quiz!.questions.length,
        quizTitle: quiz!.title,
      });
    }
  };

  const handleQuit = () => {
    Alert.alert('Quit Quiz?', 'Are you sure you want to quit this quiz?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Quit',
        onPress: () => navigation.popToTop(),
        style: 'destructive',
      },
    ]);
  };

  if (!quiz) {
    return (
      <SafeAreaView style={dynamicStyles.container}>
        <Text style={{ color: colors.text }}>Quiz not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader
        title={`${quiz.title} - Q${current + 1}/${quiz.questions.length}`}
        onMenuPress={() => navigation.openDrawer()}
        onBackPress={() => handleQuit()}
        showBack={true}
      />

      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.question}>{question?.question}</Text>

        <View style={dynamicStyles.optionsContainer}>
          {question?.options.map((option, index) => (
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
              selectedAnswer === question?.correctAnswer
                ? dynamicStyles.feedbackCorrect
                : dynamicStyles.feedbackWrong,
            ]}
          >
            <Text style={dynamicStyles.feedbackText}>
              {selectedAnswer === question?.correctAnswer
                ? '✓ Correct!'
                : '✗ Incorrect!'}
            </Text>
            {selectedAnswer !== question?.correctAnswer && (
              <Text style={dynamicStyles.feedbackSubText}>
                Correct answer:{' '}
                {String.fromCharCode(65 + question!.correctAnswer)} -{' '}
                {question?.options[question.correctAnswer]}
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
          <>
            <TouchableOpacity
              style={dynamicStyles.nextButton}
              onPress={handleNext}
            >
              <Text style={dynamicStyles.nextButtonText}>
                {current + 1 === quiz.questions.length ? 'Finish' : 'Next'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}
