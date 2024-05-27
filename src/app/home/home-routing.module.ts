import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AcademicResourcesComponent } from './pages/academic-resources/academic-resources.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children:[
      {path:'landing', component: HomeComponent},
      {path:'resources', component: AcademicResourcesComponent},
      {path:'profile', component: ProfileComponent},
      {path:'**', redirectTo:'landing'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
