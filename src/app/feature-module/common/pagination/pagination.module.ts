import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationRoutingModule } from './pagination-routing.module';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    PaginationRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [PaginationComponent],
})
export class PaginationModule {}
