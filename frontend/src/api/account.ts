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
  console.log(response);
};

const getAccount = async (): Promise<ResponseBalance> => {
  const {data} = await axiosInstance.get('/account');
  // console.log(data);
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

type Account = {
  accountNo: string;
};

type ResponseBalance = {
  header: {
    responseCode: string;
    responseMessage: string;
    apiName: string;
    transmissionDate: string;
    transmissionTime: string;
    institutionCode: string;
  };
  rec: Array<{
    bankCode: string;
    bankName: string;
    userName: string;
    accountNo: string;
    accountName: string;
    accountTypeCode: string;
    accountTypeName: string;
    accountCreatedDate: string;
    accountExpiryDate: string;
    dailyTransferLimit: string;
    oneTimeTransferLimit: string;
    accountBalance: string;
    lastTransactionDate: string;
    currency: string;
  }>;
};

const getBalance = async (accountNo: string): Promise<ResponseBalance> => {
  const {data} = await axiosInstance.get('/account', {
    params: {
      accountNo: accountNo,
    },
  });
  // console.log(data);
  return data;
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

type RequestAccountHolder = {
  accountNo: string;
  name: string;
  nickName: string;
};

const getAccountHolder = async (
  accountNo: string,
): Promise<RequestAccountHolder> => {
  console.log('getAccountHolder 호출');
  console.log('accountNo:', accountNo);
  const {data} = await axiosInstance.get('/account/holder', {
    params: {
      accountNo: accountNo,
    },
  });
  console.log(data);
  return data;
};

export {
  postinitAccount,
  getAccount,
  postCard,
  postTransfer,
  getBalance,
  getAccountHistory,
  patchAccountLimit,
  putDailyLimit,
  putPerTransactionLimit,
  postAccountAuto,
  patchAccountAuto,
  getAccountHolder,
};

export type {
  RequestCard,
  RequestTransfer,
  ResponseAccountHistory,
  RequestAccountLimit,
  RequestDailyLimit,
  ReauestDailyLimit,
  Account,
  ResponseBalance,
  RequestAccountHolder,
};
