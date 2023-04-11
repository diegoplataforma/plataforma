import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { LoginRepository } from './login-repository';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LoginWebRepository implements LoginRepository {

    private usuario$: Subject<Usuario> = new Subject();
    private usuario: Usuario;

    constructor() {
        console.log("CONSTRUCTOR SUBJECT ")
    }
    obtenerInfoUsuarioLogueado(): Subject<Usuario> {
        return this.usuario$;
    }
    setInfoUsuarioLogueado(usuario: Usuario) {
        console.log("usuario ", usuario);
        this.usuario = usuario
        this.usuario$.next(this.usuario);
    }
}