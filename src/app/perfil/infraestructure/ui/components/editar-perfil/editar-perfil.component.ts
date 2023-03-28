import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Perfil } from '../../../../domain/models/perfil';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  perfil: Perfil

  constructor(private config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.perfil = this.config.data.perfil
  }
}
