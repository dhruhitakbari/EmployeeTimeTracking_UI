export interface MenuItem {
  label: string;
  icon: string;       // Bootstrap icon class (e.g., 'bi-people')
  route: string;      // Where it goes
  roles: string[];    // Which roles can see this? ['Admin', 'Employee'] or just ['Admin']
}
