import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicInputsRoutingModule } from './basic-inputs-routing.module';
import { BasicInputsComponent } from './basic-inputs.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BasicInputsComponent],
  imports: [CommonModule, BasicInputsRoutingModule,SharedModule],
})
export class BasicInputsModule {}
