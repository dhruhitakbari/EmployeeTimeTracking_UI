import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../models/auth.models';


export class ApiBaseService<T> {

  constructor(
    protected http: HttpClient,
    protected baseUrl: string // This will be the full path: e.g., https://localhost:7001/api/Department
  ) {}

   getAll(): Observable<ServiceResponse<T[]>> {
    return this.http.get<ServiceResponse<T[]>>(this.baseUrl);
  }

  getById(id: number): Observable<ServiceResponse<T>> {
    return this.http.get<ServiceResponse<T>>(`${this.baseUrl}/${id}`);
  }

  create(model: T): Observable<ServiceResponse<string>> {
    return this.http.post<ServiceResponse<string>>(this.baseUrl, model);
  }

  update(id: number, model: T): Observable<ServiceResponse<string>> {
    return this.http.put<ServiceResponse<string>>(`${this.baseUrl}/${id}`, model);
  }

  delete(id: number): Observable<ServiceResponse<string>> {
    return this.http.delete<ServiceResponse<string>>(`${this.baseUrl}/${id}`);
  }

  // get<T>(endpoint:string, params?: Record<string, any>): Observable<ServiceResponse<T>>  {
  //   const httpParams = this.buildParams(params);
  //   return this.http.get<ServiceResponse<T>>('${this.baseUrl}/${endPoint}',{params:httpParams});
  // }

  // post<T>(endpoint: string, body: any): Observable<ServiceResponse<string>> {
  //   return this.http.post<ServiceResponse<string>>(`${this.baseUrl}/${endpoint}`, body);
  // }`

  // put<T>(endpoint: string, body: any): Observable<ServiceResponse<string>> {
  //   return this.http.put<ServiceResponse<string>>(`${this.baseUrl}/${endpoint}`, body);
  // }

  // delete<T>(endpoint: string): Observable<ServiceResponse<string>> {
  //   return this.http.delete<ServiceResponse<string>>(`${this.baseUrl}/${endpoint}`);
  // }


  // private buildParams(params?: Record<string, any>): HttpParams {
  //   let httpParams = new HttpParams();
  //   if (params) {
  //     Object.entries(params).forEach(([key, value]) => {
  //       if (value !== null && value !== undefined) {
  //         httpParams = httpParams.set(key, value);
  //       }
  //     });
  //   }
  //   return httpParams;
  // }
}
