import { ServiceResponse } from './../../models/auth.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiBaseService {
  private readonly baseUrl:string = 'https://localhost:44334/api'

  constructor( protected http: HttpClient ) {}

  get<T>(endpoint:string,params?: Record<string, any>):
    Observable<ServiceResponse<T>> {
      const httpParams = this.buildParams(params);
      return this.http.get<ServiceResponse<T>>(`${this.baseUrl}/${endpoint}`,{params:httpParams});
  }

    post<T>(endpoint: string, body: any): Observable<ServiceResponse<T>> {
        return this.http.post<ServiceResponse<T>>(`${this.baseUrl}/${endpoint}`, body);
    }

    put<T>(endpoint: string, body: any): Observable<ServiceResponse<T>> {
        return this.http.put<ServiceResponse<T>>(`${this.baseUrl}/${endpoint}`, body);
    }

  delete<T>(endpoint: string): Observable<ServiceResponse<T>> {
    return this.http.delete<ServiceResponse<T>>(`${this.baseUrl}/${endpoint}`);
}

  // Think of HttpParams as a "question mark" builder for URLs.
  // ex:https://api.com/users?page=2&limit=10&sort=name
  // The part after ? (page=2&limit=10&sort=name) is called query parameters.
  //HttpParams  is an Angular tool that helps you build that part correctly and safely.
  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value);
        }
      });
    }
    return httpParams;
  }
}
