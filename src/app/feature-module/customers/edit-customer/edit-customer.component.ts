import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/core/core.index';
@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.scss'],
    standalone: false
})
export class EditCustomerComponent implements OnInit {
  public editCustomerForm!: FormGroup;
  public routes = routes;
  currency='customer'
  country='India'
  constructor(
    private formBuilder: FormBuilder,
   
    private route: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    this.getCustomer();
    this.editCustomerForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      customerCurrency: ['', [Validators.required]],
      customerPrimaryContact: ['', [Validators.required]],
      customerPhone: ['', [Validators.required]],
      customerWebsite: ['', [Validators.required]],
      customerBillingName: ['', [Validators.required]],
      customerBillingState: ['', [Validators.required]],
      customerBillingAddress: ['', [Validators.required]],
      customerBillingCountry: ['', [Validators.required]],
      customerBillingCity: ['', [Validators.required]],
      customerBillingPhone: ['', [Validators.required]],
      customerBillingZip: ['', [Validators.required]],
      customerShippingName: ['', [Validators.required]],
      customerShippingState: ['', [Validators.required]],
      customerShippingAddress: ['', [Validators.required]],
      customerShippingCountry: ['', [Validators.required]],
      customerShippingCity: ['', [Validators.required]],
      customerShippingPhone: ['', [Validators.required]],
      customerShippingZip: ['', [Validators.required]],
      amount_due: [''],
      registered_on: [''],
      status: [''],
      role: [''],
    });
  }

  // get method for estimate
  getCustomer() {
    // this.allModulesService.get('customers').subscribe((res) => {
    //   this.allCustomers = res;
    //   //passing edit id
    //   this.edit(this.id);
    // });
  }
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });
}
