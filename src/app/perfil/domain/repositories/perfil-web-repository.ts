import { Injectable } from "@angular/core";
import { DocumentData, query, where } from "@firebase/firestore";
import { Perfil } from "../models/perfil";
import { PerfilRepository } from './perfil-repository';
import { Firestore, setDoc, doc, collection, collectionData } from '@angular/fire/firestore';
import { FIRESTORE_TABLES } from '../../../../utils/enums/enums';
import { Observable } from 'rxjs';
import { ref, Storage, listAll, ListResult, deleteObject } from '@angular/fire/storage';


@Injectable()
export class PerfilWebRepository implements PerfilRepository {

    constructor(private firestore: Firestore, private storage: Storage) {

    }
    registrarPerfil(perfil: Perfil): Promise<void> {
        let perfilSinReferencia = Object.assign({}, perfil)
        //LIMPIAR IMAGENES
        console.log("ID PERFIL PERFIL ", perfil.idPerfil);
        perfilSinReferencia.imagenes = []
        return setDoc(doc(this.firestore, FIRESTORE_TABLES.PERFILES, perfil.idPerfil), perfilSinReferencia);
    }
    obtenerPerfilPorId(id: string): Observable<DocumentData[]> {
        const perfilRef = collection(this.firestore, FIRESTORE_TABLES.PERFILES);
        let q = query(perfilRef);
        if (id) {
            q = query(perfilRef, where('idPerfil', '==', id))
        }
        return collectionData(q)
    }

    subirImagen() {
        throw new Error("Method not implemented.");
    }
    guardarPerfil() {
        throw new Error("Method not implemented.");
    }
    obtenerImagenesPerfil(id: string): Promise<ListResult> {
        const imagenesRef = ref(this.storage, `imagenes/${id}`)
        return listAll(imagenesRef)
    }
    eliminarImagen(url: string) : Promise<void> {
        const path = ref(this.storage, url)
        return deleteObject(path)
    }
}