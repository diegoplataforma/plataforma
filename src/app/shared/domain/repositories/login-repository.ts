import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';

export abstract class LoginRepository {
    abstract obtenerInfoUsuarioLogueado(): Subject<Usuario>;
    abstract setInfoUsuarioLogueado(usuario: Usuario);
} 