export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  questions: Question[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  quizzes: Quiz[];
}
