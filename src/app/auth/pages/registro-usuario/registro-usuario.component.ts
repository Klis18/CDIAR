import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces';
import { Role } from '../../interfaces/role';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styles: ``,
})
export class RegistroUsuarioComponent {
  value: string | undefined;

  // userTypes: any;

  userTypes: { label: string; value: string }[] = [];

  // formGroup: FormGroup = new FormGroup({});

  public userGroup = new FormGroup({
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phoneNumber: new FormControl<string>(''),
    password: new FormControl<string>(''),
    rolId: new FormControl<string>(''),
  });

  ngOnInit() {
    this.authService.obtenerRoles().subscribe((res: any) => {
      this.userTypes = res.data.map((role: Role) => ({
        label: role.rolName,
        value: role.rolId,
      }));
    });
  }

  constructor(private authService: AuthService, private router: Router) {}

  get currentUser(): User {
    const user = this.userGroup.value as User;
    return user;
  }

  onSubmit() {
    if (this.userGroup.invalid) return;
    console.log(this.currentUser);

    if (this.userGroup.value.username) {
      this.userGroup.value.username = this.userGroup.value.username.replace(
        /\s/g,
        ''
      );
    }

    this.authService.registrarUsuario(this.currentUser).subscribe((user) => {
      this.router.navigate(['/auth/verify'], {
        queryParams: { email: this.userGroup.value.email },
      });
    });
  }
}
