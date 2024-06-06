import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import localeEsEC from '@angular/common/locales/es-EC';

import {
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from '@angular/common';
import { HttpInterceptorService } from './shared/services/http.interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AcademicResourcesModule } from './academic-resources/academic-resources.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteModule } from './docente/docente.module';

registerLocaleData(localeEsEC);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    AcademicResourcesModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    DocenteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-EC',
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
