import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { routes, ToasterService } from 'src/app/core/core.index';

@Component({
    selector: 'app-edit-estimate',
    templateUrl: './edit-estimate.component.html',
    styleUrls: ['./edit-estimate.component.scss'],
    standalone: false
})
export class EditEstimateComponent implements OnInit {
  lstEstimates!: string[];
  public editEstimateForm!: FormGroup;
  public routes = routes;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editEstimateForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      estimateFrom: ['', [Validators.required]],
      estimateTo: ['', [Validators.required]],
      estimateNumber: ['', [Validators.required]],
      customerRef: ['', [Validators.required]],
      status: [''],
      amount: [''],
    });
  }

  editEstimate() {
    if (this.editEstimateForm.valid) {
      this.toastr.typeSuccess('', 'Edited successfully!');
      this.router.navigate(['/estimates']);
    } else {
      this.toastr.typeWarning('Mandatory fields required', '');
      this.editEstimateForm.markAllAsTouched();
    }
  }
}
