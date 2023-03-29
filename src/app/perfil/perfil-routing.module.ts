import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PrincipalPerfilComponent } from './infraestructure/ui/pages/principal-perfil/principal-perfil.component';
import { VerPerfilComponent } from './infraestructure/ui/components/ver-perfil/ver-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPerfilComponent,
    children: [
      {
        path: '',
        component: VerPerfilComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PerfilRoutingModule { }
