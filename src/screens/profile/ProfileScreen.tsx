import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import FloatingMenuButton from '../../components/FloatingMenuButton';

export default function ProfileScreen({ navigation }: any) {
  const { colors } = useContext(ThemeContext);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.headerBackground,
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.headerText,
    },
    profileSection: {
      alignItems: 'center',
      paddingVertical: 30,
      backgroundColor: colors.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      marginBottom: 15,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    userStatus: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    statsSection: {
      flexDirection: 'row',
      padding: 15,
      gap: 15,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 12,
      color: colors.secondaryText,
      textAlign: 'center',
    },
    aboutSection: {
      margin: 15,
      padding: 20,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    aboutTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    aboutText: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 22,
      marginBottom: 12,
    },
    versionText: {
      fontSize: 12,
      color: colors.secondaryText,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader
        title="Player Profile"
        onMenuPress={() => navigation.openDrawer()}
      />

      <View style={dynamicStyles.profileSection}>
        <View style={dynamicStyles.avatar}>
          <Ionicons name="person-circle" size={80} color="#007bff" />
        </View>

        <Text style={dynamicStyles.userName}>Quiz Master</Text>
        <Text style={dynamicStyles.userStatus}>Active Player</Text>
      </View>

      <View style={dynamicStyles.statsSection}>
        <View style={dynamicStyles.statCard}>
          <Text style={dynamicStyles.statNumber}>0</Text>
          <Text style={dynamicStyles.statLabel}>Quizzes Completed</Text>
        </View>
        <View style={dynamicStyles.statCard}>
          <Text style={dynamicStyles.statNumber}>0%</Text>
          <Text style={dynamicStyles.statLabel}>Average Score</Text>
        </View>
      </View>

      <View style={dynamicStyles.aboutSection}>
        <Text style={dynamicStyles.aboutTitle}>About This App</Text>
        <Text style={dynamicStyles.aboutText}>
          Welcome to Quiz Master! Test your knowledge across multiple categories
          including Mathematics, General Knowledge, Science, and Technology.
        </Text>
        <Text style={dynamicStyles.versionText}>Version 1.0.0</Text>
      </View>
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}
