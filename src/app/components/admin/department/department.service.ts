import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../../services/services/api-base.service';
import { Department } from './model/department.model';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends ApiBaseService<Department> {

  constructor(http: HttpClient) {
    super(http, 'https://localhost:44334/api/Department');
  }

  SelectAllDepartment(): Observable<ServiceResponse<Department[]>> {
    return this.http.get<ServiceResponse<Department[]>>(
      `${this.baseUrl}/SelectAllDepartment`
    );
  }

  override create(obj: any): Observable<ServiceResponse<string>> {
    return this.http.post<ServiceResponse<string>>(
      `${this.baseUrl}/InsertDepartment`,
      obj
    );
  }

  override getById(id: number): Observable<ServiceResponse<Department>> {
    return this.http.get<ServiceResponse<Department>>(
      `${this.baseUrl}/SelectDepartment?id=${id}`
    );
  }

}
