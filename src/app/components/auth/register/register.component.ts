import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequest } from '../../../models/auth.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  loading: boolean = false;

  // Define the base API URL to display to the user for reference
  apiBaseUrl: string = 'https://localhost:7001/api/Auth/register';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // Redirect if already logged in
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Since DesignationId is optional during registration, we don't add Validators.required
      designationId: [null]
    });
  }

  // Helper method to easily access form controls
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fix the validation errors.', 'Validation Error');
      return;
    }

    this.loading = true;

    // Cast the form value to our DTO interface
    const request: RegisterRequest = this.registerForm.value;

    this.authService.register(request).subscribe({
      next: (response) => {
        if (response.success) {
          // If registration is successful, the AuthService will have saved the token
          // and shown a toastr message. We navigate to the dashboard.
         const role = this.authService.getUserRole();
          if (role === 'Employee') {
            this.router.navigate(['/employee-dashboard']);
          }
        } else {
          // Handle expected server error (e.g., "User already exists")
          this.toastr.error(response.message || 'Registration failed.', 'Error');
        }
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        // Handle unexpected errors
        this.toastr.error('A server error occurred during registration. Please check your API connection.', 'Network Error');
        console.error('Registration Error:', error);
      }
    });
  }
}
