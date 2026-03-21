import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseUIRoutingModule } from './base-ui-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseUIComponent } from './base-ui.component';

@NgModule({
  declarations: [BaseUIComponent],
  imports: [CommonModule, BaseUIRoutingModule, SharedModule],
})
export class BaseUIModule {}
