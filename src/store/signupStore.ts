import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// select accountType
export const accountTypeState = atom<"employee" | "employer" | null>({
  key: `accountTypeState`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});
