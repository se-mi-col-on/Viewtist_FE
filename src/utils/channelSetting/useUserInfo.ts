import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../api';

export const useUserInfo = (name: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['userInfo', name],
    queryFn: () => getUserInfo(name),
  });

  return { data, isLoading };
};
