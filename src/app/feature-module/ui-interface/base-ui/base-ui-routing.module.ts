import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseUIComponent } from './base-ui.component';

const routes: Routes = [
  {
    path: '',
    component: BaseUIComponent,
    children: [
      {
        path: 'alert',
        loadChildren: () =>
          import('./alerts/alerts.module').then((m) => m.AlertsModule),
      },
      {
        path: 'accordions',
        loadChildren: () =>
          import('./accordions/accordions.module').then(
            (m) => m.AccordionsModule
          ),
      },
      {
        path: 'avatar',
        loadChildren: () =>
          import('./avatar/avatar.module').then((m) => m.AvatarModule),
      },
      {
        path: 'badges',
        loadChildren: () =>
          import('./badges/badges.module').then((m) => m.BadgesModule),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./buttons/buttons.module').then((m) => m.ButtonsModule),
      },
      {
        path: 'button-group',
        loadChildren: () =>
          import('./button-group/button-group.module').then(
            (m) => m.ButtonGroupModule
          ),
      },
      {
        path: 'breadcrumb',
        loadChildren: () =>
          import('./breadcrumb/breadcrumb.module').then(
            (m) => m.BreadcrumbModule
          ),
      },
      {
        path: 'cards',
        loadChildren: () =>
          import('./cards/cards.module').then((m) => m.CardsModule),
      },
      {
        path: 'carousel',
        loadChildren: () =>
          import('./carousel/carousel.module').then((m) => m.CarouselModule),
      },
      {
        path: 'drop-down',
        loadChildren: () =>
          import('./dropdowns/dropdowns.module').then((m) => m.DropdownsModule),
      },
      {
        path: 'grid',
        loadChildren: () =>
          import('./grid/grid.module').then((m) => m.GridModule),
      },
      {
        path: 'images',
        loadChildren: () =>
          import('./images/images.module').then((m) => m.ImagesModule),
      },
      {
        path: 'light-box',
        loadChildren: () =>
          import('./lightbox/lightbox.module').then((m) => m.LightboxModule),
      },
      {
        path: 'media',
        loadChildren: () =>
          import('./media/media.module').then((m) => m.MediaModule),
      },
      {
        path: 'modal',
        loadChildren: () =>
          import('./modals/modals.module').then((m) => m.ModalsModule),
      },
      {
        path: 'offcanvas',
        loadChildren: () =>
          import('./offcanvas/offcanvas.module').then((m) => m.OffcanvasModule),
      },
      {
        path: 'pagination',
        loadChildren: () =>
          import('./pagination/pagination.module').then(
            (m) => m.PaginationModule
          ),
      },
      {
        path: 'placeholder',
        loadChildren: () =>
          import('./placeholders/placeholders.module').then(
            (m) => m.PlaceholdersModule
          ),
      },
      {
        path: 'popover',
        loadChildren: () =>
          import('./popover/popover.module').then((m) => m.PopoverModules),
      },
      {
        path: 'progress-bars',
        loadChildren: () =>
          import('./progress-bars/progress-bars.module').then(
            (m) => m.ProgressBarsModule
          ),
      },
      {
        path: 'range-slider',
        loadChildren: () =>
          import('./rangeslider/rangeslider.module').then(
            (m) => m.RangesliderModule
          ),
      },
      {
        path: 'spinner',
        loadChildren: () =>
          import('./spinner/spinner.module').then((m) => m.SpinnerModule),
      },
      {
        path: 'tabs',
        loadChildren: () =>
          import('./tabs/tabs.module').then((m) => m.TabsModule),
      },
      {
        path: 'toasts',
        loadChildren: () =>
          import('./toasts/toasts.module').then((m) => m.ToastsModule),
      },
      {
        path: 'tooltip',
        loadChildren: () =>
          import('./tooltip/tooltip.module').then((m) => m.TooltipModule),
      },
      {
        path: 'typography',
        loadChildren: () =>
          import('./typography/typography.module').then(
            (m) => m.TypographyModule
          ),
      },
      {
        path: 'video',
        loadChildren: () =>
          import('./video/video.module').then((m) => m.VideoModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseUIRoutingModule {}
