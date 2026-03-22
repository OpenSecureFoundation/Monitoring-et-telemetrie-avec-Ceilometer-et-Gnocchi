import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {routes, SpinnerService, ToasterService } from 'src/app/core/core.index';
import { UserService } from '../users-services/users.service';
import { Register } from '../store/actions.users';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-sass-register',
    templateUrl: './sass-register.component.html',
    styleUrl: './sass-register.component.scss',
    standalone: false
})
export class SassRegisterComponent implements OnInit {
  public routes = routes
  public show_password = true;
  public showConfirmPassword: boolean = false;
  registerForm!: FormGroup<any>;
  step: number = 1;

  constructor(private router: Router,
    public userService: UserService,
    private store: Store,
    private toaster: ToasterService,
    public  spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.userService.initRegisterForm();
  }
  togglePasswordVisibility() {
    this.show_password = !this.show_password;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigation() {
    this.router.navigate([routes.sassLogin])
  }

  next(): void {
    this.step += 1;
  }

  previous(): void {
    this.step -= 1;
  }

  register(): void {
    console.log("register form value: ", this.userService.registerForm.value);
    if(this.userService.registerForm.valid) {
      const user = this.userService.registerForm.value;
      this.store.dispatch(new Register(user));
    } else {
      this.toaster.typeWarning("Veuillez remplir tous les champs convenablement !");
    }
  }


}
