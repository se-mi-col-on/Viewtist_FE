import { Dispatch, SetStateAction } from 'react';

export interface ISubscribeList {
  readonly id: number;
  readonly name: string;
}
export interface IPosts {
  readonly title: string;
  readonly content: string;
  readonly id: number;
}

export interface IEditor {
  readonly value: string;
  setValue: Dispatch<SetStateAction<string>>;
  readonly readOnly: boolean;
}
export interface IUpdatePost {
  title: string;
  content: string;
}

export interface StreamingData {
  readonly id: number;
  readonly user_id: string;
  readonly title: string;
  readonly category: string;
  readonly start_at: string;
  readonly viewer_count: number;
  readonly transmission_method: string;
  readonly created_at: string;
  readonly modified_at: string;
}

export interface StreamingListArray extends Array<StreamingData> {}

export interface IProfile {
  email: string;
  nickname: string;
  profilePhotoUrl: string;
  accountId: number | null;
  channelIntroduction: string;
}

export interface LiveSet {
  title: string;
  category: string;
}

export interface StreamDetail {
  id: number;
  title: string;
  category: string;
  streamerNickname: string;
  profilePhotoUrl: string;
  startAt: string;
  viewerCount: null;
}

export interface UpdateStreamDetail {
  updateTitle: string;
  updateCategory: string;
}

export interface IAllPosts {
  content: IContent[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IContent {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostListItem extends IContent {
  src: string;
}
