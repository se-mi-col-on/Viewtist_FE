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
  readonly readOnly:boolean
}
export interface IUpdatePost {
  title: string;
  content: string;
}
