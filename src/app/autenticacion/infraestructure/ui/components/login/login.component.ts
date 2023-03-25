import { Component } from '@angular/core';
import { IniciarSesionUseCase } from 'src/app/autenticacion/application/iniciar-sesion/iniciar-sesion-use-case';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private iniciarSesionUseCase: IniciarSesionUseCase) { }

  obtenerUsuario() {
    this.iniciarSesionUseCase.execute(null).subscribe({
      next: () => {
      },
      complete: () => {

      },
      error: () => {

      }
    })
  }
}
