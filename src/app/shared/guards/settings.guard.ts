import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SettingsService } from '../services/components/settings.service';

export const settingsGuard: CanActivateFn = () => {
  const settingsService = inject(SettingsService);
  const router = inject(Router);

  if (settingsService.hasSettings) {
    return true;
  }
  router.navigate(['welcome']);
  return false;
};
