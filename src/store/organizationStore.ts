import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const organizationState = atom<any>({
  key: "organizationState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
