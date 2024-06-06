import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './pages/footer/footer.component';
import { CardMessageComponent } from './pages/card-message/card-message.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CardConfirmComponent } from './pages/card-confirm/card-confirm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input.components';
import { SelectComponent } from './components/select.components';
import { ResourcesPipeFilter } from './pipes/resources-pipe-filter.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    CardMessageComponent,
    SidebarComponent,
    CardConfirmComponent,
    InputComponent,
    SelectComponent,
    ResourcesPipeFilter
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    InputComponent,
    SelectComponent,
    ResourcesPipeFilter
  ]
})
export class SharedModule { }
