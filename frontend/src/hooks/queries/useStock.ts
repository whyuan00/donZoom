import {
  ResponseMyHistory,
  ResponseMyHistoryList,
  ResponseMyStock,
  ResponseNews,
  ResponseStock,
  ResponseStockList,
  getMyHistory,
  getMyHistoryList,
  getMyStock,
  getNews,
  getStock,
  getStockList,
  postBuyStock,
  postSellStock,
} from '@/api/stock';
import {queryKeys} from '@/constants/keys';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {useMutation, useQuery} from '@tanstack/react-query';

function useGetStockList(
  queryOptions?: UseQueryCustomOptions<ResponseStockList>,
) {
  return useQuery({
    queryKey: [queryKeys.STOCK],
    queryFn: getStockList,
    ...queryOptions,
  });
}

function useGetStock(
  stockId: number,
  queryOptions?: UseQueryCustomOptions<ResponseStock>,
) {
  return useQuery({
    queryKey: [queryKeys.STOCK, stockId],
    queryFn: () => getStock(stockId),
    ...queryOptions,
  });
}

function useGetMyStock(
  userId: number,
  queryOptions?: UseQueryCustomOptions<ResponseMyStock>,
) {
  return useQuery({
    queryKey: [queryKeys.STOCK, userId],
    queryFn: () => getMyStock(userId),
    ...queryOptions,
  });
}

function useGetMyHistoryList(
  queryOptions?: UseQueryCustomOptions<ResponseMyHistoryList>,
) {
  return useQuery({
    queryKey: [queryKeys.STOCK],
    queryFn: getMyHistoryList,
    ...queryOptions,
  });
}

function useGetMyHistory(
  stockId: number,
  queryOptions?: UseQueryCustomOptions<ResponseMyHistory>,
) {
  return useQuery({
    queryKey: [queryKeys.STOCK, stockId],
    queryFn: () => getMyHistory(stockId),
    ...queryOptions,
  });
}

function usePostBuyStock(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postBuyStock,
    ...mutationOptions,
  });
}

function usePostSellStock(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSellStock,
    ...mutationOptions,
  });
}

function useGetNews(
  stockId: string,
  queryOptions?: UseQueryCustomOptions<ResponseNews>,
) {
  return useQuery({
    queryKey: [queryKeys.STOCK, stockId],
    queryFn: () => getNews(stockId),
    ...queryOptions,
  });
}

function useStock() {
  const buyStockMutation = usePostBuyStock();
  const sellStockMutation = usePostSellStock();
  return {
    useGetStockList,
    useGetStock,
    useGetMyStock,
    useGetMyHistoryList,
    useGetMyHistory,
    buyStockMutation,
    sellStockMutation,
    useGetNews,
  };
}

export default useStock;
