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

const getStock = async (
  stockId: number,
  interval: string,
): Promise<ResponseStock> => {
  const {data} = await axiosInstance.get(`/stock/${stockId}/${interval}`);
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
  // console.log(response);
  return response.data;
};

type ResponseContents = {
  Id: number;
  title: string;
  contents: string;
  createdAt: Date;
  source: string;
}; // 뉴스리스트 배열로 설정

type AllNewsResponse = {
  type: 'all-news';
  data: ResponseContents[];
};

type TodayNewsResponse = {
  type: 'today-news';
  data: ResponseContents[];
};

const getNews = async (stockId: number): Promise<AllNewsResponse> => {
  const {data} = await axiosInstance.get(`/news/${stockId}`);
  // console.log('전체뉴스:',data)
  return data;
};

const getTodaysNews = async (stockId: number): Promise<TodayNewsResponse> => {
  try {
    const {data} = await axiosInstance.get(`/news/${stockId}/today`);
    const slicedData = data.slice(0, 3);
    // console.log('sliced오늘뉴스:', slicedData);
    return slicedData; // 3개만 반환
  } catch {
        return {
          type: 'today-news',
          data: [],
        };
  }
};

type AllReportResponse = {
  type: 'all-reports';
  data: ResponseContents[];
};

type TodayReportResponse = {
  type: 'today-reports';
  data: ResponseContents[];
};

const getReports = async (stockId: number): Promise<AllReportResponse> => {
  const {data} = await axiosInstance.get(`/report/${stockId}`);
  // console.log('리포트:',data);
  return data;
};

const getTodaysReports = async (
  stockId: number,
): Promise<TodayReportResponse> => {
  try {
    const {data} = await axiosInstance.get(`/report/${stockId}/today`);
    const slicedData = data.slice(0, 3);
    // console.log('sliced오늘리포트:', slicedData);
    return slicedData; // 3개만 반환
  } catch {
    return {
      type:'today-reports',
      data:[]
    }
  }
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
  RequestBuyStock,
  MyStock,
  stockPriceArr,
  ResponseContents,
  AllNewsResponse,
  TodayNewsResponse,
  AllReportResponse,
  TodayReportResponse,
};
