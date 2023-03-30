import { UseCasePromiseWithNoParams } from "src/app/shared/base/use-case";
import { AutenticacionRepository } from "../../domain/repositories/autenticacion-repository";
import { Injectable } from "@angular/core";
import { UserCredential } from "@angular/fire/auth";


@Injectable()
export class IniciarSesionGoogleUseCase implements UseCasePromiseWithNoParams<UserCredential>{

    constructor(private repo: AutenticacionRepository) { }

    execute(): Promise<UserCredential> {
        return this.repo.iniciarSesionGoogle();
    }
}