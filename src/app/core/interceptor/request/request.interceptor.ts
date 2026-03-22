import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserSelectors } from 'src/app/feature-module/authentication/store/selectors.users';

@Injectable({ providedIn: 'root' })
// This is the interceptor class that intercepts all HTTP requests

// Interceptor to add the token to the request
export class RequestInterceptor implements HttpInterceptor {
  token!: string;
  constructor(private store: Store) { }
  // Intercept method to intercept the request

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // 1) Récupérer le token stocké (sessionStorage, localStorage, cookie…)
    this.store.select((state) => state.user.token).subscribe((token) => {
      console.log('Token from store:', token);
      this.token = token;
    });
    // 2) Si on a un token, cloner la requête en ajoutant l’en-tête Authorization
    if (this.token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`, // Ajout de l'en-tête Authorization
        },
      });
      // 3) Passer la requête modifiée au handler suivant
      return next.handle(authReq);
    }
    // Si pas de token, on n’ajoute rien et on laisse passer la requête d’origine
    return next.handle(req);
  }
}
