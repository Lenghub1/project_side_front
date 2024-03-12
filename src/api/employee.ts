import { api } from ".";
import { AxiosResponse } from "axios";
import { Employement } from "@/utils/interfaces/Employment";

const transformEmployeeData = (
  response: any
): Partial<Employement> | Partial<Employement>[] => {
  const { data, status_code } = JSON.parse(response);

  if (status_code !== 200) {
    console.error("Received non-OK status:", status_code);
    return [];
  }
  console.log(data);
  if (Array.isArray(data.data)) {
    return data.data.map((responseData: any) => ({
      id: responseData.id,
      name: `${responseData.user.firstName} ${responseData.user.lastName}`,
      position: responseData.position,
      status: responseData.status,
      privilege: responseData.privilege,
    }));
  } else {
    return {
      id: data.id,
      name: `${data.user.firstName} ${data.data.user.lastName}`,
      position: data.position,
      status: data.status,
      privilege: data.privilege,
    };
  }
};

const allEmployees = async (
  organizationId: string
): Promise<AxiosResponse<Partial<Employement>[]>> => {
  try {
    const response = await api.get(
      `/organizations/${organizationId}/employments`,
      {
        transformResponse: [(response) => transformEmployeeData(response)],
      }
    );
    console.log("API Response:", response);
    return response.data as AxiosResponse<Partial<Employement>[]>;
  } catch (error) {
    console.error("Error in allEmployees:", error);
    throw error; // Rethrow the error or handle it more gracefully
  }
};

const getEmployeeById = async (
  organizationId: string,
  employmentId: string
): Promise<AxiosResponse<Partial<Employement>>> => {
  try {
    const response = await api.get(
      `/organizations/${organizationId}/employments/${employmentId}`,
      {
        transformResponse: [(response) => transformEmployeeData(response)],
      }
    );
    return response as AxiosResponse<Partial<Employement>>;
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    return {} as AxiosResponse<Partial<Employement>>;
  }
};

const createEmployee = async (
  organizationId: string
): Promise<AxiosResponse<Partial<Employement>>> => {
  try {
    const response = await api.post(
      `/organizations/${organizationId}/employments`,
      {},
      {
        transformResponse: [(response) => transformEmployeeData(response)],
      }
    );
    return response as AxiosResponse<Partial<Employement>>;
  } catch (error) {
    console.error("Error in createEmployee:", error);
    return {} as AxiosResponse<Partial<Employement>>;
  }
};

const updateOrganization = async (
  organizationId: string,
  employmentId: string,
  data: any
): Promise<AxiosResponse<Partial<Employement>>> => {
  try {
    const response = await api.patch(
      `/organizations/${organizationId}/employments/${employmentId}`,
      { data },
      {
        transformResponse: [(response) => transformEmployeeData(response)],
      }
    );
    return response as AxiosResponse<Partial<Employement>>;
  } catch (error) {
    console.error("Error in updateOrganization:", error);
    return {} as AxiosResponse<Partial<Employement>>;
  }
};

const deleteOrganization = async (
  organizationId: string,
  employmentId: string
) => api.delete(`/organizations/${organizationId}/employments/${employmentId}`);

export {
  allEmployees,
  getEmployeeById,
  createEmployee,
  updateOrganization,
  deleteOrganization,
};
