import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const token = authService.getToken();

  // --- If token exists → allow navigation ---
  if (token && token.trim().length > 0) {
    return true;
  }

  // --- If no token → show message & redirect to login ---
  toastr.info('Please login to continue');

  return router.createUrlTree( ['/login'], { queryParams: { returnUrl: state.url || '/' } } );
};
