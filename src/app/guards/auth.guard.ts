import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router      = inject(Router);
  const toastr      = inject(ToastrService);

  const token = authService.getToken();

  // Check token exists AND is not expired
  if (token && !authService.isTokenExpired()) {
    return true;
  }

  // Token missing → show login message
  // Token expired → show session expired message
  if (token && authService.isTokenExpired()) {
    toastr.warning('Your session has expired. Please login again.', 'Session Expired');
  } else {
    toastr.info('Please login to continue', 'Login Required');
  }

  return router.createUrlTree(
    ['/login'],
    { queryParams: { returnUrl: state.url || '/' } }
  );
};
