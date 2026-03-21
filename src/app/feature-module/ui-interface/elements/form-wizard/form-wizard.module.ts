import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormWizardRoutingModule } from './form-wizard-routing.module';
import { FormWizardComponent } from './form-wizard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FormWizardComponent],
  imports: [CommonModule, FormWizardRoutingModule, SharedModule],
})
export class FormWizardModule {}
