import {Profile} from '@/types/domain';
import axiosInstance from './axios';
import {getEncryptedStorage} from '@/utils';

type RequestUser = {
  email: string;
  password: string;
};

type InitUser = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
};

const postSignup = async ({
  email,
  password,
  passwordConfirm,
  name,
  nickname,
}: InitUser): Promise<void> => {
  const {data} = await axiosInstance.post('/user', {
    email,
    password,
    passwordConfirm,
    name,
    nickname,
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type Response = {
  authorization: string;
};

const postLogin = async ({email, password}: RequestUser): Promise<Response> => {
  const {headers} = await axiosInstance.post('/user/login', {
    email,
    password,
  });
  console.log('Authorization:', headers['authorization']);
  return headers['authorization'];
};

type ResponseProfile = Profile;

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
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/user/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
