import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    debugger;
    // 1. Get the token from AuthService
    const token = this.authService.getToken();

    // 2. If token exists, clone the request and add the Authorization header "(Bearer)"
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    console.log(request);
    // 3. Pass the request to the next handler
    return next.handle(request);
  }
}
