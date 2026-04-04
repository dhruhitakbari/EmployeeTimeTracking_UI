import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest, LoginResponse, RegisterRequest, ServiceResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44334/api/Auth';

  private tokenKey = 'authToken';
  private userKey = 'userEmail';
  //private roleKey = 'userRole';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // REGISTER
  register(request: RegisterRequest): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(`${this.apiUrl}/register`, request).pipe(
      tap(response => {
        if (response.success && response.data?.token) {
          this.saveToken(
            response.data.token,
            response.data.email,
            response.data.role      // FIXED
          );
          this.toastr.success('Registration successful!', 'Welcome');
        }
      })
    );
  }

  // LOGIN
  login(request: LoginRequest): Observable<ServiceResponse<LoginResponse>> {
    return this.http.post<ServiceResponse<LoginResponse>>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.saveToken(
            response.data.token,
            response.data.email,
            response.data.role
          );
          this.toastr.success('Logged in successfully!');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);

    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
    this.toastr.info('Logged out successfully');
  }

  private saveToken(token: string, email: string, role: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, email);
    console.log('TOKEN:', localStorage.getItem('authToken'));
    const length = localStorage.getItem('authToken')?.split('.').length;
    console.log(length)
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    // return localStorage.getItem(this.roleKey);
    const decoded = this.getDecodedToken();
    return decoded?.role || null;
  }

  // NEW — Optional
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

  // NEW
  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
