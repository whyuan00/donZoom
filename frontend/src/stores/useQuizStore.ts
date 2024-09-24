import {create} from 'zustand';

interface Quiz {
  question: string;
  answers: string[];
  correctAnswer: string;
  explanations: string[];
  correctExplanation: string;
}

interface QuizStore {
  todaysQuizQuestions: Quiz[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  setTodaysQuizQuestions: (questions: Quiz[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedAnswer: (answer: string | null) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>(set => ({
  todaysQuizQuestions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  setTodaysQuizQuestions: (questions: Quiz[]) =>
    set({todaysQuizQuestions: questions}),
  setCurrentQuestionIndex: (index: number) =>
    set({currentQuestionIndex: index}),
  setSelectedAnswer: (answer: string | null) => set({selectedAnswer: answer}),
  resetQuiz: () => set({currentQuestionIndex: 0, selectedAnswer: null}),
}));
