import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PaginationModule } from '../feature-module/common/pagination/pagination.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SpinnerInterceptor } from '../core/interceptor/spinner/spinner.interceptor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LightboxModule } from 'ngx-lightbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxIntlTelInputComponent } from 'ngx-intl-tel-input';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import { NgxEditorModule } from 'ngx-editor';
import { RequestInterceptor } from '../core/interceptor/request/request.interceptor';
import { ResponseInterceptor } from '../core/interceptor/neg-resp/resp.interceptor';
import { ErrorInterceptor } from '../core/interceptor/pos-resp/error.interceptor';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    NgxBootstrapModule,
    PaginationModule,
    NgxMaskModule.forRoot({
      showMaskTyped: false,
    }),
    NgChartsModule.forRoot(),
    FullCalendarModule,
    AngularEditorModule,
    NgxDropzoneModule,
    LightboxModule,
    MatTooltipModule,
    BsDatepickerModule.forRoot(),
    CarouselModule,
    // NgxIntlTelInputComponent,
    // NgxMatIntlTelInputComponent,
    CustomPaginationModule,
    NgxEditorModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    NgxBootstrapModule,
    PaginationModule,
    NgxMaskModule,
    NgChartsModule,
    FullCalendarModule,
    AngularEditorModule,
    NgxDropzoneModule,
    LightboxModule,
    MatTooltipModule,
    BsDatepickerModule,
    CarouselModule,
    // NgxMatIntlTelInputComponent,
    // NgxIntlTelInputComponent,
    CustomPaginationModule,
    NgxEditorModule,
  ],
  providers: [
    BsDatepickerConfig,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class SharedModule {}
