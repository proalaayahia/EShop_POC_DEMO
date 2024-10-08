import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const storage = inject(StorageService)
  const authService = inject(AuthService);
  const router = inject(Router)
  const path = segments.join('/')
  let isValid = authService.isValidSession();
  if (!isValid) {
    const token = storage.Get('token');
    if (!token) {
      storage.Delete('token');
    }
    
    router.navigateByUrl(`/account/login?redirect=${path}`)
    // document.location.reload()
    return false;
  }
  return true;
};
