import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpInterceptorService } from '../../../shared/services/http.interceptor.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styles: `

  `
})
export class AddResourceComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: HttpInterceptorService) {}

  
}
