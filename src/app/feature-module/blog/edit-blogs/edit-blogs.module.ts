import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBlogsRoutingModule } from './edit-blogs-routing.module';
import { EditBlogsComponent } from './edit-blogs.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditBlogsComponent],
  imports: [CommonModule, EditBlogsRoutingModule, SharedModule],
})
export class EditBlogsModule {}
