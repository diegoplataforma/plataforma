import { UseCase, UseCasePromise } from "src/app/shared/base/use-case";
import { Observable } from 'rxjs';
import { AutenticacionRepository } from "../../domain/repositories/autenticacion-repository";
import { Injectable } from "@angular/core";
import { CorreoYContrasena } from "../../domain/models/correoYcontrasena";
import { User, UserCredential } from "@angular/fire/auth";

@Injectable()
export class CorreoVerificacionUseCase implements UseCasePromise<User, void>{

    constructor(private repo: AutenticacionRepository) { }

    execute(user: User): Promise<void> {
        return this.repo.eviarCorreoParaVerificacion(user);
    }
}