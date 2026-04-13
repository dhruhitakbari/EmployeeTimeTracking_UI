import { API_ENDPOINTS } from './../../../constants/api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department, DepartmentByIdRequest } from './model/department.model';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../../models/auth.models';
import { ApiBaseService } from '../../../services/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly endpoint = 'Department';
  constructor(private api: ApiBaseService) {}

  getAll(): Observable<ServiceResponse<Department[]>> {
    return this.api.get<Department[]>(API_ENDPOINTS.DEPARTMENT.GET_ALL);          // T = Department[]
  }

  getById(request: DepartmentByIdRequest): Observable<ServiceResponse<Department>> {
  return this.api.get<Department>(
    API_ENDPOINTS.DEPARTMENT.GET_BY_ID,
    request   // ← any dev immediately knows it's a typed request object
  );
}


  create(obj: Department): Observable<ServiceResponse<Department>> {
    return this.api.post<Department>(API_ENDPOINTS.DEPARTMENT.INSERT, obj);  // T = Department
  }

  update(id: number, obj: Department): Observable<ServiceResponse<Department>> {
    return this.api.put<Department>(`${this.endpoint}/${id}`, obj);
  }

  delete(id: number): Observable<ServiceResponse<Department>> {
    return this.api.delete<Department>(`${this.endpoint}/${id}`);
  }
}
