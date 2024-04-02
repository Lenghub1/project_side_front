import { atom } from "recoil";
import { Filter } from "@/utils/interfaces/Feature";
import { APIFeatureLocation } from "@/utils/interfaces/Feature";

export const filterSelectionsState = atom<Filter[]>({
  key: "filterSelectionsState",
  default: [],
});

export const apiFeatureState = atom<APIFeatureLocation[]>({
  key: "apiFeatureState",
  default: [],
});
