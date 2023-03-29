import { Component } from '@angular/core';

import { AppMainComponent } from './app.main.component';
import { CerrarSesionUseCase } from 'src/app/autenticacion/application/cerrar-sesion/cerrar-sesion-use-case';
import { er } from '@fullcalendar/core/internal-common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {


  constructor(public app: AppMainComponent, private cerrarSesion: CerrarSesionUseCase, private router: Router) { }

  salir() {
    console.log("Hello");
    this.cerrarSesion.execute().then(response => {
      this.router.navigate(['/auth/login']);
    }).catch(error => console.log(error));
  }

}
