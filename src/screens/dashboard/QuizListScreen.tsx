import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { quizzes } from '../../data/quizzes';

export default function QuizListScreen({ navigation }: any) {
  const renderQuizItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.quizCard}
      onPress={() => navigation.navigate('Quiz', { quizId: item.id })}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <Ionicons name="chevron-forward" size={24} color="#007bff" />
        </View>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.footer}>
          <Text style={styles.questionCount}>
            📝 {item.questions.length} Questions
          </Text>
          <Text style={styles.difficulty}>⭐ All Levels</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header2}>
        <Text style={styles.heading}>Quiz App</Text>
        <Text style={styles.subheading}>Test Your Knowledge</Text>
      </View>

      <FlatList
        data={quizzes}
        keyExtractor={item => item.id}
        renderItem={renderQuizItem}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header2: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#007bff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subheading: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  listContent: {
    padding: 15,
  },
  quizCard: {
    backgroundColor: 'white',
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
    color: '#333',
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#e7f1ff',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  questionCount: {
    fontSize: 12,
    color: '#666',
  },
  difficulty: {
    fontSize: 12,
    color: '#666',
  },
});
