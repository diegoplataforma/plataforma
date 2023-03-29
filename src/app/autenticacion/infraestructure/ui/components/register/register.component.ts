import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarUsuarioUseCase } from 'src/app/autenticacion/application/registrar-usuario/registrar-usuario-use-case';
import { CorreoYContrasena } from 'src/app/autenticacion/domain/models/correoYcontrasena';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private crearUsuario: RegistrarUsuarioUseCase, private router : Router){}

  valTipoUsuario: string;
  crearCuenta: boolean = false;
  
  ngOnInit(): void {
    console.log("Hello");

    let correoYcontrasena: CorreoYContrasena;
    correoYcontrasena = {
      email: "test@gmail.com",
      password: "T234531#$%"
    };
    /*this.crearUsuario.execute(correoYcontrasena)
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      })*/

     // this.router.navigate(['/main']);
  }

  
  toggleFormularioRegistro() {
    this.crearCuenta = !this.crearCuenta;
  }

}
