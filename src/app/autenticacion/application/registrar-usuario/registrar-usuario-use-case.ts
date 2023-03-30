import { UseCase, UseCasePromise } from "src/app/shared/base/use-case";
import { Usuario } from "../../domain/models/usuario";
import { Observable } from 'rxjs';
import { AutenticacionRepository } from "../../domain/repositories/autenticacion-repository";
import { Injectable } from "@angular/core";
import { UserCredential } from "@angular/fire/auth";
import { CorreoYContrasena } from "../../domain/models/correoYcontrasena";
import { RegistrarUsuario } from "../../domain/models/registrarUsuario";

@Injectable()
export class RegistrarUsuarioUseCase implements UseCasePromise<CorreoYContrasena, UserCredential>{

    constructor(private repo: AutenticacionRepository) { }

    execute(correoYcontrasena: CorreoYContrasena): Promise<UserCredential> {
        return this.repo.registrarUsuario(correoYcontrasena);
    }
}