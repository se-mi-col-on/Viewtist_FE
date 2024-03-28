import { useQuery } from '@tanstack/react-query';
import { getStreamKey } from '../../api';

export const useStreamKey = (streamerNickname: string | undefined) => {
  console.log(streamerNickname);
  const { data, isLoading, isError } = useQuery<string>({
    queryKey: ['stream-key'],
    queryFn: () => getStreamKey(streamerNickname),
  });
  return { data, isLoading, isError };
};
