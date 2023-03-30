import { Injectable } from "@angular/core";
import { collection, Firestore, addDoc, DocumentReference, setDoc, doc } from '@angular/fire/firestore';
import { Usuario } from "../models/usuario";
import { UsuarioRepository } from "./usuario-repository";
import { Observable } from 'rxjs';
import { FIRESTORE_TABLES } from "src/utils/enums/enums";


@Injectable()
export class UsuarioWebRepository implements UsuarioRepository {

    constructor(private firestore: Firestore) { }

    registrarUsuarioConId(usuario: Usuario): Promise<void> {
        return setDoc(doc(this.firestore, FIRESTORE_TABLES.USUARIOS, usuario.id), usuario);
    }

    registrarUsuario(usuario: Usuario): Promise<DocumentReference> {
        const usuarioRef = collection(this.firestore, "usuario");
        return addDoc(usuarioRef, usuario);
    }
} 