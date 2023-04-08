import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Perfil } from '../../../../domain/models/perfil';
import { MessageService } from 'primeng/api';
import { ImagenPerfil } from '../../../../domain/models/imagenPerfil';
import { RegistrarPerfilUseCase } from '../../../../application/registrar-perfil/registrar-perfil-use-case';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { EliminarImagenPerfilUseCase } from '../../../../application/eliminar-imagen-perfil/eliminar-imagen-perfil-use-case';
@Component({
    selector: 'app-editar-perfil',
    templateUrl: './editar-perfil.component.html',
    styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

    perfil: Perfil
    imagenes: ImagenPerfil[] = []
    displayCustom: boolean;

    activeIndex: number = 0;
    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private messageService: MessageService,
        private registrarPerfilUseCase: RegistrarPerfilUseCase,
        private storage: Storage,
        private eliminarImagenPerfilUseCase:EliminarImagenPerfilUseCase) { }

    @ViewChild('file') file: ElementRef

    ngOnInit(): void {
        //romper referencia
        this.perfil = Object.assign({}, this.config.data.perfil);
        this.imagenes = this.perfil.imagenes.slice()
        console.log(this.imagenes)
    }
    //metodo asociado al botón para agregar una imagen
    agregarImagen() {
        this.file.nativeElement.click()
    }
    //metodo que agrega una imagen, asociada al botón oculto de tipo file
    agregarImagenArchivo($event: any) {
        let archivos = $event.target.files
        let reader = new FileReader();
        if ("image/png" == archivos[0].type) {
            reader.readAsDataURL(archivos[0]);
            reader.onloadend = () => {
                let imagen = {} as ImagenPerfil
                imagen.file = archivos[0]
                imagen.url = reader.result
                imagen.nueva = true
                this.imagenes.push(imagen)
            }
        } else {
            this.messageService.add({
                severity: "error",
                detail: "Debes agregar un archivo png"
            })
        }
    }
    //metodo aceptar del dialogo
    aceptar() {
        this.registrarPerfilUseCase.execute(this.perfil);
        this.persistirImagenes()
        this.ref.close(this.perfil);
    }
    //Guardamos imagenes en firestore
    persistirImagenes() {
        console.log("PERSISTIR")
        this.perfil.imagenes = this.imagenes
        let imagenesNuevas = this.perfil.imagenes.filter(imagen => imagen.nueva)
        imagenesNuevas.forEach((nuevas: ImagenPerfil) => {
            let imgRef = ref(this.storage, `imagenes/${this.perfil.idPerfil}/${nuevas.file.name}`)
            uploadBytes(imgRef, nuevas.file).then(response => console.log(response)).catch(response => console.log(response))
        })
    }
    //metodo cancelar del dialogo
    cancelar() {
        this.ref.close();
    }
    //metodo que se activa cuando se elimina una imagen
    async eliminarImagen(image: any) {
        this.imagenes = this.imagenes.filter(a => a.url != image.url);
        if (!image.nueva) {
            this.eliminarImagenPerfilUseCase.execute(image.path)
        }
    }
    
}
