import axiosInstance from './axios';

type RequestCard = {
  cardUniqueNo: string;
  withdrawalAccountNo: string;
  withdrawalDate: string;
};

type RequestTransfer = {
  depositAccountNo: string;
  depositTransactionSummary: string;
  transactionBalance: string;
  withdrawalAccountNo: string;
  withdrawalTransactionSummary: string;
};

type ResponseAccountHistory = {
  status: string;
  list: [];
};

type RequestAccountLimit = {
  accountNo: string;
  oneTimeLimit: string;
  dailyLimit: string;
};

type RequestDailyLimit = {
  childId: number;
  limit: number;
};

type ReauestDailyLimit = {
  depositAccountNo: string;
  transactionBalance: string;
  withdrawalAccountNo: string;
  transferDate: string;
};

const postinitAccount = async (): Promise<void> => {
  const response = await axiosInstance.post('/account');
  console.log('asdf');
  console.log(response);
};

const getAccount = async (): Promise<Response> => {
  const {data} = await axiosInstance.get('/account');
  console.log(data);
  return data;
};

const postCard = async ({
  cardUniqueNo,
  withdrawalAccountNo,
  withdrawalDate,
}: RequestCard): Promise<void> => {
  const response = await axiosInstance.post('/account/card', {
    cardUniqueNo,
    withdrawalAccountNo,
    withdrawalDate,
  });
};

const postTransfer = async ({
  depositAccountNo,
  depositTransactionSummary,
  transactionBalance,
  withdrawalAccountNo,
  withdrawalTransactionSummary,
}: RequestTransfer): Promise<void> => {
  const response = await axiosInstance.post('/account/transfer', {
    depositAccountNo,
    depositTransactionSummary,
    transactionBalance,
    withdrawalAccountNo,
    withdrawalTransactionSummary,
  });
};

const getAccountHistory = async (): Promise<ResponseAccountHistory> => {
  const {data} = await axiosInstance.get('/account/history');
  console.log(data);
  return data;
};

const patchAccountLimit = async ({
  accountNo,
  oneTimeLimit,
  dailyLimit,
}: RequestAccountLimit): Promise<void> => {
  const response = await axiosInstance.patch('/account/limit', {
    accountNo,
    oneTimeLimit,
    dailyLimit,
  });
};

const putDailyLimit = async ({
  childId,
  limit,
}: RequestDailyLimit): Promise<void> => {
  const response = await axiosInstance.put('/account/daily-limit', {
    childId,
    limit,
  });
};

const putPerTransactionLimit = async ({
  childId,
  limit,
}: RequestDailyLimit): Promise<void> => {
  const response = await axiosInstance.put('/account/per-transaction-limit', {
    childId,
    limit,
  });
};

const postAccountAuto = async ({
  depositAccountNo,
  transactionBalance,
  withdrawalAccountNo,
  transferDate,
}: ReauestDailyLimit): Promise<void> => {
  const response = await axiosInstance.post('/account/auto', {
    depositAccountNo,
    transactionBalance,
    withdrawalAccountNo,
    transferDate,
  });
};

const patchAccountAuto = async ({
  depositAccountNo,
  transactionBalance,
  withdrawalAccountNo,
  transferDate,
}: ReauestDailyLimit): Promise<void> => {
  const response = await axiosInstance.patch('/account/auto', {
    depositAccountNo,
    transactionBalance,
    withdrawalAccountNo,
    transferDate,
  });
};

export {
  postinitAccount,
  getAccount,
  postCard,
  postTransfer,
  getAccountHistory,
  patchAccountLimit,
  putDailyLimit,
  putPerTransactionLimit,
  postAccountAuto,
  patchAccountAuto,
};
