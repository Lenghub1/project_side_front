import { api } from ".";
import { AxiosResponse } from "axios";
import { Filter, Sort } from "@/utils/interfaces/Feature";
import { Employment } from "@/utils/interfaces/Employment";
import {
  transformData,
  generateFieldMapping,
  combineFields,
  buildFilterParams,
  buildSortParams,
  buildUrlParams,
} from "@/utils/api.util";

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
  orgId: "orgId",
});

const fetchDataWithTransform = async (url: string, params: URLSearchParams) => {
  return api.get(url, {
    params,
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        const newData = combineFields(
          data?.docs,
          "firstName",
          "lastName",
          "name"
        );
        return { docs: newData, pagination: data.pagination };
      },
    ],
  });
};

const allEmployees = async (
  organizationId: string,
  filters: Filter[],
  sorts: Sort[],
  perPage: number = 10,
  page: number = 1
): Promise<AxiosResponse<Partial<Employment>[]>> => {
  const filterParams = buildFilterParams(filters);
  const sortParams = buildSortParams(sorts);
  const params = buildUrlParams(
    filterParams,
    filters,
    sortParams,
    perPage,
    page
  );

  return fetchDataWithTransform(
    `/organizations/${organizationId}/employments`,
    params
  );
};
const manager = async (
  organizationId: string
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.get(
    `/organizations/${organizationId}/employments?privilege=super-admin&privilege=admin&privilege=maintainer&status=active`
  );
};
const allWorkplace = async (
  userId: string
): Promise<AxiosResponse<Partial<Employment>>> => {
  return api.get(`/organizations/self-workplace/${userId}`, {});
};

const getUserEmployments = async (
  organizationId: string
): Promise<AxiosResponse<Partial<Employment[]>>> => {
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
  organizationId: string
): Promise<AxiosResponse<Partial<Employment>>> => {
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

const getAllPendingEmployees = async (
  organizationId: string,
  filters: Filter[],
  sorts: Sort[],
  perPage: number = 20,
  page: number = 1
): Promise<AxiosResponse<Partial<Employment>[]>> => {
  const filterParams = buildFilterParams(filters);
  const sortParams = buildSortParams(sorts);
  const params = buildUrlParams(
    filterParams,
    filters,
    sortParams,
    perPage,
    page
  );

  return fetchDataWithTransform(
    `/organizations/${organizationId}/employments`,
    params
  );
};

const getEmployeeById = async (
  employmentId: string,
  organizationId: string
): Promise<AxiosResponse<Partial<Employment>>> => {
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
  organizationId: string
): Promise<AxiosResponse<Partial<Employment>>> => {
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

const deleteEmployee = async (employmentId: string, organizationId: string) =>
  api.delete(`/organizations/${organizationId}/employments/${employmentId}`);

export {
  allWorkplace,
  allEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllPendingEmployees,
  getUserEmployments,
  manager,
};
