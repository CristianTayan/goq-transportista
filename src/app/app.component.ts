import { Component } from '@angular/core';
import { Platform, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'Firebase';
import { HomePage } from '../pages/home/home';
import { FCM, NotificationData } from '@ionic-native/fcm';
import { Vibration } from '@ionic-native/vibration';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { LocalNotifications } from '@ionic-native/local-notifications';

const config = {

  apiKey: "AIzaSyC95oTsQdnnuDZA7r0RKjzyNWphQJv1JcI",
  authDomain: "goq-chefs.firebaseapp.com",
  databaseURL: "https://goq-chefs.firebaseio.com",
  projectId: "goq-chefs",
  storageBucket: "goq-chefs.appspot.com",
  messagingSenderId: "890129280723",
  appId: "1:890129280723:web:88e9947ae4a8b7796e2e26",
  measurementId: "G-BPKKZMY3DH"

};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';
  userData;
  constructor(platform: Platform, statusBar: StatusBar, public events: Events, splashScreen: SplashScreen, private fcm: FCM, public app: App, private vibration: Vibration, private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      events.subscribe('user:signedIn', (userEventData) => {
        this.userData = localStorage.getItem('userStorage');
        var usuario = JSON.parse(this.userData);
        for (let item of usuario) {
          localStorage.setItem('IDTRANSPORTISTA', item.idusuario);
          localStorage.setItem('CEDULA', item.cedula);
          localStorage.setItem('NOMBRES', item.nombre + item.apellido);
          localStorage.setItem('FOTO', item.foto);
          localStorage.setItem('PLACA', item.placa);
        }
      });

    });
    firebase.initializeApp(config);

    this.fcm.getToken()
      .then((token: string) => {
        localStorage.setItem('token', token);
      })
      .catch(error => {
        console.log(error);
      });

    this.fcm.onTokenRefresh().subscribe((token: string) => {
      console.log('tu token se actualizo ' + token);
    });

    this.localNotifications.on("click").subscribe(resusltado => {
      this.app.getActiveNav().setRoot(PedidosPage)
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Estamos en segundo plano", JSON.stringify(data));
        this.vibration.vibrate(1000);
        this.app.getActiveNav().setRoot(PedidosPage);
      } else {

        this.localNotifications.schedule({
          title: "Se han registrado nuevos pedidos",
          text: "Abre tu bandeja de pedidos para verificar",
          trigger: { at: new Date(new Date().getTime() + 3600) },
          icon: "https://cdn.icon-icons.com/images/icon-icons.svg",
          sound: "file://assets/imgs/sound.mp3"
        })

        this.vibration.vibrate(1000);
        this.app.getActiveNav().setRoot(PedidosPage);

      }
    }, error => {
      console.log();
    });


  }

}
