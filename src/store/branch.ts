import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { BranchData } from "@/utils/interfaces/Branch";
const { persistAtom } = recoilPersist();

export const selectBranch = atom<BranchData>({
  key: `selectBranch`,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
