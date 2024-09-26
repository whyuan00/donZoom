import {
  getAccount,
  getAccountHistory,
  getBalance,
  patchAccountAuto,
  patchAccountLimit,
  postAccountAuto,
  postCard,
  postTransfer,
  postinitAccount,
  putDailyLimit,
  putPerTransactionLimit,
} from '@/api/account';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {useMutation, useQuery} from '@tanstack/react-query';

function useInitAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postinitAccount,
    ...mutationOptions,
  });
}

function useGetAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getAccount,
    ...mutationOptions,
  });
}

function usePostCard(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postCard,
    ...mutationOptions,
  });
}

function usePostTransfer(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postTransfer,
    ...mutationOptions,
  });
}

function useGetBalance(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getBalance,
    ...mutationOptions,
  });
}

function useGetAccountHistory(queryOptions?: UseQueryCustomOptions<any>) {
  return useQuery({
    queryKey: ['account'],
    queryFn: getAccountHistory,
    ...queryOptions,
  });
}

function usePatchAccountLimit(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: patchAccountLimit,
    ...mutationOptions,
  });
}

function usePutDailyLimit(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: putDailyLimit,
    ...mutationOptions,
  });
}

function usePutPerTransactionLimit(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: putPerTransactionLimit,
    ...mutationOptions,
  });
}

function usePostAccountAuto(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postAccountAuto,
    ...mutationOptions,
  });
}

function usePatchAccountAuto(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: patchAccountAuto,
    ...mutationOptions,
  });
}

function useAccount() {
  const initAccountMutation = useInitAccount();
  const getAccount = useGetAccount();
  const cardMutation = usePostCard();
  const transferMutation = usePostTransfer();
  const getBalance = useGetBalance();
  const getAccountHistory = useGetAccountHistory();
  const accountLimitMutation = usePatchAccountLimit();
  const dailyLimitMutation = usePutDailyLimit();
  const perTransactionLimitMutation = usePutPerTransactionLimit();
  const accountAutoMutation = usePostAccountAuto();
  const patchAccountAutoMutation = usePatchAccountAuto();
  return {
    initAccountMutation,
    getAccount,
    cardMutation,
    transferMutation,
    getBalance,
    getAccountHistory,
    accountLimitMutation,
    dailyLimitMutation,
    perTransactionLimitMutation,
    accountAutoMutation,
    patchAccountAutoMutation,
  };
}

export default useAccount;
