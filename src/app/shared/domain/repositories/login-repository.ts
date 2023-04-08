import { Usuario } from '../models/usuario';

export abstract class LoginRepository {
    abstract obtenerInfoUsuarioLogueado(): Usuario;
    abstract setInfoUsuarioLogueado(usuario: Usuario);
} 