import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBlogsRoutingModule } from './all-blogs-routing.module';
import { AllBlogsComponent } from './all-blogs.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AllBlogsComponent],
  imports: [CommonModule, AllBlogsRoutingModule, SharedModule],
})
export class AllBlogsModule {}
