import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { OnboardingProvider } from './src/context/OnboardingContext';
import RootNavigator from './src/navigation/RootNavigator';
import { requestNotificationPermission } from './src/services/permissionService';
import MobileAds from 'react-native-google-mobile-ads';

export default function App() {

useEffect(() => {
    // অ্যাপ ওপেন হওয়ার সাথে সাথে পারমিশন রিকোয়েস্ট করবে
    const initPermissions = async () => {
      await requestNotificationPermission();
    };
    
    initPermissions();
  }, []);


  useEffect(() => {
    // AdMob SDK ইনিশিয়ালাইজ করা
    MobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob SDK Initialized!', adapterStatuses);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <OnboardingProvider>
          <RootNavigator />
        </OnboardingProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
