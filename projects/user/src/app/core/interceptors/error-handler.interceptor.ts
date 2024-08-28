import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, of } from 'rxjs';


export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((err) => {
    console.log(err)
    return of(err)
  }));
}

