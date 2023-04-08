import { Usuario } from '../../../shared/domain/models/usuario';
import { Observable } from 'rxjs';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';


export abstract class UsuarioRepository {

    abstract registrarUsuario(usuario: Usuario): Promise<DocumentReference>;

    abstract registrarUsuarioConId(usuario: Usuario): Promise<void>;

    abstract obtenerUsuarioPorId(id: string): DocumentReference<DocumentData>;
} 