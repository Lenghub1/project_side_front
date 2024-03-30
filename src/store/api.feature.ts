import { atom } from "recoil";
import { FilterSelection } from "@/utils/interfaces/Feature";

export const filterSelectionsState = atom<FilterSelection[]>({
  key: "filterSelectionsState",
  default: [],
});
