import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-expese-category',
    templateUrl: './expese-category.component.html',
    styleUrls: ['./expese-category.component.scss'],
    standalone: false
})
export class ExpeseCategoryComponent {
  message!: string | number;
  text!: string | number;
  constructor(public router: Router) {}

  

  send() {
    this.text = this.message;
    this.message = '';
  }
}
