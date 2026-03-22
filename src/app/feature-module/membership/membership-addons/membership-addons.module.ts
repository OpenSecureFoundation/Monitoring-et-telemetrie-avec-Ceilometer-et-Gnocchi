import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipAddonsRoutingModule } from './membership-addons-routing.module';
import { MembershipAddonsComponent } from './membership-addons.component';


@NgModule({
  declarations: [
    MembershipAddonsComponent
  ],
  imports: [
    CommonModule,
    MembershipAddonsRoutingModule
  ]
})
export class MembershipAddonsModule { }
