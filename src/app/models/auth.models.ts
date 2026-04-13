// auth.models.ts

// ─── REQUEST MODELS (what we SEND to API) ───────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  designationId: number;
}

// ─── RESPONSE MODELS (what we GET from API) ──────────────────────────────────

export interface LoginResponse {
  token: string;
  email: string;
  role: string;
  fullName: string;
}

export interface RegisterResponse {
  userId: number;
  email: string;
  fullName: string;
  token: string;
}

// ─── GENERIC API WRAPPER (matches your ServiceResponse<T> in .NET) ───────────

export interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

// ─── DECODED JWT (what's inside your token) ──────────────────────────────────

export interface DecodedToken {
  sub: string;       // userId
  email: string;
  role: string;      // "Admin" or "Employee"
  name: string;
  jti: string;
  exp: number;       // expiry timestamp
  iss: string;
  aud: string;
}
