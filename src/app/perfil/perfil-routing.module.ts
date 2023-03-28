import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PrincipalPerfilComponent } from './infraestructure/ui/pages/principal-perfil/principal-perfil.component';
import { ConfigPerfilComponent } from './infraestructure/ui/components/config-perfil/config-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPerfilComponent,
    children: [
      {
        path: '',
        component: ConfigPerfilComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PerfilRoutingModule { }
