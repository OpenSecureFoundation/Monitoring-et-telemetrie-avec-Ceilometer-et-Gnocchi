import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipPlansRoutingModule } from './membership-plans-routing.module';
import { MembershipPlansComponent } from './membership-plans.component';


@NgModule({
  declarations: [
    MembershipPlansComponent
  ],
  imports: [
    CommonModule,
    MembershipPlansRoutingModule
  ]
})
export class MembershipPlansModule { }
