import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth Components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

// Dashboard Components
import { EmployeeDashboardComponent } from './components/employee/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

// Layout Component
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

// Admin Components
import { DepartmentComponent } from './components/admin/department/department.component';

// Guards
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin-guard';

const routes: Routes = [

  // ─────────────────────────────────────────────────────────
  // 1. PUBLIC ROUTES — No layout, no guard
  // ─────────────────────────────────────────────────────────
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ─────────────────────────────────────────────────────────
  // 2. PROTECTED ROUTES — Inside MainLayout with Sidebar
  //    AuthGuard protects ALL children below
  // ─────────────────────────────────────────────────────────
  {
    path: 'app',                        // ✅ named path — no conflict
    component: MainLayoutComponent,
    canActivate: [authGuard],           // Layer 1: must be logged in
    children: [

      // ── Employee Routes ──────────────────────────────────
      {
        path: 'employee-dashboard',
        component: EmployeeDashboardComponent
        // no adminGuard → both roles can access if needed
      },

      // ── Admin Routes ─────────────────────────────────────
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminGuard]       // Layer 2: must be Admin
      },
      {
        path: 'admin/departments',
        component: DepartmentComponent,
        canActivate: [adminGuard]       // Layer 2: must be Admin
      },

      // ── Default inside app ───────────────────────────────
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // 3. DEFAULT + WILDCARD
  // ─────────────────────────────────────────────────────────
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }                    // safe fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
