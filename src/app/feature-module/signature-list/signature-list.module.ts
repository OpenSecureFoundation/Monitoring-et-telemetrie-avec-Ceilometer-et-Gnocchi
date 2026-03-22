import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignatureListRoutingModule } from './signature-list-routing.module';
import { SignatureListComponent } from './signature-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SignatureListComponent
  ],
  imports: [
    CommonModule,
    SignatureListRoutingModule,
    SharedModule
  ]
})
export class SignatureListModule { }
