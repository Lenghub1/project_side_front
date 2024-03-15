import { api } from ".";
import { AxiosResponse } from "axios";
import { Employement } from "@/utils/interfaces/Employment";

const currentOrganizationId = "affbc0b2-677d-417f-a08e-d691e7535dee";
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
      userId: responseData.userId,
      name: `${responseData.user.firstName} ${responseData.user.lastName}`,
      position: responseData.position,
      status: responseData.status,
      privilege: responseData.priviledge,
      email: responseData.users.email,
      phoneNumber: responseData.users.phoneNumber,
    }));
  } else {
    return {
      id: data.id,
      userId: data.userId,
      name: `${data.user.firstName} ${data.user.lastName}`,
      position: data.position,
      status: data.status,
      privilege: data.priviledge,
      email: data.user.email,
      phoneNumber: data.users.phoneNumber,
    };
  }
};
const allWorkplace = async (
  userId: string
): Promise<AxiosResponse<Partial<Employement>[]>> => {
  return api.get(`/organizations/self-workplace/${userId}`);
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
const getUserEmployments = async (
  organizationId: string = currentOrganizationId
): Promise<AxiosResponse<Partial<Employement[]>>> => {
  return api.get(`/organizations/${organizationId}/employments/user`, {
    transformResponse: [(response) => transformEmployeeData(response)],
  });
};

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
