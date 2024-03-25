import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Organization } from "@/utils/interfaces/Organization";
const { persistAtom } = recoilPersist();

export const organizationState = atom<any>({
  key: "organizationState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
export const searchResultState = atom<Organization>({
  key: "searchOrganizationState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
export const employeeRegister = atom<any>({
  key: "registerAsEmployee",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
