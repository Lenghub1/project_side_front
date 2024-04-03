export interface UserContact {
  email: string;
  phone: string;
}
export interface Employment {
  id: string;
  userId: string;
  name: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  profilePicture: string;
  status: string;
  privilege: string;
  workLocation: string;
  orgId: string;
  user: UserContact;
}
