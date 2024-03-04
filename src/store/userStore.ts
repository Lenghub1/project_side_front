import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// select campus
export const campusState = atom<string | null>({
  key: `campusState`,
  default: null,
  effects_UNSTABLE: [persistAtom]
});

// login user info
export const loginUserState = atom<string | null>({
  key: `loginUserState`,
  default: null,
  effects_UNSTABLE: [persistAtom]
});
