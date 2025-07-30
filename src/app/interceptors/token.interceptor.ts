import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../public/auth/authentication.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)
  const authService = inject(AuthenticationService);

  const token = authService.getToken();
 
  const excludedUrls = ['/api/auth/login', '/api/auth/register'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (!token || isExcluded) {
    return next(req); // no modifica la request
  }

  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  })
  return next(newRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
