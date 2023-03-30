import { UseCase, UseCasePromise } from "src/app/shared/base/use-case";
import { Observable } from 'rxjs';
import { AutenticacionRepository } from "../../domain/repositories/autenticacion-repository";
import { Injectable } from "@angular/core";
import { CorreoYContrasena } from "../../domain/models/correoYcontrasena";
import { UserCredential } from "@angular/fire/auth";

@Injectable()
export class IniciarSesionUseCase implements UseCasePromise<CorreoYContrasena, UserCredential>{

    constructor(private repo: AutenticacionRepository) { }

    execute(correoYcontrasena: CorreoYContrasena): Promise<UserCredential> {
        return this.repo.iniciarSesion(correoYcontrasena);
    }
}