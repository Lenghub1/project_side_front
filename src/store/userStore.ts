import { atom, selector } from "recoil";
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
  effects_UNSTABLE: [persistAtom],
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

export const selectedOrganization = atom({
  key: "selectedOrganization",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const forgotAccountInformation = atom({
  key: "forgotAccountInformation",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const resetPasswordToken = atom<Boolean>({
  key: "resetPasswordToken",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isAuthenticatedState = selector({
  key: "isAuthenticatedState",
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    return !!accessToken;
  },
});

export const isSelectedState = selector({
  key: "isSelectedState",
  get: ({ get }) => {
    const organization = get(selectedOrganization);
    return organization !== "";
  },
});

export const userRoleState = selector({
  key: "userRoleState",
  get: ({ get }) => {
    const user = get(userState);
    return user.firstName || "";
  },
});
