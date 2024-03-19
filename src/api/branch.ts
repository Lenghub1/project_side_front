import { api } from "./index";

const myBranch = async (organizationId: string) => {
  const data = await api.get(`/organizations/${organizationId}/branchs`);
  return data;
};
const createBranch = async (organizationId: string, data: any) => {
  const create_branch = await api.post(
    `/organizations/${organizationId}/branchs`,
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
    `/organizations/${organizationId}/branchs/${branchId}`,
    data
  );
  return response;
};
export { myBranch, createBranch, modifyBranch };
