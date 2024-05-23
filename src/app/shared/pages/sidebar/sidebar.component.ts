import {Component} from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent{

  public isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }


  menuOptions = [
    { 
      icon: 'home',
      name: 'Inicio', 
      route: '/inicio',
      expanded: false,
      subOptions: []
    },
    { 
      icon: 'collections_bookmark',
      name: 'Recursos Académicos', 
      route: '/productos',
      expanded: false,
      subOptions: []
    },
    { 
      icon: 'spa',
      name: 'Aprender', 
      route: '/contacto',
      expanded: false,
      subOptions: [
        { name: 'Flashcards', route: '' },
        { name: 'Videolearn', route: '' },
      ]
    },
    { 
      icon: 'assignment',
      name: 'Simuladores', 
      route: '/productos',
      expanded: false,
      subOptions: []
    },
    { 
      icon: 'trending_up',
      name: 'Metas y Rendimiento', 
      route: '/contacto',
      expanded: false,
      subOptions: [
        { name: 'Metas', route: '' },
        { name: 'Rendimiento', route: '' },
      ]
    }
    // Agrega aquí más opciones si las necesitas
  ];

  toggleExpand(option: any) {
    option.expanded = !option.expanded;
  }
}