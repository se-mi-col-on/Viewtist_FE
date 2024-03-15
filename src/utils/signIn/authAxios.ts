import axios, { AxiosError } from 'axios';
import { getRefreshToken } from '../../api';

export const getAuthAxios = (accessToken: string, refreshToken: string) => {
  const authAxios = axios.create({
    baseURL: '/api',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  authAxios.interceptors.response.use(
    (res) => res,
    async (e) => {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          const newAccessToken = await getRefreshToken(accessToken!, refreshToken!);
          localStorage.setItem('accessToken', newAccessToken);
          return (await axios.get(e.config?.url as string, e.config)).data;
        }
      }
    },
  );

  return authAxios;
};
