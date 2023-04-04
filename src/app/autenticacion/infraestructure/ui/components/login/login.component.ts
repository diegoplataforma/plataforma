import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionGoogleUseCase } from 'src/app/autenticacion/application/iniciar-sesion-google/iniciar-sesion-google-use-case';
import { IniciarSesionUseCase } from 'src/app/autenticacion/application/iniciar-sesion/iniciar-sesion-use-case';
import { ERRORES_FIREBASE, EXPRESIONES_REGULARES, TIPO_USUARIO, TYPE_INPUT } from 'src/utils/enums/enums';
import { CorreoYContrasena } from "../../../../domain/models/correoYcontrasena";
import { CorreoVerificacionUseCase } from 'src/app/autenticacion/application/correo-verificacion/correo-verificacion-use-case';
import { RegistrarUsuarioUseCase } from 'src/app/autenticacion/application/registrar-usuario/registrar-usuario-use-case';
import { UserCredential } from '@angular/fire/auth';
import { Usuario } from 'src/app/usuario/domain/models/usuario';
import { RegistrarUsuarioBDConIDUseCase } from 'src/app/usuario/application/registrar-usuario-con-id/registrar-usuario-con-id-use-case';
import { ObtenerUsuarioPorIDUseCase } from 'src/app/usuario/application/obtener-usuario-por-id/obtener-usuario-por-id-use-case';
import { getDoc } from '@firebase/firestore';
import { MessageService } from 'primeng/api';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  formularioLogin: FormGroup;
  varMostrarContrasena: boolean = false;

  mostrarSlideVerificacionCorreo: boolean = false;
  closeOnEscapevar: boolean = false;
  mostrarDialogoTipoUsuario: boolean = false;
  valorTipoUsuario: string = "oferta";
  usuarioGoogle: UserCredential = null;

  @ViewChild('contrasenaInput') contrasenaInput: ElementRef;

  constructor(
    private iniciarSesionUseCase: IniciarSesionUseCase,
    private iniciarSesionGoogle: IniciarSesionGoogleUseCase,
    private correoVerificacionUseCase: CorreoVerificacionUseCase,
    private obtenerUsuarioPorIDUseCase: ObtenerUsuarioPorIDUseCase,
    private router: Router,
    private crearUsuarioConId: RegistrarUsuarioBDConIDUseCase,
    private service: MessageService) {

    this.formularioLogin = new FormGroup({
      email: new FormControl('alejo001@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('1234567', [Validators.required, Validators.pattern(EXPRESIONES_REGULARES.CONTRASENA_SEGURA)])
    });
  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        this.router.navigate(['/']);
      } else {
        // User is signed out
      }
    });
  }

  onSubmit() {
    let correoContrasena = this.formularioLogin.value as CorreoYContrasena;
    this.iniciarSesionUseCase.execute(correoContrasena).then(response => {
      console.log(response);
      if (response.user.emailVerified) {
        this.router.navigate(['/']);
      } else {  
        this.correoVerificacionUseCase.execute(response.user)
          .then((resp: any) => {
            this.mostrarSlideVerificacionCorreo = true;
          }).catch(error => {
            this.validacionError(error);
          })
      }
    }).catch(error => {
      this.validacionError(error);
    });
  }

  private validacionError(error: any) {
    if (ERRORES_FIREBASE.AUTH_USER_NOT_FOUND === Object.values(error)[0]) {
      this.service.add({ key: 'login', severity: 'warn', summary: 'Alerta', detail: 'No existe el usuario, verifique sus datos.' });
    } else if (ERRORES_FIREBASE.AUTH_TOO_MANY_REQUEST === Object.values(error)[0]) {
      this.service.add({ key: 'login', severity: 'error', summary: 'Alerta', detail: 'Muchas peticiones para el servidor de autenticación' });
    } else if (ERRORES_FIREBASE.AUTH_CLOSED_BY_USER === Object.values(error)[0]) {
      this.service.add({ key: 'login', severity: 'warn', summary: 'Alerta', detail: 'Cerraste el PopUp' });
    } else {
      this.service.add({ key: 'login', severity: 'warn', summary: 'Alerta', detail: 'Error desconocido' });
      console.log(error);
    }
  }

  mostrarContrasena() {
    this.varMostrarContrasena = !this.varMostrarContrasena;
    this.contrasenaInput.nativeElement.type = this.varMostrarContrasena ? TYPE_INPUT.TEXT : TYPE_INPUT.PASSWORD;
  }

  iniciarSesionConGoogle() {
    this.iniciarSesionGoogle.execute()
      .then(async response => {
        this.usuarioGoogle = response;
        console.log(response);
        //Crear Usuario

        let usuarioDB = this.obtenerUsuarioPorIDUseCase.execute(response.user.uid);
        const docSnap = await getDoc(usuarioDB);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.router.navigate(['/']);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          this.mostrarDialogoTipoUsuario = true;
        }

      }).catch(error => {
        this.validacionError(error);
      });
  }

  registrarUsuario() {
    let usuario = this.crearObjetoUsuario(this.usuarioGoogle);
    console.log(usuario);
    this.crearUsuarioConId.execute(usuario)
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/']);
      }).catch(error => {
        this.validacionError(error);
      });
  }

  private crearObjetoUsuario(user: UserCredential) {
    let usuario: Usuario;
    usuario = {
      email: user.user.email,
      id: user.user.uid,
      nombres: this.obtenerNombre(user.user.displayName),
      apellidos: this.obtenerApellidos(user.user.displayName),
      celular: user.user.phoneNumber,
      perfilId: Date.now().toString(12),
      tipoUsuarioId: this.valorTipoUsuario === "oferta" ? TIPO_USUARIO.OFERTA_ID : TIPO_USUARIO.DEMANDA_ID
    };
    return usuario;
  }

  private obtenerApellidos(nombreCompleto: string) {
    let arreglo_nombre = nombreCompleto.split(' ');
    switch (arreglo_nombre.length) {
      case 1:
        return arreglo_nombre[0];

      case 2:
        return arreglo_nombre[1];

      case 3:
        return arreglo_nombre[1] + " " + arreglo_nombre[2];

      case 4:
        return arreglo_nombre[2] + " " + arreglo_nombre[3];

      default:
        return arreglo_nombre[length - 2] + " " + arreglo_nombre[length - 1];
    }
  }

  private obtenerNombre(nombreCompleto: string) {
    let arreglo_nombre = nombreCompleto.split(' ');
    if (arreglo_nombre.length > 3) {
      return arreglo_nombre[0] + " " + arreglo_nombre[1];
    } else {
      return arreglo_nombre[0];
    }
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

