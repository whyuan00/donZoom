import {Profile} from '@/types/domain';
import axiosInstance from './axios';
import {getEncryptedStorage} from '@/utils';
import axios, {AxiosError} from 'axios';
import {useErrorStore} from '@/stores/errorMessagesStore';
import messaging from '@react-native-firebase/messaging';

type User = {
  email: string;
  password: string;
};

interface RequestSignup {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  role: string;
  image?: File;
}

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

const postSignup = async (user: RequestSignup): Promise<void> => {
  try {
    const {data} = await axiosInstance.post('/user', {user});
    console.log('data:', data);
  } catch (error) {
    console.log('Error:', error);
  }
};

const postLogin = async ({email, password}: User): Promise<Response> => {
  const setErrorMessage = useErrorStore.getState().setErrorMessage;
  try {
    const deviceToken = await messaging().getToken();
    console.log(deviceToken);
    console.log('Attempting to send login request...');
    const response = await axiosInstance.post('/user/login', {
      email,
      password,
      deviceToken,
    });
    // console.log('Login request successful:', response);
    // console.log('Authorization:', response.headers['authorization']);
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
  const {data} = await axiosInstance.get('/user');
  console.log('data:', data);
  return data;
};

const logout = async () => {
  await axiosInstance.delete('/user/logout');
};

const postAutoLogin = async () => {
  console.log('요청');
  const response = await axiosInstance.post('/auto-login');
  console.log(response);
};

export {postSignup, postLogin, getProfile, logout, postAutoLogin};
export type {User as RequestUser, ResponseToken, ResponseProfile};
