// --- REQUEST MODELS ---

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  designationId?: number; // Optional (nullable) as we decided
}

// --- RESPONSE MODELS ---

export interface LoginResponse {
  token: string;
  email: string;
  role: string;
  // You can add 'fullName' or 'id' here if your API returns them
}

// This matches your C# "ServiceResponse<T>" wrapper
export interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
