import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const oauthErrorState = atom<boolean>({
  key: `oauthErrorState`,
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const ErrorStatus = atom<any>({
  key: `ErrorStatus`,
  default: undefined,
});
