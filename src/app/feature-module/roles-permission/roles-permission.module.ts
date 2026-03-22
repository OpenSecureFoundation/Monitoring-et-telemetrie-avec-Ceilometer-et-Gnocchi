import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesPermissionRoutingModule } from './roles-permission-routing.module';
import { RolesPermissionComponent } from './roles-permission.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RolesPermissionComponent
  ],
  imports: [
    CommonModule,
    RolesPermissionRoutingModule,
    SharedModule
  ]
})
export class RolesPermissionModule { }
