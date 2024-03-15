import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNickname } from '../../api';

// export const useUpdatePage = (nickname: string, channelIntroduction: string) => {
//   const { data } = useQuery({
//     queryKey: ['updateInfo'],
//     queryFn: () => updatePage(nickname, channelIntroduction),
//   });

//   return data;
// };

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
