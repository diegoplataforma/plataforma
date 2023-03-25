import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

export abstract class AutenticacionRepository {
    abstract iniciarSesion(username: string, password: string) : Observable<Usuario[]>;
} 