import {postSignup} from '@/api/auth';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();

  return {
    signupMutation,
  };
}

export default useAuth;
