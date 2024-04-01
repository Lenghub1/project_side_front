import { atom } from "recoil";
import { Filter } from "@/utils/interfaces/Feature";

export const filterSelectionsState = atom<Filter[]>({
  key: "filterSelectionsState",
  default: [],
});
