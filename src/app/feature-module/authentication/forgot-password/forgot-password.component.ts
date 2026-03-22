import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: false
})

export class ForgotPasswordComponent  {
  public routes = routes;
  public show_password = true;
  public showConfirmPassword: boolean = false;

  constructor(private router: Router) { }

  togglePasswordVisibility() {
    this.show_password = !this.show_password;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
