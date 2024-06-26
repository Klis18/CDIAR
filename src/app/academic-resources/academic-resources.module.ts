import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceFiltersComponent } from './components/resource-filters/resource-filters.component';
import { MaterialModule } from '../material/material.module';
import { ResourcesTableComponent } from './components/resources-table/resources-table.component';
import { AddResourceComponent } from './components/add-resource/add-resource.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditResourceComponent } from './components/edit-resource/edit-resource.component';
import { SharedModule } from '../shared/shared.module';
import { ResourcesFormComponent } from './components/resources-form/resources-form.component';

@NgModule({
  declarations: [
    ResourceFiltersComponent,
    ResourcesTableComponent,
    AddResourceComponent,
    EditResourceComponent,
    ResourcesFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [ResourceFiltersComponent, ResourcesTableComponent],
})
export class AcademicResourcesModule {}
