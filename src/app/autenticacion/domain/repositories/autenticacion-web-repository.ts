import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Injectable } from "@angular/core";
import { AutenticacionRepository } from './autenticacion-repository';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable()
export class AutenticacionWebRepository implements AutenticacionRepository {

    constructor(private firestore: Firestore) {}

    iniciarSesion(username: string, password: string): Observable<Usuario[]> {
        const usuarioRef =  collection(this.firestore, 'usuario');
        return collectionData(usuarioRef, {idField : 'id'}) as Observable<Usuario[]>;
    }
} 