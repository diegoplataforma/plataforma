import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './infraestructure/ui/components/login/login.component';
import { PrincipalAutenticacionComponent } from './infraestructure/ui/pages/principal-autenticacion/principal-autenticacion.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalAutenticacionComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AutenticacionRoutingModule { }
