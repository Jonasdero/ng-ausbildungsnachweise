import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/util/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const auth = inject(Auth);

  if (!authService.activateLogin) {
    return true;
  }
  return !!(auth.currentUser && auth.currentUser.emailVerified);
};
