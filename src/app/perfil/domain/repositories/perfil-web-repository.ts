import { Injectable } from "@angular/core";
import { PerfilRepository } from './perfil-repository';


@Injectable()
export class PerfilWebRepository implements PerfilRepository {

    constructor() {

    }

    subirImagen() {
        throw new Error("Method not implemented.");
    }
    guardarPerfil() {
        throw new Error("Method not implemented.");
    }
}