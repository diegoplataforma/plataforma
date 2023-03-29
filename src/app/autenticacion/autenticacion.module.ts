import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './infraestructure/ui/components/login/login.component';
import { PrincipalAutenticacionComponent } from './infraestructure/ui/pages/principal-autenticacion/principal-autenticacion.component';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AutenticacionRepository } from './domain/repositories/autenticacion-repository';
import { AutenticacionWebRepository } from './domain/repositories/autenticacion-web-repository';
import { IniciarSesionUseCase } from './application/iniciar-sesion/iniciar-sesion-use-case';
import { RegistrarUsuarioUseCase } from './application/registrar-usuario/registrar-usuario-use-case';
import { RegisterComponent } from './infraestructure/ui/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CerrarSesionUseCase } from './application/cerrar-sesion/cerrar-sesion-use-case';

@NgModule({
  declarations: [
    LoginComponent,
    PrincipalAutenticacionComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutenticacionRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'es'
    })
  ],
  providers: [
    {
      provide: AutenticacionRepository,
      useClass: AutenticacionWebRepository
    },
    IniciarSesionUseCase,
    RegistrarUsuarioUseCase,
    CerrarSesionUseCase
  ]
})
export class AutenticacionModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}