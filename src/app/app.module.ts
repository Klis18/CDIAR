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
import { SecurityModule } from './security/security.module';
import { AprobarDocenteComponent } from './security/components/aprobar-docente/aprobar-docente.component';
import { HomeModule } from './home/home.module';
import { RecursoService } from './academic-resources/services/recurso.service';
import { AcademicResourcesComponent } from './home/pages/academic-resources/academic-resources.component';

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
    {
      provide: AcademicResourcesComponent,
      useClass: AcademicResourcesComponent,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
