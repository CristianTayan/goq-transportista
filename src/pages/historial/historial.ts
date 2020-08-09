import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  pedidos;
  id_transportista = localStorage.getItem('IDTRANSPORTISTA');
  constructor(public navCtrl: NavController, public navParams: NavParams, private pedidoProvider: PedidoProvider, private statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    this.get_pedidos();
    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }

  get_pedidos(){
    this.pedidoProvider.get_pedidos_por_transportista(this.id_transportista)
    .then(res => {
      this.pedidos = res;
      console.log(this.pedidos);
      
    })
  }

  ver_detalles(nropedido, idusuario, subtotal, costo_envio, estado){
    this.navCtrl.push('PedidoPage',{
      nropedido: nropedido,
      idusuario: idusuario,
      subtotal: subtotal,
      costo_envio: costo_envio,
      estado: estado
    });
  }

}
