import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modeloUser: string ='';

  modeloPass: string ='';

  constructor(private api: ApiService, private dbService: DbService, private alertController: AlertController, private toastController: ToastController, private router: Router) {
    console.log('Pagina Login Iniciada');
   }

  ngOnInit() {
  }

  validarLogin() {
    this.api.validarLogin(this.modeloUser, this.modeloPass).subscribe(data => {
      console.log(data);
      // LOGIN OK -> REDIRECCIONAR AL INICIO
      // LOGIN NOK -> ENVIAR MENSAJE DE CREDENCIALES INVÁLIDAS

      if(data.result === 'LOGIN NOK') {
        this.presentToast();//TOAST AL NO VALLIDAR
      } else {
        this.router.navigate(['inicio']);
      }
    })
  }
//solo validacion por consola
  validarUsuario()  {
    console.log(this.modeloUser);
    console.log(this.modeloPass);

  }

  async mostrarFormulario() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre Usuario'
        },
        {
          name: 'contrasena',
          type: 'password',
          placeholder: 'Contraseña'
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
          text: 'Almacenar',
          handler: (data) => {
            this.almacenarUsuario(data.nombre, data.contrasena);
            this.api.crearUsuario(data.txt_nombre, data.txt_contrasena).subscribe(data => {
              console.log(data);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  almacenarUsuario(nombre, contrasena) {
    this.dbService.validarUsuario(nombre).then((data) => {
      if(!data) {
        console.log('MMMC--------------SI GUARDO');
        this.dbService.almacenarUsuario(nombre, contrasena);
      } else {
        this.presentToast();
      }
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario Ya Existe',
      duration: 2000
    });
    toast.present();
  }
  

}
