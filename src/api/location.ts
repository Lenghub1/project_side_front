import { api } from "./index";

const organization_location = async (organizationId: string) => {
  const data = await api.get(`/organizations/${organizationId}/locations`);
  return data;
};

export { organization_location };
