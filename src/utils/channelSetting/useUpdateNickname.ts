import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNickname } from '../../api';

export const useUpdateNickname = (nickname: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateNickname(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updateName'] });
    },
  });

  return mutate;
};
