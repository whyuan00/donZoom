import {getAllPig, getMyPig, drawPig} from '@/api/pig';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {useMutation, useQuery} from '@tanstack/react-query';

function useGetAllPig(queryOptions?: UseQueryCustomOptions<any>) {
  return useQuery({
    queryKey: ['getAllPig'],
    queryFn: getAllPig,
    ...queryOptions,
  });
}

function useGetMyPig(queryOptions?: UseQueryCustomOptions<any>) {
  return useQuery({
    queryKey: ['getMyPig'],
    queryFn: getMyPig,
    ...queryOptions,
  });
}

function usePostDrawPig(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: drawPig,
    ...mutationOptions,
  });
}

function usePig() {
  const getAllPigMutation = useGetAllPig();
  const getMyPigMutation = useGetMyPig();
  const drawPigMutation = usePostDrawPig();

  return {getAllPigMutation, getMyPigMutation, drawPigMutation};
}

export default usePig;
