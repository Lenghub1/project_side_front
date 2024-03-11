import { api } from ".";
import { AxiosResponse } from "axios";
import { Employement } from "@/utils/interfaces/Employment";

const transformEmployeeData = (
  data: any
): Partial<Employement> | Partial<Employement>[] => {
  const parsedData = JSON.parse(data);
  if (Array.isArray(parsedData)) {
    return parsedData.map((responseData: any) => ({
      id: responseData.id,
      name: `${responseData.user.firstName} ${responseData.user.lastName}`,
      position: responseData.position,
      status: responseData.status,
      privilege: responseData.privilege,
    }));
  } else {
    return {
      id: parsedData.data.id,
      name: `${parsedData.data.user.firstName} ${parsedData.data.user.lastName}`,
      position: parsedData.data.position,
      status: parsedData.data.status,
      privilege: parsedData.data.privilege,
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
        transformResponse: [(response) => transformEmployeeData(response.data)],
      }
    );
    return response as AxiosResponse<Partial<Employement>[]>;
  } catch (error) {
    console.error("Error in allEmployees:", error);
    return {} as AxiosResponse<Partial<Employement>[]>;
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
        transformResponse: [(response) => transformEmployeeData(response.data)],
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
        transformResponse: [(response) => transformEmployeeData(response.data)],
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
        transformResponse: [(response) => transformEmployeeData(response.data)],
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
