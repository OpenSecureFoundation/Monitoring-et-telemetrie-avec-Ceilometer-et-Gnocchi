import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpeseCategoryComponent } from './expese-category.component';
import { ExpeseCategoryRoutingModule } from './expese-category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ExpeseCategoryComponent],
  imports: [CommonModule, SharedModule, ExpeseCategoryRoutingModule],
})
export class ExpenseCategoryModule {}
