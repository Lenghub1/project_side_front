import { api } from "./index";

const patchUser = async (userId: string, data: any) => {
  const response = await api.patch(`/users/${userId}`, data);
  return response;
};
export { patchUser };
