import { Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-form-wizard',
    templateUrl: './form-wizard.component.html',
    styleUrls: ['./form-wizard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class FormWizardComponent  {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

}
