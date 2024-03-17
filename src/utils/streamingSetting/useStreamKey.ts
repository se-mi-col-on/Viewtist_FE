import { useQuery } from '@tanstack/react-query';
import { getStreamKey } from '../../api';

export const useStreamKey = () => {
  const { data, isLoading, isError } = useQuery<string>({
    queryKey: ['stream-key'],
    queryFn: getStreamKey,
  });

  return { data, isLoading, isError };
};
