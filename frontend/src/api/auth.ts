import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
};

type Response = {
  status: string;
};

const postSignup = async ({
  email,
  password,
  passwordConfirm,
  name,
  nickname,
}: RequestUser): Promise<Response> => {
  const {data} = await axiosInstance.post('/api/user', {
    email,
    password,
    passwordConfirm,
    name,
    nickname,
  });
  return data;
};

export {postSignup};
export type {RequestUser};
