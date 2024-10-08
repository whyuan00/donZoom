import axiosInstance from './axios';

type ResponseStockList = {
  stockId: number;
  stockName: string;
  stockPrice: number;
  lastCreatedAt: Date;
};

const getStockList = async (): Promise<ResponseStockList> => {
  const {data} = await axiosInstance.get('/stock');
  console.log(data);
  return data;
};

type stockPriceArr = {
  close: number;
  createdAt: string;
  high: number;
  low: number;
  open: number;
  stockHistoryId: number;
}[];

type ResponseStock = {
  stockHistories: stockPriceArr;
  stockId: number;
  stockName: string;
};

const getStock = async (stockId: number): Promise<ResponseStock> => {
  const {data} = await axiosInstance.get(`/stock/${stockId}`);
  // console.log(data);
  return data;
};

type MyStock = {
  stockWalletId: number;
  stockId: number;
  stockName: string;
  totalInvestedPrice: number;
  amount: number;
  averagePrice: number;
}[];

type ResponseMyStock = {
  myStocks: MyStock;
};

const getMyStock = async (userId: number): Promise<ResponseMyStock> => {
  console.log(userId);
  const {data} = await axiosInstance.get(`/stock/my/${userId}`);
  console.log('data:', data);
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
  console.log(data);
  return data;
};

type ResponseMyHistory = ResponseMyHistoryList;

const getMyHistory = async (stockId: number): Promise<ResponseMyHistory> => {
  const {data} = await axiosInstance.get(`/stock/myhistory/${stockId}`);
  console.log(data);
  return data;
};

type ResponseBuyStock = ResponseMyHistoryList;

type RequestBuyStock = {
  stockId: string;
  amount: number;
};

const postBuyStock = async ({
  stockId,
  amount,
}: RequestBuyStock): Promise<ResponseBuyStock> => {
  console.log(stockId);
  console.log(amount);
  const response = await axiosInstance.post(`/stock/${stockId}/buy`, null, {
    params: {
      amount: amount,
    },
  });
  console.log(response.data);
  return response.data;
};

type ResponseSellStock = ResponseMyHistoryList;

const postSellStock = async (stockId: string): Promise<ResponseSellStock> => {
  const response = await axiosInstance.post(`/stock/${stockId}/sell`);
  console.log(response);
  return response.data;
};

type Articles = {
  title: string;
  contents: string;
  createdAt: string;
}[];

type ResponseNews = {
  articles: Articles;
};

const getNews = async (stockId: string): Promise<ResponseNews> => {
  const {data} = await axiosInstance.get(`/stock/${stockId}/news`);
  console.log(data);
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
  RequestBuyStock,
  MyStock,
  Articles,
  stockPriceArr,
};
