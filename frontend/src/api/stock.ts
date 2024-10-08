import axiosInstance from './axios';

type ResponseStockList = {
  stockId: number;
  stockName: string;
  stockPrice: number;
  lastCreatedAt: Date;
};

const getStockList = async (): Promise<ResponseStockList> => {
  const {data} = await axiosInstance.get('/stock');
  // console.log(data);
  return data;
};

type ResponseStock = {
  stockHistoryId: number;
  price: number;
  createdAt: Date;
};

const getStock = async (stockId: number): Promise<ResponseStock> => {
  const {data} = await axiosInstance.get(`/stock/${stockId}`);
  // console.log(data);
  return data;
};

type ResponseMyStock = {
  stockWalletId: number;
  stockId: number;
  stockName: string;
  totalInvestedPrice: number;
  amount: number;
  averagePrice: number;
};

const getMyStock = async (): Promise<ResponseMyStock> => {
  const {data} = await axiosInstance.get('/stock/my');
  // console.log(data);
  return data;
};

type ResponseMyHistoryList = {
  transactionHistoryId: number;
  stockId: number;
  transactionType: string;
  price: number;
  amount: number;
  total: number;
  profit: number;
  createdAt: Date;
};

const getMyHistoryList = async (): Promise<ResponseMyHistoryList> => {
  const {data} = await axiosInstance.get('/stock/myhistory');
  // console.log(data);
  return data;
};

type ResponseMyHistory = ResponseMyHistoryList;

const getMyHistory = async (stockId: number): Promise<ResponseMyHistory> => {
  const {data} = await axiosInstance.get(`/stock/myhistory/${stockId}`);
  // console.log(data);
  return data;
};

type ResponseBuyStock = ResponseMyHistoryList;

const postBuyStock = async (stockId: string): Promise<ResponseBuyStock> => {
  const response = await axiosInstance.post(`/stock/${stockId}/buy`);
  // console.log(response);
  return response.data;
};

type ResponseSellStock = ResponseMyHistoryList;

const postSellStock = async (stockId: string): Promise<ResponseSellStock> => {
  const response = await axiosInstance.post(`/stock/${stockId}/sell`);
  // console.log(response);
  return response.data;
};


type ResponseContentsList = {
  Id: number;
  title: string;
  contents: string;
  createdAt: Date;
  source: string;
}[]; // 뉴스리스트 배열로 설정


type ResponseNews = ResponseContentsList;

const getNews = async (stockId: number): Promise<ResponseNews> => {
  const {data} = await axiosInstance.get(`/news/${stockId}`);
  return data;
};

const getTodaysNews = async (stockId: number): Promise<ResponseNews> => {
  const {data} = await axiosInstance.get(`/news/${stockId}/today`);
  // console.log('오늘뉴스:',response.data);
  return data;
};

type ResponseReports = ResponseContentsList;

const getReports = async (stockId: number): Promise<ResponseReports> => {
  const {data} = await axiosInstance.get(`/report/${stockId}`);
  // console.log('리포트:',data);
  return data;
};

const getTodaysReports = async (stockId: number): Promise<ResponseReports> => {
  const {data} = await axiosInstance.get(`/report/${stockId}/today`);
  // console.log('오늘리포트:', data);
  return data;
};


export {
  getStockList,
  getStock,
  getMyStock,
  getMyHistoryList,
  getMyHistory,
  postBuyStock,
  postSellStock,
  getNews,
  getTodaysNews,
  getReports,
  getTodaysReports,
};
export type {
  ResponseStockList,
  ResponseStock,
  ResponseMyStock,
  ResponseMyHistoryList,
  ResponseMyHistory,
  ResponseBuyStock,
  ResponseSellStock,
  ResponseNews,
  ResponseReports,
};
