import { api } from ".";
import { AxiosResponse } from "axios";
import { Employement } from "@/utils/interfaces/Employment";

const currentOrganizationId = "30ed163a-f86f-4b6d-8a9e-eb4263e5a9de";
const transformEmployeeData = (
  response: any
): Partial<Employement> | Partial<Employement>[] => {
  const parsedResponse = JSON.parse(response);
  const { data, status_code } = parsedResponse;

  console.log(data);
  if (!String(status_code).startsWith("2")) {
    console.error("Received non-OK status:", status_code);
    return parsedResponse;
  }

  if (Array.isArray(data.data)) {
    return data.data.map((responseData: any) => ({
      id: responseData.id,
      userId: responseData.user.id,
      name: `${responseData.user.firstName} ${responseData.user.lastName}`,
      position: responseData.position,
      status: responseData.status,
      privilege: responseData.privilege,
    }));
  } else {
    return {
      id: data.id,
      userId: data.user.id,
      name: `${data.user.firstName} ${data.user.lastName}`,
      position: data.position,
      status: data.status,
      privilege: data.privilege,
    };
  }
};

const allEmployees = async (
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>[]>> => {
  return api.get(
    `/organizations/${organizationId}/employments?status_ne=pending`,
    {
      transformResponse: [(response) => transformEmployeeData(response)],
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
      transformResponse: [(response) => transformEmployeeData(response)],
    }
  );
};

const createEmployee = async (
  data: Object,
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.post(`/organizations/${organizationId}/employments`, data, {
    transformResponse: [(response) => transformEmployeeData(response)],
  });
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
      transformResponse: [(response) => transformEmployeeData(response)],
    }
  );
};

const deleteEmployee = async (
  employmentId: string,
  organizationId: string = currentOrganizationId
) => api.delete(`/organizations/${organizationId}/employments/${employmentId}`);

const getAllPendingEmployees = async (
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement>>> => {
  return api.get(
    `/organizations/${organizationId}/employments?status_eq=pending`,
    {
      transformResponse: [(response) => transformEmployeeData(response)],
    }
  );
};

export {
  allEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllPendingEmployees,
};
