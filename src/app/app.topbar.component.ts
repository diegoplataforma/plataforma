import { Component } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { CerrarSesionUseCase } from 'src/app/autenticacion/application/cerrar-sesion/cerrar-sesion-use-case';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, User, UserInfo } from "firebase/auth";
import { PROVIDER_ID, TIPO_USUARIO } from 'src/utils/enums/enums';
import { ObtenerUsuarioPorIDUseCase } from './usuario/application/obtener-usuario-por-id/obtener-usuario-por-id-use-case';
import { getDoc } from '@firebase/firestore';
import { Usuario } from './shared/domain/models/usuario';
import { LoginRepository } from './shared/domain/repositories/login-repository';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  usuarioActivo: User = null;
  datosUsuario: UserInfo = null;
  usuarioDB: Usuario = null;
  fotoUrl: string = "assets/layout/images/avatar/unknow_user.jpg";
  nombreYApellido: string = "";
  tipoUsuarioOfertaODemanda: string = "";

  constructor(
    public app: AppMainComponent, 
    private cerrarSesion: CerrarSesionUseCase, 
    private router: Router, 
    private obtenerUsuarioPorIDUseCase: ObtenerUsuarioPorIDUseCase,
    private loginRepository: LoginRepository) { }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.usuarioActivo = user;
        let documentReferenceUserDB = this.obtenerUsuarioPorIDUseCase.execute(user.uid)
        const docSnap = await getDoc(documentReferenceUserDB);

        if (docSnap.exists()) {
          this.usuarioDB = docSnap.data() as Usuario;
          this.loginRepository.setInfoUsuarioLogueado(this.usuarioDB)
          console.log("USUARIO ", this.usuarioDB.perfilId)
          this.fotoUrl = this.obtenerFoto();
          this.nombreYApellido = this.obtenerNombreYApellido();
          this.tipoUsuarioOfertaODemanda = this.tipoUsuario();

        } else {
          console.log("No such document!");
        }
        this.datosUsuario = this.usuarioActivo.providerData[0] as UserInfo;
        console.log(this.datosUsuario);
      } else {
        // User is signed out
        this.router.navigate(['/auth/login']);
      }
    });

  }

  tipoUsuario() {
     return this.usuarioDB.tipoUsuarioId === TIPO_USUARIO.OFERTA_ID ? TIPO_USUARIO.OFERTA.toUpperCase() : TIPO_USUARIO.DEMANDA.toUpperCase(); 
  }

  obtenerNombreYApellido() {
    if (this.usuarioActivo.displayName === null) {
      return (this.usuarioDB.nombres + " " + this.usuarioDB.apellidos).toUpperCase();
    } else {  
      return (this.usuarioActivo.displayName).toUpperCase();
    }
  }
  
  obtenerFoto() {
    if (this.usuarioActivo.photoURL === null) {
      if (this.usuarioDB.tipoUsuarioId === TIPO_USUARIO.DEMANDA_ID) {
        return "assets/layout/images/avatar/user.png";
      }
      else {
        return "assets/layout/images/avatar/company.jpeg";
      }
    } else {
      return this.usuarioActivo.photoURL;
    }
  }

  salir() {
    console.log("Hello");
    this.cerrarSesion.execute().then(response => {
      this.router.navigate(['/auth/login']);
    }).catch(error => console.log(error));
  }
}
