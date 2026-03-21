import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'all-blogs',
        loadChildren: () =>
          import('./all-blogs/all-blogs.module').then((m) => m.AllBlogsModule),
      },
      
      {
        path: 'edit-blogs',
        loadChildren: () =>
          import('./edit-blogs/edit-blogs.module').then(
            (m) => m.EditBlogsModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
     
      {
        path: 'blog-details',
        loadChildren: () =>
          import('./blog-details/blog-details.module').then(
            (m) => m.BlogDetailsModule
          ),
      },
      { path: 'blog-comments', loadChildren: () => import('./blog-comments/blog-comments.module').then(m => m.BlogCommentsModule) },
      { path: 'inactive-blog', loadChildren: () => import('./inactive-blog/inactive-blog.module').then(m => m.InactiveBlogModule) },
 
    ],
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
