import { Injectable, inject } from '@angular/core';
import { HelperHttpService } from '../../shared/services/helper.http.service';
import { AuthService } from '../../auth/services/auth.service';
import { Home } from '../interfaces/home';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HelperHttpService);
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor(authService: AuthService) {
    authService.checkAuthStatus().subscribe();
  }

  obtenerDatosMenu() {
    return this.http.get<Home>('persona/datos-persona-menu', {
      headers: this.headers,
    });
  }
}
