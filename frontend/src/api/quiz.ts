// src/api/quiz.ts
import axiosInstance from './axios';

type Quiz = {
  quiz_id: number;
  quiz_type: string;
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  explanations: string;
  answer_explanation: string;
};

type QuizResponse = {
  status: string;
  quizes: Quiz[];
};

const getTodayQuiz = async (): Promise<QuizResponse> => {
  const response = await axiosInstance.get('/quiz/today');
//   console.log(response.data);
  return response.data;
};

export { getTodayQuiz };
