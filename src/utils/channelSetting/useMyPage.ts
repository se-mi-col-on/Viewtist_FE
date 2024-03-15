import { useQuery } from '@tanstack/react-query';
import { IProfile } from '../../types/interface';
import { getMyPage } from '../../api';

export const useMyPage = () => {

  const { data, isLoading } = useQuery<IProfile>({
    queryKey: ['myPage'],
    queryFn: getMyPage
  });

  return { data, isLoading };
};
