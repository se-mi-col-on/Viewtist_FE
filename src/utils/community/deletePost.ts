import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../../api';

export const useDeletePost = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutate;
};
