import { Perfil } from '../models/perfil';
import { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ListResult } from '@angular/fire/storage';
export abstract class PerfilRepository {
    abstract registrarPerfil(perfil:Perfil) : Promise<void>;
    abstract obtenerPerfilPorId(id: string):Observable<DocumentData[]>
    abstract obtenerImagenesPerfil(id: string): Promise<ListResult>
    abstract eliminarImagen(id: string): Promise<void>
}