import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    SharedModule
  ]
})
export class PackagesModule { }
