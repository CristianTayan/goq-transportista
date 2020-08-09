import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../home/home';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
  pedidos;
  habilitar = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private pedidosProvider: PedidoProvider, private statusBar:StatusBar) {
  }

  ionViewDidLoad() {
    // this.mis_pedidos();
    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
    
  }
  ionViewDidEnter(){
    this.mis_pedidos();
    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }
  mis_pedidos(){
    this.pedidosProvider.get_pedidos_enviados()
    .then(data => {
      this.pedidos = data;
      console.log(this.pedidos);
      ;
    })
  }

  enviar_mensaje(numero) {
    var menssage = 'Hola, soy el motorista designado por Go-Q; me estoy dirigiendo a retirar tu producto, en pocos minutos llegaré con tus productos a la puerta de tú hogar. *Go-Q "Facilita tu dia"*';
    let enviar = 'https://api.whatsapp.com/send?phone=' + numero + '&text=' + menssage;
    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(enviar, '_system');
    });
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

  aceptar_pedido(idpedido){
    var data = {};
    data['idpedido'] = idpedido,
    data['idtransportista'] = localStorage.getItem('IDTRANSPORTISTA');
    this.pedidosProvider.aceptar_pedido_transportista(data)
    .then(res => {
      console.log(res);
      localStorage.setItem('idpedido', idpedido);
      this.mis_pedidos();
      this.habilitar = true;      
    },(err) => {
      this.navCtrl.setRoot(HomePage);
    })
  }

}
