import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgRoutingModule } from './prime-ng-routing.module';
import { PrimeNgComponent } from './prime-ng.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PrimeNgComponent],
  imports: [CommonModule, PrimeNgRoutingModule, SharedModule],
})
export class PrimeNgModule {}
