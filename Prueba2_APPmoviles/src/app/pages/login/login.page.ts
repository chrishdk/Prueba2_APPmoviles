import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { ApiService } from 'src/app/services/api.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modeloUser: string ='';

  modeloPass: string ='';

  lista:[{}];

  constructor(private sqlite:SQLite,
    private api: ApiService,
    private dbService: DbService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router) {
    console.log('Pagina Login Iniciada');
   }

  ngOnInit() {
    this.listarPersona();
  }
  // VALIDACION LOGIN DE API
  validarLogin() {
    this.api.validarLogin(this.modeloUser, this.modeloPass).subscribe(data => {
      console.log(data);

      if(data.result === 'LOGIN NOK') {
        this.presentToastIngresar(); // LOGIN NOK -> ENVIAR MENSAJE DE CREDENCIALES INVÁLIDAS
      } else {
        this.router.navigate(['inicio']);// LOGIN OK -> REDIRECCIONAR AL INICIO

        // ALMACENA USUARIO AL INGRESAR

        this.dbService.almacenarUsuario(this.modeloUser, this.modeloPass);
        console.log('DSZ-------------------------------Almacenado en BD AL INGRESAR');

        

      }
    })
  }

  async presentToastIngresar() {
    const toast = await this.toastController.create({
      message: 'Credenciales Inválidas.',
      duration: 2000
    });
    toast.present();
  }
  async presentToastRegistrar() {
    const toast = await this.toastController.create({
      message: 'Ya existe Usuario.',
      duration: 2000
    });
    toast.present();
  }
  async presentToastDatos() {
    const toast = await this.toastController.create({
      message: 'Datos Ingresado Incorrectos',
      duration: 2000
    });
    toast.present();
  }

  async presentToastListar() {
    const toast = await this.toastController.create({
      message: '↓↓↓ Lista Desplegada Abajo ↓↓↓',
      duration: 2000
    });
    toast.present();
  }

  async presentAlertModi() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario Modificado Correctamente',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertReg() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario Registrado Correctamente',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  //MOSTRAR FORMULARIO REGISTRAR
  async mostrarFormulario() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'txt_nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'txt_contrasena',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.api.crearUsuario(data.txt_nombre, data.txt_contrasena).subscribe(data => {
              console.log(data);
              this.presentAlertReg();
              console.log('DSZ----------------------------creacion completa');
            });
            
          }
        }
      ]
    });

    await alert.present();
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
async presentFormularioModi() {
  const alert = await this.alertController.create({
    header: 'Modificar Contraseña',
    inputs: [
      {
        name: 'txt_usuario',
        type: 'text',
        placeholder: 'Usuario'
      },
      {
        name: 'txt_contrasena',
        type: 'password',
        placeholder: 'Contraseña'
      },
      {
        name: 'txt_nuevaContrasena',
        type: 'password',
        placeholder: 'Nueva Contraseña'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: (data1) => {

         
            this.api.validarLogin(data1.txt_usuario, data1.txt_contrasena).subscribe(data => {
              console.log(data);
              // LOGIN OK -> REDIRECCIONAR AL INICIO
              // LOGIN NOK -> ENVIAR MENSAJE DE CREDENCIALES INVÁLIDAS
        
              if(data.result === 'LOGIN NOK') {
                this.presentToastIngresar();
              } else {

                this.api.modificarPassword(data1.txt_usuario, data1.txt_nuevaContrasena).subscribe(data => {
                  console.log(data);
                  this.presentAlertModi();
                });
                this.router.navigate(['login']);
              }
            })          
        }
      }
    ]
  });

  await alert.present();
}


//  //listar personas BD local
  listarPersona(){
    this.sqlite.create({
      name: 'datos.db',
      location: 'default',
      androidDatabaseLocation: 'default',
      
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT USERNAME, CONTRASENA, CONNECT FROM USUARIO', []).then((data) => {
        for(let i=0; i <data.rows.length; i++) {
          if(i===0) {
          //  this.lista.splice(0,this.lista.length);
          this.lista= [{}];
            this.lista = [data.rows.item(i)];
            this.presentToastListar();
            
          }else{
            this.lista= [{}];
            this.lista.push(data.rows.item(i));
          }
        }
      }).catch(e => {
        console.log('DSZ: ERROR EN SELECT:' + e.message);

      })
    }).catch(e =>{})

  }



}
