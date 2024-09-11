import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';
import { inject } from '@angular/core';

export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService)
  spinnerService.show();
  return next(req).pipe(catchError((err) => {
    console.log(err)
    return of(err)
  }), finalize(() => {
    spinnerService.hide();
  }));
}

