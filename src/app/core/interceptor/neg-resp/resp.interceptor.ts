import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToasterService } from 'src/app/core/core.index';

@Injectable({ providedIn: 'root' })

// This is the interceptor class that intercepts all HTTP responses
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private toast: ToasterService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
          console.log('event: ', event);
          if (event instanceof HttpResponse) {
            // Handle the response here
            const body = event.body as any;
            if (body && body.message) this.toast.typeSuccess(body.message);
          }
        }
      ),
    );
  }
}




