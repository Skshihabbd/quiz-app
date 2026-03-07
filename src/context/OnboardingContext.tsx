import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingContextType {
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType>({
  isOnboardingComplete: false,
  completeOnboarding: () => {},
});

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const onboardingComplete = await AsyncStorage.getItem(
        'onboardingComplete',
      );
      setIsOnboardingComplete(onboardingComplete === 'true');
    } catch (error) {
      console.error('Error checking onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Error saving onboarding:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <OnboardingContext.Provider
      value={{ isOnboardingComplete, completeOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
