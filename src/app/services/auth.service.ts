// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse,
  ServiceResponse, DecodedToken
} from '../models/auth.models';  // ← adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ─── CONFIG ────────────────────────────────────────────────────────────────
  private readonly API_URL   = 'https://localhost:44334/api/Auth';
  private readonly TOKEN_KEY = 'emp_token';

  // ─── STATE ─────────────────────────────────────────────────────────────────
  // BehaviorSubject lets any component subscribe and react to login/logout
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public  isLoggedIn$       = this.isLoggedInSubject.asObservable();

  constructor(
    private http:    HttpClient,
    private router:  Router,
    private toastr:  ToastrService
  ) {}

  // ─── LOGIN ─────────────────────────────────────────────────────────────────
  login(request: LoginRequest): Observable<ServiceResponse<LoginResponse>> {
    return this.http
      .post<ServiceResponse<LoginResponse>>(`${this.API_URL}/login`, request)
      .pipe(
        tap(response => {
          if (response.success && response.data?.token) {
            this.saveToken(response.data.token);
            this.toastr.success(`Welcome back, ${response.data.fullName}!`, 'Login Successful');
          }
        })
      );
  }

  // ─── REGISTER ──────────────────────────────────────────────────────────────
  register(request: RegisterRequest): Observable<ServiceResponse<RegisterResponse>> {
    return this.http
      .post<ServiceResponse<RegisterResponse>>(`${this.API_URL}/register`, request)
      .pipe(
        tap(response => {
          if (response.success && response.data?.token) {
            this.saveToken(response.data.token);
            this.toastr.success('Registration successful! Welcome!');
          }
        })
      );
  }

  // ─── LOGOUT ────────────────────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSubject.next(false);
    this.toastr.info('Logged out successfully');
    this.router.navigate(['/login']);
  }

  // ─── TOKEN HELPERS ─────────────────────────────────────────────────────────

  // Called by JwtInterceptor to attach token to every request
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Decode the JWT payload — no external library needed!
  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];       // get middle part
      const decoded = atob(payload);             // base64 decode
      return JSON.parse(decoded) as DecodedToken;
    } catch {
      return null;
    }
  }

  // ─── USER INFO (read from token — no extra API call needed!) ───────────────
  getUserRole(): string | null {
    return this.getDecodedToken()?.role ?? null;
  }

  getUserName(): string | null {
    return this.getDecodedToken()?.name ?? null;
  }

  getUserEmail(): string | null {
    return this.getDecodedToken()?.email ?? null;
  }

  getUserId(): string | null {
    return this.getDecodedToken()?.sub ?? null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isEmployee(): boolean {
    return this.getUserRole() === 'Employee';
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return true;
    const now = Math.floor(Date.now() / 1000);  // current time in seconds
    return decoded.exp < now;
  }

  // ─── PRIVATE HELPERS ───────────────────────────────────────────────────────
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
