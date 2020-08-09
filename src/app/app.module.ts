import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { PedidoProvider } from '../providers/pedido/pedido';
import { HttpClientModule } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number';
import { FCM } from '@ionic-native/fcm';
import { Vibration } from '@ionic-native/vibration';
// import { PedidosPage } from '../pages/pedidos/pedidos';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // PedidosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // PedidosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    StatusBar,
    Geolocation,
    FCM,
    Vibration,
    InAppBrowser,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Device,
    UsuarioProvider,
    PedidosProvider,
    PedidoProvider
  ]
})
export class AppModule {}
