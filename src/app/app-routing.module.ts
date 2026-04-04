import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth Components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

// Dashboard Components
import { EmployeeDashboardComponent } from './components/employee/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

// Guards
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin-guard';

// Layout Component (IMPORTANT: Update the path to where you created this)
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { DepartmentComponent } from './components/admin/department/department.component';

const routes: Routes = [
  // -----------------------------------------------------------
  // 1. PUBLIC ROUTES (No Sidebar, No Layout)
  // -----------------------------------------------------------
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Default redirect to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // -----------------------------------------------------------
  // 2. AUTHENTICATED ROUTES (Inside MainLayout with Sidebar)
  // -----------------------------------------------------------
  {
    path: '', // This empty path means it acts as a wrapper
    component: MainLayoutComponent, // <--- This holds the Sidebar and <router-outlet>
    canActivate: [authGuard],       // <--- Protects ALL children below
    children: [
      {
        path: 'employee-dashboard',
        component: EmployeeDashboardComponent
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminGuard] // <--- Extra protection for Admin
      },
      {
        path: 'admin/departments',
        component: DepartmentComponent,
        canActivate: [adminGuard] // <--- Extra protection for Admin
      },
      // You can add more pages here later, e.g.:
      // { path: 'profile', component: ProfileComponent },
    ]
  },

  // -----------------------------------------------------------
  // 3. WILDCARD (Handle unknown URLs)
  // -----------------------------------------------------------
  // { path: '**', redirectTo: '/login' }
  { path: '**', redirectTo: '/admin-dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
