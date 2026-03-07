import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import FloatingMenuButton from '../../components/FloatingMenuButton';

export default function SettingsScreen({ navigation }: any) {
  const { isDarkMode, toggleDarkMode, colors } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);

  const toggleNotifications = () => setNotifications(previous => !previous);

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
    section: {
      backgroundColor: colors.cardBackground,
      marginTop: 15,
      paddingVertical: 10,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.secondaryText,
      paddingHorizontal: 20,
      paddingVertical: 10,
      letterSpacing: 0.5,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      flex: 1,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    versionText: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 30,
    },
    footerText: {
      fontSize: 12,
      color: colors.secondaryText,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader
        title="Settings"
        onMenuPress={() => navigation.openDrawer()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>PREFERENCES</Text>

          <View style={dynamicStyles.settingItem}>
            <View style={dynamicStyles.settingContent}>
              <Ionicons name="moon" size={24} color="#007bff" />
              <Text style={dynamicStyles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>

          <View style={dynamicStyles.settingItem}>
            <View style={dynamicStyles.settingContent}>
              <Ionicons name="notifications" size={24} color="#007bff" />
              <Text style={dynamicStyles.settingLabel}>Notifications</Text>
            </View>
            <Switch value={notifications} onValueChange={toggleNotifications} />
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>ABOUT</Text>

          <TouchableOpacity
            style={dynamicStyles.settingButton}
            onPress={() => Alert.alert('Quiz App', 'Version 1.0.0')}
          >
            <View style={dynamicStyles.settingContent}>
              <Ionicons name="information-circle" size={24} color="#007bff" />
              <Text style={dynamicStyles.settingLabel}>App Version</Text>
            </View>
            <Text style={dynamicStyles.versionText}>1.0.0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.settingButton}
            onPress={() =>
              Alert.alert('Privacy Policy', 'Your data is safe with us.')
            }
          >
            <View style={dynamicStyles.settingContent}>
              <Ionicons name="shield-checkmark" size={24} color="#007bff" />
              <Text style={dynamicStyles.settingLabel}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.border} />
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.settingButton}
            onPress={() =>
              Alert.alert(
                'Terms & Conditions',
                'Please read our terms carefully.',
              )
            }
          >
            <View style={dynamicStyles.settingContent}>
              <Ionicons name="document-text" size={24} color="#007bff" />
              <Text style={dynamicStyles.settingLabel}>Terms & Conditions</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.border} />
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.settingButton}
            onPress={() =>
              Alert.alert('Contact Us', 'Email: support@quizapp.com')
            }
          >
            <View style={dynamicStyles.settingContent}>
              <Ionicons name="mail" size={24} color="#007bff" />
              <Text style={dynamicStyles.settingLabel}>Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.border} />
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.footer}>
          <Text style={dynamicStyles.footerText}>
            © 2024 Quiz App. All rights reserved.
          </Text>
        </View>
      </ScrollView>
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}
