import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateIntro } from '../../api';

export const useUpdateIntro = (intro: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateIntro(intro),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updateIntro'] });
    },
  });

  return mutate;
};
