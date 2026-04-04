import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  onBackPress?: () => void;
  showBack?: boolean;
}

export default function CustomHeader({
  title,
  onMenuPress,
  onBackPress,
  showBack = false,
}: HeaderProps) {
  const { colors } = useContext(ThemeContext) as ThemeContextType;
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.headerBackground,
      paddingTop: insets.top,
      paddingHorizontal: 15,
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.headerText,
      flex: 1,
    },
    iconButton: {
      padding: 8,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
   <View style={styles.container}>
  <View style={styles.leftSection}>
    
    {/* Menu icon LEFT side */}
    <TouchableOpacity
      style={styles.iconButton}
      onPress={onMenuPress}
    >
      <Ionicons name="menu" size={28} color={colors.headerText} />
    </TouchableOpacity>

    {showBack && (
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onBackPress}
      >
        <Ionicons name="arrow-back" size={28} color="#007bff" />
      </TouchableOpacity>
    )}

    <Text style={styles.title}>{title}</Text>
  </View>
</View>
  );
}
