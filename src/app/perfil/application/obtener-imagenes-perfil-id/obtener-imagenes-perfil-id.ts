import { Injectable } from "@angular/core";
import { UseCasePromise } from '../../../shared/base/use-case';
import { ListResult } from '@angular/fire/storage';
import { PerfilRepository } from '../../domain/repositories/perfil-repository';

@Injectable()
export class ObtenerImagenesPerfilIdUseCase implements UseCasePromise<string, ListResult> {
    constructor(private repo: PerfilRepository) {}
    execute(param: string): Promise<ListResult> {
        return this.repo.obtenerImagenesPerfil(param);
    }
}