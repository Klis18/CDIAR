import { Component } from '@angular/core';

@Component({
  selector: 'resources-table',
  templateUrl: './resources-table.component.html',
  styles: ``
})
export class ResourcesTableComponent {
  
    data = []; // Tus datos aquí
    currentPage = 1;
    itemsPerPage = 10;
    totalPages = Math.ceil(this.data.length / this.itemsPerPage);
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
}
