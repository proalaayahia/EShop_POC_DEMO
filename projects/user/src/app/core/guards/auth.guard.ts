import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { jwtDecode } from 'jwt-decode';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const storage = inject(StorageService)
  const router = inject(Router)
  const path = segments.join('/')
  const token = storage.Get('token');
  if (!token) {
    router.navigateByUrl(`/account/login?redirect=${path}`)
    return false;
  }
  const user = jwtDecode(token)
  const date = new Date(user.exp! * 1000);
  console.log('date', date)
  console.log('new date', new Date())
  if (new Date() > date) {
    storage.Delete('token');
    router.navigateByUrl(`/account/login?redirect=${path}`)
  }
  return true;
};
