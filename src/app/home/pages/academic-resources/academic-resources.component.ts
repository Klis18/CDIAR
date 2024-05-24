import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-academic-resources',
  templateUrl: './academic-resources.component.html',
  styles: ``
})
export class AcademicResourcesComponent implements OnInit {

  rol:string = '';
  private homeService = inject(HomeService);

  constructor() { }

  ngOnInit(){
    this.homeService.obtenerDatosMenu().subscribe((user) => {
      this.rol = user.data.rol;
    });
  }

}
