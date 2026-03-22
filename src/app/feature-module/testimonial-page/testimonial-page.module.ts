import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialPageRoutingModule } from './testimonial-page-routing.module';
import { TestimonialPageComponent } from './testimonial-page.component';


@NgModule({
  declarations: [
    TestimonialPageComponent
  ],
  imports: [
    CommonModule,
    TestimonialPageRoutingModule
  ]
})
export class TestimonialPageModule { }
