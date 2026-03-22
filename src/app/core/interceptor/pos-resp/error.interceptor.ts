import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToasterService } from 'src/app/core/core.index';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/core.index';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })

// This is the interceptor class that intercepts all HTTP errors
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toast: ToasterService,
    private store: Store,
    private router: Router,
  ) {}

  // Intercept method to intercept the request
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          // Handle the error here
          let userMessage = ' An error occurred';
          const body = error.error as any;
          if (body && body.message) {
            userMessage = body.message;
            if (body.statusCode === 401) {
              // If the error is 401, call the refresh access token method
              console.error('Unauthorized access - redirecting to login');
              this.router.navigate([routes.sassLogin]);
            }
          } else {
            userMessage = ` Error ${error.status}: ${error.statusText}`;
          }
          this.toast.typeError(userMessage);

          return throwError(() => new Error(userMessage));
        }
        return throwError(() => error);
      }),
    );
  }
}
