import { Injectable } from "@angular/core";
import { UseCaseDocumentReference } from '../../../shared/base/use-case';
import { DocumentData, DocumentReference } from '@firebase/firestore';
import { PerfilRepository } from '../../domain/repositories/perfil-repository';
import { Perfil } from '../../domain/models/perfil';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/base/use-case';

@Injectable()
export class ObtenerPerfilPorIdUseCase implements UseCase<string, DocumentData[]> {
    constructor(private repo: PerfilRepository) {}
    execute(param: string):Observable<DocumentData[]> {
        return this.repo.obtenerPerfilPorId(param);
    }
}