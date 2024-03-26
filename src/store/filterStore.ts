import { atom } from "recoil";
export const filteredDataState = atom<any>({
  key: "filteredDataState",
  default: { isFilter: false, data: [] },
});
export const dataToFilterState = atom({
  key: "dataFilterToState",
  default: [],
});
