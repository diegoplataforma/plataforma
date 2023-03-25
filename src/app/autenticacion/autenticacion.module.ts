import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './infraestructure/ui/components/login/login.component';
import { PrincipalAutenticacionComponent } from './infraestructure/ui/pages/principal-autenticacion/principal-autenticacion.component';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    PrincipalAutenticacionComponent
  ],
  imports: [
    CommonModule, 
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
  ]
})
export class AutenticacionModule { }
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}