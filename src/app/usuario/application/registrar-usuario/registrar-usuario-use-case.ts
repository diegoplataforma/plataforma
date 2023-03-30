import { UseCasePromise } from "src/app/shared/base/use-case";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { UserCredential } from "@angular/fire/auth";
import { Usuario } from "../../domain/models/usuario";
import { DocumentReference } from "@angular/fire/firestore";
import { UsuarioRepository } from "../../domain/repositories/usuario-repository";


@Injectable()
export class RegistrarUsuarioBDUseCase implements UseCasePromise<Usuario, DocumentReference>{

    constructor(private repo: UsuarioRepository) { }

    execute(usuario: Usuario): Promise<DocumentReference> {
        return this.repo.registrarUsuario(usuario);
    }
}