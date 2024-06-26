import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { AddResourceComponent } from '../../../academic-resources/components/add-resource/add-resource.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-academic-resources',
  templateUrl: './academic-resources.component.html',
  styles: `
  `,
})
export class AcademicResourcesComponent implements OnInit {
  usuario: string = '';
  rol: string = '';
  selectedTab = 'Publicado';

  private homeService = inject(HomeService);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.homeService.obtenerDatosMenu().subscribe((user) => {
      console.log(user);
      this.usuario = user.data.userName;
      this.rol = user.data.rol;
    });
  }

  openDialog() {
    this.dialog.open(AddResourceComponent, {
      width: '40%',
      maxHeight: '80%',
    });
  }

}
