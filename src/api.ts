import axios from 'axios';
import {
  // ISubscribeList,
  IUpdatePost,
  LiveSet,
  StreamDetail,
  UpdateStreamDetail,
  IAllPosts,
} from './types/interface';
import { getAuthAxios } from './utils/signIn/authAxios';

// export const getsubscribeList = async () => {
//   // 구독 리스트 get
//   return (await axios.get('http://localhost:3001/subscribe-list')).data;
// };

// export const addSubscribe = async ({ id, name }: ISubscribeList) => {
//   //구독 추가
//   return (await axios.post('http://localhost:3001/subscribe-list', { id, name })).data;
// };

// export const removeSubscribe = async (id: number) => {
//   // 구독 취소
//   return (await axios.delete(`http://localhost:3001/subscribe-list/${id}`)).data;
// };

// export const getLiveStreamingList = async () => {
//   const response = await axios.get('http://localhost:3001/liveStreaming-list');
//   return response.data as StreamingListArray;
// };

export const getPosts = async (page: number = 0, size: number = 1000) => {
  // 전체 게시글 get
  // return (await axios.get('http://localhost:3001/posts')).data;

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  return await authAxios
    .get<IAllPosts>('/api/api/post', {
      params: {
        page,
        size,
      },
    })
    .then((res) => res.data.content);
};

export const sendPost = async (payload: IUpdatePost) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  return await authAxios
    .post('/api/api/post/write', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};
export const getPostDetail = async (id: number) => {
  // 각 게시글 get
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  return (await authAxios.get(`/api/api/post/${id}`)).data;
};

export const deletePost = async (id: number) => {
  // 게시글 삭제
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  return (await authAxios.delete(`/api/api/post/${id}`)).data;
};

export const updatePost = async (id: number, payload: { title: string; content: string }) => {
  // 게시글 수정

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  return (await authAxios.put(`/api/api/post/${id}`, payload)).data;
};

export const getMyPage = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get('/api/api/users/mypage')).data;
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
  return res;
};

export const getStreamKey = async (streamerNickname: string | undefined): Promise<string> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);
  const res = (await authAxios.get(`/api/api/users/stream-key/${streamerNickname}`)).data;
  return res;
};

export const getRefreshStreamKey = async (): Promise<string> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get('/api/api/users/refresh-stream-key')).data;
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
  return res;
};

export const deleteStreaming = async (streamId: string | undefined): Promise<string> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.delete(`/live/api/live-streaming/${streamId}`)).data;
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
  return res;
};

export const getUserInfo = async (userNickname: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get(`/api/api/users/${userNickname}`)).data;
  return res;
};

export const getLiveStreamingAllList = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (
    await authAxios.get(
      `/live/api/live-streaming/all-streaming?page=0&size=999&sort=viewerCount,desc`,
    )
  ).data;
  return res;
};

export const getLiveStreamingList = async (pageNumber: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);
  const pageSize = 8;

  const res = (
    await authAxios.get(
      `/live/api/live-streaming/all-streaming?page=${pageNumber}&size=${pageSize}&sort=viewerCount,desc`,
    )
  ).data;
  return res;
};

export const getLiveStreamingCategoryList = async (pageNumber: number, category: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);
  const pageSize = 8;

  const res = (
    await authAxios.get(
      `/live/api/live-streaming/category?category=${category.toUpperCase()}&page=${pageNumber}&size=${pageSize}&sort=viewerCount,desc`,
    )
  ).data;
  return res;
};

export const getLiveStreamingKeywordList = async (pageNumber: number, keyWord: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);
  const pageSize = 8;

  const res = (
    await authAxios.get(
      `/live/api/live-streaming/search?keyword=${keyWord}&page=${pageNumber}&size=${pageSize}&sort=viewerCount,desc`,
    )
  ).data;
  return res;
};

export const updateThumbnail = async (streamId: string | undefined, encodeString: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = await authAxios.put(`/live/api/live-streaming/thumbnail/${streamId}`, {
    thumbnail: encodeString,
  });
  return res.data;
};

export const getSubscribeList = async (nickname: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.get(`/api/api/users/subscribe/${nickname}?page=0&size=999`)).data;
  return res.content;
};

export const addSubscribe = async (nickname: string | undefined) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (await authAxios.post(`/api/api/users/subscribe`, nickname)).data;
  return res;
};

export const deleteSubscribe = async (nickname: string | undefined) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authAxios = getAuthAxios(accessToken!, refreshToken!);

  const res = (
    await authAxios.delete(`/api/api/users/unsubscribe`, {
      data: nickname,
    })
  ).data;
  return res;
};
