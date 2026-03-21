import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsComponent } from './forms.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule, FormsRoutingModule, SharedModule],
})
export class FormsModule {}
