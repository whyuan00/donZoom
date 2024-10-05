import axiosInstance from './axios';

type Pig = {
  pigId: number;
  imageUrl: string;
  pigName: string;
  probability: number;
  description: string;
  silhouetteImageUrl: string;
  createdAt: string | null;
};

// 전체 돼지 가져오기
const getAllPig = async (): Promise<Pig[]> => {
  const response = await axiosInstance.get('/pig');
  // console.log('돼지 다 내놔! ', response.data);
  return response.data;
};

// 보유한 돼지 가저오기
const getMyPig = async (): Promise<Pig[]> => {
  const response = await axiosInstance.get('/pig/owned');
  // console.log('내 돼지 내놔!: ', response.data);
  return response.data;
};

// 돼지 뽑기
const drawPig = async (amount: number): Promise<Pig[]> => {
  const response = await axiosInstance.post('/pig', null, {
    params: {amount},
  });
  console.log('돼지 뽑기! ', response.data);
  return response.data;
};

export {getAllPig, getMyPig, drawPig};
