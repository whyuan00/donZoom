import {
  ResponseProfile,
  getProfile,
  logout,
  postAutoLogin,
  postLogin,
  postProfileImage,
  postSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {queryKeys, storageKeys} from '@/constants/keys';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptedStorage, setEncryptStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils/header';
import {useMutation, useQuery} from '@tanstack/react-query';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: authorization => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, authorization);
      setHeader('Authorization', `${authorization}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.AUTH.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.AUTH.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.AUTH.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAutoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postAutoLogin,
    ...mutationOptions,
  });
}

function useProfileImage(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postProfileImage,
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const getProfileQuery = useGetProfile();
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const autoLoginMutation = useAutoLogin();
  const profileImageMutation = useProfileImage();

  return {
    signupMutation,
    getProfileQuery,
    isLogin,
    loginMutation,
    logoutMutation,
    autoLoginMutation,
    profileImageMutation,
  };
}

export default useAuth;
