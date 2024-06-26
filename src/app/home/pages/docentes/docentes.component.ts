import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styles: ``,
})
export class DocentesComponent {
  usuario: string = '';
  rol: string = '';

  private homeService = inject(HomeService);
  mostrarTablaCargaHoraria = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.homeService.obtenerDatosMenu().subscribe((user) => {
      console.log(user);
      this.usuario = user.data.userName;
      this.rol = user.data.rol;
    });
  }

  openDialog() {
    this.mostrarTablaCargaHoraria = true;
  }
}
