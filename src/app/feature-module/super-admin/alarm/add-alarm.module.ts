import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlarmRoutingModule } from './add-alarm-routing.module';
import { AddAlarmModalComponent } from './add-alarm-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AlarmRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AddAlarmModalComponent,
  ],
  exports: [
    AddAlarmModalComponent, // ← indispensable
  ],
})
export class AlarmModule {}
