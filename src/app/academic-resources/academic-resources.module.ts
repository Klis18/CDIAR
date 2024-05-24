import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceFiltersComponent } from './components/resource-filters/resource-filters.component';
import { MaterialModule } from '../material/material.module';
import { ResourcesTableComponent } from './components/resources-table/resources-table.component';


@NgModule({
  declarations: [
  
    ResourceFiltersComponent,
        ResourcesTableComponent
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
