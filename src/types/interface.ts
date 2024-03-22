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
  readonly category: string;
  readonly id: number;
  readonly profilePhotoUrl: string;
  readonly start_at: string;
  readonly streamerNickname: string;
  readonly title: string;
  readonly viewerCount: number;
  readonly thumbnail: string;
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
