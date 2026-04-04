import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/services/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
 isLoggedIn$!: Observable<boolean>;
  userRole: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to the BehaviorSubject to dynamically update the view
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    // Get the user's role on load
    this.userRole = this.authService.getUserRole();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
