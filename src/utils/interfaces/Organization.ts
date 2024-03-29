export interface Organization {
  id: string;
  code: string;
  name: string;
  ownerId: string;
  employeeCounts?: number;
  createdAt: Date;
  updatedAt: Date;
  data: any;
}
