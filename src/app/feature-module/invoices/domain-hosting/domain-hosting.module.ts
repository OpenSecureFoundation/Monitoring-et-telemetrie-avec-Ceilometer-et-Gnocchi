import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainHostingRoutingModule } from './domain-hosting-routing.module';
import { DomainHostingComponent } from './domain-hosting.component';


@NgModule({
  declarations: [
    DomainHostingComponent
  ],
  imports: [
    CommonModule,
    DomainHostingRoutingModule
  ]
})
export class DomainHostingModule { }
