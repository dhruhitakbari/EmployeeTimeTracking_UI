import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (!auth.getToken()) {
    toastr.warning('Please login to continue');
    return router.createUrlTree(['/login']);
  }

  if (!auth.isAdmin()) {
    toastr.error('Access denied. Admins only.');
    return router.createUrlTree(['/employee-dashboard']);
  }

  return true;
};
