export type QuizStackParamList = {
  Categories: undefined;
  QuizzesByCategory: { categoryId: string };
  Quiz: { quizId: string };
  Result: { score: number; total: number; quizTitle: string };
};

export type TabParamList = {
  Quiz: undefined;
  Settings: undefined;
};

export type DrawerParamList = {
  Categories: undefined;
  Profile: undefined;
  Settings: undefined;
  QuizTabs: undefined; // Added QuizNavigator
};

export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
};
