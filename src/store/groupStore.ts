import Recoil, { atom, selector } from "recoil";
import { testApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

export const groupRefetchTrigger = atom({
  key: "groupRefetchTrigger",
  default: 0,
});

/**
 * selector to fetch data
 * recoil selectors are designed to be idempotent, meaning
 * that for a give set of inputs, they should always produce
 * the same result
 * */
const fetchGroupSelector = selector({
  key: "fetchGroupSelector",
  get: async ({ get }) => {
    get(groupRefetchTrigger);
    const [response, error] = await handleApiRequest(() => testApi.getGroup());
    if (error) {
      throw error;
    }
    return response.data;
  },
  set: ({ set }, value) => {
    if (value instanceof Recoil.DefaultValue) {
      /**
       * This pattern allows us to use the `reset`
       * method on the selector as a way to trigger refetch
       * or re-evaluations of the data fetched by the selector
       */
      set(groupRefetchTrigger, (val) => val + 1);
    }
  },
});

export { fetchGroupSelector };
