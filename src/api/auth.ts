import { api } from "./index";

const login = async (method: string, data: any) => {
  console.log("My data", data);
  return api.post(`/auth/login/${method}`, data);
};

const loginApi = {
  login,
};

const signup = async (method: string, data: any) => {
  return api.post(`/auth/signup/${method}`, data);
};

const testLogin = async (method: string, data: any) => {
  return api.post(`/auth/login/${method}`, data);
};

const refresh = async () => {
  return api.get("/auth/refresh");
};

const logout = async () => {
  return api.post("/auth/logout");
};

const getUser = async (id: string) => {
  return api.get(`/users/me/${id}`);
};

const authApi = {
  testLogin,
  signup,
  refresh,
  logout,
  getUser,
};

const getGroup = async () => {
  return api.get(`/groups`);
};

const testApi = {
  getGroup,
};

export default loginApi;

export { authApi, testApi };
