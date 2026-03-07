import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FloatingMenuButtonProps {
  onPress: () => void;
}

export default function FloatingMenuButton({
  onPress,
}: FloatingMenuButtonProps) {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      zIndex: 999,
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#007bff',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
