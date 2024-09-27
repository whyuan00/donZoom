import { getTodayQuiz } from '@/api/quiz';
import {UseQueryCustomOptions} from '@/types/common';
import {useQuery} from '@tanstack/react-query';

function useGetTodayQuiz(queryOptions?: UseQueryCustomOptions<any>) {
  return useQuery({
    queryKey: ['account'],
    queryFn: getTodayQuiz,
    ...queryOptions,
  });
}

function useQuiz() {
  const todayQuizMutation = useGetTodayQuiz();
  return {todayQuizMutation};
}

export default useQuiz;
