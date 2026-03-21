import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEstimateComponent } from './view-estimate.component';
import { ViewEstimateRoutingModule } from './view-estimate-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ViewEstimateComponent],
  imports: [CommonModule, ViewEstimateRoutingModule, SharedModule],
})
export class ViewEstimateModule {}
