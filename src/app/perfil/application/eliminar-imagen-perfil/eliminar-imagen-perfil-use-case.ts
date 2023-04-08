import { Injectable } from '@angular/core';
import { UseCasePromise } from '../../../shared/base/use-case';
import { PerfilRepository } from '../../domain/repositories/perfil-repository';
@Injectable()
export class EliminarImagenPerfilUseCase implements UseCasePromise<string, void>{
    constructor(private repo: PerfilRepository) { }
    execute(param: string): Promise<void> {
        return this.repo.eliminarImagen(param)
    }

}