import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { CallNumber } from '@ionic-native/call-number';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  iddireccion = this.navParams.get('iddireccion');
  nropedido = this.navParams.get('nropedido');
  idpedido = this.navParams.get('idpedido');
  estado = this.navParams.get('estado');
  idusuario = this.navParams.get('idusuario');
  subtotal = parseFloat(this.navParams.get('subtotal')).toFixed(2);
  costo_envio = parseFloat(this.navParams.get('costo_envio')).toFixed(2);
  coordenadax = this.navParams.get('coordenadax');
  coordenaday = this.navParams.get('coordenaday');
  detalles;
  usuario;
  total;
  numero_celular;
  constructor(public navCtrl: NavController, public navParams: NavParams, private pedidoProvider: PedidoProvider, 
    private callNumber: CallNumber, private statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('coordenadax'), this.navParams.get('coordenaday'));
    
    this.get_detalles();
    this.get_usuario();
    this.total_envio();
    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }


  get_detalles() {
    this.pedidoProvider.get_detalles_pedido(this.nropedido)
      .then(res => {
        this.detalles = res;
        console.log(this.detalles);

      })
  }

  total_envio(){
    this.total = Number(this.subtotal) + Number(this.costo_envio);
    this.total = this.total.toFixed(2);
    console.log(this.total);
    
  }

  get_usuario() {
    this.pedidoProvider.get_direccion_por_id(this.iddireccion)
      .then(res => {
        this.usuario = res;
        console.log(this.usuario);
        this.asignar_numero_celular(this.usuario);

      })
  }

  asignar_numero_celular(direccion){
    for(let item of direccion){
      this.numero_celular = item.CELULAR;
    }
  }

  llamar_usuario(numero) {
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  comenzar_recorrido(numero){
    var coordenadax_usuario = Number(this.navParams.get('coordenadax'));
    var coordenaday_usuario = Number(this.navParams.get('coordenaday'));

    console.log(coordenadax_usuario, coordenaday_usuario);
    this.navCtrl.push('RutaPage',{
      coordenadax : coordenadax_usuario,
      coordenaday : coordenaday_usuario,
      nropedido: this.nropedido,
      numero: this.numero_celular
    })
    
  }
}
