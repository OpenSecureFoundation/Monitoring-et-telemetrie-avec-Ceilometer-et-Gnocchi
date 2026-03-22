import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApexchartsRoutingModule } from './apexcharts-routing.module';
import { ApexchartsComponent } from './apexcharts.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ApexchartsComponent],
  imports: [CommonModule, ApexchartsRoutingModule, SharedModule],
})
export class ApexchartsModule {}
