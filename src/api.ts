import axios from 'axios';
import {
  ISubscribeList,
  IUpdatePost,
  StreamingListArray,
  LiveSet,
  StreamDetail,
  UpdateStreamDetail,
} from './types/interface';
import { getAuthAxios } from './utils/signIn/authAxios';

export const getsubscribeList = async () => {
  // 구독 리스트 get
  return (await axios.get('http://localhost:3001/subscribe-list')).data;
};

export const addSubscribe = async ({ id, name }: ISubscribeList) => {
  //구독 추가
  return (await axios.post('http://localhost:3001/subscribe-list', { id, name })).data;
};

export const removeSubscribe = async (id: number) => {
  // 구독 취소
  return (await axios.delete(`http://localhost:3001/subscribe-list/${id}`)).data;
};

export const getLiveStreamingList = async () => {
  const response = await axios.get('http://localhost:3001/liveStreaming-list');
  return response.data as StreamingListArray;
};

export const getPosts = async () => {
  // 전체 게시글 get
  return (await axios.get('http://localhost:3001/posts')).data;
};

export const sendPost = async (payload: IUpdatePost) => {
  // 게시글 생성
  try {
    (await axios.post('http://localhost:3001/posts', payload)).data;
  } catch (e) {
    console.log(e);
  }
};
export const getPostDetail = async (id: number) => {
  // 각 게시글 get
  return (await axios.get(`http://localhost:3001/posts/${id}`)).data;
};

export const deletePost = async (id: number) => {
  // 게시글 삭제
  try {
    (await axios.delete(`http://localhost:3001/posts/${id}`)).data;
  } catch (e) {
    console.log(e);
  }
};

export const updatePost = async (id: number, payload: { title: string; content: string }) => {
  // 게시글 수정
  return (await axios.put(`http://localhost:3001/posts/${id}`, payload)).data;
};

export const getMyPage = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get('/api/api/users/mypage')).data;
  console.log(res);
  return res;
};

export const getRefreshToken = async (accessToken: string, refreshToken: string) => {
  try {
    return await axios
      .post(`/api/api/users/refresh-token`, `${refreshToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: '*/*',
        },
      })
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};

export const updateNickname = async (nickname: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = await authAxios
    .put(
      '/api/api/users/nickname',
      { nickname },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    .then((res) => res.data);
  console.log(res);
  return res;
};

export const updateIntro = async (intro: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = await authAxios
    .put(
      '/api/api/users/introduction',
      {
        introduction: intro,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    .then((res) => res.data);
  console.log(res);
  return res;
};

export const getStreamKey = async (): Promise<string> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get('/api/api/users/stream-key')).data;
  console.log(res);
  return res;
};

export const getRefreshStreamKey = async (): Promise<string> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get('/api/api/users/refresh-stream-key')).data;
  console.log(res);
  return res;
};

export const createStreaming = async (streamOption: LiveSet) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  try {
    return await authAxios
      .post(`/live/api/live-streaming/start`, streamOption)
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};

export const getStreamDetail = async (streamId: string | undefined): Promise<StreamDetail> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get(`/live/api/live-streaming/${streamId}`)).data;
  console.log(res);
  return res;
};

export const deleteStreaming = async (streamId: string | undefined): Promise<string> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.delete(`/live/api/live-streaming/${streamId}`)).data;
  console.log(res);
  return res;
};

export const updateStreamDetail = async (
  streamId: string | undefined,
  newDetail: UpdateStreamDetail,
): Promise<string> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = await authAxios
    .put(`/live/api/live-streaming/${streamId}`, newDetail)
    .then((res) => res.data);
  console.log(res);
  return res;
};
