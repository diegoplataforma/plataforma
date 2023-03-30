import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';


export abstract class UsuarioRepository {

    abstract registrarUsuario(usuario: Usuario): Promise<DocumentReference>;

    abstract registrarUsuarioConId(usuario: Usuario): Promise<void>;
} 