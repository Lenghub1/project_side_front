import { atom, selector } from "recoil";
import { testApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

const groupRefetchTrigger = atom({
  key: "groupRefetchTrigger",
  default: 0,
});

// selector to fetch data
const fetchGroupSelector = selector({
  key: "fetchGroupSelector",
  get: async () => {
    const [response, error] = await handleApiRequest(() => testApi.getGroup());
    if (error) {
      return error;
    }
    return response.data;
  },
});

export { groupRefetchTrigger, fetchGroupSelector };
