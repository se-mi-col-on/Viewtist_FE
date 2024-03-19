//recoil
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
