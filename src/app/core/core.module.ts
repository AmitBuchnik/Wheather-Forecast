import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AppRoutingModule } from '../app-routing.module';
import { httpRequestInterceptor } from './interceptors/http-request.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpRequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
