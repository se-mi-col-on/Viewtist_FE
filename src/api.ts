import axios from 'axios';
import { ISubscribeList, IUpdatePost, StreamingListArray } from './types/interface';
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

  const res = (await authAxios.get('/api/users/mypage')).data;
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
      '/api/users/update-nickname',
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
      '/api/users/update-introduction',
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
// export const updatePage = async (name: string, introduction: string) => {
//   const accessToken = localStorage.getItem('accessToken');
//   try {
//     const res = await axios
//       .put(
//         '/api/api/users/update-mypage',
//         {
//           nickname: name,
//           channelIntroduction: introduction,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': ' application/json',
//             Accept: '*/*',
//           },
//         },
//       )
//       .then((res) => res.data);
//     console.log(res);
//     return res;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };
