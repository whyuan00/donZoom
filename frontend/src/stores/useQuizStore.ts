import {create} from 'zustand';

interface Quiz {
  quizId: number;
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
  currentQuizId: number | null;
  setTodaysQuizQuestions: (questions: Quiz[], quizId: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedAnswer: (answer: string | null) => void;
  setQuizId: (quizId: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>(set => ({
  todaysQuizQuestions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  currentQuizId: null,
  setTodaysQuizQuestions: (questions: Quiz[], quizId: number) =>
    set({todaysQuizQuestions: questions, currentQuizId: quizId}),
  setCurrentQuestionIndex: (index: number) =>
    set({currentQuestionIndex: index}),
  setSelectedAnswer: (answer: string | null) => set({selectedAnswer: answer}),
  setQuizId: (quizId: number) => set({currentQuizId: quizId}),
  resetQuiz: () => set({currentQuestionIndex: 0, selectedAnswer: null}),
}));
