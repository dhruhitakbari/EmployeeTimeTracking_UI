import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/services/auth.service';
import { LoginRequest } from '../../../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;

  // Define the base API URL to display to the user for reference
  apiBaseUrl: string = 'http://localhost:5274/api/Auth/login';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // If the user is already logged in, redirect them to the dashboard
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Helper method to easily access form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please check your input details.', 'Validation Error');
      return;
    }

    this.loading = true;
    const request: LoginRequest = this.loginForm.value;

    this.authService.login(request).subscribe({
      next: (response) => {
        // Since we handle the token saving in the AuthService (tap operator),
        // we just need to handle navigation and success messages here.
        if (response.success) {
          // Navigate to a protected route (e.g., dashboard)
          const role = this.authService.getUserRole();
          debugger;
          if (role === 'Admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/employee-dashboard']);
          }
        } else {
          // Handle expected server error (e.g., Invalid email/password message)
          this.toastr.error(response.message || 'Login failed, please try again.', 'Error');
        }
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        // Handle unexpected HTTP errors (401 Unauthorized, Server Down, etc.)
        if (error.status === 401 || error.status === 400) {
           this.toastr.error('Invalid email or password.', 'Login Failed');
        } else {
           this.toastr.error('A server error occurred. Please try again later.', 'Network Error');
        }
        console.error('Login Error:', error);
      }
    });
  }
}
