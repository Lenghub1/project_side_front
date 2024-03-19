import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
interface EmploymentDetailState {
  status: string;
  id: string;
  phoneNumber: string;
  email: string;
  position: string;
  length: Number;
}
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

export const userState = atom<any | null>({
  key: "userState",
  default: {},
});

export const axiosInterceptorState = atom({
  key: "axiosInterceptorState",
  default: false,
});

export const isAccessTokenFetchedState = atom({
  key: "isAccessTokenFetchedState",
  default: false,
});

export const isUserFetchedState = atom({
  key: "isUserFetchedState",
  default: false,
});
export const employementDetail = atom<EmploymentDetailState>({
  key: `employementDetail`,

  effects_UNSTABLE: [persistAtom],
});

export const selectOrganization = atom({
  key: "chooseOrganization",
  default: "",
});
