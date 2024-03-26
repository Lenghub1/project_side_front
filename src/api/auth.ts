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
  return api.get(`/users/${id}`);
};

const telegramOauth = async (user: any) => {
  return api.post("/auth/telegram/callback", { user });
};

const findForgotAccount = async (data: any) => {
  return api.post(`/users/name`, data);
};

const forgotAccountVerification = async (data: any) => {
  return api.post(`/auth/forgot/account`, data);
};

const verifyPhoneNumber = async (data: any) => {
  return api.post(`/auth/verify/phone`, data);
};

const verify2FA = async (data: any) => {
  return api.post(`/auth/verify/2FA`, data);
};

const verifyEmail = async (data: any) => {
  return api.post(`/auth/verify/email`, data);
};

const forgotPassword = async (method: string, data: any) => {
  return api.post(`/auth/forgot/${method}/password`, data);
};

const verifyForgetPasswordToken = async (data: any) => {
  return api.post(`auth/verify/reset/password`, data);
};

const resetPassword = async (newPassword: string) => {
  return api.patch(`auth/reset/password`, { newPassword });
};

const clearResetToken = async () => {
  return api.post("auth/clearToken");
};

const resendActivationCode = async (method: string, data: any) => {
  return api.post(`/auth/resend/${method}/activation`, data);
};

const authApi = {
  testLogin,
  signup,
  refresh,
  logout,
  getUser,
  telegramOauth,
  forgotPassword,
  verifyForgetPasswordToken,
  resetPassword,
  findForgotAccount,
  forgotAccountVerification,
  verifyPhoneNumber,
  verify2FA,
  verifyEmail,
  clearResetToken,
  resendActivationCode,
};

const getGroup = async () => {
  return api.get(`/groups`);
};

const testApi = {
  getGroup,
};

export default loginApi;

export { authApi, testApi };
