import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateComponent } from './email-template.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmailTemplateComponent
  ],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    SharedModule
  ]
})
export class EmailTemplateModule { }
