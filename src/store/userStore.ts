import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// select campus
export const campusState = atom<string | null>({
  key: `campusState`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// login user info
export const loginUserState = atom<string | null>({
  key: `loginUserState`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: null,
});

export const userState = atom<Object | null>({
  key: "userState",
  default: {},
});

export const axiosInterceptorState = atom({
  key: "axiosInterceptorState",
  default: false,
});
