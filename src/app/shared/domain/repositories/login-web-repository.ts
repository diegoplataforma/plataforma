import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { LoginRepository } from './login-repository';
@Injectable()
export class LoginWebRepository implements LoginRepository {

    private usuario: Usuario

    obtenerInfoUsuarioLogueado(): Usuario {
        return this.usuario 
    }
    setInfoUsuarioLogueado(usuario: Usuario) {
        this.usuario = usuario
    }
}