import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceFiltersComponent } from './components/resource-filters/resource-filters.component';
import { MaterialModule } from '../material/material.module';
import { ResourcesTableComponent } from './components/resources-table/resources-table.component';
import { AddResourceComponent } from './components/add-resource/add-resource.component';


@NgModule({
  declarations: [
  
    ResourceFiltersComponent,
        ResourcesTableComponent,
        AddResourceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ResourceFiltersComponent,
    ResourcesTableComponent
  ]
})
export class AcademicResourcesModule { }
