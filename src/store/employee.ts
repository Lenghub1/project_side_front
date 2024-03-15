import { atom } from "recoil";
import { Employement } from "@/utils/interfaces/Employment";

export const allEmployees = atom<Employement[] | undefined>({
  key: "allEmployees",
  default: undefined,
});

export const employeeInfo = atom<Employement | undefined>({
  key: "employeeInfo",
  default: undefined,
});
