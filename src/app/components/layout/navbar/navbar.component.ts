import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
