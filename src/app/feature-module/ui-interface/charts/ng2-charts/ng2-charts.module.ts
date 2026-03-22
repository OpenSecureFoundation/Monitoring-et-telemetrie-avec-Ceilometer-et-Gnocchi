import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2ChartsRoutingModule } from './ng2-charts-routing.module';
import { Ng2ChartsComponent } from './ng2-charts.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [Ng2ChartsComponent],
  imports: [CommonModule, Ng2ChartsRoutingModule, SharedModule],
})
export class Ng2ChartsModule {}
