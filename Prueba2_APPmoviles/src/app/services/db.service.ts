import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  lista:[{}];

  constructor(private router: Router, private sqlite: SQLite) {
    //NO CORRE EN WEB CON ESTA PARTE DE CODIGO SOLO EMULADOR
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('MMC:---------------------BASE DE DATOS OK');
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(USERNAME VARCHAR(25) PRIMARY KEY, CONTRASENA VARCHAR(25), CONNECT BOOLEAN DEFAULT 0)', []).then(() => {
        console.log('MMC:---------------------TABLA CREADA OK');        
      }).catch(e => {
        console.log('MMC:---------------------TABLA NOK');
      })
    }).catch(e => {
      console.log('MMC:---------------------BASE DE DATOS NOK');
    })
   }

   //ALMACENAR Y REMPLAZAR DATOS DEL USUARIO LOCAL 
   almacenarUsuario(nombre, contrasena) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('MMC:---------------------BASE DE DATOS OK');
      db.executeSql('INSERT OR REPLACE INTO USUARIO (USERNAME, CONTRASENA) VALUES (?, ?)', [nombre, contrasena]).then(() => {
        console.log('MMC:---------------------USUARIO ALMACENADO OK');        
      }).catch(e => {
        console.log('MMC:---------------------USUARIO NO ALMACENADO');
      })
    }).catch(e => {
      console.log('MMC:---------------------BASE DE DATOS NOK');
    })

   }

//   validarEx() {
//    return this.sqlite.create({
//      name: 'datos.db',
//      location: 'default'
//    }).then((db: SQLiteObject) => {
//      
//      return db.executeSql('SELECT COUNT(USERNAME) AS CANTIDAD FROM USUARIO ').then(( data ) => {
//        if(data.rows.item(0).CANTIDAD === 0) {
//          return false; //USUARIO NO EXISTE
//        }
//        return true;
//
//      }).catch(e => {
//        return true;        
//      })
//    });
//
//   }


// AL DESCONECTAR EL USUARIO SE ELIMINA DE LA BD 
   eliminarUser() {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('DELETE FROM USUARIO', []).then(( data ) => {            
      }).catch(e => {    
      })
    }).catch(e => {   
    });
   }


//VERIFICACION DE USUARIO REGISTRADO LOCALMENTE
   inicioLocal(){
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default',
      androidDatabaseLocation: 'default',
      
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT COUNT(USERNAME) as USERNAME FROM USUARIO', []).then((data) => {
        if(data.rows.item(0).USERNAME === 0){
        return false;
      }
      return true;
      }).catch(e => {
        console.log('DSZ: ERROR EN SELECT:' + e.message);
      })
    }).catch(e =>{})

  }


  canActivate() {
    this.router.navigate(['login']);

    return false;
  }
}
