import { Injectable } from "@angular/core";
import { ApiBaseService } from "../../../services/api-base.service";
import { ServiceResponse } from "../../../models/auth.models";
import { Observable } from "rxjs";
import { User, UserByIdRequest } from "./model/user.model";
import { API_ENDPOINTS } from "../../../constants/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint = 'User';
    constructor(private api: ApiBaseService) {}

    getAll(): Observable<ServiceResponse<User[]>> {
      return this.api.get<User[]>(API_ENDPOINTS.User.GET_ALL);          // T = Department[]
    }

    getById(request: UserByIdRequest): Observable<ServiceResponse<User>> {
      return this.api.get<User>(
        API_ENDPOINTS.User.GET_BY_ID,
        request   // ← any dev immediately knows it's a typed request object
      );
    }


    create(obj: User): Observable<ServiceResponse<User>> {
      return this.api.post<User>(API_ENDPOINTS.User.INSERT, obj);  // T = Department
    }

    // update(id: number, obj: Department): Observable<ServiceResponse<Department>> {
    //   return this.api.put<Department>(`${this.endpoint}/${id}`, obj);
    // }
    update(obj: User): Observable<ServiceResponse<User>> {
      return this.api.post<User>(API_ENDPOINTS.User.UPDATE, obj);  // T = Department
    }

    delete(id: number): Observable<ServiceResponse<User>> {
      return this.api.delete<User>(`${this.endpoint}/${id}`);
    }

}
