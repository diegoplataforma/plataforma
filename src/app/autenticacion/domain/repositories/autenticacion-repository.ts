import { User, UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CorreoYContrasena } from '../models/correoYcontrasena';
import { RegistrarUsuario } from '../models/registrarUsuario';


export abstract class AutenticacionRepository {

    abstract iniciarSesion(correoYcontrasena: CorreoYContrasena): Promise<UserCredential>;

    abstract registrarUsuario(correoYcontrasena: CorreoYContrasena): Promise<UserCredential>;

    abstract cerrarSesion(): Promise<void>;

    abstract iniciarSesionGoogle(): Promise<UserCredential>;

    abstract iniciarSesionFacebook(): Promise<UserCredential>;

    abstract eviarCorreoParaVerificacion(user : User): Promise<void>;
} 