import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces';
import { Role } from '../../interfaces/role';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../../../custom/custom-validators';

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
    identityNumber: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
    userlastname: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', (Validators.required)),
    phoneNumber: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    passwordConfirm: new FormControl<string>('', Validators.required),
    rolId: new FormControl<string>('', Validators.required),
  },{
    validators: CustomValidators.mustBeEqual(
      'password',
      'passwordConfirm'
    ),
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
