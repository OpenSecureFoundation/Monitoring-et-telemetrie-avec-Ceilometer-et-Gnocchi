import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { TestimonialsComponent } from './testimonials.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TestimonialsComponent
  ],
  imports: [
    CommonModule,
    TestimonialsRoutingModule,
    SharedModule
  ]
})
export class TestimonialsModule { }
