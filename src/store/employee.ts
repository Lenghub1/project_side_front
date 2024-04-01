import { atom, selector } from "recoil";
import { Employement } from "@/utils/interfaces/Employment";
import { recoilPersist } from "recoil-persist";
import { selectedOrganization } from "./userStore";
const { persistAtom } = recoilPersist();

export const allEmployees = atom<Employement[] | undefined>({
  key: "allEmployees",
  default: undefined,
});

export const employeeInfo = atom<Employement | undefined>({
  key: "employeeInfo",
  default: undefined,
});

export const employeeFeatureData = atom<Employement[] | undefined>({
  key: "employeeFeatureData",
  default: undefined,
});

export const employees = atom<Employement[]>({
  key: `employees`,

  effects_UNSTABLE: [persistAtom],
});
export const employee = atom<Employement[]>({
  key: `employee`,
  default: undefined,
});
export const selectEmployee = selector({
  key: "selectEmployee",
  get: ({ get }) => {
    const organization = get(selectedOrganization);
    console.log("hi", organization);

    return organization.id;
  },
});
export const selectMembers = atom<string[] | null>({
  key: `selectMembers`,
  default: [],
  effects_UNSTABLE: [persistAtom],
});
