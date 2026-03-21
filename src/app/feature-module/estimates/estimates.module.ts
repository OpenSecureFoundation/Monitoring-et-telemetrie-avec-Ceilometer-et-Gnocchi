import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimatesRoutingModule } from './estimates-routing.module';
import { EstimatesComponent } from './estimates.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EstimatesComponent],
  imports: [CommonModule, EstimatesRoutingModule, SharedModule],
})
export class EstimatesModule {}
