import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRequestRoutingModule } from './domain-request-routing.module';
import { DomainRequestComponent } from './domain-request.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DomainRequestComponent
  ],
  imports: [
    CommonModule,
    DomainRequestRoutingModule,
    SharedModule
  ]
})
export class DomainRequestModule { }
