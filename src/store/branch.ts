import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const selectBranch = atom<string>({
  key: `selectBranch`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});
