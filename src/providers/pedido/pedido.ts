import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

let rest_api = "https://g-kaipi.cloud/go-q/api_server/public/api/auth/app/";

@Injectable()
export class PedidoProvider {

  constructor(public http: HttpClient, public loadingController: LoadingController, public alertCtrl: AlertController) {
    console.log('Hello PedidoProvider Provider');
  }

  async get_pedidos_enviados() {
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(rest_api + 'get_pedidos_enviados')
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: err.error.message,
              buttons: ['OK']
            });
            alert.present();
            loading.dismiss();
            console.log(err);
          }
        )
    });
  }

  async aceptar_pedido_transportistas(idpedido){
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(rest_api + 'aceptar_pedido_transportistas/'+idpedido)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
            loading.dismiss();
          }
        )
    });
  }

  


  
  async get_pedidos_atendidos_transportista(idtransportista){
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(rest_api + 'get_pedidos_por_transportista/'+idtransportista)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
            loading.dismiss();
          }
        )
    });
  }

  async get_pedidos_por_transportista(idtransportista){
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(rest_api + 'get_pedidos_por_transportista/'+idtransportista)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
            loading.dismiss();
          }
        )
    });
  }

  async get_usuario(idusuario){

    return new Promise(resolve => {
      this.http.get(rest_api + 'get_usuario/'+idusuario)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
          }
        )
    });
  }

  async get_direccion_por_id(iddireccion){

    return new Promise(resolve => {
      this.http.get(rest_api + 'get_direccion_por_id/'+iddireccion)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
          }
        )
    });
  }

  async get_detalles_pedido(nropedido){
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(rest_api + 'get_detallesPedido/'+nropedido)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
            loading.dismiss();
          }
        )
    });
  }

  async aceptar_pedido_transportista(data){
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.post(rest_api + 'aceptar_pedido_transportista',data)
        .subscribe(
          data => {
            loading.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Perfecto',
              subTitle: 'Mira los detalles del pedido y atiendelo lo mas pronto posible',
              buttons: ['OK']
            });
            alert.present();
            resolve(data);
          },
          err => {
            const alert = this.alertCtrl.create({
              title: 'Oh, no!',
              subTitle: err.error.message,
              buttons: ['OK']
            });
            alert.present();
            loading.dismiss();
          }
        )
    });
  }

  async finalizar_pedidos(idpedido){
    const loading = await this.loadingController.create({
      content: 'Cargando...'
    });
    await loading.present();
    return new Promise(resolve => {
      this.http.get(rest_api + 'finalizar_pedidos/'+idpedido)
        .subscribe(
          data => {
            loading.dismiss();
            resolve(data);
          },
          err => {
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
}
