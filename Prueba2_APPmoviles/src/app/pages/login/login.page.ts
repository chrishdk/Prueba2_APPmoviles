import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modeloUser: string ='';

  modeloPass: string ='';

  constructor(private dbService: DbService, private alertController: AlertController, private toastController: ToastController) {
    console.log('Pagina Login Iniciada');
   }

  ngOnInit() {
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
