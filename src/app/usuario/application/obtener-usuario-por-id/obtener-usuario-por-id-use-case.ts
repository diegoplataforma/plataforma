import { UseCaseDocumentReference, UseCasePromise } from "src/app/shared/base/use-case";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { UsuarioRepository } from "../../domain/repositories/usuario-repository";


@Injectable()
export class ObtenerUsuarioPorIDUseCase implements UseCaseDocumentReference<string, DocumentData>{

    constructor(private repo: UsuarioRepository) { }

    execute(id: string):  DocumentReference<DocumentData> {
        return this.repo.obtenerUsuarioPorId(id);
    }
}