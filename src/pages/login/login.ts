import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm: FormGroup;
  cedula;
  acceso;
  userData;
  nombre;
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public statusBar: StatusBar,
    private menuCtrl:MenuController,private usuarioProvider: UsuarioProvider, public events: Events) {
    this.myForm = this.fb.group({
      cedula: ['', Validators.compose([Validators.required])],
      acceso: ['', Validators.compose([Validators.required])]
    });
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
    this.menuCtrl.enable(false);
  }

  login(){
    var data = {};
    data['usuario']=this.cedula;
    data['contrasena']=this.acceso;
    this.usuarioProvider.login(data)
    .then(data => {
      this.userData = data;
      this.navCtrl.setRoot('TabsPage');
      localStorage.setItem('validate_sesion','1010');
      this.crear_sesion(this.userData)
      // this.add_fcm_token();
    })
  }

  // add_fcm_token(){
  //   var data = {};
  //   data['cedula'] = this.cedula;
  //   data['token'] = localStorage.getItem('token');
  //   this.usuarioProvider.FCM_Token(data)
  //   .then(res =>{
  //     console.log(res);
  //   })
  // }

  crear_sesion(user) {
    this.events.publish('user:signedIn',
      this.user =
      localStorage.setItem('userStorage', JSON.stringify(user))
    );

  }

  registro() {
    this.navCtrl.push('RegistroPage');
  }

}
