import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MenuItem } from '../../../models/ui.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Output() onToggle = new EventEmitter<boolean>();

  // "isCollapsed" now effectively means "Is Unpinned"
  isCollapsed = false;

  // New variable to track temporary hover state
  isHovered = false;

  currentRole: string | null = null;
  menuItems: MenuItem[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.currentRole = this.authService.getUserRole();
    this.generateMenu();
  }

  // Handle Mouse Enter/Leave
  onHover(state: boolean): void {
    this.isHovered = state;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.onToggle.emit(this.isCollapsed);
  }

  generateMenu(): void {
  // ✅ updated dashboard routes
  const dashboardRoute = this.currentRole === 'Admin'
    ? '/app/admin-dashboard'
    : '/app/employee-dashboard';

  const allItems: MenuItem[] = [
    { label: 'Dashboard',    icon: 'bi-speedometer2',  route: dashboardRoute,              roles: ['Admin', 'Employee'] },
    { label: 'Departments',  icon: 'bi-building',      route: '/app/admin/departments',    roles: ['Admin'] },
    { label: 'Designations', icon: 'bi-person-badge',  route: '/app/admin/designations',   roles: ['Admin'] },
    { label: 'Employees',    icon: 'bi-people',         route: '/app/admin/users',          roles: ['Admin'] },
    { label: 'Projects',     icon: 'bi-briefcase',      route: '/app/admin/projects',       roles: ['Admin'] },
    { label: 'Time Sheet',   icon: 'bi-clock-history',  route: '/app/employee/timesheet',   roles: ['Employee'] },
    { label: 'My Profile',   icon: 'bi-person-circle',  route: '/app/employee/profile',     roles: ['Admin', 'Employee'] },
  ];

  if (this.currentRole) {
    this.menuItems = allItems.filter(item => item.roles.includes(this.currentRole!));
  }
}

  onLogout(): void {
    this.authService.logout();
  }
}
