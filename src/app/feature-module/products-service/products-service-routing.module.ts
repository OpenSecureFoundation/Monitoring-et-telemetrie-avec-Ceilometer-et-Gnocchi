import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsServiceComponent } from './products-service.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsServiceComponent,
    children: [
      {
        path: 'product-list',
        loadChildren: () =>
          import('./product-list/product-list.module').then(
            (m) => m.ProductListModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'units',
        loadChildren: () =>
          import('./units/units.module').then((m) => m.UnitsModule),
      },
      {
        path: 'add-products',
        loadChildren: () =>
          import('./add-products/add-products.module').then(
            (m) => m.AddProductsModule
          ),
      },
      {
        path: 'edit-products',
        loadChildren: () =>
          import('./edit-products/edit-products.module').then(
            (m) => m.EditProductsModule
          ),
      }
      
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsServiceRoutingModule {}
