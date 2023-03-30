import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Injectable } from "@angular/core";
import { AutenticacionRepository } from './autenticacion-repository';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import {
    Auth, createUserWithEmailAndPassword, UserCredential,
    signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider
} from '@angular/fire/auth';
import { CorreoYContrasena } from '../models/correoYcontrasena';
import { RegistrarUsuario } from '../models/registrarUsuario';

@Injectable()
export class AutenticacionWebRepository implements AutenticacionRepository {

    constructor(private firestore: Firestore, private auth: Auth) { }

    iniciarSesionFacebook(): Promise<UserCredential> {
        return signInWithPopup(this.auth, new FacebookAuthProvider());
    }

    iniciarSesionGoogle(): Promise<UserCredential> {
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }

    cerrarSesion(): Promise<void> {
        return signOut(this.auth);
    }

    registrarUsuario(correoYcontrasena: CorreoYContrasena): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this.auth, correoYcontrasena.email, correoYcontrasena.password);
    }

    iniciarSesion(correoYcontrasena: CorreoYContrasena): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, correoYcontrasena.email, correoYcontrasena.password);
    }
} 