export interface User {
    UserId: number;
    FirstName: string;
    LastName: string;
    FullName: string;
    Email: string;
    IsPasswordChanged: boolean;
    IsPasswordReset: boolean;
    DepartmentId: boolean;
    DesignationId: boolean;
    createdDate: Date;
}


export interface UserByIdRequest {
  id: number;
}
