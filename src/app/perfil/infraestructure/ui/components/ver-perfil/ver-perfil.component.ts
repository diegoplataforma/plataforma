import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { Perfil } from '../../../../domain/models/perfil';
import { ObtenerPerfilPorIdUseCase } from '../../../../application/obtener-perfil-por-id/obtener-perfil-por-id-use-case';
import { DocumentData } from '@firebase/firestore';
import { ObtenerImagenesPerfilIdUseCase } from '../../../../application/obtener-imagenes-perfil-id/obtener-imagenes-perfil-id';
import { ListResult } from '@angular/fire/storage';
import { getDownloadURL } from '@firebase/storage';
import { ImagenPerfil } from '../../../../domain/models/imagenPerfil';
import { LoginRepository } from '../../../../../shared/domain/repositories/login-repository';
@Component({
    selector: 'app-ver-perfil',
    templateUrl: './ver-perfil.component.html',
    styleUrls: ['./ver-perfil.component.scss']
})
export class VerPerfilComponent implements OnInit {

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    //TODO perfil persona logueada
    perfil: Perfil = { imagenes : []} as Perfil

    constructor(private dialogService: DialogService,
        private obtenerPerfilPorIdUseCase: ObtenerPerfilPorIdUseCase,
        private obtenerImagenesPerfilIdUseCase:ObtenerImagenesPerfilIdUseCase,
        private loginRepository: LoginRepository) { }

    ngOnInit(): void {
        this.perfil.idPerfil = this.loginRepository.obtenerInfoUsuarioLogueado()?.perfilId
        this.obtenerPerfilDelUsuarioLogueado()
    }
    obtenerPerfilDelUsuarioLogueado() {
        this.obtenerPerfilPorIdUseCase.execute(this.perfil.idPerfil).subscribe(doc => {
            
            this.perfil = this.mapperDocumentDataPerfil(doc[0])
            this.obtenerImagenesPerfil(this.perfil.idPerfil)
        })
    }
    async obtenerImagenesPerfil(id: string) {
        let listaResultados = await this.obtenerImagenesPerfilIdUseCase.execute(id)
        let imagenesPerfil : ImagenPerfil[] = []
        console.log(listaResultados.items)
        for(let imagen of listaResultados.items) {
            let urlImagen = await getDownloadURL(imagen);
            console.log(urlImagen)
            let i = { url : urlImagen, nombre: imagen.name, nueva: false, path: imagen.fullPath } as unknown as  ImagenPerfil
            imagenesPerfil.push(i)
        }
        this.perfil.imagenes = imagenesPerfil
    }
    editarPerfil() {
        const ref = this.dialogService.open(EditarPerfilComponent, {
            header: "Editar Perfil",
            height: "auto",
            width: "auto",
            
            closable: false,
            data: {
                perfil: this.perfil
            }
        })

        ref.onClose.subscribe(perfil => {
            if (perfil) {
                this.perfil = perfil
            }
        })

    }
    //TODO COMPLETAR MAPPER
    mapperDocumentDataPerfil(doc:DocumentData): Perfil {
        return {
            buscamos: doc.buscamos,
            idPerfil: doc.idPerfil,
            nombre: doc.nombre,
            quienesSomos: doc.quienesSomos,
            imagenes : []
        } as Perfil
    }

}
