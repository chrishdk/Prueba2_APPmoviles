import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Respuesta } from '../interfaces/respuesta-interface';
import { Usuario } from '../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase = 'http://fer-sepulveda.cl/api/api-prueba2.php';

  constructor(private http: HttpClient) { }

  validarLogin(nombre, contrasena) {
    return this.http.get<Respuesta>(this.rutaBase + '?nombreFuncion=UsuarioLogin&usuario=' + nombre + '&contrasena=' + contrasena);
  }

  crearUsuario(nombre, contrasena) {
    return this.http.post(this.rutaBase, { nombreFuncion: 'UsuarioAlmacenar', parametros: [nombre, contrasena] });
    }

    //FUNCION QUE MODIFICA UN USUARIO
  modificarPassword(nombre, contrasena) {
    this.http.put(this.rutaBase, { nombreFuncion: "UsuarioModificarContrasena", parametros: { usuario: nombre, contrasena: contrasena} });
  }
    

//  //FUNCIÓN QUE OBTIENE TODOS LOS USUARIOS (GET)
//  //https://fer-sepulveda.cl/api/api-user.php?nombreFuncion=UsuariosObtener
//  usuariosObtener() {
//    return this.http.get(this.rutaBase + '?nombreFuncion=UsuariosObtener');
//  }
}


