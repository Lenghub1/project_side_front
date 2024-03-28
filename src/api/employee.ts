import { api } from ".";
import { AxiosResponse } from "axios";
import { Employement } from "@/utils/interfaces/Employment";
import {
  transformData,
  generateFieldMapping,
  combineFields,
} from "@/utils/api.util";

const data = JSON.parse(localStorage.getItem("recoil-persist")!);
console.log(data?.selectedOrganization);

const currentOrganizationId = data?.selectedOrganization;

const fieldMapping = generateFieldMapping({
  id: "id",
  userId: "userId",
  firstName: "user.firstName",
  lastName: "user.lastName",
  user: {
    email: "email",
    phone: "phoneNumber",
  },
  position: "position",
  status: "status",
  privilege: "privilege",
});

const allWorkplace = async (
  userId: string
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.get(`/organizations/self-workplace/${userId}`, {});
};

const getUserEmployments = async (
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement[]>>> => {
  return api.get(`/organizations/${organizationId}/employments/user`, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        const newData = combineFields(data, "firstName", "lastName", "name");
        return newData;
      },
    ],
  });
};

const createEmployee = async (
  data: Object,
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.post(`/organizations/${organizationId}/employments`, data, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        const newData = combineFields(data, "firstName", "lastName", "name");
        return newData;
      },
    ],
  });
};

const allEmployees = async (
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>[]>> => {
  return api.get(
    `/organizations/${organizationId}/employments?status_ne=pending`,
    {
      transformResponse: [
        (response) => {
          const data = transformData(response, fieldMapping);
          const newData = combineFields(data, "firstName", "lastName", "name");
          return newData;
        },
      ],
    }
  );
};

const getAllPendingEmployees = async (
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.get(
    `/organizations/${organizationId}/employments?status_eq=pending`,
    {
      transformResponse: [
        (response) => {
          const data = transformData(response, fieldMapping);
          const newData = combineFields(data, "firstName", "lastName", "name");
          return newData;
        },
      ],
    }
  );
};

const getEmployeeById = async (
  employmentId: string,
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.get(
    `/organizations/${organizationId}/employments/${employmentId}`,
    {
      transformResponse: [
        (response) => {
          const data = transformData(response, fieldMapping);
          const newData = combineFields(data, "firstName", "lastName", "name");
          return newData;
        },
      ],
    }
  );
};

const updateEmployee = async (
  data: Object,
  employmentId: string,
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.patch(
    `/organizations/${organizationId}/employments/${employmentId}`,
    data,
    {
      transformResponse: [
        (response) => {
          const data = transformData(response, fieldMapping);
          const newData = combineFields(data, "firstName", "lastName", "name");
          return newData;
        },
      ],
    }
  );
};

const deleteEmployee = async (
  employmentId: string,
  organizationId: string = currentOrganizationId
) => api.delete(`/organizations/${organizationId}/employments/${employmentId}`);

export {
  allWorkplace,
  allEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllPendingEmployees,
  getUserEmployments,
};
