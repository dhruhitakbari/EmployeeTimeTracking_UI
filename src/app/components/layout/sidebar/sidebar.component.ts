import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Output() onToggle = new EventEmitter<boolean>();

  isCollapsed = false;
  isHovered = false;

  currentRole: string | null = null;

  menuItems: MenuItem[] = [];

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentRole = this.authService.getUserRole();

    this.generateMenu();
  }

  onHover(state: boolean): void {
    this.isHovered = state;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;

    this.onToggle.emit(this.isCollapsed);
  }

  generateMenu(): void {

    const dashboardRoute =
      this.currentRole === 'Admin'
        ? '/app/admin-dashboard'
        : '/app/employee-dashboard';

    const allItems: MenuItem[] = [

      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: dashboardRoute,
        visible: this.hasRole(['Admin', 'Employee'])
      },

      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: '/app/admin/users',
        visible: this.hasRole(['Admin'])
      },

      {
        label: 'Departments',
        icon: 'pi pi-building',
        routerLink: '/app/admin/departments',
        visible: this.hasRole(['Admin'])
      },

      {
        label: 'Designations',
        icon: 'pi pi-id-card',
        routerLink: '/app/admin/designations',
        visible: this.hasRole(['Admin'])
      },

      {
        label: 'Employees',
        icon: 'pi pi-user',
        routerLink: '/app/admin/users',
        visible: this.hasRole(['Admin'])
      },

      {
        label: 'Projects',
        icon: 'pi pi-briefcase',
        routerLink: '/app/admin/projects',
        visible: this.hasRole(['Admin'])
      },

      {
        label: 'Time Sheet',
        icon: 'pi pi-clock',
        routerLink: '/app/employee/timesheet',
        visible: this.hasRole(['Employee'])
      },

      {
        label: 'My Profile',
        icon: 'pi pi-user',
        routerLink: '/app/employee/profile',
        visible: this.hasRole(['Admin', 'Employee'])
      }
    ];

    this.menuItems = allItems.filter(item => item.visible);
  }

  private hasRole(roles: string[]): boolean {
    return !!this.currentRole && roles.includes(this.currentRole);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
