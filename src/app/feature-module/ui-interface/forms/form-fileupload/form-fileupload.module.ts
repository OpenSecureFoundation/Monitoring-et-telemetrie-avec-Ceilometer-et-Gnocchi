import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFileuploadRoutingModule } from './form-fileupload-routing.module';
import { FormFileuploadComponent } from './form-fileupload.component';


@NgModule({
  declarations: [
    FormFileuploadComponent
  ],
  imports: [
    CommonModule,
    FormFileuploadRoutingModule
  ]
})
export class FormFileuploadModule { }
