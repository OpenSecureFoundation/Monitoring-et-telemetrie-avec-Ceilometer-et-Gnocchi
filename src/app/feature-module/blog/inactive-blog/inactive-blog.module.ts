import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InactiveBlogRoutingModule } from './inactive-blog-routing.module';
import { InactiveBlogComponent } from './inactive-blog.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InactiveBlogComponent
  ],
  imports: [
    CommonModule,
    InactiveBlogRoutingModule,
    SharedModule
  ]
})
export class InactiveBlogModule { }
