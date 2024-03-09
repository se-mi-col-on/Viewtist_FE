import { useQuery } from '@tanstack/react-query';
import { IPosts } from '../../types/interface';
import { getPostDetail, getPosts } from '../../api';

export const usePostsQuery = () => {
  const { data, isLoading } = useQuery<IPosts[]>({ queryKey: ['posts'], queryFn: getPosts });

  return { data, isLoading };
};

export const usePostDetailQuery = (id: number) => {
    const { data, isLoading } = useQuery<IPosts>({
      queryKey: ['post', `${id}`],
      queryFn: () => getPostDetail(id),
    });
  
    return { data, isLoading };
  };