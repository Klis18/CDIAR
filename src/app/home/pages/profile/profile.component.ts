import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../custom/custom-validators';
import { User } from '../../../auth/interfaces';
import { HomeService } from '../../services/home.service';
import { encryptStorage } from '../../../shared/utils/storage';
import { PersonalData } from '../../interfaces/personalData';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit{

  private homeService = inject(HomeService);
  
  value: string | undefined;
  isDisabled: boolean = true;

  userTypes: { label: string; value: string }[] = [];

  userName: string = '';
  cedula: string = '';
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  passwordConfirm: string = '';
  rolId: string = '';
  rolName: string = '';

  public userGroup = new FormGroup(
    {
      cedula: new FormControl<string>('', Validators.required),
      nombres: new FormControl<string>('', Validators.required),
      apellidos: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', Validators.required),
      phoneNumber: new FormControl<string>('', Validators.required),
    }
  );

  ngOnInit() {

    this.homeService.obtenerDatosMenu().subscribe((user) => {
      this.userName = user.data.userName;
      this.rolName = user.data.rol;
    });

    this.homeService.obtenerDatosUsuario().subscribe((user) => {
      this.cedula = user.data.cedula;
      this.nombres = user.data.nombres;
      this.apellidos = user.data.apellidos;
      this.email = user.data.email;
      this.phoneNumber = user.data.phoneNumber;
    });
  }

  
  get currentUser(): PersonalData {
    const user = this.userGroup.value as PersonalData;
    return user;
  }

  onSubmit() {
    if (this.userGroup.invalid) return;
    console.log(this.currentUser);

    this.currentUser.username = (
      this.currentUser.nombres + this.currentUser.apellidos
    ).replace(/\s/g, '');

    this.homeService.actualizarDatosUsuario(this.currentUser).subscribe((user) => {
      encryptStorage.setItem('user', this.currentUser);
    });
    
  }
}
