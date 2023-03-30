import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarUsuarioUseCase } from 'src/app/autenticacion/application/registrar-usuario/registrar-usuario-use-case';
import { CorreoYContrasena } from 'src/app/autenticacion/domain/models/correoYcontrasena';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EXPRESIONES_REGULARES, TIPO_USUARIO } from 'src/utils/enums/enums';
import { contrasenasIguales } from 'src/utils/validacionesFormGroup/validacionImporteAutorizadoMenorAlImporteReclamado';
import { RegistrarUsuarioBDUseCase } from 'src/app/usuario/application/registrar-usuario/registrar-usuario-use-case';
import { Usuario } from 'src/app/usuario/domain/models/usuario';
import { RegistrarUsuarioBDConIDUseCase } from 'src/app/usuario/application/registrar-usuario-con-id/registrar-usuario-con-id-use-case';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  primerFormularioRegistro: FormGroup;
  segundoFormularioRegistro: FormGroup;

  constructor(private crearUsuario: RegistrarUsuarioUseCase, private crearUsuarioConId : RegistrarUsuarioBDConIDUseCase,
    private registrarUsuarioDB: RegistrarUsuarioBDUseCase, private router: Router) {
    this.primerFormularioRegistro = new FormGroup({
      tipo: new FormControl('oferta', [Validators.required]),
      email: new FormControl('alejo@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('1234567', [Validators.required, Validators.pattern(EXPRESIONES_REGULARES.CONTRASENA_SEGURA)]),
      repeated_password: new FormControl('1234567', [Validators.required, Validators.pattern(EXPRESIONES_REGULARES.CONTRASENA_SEGURA)])
    }, [contrasenasIguales]);


    this.segundoFormularioRegistro = new FormGroup({
      nombres: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      celular : new FormControl(null)
    });
  }

  valTipoUsuario: string;
  crearCuenta: boolean = false;

  ngOnInit(): void {

  }


  toggleFormularioRegistro() {
    this.crearCuenta = !this.crearCuenta;
  }

  onSubmitSegundoFormularioRegistro() {
    console.log(this.primerFormularioRegistro.value);
    console.log(this.segundoFormularioRegistro.value);

    let correoYcontrasena: CorreoYContrasena = this.crearObjetoCorreoYContrasena();

    this.crearUsuario.execute(correoYcontrasena)
      .then(response => {
        console.log("respose", response);
        let usuario: Usuario = this.crearObjetoUsuario(response);
        this.crearUsuarioConId.execute(usuario).then(resp => {
          console.log(resp);
          this.router.navigate(['/']);
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      })
  }

  private crearObjetoCorreoYContrasena() {
    let correoYcontrasena: CorreoYContrasena;
    correoYcontrasena = {
      email: this.emailControl.value,
      password: this.passwordControl.value
    };
    return correoYcontrasena;
  }

  private crearObjetoUsuario(response: UserCredential) {
    let usuario: Usuario;
    usuario = {
      email: this.emailControl.value,
      id: response.user.uid,
      nombres: this.nombresControl.value,
      apellidos: this.apellidosControl.value,
      celular: this.celularControl.value !== null ? this.celularControl.value : null,
      perfilId: Date.now().toString(12),
      tipoUsuarioId: this.tipoControl.value === "oferta" ? TIPO_USUARIO.OFERTA_ID : TIPO_USUARIO.DEMANDA_ID
    };
    return usuario;
  }

  /**
  * Métodos GET que permiten tener acceso a cada una de las propiedas del formulario
  */

  get tipoControl(): FormControl {
    return this.primerFormularioRegistro.get("tipo") as FormControl;
  }

  get emailControl(): FormControl {
    return this.primerFormularioRegistro.get("email") as FormControl;
  }

  get passwordControl(): FormControl {
    return this.primerFormularioRegistro.get("password") as FormControl;
  }

  get repeatedPasswordControl(): FormControl {
    return this.primerFormularioRegistro.get("repeated_password") as FormControl;
  }

  get nombresControl(): FormControl {
    return this.segundoFormularioRegistro.get("nombres") as FormControl;
  }

  get apellidosControl(): FormControl {
    return this.segundoFormularioRegistro.get("apellidos") as FormControl;
  }
  get celularControl(): FormControl {
    return this.segundoFormularioRegistro.get("celular") as FormControl;
  }

}
