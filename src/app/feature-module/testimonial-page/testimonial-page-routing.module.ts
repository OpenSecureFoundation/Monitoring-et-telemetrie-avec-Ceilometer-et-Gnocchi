import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialPageComponent } from './testimonial-page.component';

const routes: Routes = [
  { path: '', component: TestimonialPageComponent ,children:[
    {
      path: 'testimonials',
      loadChildren: () =>
        import('./testimonials/testimonials.module').then(
          (m) => m.TestimonialsModule
        ),
    }
   
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonialPageRoutingModule {}
