import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private router: Router, private sqlite: SQLite) {
    //NO CORRE EN WEB CON ESTA PARTE DE CODIGO SOLO EMULADOR
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('MMC:---------------------BASE DE DATOS OK');
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(USERNAME VARCHAR(25), CONTRASENA VARCHAR(25))', []).then(() => {
        console.log('MMC:---------------------TABLA CREADA OK');        
      }).catch(e => {
        console.log('MMC:---------------------TABLA NOK');
      })
    }).catch(e => {
      console.log('MMC:---------------------BASE DE DATOS NOK');
    })
    /////////////////////////////////////////////
   }

   almacenarUsuario(nombre, contrasena) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('MMC:---------------------BASE DE DATOS OK');
      db.executeSql('INSERT OR REPLACE INTO USUARIO VALUES (?, ?)', [nombre, contrasena]).then(() => {
        console.log('MMC:---------------------USUARIO ALMACENADO OK');        
      }).catch(e => {
        console.log('MMC:---------------------USUARIO NO ALMACENADO');
      })
    }).catch(e => {
      console.log('MMC:---------------------BASE DE DATOS NOK');
    })

   }

   validarUsuario(nombre) {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      
      return db.executeSql('SELECT COUNT(USERNAME) AS CANTIDAD FROM USUARIO WHERE USERNAME = ?', [nombre]).then(( data ) => {
        if(data.rows.item(0).CANTIDAD === 0) {
          return false; //USUARIO NO EXISTE
        }
        return true;                
      }).catch(e => {
        return true;        
      })
    }).catch(e => {
      return true;      
    });

   }

  canActivate() {
    this.router.navigate(['login']);

    return false;
  }
}
