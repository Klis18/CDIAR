import { Pipe, PipeTransform } from '@angular/core';
import { ListaRecurso } from '../../academic-resources/interfaces/recurso.interface';

@Pipe({
  name: 'resourcesFilter'
})
export class ResourcesPipeFilter implements PipeTransform {
  transform(items: ListaRecurso[], nombreRecurso: string, nivel: string, asignatura: string): any {
    if (!items) {
      return items;
    }
    if (nivel) {
      items = items.filter(item => item.nombreRecurso.toLowerCase().includes(nombreRecurso.toLowerCase()));
    }
    if (nivel) {
      items = items.filter(item => item.nivel.toLowerCase().includes(nivel.toLowerCase()));
    }
    if (asignatura) {
      items = items.filter(item => item.asignatura.toLowerCase() === asignatura.toLowerCase());
    }
    return items;
  }
}