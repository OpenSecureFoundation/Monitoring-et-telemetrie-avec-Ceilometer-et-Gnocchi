import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbRoutingModule } from './breadcrumb-routing.module';
import { BreadcrumbComponent } from './breadcrumb.component';


@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbRoutingModule
  ]
})
export class BreadcrumbModule { }
