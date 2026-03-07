import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { categoriesData } from '../../data/categoriesData';
import { ThemeContext } from '../../context/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import FloatingMenuButton from '../../components/FloatingMenuButton';

export default function QuizsByCategoryScreen({ route, navigation }: any) {
  const { colors } = useContext(ThemeContext);
  const { categoryId } = route.params;
  const category = categoriesData.find(c => c.id === categoryId);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      padding: 15,
    },
    quizCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardContent: {
      padding: 15,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
    },
    category: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: colors.inputBackground,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    questionCount: {
      fontSize: 12,
      color: colors.secondaryText,
    },
    difficulty: {
      fontSize: 12,
      color: colors.secondaryText,
    },
  });

  if (!category) {
    return (
      <SafeAreaView style={dynamicStyles.container}>
        <Text style={{ color: colors.text }}>Category not found</Text>
      </SafeAreaView>
    );
  }

  const renderQuizItem = ({ item }: any) => (
    <TouchableOpacity
      style={dynamicStyles.quizCard}
      onPress={() =>
        navigation.navigate('Quiz', { quizId: item.id, categoryId })
      }
    >
      <View style={dynamicStyles.cardContent}>
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.title}>{item.title}</Text>
          <Ionicons name="chevron-forward" size={24} color="#007bff" />
        </View>
        <Text style={dynamicStyles.category}>{item.category}</Text>
        <View style={dynamicStyles.footer}>
          <Text style={dynamicStyles.questionCount}>
            📝 {item.questions.length} Questions
          </Text>
          <Text style={dynamicStyles.difficulty}>⭐ All Levels</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader
        title={category.name}
        onMenuPress={() => navigation.openDrawer()}
        onBackPress={() => navigation.goBack()}
        showBack={true}
      />

      <FlatList
        data={category.quizzes}
        keyExtractor={item => item.id}
        renderItem={renderQuizItem}
        contentContainerStyle={dynamicStyles.listContent}
        scrollEnabled={true}
      />
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}
