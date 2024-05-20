import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './pages/footer/footer.component';
import { CardMessageComponent } from './pages/card-message/card-message.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    FooterComponent,
    CardMessageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ],
  exports: [
    FooterComponent
  ]
})
export class SharedModule { }
