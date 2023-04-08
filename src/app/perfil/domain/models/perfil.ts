import { ImagenPerfil } from './imagenPerfil';
export interface Perfil {
    idPerfil: string
    nombre: string,
    quienesSomos: string,
    buscamos: string,
    direccionUrl: string,
    direccionEmpresa: string,
    imagenes: ImagenPerfil[]
}