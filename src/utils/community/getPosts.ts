import { useQuery } from '@tanstack/react-query';
import { IContent, IPosts } from '../../types/interface';
import { getPostDetail, getPosts } from '../../api';

export const usePostsQuery = (page: number = 0, size: number = 1000) => {
  const { data, isLoading } = useQuery<IContent[]>({
    queryKey: ['posts'],
    queryFn: () => getPosts(page, size),
  });

  return { data, isLoading };
};

export const usePostDetailQuery = (id: number) => {
  const { data, isLoading } = useQuery<IPosts>({
    queryKey: ['post', `${id}`],
    queryFn: () => getPostDetail(id),
  });

  return { data, isLoading };
};
