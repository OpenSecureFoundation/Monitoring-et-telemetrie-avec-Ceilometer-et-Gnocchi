import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsComponent } from './elements.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsComponent,
    children: [
      {
        path: 'ribbon',
        loadChildren: () =>
          import('./ribbon/ribbon.module').then((m) => m.RibbonModule),
      },
      {
        path: 'clipboards',
        loadChildren: () =>
          import('./clipboards/clipboards.module').then(
            (m) => m.ClipboardsModule
          ),
      },
      {
        path: 'drag-drop',
        loadChildren: () =>
          import('./drap-drop/drap-drop.module').then((m) => m.DrapDropModule),
      },
      {
        path: 'rating',
        loadChildren: () =>
          import('./rating/rating.module').then((m) => m.RatingModule),
      },
      {
        path: 'text-editor',
        loadChildren: () =>
          import('./text-editor/text-editor.module').then(
            (m) => m.TextEditorModule
          ),
      },
      {
        path: 'counter',
        loadChildren: () =>
          import('./counter/counter.module').then((m) => m.CounterModule),
      },
      {
        path: 'scrollbar',
        loadChildren: () =>
          import('./scrollbar/scrollbar.module').then((m) => m.ScrollbarModule),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./notification/notification.module').then(
            (m) => m.NotificationModule
          ),
      },
      {
        path: 'timeline',
        loadChildren: () =>
          import('./timeline/timeline.module').then((m) => m.TimelineModule),
      },
      {
        path: 'horizontal-timeline',
        loadChildren: () =>
          import('./horizontal/horizontal.module').then(
            (m) => m.HorizontalModule
          ),
      },
      {
        path: 'form-wizard',
        loadChildren: () =>
          import('./form-wizard/form-wizard.module').then(
            (m) => m.FormWizardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementsRoutingModule {}
