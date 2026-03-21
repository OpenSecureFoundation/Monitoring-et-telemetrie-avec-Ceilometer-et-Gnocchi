import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { SpinnerService } from '../../core.index';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const skipSpinner = request.headers.has('X-Skip-Spinner');

    // Nettoyer le header avant d'envoyer la requête
    const cleanRequest = skipSpinner
      ? request.clone({ headers: request.headers.delete('X-Skip-Spinner') })
      : request;

    if (!skipSpinner) {
      this.spinner.show();
    }

    return next.handle(cleanRequest).pipe(
      finalize(() => {
        if (!skipSpinner) {
          this.spinner.hide();
        }
      }),
      catchError((error) => {
        if (error && !skipSpinner) {
          this.spinner.hide();
        }
        return throwError(error);
      }),
    );
  }
}
