import { UseCasePromiseWithNoParams } from "src/app/shared/base/use-case";
import { Observable } from 'rxjs';
import { AutenticacionRepository } from "../../domain/repositories/autenticacion-repository";
import { Injectable } from "@angular/core";
import { UserCredential } from "@angular/fire/auth";
import { CorreoYContrasena } from "../../domain/models/correoYcontrasena";

@Injectable()
export class CerrarSesionUseCase implements UseCasePromiseWithNoParams<void>{

    constructor(private repo: AutenticacionRepository) { }

    execute(): Promise<void> {
        return this.repo.cerrarSesion();
    }
}