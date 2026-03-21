import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionComponent } from './permission.component';


@NgModule({
  declarations: [
    PermissionComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule
  ]
})
export class PermissionModule { }
