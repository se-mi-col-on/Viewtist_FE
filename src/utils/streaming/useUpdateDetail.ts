import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStreamDetail } from '../../api';
import { UpdateStreamDetail } from '../../types/interface';

export const useUpdateDetail = (streamId: string | undefined, newDetail: UpdateStreamDetail) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateStreamDetail(streamId, newDetail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updateDetail'] });
    },
  });

  return mutate;
};
