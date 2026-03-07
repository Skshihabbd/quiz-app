import { Quiz } from '../types/quiz';

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Basic Math Quiz',
    category: 'Math',
    questions: [
      {
        id: 'q1',
        question: '2 + 2 = ?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: '5 × 3 = ?',
        options: ['8', '15', '10', '20'],
        correctAnswer: 1,
      },
      {
        id: 'q3',
        question: '12 ÷ 4 = ?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 2,
      },
      {
        id: 'q4',
        question: '7 - 3 = ?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
      },
      {
        id: 'q5',
        question: '9 + 8 = ?',
        options: ['16', '17', '18', '19'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '2',
    title: 'General Knowledge Quiz',
    category: 'GK',
    questions: [
      {
        id: 'q6',
        question: 'Capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Rome'],
        correctAnswer: 2,
      },
      {
        id: 'q7',
        question: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Jupiter', 'Neptune', 'Earth'],
        correctAnswer: 1,
      },
      {
        id: 'q8',
        question: 'Who wrote Romeo and Juliet?',
        options: [
          'Jane Austen',
          'William Shakespeare',
          'Mark Twain',
          'Charles Dickens',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q9',
        question: 'What is the smallest country in the world?',
        options: ['Monaco', 'Vatican City', 'Liechtenstein', 'Malta'],
        correctAnswer: 1,
      },
      {
        id: 'q10',
        question: 'In which country are the Great Pyramids located?',
        options: ['Sudan', 'Egypt', 'Libya', 'Tunisia'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '3',
    title: 'Science Quiz',
    category: 'Science',
    questions: [
      {
        id: 'q11',
        question: 'What is the chemical symbol for Gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctAnswer: 2,
      },
      {
        id: 'q12',
        question: 'What is the speed of light?',
        options: [
          '300,000 km/s',
          '150,000 km/s',
          '450,000 km/s',
          '600,000 km/s',
        ],
        correctAnswer: 0,
      },
      {
        id: 'q13',
        question: 'What is the boiling point of water at sea level?',
        options: ['50°C', '75°C', '100°C', '125°C'],
        correctAnswer: 2,
      },
      {
        id: 'q14',
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
        correctAnswer: 1,
      },
      {
        id: 'q15',
        question: 'How many bones are in the adult human body?',
        options: ['186', '206', '226', '246'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '4',
    title: 'History Quiz',
    category: 'History',
    questions: [
      {
        id: 'q16',
        question: 'In which year did the Titanic sink?',
        options: ['1910', '1912', '1915', '1920'],
        correctAnswer: 1,
      },
      {
        id: 'q17',
        question: 'Who was the first President of the United States?',
        options: [
          'Thomas Jefferson',
          'George Washington',
          'John Adams',
          'James Madison',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q18',
        question: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: 2,
      },
      {
        id: 'q19',
        question: 'Who discovered America?',
        options: [
          'Leif Erikson',
          'Ferdinand Magellan',
          'Christopher Columbus',
          'Vasco da Gama',
        ],
        correctAnswer: 2,
      },
      {
        id: 'q20',
        question: 'What was the capital of ancient Egypt?',
        options: ['Alexandria', 'Cairo', 'Giza', 'Memphis'],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: '5',
    title: 'Technology Quiz',
    category: 'Technology',
    questions: [
      {
        id: 'q21',
        question: 'Who is the founder of Microsoft?',
        options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Larry Page'],
        correctAnswer: 1,
      },
      {
        id: 'q22',
        question: 'In which year was the first iPhone released?',
        options: ['2005', '2007', '2008', '2009'],
        correctAnswer: 1,
      },
      {
        id: 'q23',
        question: 'What does AI stand for?',
        options: [
          'Artificial Integration',
          'Artificial Intelligence',
          'Advanced Internet',
          'Automated Input',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q24',
        question:
          "Which programming language is known as 'the language of the web'?",
        options: ['Python', 'Java', 'JavaScript', 'C++'],
        correctAnswer: 2,
      },
      {
        id: 'q25',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language',
        ],
        correctAnswer: 0,
      },
    ],
  },
];
