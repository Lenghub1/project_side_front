import { api } from "./index";

const myOrganization = async (organizationId: string) => {
  const data = await api.get(`/organizations/${organizationId}`);
  return data;
};

const newOrganization = async (data: object) => {
  return api.post(`/organizations`, data);
};

const updateOrganization = async (organizationId: string, data: object) => {
  return api.patch(`/organizations/:${organizationId}`, data);
};

const deleteOrganization = async (organizationId: string) => {
  return api.delete(`/organizations/:${organizationId}`);
};

export {
  myOrganization,
  newOrganization,
  updateOrganization,
  deleteOrganization,
};
