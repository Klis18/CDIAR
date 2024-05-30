import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './pages/footer/footer.component';
import { CardMessageComponent } from './pages/card-message/card-message.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CardConfirmComponent } from './pages/card-confirm/card-confirm.component';


@NgModule({
  declarations: [
    FooterComponent,
    CardMessageComponent,
    SidebarComponent,
    CardConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
