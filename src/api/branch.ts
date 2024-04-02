import { api } from "./index";

const myBranch = async (organizationId: string) => {
  const data = await api.get(`/organizations/${organizationId}/branches`);
  return data;
};
const createBranch = async (organizationId: string, data: any) => {
  const create_branch = await api.post(
    `/organizations/${organizationId}/branches`,
    data
  );
  return create_branch;
};
const modifyBranch = async (
  organizationId: string,
  branchId: string,
  data: any
) => {
  const response = await api.patch(
    `/organizations/${organizationId}/branches/${branchId}`,
    data
  );
  return response;
};
export { myBranch, createBranch, modifyBranch };
