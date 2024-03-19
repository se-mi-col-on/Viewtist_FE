import { useQuery } from '@tanstack/react-query';
import { getStreamDetail } from '../../api';
import { StreamDetail } from '../../types/interface';

export const useStreamDetail = (streamId: string | undefined) => {
  const { data, isLoading, isError } = useQuery<StreamDetail>({
    queryKey: ['stream-detail'],
    queryFn: () => getStreamDetail(streamId),
  });

  return { data, isLoading, isError };
};
