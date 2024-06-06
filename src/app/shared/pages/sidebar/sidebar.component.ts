import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../../home/services/home.service';
import { Role } from '../../../auth/interfaces/role';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent implements OnInit{

  private homeService = inject(HomeService);
  rol: string = '';
  
  ngOnInit(): void {
    this.homeService.obtenerDatosMenu().subscribe((user) => {
      this.rol = user.data.rol;
      this.menuOptions = this.menuOptions.filter(option => option.roles.includes(this.rol));
    });
  }


  menuOptions = [
    {
      icon: 'home',
      name: 'Inicio',
      route: '/inicio',
      expanded: false,
      subOptions: [],
      roles:['Docente','Admin','Estudiante']
    },
    {
      icon: 'collections_bookmark',
      name: 'Recursos Académicos',
      route: '/home/resources',
      expanded: false,
      subOptions: [],
      roles:['Docente','Estudiante']
    },
    {
      icon: 'spa',
      name: 'Aprender',
      route: '/contacto',
      expanded: false,
      subOptions: [
        { name: 'Flashcards', route: '' },
        { name: 'Videolearn', route: '' },
      ],
      roles:['Docente','Estudiante']
    },
    {
      icon: 'assignment',
      name: 'Simuladores',
      route: '/productos',
      expanded: false,
      subOptions: [],
      roles:['Docente','Estudiante']
    },
    {
      icon: 'trending_up',
      name: 'Metas y Rendimiento',
      route: '/contacto',
      expanded: false,
      subOptions: [
        { name: 'Metas', route: '' },
        { name: 'Rendimiento', route: '' },
      ],
      roles:['Estudiante']
    },
    {
      icon: 'calendar_today',
      name: 'Carga Horaria',
      route: '/productos',
      expanded: false,
      subOptions: [],
      roles:['Docente']
    },
    {
      icon: 'security',
      name: 'Control y Seguridad',
      route: '/contacto',
      expanded: false,
      subOptions: [
        { name: 'Aprobación Docente', route: '' },
        { name: 'Malla Académica', route: '' },
        { name: 'Carga Horaria', route: '' },
        { name: 'Asignación Revisor', route: '' },
      ],
      roles:['Admin']
    },
    {
      icon: 'insert_drive_file',
      name: 'Reportes',
      route: '/contacto',
      expanded: false,
      subOptions: [
        { name: 'Reporte de Usuarios', route: '' },
        { name: 'Reporte de Simuladores', route: '' },
      ],
      roles:['Admin']
    },
    {
      icon: ' insert_chart',
      name: 'Dashboard',
      route: '/productos',
      expanded: false,
      subOptions: [],
      roles:['Admin']
    },
  ];

  


  toggleExpand(option: any) {
    option.expanded = !option.expanded;
  }

}
