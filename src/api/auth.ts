import { api } from "./index";

const login = async () => {
  return api.get("/API_URL");
};

const loginApi = {
  login,
};

const signup = async (data: any) => {
  return api.post("/auth/signup", data);
};

const signupApi = {
  signup,
};

export default loginApi;

export { signupApi };
