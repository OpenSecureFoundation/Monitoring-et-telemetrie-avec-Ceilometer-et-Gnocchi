import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { routes, ToasterService } from 'src/app/core/core.index';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss'],
    standalone: false
})
export class AddCustomerComponent implements OnInit {
  public addCustomerForm!: FormGroup;
  public routes = routes;
  selectedValue!: string;
  country = 'India';

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.addCustomerForm = this.formBuilder.group({
      customerName: ['Leatha Bailey', [Validators.required]],
      customerEmail: ['leathabailey@example.com', [Validators.required]],
      customerCurrency: ['USD- US Dollar', [Validators.required]],
      customerPrimaryContact: ['9876543210', [Validators.required]],
      customerPhone: ['9876543210', [Validators.required]],
      customerWebsite: ['www.test.com', [Validators.required]],
      customerBillingName: ['Leatha', [Validators.required]],
      customerBillingState: ['New York', [Validators.required]],
      customerBillingAddress: ['New York', [Validators.required]],
      customerBillingCountry: ['United States', [Validators.required]],
      customerBillingCity: ['Buffalo', [Validators.required]],
      customerBillingPhone: ['9876543210', [Validators.required]],
      customerBillingZip: ['142101', [Validators.required]],
      customerShippingName: ['Leatha', [Validators.required]],
      customerShippingState: ['New York', [Validators.required]],
      customerShippingAddress: ['New York', [Validators.required]],
      customerShippingCountry: ['', [Validators.required]],
      customerShippingCity: ['', [Validators.required]],
      customerShippingPhone: ['', [Validators.required]],
      customerShippingZip: ['', [Validators.required]],
    });
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });
}
