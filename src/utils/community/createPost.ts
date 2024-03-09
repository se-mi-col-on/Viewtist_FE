import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendPost } from '../../api';
import { IUpdatePost } from '../../types/interface';

export const useCreatePost = (payload: IUpdatePost) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => sendPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutate;
};
