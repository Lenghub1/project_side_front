import { User } from "./User";
export interface Employement {
  id: string;
  user: User;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  organizationId: string;
  status: string;
  priviledge: string;
}
