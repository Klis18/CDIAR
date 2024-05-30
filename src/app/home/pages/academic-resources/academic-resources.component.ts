import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { AddResourceComponent } from '../../../academic-resources/components/add-resource/add-resource.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  // openDialog() {
  //   this.dialog.open(AddResourceComponent, {
  //     data: {
  //     },
  //     width: '40%',
  //   });
  // }

  openDialog() {
    this.dialog.open(AddResourceComponent,
      {
        width: '40%',
        maxHeight: '80%',
      }
    );
  }
  


  // addResource(): void {
  //   const dialogRef: MatDialogRef<AddResourceComponent> = this.dialog.open(
  //     AddResourceComponent,
  //     {
  //       width: '800px',
  //       maxHeight: '700px',
  //     },
  //   );
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === '201') {
       
  //       console.log('Registro guardado correctamente.')
  //     } else {
  //       console.log('Error')
        
  //     }
  //   });
  // }
}
