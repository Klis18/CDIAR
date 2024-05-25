import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { AddResourceComponent } from '../../../academic-resources/components/add-resource/add-resource.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-academic-resources',
  templateUrl: './academic-resources.component.html',
  styles: `
  `
})
export class AcademicResourcesComponent implements OnInit {

  rol:string = '';
  selectedTab = 'Publicado'; 

  private homeService = inject(HomeService);

  constructor(public dialog: MatDialog) { }

  ngOnInit(){
    this.homeService.obtenerDatosMenu().subscribe((user) => {
      this.rol = user.data.rol;
    });
  }

  openDialog() {
    this.dialog.open(AddResourceComponent, {
      data: {

      },
      width: '40%',
    });
  }

}
