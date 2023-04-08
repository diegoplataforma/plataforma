import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { VerPerfilComponent } from './infraestructure/ui/components/ver-perfil/ver-perfil.component';
import { PrincipalPerfilComponent } from './infraestructure/ui/pages/principal-perfil/principal-perfil.component';
import { SharedModule } from '../shared/shared.module';
import { EditarPerfilComponent } from './infraestructure/ui/components/editar-perfil/editar-perfil.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PerfilRepository } from './domain/repositories/perfil-repository';
import { PerfilWebRepository } from './domain/repositories/perfil-web-repository';
import { RegistrarPerfilUseCase } from './application/registrar-perfil/registrar-perfil-use-case';
import { ObtenerPerfilPorIdUseCase } from './application/obtener-perfil-por-id/obtener-perfil-por-id-use-case';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirebaseApp } from '@angular/fire/app';
import { ObtenerImagenesPerfilIdUseCase } from './application/obtener-imagenes-perfil-id/obtener-imagenes-perfil-id';
import { EliminarImagenPerfilUseCase } from './application/eliminar-imagen-perfil/eliminar-imagen-perfil-use-case';
@NgModule({
  declarations: [
    PrincipalPerfilComponent,
    VerPerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    provideStorage(() => getStorage())
  ],
  providers: [
    DialogService,
    MessageService,
    ObtenerImagenesPerfilIdUseCase,
    {
      provide: PerfilRepository,
      useClass: PerfilWebRepository
    },
    RegistrarPerfilUseCase,
    ObtenerPerfilPorIdUseCase,
    EliminarImagenPerfilUseCase
    
  ]
})
export class PerfilModule { }
