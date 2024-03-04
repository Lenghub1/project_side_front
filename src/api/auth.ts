import { api } from "./index";

const login = async () => {
  return api.get("/API_URL");
};

const loginApi = {
  login
};

export default loginApi;
