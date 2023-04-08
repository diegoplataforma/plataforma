import { Injectable } from '@angular/core';
import { UseCasePromise } from '../../../shared/base/use-case';
import { Perfil } from '../../domain/models/perfil';
import { PerfilRepository } from '../../domain/repositories/perfil-repository';
@Injectable()
export class RegistrarPerfilUseCase implements UseCasePromise<Perfil, void>{
    constructor(private repo: PerfilRepository) {}
    execute(param: Perfil): Promise<void> {
        return this.repo.registrarPerfil(param);
    }

}
