import { Profile } from '@/types/domain';
import axiosInstance from './axios';
import { getEncryptedStorage } from '@/utils';
import axios, { AxiosError } from 'axios';
import { useErrorStore } from '@/stores/errorMessagesStore';

type User = {
  email: string;
  password: string;
};

type RequestSignup = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  role: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type Response = {
  authorization: string;
};

type LoginError = {
  message: string;
};

type ResponseProfile = Profile;

const postSignup = async ({
  email,
  password,
  passwordConfirm,
  name,
  nickname,
  role,
}: RequestSignup): Promise<void> => {
  console.log('signup values', {
    email,
    password,
    passwordConfirm,
    name,
    nickname,
    role,
  });
  const { data } = await axiosInstance.post('/user', {
    email,
    password,
    passwordConfirm,
    name,
    nickname,
    role,
  });
  console.log(data);
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type Response = {
  authorization: string;
};

interface LoginError {
  message: string;
}

const postLogin = async ({ email, password }: RequestUser): Promise<Response> => {
const postLogin = async ({email, password}: User): Promise<Response> => {
  const setErrorMessage = useErrorStore.getState().setErrorMessage;

  try {
    console.log('Attempting to send login request...');
    const response = await axiosInstance.post('/user/login', {
      email,
      password,
    });
    console.log('Login request successful:', response);
    console.log('Authorization:', response.headers['authorization']);
    return response.headers['authorization'];
  } catch (error) {
    console.error('Error during login request:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<LoginError>;
      if (axiosError.response?.status === 401) {
        setErrorMessage(
          '로그인 정보가 올바르지 않습니다.\n이메일과 비밀번호를 확인해주세요.',
        );
      } else {
        setErrorMessage(
          '로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        );
      }
    } else {
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    }
    throw error;
  }
};

const getProfile = async (): Promise<ResponseProfile> => {
  console.log(
    'axiosInstance.defaults.headers.common[Authorization]',
    axiosInstance.defaults.headers.common['Authorization'],
  );
  const {data} = await axiosInstance.get('/auth/userInfo');
  console.log('data', data);
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptedStorage('refreshToken');
  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.delete('/user/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
export type {User as RequestUser, ResponseToken, ResponseProfile};
