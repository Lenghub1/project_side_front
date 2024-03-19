import { api } from "./index";
import { transformData, generateFieldMapping } from "@/utils/api.util";

const fieldMapping = generateFieldMapping({
  id: "id",
  ownerId: "ownerId",
  name: "name",
  code: "code",
});
const myOrganization = async (organizationId: string) => {
  return api.get(`/organizations/${organizationId}`, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};
const newOrganization = async (data: object) => {
  return api.post(`/organizations`, data, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

const updateOrganization = async (organizationId: string, data: object) => {
  return api.patch(`/organizations/:${organizationId}`, data, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

const deleteOrganization = async (organizationId: string) => {
  return api.delete(`/organizations/:${organizationId}`, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

const getOrganizationById = async (organizationId: string) => {
  return api.get(`/organizations/:${organizationId}`, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

const getOrganizationByCode = async (code: string) => {
  return api.get(`/organizations/code/${code}`, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

export {
  codeOrganization,
  myOrganization,
  newOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizationById,
  getOrganizationByCode,
};
