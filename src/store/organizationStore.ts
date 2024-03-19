import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const organizationState = atom<any | null>({
  key: "organizationState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
