import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { routes, SpinnerService, ToasterService } from 'src/app/core/core.index';
import { UserService } from '../users-services/users.service';
import { Store } from '@ngxs/store';
import { Login } from '../store/actions.users';

@Component({
    selector: 'app-sass-login',
    templateUrl: './sass-login.component.html',
    styleUrl: './sass-login.component.scss',
    standalone: false
})

export class SassLoginComponent implements OnInit {

  public routes = routes;
  public show_password = true;
  userCredentials!: any;
  loading: boolean = false;

  constructor(
    private router: Router,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private store: Store,
    private toaster: ToasterService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.userService.initLoginForm()
  }

  login(): void {
    if(this.userService.loginForm.valid) {
      console.log("valid");
      this.userCredentials = this.userService.loginForm.value;
      this.store.dispatch(new Login(this.userService.loginForm.value));
    } else {
      this.toaster.typeWarning("Veuillez remplir tous les champs convenablement !");
    }
  }
}
