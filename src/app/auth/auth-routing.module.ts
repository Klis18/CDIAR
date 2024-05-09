import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { VerificacionUsuarioComponent } from './pages/verificacion-usuario/verificacion-usuario.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path:'',
    component: AuthLayoutComponent,
    children:[
      {path: 'login', component: LoginComponent},
      {path: 'registro', component: RegistroUsuarioComponent},
      {path:'verify', component: VerificacionUsuarioComponent},
      {path:'**', redirectTo:'login'}
    ]
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
