export interface Department {
  departmentId: number;
  name: string;
  description:string;
  createdDate: Date;
}

export interface CreateDepartmentRequest {
  Name: string;
  Description:string;
  createdDate: Date;
}
