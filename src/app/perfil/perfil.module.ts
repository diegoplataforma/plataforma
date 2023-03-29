import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { VerPerfilComponent } from './infraestructure/ui/components/ver-perfil/ver-perfil.component';
import { PrincipalPerfilComponent } from './infraestructure/ui/pages/principal-perfil/principal-perfil.component';
import { SharedModule } from '../shared/shared.module';
import { EditarPerfilComponent } from './infraestructure/ui/components/editar-perfil/editar-perfil.component';
import { DialogService } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    PrincipalPerfilComponent,
    VerPerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule
  ],
  providers: [
    DialogService
  ]
})
export class PerfilModule { }
