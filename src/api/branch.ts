import { api } from "./index";

const my_branch = async (organizationId: string) => {
  const data = await api.get(`/organizations/${organizationId}/branchs`);
  return data;
};
const create_branch = async(organizationId:string,data: any) =>{
    const create_branch = await api.post(`/organizations/${organizationId}/branchs`,data)
    return create_branch
}
export {
    my_branch,
    create_branch
}
