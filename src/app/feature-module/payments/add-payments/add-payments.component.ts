import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { routes, ToasterService } from 'src/app/core/core.index';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-add-payments',
    templateUrl: './add-payments.component.html',
    styleUrls: ['./add-payments.component.scss'],
    standalone: false
})
export class AddPaymentsComponent implements OnInit {
  public addPaymentForm!: FormGroup;
  public routes = routes;
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    dateInputFormat: 'DD MMM YYYY',
  };
  public today = new Date();
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.addPaymentForm = this.formBuilder.group({
      paymentDate: ['', [Validators.required]],
      paymentCustomer: ['', [Validators.required]],
      paymentAddress: ['', [Validators.required]],
      paymentAmount: ['', [Validators.required]],
      paymentNumber: ['', [Validators.required]],
      paymentInvoice: ['', [Validators.required]],
      paymentMode: ['', [Validators.required]],
    });
  }

  addPayment() {
    if (this.addPaymentForm.invalid) {
      this.addPaymentForm.markAllAsTouched();
      return;
    } else {
      this.router.navigate(['/payments']);
      this.toaster.typeSuccess('Payments added sucessfully...!', 'Success');
    }
  }
}
