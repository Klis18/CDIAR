import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  private homeService = inject(HomeService);

  profileForm!: FormGroup;

  userName: string = '';
  rolName: string = '';

  ngOnInit() {
    this.profileForm = new FormGroup({
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern('.{10}$'),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]*$'),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]*$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('.{10}$'),
      ]),
    });

    this.homeService.obtenerDatosMenu().subscribe((user) => {
      this.userName = user.data.userName;
      this.rolName = user.data.rol;
    });

    this.homeService.obtenerDatosUsuario().subscribe((user) => {
      this.profileForm.setValue({
        cedula: user.data.cedula,
        nombres: user.data.nombres,
        apellidos: user.data.apellidos,
        email: user.data.email,
        phoneNumber: user.data.phoneNumber,
      });
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    const formValue = this.profileForm.value;
    const userName = (formValue.nombres + formValue.apellidos).replace(
      /\s/g,
      ''
    );

    formData.append('cedula', formValue.cedula);
    formData.append('nombres', formValue.nombres);
    formData.append('apellidos', formValue.apellidos);
    formData.append('email', formValue.email);
    formData.append('phoneNumber', formValue.phoneNumber);
    formData.append('username', userName);

    this.homeService.actualizarDatosUsuario(formData).subscribe((response) => {
      // Manejar la respuesta del servidor aquí, si es necesario
    });
  }
}
