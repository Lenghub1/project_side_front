import { api } from "./index";

const my_organization = async (organizationId: string) => {
  const data = await api.get(`/organizations/${organizationId}`);
  return data;
};

const new_organization = async (data: object) => {
  return api.post(`/organizations`, data);
};

const update_organization = async (organizationId: string, data: object) => {
  return api.patch(`/organizations/:${organizationId}`, data);
};

const delete_organization = async (organizationId: string) => {
  return api.delete(`/organizations/:${organizationId}`);
};

export {
  my_organization,
  new_organization,
  update_organization,
  delete_organization,
};
