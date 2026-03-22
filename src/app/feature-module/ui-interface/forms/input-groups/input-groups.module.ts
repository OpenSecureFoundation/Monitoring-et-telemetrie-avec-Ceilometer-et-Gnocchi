import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputGroupsRoutingModule } from './input-groups-routing.module';
import { InputGroupsComponent } from './input-groups.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InputGroupsComponent],
  imports: [CommonModule, InputGroupsRoutingModule, SharedModule],
})
export class InputGroupsModule {}
