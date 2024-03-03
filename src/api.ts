import axios from 'axios';
import { ISubscribeList } from './types/interface';

export const getsubscribeList = async () => {
  return (await axios.get('http://localhost:3001/subscribe-list')).data;
};

export const addSubscribe = async ({ id, name }: ISubscribeList) => {
  return (await axios.post('http://localhost:3001/subscribe-list', { id, name })).data;
};

export const removeSubscribe = async (id: number) => {
  return (await axios.delete(`http://localhost:3001/subscribe-list/${id}`)).data;
};
