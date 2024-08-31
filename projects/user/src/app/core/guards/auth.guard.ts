import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const storage=inject(StorageService)
  const router=inject(Router)
  const path=segments.join('/')
  const token=storage.Get('token');
  if(!token){
    router.navigateByUrl(`/account/login?redirect=${path}`)
    return false;
  }
  return true;
};
