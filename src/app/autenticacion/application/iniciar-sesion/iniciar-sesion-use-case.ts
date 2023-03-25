import { UseCase } from "src/app/shared/base/use-case";
import { Usuario } from "../../domain/models/usuario";
import { Observable } from 'rxjs';
import { AutenticacionRepository } from "../../domain/repositories/autenticacion-repository";
import { Injectable } from "@angular/core";

@Injectable()
export class IniciarSesionUseCase implements UseCase<Usuario, Usuario[]>{

    constructor(private repo : AutenticacionRepository){}

    execute(usuario: Usuario): Observable<Usuario[]> {
        return this.repo.iniciarSesion(usuario.id, usuario.id);
    }
}