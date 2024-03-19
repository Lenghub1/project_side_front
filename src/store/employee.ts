import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { EmploymentWithAction } from "@/components/table/Table";
const { persistAtom } = recoilPersist();

export const employees = atom<EmploymentWithAction[]>({
  key: `employees`,

  effects_UNSTABLE: [persistAtom],
});
export const selectMembers = atom<string[] | null>({
  key: `selectMembers`,
  default: [],
  effects_UNSTABLE: [persistAtom],
});
