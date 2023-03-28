import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { ConfigPerfilComponent } from './infraestructure/ui/components/config-perfil/config-perfil.component';
import { PrincipalPerfilComponent } from './infraestructure/ui/pages/principal-perfil/principal-perfil.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PrincipalPerfilComponent,
    ConfigPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule
  ]
})
export class PerfilModule { }
