import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffcanvasRoutingModule } from './offcanvas-routing.module';
import { OffcanvasComponent } from './offcanvas.component';


@NgModule({
  declarations: [
    OffcanvasComponent
  ],
  imports: [
    CommonModule,
    OffcanvasRoutingModule
  ]
})
export class OffcanvasModule { }
