import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUpdatePost } from '../../types/interface';
import { updatePost } from '../../api';

export const usePutPost = (id: number, payload: IUpdatePost) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updatePost(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutate;
};
