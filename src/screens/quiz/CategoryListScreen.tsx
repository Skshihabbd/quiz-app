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

export default function CategoryListScreen({ navigation }: any) {
  const { colors } = useContext(ThemeContext);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      padding: 15,
    },
    categoryCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 5,
      paddingRight: 15,
    },
    iconContainer: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    cardContent: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    categoryName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    categoryDescription: {
      fontSize: 13,
      color: colors.secondaryText,
      marginBottom: 8,
    },
    quizCount: {
      fontSize: 12,
      color: colors.secondaryText,
    },
  });

  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity
      style={[dynamicStyles.categoryCard, { borderLeftColor: item.color }]}
      onPress={() =>
        navigation.navigate('QuizzesByCategory', { categoryId: item.id })
      }
    >
      <View
        style={[dynamicStyles.iconContainer, { backgroundColor: item.color }]}
      >
        <Ionicons name={item.icon} size={40} color="white" />
      </View>
      <View style={dynamicStyles.cardContent}>
        <Ionicons name={item.icon} size={18} color={item.color} />
        <Text style={dynamicStyles.categoryName}>{item.name}</Text>
        <Text style={dynamicStyles.categoryDescription}>
          {item.description}
        </Text>
        <Text style={dynamicStyles.quizCount}>
          📚 {item.quizzes.length} Quizzes
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#007bff" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader
        title="Quiz Categories"
        onMenuPress={() => navigation.openDrawer()}
      />

      <FlatList
        data={categoriesData}
        keyExtractor={item => item.id}
        renderItem={renderCategoryItem}
        contentContainerStyle={dynamicStyles.listContent}
        scrollEnabled={true}
      />
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}
