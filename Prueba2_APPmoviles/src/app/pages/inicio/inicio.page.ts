import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  ruta: string = '';
  data: any;
  texto: string = '';

  constructor(private dbService: DbService,private codeQR: BarcodeScanner ) {}

  ngOnInit() {}

  eliminarUsuario() {
    this.dbService.eliminarUser();
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    var imageUrl = image.webPath;

    this.ruta = imageUrl;
  }

  leerQR() {
    this.codeQR.scan().then(data => {
      this.data = data;
      this.texto = this.data['text'];
    })
  }
}
