import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';

/**
 * Generated class for the PedidosAceptadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-aceptados',
  templateUrl: 'pedidos-aceptados.html',
})
export class PedidosAceptadosPage {
  pedidos;
  total_pedidos;
  constructor(public navCtrl: NavController, public navParams: NavParams, private pedidosProvider: PedidoProvider) {
  }

  ionViewDidLoad() {
    
    this.get_pedidos_aceptados();
  }
  ionViewDidEnter(){
    this.get_pedidos_aceptados();
  }

  get_pedidos_aceptados(){
    this.pedidosProvider.get_pedidos_atendidos_transportista(localStorage.getItem('IDTRANSPORTISTA'))
    .then(data =>{
      this.pedidos = data;
      this.total_pedidos = this.pedidos.length;
      console.log(this.total_pedidos);
      
    })
  }

  ver_detalles(idpedido,nropedido, idusuario, subtotal, costo_envio, estado, coordenadax, coordenaday){
    this.navCtrl.push('PedidoPage',{
      idpedido: idpedido,
      nropedido: nropedido,
      idusuario: idusuario,
      subtotal: subtotal,
      costo_envio: costo_envio,
      estado: estado,
      coordenadax: coordenadax,
      coordenaday: coordenaday
    });
  }



}
