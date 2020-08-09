import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

let rest_api = "https://g-kaipi.cloud/go-q/api_server/public/api/auth/app/";

@Injectable()
export class UsuarioProvider {

  constructor(public http: HttpClient, public loadingController: LoadingController, public alertCtrl: AlertController) {
    console.log('Hello UsuarioProvider Provider');
  }

  async login(data) {
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.post(rest_api + 'login_repartidor', data)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
            console.log(err);
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: err.error.message,
              buttons: ['OK']
            });
            alert.present();
            loading.dismiss();
          }
        )
    });
  }

  async FCM_Token(data) {

    return new Promise(resolve => {
      this.http.post(rest_api + 'registrarTokenRepartidor', data)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        )
    });
  }

}
