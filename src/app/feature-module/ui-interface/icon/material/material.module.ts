import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MaterialComponent],
  imports: [CommonModule, MaterialRoutingModule, SharedModule],
})
export class MaterialModule {}
