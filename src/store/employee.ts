import { atom, selector } from "recoil";
import { Employment } from "@/utils/interfaces/Employment";
import { recoilPersist } from "recoil-persist";
import { selectedOrganization } from "./userStore";
const { persistAtom } = recoilPersist();

export const allEmployees = atom<Employment[] | undefined>({
  key: "allEmployees",
  default: undefined,
});

export const employeeInfo = atom<Employment | undefined>({
  key: "employeeInfo",
  default: undefined,
});

export const employeeFeatureData = atom<Employment[] | undefined>({
  key: "employeeFeatureData",
  default: undefined,
});

export const employees = atom<Employment[]>({
  key: `employees`,
  effects_UNSTABLE: [persistAtom],
});

export const employeeId = atom<string>({
  key: `employee`,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
export const selectEmployee = selector({
  key: "selectEmployee",
  get: ({ get }) => {
    const organization = get(selectedOrganization);

    return organization.id;
  },
});

export const selectMembers = atom<string[] | null>({
  key: `selectMembers`,
  default: [],
  effects_UNSTABLE: [persistAtom],
});
