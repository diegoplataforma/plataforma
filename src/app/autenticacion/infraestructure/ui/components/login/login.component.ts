import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionUseCase } from 'src/app/autenticacion/application/iniciar-sesion/iniciar-sesion-use-case';
import { CorreoYContrasena } from "../../../../domain/models/correoYcontrasena";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formularioLogin: FormGroup;

  constructor(
    private iniciarSesionUseCase: IniciarSesionUseCase,
    private router: Router) {

    this.formularioLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let correoContrasena = this.formularioLogin.value as CorreoYContrasena;
    this.iniciarSesionUseCase.execute(correoContrasena).then(response => {
      console.log(response);
      this.router.navigate(['/']);
    }).catch(error => {
      console.log(error);
    });
  }
}
