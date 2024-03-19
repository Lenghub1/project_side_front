import { api } from "./index";

const organizationLocation = async (organizationId: string) => {
  const data = await api.get(`/organizations/${organizationId}/locations`);
  return data;
};

export { organizationLocation };
