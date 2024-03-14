export interface User {
  id: string;
  firstName: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  socialId: string;
  signupMethod: string;
  accountVerify: boolean;
  profilePicture: string;
  isActive: boolean;
  enabled2FA: boolean;
}
