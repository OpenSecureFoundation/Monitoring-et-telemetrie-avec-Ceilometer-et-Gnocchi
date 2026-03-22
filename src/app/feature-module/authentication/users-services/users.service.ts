import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/app/environments/environment';
import { Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/core/core.index';
import { Router } from '@angular/router';
import { RequestBody } from '../models/resquest.body';
import { UserSelectors } from '../store/selectors.users';
import { Logout } from '../store/actions.users';

@Injectable({ providedIn: 'root' })

// This is the user service class
export class UserService {
  token!: string;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loading: boolean = false;
  url: string = '';
  user!: User;

  loader: boolean = false;

  // this is the constructor
  constructor(
    private http: HttpClient,
    private store: Store,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    private router: Router,
  ) {}

  // initialize the login form
  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  // Retourne le token de manière synchrone
  tokenGetter(): string | null {
    // Mise à jour asynchrone du token
    // this.store.select(UserSelectors.getUserToken).subscribe((token) => {
    //   this.token = token;
    // });
    return this.token;
  }

  loginUser(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    // This method is used to login a user
    console.log('this is credentials', credentials);
    return this.http.post<any>(
      `${environment.url}/api/auth/login`,
      credentials,
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/users/logout`, {});
  }
}
