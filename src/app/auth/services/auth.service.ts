import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { User, AuthStatus, LoginResponse } from '../interfaces';
import { EmailVerification } from '../interfaces/email-verification';
import { Login } from '../interfaces/login';
import { HelperHttpService } from '../../shared/services/helper.http.service';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HelperHttpService);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(login: Login): Observable<boolean> {
    return this.http.post<LoginResponse>('login', login).pipe(
      map(({ data: { user, token } }) => this.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LoginResponse>('auth/check-token', { headers }).pipe(
      map(({ data: { user, token } }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  registrarUsuario(user: User) {
    return this.http.post<User>('usuario/crear', user);
  }

  obtenerRoles() {
    return this.http.get<Role>('usuario/obtenerRoles');
  }

  verifyUser(verification: EmailVerification) {
    return this.http.post<EmailVerification>('login/verifyuser', verification);
  }
}
