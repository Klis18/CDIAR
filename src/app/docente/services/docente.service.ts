import { inject } from '@angular/core';
import { HelperHttpService } from '../../shared/services/helper.http.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { DiasSemana } from '../interfaces/dias-semana.interface';

export class DocenteService {
  private http = inject(HelperHttpService);
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor(private authService: AuthService) {
    this.authService.checkAuthStatus().subscribe();
  }

  getDiasSemana() {
    return this.http.get<DiasSemana>('diassemana', {
      headers: this.headers,
    });
  }
}
