import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionGoogleUseCase } from 'src/app/autenticacion/application/iniciar-sesion-google/iniciar-sesion-google-use-case';
import { IniciarSesionUseCase } from 'src/app/autenticacion/application/iniciar-sesion/iniciar-sesion-use-case';
import { EXPRESIONES_REGULARES, TYPE_INPUT } from 'src/utils/enums/enums';
import { CorreoYContrasena } from "../../../../domain/models/correoYcontrasena";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formularioLogin: FormGroup;
  varMostrarContrasena: boolean = false;

  @ViewChild('contrasenaInput') contrasenaInput: ElementRef;

  constructor(
    private iniciarSesionUseCase: IniciarSesionUseCase,
    private iniciarSesionGoogle: IniciarSesionGoogleUseCase,
    private router: Router) {

    this.formularioLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(EXPRESIONES_REGULARES.CONTRASENA_SEGURA)])
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

  mostrarContrasena() {
    this.varMostrarContrasena = !this.varMostrarContrasena;
    this.contrasenaInput.nativeElement.type = this.varMostrarContrasena ? TYPE_INPUT.TEXT : TYPE_INPUT.PASSWORD;
  }

  iniciarSesionConGoogle() {
    this.iniciarSesionGoogle.execute()
      .then(response => {
        console.log(response);
        this.router.navigate(['/']);
      }).catch(error => {
        console.log(error);
      });
  }

  /**
   * Métodos GET que permiten tener acceso a cada una de las propiedas del formulario
   */
  get emailControl(): FormControl {
    return this.formularioLogin.get("email") as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formularioLogin.get("password") as FormControl;
  }
}

