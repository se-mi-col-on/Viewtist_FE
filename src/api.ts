import axios from 'axios';
import { ISubscribeList, IUpdatePost } from './types/interface';

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

export const getPosts = async () => {
  // 전체 게시글 get
  return (await axios.get('http://localhost:3001/posts')).data;
};

export const sendPost = async (payload: IUpdatePost) => {
  // 게시글 생성
  try {
    (
      await axios.post('http://localhost:3001/posts', payload)
    ).data;
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
