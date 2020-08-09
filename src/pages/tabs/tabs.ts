import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  mapa: any;
  predidos_atendidos: any;
  pedidos: any;
  esta_logueado;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioProvider: UsuarioProvider) {
    this.mapa = HomePage;
    this.predidos_atendidos = 'PedidosAceptadosPage';
    this.pedidos = 'PedidosPage';
    this.add_fcm_token();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    // this.add_fcm_token();
  }

  verificar_sesion(){
    this.esta_logueado = localStorage.getItem('validate_sesion');
    if(this.esta_logueado != '1010'){
      this.navCtrl.setRoot('LoginPage');
    }
  }
  abrir_mapa(){
    this.navCtrl.push(HomePage)
  }

  add_fcm_token(){
    var data = {};
    data['idusuario'] = localStorage.getItem('IDTRANSPORTISTA');
    data['token'] = localStorage.getItem('token');
    console.log(data);
    
    this.usuarioProvider.FCM_Token(data)
    .then(res =>{
      console.log(res);
    })
  }

}
