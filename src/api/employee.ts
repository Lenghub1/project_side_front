import { api } from ".";
import { AxiosResponse } from "axios";
import { Filter, Sort } from "@/utils/interfaces/Feature";
import { Employement } from "@/utils/interfaces/Employment";
import {
  transformData,
  generateFieldMapping,
  combineFields,
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
});

const allEmployees = async (
  organizationId: string,
  filters: Filter[],
  sorts: Sort[],
  perPage: number = 20,
  page: number = 1
): Promise<AxiosResponse<Partial<Employement>[]>> => {
  // Construct filter query string
  const filterParams = filters
    .map(({ field, logicalClause, targetValue }) => {
      return `${field}_${logicalClause}=${targetValue}`;
    })
    .join("&");

  // Construct sort query string
  const sortParams = sorts
    .map(({ field, direction }) => {
      return direction === "asc" ? field : `-${field}`;
    })
    .join(",");

  // Create URL parameters
  const params = new URLSearchParams({
    ...(filterParams && { ...parseFilters(filters) }), // Pass filters dynamically
    ...(sortParams && { sort: sortParams }),
    perpage: perPage.toString(),
    page: page.toString(),
  });

  return api.get(`/organizations/${organizationId}/employments`, {
    params,
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        const newData = combineFields(data, "firstName", "lastName", "name");
        return newData;
      },
    ],
  });
};

// Helper function to parse filters dynamically
const parseFilters = (filters: Filter[]) => {
  const parsedFilters: { [key: string]: string } = {};
  filters.forEach(({ field, logicalClause, targetValue }) => {
    parsedFilters[`${field}_${logicalClause}`] = targetValue;
  });
  return parsedFilters;
};

const allWorkplace = async (
  userId: string
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.get(`/organizations/self-workplace/${userId}`, {});
};

const getUserEmployments = async (
  organizationId: string
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
  organizationId: string
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

const getAllPendingEmployees = async (
  organizationId: string
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
  organizationId: string
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
  organizationId: string
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
};
