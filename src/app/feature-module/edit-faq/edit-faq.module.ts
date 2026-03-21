import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditFaqRoutingModule } from './edit-faq-routing.module';
import { EditFaqComponent } from './edit-faq.component';


@NgModule({
  declarations: [
    EditFaqComponent
  ],
  imports: [
    CommonModule,
    EditFaqRoutingModule
  ]
})
export class EditFaqModule { }
