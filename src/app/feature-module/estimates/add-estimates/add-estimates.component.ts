import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes, ToasterService } from 'src/app/core/core.index';

@Component({
    selector: 'app-add-estimates',
    templateUrl: './add-estimates.component.html',
    styleUrls: ['./add-estimates.component.scss'],
    standalone: false
})
export class AddEstimatesComponent implements OnInit {
  public addEstimateForm!: FormGroup;
  public routes = routes;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToasterService
  ) {}

  ngOnInit() {
    this.addEstimateForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      estimateFrom: ['', [Validators.required]],
      estimateTo: ['', [Validators.required]],
      estimateNumber: ['', [Validators.required]],
      customerRef: ['', [Validators.required]],
    });
    // Datetimepicker
  }
  addEstimate() {
    if (this.addEstimateForm.invalid) {
      this.addEstimateForm.markAllAsTouched();
    } else {
      this.router.navigate(['/estimates']);
      this.toastr.typeSuccess('Estimates added sucessfully...!', 'Success');
    }
  }
}
