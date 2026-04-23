import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb:          FormBuilder,
    private authService: AuthService,
    private router:      Router,
    private toastr:      ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    //  If already logged in → redirect to correct dashboard
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn && !this.authService.isTokenExpired()) {
        this.redirectToDashboard();  //  role-based redirect
      }
    });
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Easy access to form controls in template
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
        this.loading = false;
        if (response.success) {
          this.redirectToDashboard();  //  clean role-based redirect
        } else {
          this.toastr.error(response.message || 'Login failed, please try again.', 'Error');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 401 || error.status === 400) {
          this.toastr.error('Invalid email or password.', 'Login Failed');
        } else {
          this.toastr.error('A server error occurred. Please try again later.', 'Network Error');
        }
        console.error('Login Error:', error);
      }
    });
  }

  //  Extracted into reusable method — used in both ngOnInit and onSubmit
  private redirectToDashboard(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/app/admin-dashboard']);
    } else {
      this.router.navigate(['/app/employee-dashboard']);
    }
  }
}
