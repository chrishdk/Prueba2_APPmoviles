import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Respuesta } from '../interfaces/respuesta-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase = 'http://fer-sepulveda.cl/api/api-prueba2.php';

  constructor(private http: HttpClient) { }
    //FUNCION QUE VALIDA CREDENCIALES DE UN USUARIO
  validarLogin(nombre, contrasena) {
    return this.http.get<Respuesta>(this.rutaBase + '?nombreFuncion=UsuarioLogin&usuario=' + nombre + '&contrasena=' + contrasena);
  }
    //FUNCION QUE CREA UN USUARIO
  crearUsuario(nombre, contrasena) {
    return this.http.post(this.rutaBase, { nombreFuncion: 'UsuarioAlmacenar', parametros: [nombre, contrasena] });
    }

    //FUNCION QUE MODIFICA UN USUARIO
  modificarPassword(usuario, contrasena) {
    return this.http.put(this.rutaBase, { nombreFuncion: "UsuarioModificarContrasena", parametros: { usuario: usuario, contrasena: contrasena} });
  }
    
}


