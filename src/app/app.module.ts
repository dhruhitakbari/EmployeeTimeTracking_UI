import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Required for API calls
import { ToastrModule } from 'ngx-toastr'; // For notifications

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import ReactiveFormsModule for building forms (Login/Register)
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee/employee-dashboard/employee-dashboard.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DepartmentComponent } from './components/admin/department/department.component';
import { DynamicFormComponent } from './components/shared/dynamic-form/dynamic-form.component';
import { UserComponent } from './components/admin/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    MainLayoutComponent,
    SidebarComponent,
    DepartmentComponent,
    DynamicFormComponent,
    UserComponent,
  ],
   imports: [
    BrowserModule,
    //RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, // 1. Animations
    HttpClientModule,        // 2. API Client
    ReactiveFormsModule,     // 3. Forms
    ToastrModule.forRoot({   // 4. Toastr Config
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
