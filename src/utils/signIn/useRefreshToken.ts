import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useRefreshToken = (accessToken: string, refreshToken: string) => {
  useQuery({
    queryKey: ['refreshToken'],
    queryFn: async () => {
      try {
        const res = await axios
          .post(
            `/api/api/users/refresh-token`,
            {
              refreshToken,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: '*/*',
              },
            },
          )
          .then((res) => res.data);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
  });
};
