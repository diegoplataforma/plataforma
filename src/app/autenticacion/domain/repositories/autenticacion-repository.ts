import { UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CorreoYContrasena } from '../models/correoYcontrasena';


export abstract class AutenticacionRepository {

    abstract iniciarSesion(correoYcontrasena: CorreoYContrasena): Promise<UserCredential>;

    abstract registrarUsuario(correoYcontrasena: CorreoYContrasena): Promise<UserCredential>;

    abstract cerrarSesion(): Promise<void>;
} 